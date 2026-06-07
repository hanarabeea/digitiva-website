"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

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

const SERVICES = [
  "Web Development",
  "UI/UX Design",
  "E-Commerce",
  "Branding",
  "Digital Invitations",
  "ERP System",
  "Other",
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="gradient-border rounded-3xl p-10 flex flex-col items-center justify-center gap-5 text-center min-h-[420px]">
        <div className="w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
          <CheckCircle size={32} className="text-[#10B981]" />
        </div>
        <h3 className="font-space font-bold text-app text-2xl">Message sent!</h3>
        <p className="text-app-muted text-sm max-w-xs leading-relaxed">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-app-dim hover:text-app transition-colors border-b border-app pb-0.5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
      }}
      className="gradient-border rounded-3xl p-8 md:p-10 relative overflow-hidden mouse-glow-card shiny-border-card space-y-5"
    >
      {/* Inner glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)", filter: "blur(40px)" }} />

      <p className="text-app-faint text-xs tracking-[0.2em] uppercase mb-2">Send us a message</p>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-app-dim font-space font-semibold uppercase tracking-wider">Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-app-card border border-app text-app text-sm placeholder:text-app-faint focus:outline-none focus:border-[#3B82F6]/60 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-app-dim font-space font-semibold uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-app-card border border-app text-app text-sm placeholder:text-app-faint focus:outline-none focus:border-[#3B82F6]/60 transition-colors"
          />
        </div>
      </div>

      {/* Service */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-app-dim font-space font-semibold uppercase tracking-wider">Service needed</label>
        <select
          value={form.service}
          onChange={(e) => set("service", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app text-app text-sm focus:outline-none focus:border-[#3B82F6]/60 transition-colors appearance-none cursor-pointer"
        >
          <option value="" className="bg-app-card">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s} className="bg-app-card">{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-app-dim font-space font-semibold uppercase tracking-wider">Message</label>
        <textarea
          required
          rows={4}
          placeholder="Tell us about your project…"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app text-app text-sm placeholder:text-app-faint focus:outline-none focus:border-[#3B82F6]/60 transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={15} />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="group w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white btn-shimmer hover:scale-[1.02] hover:glow-blue transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4, #10B981, #3B82F6)", backgroundSize: "200% auto" }}
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Sending…</>
        ) : (
          <><Send size={16} /> Send Message</>
        )}
      </button>
    </form>
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

            {/* Location */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={15} className="text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-xs text-app-dim uppercase tracking-widest mb-0.5">Based in</p>
                <p className="text-app text-sm font-semibold font-space">Talkha, Dakahlia, Egypt</p>
              </div>
            </div>

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

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
