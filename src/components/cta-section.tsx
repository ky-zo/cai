import { Section } from "@/components/section";
import { CalButton } from "@/components/cal-button";

export function CTASection() {
  return (
    <Section id="contact">
      <p
        className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-4 max-w-[50ch]"
        style={{ letterSpacing: "-0.02em" }}
      >
        If your team knows AI matters but still ships the old way, this is the
        reset.
      </p>
      <CalButton className="font-mono text-xs font-medium px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity inline-block cursor-pointer">
        Book an intro call
      </CalButton>
    </Section>
  );
}
