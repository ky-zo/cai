"use client";

import { type MotionValue, motion, useTransform } from "motion/react";

const METRICS = [
  { label: "Shipping velocity", detail: "4x more PRs per sprint" },
  { label: "Automated work", detail: "of manual QA & ops tasks" },
  { label: "Cycle time", detail: "reduction in time to ship" },
];

const RANGES: [number, number][] = [
  [0, 0.38],
  [0.15, 0.53],
  [0.3, 0.68],
];

export function MetricsBars({
  scrollYProgress,
}: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {METRICS.map((m, i) => {
        const fill = useTransform(scrollYProgress, RANGES[i], [0, 1]);

        return (
          <div key={m.label}>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] block mb-2">
              {m.label}
            </span>
            <div className="h-1.5 bg-[var(--border)] overflow-hidden">
              <motion.div
                className="h-full origin-left"
                style={{
                  scaleX: fill,
                  backgroundColor: "oklch(0.56 0.11 145)",
                }}
              />
            </div>
            <p className="font-mono text-[10px] text-[var(--muted)] mt-1.5 opacity-70">
              {m.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}
