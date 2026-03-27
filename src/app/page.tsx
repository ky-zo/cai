import Image from "next/image";
import { AsciiCloud } from "@/components/ascii-cloud";
import { CalButton } from "@/components/cal-button";
import { HighlightOnScroll } from "@/components/highlight-on-scroll";
import { ImpactSection } from "@/components/impact-section";
import {
  AccelerateAnimation,
  MultiplyAnimation,
  PipelineAnimation,
} from "@/components/offer-animations";
import { PenUnderline } from "@/components/pen-underline";
import { ToolChecklist } from "@/components/tool-checklist";

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-10 sm:py-14">
      {children}
    </section>
  );
}

function SectionLabel({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="font-mono text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-6 flex items-center gap-3"
    >
      <span className="shrink-0 flex items-center gap-2">{children}</span>
      <span className="flex-1 border-t border-[var(--border)]" />
    </h2>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="w-full mx-auto px-6 sm:px-8">
        {/* Hero */}
        <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 max-w-3xl mx-auto relative">
          <div className="flex flex-col lg:block">
            <div className="mb-10 sm:mb-14 flex justify-center lg:mb-0 lg:absolute lg:left-[90%] lg:top-1/2 lg:-translate-y-1/2">
              <AsciiCloud />
            </div>

            <div className="lg:max-w-[80%]">
              <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
                Turn your team into an AI-native shipping machine.
              </h1>

              <p className="text-base leading-relaxed text-[var(--muted)] mb-8">
                I help software companies roll AI into engineering, QA, and
                internal workflows in 2 weeks, so the team actually ships faster
                instead of just experimenting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
                <CalButton className="font-mono text-xs font-medium px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity cursor-pointer">
                  Book an intro call
                </CalButton>
                <a
                  href="#offers"
                  className="font-mono text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4"
                >
                  See the offers
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/kyzo.jpg"
                  alt="Kamil Kyzo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">Kamil Kyzo</p>
                  <p className="text-xs text-[var(--muted)] flex items-center gap-1.5 flex-wrap">
                    <a
                      href="https://www.linkedin.com/posts/kyzo_fluar-just-got-acquired-in-an-all-cash-6-activity-7441770654884020224-C1HH"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
                    >
                      2x exited founder
                    </a>
                    &bull;
                    <a
                      href="https://kyzo.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
                    >
                      shipped multiple products
                    </a>
                    &bull;
                    <a
                      href="https://github.com/ky-zo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
                    >
                      OS contributor
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="img"
                        aria-label="GitHub"
                      >
                        <title>GitHub</title>
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto">
          {/* Problem */}
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
              You know{" "}
              <HighlightOnScroll>AI changes everything</HighlightOnScroll>,
              you&apos;re just not sure{" "}
              <PenUnderline>what to do about it.</PenUnderline>
            </p>

            <div className="space-y-4 text-sm text-[var(--muted)]">
              <p>
                Your engineers are curious but stretched thin. Tools are
                scattered, process is undefined, and everyone knows they&apos;re
                moving too slowly.
              </p>
              <p>
                You don&apos;t need a 6-month &ldquo;AI strategy.&rdquo; You
                need someone who&apos;s done this to show up and start building.
              </p>
            </div>
          </Section>

          {/* Approach */}
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
                The goal is adoption and changed behavior, not information
                transfer.
              </p>
            </div>
          </Section>

          {/* Offers */}
          <Section id="offers">
            <SectionLabel>
              <span
                className="inline-block size-2.5 rounded-[2px]"
                style={{
                  backgroundColor: "oklch(0.6 0.17 145)",
                  boxShadow:
                    "0 0 6px oklch(0.6 0.17 145 / 0.6), 0 0 14px oklch(0.6 0.17 145 / 0.3)",
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

          {/* Impact */}
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

          {/* Testimonial */}
          <div className="border border-[var(--border)] rounded-lg p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-[var(--muted)] mb-6">
              &ldquo;This was the change we needed to move our company to be
              AI-first. After 2 weeks of work, our team (not only engineers)
              started using Claude Code on daily basis. We&rsquo;re now
              automating all the key company processes with AI.&rdquo;
            </p>

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

          {/* Fit */}
          <Section>
            <div className="grid sm:grid-cols-2 gap-12 sm:gap-16">
              <div>
                <SectionLabel>Best fit</SectionLabel>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--accent)] shrink-0">
                      +
                    </span>
                    You have a functioning engineering team, but shipping still
                    feels too slow
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--accent)] shrink-0">
                      +
                    </span>
                    Your team uses AI, but not in a way that compounds every day
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--accent)] shrink-0">
                      +
                    </span>
                    You can see the frontier moving and know your team is behind
                    it
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--accent)] shrink-0">
                      +
                    </span>
                    You want your team to build differently, not just experiment
                    more
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-6 opacity-60 flex items-center gap-3">
                  <span className="shrink-0">Not a fit</span>
                  <span className="flex-1 border-t border-[var(--border)]" />
                </p>
                <ul className="space-y-2.5 text-sm text-[var(--muted)]">
                  <li className="flex gap-3">
                    <span className="font-mono shrink-0">-</span>
                    Want AI advice without changing how the team works
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono shrink-0">-</span>
                    Want an outside vendor, not stronger internal leverage
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono shrink-0">-</span>
                    Want a strategy deck, not new habits, workflows, and
                    standards
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono shrink-0">-</span>
                    Are too early for process change to stick because there is
                    no real team workflow yet
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionLabel>FAQ</SectionLabel>

            <div className="space-y-0 divide-y divide-[var(--border)]">
              <details className="group py-5 first:pt-0">
                <summary className="text-sm cursor-pointer list-none flex items-start gap-3 font-medium">
                  <span className="font-mono text-[var(--accent)] shrink-0 mt-0.5 group-open:rotate-90 transition-transform">
                    +
                  </span>
                  How do you actually make a team move faster?
                </summary>
                <p className="text-sm text-[var(--muted)] mt-4 ml-6 max-w-[50ch]">
                  By changing how the team works day to day. The sprint puts in
                  place the workflows, standards, and AI habits that reduce
                  drag, raise leverage, and make faster execution repeatable.
                </p>
              </details>

              <details className="group py-5">
                <summary className="text-sm cursor-pointer list-none flex items-start gap-3 font-medium">
                  <span className="font-mono text-[var(--accent)] shrink-0 mt-0.5 group-open:rotate-90 transition-transform">
                    +
                  </span>
                  Is this training or consulting?
                </summary>
                <p className="text-sm text-[var(--muted)] mt-4 ml-6 max-w-[50ch]">
                  Neither in the usual sense. It&apos;s a hands-on operating
                  reset with implementation. There is teaching involved, but the
                  goal is changed behavior across the team, not a slide deck.
                </p>
              </details>

              <details className="group py-5">
                <summary className="text-sm cursor-pointer list-none flex items-start gap-3 font-medium">
                  <span className="font-mono text-[var(--accent)] shrink-0 mt-0.5 group-open:rotate-90 transition-transform">
                    +
                  </span>
                  Our engineers already use AI. Is this still relevant?
                </summary>
                <p className="text-sm text-[var(--muted)] mt-4 ml-6 max-w-[50ch]">
                  Usually yes. Most teams already use AI in pockets. The problem
                  is that it&apos;s inconsistent, shallow, or disconnected from
                  how the team actually ships. The sprint is about making that
                  leverage real and daily.
                </p>
              </details>

              <details className="group py-5">
                <summary className="text-sm cursor-pointer list-none flex items-start gap-3 font-medium">
                  <span className="font-mono text-[var(--accent)] shrink-0 mt-0.5 group-open:rotate-90 transition-transform">
                    +
                  </span>
                  Can this help if we&apos;re starting something new or
                  haven&apos;t launched yet?
                </summary>
                <p className="text-sm text-[var(--muted)] mt-4 ml-6 max-w-[50ch]">
                  Yes, if you already have a functioning team and want to set
                  modern AI-native workflows and standards early. No, if you are
                  still too early for process change to matter.
                </p>
              </details>
            </div>
          </Section>

          {/* Final CTA */}
          <Section id="contact">
            <p
              className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-4 max-w-[50ch]"
              style={{ letterSpacing: "-0.02em" }}
            >
              If your team knows AI matters but still ships the old way, this is
              the reset.
            </p>
            <CalButton className="font-mono text-xs font-medium px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity inline-block cursor-pointer">
              Book an intro call
            </CalButton>
          </Section>

          {/* Footer */}
          <footer className="py-8 mt-4">
            <p className="font-mono text-xs text-[var(--muted)] flex flex-wrap items-center gap-1.5">
              <a
                href="mailto:ai@kyzo.io"
                className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
              >
                ai@kyzo.io
              </a>
              <span>&bull;</span>
              <a
                href="https://x.com/ky__zo"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
              >
                @ky__zo
              </a>
              <span>&bull;</span>
              <a
                href="https://cal.com/kamil-kyzo/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
              >
                cal.com
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
