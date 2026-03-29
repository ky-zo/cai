import { Section, SectionLabel } from "@/components/section";
import { ToolChecklist } from "@/components/tool-checklist";

export function GoalSection() {
  return (
    <Section>
      <SectionLabel id="goal-title">
        <span
          className="inline-block size-2.5 rounded-[2px]"
          style={{
            backgroundColor: "oklch(0.6 0.17 145)",
            boxShadow:
              "0 0 6px oklch(0.6 0.17 145 / 0.6), 0 0 14px oklch(0.6 0.17 145 / 0.3)",
          }}
        />
        The Goal
      </SectionLabel>

      <p
        className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-6"
        style={{ letterSpacing: "-0.02em" }}
      >
        Make the company-wide shift from &ldquo;we try some AI&rdquo; to
        &ldquo;this is how we work now.&rdquo;
      </p>

      <div className="space-y-4 text-sm text-[var(--muted)]">
        

        <p>
          Hands-on, battle-tested help to make the shift fast and get your
          team moving immediately.
        </p>

        <p className="text-xs font-mono tracking-wider uppercase text-[var(--muted)]">
          Including
        </p>

        <ToolChecklist endTargetId="goal-title" />

        <p>
          The goal is not information transfer.<br/>It's a <span className="font-bold">company-wide
          mindset shift</span>: faster workflows, better first steps, and habits that
          stick.<br/>No decks. No frameworks. No 90-day discovery phase.
        </p>
      </div>
    </Section>
  );
}
