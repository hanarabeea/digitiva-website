"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "night" | "day";

const ThemeCtx = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "night", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("night");

  useEffect(() => {
    const saved = (localStorage.getItem("dgtv-theme") as Theme | null) ?? "night";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("dgtv-theme", next);
  };

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
