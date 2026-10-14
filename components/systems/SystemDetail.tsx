"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { useLenis } from "../SmoothScroll";
import { shotSrc, type System } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

// Scroll budget per screenshot (on top of one screen of pinned height).
const STEP_VH = 62;

/**
 * Maps pin progress (0→1) to a "stage position" Q in [0, count-1] that lingers on each screenshot:
 * a short hold at the start and end, and inside every step the change happens in the middle half
 * while the first and last quarter hold still.
 */
function stagePosition(p: number, count: number) {
  const last = count - 1;
  const P = Math.min(Math.max(p * (last + 0.5) - 0.2, 0), last);
  const base = Math.floor(P);
  if (base >= last) return last;
  const f = Math.min(Math.max((P - base - 0.22) / 0.56, 0), 1);
  return base + f * f * (3 - 2 * f);
}

function BrowserFrame({ s, i, children }: { s: System; i: number; children: React.ReactNode }) {
  return (
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
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero({ s, dict, locale }: { s: System; dict: Dictionary; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const shotY = useTransform(sp, [0, 1], [0, 160]);
  const shotRotate = useTransform(sp, [0, 1], [0, 10]);
  const shotScale = useTransform(sp, [0, 1], [1, 0.92]);
  const textY = useTransform(sp, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ghostX = useTransform(sp, [0, 1], ["0%", "-18%"]);
  const phoneY = useTransform(sp, [0, 1], [0, -220]);

  return (
    <div ref={ref} className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -top-60 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-[1100px] h-[800px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${s.accent}2b 0%, transparent 62%)`, filter: "blur(90px)" }}
      />
      {/* Ghost name */}
      <motion.div
        aria-hidden
        style={{ x: ghostX }}
        className="hidden md:block absolute bottom-6 start-0 whitespace-nowrap pointer-events-none select-none font-space font-black leading-none [direction:ltr]"
      >
        <span
          style={{ fontSize: "clamp(9rem, 26vw, 28rem)", WebkitTextStroke: `1.5px ${s.accent}24`, color: "transparent", letterSpacing: "-0.05em" }}
        >
          {s.name}
        </span>
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-14 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-5 min-w-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <Link
              href={`/${locale}#systems`}
              className="inline-flex items-center gap-2 text-app-dim hover:text-app text-sm mb-10 transition-colors group/back"
            >
              <ArrowLeft size={15} className="rtl:-scale-x-100 transition-transform group-hover/back:-translate-x-1 rtl:group-hover/back:translate-x-1" />
              {dict.systems.back}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="eyebrow-bar" style={{ backgroundColor: s.accent }} aria-hidden />
            <span
              className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ background: `${s.accent}1a`, border: `1px solid ${s.accent}55`, color: s.accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
              {s.badge}
            </span>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-app-muted text-xs md:text-sm tracking-[0.3em] uppercase font-space"
            >
              {s.tagline}
            </motion.p>
          </div>
          <div className="overflow-hidden mb-7">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.22, ease: EASE }}
              className="font-space font-bold text-app leading-[1.02]"
              style={{ fontSize: "clamp(3rem, 7.5vw, 6.5rem)", letterSpacing: "-0.04em" }}
            >
              {s.name}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="text-app-muted leading-relaxed text-base md:text-lg mb-9"
          >
            {s.desc}
          </motion.p>
          <div className="grid grid-cols-3 gap-2.5">
            {s.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: EASE }}
                className="rounded-xl border border-app bg-app-card px-3 py-3"
              >
                <div className="font-space font-black text-sm md:text-base leading-none mb-1.5" style={{ color: s.accent }}>
                  {h.value}
                </div>
                <div className="text-app-dim text-[10px] md:text-[11px] leading-snug">{h.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero screenshot */}
        <div className="lg:col-span-7 min-w-0 relative" style={{ perspective: "1600px" }}>
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          >
            <motion.div style={{ y: shotY, rotateX: shotRotate, scale: shotScale, transformOrigin: "50% 0%" }} className="aspect-[16/10.6]">
              <BrowserFrame s={s} i={0}>
                <Image src={shotSrc(s, 0)} alt={`${s.name} — ${s.screens[0].title}`} fill priority sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover object-top" />
              </BrowserFrame>
            </motion.div>
          </motion.div>
          {s.phone && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
              className="hidden md:block absolute -bottom-14 -end-6 w-[22%] z-10 pointer-events-none"
            >
              <motion.div style={{ y: phoneY }} className="rounded-[1.6rem] border-[6px] border-[#0b0f1a] bg-[#0b0f1a] overflow-hidden shadow-2xl">
                <div className="relative" style={{ aspectRatio: "585/1266" }}>
                  <Image src={s.phone} alt="" fill sizes="240px" className="object-cover object-top" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Pinned screenshot stage ───────────────────────── */

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
  const filter = useTransform(local, (L) => `brightness(${L > 0 ? 1 - Math.min(L, 1) * 0.45 : 1})`);

  return (
    <motion.div
      style={{ y, rotateX, scale, opacity, filter, zIndex: i, transformOrigin: "50% 100%" }}
      className="absolute inset-0 will-change-transform"
    >
      <BrowserFrame s={s} i={i}>
        <Image src={shotSrc(s, i)} alt={`${s.name} — ${s.screens[i].title}`} fill sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover object-top" />
      </BrowserFrame>
    </motion.div>
  );
}

function Stage({ s, dict }: { s: System; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const count = s.shots.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const stage = useTransform(smooth, (p) => stagePosition(p, count));
  const progress = useTransform(stage, (q) => q / (count - 1));
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const a = Math.round(stagePosition(p, count));
    setActive((prev) => (prev === a ? prev : a));
  });
  const glowY = useTransform(smooth, [0, 1], ["-10%", "30%"]);

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const target = top + travel * ((i + 0.2) / (count - 0.5)); // middle of step i's hold
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative border-t border-app" style={{ height: `calc(100svh + ${(count - 1) * STEP_VH}vh)` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          aria-hidden
          style={{ y: glowY, background: `radial-gradient(circle, ${s.accent}1f 0%, transparent 60%)`, filter: "blur(90px)" }}
          className="absolute w-[900px] h-[900px] -top-1/4 -end-1/4 pointer-events-none"
        />

        <div className="relative h-full max-w-[1400px] mx-auto px-5 md:px-14 flex flex-col lg:grid lg:grid-cols-12 lg:gap-14 lg:items-center justify-center gap-6 pt-20 lg:pt-0">
          <div className="lg:col-span-4 min-w-0">
            <p className="works-eyebrow mb-6 lg:mb-10" style={{ color: s.accent }}>
              <span className="eyebrow-bar" style={{ backgroundColor: s.accent }} aria-hidden="true" />
              {dict.systems.screensTitle}
            </p>
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
                    <motion.h3
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-110%" }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="font-space font-bold text-app text-xl md:text-3xl leading-tight"
                    >
                      {s.screens[active].title}
                    </motion.h3>
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

            <div className="hidden lg:flex gap-5 mt-8">
              <div className="relative w-px bg-[var(--border-strong)]">
                <motion.div className="absolute inset-x-0 top-0 h-full origin-top" style={{ scaleY: progress, background: s.accent }} />
              </div>
              <ul className="space-y-1">
                {s.screens.map((sc, i) => (
                  <li key={sc.title}>
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      className="flex items-center gap-3 py-1 text-sm transition-colors duration-300"
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

            <div className="lg:hidden h-[3px] rounded-full bg-[var(--border-strong)] overflow-hidden mt-4">
              <motion.div className="h-full origin-left rtl:origin-right" style={{ scaleX: progress, background: s.accent }} />
            </div>
          </div>

          <div className="lg:col-span-8 min-w-0">
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10.6]" style={{ perspective: "1600px" }}>
              {s.shots.map((_, i) => (
                <StageShot key={i} s={s} i={i} stage={stage} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function SystemDetail({
  s,
  next,
  dict,
  locale,
}: {
  s: System;
  next: System;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <>
      <Hero s={s} dict={dict} locale={locale} />
      <Stage s={s} dict={dict} />

      {/* Features */}
      <section className="relative border-t border-app">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-24 md:py-32">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="works-eyebrow mb-10"
            style={{ color: s.accent }}
          >
            <span className="eyebrow-bar" style={{ backgroundColor: s.accent }} aria-hidden="true" />
            {dict.systems.featuresTitle}
          </motion.p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                className="group/f relative flex items-start gap-4 rounded-2xl border border-app bg-app-card p-5 overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 group-hover/f:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right"
                  style={{ background: s.accent }}
                />
                <span className="font-space font-bold text-xs mt-1 shrink-0" style={{ color: s.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-[15px] text-app-muted group-hover/f:text-app leading-relaxed transition-colors">{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-app overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(700px 360px at 50% 100%, ${s.accent}26, transparent 70%)` }}
        />
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="overflow-hidden mb-5">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-space font-bold text-app"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              {dict.systems.ctaTitle}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-app-muted text-base md:text-lg leading-relaxed mb-10"
          >
            {dict.systems.ctaText}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <a
              href={`/${locale}#contact`}
              className="group/cta inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: s.accent, boxShadow: `0 18px 50px -14px ${s.accent}` }}
            >
              {dict.systems.cta}
              <ArrowUpRight size={17} className="rtl:-scale-x-100 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Next system */}
      <Link href={`/${locale}/systems/${next.key}`} className="group/next relative block border-t border-app overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover/next:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(800px 300px at 50% 50%, ${next.accent}22, transparent 70%)` }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-14 py-16 md:py-24 flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-app-dim text-[11px] tracking-[0.3em] uppercase font-space mb-3">{dict.systems.nextSystem}</p>
            <p
              className="font-space font-bold text-app leading-none transition-transform duration-700 group-hover/next:translate-x-3 rtl:group-hover/next:-translate-x-3"
              style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)", letterSpacing: "-0.04em" }}
            >
              {next.name}
            </p>
            <p className="text-app-muted text-sm mt-3">{next.tagline}</p>
          </div>
          <span
            className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border flex items-center justify-center transition-transform duration-500 group-hover/next:scale-110 group-hover/next:rotate-45 rtl:group-hover/next:-rotate-45"
            style={{ borderColor: `${next.accent}66`, color: next.accent }}
          >
            <ArrowUpRight size={26} className="rtl:-scale-x-100" />
          </span>
        </div>
      </Link>
    </>
  );
}
