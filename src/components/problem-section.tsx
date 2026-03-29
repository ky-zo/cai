import { HighlightOnScroll } from "@/components/highlight-on-scroll";
import { PenUnderline } from "@/components/pen-underline";
import { ProblemSignalsList } from "@/components/problem-signals-list";
import { Section, SectionLabel } from "@/components/section";

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
        but your company{" "}
        <PenUnderline punctuation="exclamation">
          still operates the old way.
        </PenUnderline>
      </p>

      <ProblemSignalsList />
    </Section>
  );
}
