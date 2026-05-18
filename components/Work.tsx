"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";

const projects = [
  {
    num: "01",
    name: "Sense Fragrance",
    category: "Luxury E-Commerce",
    year: "2024",
    desc: "Immersive fragrance e-commerce — 63% session depth increase, 38% conversion uplift in 60 days.",
    metrics: [
      { label: "Conv. Uplift", value: "+38%" },
      { label: "Session Depth", value: "+63%" },
      { label: "Stack", value: "Next.js" },
    ],
    poster: "https://images.unsplash.com/photo-1594913023767-4462a4c3ee70?w=1600&q=85",
    video: "/videos/sense.mp4",
    url: "https://sensefragrance.com",
    accent: "#3B82F6",
  },
  {
    num: "02",
    name: "Alanood Al Qadi",
    category: "Fashion Atelier",
    year: "2024",
    desc: "Refined digital presence for a distinguished fashion designer — editorial photography direction & bespoke gallery.",
    metrics: [
      { label: "Bounce", value: "−41%" },
      { label: "Avg. Session", value: "4m 12s" },
      { label: "Stack", value: "Next.js" },
    ],
    poster: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85",
    video: "/videos/alanood.mp4",
    url: "https://alanodalqadi.com",
    accent: "#8B5CF6",
  },
  {
    num: "03",
    name: "El Raey Group",
    category: "Dress Atelier",
    year: "2024",
    desc: "Cinematic showcase for an elite dress atelier — curated gallery, tailored customer journey, Arabic-first design.",
    metrics: [
      { label: "Inquiries", value: "+212%" },
      { label: "Lighthouse", value: "98" },
      { label: "Stack", value: "Next.js" },
    ],
    poster: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85",
    video: "/videos/raey.mp4",
    url: "https://raeygroup.digitivaa.com",
    accent: "#10B981",
  },
];

function ProjectCase({ p, index }: { p: typeof projects[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const reverse = index % 2 === 1;

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center mb-24 md:mb-40 ${
        reverse ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* Media */}
      <motion.div
        style={{ y: mediaY }}
        className="md:col-span-7 [direction:ltr] relative"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        data-cursor-hover
      >
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.06] group"
        >
          {/* Poster fallback */}
          <Image
            src={p.poster}
            alt={p.name}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: playing ? 0 : 1 }}
            sizes="(max-width: 768px) 100vw, 60vw"
          />

          {/* Video — drop your screen recording at public{p.video} */}
          <video
            ref={videoRef}
            src={p.video}
            poster={p.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: playing ? 1 : 0, transition: "opacity 500ms" }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#05060F]/60 via-transparent to-transparent" />

          {/* Play badge */}
          <div
            className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] tracking-[0.25em] uppercase font-medium"
            style={{
              background: `${p.accent}22`,
              border: `1px solid ${p.accent}55`,
              color: "#fff",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: p.accent }}
            />
            {playing ? "Playing" : "Hover to preview"}
          </div>

          {/* Visit pill */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#05060F] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Visit site <ArrowUpRight size={14} />
          </div>

          {/* Browser chrome top bar */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-1.5 px-4 bg-[#0A0B1A]/85 backdrop-blur-md border-b border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
            <span className="ml-3 text-[10px] text-app-muted tracking-wide truncate">
              {p.url.replace("https://", "")}
            </span>
          </div>
        </a>

        {/* Floating accent square */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl border hidden md:block"
          style={{ borderColor: `${p.accent}40`, background: `${p.accent}08` }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        style={{ y: textY }}
        className={`md:col-span-5 [direction:ltr] ${reverse ? "md:pr-4" : "md:pl-4"}`}
      >
        <div className="flex items-center gap-4 mb-5">
          <span
            className="font-space font-bold text-sm"
            style={{ color: p.accent }}
          >
            {p.num}
          </span>
          <span className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-[#475569] text-[10px] tracking-[0.3em] uppercase">
            {p.year}
          </span>
        </div>

        <p className="text-app-muted text-xs tracking-[0.25em] uppercase mb-3">
          {p.category}
        </p>

        <h3
          className="font-space font-bold text-app mb-5"
          style={{
            fontSize: "clamp(1.8rem, 3.4vw, 3rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {p.name}
        </h3>

        <p className="text-app-muted leading-relaxed mb-8 max-w-md">{p.desc}</p>

        <div className="grid grid-cols-3 gap-3 mb-8 max-w-md">
          {p.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
            >
              <div
                className="font-space font-bold text-sm md:text-base"
                style={{ color: p.accent }}
              >
                {m.value}
              </div>
              <div className="text-[#475569] text-[9px] tracking-[0.2em] uppercase mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="inline-flex items-center gap-3 group"
        >
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
            style={{
              borderColor: `${p.accent}60`,
              background: `${p.accent}12`,
              color: p.accent,
            }}
          >
            <Play size={14} fill={p.accent} />
          </span>
          <span className="font-space font-medium text-app text-sm tracking-wide">
            View case study
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const labelY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  return (
    <section id="work" ref={ref} className="bg-app py-24 md:py-32 border-t border-app relative overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-14 relative">

        {/* Header */}
        <motion.div style={{ y: labelY }} className="flex items-end justify-between mb-20 md:mb-28 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.25em] uppercase text-[#3B82F6] mb-4"
            >
              — Selected Work
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-space font-bold text-app"
                style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                Platforms we&apos;ve{" "}
                <span className="gradient-text">built</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-[#334155] text-xs text-right max-w-[200px] leading-relaxed"
          >
            Hover any project to play a live screen-capture preview
          </motion.p>
        </motion.div>

        {/* Projects */}
        <div>
          {projects.map((p, i) => (
            <ProjectCase key={p.num} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
