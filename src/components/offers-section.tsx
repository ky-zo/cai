import { Section, SectionLabel } from "@/components/section";
import { CalButton } from "@/components/cal-button";
import {
  AccelerateAnimation,
  MultiplyAnimation,
  PipelineAnimation,
} from "@/components/offer-animations";

export function OffersSection() {
  return (
    <Section id="offers">
      <SectionLabel>
        <span
          className="inline-block size-2.5 rounded-[2px]"
          style={{
            backgroundColor: "oklch(0.55 0.15 250)",
            boxShadow:
              "0 0 6px oklch(0.55 0.15 250 / 0.6), 0 0 14px oklch(0.55 0.15 250 / 0.3)",
          }}
        />
        The Offers
      </SectionLabel>

      <div className="grid sm:grid-cols-3 gap-6 sm:gap-10">
        {/* Turn your team into AI-first speed */}
        <div>
          <AccelerateAnimation />
          <p
            className="text-lg font-semibold tracking-tight mb-1 mt-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Turn your team
            <br />
            into AI-first speed
          </p>
          <p className="font-mono text-sm text-[var(--muted)] mb-3">
            $7,000 &bull; one-time
          </p>
          <ul className="space-y-1.5 text-sm text-[var(--muted)]">
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Audit current workflows
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Set up AI tooling for engineering &amp; QA
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              4 hands-on workshops
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Train the team on tools and patterns
            </li>
          </ul>
        </div>

        {/* Hire fractional AI & product co-founder */}
        <div>
          <MultiplyAnimation />
          <p
            className="text-lg font-semibold tracking-tight mb-1 mt-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Hire fractional AI
            <br />& product co-founder
          </p>
          <p className="font-mono text-sm text-[var(--muted)] mb-3">
            $10,000/mo &bull; ongoing
          </p>
          <ul className="space-y-1.5 text-sm text-[var(--muted)]">
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Embedded in your team&apos;s rhythm
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Strategic AI roadmap ownership
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Ongoing implementation support
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Cross-team AI adoption
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Workflow design &amp; automation
            </li>
          </ul>
        </div>

        {/* Implement AI Agents orchestrator */}
        <div>
          <PipelineAnimation />
          <p
            className="text-lg font-semibold tracking-tight mb-1 mt-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Implement AI
            <br />
            agents orchestrator
          </p>
          <p className="font-mono text-sm text-[var(--muted)] mb-3">
            $5,000/mo &bull; ongoing
          </p>
          <ul className="space-y-1.5 text-sm text-[var(--muted)]">
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Custom AI orchestration system
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              End-to-end pipeline setup
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Integration with your stack
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Automation workflows
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-[var(--accent)] shrink-0">
                &gt;
              </span>
              Full handoff with documentation
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <CalButton className="font-mono text-xs font-medium px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity cursor-pointer">
          Book a call
        </CalButton>
      </div>
    </Section>
  );
}
