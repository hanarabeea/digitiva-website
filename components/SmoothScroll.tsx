"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LenisContext = createContext<any>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<InstanceType<typeof Lenis> | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const initialHash = window.location.hash?.slice(1) || null;
    if (!initialHash) window.scrollTo(0, 0);

    // Skip Lenis on touch/mobile devices — it hijacks native touch scrolling
    // and can cause sections to appear blank on iOS Safari
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
      || "ontouchstart" in window;
    if (isTouchDevice) {
      if (initialHash) {
        requestAnimationFrame(() => {
          document.getElementById(initialHash)?.scrollIntoView({ behavior: "auto" });
        });
      }
      return;
    }

    const l = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    } as ConstructorParameters<typeof Lenis>[0]);

    setLenis(l);

    let rafId: number;
    function raf(time: number) {
      l.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    if (initialHash) {
      // Wait a tick for layout/fonts to settle before jumping to the section.
      setTimeout(() => {
        const el = document.getElementById(initialHash);
        if (el) l.scrollTo(el, { offset: -80, immediate: true });
      }, 60);
    }

    return () => {
      cancelAnimationFrame(rafId);
      l.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
