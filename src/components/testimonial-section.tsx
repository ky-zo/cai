"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useRef } from "react";

export function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-lg border border-[var(--border)] p-6 sm:p-8"
    >
      <div className="relative mb-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 -left-1 font-serif text-[5rem] leading-none transition-all duration-700 ease-out select-none"
          style={{
            color: "oklch(0.56 0.11 145 / 0.18)",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(8px)",
          }}
        >
          &ldquo;
        </span>

        <blockquote className="relative space-y-3 pt-8">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            We completely changed how the company operates. AI is now embedded in
            how we think and work, and the impact went far beyond the original
            scope, as we started thinking with AI-first principles about all the processes and workflows.<br/><br/>
            It was a <span className="font-bold">company-wide mentality shift</span>.
          </p>
          <p
            className="text-lg  italic tracking-tight text-[var(--foreground)] transition-all duration-700 delay-200 ease-out sm:text-xl"
            style={{
              letterSpacing: "-0.02em",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(6px)",
            }}
          >
            
          </p>
        </blockquote>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/heyreach-logo.jpg"
            alt="Nick Velkovski"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">Nick Velkovski</p>
            <p className="text-xs text-[var(--muted)]">
              HeyReach (+$10m ARR)
            </p>
          </div>
        </div>
        <Image
          src="/heyreach-icon.svg"
          alt="HeyReach"
          width={100}
          height={20}
          className="h-5 w-auto"
          unoptimized
        />
      </div>
    </div>
  );
}
