"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Invitations", href: "#invitations" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative border-t border-app bg-app-deep">
      {/* Top gradient accent */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, #3B82F6, #10B981, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-2"
          >
            <div className="flex items-center">
              <div className="relative w-[110px] h-[36px]">
                <Image
                  src={theme === "night" ? "/logo-light.png" : "/logo-dark.png"}
                  alt="Digitiva"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-app-faint text-sm">We design the future people feel.</p>
          </motion.div>

          {/* Nav */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-app-faint hover:text-app transition-colors"
              >
                {l.label}
              </button>
            ))}
          </motion.nav>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {[
              { label: "Instagram", url: "https://instagram.com/digitivaco", abbr: "IG" },
              { label: "TikTok", url: "https://tiktok.com/@digitivaco", abbr: "TK" },
              { label: "Facebook", url: "https://facebook.com", abbr: "FB" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full gradient-border-subtle flex items-center justify-center text-xs font-bold text-app-muted hover:text-app hover:glow-blue transition-all duration-300"
              >
                {s.abbr}
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-app flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-app-dim text-sm">
            © {new Date().getFullYear()} Digitiva. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-app-dim text-sm">
            <MapPin size={13} className="text-[#3B82F6] flex-shrink-0" />
            Talkha, Dakahlia, Egypt
          </div>
          <p className="text-app-dim text-sm">
            Built with precision. Delivered with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
