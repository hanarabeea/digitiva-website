"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useLenis } from "./SmoothScroll";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Invitations", href: "#invitations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.6 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-app-deep/80 backdrop-blur-xl border-b border-app"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => {
              if (lenis) {
                lenis.scrollTo(0, { duration: 1.8 });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center group"
            data-cursor-hover
          >
            <div className="relative w-[110px] h-[36px]">
              <Image
                src={theme === "night" ? "/logo-light.png" : "/logo-dark.png"}
                alt="Digitiva"
                fill
                priority
                className="object-contain"
              />
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                data-cursor-hover
                className="text-sm font-medium text-app-muted hover:text-app transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#3B82F6] to-[#10B981] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              data-cursor-hover
              className="w-9 h-9 rounded-full flex items-center justify-center border border-app text-app-muted hover:text-app hover:border-strong transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block"
                >
                  {theme === "night" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              data-cursor-hover
              className="ml-1 px-5 py-2.5 rounded-full text-sm font-semibold gradient-border text-app hover:glow-blue transition-all duration-300"
            >
              Start a Project
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-app text-app"
            >
              {theme === "night" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              className="text-app"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-app-deep/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-space font-semibold text-app hover:gradient-text transition-all"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-4 px-8 py-3 rounded-full font-semibold gradient-border text-app"
            >
              Start a Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
