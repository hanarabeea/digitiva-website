"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLenis } from "./SmoothScroll";

/* Clip-reveal wrapper */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: "hidden", lineHeight: 1 }}>
      <motion.div
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Floating card that shows a project preview */
function FloatingCard({
  src, alt, label, category, rotate, width, height,
  motionX, motionY,
}: {
  src: string; alt: string; label: string; category: string;
  rotate: number; width: number; height: number;
  motionX: ReturnType<typeof useSpring>;
  motionY: ReturnType<typeof useSpring>;
}) {
  return (
    <motion.div
      style={{ x: motionX, y: motionY, rotate }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute pointer-events-none select-none"
    >
      <div
        className="rounded-2xl overflow-hidden gradient-border shadow-2xl"
        style={{ width, height }}
      >
        {/* Browser chrome strip */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0A0D1A] border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]/80" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]/80" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]/80" />
          <div className="flex-1 mx-2 rounded bg-white/5 px-2 py-0.5 text-[9px] text-app-dim truncate">
            {label}
          </div>
        </div>
        <div className="relative" style={{ height: height - 28 }}>
          <Image src={src} alt={alt} fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-[#030712]/90 to-transparent">
            <p className="text-[9px] text-[#94A3B8] uppercase tracking-widest">{category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  /* ── Scroll parallax ── */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY    = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const orbY     = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const card1Y   = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const card2Y   = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* ── Mouse parallax ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 55, damping: 22 });
  const sy = useSpring(rawY, { stiffness: 55, damping: 22 });

  // Two cards move in opposite directions
  const card1mx = useTransform(sx, (v) => v * -28);
  const card1my = useTransform(sy, (v) => v * -28);
  const card2mx = useTransform(sx, (v) => v * 22);
  const card2my = useTransform(sy, (v) => v * 22);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5));
      rawY.set((e.clientY / window.innerHeight - 0.5));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden bg-app pt-20"
    >
      {/* ── Grid bg ── */}
      <motion.div style={{ y: gridY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, var(--bg) 82%)",
        }} />
      </motion.div>

      {/* ── Orbs ── */}
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="orb-blue absolute" style={{
          width: 750, height: 750, top: -220, right: -180,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.26) 0%, transparent 65%)",
          filter: "blur(110px)",
        }} />
        <div className="orb-green absolute" style={{
          width: 600, height: 600, bottom: -120, left: -140,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 65%)",
          filter: "blur(95px)",
        }} />
        <div className="orb-cyan absolute" style={{
          width: 400, height: 400, top: "40%", left: "38%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />
      </motion.div>

      {/* ── Geometric shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <motion.div
          initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: 1, rotate: 45 }}
          transition={{ duration: 2.5, delay: 1.6 }}
          style={{ position: "absolute", right: "22%", top: "16%",
            width: 90, height: 90, border: "1px solid rgba(59,130,246,0.14)",
            transform: "rotate(45deg)" }}
        />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.9 }}
          style={{ position: "absolute", left: "7%", bottom: "28%",
            width: 130, height: 130, borderRadius: "50%",
            border: "1px solid rgba(16,185,129,0.18)" }}
        />
        {/* Moving dot cluster */}
        {[
          { l: "15%", t: "25%", s: -90, d: 0.4 },
          { l: "80%", t: "55%", s: 70,  d: 0.7 },
          { l: "55%", t: "75%", s: -60, d: 1.0 },
          { l: "30%", t: "60%", s: 80,  d: 0.2 },
          { l: "70%", t: "20%", s: -50, d: 0.9 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + dot.d }}
            style={{ position: "absolute", left: dot.l, top: dot.t,
              width: 6, height: 6, borderRadius: "50%",
              background: "rgba(59,130,246,0.5)" }}
          />
        ))}
      </div>

      {/* ── Floating project cards (scroll + mouse parallax combined) ── */}
      {/* Card 1 — Sense Fragrance — top right */}
      <motion.div
        style={{ y: card1Y }}
        className="absolute top-[12%] right-[4%] z-20 hidden lg:block"
      >
        <FloatingCard
          src="https://images.unsplash.com/photo-1594913023767-4462a4c3ee70?w=500&q=85"
          alt="Sense Fragrance"
          label="sensefragrance.com"
          category="Luxury E-Commerce"
          rotate={-9}
          width={240}
          height={165}
          motionX={card1mx}
          motionY={card1my}
        />
      </motion.div>

      {/* Card 2 — Fashion — bottom left */}
      <motion.div
        style={{ y: card2Y }}
        className="absolute bottom-[18%] left-[3%] z-20 hidden lg:block"
      >
        <FloatingCard
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=85"
          alt="Alanood Al Qadi"
          label="alanodalqadi.com"
          category="Fashion Atelier"
          rotate={8}
          width={200}
          height={260}
          motionX={card2mx}
          motionY={card2my}
        />
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex flex-col flex-1"
      >
        {/* Top bar */}
        <div className="max-w-[1400px] mx-auto w-full px-8 md:px-14 flex items-center justify-between pt-10 pb-8">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] tracking-[0.28em] uppercase text-app-faint">Digital Studio</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[11px] tracking-[0.28em] uppercase text-[#2D3748]"
          >
            Est. 2024
          </motion.div>
        </div>

        {/* Giant heading */}
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-center pb-10">
          <div
            className="font-space font-bold text-app select-none"
            style={{ fontSize: "clamp(3rem, 10.2vw, 10.5rem)", lineHeight: 0.92, letterSpacing: "-0.03em" }}
          >
            <Reveal delay={0.3}><span>We Design</span></Reveal>
            <Reveal delay={0.46}><span>the Future</span></Reveal>
            <Reveal delay={0.62}><span className="gradient-text">People Feel.</span></Reveal>
          </div>

          {/* Sub-row */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95 }}
              className="max-w-xs text-app-faint text-sm leading-relaxed"
            >
              Strategy · AI · Interface craft — launching timeless digital experiences for
              founders and marketing leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="flex items-center gap-5 shrink-0"
            >
              <button
                onClick={() => lenis?.scrollTo("#work", { offset: -80, duration: 1.6 })}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white btn-shimmer hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4,#10B981,#3B82F6)", backgroundSize: "200% auto" }}
              >
                View Work
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => lenis?.scrollTo("#contact", { offset: -80, duration: 1.6 })}
                className="text-sm text-app-faint hover:text-white transition-colors border-b border-[#334155] hover:border-white pb-0.5"
              >
                Start a project →
              </button>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="max-w-[1400px] mx-auto w-full px-8 md:px-14 py-7 border-t border-app flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { val: "92", label: "NPS Score" },
            { val: "94%", label: "Retention" },
            { val: "6wk", label: "Avg. Delivery" },
            { val: "3+", label: "Markets" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-space font-bold text-2xl gradient-text">{s.val}</span>
              <span className="text-app-dim text-xs uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
