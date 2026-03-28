import { Section, SectionLabel } from "@/components/section";
import { ImpactSection } from "@/components/impact-section";

export function ImpactSectionWrapper() {
  return (
    <Section>
      <SectionLabel>
        <span
          className="inline-block size-2.5 rounded-[2px]"
          style={{
            backgroundColor: "oklch(0.58 0.14 70)",
            boxShadow:
              "0 0 6px oklch(0.58 0.14 70 / 0.6), 0 0 14px oklch(0.58 0.14 70 / 0.3)",
          }}
        />
        The Impact
      </SectionLabel>

      <p
        className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-8"
        style={{ letterSpacing: "-0.02em" }}
      >
        We treat the process as a whole, removing the bottlenecks.
      </p>

      <ImpactSection />
    </Section>
  );
}
