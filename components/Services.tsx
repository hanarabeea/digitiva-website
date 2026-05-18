"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, BarChart3, Globe, Layers, Sparkles } from "lucide-react";

const services = [
  {
    num: "01",
    icon: ShoppingBag,
    title: "E-Commerce Platforms",
    desc: "Luxury-grade storefronts engineered for conversion. Immersive shopping experiences built with blazing performance, seamless payment flows, and product storytelling that turns visitors into loyal customers.",
    tags: ["Shopify", "Next.js", "Stripe", "Headless CMS"],
    accent: "#3B82F6",
  },
  {
    num: "02",
    icon: BarChart3,
    title: "ERP Systems",
    desc: "End-to-end enterprise resource planning tailored to your operations. Streamline inventory, finance, HR, and supply chain into one cohesive, intelligent system built for scale.",
    tags: ["Custom ERP", "API Integration", "Real-time Dashboards"],
    accent: "#06B6D4",
  },
  {
    num: "03",
    icon: Globe,
    title: "Web Development",
    desc: "From marketing sites to complex web applications — high-performance digital products using modern frameworks, built to scale and engineered for longevity.",
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
    accent: "#8B5CF6",
  },
  {
    num: "04",
    icon: Layers,
    title: "UI/UX Design",
    desc: "Interfaces that breathe. We translate brand identity and user psychology into design systems that are beautiful, intuitive, and delightfully usable — from wireframe to pixel-perfect production.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    accent: "#10B981",
  },
  {
    num: "05",
    icon: Sparkles,
    title: "Digital Invitations",
    desc: "Bespoke digital invitations for weddings, corporate events, and milestones. Fully interactive, beautifully animated, and instantly shareable — your guests' experience begins the moment they open the link.",
    tags: ["Custom Design", "RSVP", "Animated", "Multi-language"],
    accent: "#F59E0B",
  },
];

function ServiceRow({ s, index }: { s: typeof services[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = s.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-app group"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_120px_40px] items-center gap-4 md:gap-8 py-7 text-left"
        data-cursor-hover
      >
        {/* Number */}
        <span
          className="font-space text-sm font-bold transition-colors duration-300"
          style={{ color: open ? s.accent : "#334155" }}
        >
          {s.num}
        </span>

        {/* Title */}
        <span
          className="font-space font-bold transition-colors duration-300"
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            letterSpacing: "-0.02em",
            color: open ? "var(--text)" : "var(--text-muted)",
          }}
        >
          {s.title}
        </span>

        {/* Icon — hidden on mobile */}
        <div
          className="hidden md:flex w-10 h-10 rounded-xl items-center justify-center transition-all duration-300"
          style={{ background: open ? `${s.accent}20` : "transparent" }}
        >
          <Icon size={18} style={{ color: open ? s.accent : "#334155" }} />
        </div>

        {/* Toggle */}
        <div
          className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ml-auto"
          style={{
            borderColor: open ? s.accent : "rgba(255,255,255,0.1)",
            color: open ? s.accent : "#475569",
          }}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg leading-none"
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-[76px] md:pl-[88px] pr-4 flex flex-col md:flex-row gap-8">
              <p className="text-app-muted text-sm leading-relaxed max-w-xl flex-1">{s.desc}</p>
              <div className="flex flex-wrap gap-2 md:justify-end items-start">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      borderColor: `${s.accent}30`,
                      color: s.accent,
                      background: `${s.accent}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-app py-24 md:py-32 border-t border-app">
      <div className="max-w-[1400px] mx-auto px-8 md:px-14">

        <div className="flex items-end gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.25em] uppercase text-[#3B82F6] mb-4"
            >
              — What we build
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-space font-bold text-app"
                style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                Our <span className="gradient-text">capabilities</span>
              </motion.h2>
            </div>
          </div>
        </div>

        <div>
          {services.map((s, i) => (
            <ServiceRow key={s.num} s={s} index={i} />
          ))}
          <div className="border-t border-app" />
        </div>
      </div>
    </section>
  );
}
