"use client";

import { type MotionValue, motion, useTransform } from "motion/react";

const METRICS = [
  { label: "AI code quality", detail: "4x more PRs per sprint" },
  { label: "Automated work", detail: "of manual QA & ops tasks" },
  { label: "Cycle time", detail: "reduction in time to ship" },
];

const RANGES: [number, number][] = [
  [0, 0.38],
  [0.15, 0.53],
  [0.3, 0.68],
];

function MetricBar({
  scrollYProgress,
  label,
  detail,
  range,
}: {
  scrollYProgress: MotionValue<number>;
  label: string;
  detail: string;
  range: [number, number];
}) {
  const fill = useTransform(scrollYProgress, range, [0, 1]);

  return (
    <div>
      <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] block mb-2">
        {label}
      </span>
      <div className="h-1.5 bg-[var(--border)] overflow-hidden">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: fill,
            backgroundColor: "var(--accent)",
          }}
        />
      </div>
      <p className="font-mono text-[10px] text-[var(--muted)] mt-1.5 opacity-70">
        {detail}
      </p>
    </div>
  );
}

export function MetricsBars({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {METRICS.map((m, i) => (
        <MetricBar
          key={m.label}
          scrollYProgress={scrollYProgress}
          label={m.label}
          detail={m.detail}
          range={RANGES[i]}
        />
      ))}
    </div>
  );
}
