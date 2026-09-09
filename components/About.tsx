"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* Slide-up reveal */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="bg-app py-28 md:py-36 border-t border-app">
      <div className="max-w-[1400px] mx-auto px-8 md:px-14">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="expertise-eyebrow mb-16"
        >
          <span className="eyebrow-bar" aria-hidden="true" />
          <span className="eyebrow-tag">[01]</span>{dict.about.eyebrow}
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: big statement */}
          <div>
            <motion.h2
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-space font-bold text-app"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
            >
              {dict.about.heading1}{" "}
              <span className="gradient-text">{dict.about.heading2}</span>
            </motion.h2>
          </div>

          {/* Right: description + stats */}
          <div className="flex flex-col gap-10">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-app-muted text-base leading-relaxed"
            >
              {dict.about.body}
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 pt-4 border-t border-app">
              {dict.about.stats.map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div
                    className="font-space font-bold gradient-text mb-1"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}
                  >
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <div className="text-app-faint text-xs uppercase tracking-widest">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
