"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const founders = [
  {
    name: "Hana Rabeea",
    role: "Co-founder · CEO",
    focus: "Strategy & Brand",
    accent: "#3B82F6",
  },
  {
    name: "Rawan Amr",
    role: "Co-founder · CEO",
    focus: "Design & Experience",
    accent: "#10B981",
  },
  {
    name: "Zeyad Abo Eleneen",
    role: "Co-founder · CEO",
    focus: "Engineering & Platform",
    accent: "#8B5CF6",
  },
];

function Card({ f, i }: { f: typeof founders[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ y }}
      className="group relative"
      data-cursor-hover
    >
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty("--x", `${x}px`);
          e.currentTarget.style.setProperty("--y", `${y}px`);
        }}
        className="relative rounded-3xl border border-app bg-app-card overflow-hidden p-8 md:p-10 h-full transition-all duration-500 mouse-glow-card shiny-border-card"
        style={{ background: "linear-gradient(180deg, var(--bg-card) 0%, var(--bg-elevated) 100%)" }}
      >
        {/* Accent glow */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-72 h-72 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle, ${f.accent}55 0%, transparent 70%)`,
            filter: "blur(50px)",
          }}
        />

        {/* Number + accent bar */}
        <div className="flex items-center gap-4 mb-10 z-10 relative">
          <span
            className="font-space font-bold text-sm"
            style={{ color: f.accent }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="h-px flex-1 transition-all duration-500 group-hover:h-[2px]"
            style={{
              background: `linear-gradient(to right, ${f.accent}, transparent)`,
            }}
          />
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: f.accent, boxShadow: `0 0 12px ${f.accent}` }}
          />
        </div>

        {/* Name */}
        <h3
          className="font-space font-bold text-app mb-4 z-10 relative text-roll"
          style={{
            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          <span className="text-roll-inner" data-text={f.name}>{f.name}</span>
        </h3>

        {/* Role */}
        <p
          className="font-space text-sm tracking-[0.2em] uppercase mb-6"
          style={{ color: f.accent }}
        >
          {f.role}
        </p>

        {/* Focus tag */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium border backdrop-blur-md"
          style={{
            color: f.accent,
            borderColor: `${f.accent}40`,
            background: `${f.accent}10`,
          }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: f.accent }} />
          {f.focus}
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-700 group-hover:w-full"
          style={{
            width: "0%",
            background: `linear-gradient(to right, ${f.accent}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Founders() {
  return (
    <section id="founders" className="bg-app py-24 md:py-32 border-t border-app">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.25em] uppercase text-[#3B82F6] mb-4"
            >
              — The founders
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
                Built by <span className="gradient-text">three</span>
                <br />
                who refused to compromise
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-app-dim text-sm max-w-xs leading-relaxed"
          >
            Strategy. Design. Engineering. Three disciplines, one studio — every project touched by all of us.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {founders.map((f, i) => (
            <Card key={f.name} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
