"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, BarChart3, Globe, Layers, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services = [
  {
    num: "01",
    icon: ShoppingBag,
    title: "E-Commerce Platforms",
    tag: "Shopify · Next.js · Headless",
    year: "2024",
    accent: "#3B82F6",
  },
  {
    num: "02",
    icon: BarChart3,
    title: "ERP Systems",
    tag: "Custom ERP · API · Dashboards",
    year: "2025",
    accent: "#06B6D4",
  },
  {
    num: "03",
    icon: Globe,
    title: "Web Development",
    tag: "React · TypeScript · Node.js",
    year: "2025",
    accent: "#8B5CF6",
  },
  {
    num: "04",
    icon: Layers,
    title: "UI/UX Design",
    tag: "Figma · Design Systems · Prototyping",
    year: "2025",
    accent: "#10B981",
  },
  {
    num: "05",
    icon: Sparkles,
    title: "Digital Invitations",
    tag: "Custom · Animated · RSVP",
    year: "2025",
    accent: "#F59E0B",
  },
];

function TextRollLetters({ text }: { text: string }) {
  return (
    <span className="works-text-roll" aria-label={text}>
      <span className="works-text-roll-row">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="works-text-roll-letter"
            style={{ "--i": i } as React.CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="works-text-roll-row works-text-roll-clone" aria-hidden="true">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="works-text-roll-letter"
            style={{ "--i": i } as React.CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  );
}

function WorkItem({
  s,
  index,
}: {
  s: (typeof services)[0];
  index: number;
}) {
  const Icon = s.icon;

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="works-item"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div
        className="works-link group"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }}
      >
        {/* Number */}
        <span className="works-num">{s.num}</span>

        {/* Title with letter-by-letter text roll */}
        <h3 className="works-name">
          <TextRollLetters text={s.title} />
        </h3>

        {/* Tag */}
        <span className="works-tag">{s.tag}</span>

        {/* Year */}
        <span className="works-year">{s.year}</span>

        {/* Arrow */}
        <span className="works-arrow" aria-hidden="true">↗</span>
      </div>
    </motion.li>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the massive background watermark text
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["15%", "-40%"]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.025, 0.025, 0]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="works-section bg-app relative overflow-hidden border-t border-app"
    >
      {/* Massive scrolling background watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="sticky top-0 h-screen flex items-center">
          <motion.div style={{ x: bgTextX, opacity: bgTextOpacity }} className="whitespace-nowrap watermark-text">
            <span className="text-[16vw] font-space font-bold uppercase tracking-[-0.05em] text-app">
              Capabilities & Services
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-14 py-24 md:py-32">
        {/* Header */}
        <header className="works-head mb-14 md:mb-20">
          <p className="works-eyebrow">
            <span className="eyebrow-bar" aria-hidden="true" />
            <span className="eyebrow-tag">[05]</span>What we build
          </p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="works-title"
            >
              Our <em>capabilities</em>.
            </motion.h2>
          </div>
        </header>

        {/* List */}
        <ul className="works-list">
          {services.map((s, i) => (
            <WorkItem key={s.num} s={s} index={i} />
          ))}
        </ul>

        {/* Footer CTA */}
        <div className="works-foot mt-10 flex justify-end">
          <a href="#contact" className="works-cta group">
            <span>Start a project</span>
            <span className="works-cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
