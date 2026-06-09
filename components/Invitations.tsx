"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import { ArrowRight, Check, MapPin, Music } from "lucide-react";

const IMAGES = [
  { src: "/inv1.jpg",  label: "Royal Wedding" },
  { src: "/inv2.jpg",  label: "Corporate Gala" },
  { src: "/inv3.jpg",  label: "Neon Party" },
  { src: "/inv4.jpg",  label: "Minimal Gala" },
  { src: "/inv5.jpg",  label: "Pastel Shower" },
  { src: "/inv6.jpg",  label: "Engagement" },
  { src: "/inv7.jpg",  label: "Garden Soirée" },
  { src: "/inv8.jpg",  label: "" },
  { src: "/inv9.jpg",  label: "Eid Celebration" },
];

const FEATURES = [
  { title: "Custom Art Direction", desc: "Bespoke color palettes & typography" },
  { title: "Elegant Reveals",      desc: "Smooth opening sequences" },
  { title: "RSVP & Guest Manager", desc: "Real-time verification dashboard" },
  { title: "Multilingual Layouts", desc: "Bilingual, Arabic-first defaults" },
];

export default function Invitations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex]   = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const visibleImages = IMAGES.filter((_, i) => !failedImages.has(i));
  const SLOT_H = 552;

  /* Mouse tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX     = useTransform(mouseY, [-300, 300], [12, -12]);
  const rotateY     = useTransform(mouseX, [-300, 300], [-12, 12]);
  const springRotX  = useSpring(rotateX, { stiffness: 120, damping: 25 });
  const springRotY  = useSpring(rotateY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* Shared scroll progress — ONE container drives everything */
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * visibleImages.length), visibleImages.length - 1);
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  const smoothed      = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const slowSmoothed  = useSpring(scrollYProgress, { stiffness: 20, damping: 16, restDelta: 0.001 });

  const contentY      = useTransform(smoothed, [0, 1], [30, -30]);
  const card1Y        = useTransform(smoothed, [0, 1], [-80, 80]);
  const card1Rotate   = useTransform(smoothed, [0, 1], [-6, 6]);
  const card2Y        = useTransform(smoothed, [0, 1], [100, -100]);
  const card2Rotate   = useTransform(smoothed, [0, 1], [8, -8]);
  const card3Y        = useTransform(smoothed, [0, 1], [-60, 60]);
  const card3Rotate   = useTransform(smoothed, [0, 1], [-10, 10]);
  const bgTextX       = useTransform(smoothed, [0, 1], ["-15%", "35%"]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.025, 0.025, 0]);
  const shineX        = useTransform(smoothed, [0, 1], ["-120%", "120%"]) as MotionValue<string>;
  const imageStripY   = useTransform(slowSmoothed, [0, 1], [0, -(Math.max(visibleImages.length - 1, 0) * SLOT_H)]) as MotionValue<number>;

  return (
    <section id="invitations">

      {/* ── Mobile text block (above the scroll container, lg hidden) ── */}
      <div className="lg:hidden bg-app-deep border-t border-app px-6 pt-14 pb-6">
        <div className="max-w-xl mx-auto space-y-6">
          <h2
            className="font-space font-bold text-app leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(1.85rem, 7vw, 2.8rem)" }}
          >
            Every celebration deserves a{" "}
            <span className="italic font-serif font-normal text-[#F59E0B]">grand entrance.</span>
          </h2>

          <p className="text-app-muted text-sm leading-relaxed">
            Bespoke digital invitations designed to impress from the very first tap —
            beautifully animated, multilingual, and fully functional with guest confirmation tools.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map((feat, i) => (
              <div key={i} className="p-3 rounded-xl border border-app bg-app-card hover:border-[#F59E0B]/40 transition-all duration-300">
                <h4 className="font-space text-xs font-bold text-app mb-1">{feat.title}</h4>
                <p className="text-[10px] text-app-dim">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://invitations.digitivaa.com"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706, #B45309)" }}
            >
              Create Your Invitation
              <ArrowRight size={15} />
            </a>
            <a
              href="https://invitations.digitivaa.com"
              target="_blank" rel="noopener noreferrer"
              className="text-app-muted hover:text-app text-sm flex items-center gap-1.5"
            >
              View showcase →
            </a>
          </div>
        </div>
      </div>

      {/* ── Shared scroll container (800 vh) ── */}
      <div ref={scrollContainerRef} className="relative" style={{ height: "800vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-app-deep border-t border-app lg:border-t">

          {/* Background (desktop only visuals) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <motion.div
              style={{ x: bgTextX, opacity: bgTextOpacity }}
              className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap select-none watermark-text"
            >
              <span className="text-[14vw] font-space font-bold uppercase tracking-[-0.05em] text-app">
                Digital Celebration Experiences
              </span>
            </motion.div>
          </div>

          {/* Ambient glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/10 blur-[130px]" />
          </div>

          {/* ── MOBILE sticky view: phone centered ── */}
          <div className="lg:hidden relative z-10 h-full flex flex-col items-center justify-center gap-6 px-6">
            {/* Phone */}
            <div className="relative" style={{ width: 260 }}>
              <div
                className="relative mx-auto rounded-[3rem] border border-app bg-app-card/60 p-3.5 shadow-2xl"
                style={{ width: 260, height: 500 }}
              >
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30" />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black border border-white/[0.04]">
                  <div className="hidden">
                    {IMAGES.map((img, i) => (
                      <img key={i} src={img.src} alt=""
                        onError={() => setFailedImages(prev => new Set(prev).add(i))} />
                    ))}
                  </div>
                  <motion.div style={{ y: imageStripY }} className="absolute inset-x-0 top-0 flex flex-col">
                    {visibleImages.map((img, i) => (
                      <div key={img.src} className="w-full flex-shrink-0" style={{ height: `${SLOT_H}px` }}>
                        <img src={img.src} alt={img.label || `Invitation ${i + 1}`}
                          className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </motion.div>
                  <motion.div
                    style={{ x: shineX }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-10"
                  />
                </div>
              </div>

              {/* Progress dots */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-6 flex flex-col gap-1.5 z-30">
                {visibleImages.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: "#F59E0B",
                      opacity: i === activeIndex ? 1 : 0.3,
                      transform: `scale(${i === activeIndex ? 1.6 : 1})`,
                    }} />
                ))}
              </div>

              {/* Floating badge — RSVP (top-left, overlaps phone) */}
              <div className="absolute top-10 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-500/20 bg-app-deep/90 backdrop-blur-xl shadow-xl z-40 pointer-events-none select-none">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Check size={11} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] font-space font-bold text-app leading-none">RSVP Confirmed</p>
                  <p className="text-[9px] text-emerald-400 mt-0.5">Ahmad + 2 guests</p>
                </div>
              </div>

              {/* Floating badge — Location (bottom-right, overlaps phone) */}
              <div className="absolute bottom-14 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-500/20 bg-app-deep/90 backdrop-blur-xl shadow-xl z-40 pointer-events-none select-none">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <MapPin size={11} />
                </div>
                <div>
                  <p className="text-[10px] font-space font-bold text-app leading-none">Event Venue</p>
                  <p className="text-[9px] text-app-dim mt-0.5">The Royal Garden</p>
                </div>
              </div>

              {/* Floating badge — Music (mid-left, overlaps phone) */}
              <div className="absolute bottom-36 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-app bg-app-deep/90 backdrop-blur-xl shadow-xl z-40 pointer-events-none select-none">
                <div className="w-6 h-6 rounded-lg bg-app-card flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                  <Music size={11} className="animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-space font-bold text-app leading-none">Instrumental Vows</p>
                  <p className="text-[9px] text-[#F59E0B] mt-0.5">Background loop</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── DESKTOP sticky view: two-column layout ── */}
          <div className="hidden lg:flex max-w-[1400px] mx-auto px-14 relative z-10 w-full h-full items-center">
            <div className="grid grid-cols-12 gap-16 items-center w-full">

              {/* Left text */}
              <motion.div style={{ y: contentY }} className="col-span-6 space-y-8">
                <h2
                  className="font-space font-bold text-app leading-[1.05] tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                >
                  Every celebration deserves a{" "}
                  <span className="italic font-serif font-normal text-[#F59E0B]">grand entrance.</span>
                </h2>

                <p className="text-app-muted text-lg leading-relaxed max-w-xl">
                  Bespoke digital invitations designed to impress from the very first tap.
                  Beautifully animated, multilingual, instantly shareable, and fully functional
                  with guest confirmation tools.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-lg">
                  {FEATURES.map((feat, i) => (
                    <div key={i} className="p-4 rounded-xl border border-app bg-app-card hover:border-[#F59E0B]/40 transition-all duration-300 group/item">
                      <h4 className="font-space text-sm font-bold text-app mb-1 group-hover/item:text-[#F59E0B] transition-colors">{feat.title}</h4>
                      <p className="text-xs text-app-dim">{feat.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <a
                    href="https://invitations.digitivaa.com"
                    target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-500 hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #D97706, #B45309)" }}
                  >
                    Create Your Invitation
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </a>
                  <a
                    href="https://invitations.digitivaa.com"
                    target="_blank" rel="noopener noreferrer"
                    className="text-app-muted hover:text-app text-sm font-medium flex items-center gap-2 group/link"
                  >
                    View live showcase
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>

              {/* Right — phone + floating cards */}
              <div className="col-span-6 flex justify-center relative min-h-[600px] items-center">
                <motion.div style={{ perspective: 1200, transformStyle: "preserve-3d" }} className="relative w-full max-w-[340px]">

                  {/* Phone */}
                  <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: "preserve-3d" }}
                    className="relative w-[300px] h-[580px] mx-auto rounded-[3rem] border border-app bg-app-card/60 backdrop-blur-md p-3.5 shadow-2xl mouse-glow-card shiny-border-card"
                  >
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30" />
                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black border border-white/[0.04]">
                      <div className="hidden">
                        {IMAGES.map((img, i) => (
                          <img key={i} src={img.src} alt=""
                            onError={() => setFailedImages(prev => new Set(prev).add(i))} />
                        ))}
                      </div>
                      <motion.div style={{ y: imageStripY }} className="absolute inset-x-0 top-0 flex flex-col">
                        {visibleImages.map((img, i) => (
                          <div key={img.src} className="w-full flex-shrink-0" style={{ height: `${SLOT_H}px` }}>
                            <img src={img.src} alt={img.label || `Invitation ${i + 1}`}
                              className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </motion.div>
                      <motion.div
                        style={{ x: shineX }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-10"
                      />
                    </div>
                  </motion.div>

                  {/* Progress dots */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-10 flex flex-col gap-1.5 z-30">
                    {visibleImages.map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: "#F59E0B",
                          opacity: i === activeIndex ? 1 : 0.3,
                          transform: `scale(${i === activeIndex ? 1.6 : 1})`,
                        }} />
                    ))}
                  </div>

                  {/* Floating Card 1 */}
                  <motion.div
                    style={{ y: card1Y, rotate: card1Rotate }}
                    className="absolute top-12 -left-12 p-4 rounded-2xl border border-emerald-500/20 bg-app-deep/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 w-56 pointer-events-none select-none z-20"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <h5 className="font-space text-xs font-bold text-app">RSVP Confirmed</h5>
                      <p className="text-[10px] text-emerald-400">Ahmad + 2 guests</p>
                    </div>
                  </motion.div>

                  {/* Floating Card 2 */}
                  <motion.div
                    style={{ y: card2Y, rotate: card2Rotate }}
                    className="absolute bottom-16 -right-16 p-4 rounded-2xl border border-blue-500/20 bg-app-deep/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 w-56 pointer-events-none select-none z-20"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 flex-shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <h5 className="font-space text-xs font-bold text-app">Event Venue</h5>
                      <p className="text-[10px] text-app-dim">The Royal Garden, Plaza A</p>
                    </div>
                  </motion.div>

                  {/* Floating Card 3 */}
                  <motion.div
                    style={{ y: card3Y, rotate: card3Rotate }}
                    className="absolute bottom-40 -left-14 p-3 rounded-xl border border-app bg-app-deep/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 w-48 pointer-events-none select-none z-20"
                  >
                    <div className="w-7 h-7 rounded-lg bg-app-card flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                      <Music size={12} className="animate-pulse" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h5 className="font-space text-[10px] font-bold text-app truncate">Instrumental Vows</h5>
                      <p className="text-[9px] text-[#F59E0B]">Background loop</p>
                    </div>
                  </motion.div>

                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
