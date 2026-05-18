"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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

export default function About() {
  return (
    <section id="about" className="bg-app py-28 md:py-36 border-t border-app">
      <div className="max-w-[1400px] mx-auto px-8 md:px-14">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.25em] uppercase text-[#3B82F6] mb-16"
        >
          — About Digitiva
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: big statement */}
          <div>
            <Reveal delay={0.1}>
              <h2
                className="font-space font-bold text-app leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)", letterSpacing: "-0.025em" }}
              >
                Beyond digital presence — we architect resilient ecosystems for
                <span className="gradient-text"> brands to thrive.</span>
              </h2>
            </Reveal>
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
              Digitiva Studio blends strategy, emergent AI, and interface craft to launch
              timeless experiences — partnering with founders and marketing leaders to build
              platforms that perform, scale, and inspire.
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 pt-4 border-t border-app">
              {[
                { target: 46, suffix: "%", label: "Faster speed to launch" },
                { target: 92, suffix: "",  label: "NPS across partners" },
                { target: 94, suffix: "%", label: "Client retention rate" },
                { target: 6,  suffix: "wk", label: "Average delivery cycle" },
              ].map((s) => (
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
