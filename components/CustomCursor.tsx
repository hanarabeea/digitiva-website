"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
    <>
      {/* Dot */}
      <motion.div
        className="fixed z-[9998] pointer-events-none hidden md:block rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 40 : 10,
          height: hovering ? 40 : 10,
          background: hovering
            ? "transparent"
            : "linear-gradient(135deg,#3B82F6,#10B981)",
          border: hovering ? "1px solid rgba(59,130,246,0.6)" : "none",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease, border 0.25s ease",
        }}
      />
    </>
  );
}
