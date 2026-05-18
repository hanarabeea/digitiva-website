"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 46, suffix: "%", label: "Faster speed to launch" },
  { value: 92, suffix: "", label: "NPS score across partners" },
  { value: 3, suffix: "+", label: "Markets activated" },
  { value: 94, suffix: "%", label: "Client retention rate" },
  { value: 6, suffix: "wk", label: "Average delivery cycle" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="stats" ref={ref} className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#3B82F6]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[#475569] text-sm tracking-widest uppercase mb-12"
        >
          Measured impact, every time
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-border-subtle rounded-2xl p-6 text-center hover:glow-blue transition-all duration-300"
            >
              <div className="font-space text-4xl font-bold gradient-text mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#64748B] text-sm leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
