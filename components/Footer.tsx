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
              {
                label: "Instagram",
                url: "https://instagram.com/digitiva.co",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                ),
              },
              {
                label: "TikTok",
                url: "https://tiktok.com/@digitivaco",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
                  </svg>
                ),
              },
              {
                label: "Facebook",
                url: "https://www.facebook.com/share/1JNmHQvVSx/?mibextid=wwXIfr",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full gradient-border-subtle flex items-center justify-center text-app-muted hover:text-app hover:glow-blue transition-all duration-300"
              >
                {s.icon}
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
