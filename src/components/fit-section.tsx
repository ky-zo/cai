import { Section, SectionLabel } from "@/components/section";

export function FitSection() {
  return (
    <Section>
      <div className="grid sm:grid-cols-2 gap-12 sm:gap-16">
        <div>
          <SectionLabel>Best fit</SectionLabel>
          <ul className="space-y-2.5 text-sm">
            <li className="flex gap-3">
              <span className="font-mono text-[var(--accent)] shrink-0">+</span>
              You have a functioning engineering team, but shipping still feels
              too slow
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[var(--accent)] shrink-0">+</span>
              Your team uses AI, but not in a way that compounds every day
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[var(--accent)] shrink-0">+</span>
              You can see the frontier moving and know your team is behind it
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[var(--accent)] shrink-0">+</span>
              You want your team to build differently, not just experiment more
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
              Want a strategy deck, not new habits, workflows, and standards
            </li>
            <li className="flex gap-3">
              <span className="font-mono shrink-0">-</span>
              Are too early for process change to stick because there is no real
              team workflow yet
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
