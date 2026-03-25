"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { MetricsBars } from "./metrics-bars";
import { PipelineFlow } from "./pipeline-flow";

export function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.3"],
  });

  return (
    <div ref={ref}>
      <MetricsBars scrollYProgress={scrollYProgress} />
      <div className="mt-10">
        <PipelineFlow scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
