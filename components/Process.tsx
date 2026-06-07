"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Zap, Handshake, Gauge, Sparkles, Infinity } from "lucide-react";

const steps = [
  { n: "01", icon: Lightbulb,  title: "Clarity First",          desc: "We simplify the complex before we make it beautiful. Every decision starts with a clear understanding of the problem.", accent: "#3B82F6" },
  { n: "02", icon: Zap,        title: "No Shortcuts",           desc: "Fast delivery, never at the cost of quality. We move quickly because we plan well — not because we cut corners.",        accent: "#06B6D4" },
  { n: "03", icon: Handshake,  title: "You're a Partner",       desc: "We work with you, not for you. Your insight shapes our decisions at every stage — not just at the brief.",              accent: "#8B5CF6" },
  { n: "04", icon: Gauge,      title: "Performance Obsessed",   desc: "Every millisecond, every interaction counts. Speed and accessibility are built in from day one — never added at the end.", accent: "#10B981" },
  { n: "05", icon: Sparkles,   title: "Details Win",            desc: "The things users don't notice consciously are what they feel. We sweat the micro so the macro lands with impact.",       accent: "#F59E0B" },
  { n: "06", icon: Infinity,   title: "Built to Last",          desc: "We build for where you're going, not just where you are. Scalable architecture, clean code, and long-term thinking.",   accent: "#EF4444" },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="bg-app-deep py-24 md:py-32 border-t border-app">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="expertise-eyebrow mb-4"
          >
            <span className="eyebrow-bar" aria-hidden="true" />
            <span className="eyebrow-tag">[03]</span>What we believe
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-space font-bold text-app"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
            >
              Six beliefs. <span className="gradient-text">One standard.</span>
            </motion.h2>
          </div>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-app" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-0 w-px"
          >
            <div className="w-full h-full bg-gradient-to-b from-[#3B82F6] via-[#06B6D4] to-[#10B981]" />
          </motion.div>

          <div className="space-y-12 md:space-y-20">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="relative grid grid-cols-[42px_1fr] md:grid-cols-2 md:gap-16 items-center"
                >
                  {/* Dot */}
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
                    <div
                      className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 bg-app-deep"
                      style={{ borderColor: s.accent, boxShadow: `0 0 24px ${s.accent}55` }}
                    >
                      <Icon size={16} style={{ color: s.accent }} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`md:col-span-1 ${right ? "md:col-start-2" : ""}`}>
                    <div
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        e.currentTarget.style.setProperty("--x", `${x}px`);
                        e.currentTarget.style.setProperty("--y", `${y}px`);
                      }}
                      className="rounded-2xl border border-app bg-app-card p-6 md:p-7 hover:border-strong transition-all duration-500 depth-shadow mouse-glow-card shiny-border-card group cursor-default"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-center gap-3 mb-3 z-10 relative">
                        <span className="font-space font-bold text-sm" style={{ color: s.accent }}>
                          {s.n}
                        </span>
                        <span className="h-px flex-1 bg-app" />
                      </div>
                      <h3 className="font-space font-bold text-app text-xl md:text-2xl mb-2 z-10 relative text-roll">
                        <span className="text-roll-inner" data-text={s.title}>{s.title}</span>
                      </h3>
                      <p className="text-app-muted text-sm leading-relaxed z-10 relative">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
