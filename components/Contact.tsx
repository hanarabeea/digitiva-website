"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const socials = [
  {
    Icon: InstagramIcon,
    label: "Instagram",
    handle: "@digitivaco",
    url: "https://instagram.com/digitivaco",
    accent: "#E1306C",
  },
  {
    Icon: FacebookIcon,
    label: "Facebook",
    handle: "Digitiva",
    url: "https://facebook.com",
    accent: "#1877F2",
  },
];

// TikTok icon as SVG since lucide doesn't have it
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.94a8.17 8.17 0 004.78 1.52V7a4.85 4.85 0 01-1.01-.31z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 bg-app-deep overflow-hidden border-t border-app">
      {/* Background orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-80px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-4">
              Get in touch
            </p>
            <h2 className="font-space text-4xl md:text-5xl font-bold text-app leading-tight mb-6">
              Ready to build something{" "}
              <span className="gradient-text">extraordinary?</span>
            </h2>
            <p className="text-app-muted text-lg leading-relaxed mb-8">
              Whether you have a project in mind or just want to explore what&apos;s possible,
              we&apos;d love to hear from you. Let&apos;s create something that outlasts the moment.
            </p>

            {/* Email CTA */}
            <a
              href="mailto:digitivaa@gmail.com"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white btn-shimmer hover:scale-105 hover:glow-blue transition-all duration-300 mb-10"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #06B6D4, #10B981, #3B82F6)",
                backgroundSize: "200% auto",
              }}
            >
              <Mail size={18} />
              digitivaa@gmail.com
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Socials */}
            <div className="flex flex-wrap gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl gradient-border-subtle text-app-muted hover:text-app transition-all duration-300 hover:scale-105"
                >
                  <span style={{ color: s.accent }}>
                    <s.Icon size={18} />
                  </span>
                  <span className="text-sm font-medium">{s.handle}</span>
                </a>
              ))}
              <a
                href="https://tiktok.com/@digitivaco"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl gradient-border-subtle text-app-muted hover:text-app transition-all duration-300 hover:scale-105"
              >
                <span className="text-white">
                  <TikTokIcon size={18} />
                </span>
                <span className="text-sm font-medium">@digitivaco</span>
              </a>
            </div>
          </motion.div>

          {/* Right — decorative card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="gradient-border rounded-3xl p-10 relative overflow-hidden">
              {/* Inner glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              <p className="text-app-faint text-sm mb-6 tracking-wide">OUR APPROACH</p>

              {[
                { step: "01", title: "Discovery", desc: "We learn your vision, users, and goals." },
                { step: "02", title: "Strategy", desc: "Architecture, roadmap, and design system." },
                { step: "03", title: "Build", desc: "Rapid iteration with full transparency." },
                { step: "04", title: "Launch", desc: "Deployment, monitoring, and growth." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-5 mb-8 last:mb-0"
                >
                  <div className="gradient-text font-space font-bold text-2xl w-10 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-space font-semibold text-app mb-1">{item.title}</div>
                    <div className="text-app-faint text-sm">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
