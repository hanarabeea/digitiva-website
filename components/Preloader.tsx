"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LETTERS = "DIGITIVA".split("");

type Stage = "loading" | "booming" | "exiting" | "done";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState<Stage>("loading");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const jump = Math.floor(Math.random() * 9) + 5;
      current = Math.min(current + jump, 100);
      setCount(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setStage("booming"), 320);
        setTimeout(() => setStage("exiting"), 320 + 1100);
        setTimeout(() => {
          setStage("done");
          setVisible(false);
        }, 320 + 1100 + 1000);
      }
    }, 34);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const isBoom = stage === "booming" || stage === "exiting";

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          animate={
            stage === "exiting"
              ? { clipPath: "inset(0 0 100% 0)" }
              : { clipPath: "inset(0 0 0 0)" }
          }
          transition={
            stage === "exiting"
              ? { duration: 1, ease: [0.76, 0, 0.24, 1] }
              : { duration: 0 }
          }
          style={{ clipPath: "inset(0 0 0 0)" }}
          className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Grid */}
          <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

          {/* CSS-driven orbital rings — smooth GPU rotation */}
          <div
            className={`absolute w-[700px] h-[700px] rounded-full border border-white/[0.05] ${
              isBoom ? "opacity-0 scale-[3] transition-all duration-1000 ease-out" : "spin-fast"
            }`}
          />
          <div
            className={`absolute w-[520px] h-[520px] rounded-full border border-[#3B82F6]/30 ${
              isBoom ? "opacity-0 scale-[3.5] transition-all duration-1000 ease-out" : "spin-med"
            }`}
          />
          <div
            className={`absolute w-[340px] h-[340px] rounded-full border border-[#10B981]/30 ${
              isBoom ? "opacity-0 scale-[4] transition-all duration-1000 ease-out" : "spin-slow"
            }`}
          />

          {/* Glow */}
          <motion.div
            className="absolute pointer-events-none"
            animate={{
              scale: isBoom ? [1, 2.5, 6] : 1,
              opacity: isBoom ? [0.5, 1, 0] : 0.5,
            }}
            transition={{ duration: isBoom ? 1.1 : 0, times: [0, 0.5, 1], ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.45) 0%, rgba(16,185,129,0.25) 35%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* White flash */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isBoom ? [0, 0, 0.85, 0] : 0 }}
            transition={{ duration: 1.1, times: [0, 0.55, 0.7, 1], ease: "easeOut" }}
          />

          {/* Center content */}
          <motion.div
            className="relative flex flex-col items-center gap-6 z-10"
            animate={
              isBoom
                ? { scale: [1, 1.25, 8], rotate: [0, 180, 540], opacity: [1, 1, 0] }
                : {}
            }
            transition={{ duration: 1.1, times: [0, 0.4, 1], ease: [0.7, 0, 0.84, 0] }}
            style={{ perspective: 1200 }}
          >
            {/* Logo — CSS animation, no framer motion = perfectly smooth */}
            <div className="w-20 h-20 relative logo-entry">
              <Image
                src="/logo.svg"
                alt="Digitiva"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              />
            </div>

            {/* Letters */}
            <div className="flex gap-[0.05em]" style={{ perspective: 800, lineHeight: 1 }}>
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, rotateX: -90, opacity: 0 }}
                  animate={
                    isBoom
                      ? {
                          y: [0, -10, (i - 3.5) * 40],
                          x: (i - 3.5) * 80,
                          rotateZ: (i - 3.5) * 35,
                          scale: [1, 1.4, 0],
                          opacity: [1, 1, 0],
                        }
                      : { y: 0, rotateX: 0, opacity: 1 }
                  }
                  transition={
                    isBoom
                      ? { duration: 1.1, times: [0, 0.35, 1], ease: [0.7, 0, 0.84, 0] }
                      : { duration: 0.7, delay: 0.6 + i * 0.06, ease: [0.16, 1, 0.3, 1] }
                  }
                  className={`inline-block font-space font-bold text-4xl md:text-6xl tracking-[0.28em] ${
                    i < 2 ? "gradient-text" : "text-white"
                  }`}
                  style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isBoom ? 0 : 1, y: 0 }}
              transition={{ duration: 0.7, delay: isBoom ? 0 : 1.2 }}
              className="text-[#334155] text-[11px] tracking-[0.45em] uppercase"
            >
              Digital Studio · Riyadh
            </motion.p>
          </motion.div>

          {/* Shockwaves */}
          {isBoom && (
            <>
              {[0, 0.15, 0.3].map((delay, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full border-2 pointer-events-none"
                  initial={{ width: 0, height: 0, opacity: 0.9, borderColor: "rgba(59,130,246,0.8)" }}
                  animate={{
                    width: 1800,
                    height: 1800,
                    opacity: 0,
                    borderColor: "rgba(16,185,129,0)",
                  }}
                  transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </>
          )}

          {/* Particles */}
          {isBoom && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const dist = 600 + Math.random() * 200;
                const colors = ["#3B82F6", "#06B6D4", "#10B981", "#8B5CF6"];
                return (
                  <motion.span
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: colors[i % colors.length],
                      boxShadow: `0 0 12px ${colors[i % colors.length]}`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Counter */}
          <motion.div
            animate={{ opacity: isBoom ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-10 right-10 font-space text-sm text-[#1E293B] tabular-nums"
          >
            {String(count).padStart(3, "0")}
          </motion.div>

          {/* Label */}
          <motion.div
            animate={{ opacity: isBoom ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-10 left-10 font-space text-[10px] tracking-[0.45em] uppercase text-[#1E293B]"
          >
            {count < 100 ? "Forming" : "Ready"}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            animate={{
              width: `${count}%`,
              height: isBoom ? 6 : 2,
              opacity: stage === "exiting" ? 0 : 1,
            }}
            transition={{ duration: isBoom ? 0.4 : 0.1 }}
            style={{
              background: "linear-gradient(to right, #3B82F6, #06B6D4, #10B981)",
              boxShadow: isBoom ? "0 0 30px rgba(59,130,246,0.9)" : "none",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
