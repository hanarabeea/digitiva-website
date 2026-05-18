"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function MouseShape({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 60 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cursMouseBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E293B" />
          <stop offset="1" stopColor="#05060F" />
        </linearGradient>
        <linearGradient id="cursMouseScroll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <radialGradient id="cursMouseShine" cx="0.5" cy="0.2" r="0.6">
          <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <path
        d="M30 3 C 48 3 55 18 55 45 C 55 72 45 87 30 87 C 15 87 5 72 5 45 C 5 18 12 3 30 3 Z"
        fill="url(#cursMouseBody)"
        stroke="rgba(59,130,246,0.7)"
        strokeWidth="1.2"
      />
      <path
        d="M30 3 C 48 3 55 18 55 45 C 55 72 45 87 30 87 C 15 87 5 72 5 45 C 5 18 12 3 30 3 Z"
        fill="url(#cursMouseShine)"
      />
      <line x1="30" y1="6" x2="30" y2="38" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      <rect x="27" y="20" width="6" height="14" rx="3" fill="url(#cursMouseScroll)" />
      <rect
        x="27"
        y="20"
        width="6"
        height="14"
        rx="3"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.5"
      />
      <circle
        cx="30"
        cy="55"
        r="12"
        fill="rgba(59,130,246,0.08)"
        stroke="rgba(59,130,246,0.25)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 600, damping: 40 });
  const y = useSpring(rawY, { stiffness: 600, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(
        !!(t.closest("a") || t.closest("button") || t.closest("[data-cursor-hover]"))
      );
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [rawX, rawY, visible]);

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none hidden md:block"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
        filter: "drop-shadow(0 6px 20px rgba(59,130,246,0.45))",
        transition: "opacity 0.25s ease",
      }}
    >
      <motion.div
        animate={{
          scale: hovering ? 1.25 : 1,
          rotate: hovering ? [-6, 6, -6] : 0,
        }}
        transition={{
          scale: { duration: 0.25, ease: "easeOut" },
          rotate: hovering
            ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 },
        }}
      >
        <MouseShape size={32} />
      </motion.div>
    </motion.div>
  );
}
