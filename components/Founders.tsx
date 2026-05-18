"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const founders = [
  {
    name: "Hana Rabeea",
    role: "Co-founder · CEO",
    focus: "Strategy & Brand",
    initials: "HR",
    bio: "Drives the vision, brand voice, and creative direction. Obsessed with turning ambition into pixel-perfect product.",
    accent: "#3B82F6",
  },
  {
    name: "Rawan Amr",
    role: "Co-founder · CEO",
    focus: "Design & Experience",
    initials: "RA",
    bio: "Leads design systems, motion, and the relentless pursuit of interfaces that feel inevitable.",
    accent: "#10B981",
  },
  {
    name: "Zeyad Abo Eleneen",
    role: "Co-founder · CEO",
    focus: "Engineering & Platform",
    initials: "ZA",
    bio: "Architects the engineering backbone — scalable systems, fast products, reliable launches.",
    accent: "#8B5CF6",
  },
];

function Card({ f, i }: { f: typeof founders[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ y }}
      className="group relative"
    >
      <div
        className="relative rounded-3xl border border-app bg-app-card overflow-hidden p-7 md:p-8 h-full"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-card) 0%, var(--bg-elevated) 100%)",
        }}
      >
        {/* Accent glow */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${f.accent}40 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />

        {/* Typographic portrait — initials as huge letterform */}
        <div
          className="relative aspect-square rounded-2xl mb-7 overflow-hidden flex items-center justify-center border border-app"
          style={{
            background: `linear-gradient(135deg, ${f.accent}22, transparent 80%), var(--bg-deep)`,
          }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Big initials */}
          <motion.span
            className="relative font-space font-bold"
            style={{
              fontSize: "clamp(6rem, 14vw, 11rem)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: f.accent,
              textShadow: `0 0 60px ${f.accent}66`,
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.12 + 0.2 }}
          >
            {f.initials}
          </motion.span>

          {/* Orbital ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-[140%] h-[140%] rounded-full border opacity-30"
            style={{ borderColor: f.accent }}
          />

          {/* Pulse dot */}
          <span
            className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse"
            style={{ background: f.accent }}
          />

          {/* Focus tag */}
          <div
            className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase font-medium border backdrop-blur-md"
            style={{
              color: f.accent,
              borderColor: `${f.accent}55`,
              background: `${f.accent}12`,
            }}
          >
            {f.focus}
          </div>
        </div>

        {/* Name + role */}
        <div className="relative">
          <h3 className="font-space font-bold text-app text-2xl md:text-3xl tracking-tight mb-1.5">
            {f.name}
          </h3>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: f.accent }}
          >
            {f.role}
          </p>
          <p className="text-app-muted text-sm leading-relaxed">{f.bio}</p>
        </div>
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
