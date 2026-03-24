import Image from "next/image";
import { AsciiCloud } from "@/components/ascii-cloud";
import { ImpactSection } from "@/components/impact-section";

function Section({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="py-10 sm:py-14">
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-6 flex items-center gap-3">
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
            <div className="mb-10 sm:mb-14 flex justify-center lg:hidden">
              <AsciiCloud />
            </div>

            <div className="hidden lg:block absolute left-[90%] top-1/2 -translate-y-1/2">
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
                <a
                  href="#contact"
                  className="font-mono text-xs font-medium px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
                >
                  Book an intro call
                </a>
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
                    <a href="https://www.linkedin.com/posts/kyzo_fluar-just-got-acquired-in-an-all-cash-6-activity-7441770654884020224-C1HH" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">2x exited founder</a>
                    &bull;
                    <a href="https://kyzo.io" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">shipped multiple products</a>
                    &bull;
                    <a href="https://github.com/ky-zo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">
                      OS contributor
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
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
                  boxShadow: "0 0 6px oklch(0.6 0.2 25 / 0.6), 0 0 14px oklch(0.6 0.2 25 / 0.3)",
                }}
              />
              The Problem
            </SectionLabel>

            <p className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-6" style={{ letterSpacing: "-0.02em" }}>
              You know AI changes everything. You&apos;re just not sure what to do about it.
            </p>

            <div className="space-y-4 text-sm text-[var(--muted)]">
              <p>
                Your engineers are curious but stretched thin. You&apos;ve seen
                the demos but can&apos;t connect them to your actual workflows.
              </p>
              <p>
                Everyone uses different tools. Nobody agrees on process. The team
                knows they&apos;re moving too slowly but doesn&apos;t know how
                to change the system.
              </p>
              <p>
                You don&apos;t need a 6-month &ldquo;AI strategy&rdquo; from a
                consulting firm. You need someone who&apos;s done this before to
                show up and start building.
              </p>
            </div>
          </Section>

