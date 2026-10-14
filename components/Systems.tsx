"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useLenis } from "./SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

// Screenshots are taken from the real systems running on demo data; order matches `screens` in the dictionaries.
const SYSTEM_META = [
  {
    key: "digiflow",
    accent: "#10B981",
    shots: ["pos", "tables", "waiter_order", "kds", "cashier", "dashboard", "prodsales"],
    phone: "/systems/digiflow-mobile.webp",
  },
  {
    key: "digiclinic",
    accent: "#E5484D",
    shots: ["reception", "visit", "rx", "week", "home", "record", "booking"],
    phone: undefined,
  },
];

type System = Dictionary["systems"]["items"][number] & (typeof SYSTEM_META)[number];

const shotSrc = (s: System, i: number) => `/systems/${s.key}-${s.shots[i]}.webp`;

/* ───────────────────────── Card ───────────────────────── */

function SystemCard({ s, index, dict, onOpen }: { s: System; index: number; dict: Dictionary; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });
  const y = useTransform(spring, [0, 1], [index % 2 ? 70 : 40, index % 2 ? -30 : -50]);
  const phoneY = useTransform(spring, [0, 1], [60, -60]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {/* Glow halo */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 0.55 : 0.15, scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -inset-8 rounded-[2rem] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 40%, ${s.accent}40, transparent 65%)`, filter: "blur(40px)" }}
      />

      <motion.button
        type="button"
        layoutId={`system-${s.key}`}
        onClick={onOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative block w-full text-start rounded-[1.75rem] border border-app bg-app-card overflow-hidden"
        style={{
          boxShadow: hovered
            ? `0 40px 100px -20px ${s.accent}55, 0 0 0 1px ${s.accent}30`
            : "0 20px 70px -20px rgba(0,0,0,0.55)",
          transition: "box-shadow 0.7s ease",
        }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* Screenshot */}
        <motion.div layoutId={`system-shot-${s.key}`} className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <Image
            src={shotSrc(s, 0)}
            alt={`${s.name} — ${s.screens[0].title}`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {/* Shine sweep */}
          <div
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none"
            style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.09) 50%, transparent 70%)" }}
          />
          <span
            className="absolute top-4 start-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase backdrop-blur-md text-white"
            style={{ background: `${s.accent}26`, border: `1px solid ${s.accent}66` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
            {s.badge}
          </span>
        </motion.div>

        {/* Text */}
        <div className="relative p-6 md:p-8">
          <p className="text-app-dim text-[11px] tracking-[0.3em] uppercase font-space mb-2">{s.tagline}</p>
          <motion.h3
            layoutId={`system-name-${s.key}`}
            className="font-space font-bold text-app leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            {s.name}
          </motion.h3>
          <p className="text-app-muted text-sm md:text-base leading-relaxed mb-6 max-w-lg">{s.desc}</p>

          <div className="grid grid-cols-3 gap-2.5 mb-7">
            {s.highlights.map((h) => (
              <div key={h.label} className="rounded-xl border border-app bg-app-deep px-3 py-3">
                <div className="font-space font-black text-sm md:text-base leading-none mb-1.5" style={{ color: s.accent }}>
                  {h.value}
                </div>
                <div className="text-app-dim text-[10px] leading-snug">{h.label}</div>
              </div>
            ))}
          </div>

          <span className="inline-flex items-center gap-3">
            <span
              className="relative w-11 h-11 rounded-full flex items-center justify-center border overflow-hidden transition-transform duration-300 group-hover:scale-110"
              style={{ borderColor: `${s.accent}55`, background: `${s.accent}14` }}
            >
              <span
                className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                style={{ background: s.accent, opacity: 0.22 }}
              />
              <ArrowUpRight size={16} color={s.accent} className="relative rtl:-scale-x-100" />
            </span>
            <span className="font-space font-semibold text-app-muted group-hover:text-app text-sm transition-colors">
              {dict.systems.explore}
            </span>
          </span>
        </div>
      </motion.button>

      {/* Floating phone (waiter screen) */}
      {s.phone && (
        <motion.div
          aria-hidden
          style={{ y: phoneY }}
          className="hidden lg:block absolute -end-6 top-[18%] w-[22%] rounded-[1.4rem] border-[5px] border-[#0b0f1a] bg-[#0b0f1a] shadow-2xl overflow-hidden pointer-events-none"
        >
          <div className="relative" style={{ aspectRatio: "585/1266" }}>
            <Image src={s.phone} alt="" fill sizes="200px" className="object-cover object-top" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ───────────────────────── Detail panel ───────────────────────── */

function SystemPanel({ s, dict, onClose }: { s: System; dict: Dictionary; onClose: (then?: string) => void }) {
  const [[active, dir], setActive] = useState<[number, number]>([0, 0]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const count = s.screens.length;

  const go = useCallback(
    (to: number) => setActive(([cur]) => [((to % count) + count) % count, to > cur ? 1 : -1]),
    [count]
  );

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Arrow keys follow the reading direction.
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") go(active + (rtl ? -1 : 1));
      if (e.key === "ArrowLeft") go(active + (rtl ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, onClose]);

  // Keep the active thumbnail centred in its strip. Measured with rects (not scrollIntoView, which would also
  // scroll the panel body) so it works the same in LTR and RTL.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!strip || !tab) return;
    const s = strip.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    strip.scrollBy({ left: t.left + t.width / 2 - (s.left + s.width / 2), behavior: "smooth" });
  }, [active]);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: 0.15 } },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-0 md:p-6" role="dialog" aria-modal="true" aria-label={s.name}>
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => onClose()}
      />

      <motion.div
        layoutId={`system-${s.key}`}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative w-full h-full md:h-[min(92vh,980px)] max-w-[1400px] md:rounded-[1.75rem] border border-app bg-app-card overflow-hidden flex flex-col"
        style={{ boxShadow: `0 60px 160px -30px ${s.accent}55` }}
      >
        {/* Accent wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(1000px 500px at 85% -10%, ${s.accent}1f, transparent 60%)` }}
        />

        {/* Top bar */}
        <div className="relative flex items-center justify-between gap-4 px-5 md:px-8 h-16 md:h-20 border-b border-app shrink-0">
          <div className="flex items-baseline gap-3 min-w-0">
            <motion.h3
              layoutId={`system-name-${s.key}`}
              className="font-space font-bold text-app leading-none truncate"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", letterSpacing: "-0.03em" }}
            >
              {s.name}
            </motion.h3>
            <motion.span {...reveal(0.25)} className="hidden sm:inline text-app-dim text-xs tracking-[0.25em] uppercase font-space truncate">
              {s.tagline}
            </motion.span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => onClose()}
            aria-label={dict.systems.close}
            className="w-11 h-11 shrink-0 rounded-full border border-app flex items-center justify-center text-app-muted hover:text-app hover:rotate-90 transition-all duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div data-lenis-prevent className="relative flex-1 overflow-y-auto overscroll-contain">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-5 md:p-8 lg:p-10">
            {/* Viewer */}
            <div className="lg:col-span-8 min-w-0">
              <motion.p {...reveal(0.3)} className="text-app-dim text-[11px] tracking-[0.3em] uppercase font-space mb-4">
                {dict.systems.screensTitle}
              </motion.p>

              <motion.div
                layoutId={`system-shot-${s.key}`}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative rounded-2xl overflow-hidden border border-app bg-app-deep"
                style={{ aspectRatio: "16/10" }}
              >
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.div
                    key={active}
                    custom={dir}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: `${d * 6}%`, scale: 1.02, filter: "blur(6px)" }),
                      center: { opacity: 1, x: "0%", scale: 1, filter: "blur(0px)" },
                      exit: (d: number) => ({ opacity: 0, x: `${d * -6}%`, scale: 0.98, filter: "blur(6px)" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={shotSrc(s, active)}
                      alt={`${s.name} — ${s.screens[active].title}`}
                      fill
                      sizes="(max-width: 1023px) 100vw, 66vw"
                      className="object-cover object-top"
                      priority={active === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev / next */}
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  {[
                    { label: dict.systems.prev, to: active - 1, Icon: ChevronLeft },
                    { label: dict.systems.next, to: active + 1, Icon: ChevronRight },
                  ].map(({ label, to, Icon }) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      onClick={() => go(to)}
                      className="pointer-events-auto w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur text-white flex items-center justify-center transition-colors"
                    >
                      <Icon size={18} className="rtl:-scale-x-100" />
                    </button>
                  ))}
                </div>

                {/* Progress */}
                <div className="absolute bottom-0 inset-x-0 h-[3px] bg-black/20">
                  <motion.div
                    className="h-full origin-left rtl:origin-right"
                    style={{ background: s.accent }}
                    animate={{ scaleX: (active + 1) / count }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </div>
              </motion.div>

              {/* Caption */}
              <div className="min-h-[4.5rem] mt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h4 className="font-space font-bold text-app text-lg md:text-xl mb-1">
                      <span className="font-mono text-xs me-3" style={{ color: s.accent }}>
                        {String(active + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
                      </span>
                      {s.screens[active].title}
                    </h4>
                    <p className="text-app-muted text-sm md:text-base leading-relaxed">{s.screens[active].caption}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tabs */}
              <motion.div {...reveal(0.4)} ref={tabsRef} className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 [scrollbar-width:none]">
                {s.screens.map((sc, i) => (
                  <button
                    key={sc.title}
                    type="button"
                    data-tab={i}
                    onClick={() => go(i)}
                    className="relative shrink-0 w-28 md:w-32 rounded-xl overflow-hidden border text-start transition-all duration-300"
                    style={{
                      borderColor: i === active ? s.accent : "var(--border)",
                      opacity: i === active ? 1 : 0.6,
                    }}
                  >
                    <div className="relative" style={{ aspectRatio: "16/10" }}>
                      <Image src={shotSrc(s, i)} alt="" fill sizes="128px" className="object-cover object-top" />
                    </div>
                    <div className="px-2 py-1.5 text-[11px] font-semibold text-app truncate bg-app-deep">{sc.title}</div>
                    {i === active && (
                      <motion.span
                        layoutId={`system-tab-${s.key}`}
                        className="absolute inset-x-0 top-0 h-[3px]"
                        style={{ background: s.accent }}
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Info */}
            <div className="lg:col-span-4 min-w-0">
              <motion.p {...reveal(0.35)} className="text-app-muted leading-relaxed text-base md:text-lg mb-7">
                {s.desc}
              </motion.p>

              <div className="grid grid-cols-3 gap-2.5 mb-9">
                {s.highlights.map((h, i) => (
                  <motion.div key={h.label} {...reveal(0.42 + i * 0.06)} className="rounded-xl border border-app bg-app-deep px-3 py-3">
                    <div className="font-space font-black text-sm leading-none mb-1.5" style={{ color: s.accent }}>
                      {h.value}
                    </div>
                    <div className="text-app-dim text-[10px] leading-snug">{h.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.p {...reveal(0.5)} className="text-app-dim text-[11px] tracking-[0.3em] uppercase font-space mb-4">
                {dict.systems.featuresTitle}
              </motion.p>
              <ul className="space-y-3 mb-9">
                {s.features.map((f, i) => (
                  <motion.li key={f} {...reveal(0.55 + i * 0.045)} className="flex items-start gap-3 text-sm text-app-muted leading-relaxed">
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
                {...reveal(0.9)}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose("#contact");
                }}
                className="group/cta inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: s.accent, boxShadow: `0 16px 40px -12px ${s.accent}` }}
              >
                {dict.systems.cta}
                <ArrowUpRight size={16} className="rtl:-scale-x-100 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export default function Systems({ dict }: { dict: Dictionary }) {
  const lenis = useLenis();
  const systems: System[] = dict.systems.items.map((s, i) => ({ ...s, ...SYSTEM_META[i] }));
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = systems.find((s) => s.key === openKey) ?? null;

  // Freeze the page behind the panel (Lenis on desktop, plain overflow on touch devices).
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
      lenis?.start();
    };
  }, [open, lenis]);

  const close = useCallback(
    (then?: string) => {
      setOpenKey(null);
      if (typeof then === "string") {
        setTimeout(() => {
          if (lenis) lenis.scrollTo(then, { offset: -80, duration: 1.6 });
          else document.querySelector(then)?.scrollIntoView({ behavior: "smooth" });
        }, 450);
      }
    },
    [lenis]
  );

  return (
    <section id="systems" className="bg-app-deep border-t border-app relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none w-[900px] h-[900px] -top-60 start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 60%)", filter: "blur(80px)" }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-14 relative z-10 pt-24 md:pt-32 pb-28 md:pb-40">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
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
                initial={{ y: "105%" }}
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
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-10 lg:gap-16">
          {systems.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            >
              <SystemCard s={s} index={i} dict={dict} onOpen={() => setOpenKey(s.key)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <SystemPanel key={open.key} s={open} dict={dict} onClose={close} />}</AnimatePresence>
    </section>
  );
}
