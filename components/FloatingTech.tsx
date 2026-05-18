"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

/* -------- Tiny SVG hardware (no images, pure vector) -------- */

function Keyboard() {
  const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"],
  ];
  return (
    <div
      className="rounded-2xl border bg-gradient-to-b from-[#0B0F1F] to-[#05060F] p-4 md:p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      style={{ borderColor: "rgba(255,255,255,0.08)", width: 360 }}
    >
      <div className="space-y-1.5">
        {rows.map((r, ri) => (
          <div key={ri} className="flex gap-1.5 justify-center">
            {r.map((k) => (
              <span
                key={k}
                className="flex-1 text-center text-[10px] font-space font-medium text-[#94A3B8] rounded-md py-2 border"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))",
                  borderColor: "rgba(255,255,255,0.06)",
                  maxWidth: 28,
                }}
              >
                {k}
              </span>
            ))}
          </div>
        ))}
        <div className="flex gap-1.5 justify-center pt-1">
          <span
            className="w-1/2 text-center text-[9px] font-space text-[#3B82F6] rounded-md py-2 border"
            style={{
              background: "linear-gradient(180deg, rgba(59,130,246,0.12), rgba(59,130,246,0.02))",
              borderColor: "rgba(59,130,246,0.25)",
            }}
          >
            DIGITIVA
          </span>
        </div>
      </div>
    </div>
  );
}

function Mouse() {
  return (
    <svg width="120" height="180" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E293B" />
          <stop offset="1" stopColor="#05060F" />
        </linearGradient>
        <linearGradient id="mscroll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <path
        d="M60 5 C 95 5 105 35 105 90 C 105 145 90 175 60 175 C 30 175 15 145 15 90 C 15 35 25 5 60 5 Z"
        fill="url(#mb)"
        stroke="rgba(255,255,255,0.1)"
      />
      <line x1="60" y1="10" x2="60" y2="78" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
      <rect x="54" y="34" width="12" height="22" rx="6" fill="url(#mscroll)" />
      <circle cx="60" cy="115" r="22" fill="rgba(59,130,246,0.08)" />
    </svg>
  );
}

