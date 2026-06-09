"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const projects = [
  {
    num: "01",
    name: "Sense Fragrance",
    category: "Luxury E-Commerce",
    year: "2025",
    desc: "Immersive fragrance e-commerce — 63% session depth increase, 38% conversion uplift in 60 days.",
    metrics: [
      { label: "Conv. Uplift", value: "+38%" },
      { label: "Session Depth", value: "+63%" },
      { label: "Stack", value: "Next.js" },
    ],
    poster: "/sense-preview.png",
    video: "/videos/sense.mp4",
    url: "https://sensefragrance.com",
    accent: "#3B82F6",
  },
  {
    num: "02",
    name: "El Raey Group",
    category: "Dress Atelier",
    year: "2026",
    desc: "Cinematic showcase for an elite dress atelier — curated gallery, tailored customer journey, Arabic-first design.",
    metrics: [
      { label: "Inquiries", value: "+212%" },
      { label: "Lighthouse", value: "98" },
      { label: "Stack", value: "Next.js" },
    ],
    poster: "/raey-preview.png",
    video: "/videos/raey.mp4",
    url: "https://raeygroup.com",
    accent: "#10B981",
  },
  {
    num: "03",
    name: "Express Maritime",
    category: "Marine & Maritime Supply",
    year: "2025",
    desc: "Professional Marine & Maritime Supply Services Across Egypt — full-catalogue platform connecting ports, vessels, and supply chains nationwide.",
    metrics: [
      { label: "Products", value: "500+" },
      { label: "Ports", value: "All Egypt" },
      { label: "Stack", value: "React" },
    ],
    poster: "/express-preview.png",
    video: "/videos/express.mp4",
    url: "https://expressservicess.com",
    accent: "#0EA5E9",
  },
  {
    num: "04",
    name: "Alanood Al Qadi",
    category: "Fashion Atelier",
    year: "2025",
    desc: "Refined digital presence for a distinguished fashion designer — editorial photography direction & bespoke gallery.",
    metrics: [
      { label: "Bounce", value: "−41%" },
      { label: "Avg. Session", value: "4m 12s" },
      { label: "Stack", value: "Next.js" },
    ],
    poster: "/alanod-preview.png",
    video: "/videos/alanood.mp4",
    url: "https://alanodalqadi.com",
    accent: "#8B5CF6",
  },
];

