"use client";

import { useEffect, useRef, useState } from "react";

const PEN_UNDERLINE_COMPLETE_MS = 1150;

export function PenUnderline({
  children,
  onAnimationComplete,
  onAnimationReset,
  punctuation = "question",
}: {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
  onAnimationReset?: () => void;
  punctuation?: "question" | "exclamation";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -40% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) {
      onAnimationReset?.();
      return;
    }

    const timeout = window.setTimeout(() => {
      onAnimationComplete?.();
    }, PEN_UNDERLINE_COMPLETE_MS);

    return () => window.clearTimeout(timeout);
  }, [onAnimationComplete, onAnimationReset, visible]);

  return (
    <span ref={ref} className="relative inline">
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full overflow-visible"
        height="6"
        viewBox="0 0 200 6"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4.5C20 2.5 40 4 60 3.5C80 3 100 4.5 120 3C140 1.5 160 4 180 3.5C190 3.2 198 3 199 3.5"
          stroke="oklch(0.6 0.2 25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={visible ? "animate-pen-draw" : ""}
          style={{
            strokeDasharray: 250,
            strokeDashoffset: visible ? 0 : 250,
          }}
        />
      </svg>
      {punctuation === "question" ? (
        <svg
          className="inline-block ml-0.5 overflow-visible align-baseline"
          width="0.55em"
          height="1em"
          viewBox="0 0 14 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 7C2 4 4.5 1.5 7.5 1.5C10.5 1.5 12.5 3.5 12.5 6C12.5 8.5 10.5 9.5 8.5 10.5C7.5 11 7 12 7 13.5"
            stroke="oklch(0.6 0.2 25)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: 40,
              strokeDashoffset: visible ? 0 : 40,
              transition: "stroke-dashoffset 0.4s ease-out 0.7s",
            }}
          />
          <circle
            cx="7"
            cy="19"
            r="1.5"
            fill="oklch(0.6 0.2 25)"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.2s ease-out 1.1s",
            }}
          />
        </svg>
      ) : (
        <svg
          className="inline-block ml-0.5 overflow-visible align-baseline"
          width="0.35em"
          height="1em"
          viewBox="0 0 8 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 2V15"
            stroke="oklch(0.6 0.2 25)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: 16,
              strokeDashoffset: visible ? 0 : 16,
              transition: "stroke-dashoffset 0.4s ease-out 0.7s",
            }}
          />
          <circle
            cx="4"
            cy="20"
            r="1.5"
            fill="oklch(0.6 0.2 25)"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.2s ease-out 1.1s",
            }}
          />
        </svg>
      )}
    </span>
  );
}
