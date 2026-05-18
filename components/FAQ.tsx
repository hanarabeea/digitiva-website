"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Marketing sites: 3–5 weeks. E-commerce platforms: 6–10 weeks. Custom ERP and complex web apps: 10–16 weeks. We share a precise timeline after the discovery phase.",
  },
  {
    q: "Do you work with brands outside Saudi Arabia?",
    a: "Yes — we serve clients across the GCC, MENA, Europe, and North America. Our team works remotely and on-site as needed, with bilingual delivery in English and Arabic.",
  },
  {
    q: "What stack do you build on?",
    a: "Next.js, React, TypeScript, Tailwind, Framer Motion, Node, and custom integrations. For ERP we tailor the stack to your operational complexity. We pick boring, reliable technology that scales.",
  },
  {
    q: "Do you handle design as well as development?",
    a: "Yes. We handle brand strategy, UI/UX, motion design, engineering, QA, and launch. One contract, one team — accountable end to end.",
  },
  {
    q: "What does post-launch support look like?",
    a: "Monthly retainers cover bug fixes, performance monitoring, content updates, analytics review, and roadmap planning. Most clients stay with us for 12+ months after launch.",
  },
  {
    q: "Can you take over an existing project?",
    a: "We can audit your codebase, design system, and infrastructure, then continue iterating. Many of our biggest wins start as rescues of stalled or underperforming products.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-app py-24 md:py-32 border-t border-app">
      <div className="max-w-[1100px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16">
          <div className="md:sticky md:top-24 self-start">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.25em] uppercase text-[#3B82F6] mb-4"
            >
              — FAQ
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-space font-bold text-app"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                Questions, <br />
                <span className="gradient-text">answered.</span>
              </motion.h2>
            </div>
            <p className="mt-5 text-app-muted text-sm leading-relaxed max-w-xs">
              Can&apos;t find what you&apos;re looking for? Reach out — we usually reply within a few hours.
            </p>
          </div>

          <div className="divide-y divide-app">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="py-5 md:py-6"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 text-left group"
                    data-cursor-hover
                  >
                    <span
                      className="font-space font-semibold text-app text-base md:text-lg group-hover:gradient-text transition-all"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {f.q}
                    </span>
                    <span
                      className="w-8 h-8 shrink-0 rounded-full border border-app flex items-center justify-center text-app-muted transition-all"
                      style={{ background: isOpen ? "var(--bg-card)" : "transparent" }}
                    >
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }}>
                        <Plus size={15} />
                      </motion.span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-app-muted text-sm md:text-base leading-relaxed pt-4 max-w-2xl">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
