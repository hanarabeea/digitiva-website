"use client";
import { useEffect, useRef } from "react";

export default function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let tick = 0;

    function draw() {
      tick++;
      if (tick % 3 !== 0) { raf = requestAnimationFrame(draw); return; }

      const W = window.innerWidth;
      const H = window.innerHeight;
      if (canvas!.width !== W) canvas!.width = W;
      if (canvas!.height !== H) canvas!.height = H;

      const img = ctx!.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx!.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: 0.032, mixBlendMode: "overlay" }}
      aria-hidden
    />
  );
}
