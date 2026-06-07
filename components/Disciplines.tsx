"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const disciplines = [
  {
    n: "01",
    total: "04",
    title: "Strategy",
    desc: "We align ambition, audience, and commercial goals before design decisions begin, so the product moves with intent instead of guesswork.",
    bullets: ["Briefing & Workshop", "Competitor Analysis", "Brand Strategy", "Roadmap"],
    accent: "#3B82F6",
    image: "/strategie.jpg",
  },
  {
    n: "02",
    total: "04",
    title: "Design",
    desc: "Interfaces are shaped to feel premium at first glance and effortless after a minute, with rhythm, hierarchy, and restraint built into every screen.",
    bullets: ["UI Systems", "Prototypes", "Art Direction", "Motion Design"],
    accent: "#06B6D4",
    image: "/design.jpg",
  },
  {
    n: "03",
    total: "04",
    title: "Build",
    desc: "We engineer resilient frontends and business platforms that stay fast under pressure, scale cleanly, and remain maintainable after launch.",
    bullets: ["Next.js & React", "Architecture", "Performance", "TypeScript"],
    accent: "#8B5CF6",
    image: "/build.jpg",
  },
  {
    n: "04",
    total: "04",
    title: "Launch",
    desc: "QA, performance, accessibility, SEO — then go live with a polished plan. We stay close through the first weeks to tune what matters.",
    bullets: ["Go-live Plan", "SEO & Speed", "Accessibility", "Support"],
    accent: "#10B981",
    image: "/launch.jpg",
  },
];

export default function Disciplines() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const textX = useTransform(scrollYProgress, [0, 1], ["5%", "-60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.03, 0.92, 1], [0, 0.08, 0.08, 0]);

  return (
    <section
      ref={containerRef}
      id="disciplines"
      className="relative expertise bg-app-deep border-t border-app"
      style={{ overflow: "clip" }}
    >
      {/* Background text — sticky inside section, clipped by overflow:clip on parent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: textX, opacity: textOpacity }} className="whitespace-nowrap watermark-text">
            <span className="text-[18vw] font-space font-bold uppercase tracking-[-0.05em] text-app select-none">
              Disciplines &amp; Capabilities
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 expertise-section">

        {/* Header — constrained width */}
        <header className="expertise-head max-w-[1400px] mx-auto px-6 md:px-14 pt-24 md:pt-32">
          <p className="expertise-eyebrow">
            <span className="eyebrow-bar" aria-hidden="true" />
            <span className="eyebrow-tag">[04]</span>Our Expertise
          </p>
          <h2 className="expertise-title">
            Ideas need{" "}
            <span className="italic font-normal text-[#3B82F6] font-serif">multiple</span>{" "}
            <span className="italic font-normal text-[#10B981] font-serif">forces.</span>
          </h2>
        </header>

        {/* Stacked cards — full bleed with small padding only */}
        <div className="expertise-stack mt-16 md:mt-24 pb-24 md:pb-32 px-6 md:px-28">
          {disciplines.map((d, idx) => (
            <DisciplineCard key={d.n} d={d} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

function DisciplineCard({
  d,
  idx,
}: {
  d: (typeof disciplines)[0];
  idx: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

  return (
    <div
      ref={cardRef}
      className="expertise-card-pin"
      style={{ "--i": idx, zIndex: idx + 1 } as React.CSSProperties}
    >
      <motion.article
        style={{ scale, opacity }}
        className="expertise-card group cursor-default overflow-hidden rounded-2xl border border-app bg-app-card/80"
      >
        {/* LEFT — full image */}
        <div className="expertise-card-media relative overflow-hidden border-b lg:border-b-0 lg:border-r border-app">
          <Image
            src={d.image}
            alt={d.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
          {/* Dark overlay so image doesn't compete with text on mobile */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500" />
        </div>

        {/* RIGHT — text */}
        <div className="expertise-card-body flex flex-col justify-center gap-6">

          {/* Number */}
          <p className="font-space text-sm font-bold tracking-[0.15em]" style={{ color: d.accent }}>
            {d.n} <span className="text-app-faint font-normal">/ {d.total}</span>
          </p>

          {/* Title */}
          <h3
            className="font-space font-bold text-app leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            {d.title}
          </h3>

          {/* Description */}
          <p className="text-app-muted text-base md:text-lg leading-relaxed max-w-md">
            {d.desc}
          </p>

          {/* Bullets — horizontal row like wibify */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-app">
            {d.bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 text-app-dim text-[10px] font-space font-bold uppercase tracking-[0.18em]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: d.accent }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}