type Project = (typeof projects)[0];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  // Card translates at half scroll speed
  const cardY = useTransform(spring, [0, 1], [60, -60]);

  // Text moves opposite direction
  const textY = useTransform(spring, [0, 1], [-40, 40]);

  // Ghost number drifts
  const numY = useTransform(spring, [0, 1], [80, -80]);
  const numX = useTransform(spring, [0, 1], [index % 2 === 0 ? -20 : 20, 0]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const reverse = index % 2 === 1;

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  };
  const handleLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`grid md:grid-cols-12 gap-6 md:gap-16 items-center py-16 md:py-24 border-b border-app last:border-b-0 ${
        reverse ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* ── Media column ── */}
      <motion.div
        style={{ y: cardY }}
        className="md:col-span-7 [direction:ltr] relative"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Ghost number */}
        <motion.div
          aria-hidden
          style={{
            y: numY,
            x: numX,
            opacity: numOpacity,
            top: reverse ? "auto" : "-5%",
            bottom: reverse ? "-5%" : "auto",
            left: reverse ? "auto" : "-4%",
            right: reverse ? "-4%" : "auto",
          }}
          className="absolute pointer-events-none select-none z-0"
        >
          <span
            className="font-space font-black leading-none"
            style={{
              fontSize: "clamp(6rem, 14vw, 14rem)",
              WebkitTextStroke: `1.5px ${p.accent}35`,
              color: "transparent",
              letterSpacing: "-0.05em",
            }}
          >
            {p.num}
          </span>
        </motion.div>

        {/* Glow halo */}
        <motion.div
          aria-hidden
          animate={{ opacity: hovered ? 0.6 : 0.18, scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -inset-10 rounded-[2rem] pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${p.accent}40, transparent 65%)`,
            filter: "blur(40px)",
          }}
        />

        {/* Card */}
        <div className="relative z-10">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden border border-app bg-app-card"
            style={{
              boxShadow: hovered
                ? `0 40px 100px -20px ${p.accent}50, 0 0 0 1px ${p.accent}25`
                : "0 20px 70px -20px rgba(0,0,0,0.7)",
              transition: "box-shadow 0.7s ease",
            }}
          >
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-4 h-9 bg-app-deep border-b border-app">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-[11px] text-app-dim tracking-wide">
                {p.url.replace("https://", "")}
              </span>
            </div>

            {/* Image area */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.poster}
                  alt={p.name}
                  className="w-full h-full object-cover object-top"
                  style={{ opacity: playing ? 0 : 1, transition: "opacity 0.5s" }}
                />
                <video
                  ref={videoRef}
                  src={p.video}
                  poster={p.poster}
                  muted loop playsInline preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: playing ? 1 : 0, transition: "opacity 0.5s" }}
                />
              </div>

              {/* Shine sweep */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                }}
              />

              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

              {/* Status pill — only shown while playing */}
              {playing && (
                <div
                  className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase backdrop-blur-sm"
                  style={{
                    background: `${p.accent}20`,
                    border: `1px solid ${p.accent}50`,
                    color: "#fff",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.accent }} />
                  Playing
                </div>
              )}

              {/* Visit overlay */}
              <div className="absolute bottom-4 right-4 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-bold">
                Visit site <ArrowUpRight size={13} />
              </div>
            </div>
          </a>
        </div>

        {/* Floating deco square */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          className="absolute -bottom-4 -right-4 w-16 h-16 rounded-xl border hidden md:block z-10"
          style={{ borderColor: `${p.accent}35`, background: `${p.accent}07` }}
        />
      </motion.div>

      {/* ── Text column ── */}
      <motion.div
        style={{ y: textY }}
        className={`md:col-span-5 [direction:ltr] ${reverse ? "md:pr-2" : "md:pl-2"}`}
      >
        {/* Index line */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-space font-bold text-xs tracking-widest" style={{ color: p.accent }}>
            {p.num}
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px flex-1 origin-left"
            style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
          />
          <span className="text-app-dim text-[10px] tracking-[0.3em] uppercase font-space">{p.year}</span>
        </div>

        {/* Category reveal */}
        <div className="overflow-hidden mb-3">
          <motion.p
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-app-muted text-xs tracking-[0.3em] uppercase font-space"
          >
            {p.category}
          </motion.p>
        </div>

        {/* Title reveal */}
        <div className="overflow-hidden mb-5">
          <motion.h3
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-space font-bold text-app leading-[1.02]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", letterSpacing: "-0.025em" }}
          >
            {p.name}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.14 }}
          className="text-app-muted leading-relaxed text-sm md:text-base mb-8 max-w-sm"
        >
          {p.desc}
        </motion.p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2.5 mb-8 max-w-sm">
          {p.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.18 + i * 0.07 }}
              className="relative rounded-xl border border-app bg-app-card px-3 py-3 overflow-hidden hover:border-app-muted/30 transition-colors duration-300 group/metric"
            >
              <div
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 group-hover/metric:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
              />
              <div className="font-space font-black text-sm md:text-base leading-none mb-1" style={{ color: p.accent }}>
                {m.value}
              </div>
              <div className="text-app-dim text-[9px] tracking-[0.2em] uppercase">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.38 }}
          className="inline-flex items-center gap-3 group/cta"
        >
          <span
            className="relative w-11 h-11 rounded-full flex items-center justify-center border overflow-hidden transition-transform duration-300 group-hover/cta:scale-110"
            style={{ borderColor: `${p.accent}50`, background: `${p.accent}12` }}
          >
            <span
              className="absolute inset-0 rounded-full scale-0 group-hover/cta:scale-100 transition-transform duration-500 ease-out"
              style={{ background: p.accent, opacity: 0.2 }}
            />
            <Play size={13} fill={p.accent} color={p.accent} className="relative z-10 translate-x-[1px]" />
          </span>
          <span className="font-space font-semibold text-app-muted group-hover/cta:text-app text-sm flex items-center gap-1.5 transition-colors">
            View case study
            <ArrowUpRight
              size={14}
              className="opacity-40 group-hover/cta:opacity-100 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-all duration-300"
            />
          </span>
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeAccent, setActiveAccent] = useState(projects[0].accent);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  const headerY = useTransform(spring, [0, 0.25], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const glowX = useTransform(spring, [0, 0.5, 1], ["20%", "55%", "80%"]);
  const glowY = useTransform(spring, [0, 1], ["15%", "85%"]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * projects.length), projects.length - 1);
      if (idx >= 0) setActiveAccent(projects[idx].accent);
    });
  }, [scrollYProgress]);

  return (
    <section id="work" ref={sectionRef} className="bg-app border-t border-app relative overflow-hidden">

      {/* Scroll-tracked ambient glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAccent}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6 }}
          className="absolute pointer-events-none w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            left: glowX,
            top: glowY,
            background: `radial-gradient(circle, ${activeAccent}14 0%, transparent 55%)`,
            filter: "blur(100px)",
          }}
        />
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-8 md:px-14 relative z-10">
        {/* Header */}
        <motion.div
          style={{ y: headerY }}
          className="pt-24 md:pt-32 pb-4 flex items-end justify-between gap-4"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="works-eyebrow mb-4"
            >
              <span className="eyebrow-bar" aria-hidden="true" />
              <span className="eyebrow-tag">[02]</span>Selected Work
            </motion.p>
            <motion.h2
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-space font-bold text-app"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
            >
              Platforms we&apos;ve <span className="gradient-text">built.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="hidden md:block text-app-dim text-xs text-right max-w-[190px] leading-relaxed"
          >
          </motion.p>
        </motion.div>

        {/* Project list */}
        <div className="pb-24 md:pb-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
