"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "https://images.unsplash.com/photo-1594913023767-4462a4c3ee70?w=600&q=80", alt: "Fragrance" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", alt: "Fashion" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", alt: "Celebration" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Runway" },
  { src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80", alt: "E-Commerce" },
  { src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", alt: "Atelier" },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", alt: "Event" },
  { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80", alt: "Digital" },
];

const imagesB = [...images].reverse();

function Strip({
  items,
  reverse,
  speed,
}: {
  items: typeof images;
  reverse?: boolean;
  speed?: number;
}) {
  const dur = speed ?? 35;
  const from = reverse ? "-50%" : "0%";
  const to = reverse ? "0%" : "-50%";

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-3 shrink-0"
        animate={{ x: [from, to] }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-xl overflow-hidden"
            style={{ width: 260, height: 160 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500 hover:scale-105"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-[#05060F]/30" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ImageStrip() {
  return (
    <div className="bg-[#05060F] py-12 overflow-hidden space-y-3 border-y border-white/[0.04]">
      <Strip items={images} speed={38} />
      <Strip items={imagesB} reverse speed={32} />
    </div>
  );
}
