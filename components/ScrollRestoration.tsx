"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (window.location.hash) return; // let the hash target scroll into view naturally
    window.scrollTo(0, 0);
  }, []);

  return null;
}
