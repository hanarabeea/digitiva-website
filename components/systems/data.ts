import type { Dictionary } from "@/app/[lang]/dictionaries";

// Screenshots come from the real systems running on demo data; `shots` order matches `screens` in the dictionaries.
export const SYSTEM_META = [
  {
    key: "digiflow",
    accent: "#10B981",
    shots: ["pos", "tables", "waiter_order", "kds", "cashier", "dashboard", "prodsales"],
    phone: "/systems/digiflow-mobile.webp" as string | undefined,
  },
  {
    key: "digiclinic",
    accent: "#E5484D",
    shots: ["reception", "visit", "rx", "week", "home", "record", "booking"],
    phone: undefined as string | undefined,
  },
];

export const SYSTEM_SLUGS = SYSTEM_META.map((m) => m.key);

export type System = Dictionary["systems"]["items"][number] & (typeof SYSTEM_META)[number];

export const getSystems = (dict: Dictionary): System[] =>
  dict.systems.items.map((s, i) => ({ ...s, ...SYSTEM_META[i] }));

export const shotSrc = (s: System, i: number) => `/systems/${s.key}-${s.shots[i]}.webp`;
