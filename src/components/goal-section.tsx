import { Section, SectionLabel } from "@/components/section";
import { ToolChecklist } from "@/components/tool-checklist";

export function GoalSection() {
  return (
    <Section>
      <SectionLabel id="goal-title">
        <span
          className="inline-block size-2.5 rounded-[2px]"
          style={{
            backgroundColor: "oklch(0.55 0.15 250)",
            boxShadow:
              "0 0 6px oklch(0.55 0.15 250 / 0.6), 0 0 14px oklch(0.55 0.15 250 / 0.3)",
          }}
        />
        The Goal
      </SectionLabel>

      <p
        className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-6"
        style={{ letterSpacing: "-0.02em" }}
      >
        I elevate your team into the highest speed of AI shipping.
      </p>

      <div className="space-y-4 text-sm text-[var(--muted)]">
        <p>No decks. No frameworks. No 90-day discovery phase.</p>

        <p className="text-xs font-mono tracking-wider uppercase text-[var(--muted)]">
          Including
        </p>

        <ToolChecklist endTargetId="goal-title" />

        <p>
          The goal is adoption and changed behavior, not information transfer.
        </p>
      </div>
    </Section>
  );
}
