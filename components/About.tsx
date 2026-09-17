"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

// Shown exactly as supplied — no dimming.
const HAMID_LOGO = "/logos/hamid-badge.png";
const ORIGINAL_LOGOS = new Set([HAMID_LOGO, "/logos/pizza.png"]);

// White marks: white on the dark theme, flipped to black on the light theme.
const THEME_INVERT_LOGOS = new Set([
  "/logos/raey.png",
  "/logos/sense.png",
  "/logos/alanod.png",
]);

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
  const logos = dict.clients.items;
  // Triple the logos for seamless infinite scroll
  const repeated = [...logos, ...logos, ...logos, ...logos];

  // Scroll parallax for the logo strip: drifts sideways and lifts slightly as it
  // passes through the viewport, layered on top of the continuous marquee.
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stripProgress } = useScroll({ target: stripRef, offset: ["start end", "end start"] });
  const stripSmooth = useSpring(stripProgress, { stiffness: 60, damping: 20 });
  const stripX = useTransform(stripSmooth, [0, 1], ["8%", "-8%"]);
  const stripY = useTransform(stripSmooth, [0, 1], [30, -30]);
  const stripScale = useTransform(stripSmooth, [0, 0.5, 1], [0.94, 1, 0.94]);

  return (
    <section id="about" className="bg-app pt-28 md:pt-36 border-t border-app">
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

      {/* ── Client Logo Marquee Strip (Continuous, smooth, seamlessly blends with dark theme) ── */}
      <div ref={stripRef} className="mt-20 md:mt-28 py-8 md:py-10 border-y border-white/[0.08] relative overflow-hidden select-none [direction:ltr]">
        {/* Left & Right gradient edge fades that blend into the theme background */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 z-10"
          style={{
            background: "linear-gradient(to right, var(--bg) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 z-10"
          style={{
            background: "linear-gradient(to left, var(--bg) 0%, transparent 100%)",
          }}
        />

        <motion.div className="flex w-full" style={{ display: "flex", x: stripX, y: stripY, scale: stripScale }}>
          <motion.div
            className="flex flex-row flex-nowrap shrink-0 items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              willChange: "transform",
            }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {repeated.map((client, i) => (
              <div
                key={`logo-${i}`}
                className="flex items-center justify-center mx-8 sm:mx-12 md:mx-14 shrink-0"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  className={`w-[120px] sm:w-[145px] md:w-[165px] h-[46px] sm:h-[52px] md:h-[58px] relative flex items-center justify-center ${
                    ORIGINAL_LOGOS.has(client.logo)
                      ? ""
                      : "opacity-75 hover:opacity-100 transition-opacity duration-300"
                  }`}
                >
                  {client.logo === HAMID_LOGO ? (
                    <>
                      <Image src="/logos/hamid-badge-dark.png" alt={client.name} fill sizes="180px" className="object-contain theme-night-only" />
                      <Image src="/logos/hamid-badge-light.png" alt="" aria-hidden fill sizes="180px" className="object-contain theme-day-only" />
                    </>
                  ) : (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="180px"
                      className={`object-contain ${THEME_INVERT_LOGOS.has(client.logo) ? "logo-knockout" : ""}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

