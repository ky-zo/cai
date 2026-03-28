import { Section, SectionLabel } from "@/components/section";
import { HighlightOnScroll } from "@/components/highlight-on-scroll";
import { PenUnderline } from "@/components/pen-underline";

export function ProblemSection() {
  return (
    <Section>
      <SectionLabel>
        <span
          className="inline-block size-2.5 rounded-[2px]"
          style={{
            backgroundColor: "oklch(0.6 0.2 25)",
            boxShadow:
              "0 0 6px oklch(0.6 0.2 25 / 0.6), 0 0 14px oklch(0.6 0.2 25 / 0.3)",
          }}
        />
        The Problem
      </SectionLabel>

      <p
        className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-6"
        style={{ letterSpacing: "-0.02em" }}
      >
        You know <HighlightOnScroll>AI changes everything</HighlightOnScroll>,
        you&apos;re just not sure{" "}
        <PenUnderline>what to do about it.</PenUnderline>
      </p>

      <div className="space-y-4 text-sm text-[var(--muted)]">
        <p>
          Your engineers are curious but stretched thin. Tools are scattered,
          process is undefined, and everyone knows they&apos;re moving too
          slowly.
        </p>
        <p>
          You don&apos;t need a 6-month &ldquo;AI strategy.&rdquo; You need
          someone who&apos;s done this to show up and start building.
        </p>
      </div>
    </Section>
  );
}
