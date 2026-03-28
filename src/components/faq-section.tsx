"use client";

import { Section, SectionLabel } from "@/components/section";
import { useState } from "react";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-5 first:pt-0 border-b border-[var(--border)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm cursor-pointer flex items-start gap-3 font-medium w-full text-left"
      >
        <span
          className="font-mono text-[var(--accent)] shrink-0 mt-0.5 transition-transform duration-300 ease-out"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          +
        </span>
        {question}
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-[var(--muted)] pt-4 ml-6 max-w-[50ch]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "How do you actually make a team move faster?",
    answer:
      "By changing how the team works day to day. The sprint puts in place the workflows, standards, and AI habits that reduce drag, raise leverage, and make faster execution repeatable.",
  },
  {
    question: "Is this training or consulting?",
    answer:
      "Neither in the usual sense. It's a hands-on operating reset with implementation. There is teaching involved, but the goal is changed behavior across the team, not a slide deck.",
  },
  {
    question: "Our engineers already use AI. Is this still relevant?",
    answer:
      "Usually yes. Most teams already use AI in pockets. The problem is that it's inconsistent, shallow, or disconnected from how the team actually ships. The sprint is about making that leverage real and daily.",
  },
  {
    question: "Can this help if we're starting something new or haven't launched yet?",
    answer:
      "Yes, if you already have a functioning team and want to set modern AI-native workflows and standards early. No, if you are still too early for process change to matter.",
  },
];

export function FAQSection() {
  return (
    <Section>
      <SectionLabel>FAQ</SectionLabel>

      <div className="space-y-0 divide-y divide-[var(--border)]">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </Section>
  );
}
