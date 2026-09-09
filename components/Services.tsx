"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ServiceItem = Dictionary["services"]["items"][number];

function TextRollLetters({ text }: { text: string }) {
  // Split by word, not character: splitting Arabic text into individual
  // characters breaks cursive letter-joining and renders each letter in
  // its isolated form. Whole words keep correct shaping in every script.
  const words = text.split(" ");
  return (
    <span className="works-text-roll" aria-label={text}>
      <span className="works-text-roll-row">
        {words.map((word, i) => (
          <span key={i} className="works-text-roll-letter" style={{ "--i": i } as React.CSSProperties}>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
      <span className="works-text-roll-row works-text-roll-clone" aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="works-text-roll-letter" style={{ "--i": i } as React.CSSProperties}>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
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
  s: ServiceItem;
  index: number;
}) {
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

export default function Services({ dict }: { dict: Dictionary }) {
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
              {dict.services.watermark}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-14 py-24 md:py-32">
        {/* Header */}
        <header className="works-head mb-14 md:mb-20">
          <p className="works-eyebrow">
            <span className="eyebrow-bar" aria-hidden="true" />
            <span className="eyebrow-tag">[05]</span>{dict.services.eyebrow}
          </p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="works-title"
            >
              {dict.services.headingPre} <em>{dict.services.headingEm}</em>.
            </motion.h2>
          </div>
        </header>

        {/* List */}
        <ul className="works-list">
          {dict.services.items.map((s, i) => (
            <WorkItem key={s.num} s={s} index={i} />
          ))}
        </ul>

        {/* Footer CTA */}
        <div className="works-foot mt-10 flex justify-end">
          <a href="#contact" className="works-cta group">
            <span>{dict.services.startProject}</span>
            <span className="works-cta-arrow rtl:inline-block rtl:rotate-180">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
