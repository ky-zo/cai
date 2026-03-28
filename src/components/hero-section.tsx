import Image from "next/image";
import { AsciiCloud } from "@/components/ascii-cloud";
import { CalButton } from "@/components/cal-button";

export function HeroSection() {
  return (
    <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 max-w-3xl mx-auto relative">
      <div className="flex flex-col lg:block">
        <div className="mb-10 sm:mb-14 flex justify-center lg:mb-0 lg:absolute lg:left-[90%] lg:top-1/2 lg:-translate-y-1/2">
          <AsciiCloud />
        </div>

        <div className="lg:max-w-[80%]">
          <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
            Turn your team into an{" "}
            <span className="whitespace-nowrap">AI-native</span> shipping
            machine.
          </h1>

          <p className="text-base leading-relaxed text-[var(--muted)] mb-8">
            I help software companies roll AI into engineering, QA, and internal
            workflows in 2 weeks, so the team actually ships faster instead of
            just experimenting.
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
  );
}