{/* Approach */}
          <Section>
            <SectionLabel>
              <span
                className="inline-block size-2.5 rounded-[2px]"
                style={{
                  backgroundColor: "oklch(0.55 0.15 250)",
                  boxShadow: "0 0 6px oklch(0.55 0.15 250 / 0.6), 0 0 14px oklch(0.55 0.15 250 / 0.3)",
                }}
              />
              The Goal
            </SectionLabel>

            <p className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-6" style={{ letterSpacing: "-0.02em" }}>
              I elevate your team into the highest speed of AI shipping.
            </p>

            <div className="space-y-4 text-sm text-[var(--muted)]">
              <p>
                No decks. No frameworks. No 90-day discovery phase.
              </p>

              <p className="text-xs font-mono tracking-wider uppercase text-[var(--muted)]">
                Including
              </p>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 512 512" fill="none" aria-label="Claude"><path d="M121.525 328.847L208.274 280.096L209.725 275.847L208.274 273.499H204.031L189.517 272.604L139.947 271.263L96.9633 269.474L55.3195 267.237L44.8248 265.001L35 252.031L36.0048 245.545L44.8248 239.619L57.4408 240.737L85.3522 242.638L127.219 245.545L157.587 247.334L202.58 252.031H209.725L210.73 249.123L208.274 247.334L206.376 245.545L163.057 216.138L116.166 185.054L91.6043 167.164L78.3185 158.107L71.6197 149.609L68.717 131.048L80.7747 117.742L96.9633 118.86L101.094 119.979L117.506 132.613L152.563 159.784L198.337 193.552L205.036 199.143L207.716 197.242L208.051 195.9L205.036 190.868L180.139 145.807L153.568 99.9638L141.733 80.9555L138.607 69.5505C137.491 64.8543 136.709 60.9408 136.709 56.1328L150.442 37.4599L158.033 35L176.343 37.4599L184.047 44.1687L195.435 70.2214L213.856 111.257L242.437 167.052L250.811 183.601L255.277 198.919L256.951 203.615H259.854V200.932L262.199 169.512L266.553 130.936L270.795 81.2909L272.247 67.3142L279.169 50.5421L292.901 41.4852L303.619 46.6286L312.439 59.2636L311.211 67.426L305.964 101.529L295.692 154.976L288.994 190.757H292.901L297.367 186.284L315.454 162.244L345.821 124.227L359.219 109.133L374.849 92.4723L384.897 84.5335H403.877L417.833 105.331L411.58 126.799L392.043 151.622L375.854 172.643L352.632 203.951L338.118 228.997L339.457 231.01L342.918 230.674L395.392 219.493L423.75 214.349L457.578 208.535L472.874 215.691L474.549 222.959L468.52 237.83L432.347 246.775L389.921 255.273L326.73 270.256L325.948 270.815L326.842 271.933L355.311 274.617L367.481 275.288H397.29L452.778 279.425L467.292 289.041L476 300.781L474.549 309.727L452.219 321.132L422.075 313.975L351.738 297.203L327.623 291.165H324.274V293.178L344.37 312.857L381.213 346.178L427.323 389.114L429.667 399.737L423.75 408.123L417.498 407.228L376.97 376.703L361.34 362.95L325.948 333.096H323.604V336.226L331.754 348.19L374.849 413.042L377.082 432.945L373.956 439.431L362.791 443.344L350.51 441.108L325.278 405.663L299.265 365.745L278.276 329.965L275.708 331.418L263.315 465.036L257.51 471.857L244.112 477L232.948 468.502L227.03 454.749L232.948 427.578L240.093 392.133L245.898 363.956L251.146 328.959L254.272 317.33L254.049 316.547L251.481 316.883L225.132 353.11L185.052 407.34L153.344 441.331L145.752 444.35L132.578 437.53L133.806 425.342L141.175 414.496L185.052 358.589L211.512 323.927L228.593 303.912L228.482 301.005H227.477L110.919 376.815L90.1529 379.498L81.2213 371.112L82.3377 357.359L86.5802 352.887L121.637 328.735L121.525 328.847Z" fill="#D97757"/></svg>
                  Claude Code
                </span>
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 512 512" fill="none" aria-label="OpenAI"><g clipPath="url(#oa)"><path d="M439.173 216.769C448.876 187.692 445.534 155.84 430.018 129.392C406.682 88.826 359.771 67.956 313.956 77.777C293.575 54.852 264.292 41.815 233.593 42.002C186.762 41.895 145.211 72 130.803 116.488C100.719 122.64 74.751 141.442 59.555 168.09C36.046 208.549 41.405 259.55 72.813 294.244C63.11 323.321 66.451 355.173 81.968 381.621C105.303 422.187 152.214 443.057 198.029 433.236C218.397 456.161 247.693 469.198 278.392 468.998C325.25 469.118 366.815 438.987 381.222 394.458C411.307 388.306 437.275 369.505 452.471 342.857C475.953 302.397 470.58 251.437 439.186 216.742L439.173 216.769Z" fill="currentColor"/><path d="M278.419 441.095C259.668 441.122 241.505 434.57 227.111 422.574L229.637 421.146L314.798 372.04C319.155 369.571 321.828 364.941 321.802 359.937V240.067L357.793 260.817C358.181 261.004 358.435 261.378 358.488 261.805V361.071C358.435 405.213 322.63 441.002 278.419 441.095Z" fill="var(--background)"/><path d="M106.225 367.663C96.83 351.463 93.448 332.475 96.669 314.047L99.195 315.555L184.357 364.661C188.673 367.183 194.019 367.183 198.35 364.661L302.316 304.719V346.219C302.342 346.646 302.142 347.06 301.808 347.327L215.724 396.953C177.38 418.998 128.411 405.894 106.238 367.663Z" fill="var(--background)"/><path d="M83.812 182.061C93.168 165.835 107.936 153.425 125.524 146.98V149.915V248.141C125.457 253.131 128.13 257.762 132.474 260.23L236.44 320.158L200.448 340.908C200.087 341.149 199.633 341.189 199.232 341.015L113.135 291.349C74.871 269.224 61.747 220.345 83.799 182.074Z" fill="var(--background)"/><path d="M379.525 250.769L275.559 190.828L311.551 170.091C311.912 169.851 312.366 169.811 312.767 169.985L398.864 219.611C437.195 241.722 450.332 290.681 428.187 328.952C418.818 345.152 404.063 357.562 386.488 364.02V262.859C386.528 257.868 383.868 253.251 379.538 250.769Z" fill="var(--background)"/><path d="M415.343 196.94L412.817 195.432L327.656 146.326C323.339 143.804 317.993 143.804 313.662 146.326L209.696 206.267V164.767C209.67 164.34 209.87 163.926 210.204 163.66L296.288 114.073C334.632 91.989 383.655 105.133 405.76 143.43C415.102 159.603 418.484 178.538 415.316 196.94Z" fill="var(--background)"/><path d="M190.13 270.906L154.125 250.156C153.737 249.969 153.484 249.595 153.43 249.168V149.902C153.457 105.706 189.368 69.891 233.633 69.918C252.357 69.918 270.48 76.483 284.874 88.439L282.348 89.867L197.187 138.973C192.83 141.442 190.157 146.059 190.184 151.063L190.13 270.879Z" fill="var(--background)"/><path d="M209.683 228.818L255.993 202.117L302.302 228.805V282.195L255.993 308.883L209.683 282.195V228.818Z" fill="var(--background)"/></g><defs><clipPath id="oa"><rect width="512" height="512"/></clipPath></defs></svg>
                  Codex
                </span>
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-label="Cursor"><rect width="24" height="24" rx="4.8" fill="#000"/><path d="M7 17V7l10 5-10 5z" fill="#fff"/></svg>
                  Cursor
                </span>
                </div>
                <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Skills"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  Skills
                </span>
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="MCPs"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                  MCPs
                </span>
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Workflows"><path d="M3 3h6v6H3zM15 3h6v6h-6zM9 15h6v6H9z"/><path d="M6 9v3h3M18 9v3h-3M12 9v6"/></svg>
                  Workflows
                </span>
                </div>
                <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 120 120" fill="none" aria-label="OpenClaw"><path d="M60 10C30 10 15 35 15 55C15 75 30 95 45 100L45 110L55 110L55 100C55 100 60 102 65 100L65 110L75 110L75 100C90 95 105 75 105 55C105 35 90 10 60 10Z" fill="#E8553A"/><path d="M20 45C5 40 0 50 5 60C10 70 20 65 25 55C28 48 25 45 20 45Z" fill="#E8553A"/><path d="M100 45C115 40 120 50 115 60C110 70 100 65 95 55C92 48 95 45 100 45Z" fill="#E8553A"/><circle cx="45" cy="35" r="6" fill="#050810"/><circle cx="75" cy="35" r="6" fill="#050810"/><circle cx="46" cy="34" r="2" fill="#00e5cc"/><circle cx="76" cy="34" r="2" fill="#00e5cc"/></svg>
                  OpenClaw
                </span>
                <span className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Agent Orchestrators"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M8.5 16.5L10 14M15.5 16.5L14 14"/></svg>
                  Agent Orchestrators
                </span>
                </div>
              </div>

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
                  boxShadow: "0 0 6px oklch(0.6 0.17 145 / 0.6), 0 0 14px oklch(0.6 0.17 145 / 0.3)",
                }}
              />
              The Offer
            </SectionLabel>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
              {/* AI Setup Sprint */}
              <div>
                <p className="text-lg font-semibold tracking-tight mb-1" style={{ letterSpacing: "-0.02em" }}>
                  AI Setup Sprint
                </p>
                <p className="font-mono text-sm text-[var(--muted)] mb-3">
                  $5,000 &bull; 2 weeks
                </p>
                <ul className="space-y-1.5 text-sm text-[var(--muted)]">
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Audit current workflows
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Set up AI tooling for engineering &amp; QA
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    4 hands-on workshops
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Train the team on tools and patterns
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Operating model for what happens next
                  </li>
                </ul>
              </div>

              {/* Fractional AI */}
              <div>
                <p className="text-lg font-semibold tracking-tight mb-1" style={{ letterSpacing: "-0.02em" }}>
                  Fractional AI Lead
                </p>
                <p className="font-mono text-sm text-[var(--muted)] mb-3">
                  $10,000/mo &bull; ongoing
                </p>
                <ul className="space-y-1.5 text-sm text-[var(--muted)]">
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Everything in the Sprint
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Ongoing implementation support
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Workflow design &amp; automation
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Cross-team AI adoption
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-[var(--accent)] shrink-0">&gt;</span>
                    Embedded in your team&apos;s rhythm
                  </li>
                </ul>
              </div>
            </div>
          </Section>

