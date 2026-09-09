"use client";
import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const diamond = <span className="text-[#3B82F6] mx-8 text-xs">◆</span>;

function Strip({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center text-xs tracking-[0.2em] uppercase text-app-dim font-medium">
            {item}
            {diamond}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee({ dict }: { dict: Dictionary }) {
  return (
    <div className="border-y border-app py-4 overflow-hidden bg-app select-none">
      <Strip items={dict.marquee.items} />
    </div>
  );
}
