"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

const signals = [
  "AI-native companies are pulling away, and the gap is getting harder to close.",
  "Your team is experimenting with AI, but the company hasn't made the mental shift.",
  "Everyone can feel the team is moving too slowly.",
  "You haven't seen what good looks like yet, so it's easy to underestimate how wide the gap already is.",
];

function SignalItem({ signal }: { signal: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { margin: "0px 0px -30% 0px" });

  return (
    <li ref={ref} className="flex gap-3">
      <span
        className="problem-dot mt-1.5 inline-block size-1.5 shrink-0 rounded-[1px]"
        data-in-view={isInView}
      />
      <span>{signal}</span>
    </li>
  );
}

export function ProblemSignalsList() {
  return (
    <ul className="space-y-2 pl-4 text-sm text-[var(--muted)]">
      {signals.map((signal) => (
        <SignalItem key={signal} signal={signal} />
      ))}
    </ul>
  );
}