{/* Impact */}
          <Section>
            <SectionLabel>
              <span
                className="inline-block size-2.5 rounded-[2px]"
                style={{
                  backgroundColor: "oklch(0.58 0.14 70)",
                  boxShadow: "0 0 6px oklch(0.58 0.14 70 / 0.6), 0 0 14px oklch(0.58 0.14 70 / 0.3)",
                }}
              />
              The Impact
            </SectionLabel>

            <p className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-8" style={{ letterSpacing: "-0.02em" }}>
              We treat the process as a whole, removing the bottlenecks.
            </p>

            <ImpactSection />
          </Section>

{/* Testimonial */}
          <div className="border border-[var(--border)] rounded-lg p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-[var(--muted)] mb-6">
                &ldquo;Kamil got our 11 engineers and 6 QA using AI daily. Introduced
                Claude Code into real workflows. Created better data flow between
                customer success and development. This was not a theory exercise — it changed how the company
                operated.&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/heyreach-logo.jpg"
                    alt="Nikola Velkowski"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">Nikola Velkowski</p>
                    <p className="text-xs text-[var(--muted)]">HeyReach (+$10m ARR)</p>
                  </div>
                </div>
                <img
                  src="/heyreach-icon.svg"
                  alt="HeyReach"
                  className="h-5 opacity-60"
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
                    <span className="font-mono text-[var(--accent)] shrink-0">+</span>
                    Founder-led software companies
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--accent)] shrink-0">+</span>
                    Teams shipping a real product
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[var(--accent)] shrink-0">+</span>
                    Want implementation, not a report
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
                    Looking for a chatbot vendor
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono shrink-0">-</span>
                    Want a strategy deck, not changed behavior
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono shrink-0">-</span>
                    No real product or workflows yet
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
                  Why not just let the team figure this out?
                </summary>
                <p className="text-sm text-[var(--muted)] mt-4 ml-6 max-w-[50ch]">
                  Because most teams don&apos;t fail from lack of interest. They
                  fail from fragmented adoption and no clear process. A sprint
                  compresses months of experimentation into two focused weeks.
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
                  Neither. It&apos;s an embedded operating reset. The goal is
                  changed behavior, not a slide deck.
                </p>
              </details>

              <details className="group py-5">
                <summary className="text-sm cursor-pointer list-none flex items-start gap-3 font-medium">
                  <span className="font-mono text-[var(--accent)] shrink-0 mt-0.5 group-open:rotate-90 transition-transform">
                    +
                  </span>
                  Do you work with non-software companies?
                </summary>
                <p className="text-sm text-[var(--muted)] mt-4 ml-6 max-w-[50ch]">
                  The strongest fit right now is software companies with
                  engineering and QA teams.
                </p>
              </details>
            </div>
          </Section>

{/* Final CTA */}
          <Section id="contact">
            <p className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-4 max-w-[50ch]" style={{ letterSpacing: "-0.02em" }}>
              If your team knows AI matters but still ships the old way, this is
              the reset.
            </p>
            <a
              href="#contact"
              className="font-mono text-xs font-medium px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity inline-block"
            >
              Book an intro call
            </a>
          </Section>

          {/* Footer */}
          <footer className="py-8 mt-4">
            <p className="font-mono text-xs text-[var(--muted)] flex flex-wrap items-center gap-1.5">
              <a href="mailto:ai@kyzo.io" className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">ai@kyzo.io</a>
              <span>&bull;</span>
              <a href="https://x.com/ky__zo" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">@ky__zo</a>
              <span>&bull;</span>
              <a href="https://cal.com/kamil-kyzo/discovery" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">cal.com</a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
