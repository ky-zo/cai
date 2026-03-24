"use client";

import { useRef, useEffect, useState } from "react";
import { type MotionValue, useMotionValueEvent } from "motion/react";

const STAGES = ["PLAN", "CODE", "REVIEW", "TEST", "DEPLOY"];
const SQ = 5;
const MAX_DOTS = 65;

const GREENS = [
  "#39d353", "#26a641", "#006d32", "#0e4429",
  "#39d353", "#26a641", "#006d32", "#0e4429",
];

interface Dot {
  x: number;
  y: number;
  speed: number;
  colorIdx: number;
}

export function PipelineFlow({
  scrollYProgress,
}: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [openCount, setOpenCount] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setOpenCount(Math.min(Math.floor(v * (STAGES.length + 1)), STAGES.length));
  });

  const S = useRef({
    dots: [] as Dot[],
    transitions: new Float64Array(STAGES.length),
    tick: 0,
    nid: 0,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const cvs = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = cvs.getContext("2d")!;
    const s = S.current;
    let raf = 0;
    let visible = true;

    const fit = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = devicePixelRatio || 1;
      s.w = r.width;
      s.h = r.height;
      cvs.width = r.width * dpr;
      cvs.height = r.height * dpr;
      cvs.style.width = r.width + "px";
      cvs.style.height = r.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    fit();

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const sigma = 0.035;
    const maxH = 0.38;
    const minH = 0.06;

    const half = (x: number) => {
      let result = maxH;
      for (let i = 0; i < STAGES.length; i++) {
        const center = (i + 0.5) / STAGES.length;
        const bell = Math.exp(-0.5 * ((x - center) / sigma) ** 2);
        const mn = minH + (maxH - minH) * s.transitions[i];
        result -= (maxH - mn) * bell;
      }
      return Math.max(minH, result);
    };

    const spd = (x: number) => {
      const h = half(x);
      const openness = (h - minH) / (maxH - minH);
      return 0.02 + 0.98 * openness ** 0.5;
    };

    const frame = () => {
      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const { w, h, dots } = s;
      if (!w) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const cy = h * 0.52;
      const ps = h * 0.7;

      // Update per-stage transitions from scroll
      const progress = scrollYProgress.get();
      for (let i = 0; i < STAGES.length; i++) {
        const threshold = (i + 1) / (STAGES.length + 1);
        const target = progress >= threshold ? 1 : 0;
        s.transitions[i] += (target - s.transitions[i]) * 0.04;
      }

      // Spawn
      s.tick++;
      if (s.tick % 8 === 0 && dots.length < MAX_DOTS) {
        dots.push({
          x: -0.015,
          y: 0.5 + (Math.random() - 0.5) * 0.35,
          speed: 0.0016 + Math.random() * 0.0008,
          colorIdx: s.nid++ % GREENS.length,
        });
      }

      // Update positions
      for (const d of dots) {
        d.x += d.speed * spd(d.x);
        d.y += (Math.random() - 0.5) * 0.004;
        const h2 = half(d.x);
        d.y = Math.max(0.5 - h2 + 0.04, Math.min(0.5 + h2 - 0.04, d.y));
      }
      s.dots = dots.filter((d) => d.x < 1.04);

      // --- Draw ---
      ctx.clearRect(0, 0, w, h);

      // Pipe walls
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ccc9c3";
      for (const sign of [-1, 1]) {
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const nx = i / 200;
          const px = nx * w;
          const py = cy + sign * half(nx) * ps;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Stage dividers
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = "#ccc9c340";
      for (let i = 1; i < STAGES.length; i++) {
        const px = (i / STAGES.length) * w;
        ctx.beginPath();
        ctx.moveTo(px, cy - maxH * ps);
        ctx.lineTo(px, cy + maxH * ps);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Bottleneck indicators for blocked stages
      for (let i = 0; i < STAGES.length; i++) {
        if (s.transitions[i] < 0.9) {
          const bx = ((i + 0.5) / STAGES.length) * w;
          const alpha = 0.3 * (1 - s.transitions[i]);
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = `rgba(191, 74, 48, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(bx, cy - 0.44 * ps);
          ctx.lineTo(bx, cy + 0.44 * ps);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Green glowing squares
      ctx.save();
      ctx.shadowColor = "#39d35380";
      ctx.shadowBlur = 5;
      for (const d of s.dots) {
        const px = d.x * w;
        const py = cy + (d.y - 0.5) * ps * 0.6;
        ctx.fillStyle = GREENS[d.colorIdx];
        ctx.fillRect(px - SQ / 2, py - SQ / 2, SQ, SQ);
      }
      ctx.restore();

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [scrollYProgress]);

  return (
    <div>
      <div className="flex mb-3">
        {STAGES.map((name, i) => (
          <div key={name} className="flex-1 text-center">
            <span
              className={`font-mono text-[10px] tracking-widest transition-colors duration-300 ${
                i < openCount
                  ? "text-[oklch(0.56_0.11_145)] font-bold"
                  : "text-[oklch(0.55_0.18_25)] font-medium"
              }`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      <div ref={wrapRef} className="w-full" style={{ height: 160 }}>
        <canvas ref={canvasRef} className="block" />
      </div>
    </div>
  );
}
