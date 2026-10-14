"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { getSystems, shotSrc, type System } from "./systems/data";

const EASE = [0.16, 1, 0.3, 1] as const;

function SystemCard({ s, index, dict, locale }: { s: System; index: number; dict: Dictionary; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });
  // Each card and its layers drift at their own speed.
  const cardY = useTransform(spring, [0, 1], index % 2 ? [110, -40] : [50, -70]);
  const shotY = useTransform(spring, [0, 1], ["-6%", "6%"]);
  const phoneY = useTransform(spring, [0, 1], [90, -110]);
  const numY = useTransform(spring, [0, 1], [70, -70]);

  return (
    <motion.div ref={ref} style={{ y: cardY }} className="relative">
      {/* Ghost number */}
      <motion.span
        aria-hidden
        style={{ y: numY, WebkitTextStroke: `1.5px ${s.accent}35`, color: "transparent", fontSize: "clamp(6rem, 12vw, 11rem)", letterSpacing: "-0.05em" }}
        className="absolute -top-16 -start-4 font-space font-black leading-none pointer-events-none select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Glow halo */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 0.6 : 0.16, scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -inset-8 rounded-[2rem] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 40%, ${s.accent}40, transparent 65%)`, filter: "blur(40px)" }}
      />

      <Link
        href={`/${locale}/systems/${s.key}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative block rounded-[1.75rem] border border-app bg-app-card overflow-hidden"
        style={{
          boxShadow: hovered ? `0 40px 100px -20px ${s.accent}55, 0 0 0 1px ${s.accent}30` : "0 20px 70px -20px rgba(0,0,0,0.55)",
          transition: "box-shadow 0.7s ease",
        }}
      >
        {/* Screenshot with inner parallax */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <motion.div style={{ y: shotY }} className="absolute -inset-y-[7%] inset-x-0">
            <Image
              src={shotSrc(s, 0)}
              alt={`${s.name} — ${s.screens[0].title}`}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
        </div>

        <div className="relative p-6 md:p-8">
          <p className="text-app-dim text-[11px] tracking-[0.3em] uppercase font-space mb-2">{s.tagline}</p>
          <h3 className="font-space font-bold text-app leading-none mb-4" style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", letterSpacing: "-0.03em" }}>
            {s.name}
          </h3>
          <p className="text-app-muted text-sm md:text-base leading-relaxed mb-7 max-w-lg">{s.desc}</p>

          <span className="inline-flex items-center gap-3">
            <span
              className="relative w-11 h-11 rounded-full flex items-center justify-center border overflow-hidden transition-transform duration-300 group-hover:scale-110"
              style={{ borderColor: `${s.accent}55`, background: `${s.accent}14` }}
            >
              <span className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" style={{ background: s.accent, opacity: 0.22 }} />
              <ArrowUpRight size={16} color={s.accent} className="relative rtl:-scale-x-100 transition-transform duration-300 group-hover:rotate-45 rtl:group-hover:-rotate-45" />
            </span>
            <span className="font-space font-semibold text-app-muted group-hover:text-app text-sm transition-colors">{dict.systems.explore}</span>
          </span>
        </div>
      </Link>

      {s.phone && (
        <motion.div
          aria-hidden
          style={{ y: phoneY }}
          className="hidden lg:block absolute -end-6 top-[16%] w-[22%] rounded-[1.4rem] border-[5px] border-[#0b0f1a] bg-[#0b0f1a] shadow-2xl overflow-hidden pointer-events-none"
        >
          <div className="relative" style={{ aspectRatio: "585/1266" }}>
            <Image src={s.phone} alt="" fill sizes="200px" className="object-cover object-top" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Systems({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const systems = getSystems(dict);

  return (
    <section id="systems" className="bg-app-deep border-t border-app relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none w-[900px] h-[900px] -top-60 start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 60%)", filter: "blur(80px)" }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-14 relative z-10 pt-24 md:pt-32 pb-28 md:pb-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
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
                initial={{ y: "100%" }}
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

        <div className="grid md:grid-cols-2 gap-20 md:gap-10 lg:gap-16">
          {systems.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            >
              <SystemCard s={s} index={i} dict={dict} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
