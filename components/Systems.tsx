"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useLenis } from "./SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

// Screenshots come from the real systems running on demo data; order matches `screens` in the dictionaries.
const SYSTEM_META = [
  {
    key: "digiflow",
    accent: "#10B981",
    shots: ["pos", "tables", "waiter_order", "kds", "cashier", "dashboard", "prodsales"],
    phone: "/systems/digiflow-mobile.webp" as string | undefined,
  },
  {
    key: "digiclinic",
    accent: "#E5484D",
    shots: ["reception", "visit", "rx", "week", "home", "record", "booking"],
    phone: undefined as string | undefined,
  },
];

type System = Dictionary["systems"]["items"][number] & (typeof SYSTEM_META)[number];

const shotSrc = (s: System, i: number) => `/systems/${s.key}-${s.shots[i]}.webp`;

// Scroll budget per screenshot (on top of one screen of pinned height).
const STEP_VH = 62;

/**
 * Maps section progress (0→1) to a "stage position" Q in [0, count-1] that lingers on each screenshot:
 * a short hold at the start and end of the pin, and inside every step the change happens in the middle
 * half while the first and last quarter hold still.
 */
function stagePosition(p: number, count: number) {
  const last = count - 1;
  const P = Math.min(Math.max(p * (last + 0.5) - 0.2, 0), last);
  const base = Math.floor(P);
  if (base >= last) return last;
  const f = Math.min(Math.max((P - base - 0.22) / 0.56, 0), 1);
  return base + f * f * (3 - 2 * f);
}

/* ───────────────────────── One screenshot in the 3D stack ───────────────────────── */