function PhoneFrame() {
  return (
    <div
      className="rounded-[36px] border bg-gradient-to-b from-[#0B0F1F] to-[#05060F] p-2 shadow-[0_30px_60px_-20px_rgba(59,130,246,0.4)]"
      style={{ width: 180, height: 360, borderColor: "rgba(59,130,246,0.25)" }}
    >
      <div className="w-full h-full rounded-[28px] overflow-hidden relative border" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/30 via-[#06B6D4]/15 to-[#10B981]/25" />
        <div className="absolute inset-x-0 top-0 h-7 bg-[#05060F]/80 flex items-center justify-center">
          <div className="w-16 h-2 rounded-full bg-black/60" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
          <span className="text-[9px] tracking-[0.35em] uppercase text-white/60 mb-2">Digitiva</span>
          <span className="font-space font-bold text-white text-lg leading-tight">Where ideas meet pixels</span>
          <div className="mt-4 px-3 py-1.5 rounded-full bg-white text-[#05060F] text-[10px] font-semibold">
            Get started
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserCard() {
  return (
    <div
      className="rounded-2xl border overflow-hidden bg-gradient-to-b from-[#0B0F1F] to-[#05060F] shadow-[0_30px_60px_-20px_rgba(16,185,129,0.35)]"
      style={{ width: 340, height: 220, borderColor: "rgba(16,185,129,0.25)" }}
    >
      <div className="h-7 px-3 flex items-center gap-1.5 border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-red-500/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <span className="w-2 h-2 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[9px] text-[#475569]">digitivaa.com</span>
      </div>
      <div className="p-5">
        <div className="h-2 w-16 bg-[#3B82F6]/40 rounded-full mb-3" />
        <div className="h-3 w-3/4 bg-white/15 rounded-full mb-2" />
        <div className="h-3 w-2/3 bg-white/10 rounded-full mb-5" />
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square rounded-lg bg-gradient-to-br from-[#3B82F6]/30 to-transparent border border-white/5" />
          <div className="aspect-square rounded-lg bg-gradient-to-br from-[#06B6D4]/30 to-transparent border border-white/5" />
          <div className="aspect-square rounded-lg bg-gradient-to-br from-[#10B981]/30 to-transparent border border-white/5" />
        </div>
      </div>
    </div>
  );
}

function Cube({ children, depth = 80 }: { children: React.ReactNode; depth?: number }) {
  return (
    <div className="preserve-3d" style={{ transformStyle: "preserve-3d", transform: `translateZ(${depth}px)` }}>
      {children}
    </div>
  );
}

/* -------- Section -------- */

export default function FloatingTech() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const sy = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const rotY = useTransform(sx, [-1, 1], [-22, 22]);
  const rotX = useTransform(sy, [-1, 1], [16, -16]);

  // Parallax depth on scroll
  const yBack  = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative bg-app-deep py-24 md:py-32 border-y border-app overflow-hidden"
    >
      {/* Ambient orbs */}
      <motion.div
        style={{ y: yBack }}
        aria-hidden
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)", filter: "blur(60px)" }} />
      </motion.div>
      <motion.div
        style={{ y: yFront }}
        aria-hidden
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 65%)", filter: "blur(60px)" }} />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.25em] uppercase text-[#3B82F6] mb-4"
          >
            — The toolkit
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-space font-bold text-app"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
            >
              Pixels, keystrokes, <span className="gradient-text">and a lot of taste</span>
            </motion.h2>
          </div>
          <p className="mt-5 text-app-muted max-w-xl text-sm md:text-base leading-relaxed">
            Move your cursor across the scene — every device tilts with you. We obsess over the small mechanics so your customers feel the quality before they read a single word.
          </p>
        </div>

        {/* 3D Stage */}
        <div
          className="scene-3d relative h-[560px] md:h-[640px] rounded-3xl border border-app overflow-hidden bg-app"
          style={{ perspective: 1400 }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Floor glow */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center bottom, rgba(59,130,246,0.18), transparent 70%)" }}
          />

          {/* 3D content */}
          <motion.div
            style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Center keyboard */}
            <motion.div
              className="absolute"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cube depth={0}>
                <Keyboard />
              </Cube>
            </motion.div>

            {/* Top-left phone */}
            <motion.div
              className="absolute top-[8%] left-[6%] md:left-[10%]"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ y: [0, 14, 0], rotate: [-6, -4, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cube depth={140}>
                <div style={{ transform: "rotate(-8deg)" }}>
                  <PhoneFrame />
                </div>
              </Cube>
            </motion.div>

            {/* Right browser */}
            <motion.div
              className="absolute top-[14%] right-[6%] md:right-[10%]"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ y: [0, -12, 0], rotate: [4, 6, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cube depth={100}>
                <div style={{ transform: "rotate(6deg)" }}>
                  <BrowserCard />
                </div>
              </Cube>
            </motion.div>

            {/* Bottom-right mouse */}
            <motion.div
              className="absolute bottom-[8%] right-[18%] md:right-[26%]"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ y: [0, -10, 0], rotate: [10, 14, 10] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cube depth={60}>
                <div style={{ transform: "rotate(12deg)" }}>
                  <Mouse />
                </div>
              </Cube>
            </motion.div>

            {/* Floating dots */}
            {[
              { x: "20%", y: "30%", c: "#3B82F6", d: 4 },
              { x: "78%", y: "65%", c: "#10B981", d: 5 },
              { x: "55%", y: "20%", c: "#06B6D4", d: 6 },
              { x: "30%", y: "75%", c: "#8B5CF6", d: 4.5 },
            ].map((p, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: p.x,
                  top: p.y,
                  width: 8,
                  height: 8,
                  background: p.c,
                  boxShadow: `0 0 16px ${p.c}`,
                }}
                animate={{ y: [0, -16, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>

          {/* Caption pill */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-app-card/80 backdrop-blur-md border border-app text-[10px] tracking-[0.25em] uppercase text-app-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Interactive · move your cursor
            </div>
            <div className="flex gap-2">
              {["Next.js", "Framer Motion", "Tailwind", "TypeScript"].map((t) => (
                <span
                  key={t}
                  className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-space text-app-muted border border-app bg-app-card/60 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
