"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export default function Invitations() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      id="invitations"
      ref={ref}
      className="relative min-h-[100vh] flex items-center overflow-hidden border-t border-app"
    >
      {/* Parallax video background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-16 -bottom-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=85"
          className="w-full h-full object-cover"
        >
          {/* Drop your branded loop at public/videos/invitations.mp4 */}
          <source src="/videos/invitations.mp4" type="video/mp4" />
        </video>
        {/* Poster fallback layer for browsers blocking autoplay */}
        <Image
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=85"
          alt=""
          fill
          className="object-cover -z-10"
          aria-hidden
        />
      </motion.div>

      {/* Dark overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(3,7,18,0.94) 0%, rgba(3,7,18,0.72) 50%, rgba(3,7,18,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(59,130,246,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Animated floating glyphs */}
      {[
        { left: "10%", top: "20%", d: 6 },
        { left: "85%", top: "30%", d: 7 },
        { left: "75%", top: "70%", d: 5.5 },
        { left: "18%", top: "78%", d: 6.5 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block pointer-events-none"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -22, 0], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star size={14} className="text-[#F59E0B]" fill="#F59E0B" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full py-24">
        <div className="max-w-2xl">
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gradient-border text-sm font-medium text-[#94A3B8] mb-8">
              <Star size={13} className="text-[#F59E0B]" fill="#F59E0B" />
              Custom Digital Invitations
            </div>

            <h2 className="font-space font-bold text-white leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}>
              Every celebration{" "}
              <span className="gradient-text">deserves</span>{" "}
              a grand entrance
            </h2>

            <p className="text-[#CBD5E1] text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              Bespoke digital invitations for weddings, corporate events, and milestones.
              Fully interactive, beautifully animated, multilingual, and instantly shareable —
              your guests&apos; experience starts the moment they open the link.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {[
                "Custom Design",
                "Animated Reveals",
                "RSVP Integration",
                "Multi-language",
                "Instant Sharing",
                "Arabic-first",
              ].map((feat) => (
                <span
                  key={feat}
                  className="px-4 py-1.5 rounded-full text-xs md:text-sm bg-white/[0.06] border border-white/[0.12] text-[#E2E8F0] backdrop-blur-md"
                >
                  {feat}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <a
                href="https://invitations.digitivaa.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white btn-shimmer hover:scale-105 hover:glow-blue transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4, #10B981, #3B82F6)",
                  backgroundSize: "200% auto",
                }}
              >
                Create Your Invitation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://invitations.digitivaa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-white text-sm underline-offset-4 hover:underline"
              >
                View live preview →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side fade */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block pointer-events-none">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(3,7,18,0) 0%, rgba(3,7,18,0.8) 100%)" }} />
      </div>
    </section>
  );
}