function StageShot({ s, i, stage }: { s: System; i: number; stage: MotionValue<number> }) {
  const last = s.shots.length - 1;
  // L < 0: waiting below / rising in.  L in [0,1]: on stage, then sinking back.  L > 1: gone.
  const local = useTransform(stage, (q) => (i === last ? Math.min(q - i, 0) : q - i));
  const y = useTransform(local, (L) => (L < 0 ? `${Math.min(-L, 1) * 75}%` : `${-Math.min(L, 1) * 7}%`));
  const rotateX = useTransform(local, (L) => (L < 0 ? Math.min(-L, 1) * 22 : -Math.min(L, 1) * 8));
  const scale = useTransform(local, (L) => (L < 0 ? 1 - Math.min(-L, 1) * 0.06 : 1 - Math.min(L, 1) * 0.1));
  const opacity = useTransform(local, (L) => {
    if (L <= -1 || L >= 1) return 0;
    if (L < 0) return Math.min((1 + L) * 1.8, 1);
    return L < 0.45 ? 1 : 1 - (L - 0.45) / 0.55;
  });
  const brightness = useTransform(local, (L) => `brightness(${L > 0 ? 1 - Math.min(L, 1) * 0.45 : 1})`);

  return (
    <motion.div
      style={{ y, rotateX, scale, opacity, filter: brightness, zIndex: i, transformOrigin: "50% 100%" }}
      className="absolute inset-0 will-change-transform"
    >
      <div
        className="h-full rounded-2xl overflow-hidden border border-app bg-app-card"
        style={{ boxShadow: `0 50px 120px -30px rgba(0,0,0,0.65), 0 0 0 1px ${s.accent}1a` }}
      >
        <div className="flex items-center gap-1.5 px-4 h-8 bg-app-deep border-b border-app">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ms-3 text-[11px] text-app-dim tracking-wide truncate [direction:ltr]">
            {s.name} · {s.screens[i].title}
          </span>
        </div>
        <div className="relative" style={{ height: "calc(100% - 2rem)" }}>
          <Image
            src={shotSrc(s, i)}
            alt={`${s.name} — ${s.screens[i].title}`}
            fill
            sizes="(max-width: 1023px) 100vw, 60vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── One pinned system showcase ───────────────────────── */

function Showcase({ s, index, dict }: { s: System; index: number; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const count = s.shots.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const stage = useTransform(smooth, (p) => stagePosition(p, count));
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const a = Math.round(stagePosition(p, count));
    setActive((prev) => (prev === a ? prev : a));
  });

  // Parallax layers, each at its own speed.
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const passSmooth = useSpring(pass, { stiffness: 50, damping: 18 });
  const ghostX = useTransform(passSmooth, [0, 1], index % 2 ? ["-22%", "6%"] : ["6%", "-22%"]);
  const glowY = useTransform(passSmooth, [0, 1], ["-20%", "40%"]);
  const phoneY = useTransform(smooth, [0, 1], [140, -180]);
  const phoneRotate = useTransform(smooth, [0, 1], [-8, 5]);
  const progress = useTransform(stage, (q) => q / (count - 1));

  const reverse = index % 2 === 1;

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    // Middle of step i's hold, inverted from stagePosition.
    const target = top + travel * ((i + 0.2) / (count - 0.5));
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Intro (scrolls normally, before the pin) */}
      <div className={`max-w-[1400px] mx-auto px-8 md:px-14 pt-20 md:pt-28 flex ${reverse ? "lg:justify-end" : ""}`}>
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: reverse ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="font-space font-bold text-xs tracking-widest" style={{ color: s.accent }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-16" style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
            <span
              className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ background: `${s.accent}1a`, border: `1px solid ${s.accent}55`, color: s.accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
              {s.badge}
            </span>
          </motion.div>
          <div className="overflow-hidden mb-2">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE }}
              className="text-app-muted text-xs tracking-[0.3em] uppercase font-space"
            >
              {s.tagline}
            </motion.p>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h3
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.06, ease: EASE }}
              className="font-space font-bold text-app leading-[1.02]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)", letterSpacing: "-0.035em" }}
            >
              {s.name}
            </motion.h3>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="text-app-muted leading-relaxed text-base md:text-lg mb-8"
          >
            {s.desc}
          </motion.p>
          <div className="grid grid-cols-3 gap-2.5 max-w-xl">
            {s.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.07 }}
                className="relative rounded-xl border border-app bg-app-card px-3 py-3 overflow-hidden group/h"
              >
                <div
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 group-hover/h:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right"
                  style={{ background: s.accent }}
                />
                <div className="font-space font-black text-sm md:text-base leading-none mb-1.5" style={{ color: s.accent }}>
                  {h.value}
                </div>
                <div className="text-app-dim text-[10px] md:text-[11px] leading-snug">{h.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned screenshot stage */}
      <div ref={ref} className="relative" style={{ height: `calc(100svh + ${(count - 1) * STEP_VH}vh)` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Ghost name, drifting sideways */}
          <motion.div
            aria-hidden
            style={{ x: ghostX }}
            className="hidden md:block absolute top-1/2 -translate-y-1/2 start-0 whitespace-nowrap pointer-events-none select-none font-space font-black leading-none [direction:ltr]"
          >
            <span
              style={{
                fontSize: "clamp(8rem, 24vw, 26rem)",
                WebkitTextStroke: `1.5px ${s.accent}2a`,
                color: "transparent",
                letterSpacing: "-0.05em",
              }}
            >
              {s.name}
            </span>
          </motion.div>

          {/* Glow */}
          <motion.div
            aria-hidden
            style={{
              y: glowY,
              background: `radial-gradient(circle, ${s.accent}22 0%, transparent 60%)`,
              filter: "blur(90px)",
            }}
            className={`absolute w-[900px] h-[900px] -top-1/4 pointer-events-none ${reverse ? "-start-1/4" : "-end-1/4"}`}
          />

          <div className="relative h-full max-w-[1400px] mx-auto px-5 md:px-14 flex flex-col lg:grid lg:grid-cols-12 lg:gap-14 lg:items-center justify-center gap-6 pt-20 lg:pt-0">
            {/* Caption column */}
            <div className={`lg:col-span-4 min-w-0 ${reverse ? "lg:order-last" : ""}`}>
              <div className="flex items-end gap-4 mb-3 lg:mb-6">
                <span className="font-space font-black leading-none text-app" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}>
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-space text-app-dim text-sm mb-1.5">/ {String(count).padStart(2, "0")}</span>
              </div>

              <div className="relative min-h-[5.5rem] lg:min-h-[8.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={active} className="absolute inset-x-0 top-0">
                    <div className="overflow-hidden mb-2">
                      <motion.h4
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-110%" }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="font-space font-bold text-app text-xl md:text-3xl leading-tight"
                      >
                        {s.screens[active].title}
                      </motion.h4>
                    </div>
                    <motion.p
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
                      className="text-app-muted text-sm md:text-base leading-relaxed"
                    >
                      {s.screens[active].caption}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step list with a progress rail (desktop) */}
              <div className="hidden lg:flex gap-5 mt-8">
                <div className="relative w-px bg-[var(--border-strong)]">
                  <motion.div
                    className="absolute inset-x-0 top-0 h-full origin-top"
                    style={{ scaleY: progress, background: s.accent }}
                  />
                </div>
                <ul className="space-y-1">
                  {s.screens.map((sc, i) => (
                    <li key={sc.title}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        className="flex items-center gap-3 py-1 text-sm transition-all duration-300"
                        style={{ color: i === active ? "var(--text)" : "var(--text-dim)" }}
                      >
                        <span
                          className="h-px transition-all duration-500"
                          style={{ width: i === active ? 28 : 10, background: i === active ? s.accent : "var(--text-faint)" }}
                        />
                        <span className={i === active ? "font-semibold" : ""}>{sc.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress bar (mobile) */}
              <div className="lg:hidden h-[3px] rounded-full bg-[var(--border-strong)] overflow-hidden mt-4">
                <motion.div
                  className="h-full origin-left rtl:origin-right"
                  style={{ scaleX: progress, background: s.accent }}
                />
              </div>
            </div>

            {/* Stage */}
            <div className="lg:col-span-8 min-w-0 relative">
              <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10.6]" style={{ perspective: "1600px" }}>
                {s.shots.map((_, i) => (
                  <StageShot key={i} s={s} i={i} stage={stage} />
                ))}
              </div>

              {/* Floating phone, on its own parallax layer */}
              {s.phone && (
                <motion.div
                  aria-hidden
                  style={{ y: phoneY, rotate: phoneRotate, zIndex: 50 }}
                  className={`hidden md:block absolute -bottom-10 w-[19%] rounded-[1.6rem] border-[6px] border-[#0b0f1a] bg-[#0b0f1a] overflow-hidden pointer-events-none ${
                    reverse ? "-start-8" : "-end-8"
                  }`}
                >
                  <div className="relative shadow-2xl" style={{ aspectRatio: "585/1266" }}>
                    <Image src={s.phone} alt="" fill sizes="220px" className="object-cover object-top" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features + CTA */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-14 pt-10 md:pt-16 pb-8">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-app-dim text-[11px] tracking-[0.3em] uppercase font-space mb-6"
        >
          {dict.systems.featuresTitle}
        </motion.p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 mb-10">
          {s.features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              className="flex items-start gap-3 text-sm md:text-[15px] text-app-muted leading-relaxed"
            >
              <span
                className="mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: `${s.accent}1f`, color: s.accent }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {f}
            </motion.li>
          ))}
        </ul>
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            if (lenis) lenis.scrollTo("#contact", { offset: -80, duration: 1.6 });
            else document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group/cta inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-transform duration-300 hover:-translate-y-0.5"
          style={{ background: s.accent, boxShadow: `0 16px 40px -12px ${s.accent}` }}
        >
          {dict.systems.cta}
          <ArrowUpRight
            size={16}
            className="rtl:-scale-x-100 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          />
        </motion.a>
      </div>
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export default function Systems({ dict }: { dict: Dictionary }) {
  const systems: System[] = dict.systems.items.map((s, i) => ({ ...s, ...SYSTEM_META[i] }));
  const headRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headRef, offset: ["start end", "end start"] });
  const headY = useTransform(useSpring(scrollYProgress, { stiffness: 50, damping: 18 }), [0, 1], [60, -60]);

  return (
    <section id="systems" className="bg-app-deep border-t border-app relative">
      <div ref={headRef} className="max-w-[1400px] mx-auto px-8 md:px-14 relative z-10 pt-24 md:pt-32">
        <motion.div style={{ y: headY }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="works-eyebrow mb-4"
            >
              <span className="eyebrow-bar" aria-hidden="true" />
              <span className="eyebrow-tag">[03]</span>
              {dict.systems.eyebrow}
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE }}
                className="font-space font-bold text-app"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
              >
                {dict.systems.heading1} <span className="gradient-text">{dict.systems.heading2}</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-app-muted text-sm md:text-base leading-relaxed max-w-md"
          >
            {dict.systems.intro}
          </motion.p>
        </motion.div>
      </div>

      <div className="pb-24 md:pb-32">
        {systems.map((s, i) => (
          <Showcase key={s.key} s={s} index={i} dict={dict} />
        ))}
      </div>
    </section>
  );
}
