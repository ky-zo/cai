"use client";

import {
  type MotionValue,
  animate as motionAnimate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

// ── Item data ──────────────────────────────────────────
type ToolItem = { name: string; icon: React.ReactNode };

const ROWS: ToolItem[][] = [
  [
    {
      name: "Claude Code",
      icon: (
        <svg width="14" height="14" viewBox="0 0 512 512" fill="none">
          <path
            d="M121.525 328.847L208.274 280.096L209.725 275.847L208.274 273.499H204.031L189.517 272.604L139.947 271.263L96.9633 269.474L55.3195 267.237L44.8248 265.001L35 252.031L36.0048 245.545L44.8248 239.619L57.4408 240.737L85.3522 242.638L127.219 245.545L157.587 247.334L202.58 252.031H209.725L210.73 249.123L208.274 247.334L206.376 245.545L163.057 216.138L116.166 185.054L91.6043 167.164L78.3185 158.107L71.6197 149.609L68.717 131.048L80.7747 117.742L96.9633 118.86L101.094 119.979L117.506 132.613L152.563 159.784L198.337 193.552L205.036 199.143L207.716 197.242L208.051 195.9L205.036 190.868L180.139 145.807L153.568 99.9638L141.733 80.9555L138.607 69.5505C137.491 64.8543 136.709 60.9408 136.709 56.1328L150.442 37.4599L158.033 35L176.343 37.4599L184.047 44.1687L195.435 70.2214L213.856 111.257L242.437 167.052L250.811 183.601L255.277 198.919L256.951 203.615H259.854V200.932L262.199 169.512L266.553 130.936L270.795 81.2909L272.247 67.3142L279.169 50.5421L292.901 41.4852L303.619 46.6286L312.439 59.2636L311.211 67.426L305.964 101.529L295.692 154.976L288.994 190.757H292.901L297.367 186.284L315.454 162.244L345.821 124.227L359.219 109.133L374.849 92.4723L384.897 84.5335H403.877L417.833 105.331L411.58 126.799L392.043 151.622L375.854 172.643L352.632 203.951L338.118 228.997L339.457 231.01L342.918 230.674L395.392 219.493L423.75 214.349L457.578 208.535L472.874 215.691L474.549 222.959L468.52 237.83L432.347 246.775L389.921 255.273L326.73 270.256L325.948 270.815L326.842 271.933L355.311 274.617L367.481 275.288H397.29L452.778 279.425L467.292 289.041L476 300.781L474.549 309.727L452.219 321.132L422.075 313.975L351.738 297.203L327.623 291.165H324.274V293.178L344.37 312.857L381.213 346.178L427.323 389.114L429.667 399.737L423.75 408.123L417.498 407.228L376.97 376.703L361.34 362.95L325.948 333.096H323.604V336.226L331.754 348.19L374.849 413.042L377.082 432.945L373.956 439.431L362.791 443.344L350.51 441.108L325.278 405.663L299.265 365.745L278.276 329.965L275.708 331.418L263.315 465.036L257.51 471.857L244.112 477L232.948 468.502L227.03 454.749L232.948 427.578L240.093 392.133L245.898 363.956L251.146 328.959L254.272 317.33L254.049 316.547L251.481 316.883L225.132 353.11L185.052 407.34L153.344 441.331L145.752 444.35L132.578 437.53L133.806 425.342L141.175 414.496L185.052 358.589L211.512 323.927L228.593 303.912L228.482 301.005H227.477L110.919 376.815L90.1529 379.498L81.2213 371.112L82.3377 357.359L86.5802 352.887L121.637 328.735L121.525 328.847Z"
            fill="#D97757"
          />
        </svg>
      ),
    },
    {
      name: "Codex",
      icon: (
        <svg width="14" height="14" viewBox="0 0 512 512" fill="none">
          <g clipPath="url(#oa-cl)">
            <path
              d="M439.173 216.769C448.876 187.692 445.534 155.84 430.018 129.392C406.682 88.826 359.771 67.956 313.956 77.777C293.575 54.852 264.292 41.815 233.593 42.002C186.762 41.895 145.211 72 130.803 116.488C100.719 122.64 74.751 141.442 59.555 168.09C36.046 208.549 41.405 259.55 72.813 294.244C63.11 323.321 66.451 355.173 81.968 381.621C105.303 422.187 152.214 443.057 198.029 433.236C218.397 456.161 247.693 469.198 278.392 468.998C325.25 469.118 366.815 438.987 381.222 394.458C411.307 388.306 437.275 369.505 452.471 342.857C475.953 302.397 470.58 251.437 439.186 216.742L439.173 216.769Z"
              fill="currentColor"
            />
            <path
              d="M278.419 441.095C259.668 441.122 241.505 434.57 227.111 422.574L229.637 421.146L314.798 372.04C319.155 369.571 321.828 364.941 321.802 359.937V240.067L357.793 260.817C358.181 261.004 358.435 261.378 358.488 261.805V361.071C358.435 405.213 322.63 441.002 278.419 441.095Z"
              fill="var(--background)"
            />
            <path
              d="M106.225 367.663C96.83 351.463 93.448 332.475 96.669 314.047L99.195 315.555L184.357 364.661C188.673 367.183 194.019 367.183 198.35 364.661L302.316 304.719V346.219C302.342 346.646 302.142 347.06 301.808 347.327L215.724 396.953C177.38 418.998 128.411 405.894 106.238 367.663Z"
              fill="var(--background)"
            />
            <path
              d="M83.812 182.061C93.168 165.835 107.936 153.425 125.524 146.98V149.915V248.141C125.457 253.131 128.13 257.762 132.474 260.23L236.44 320.158L200.448 340.908C200.087 341.149 199.633 341.189 199.232 341.015L113.135 291.349C74.871 269.224 61.747 220.345 83.799 182.074Z"
              fill="var(--background)"
            />
            <path
              d="M379.525 250.769L275.559 190.828L311.551 170.091C311.912 169.851 312.366 169.811 312.767 169.985L398.864 219.611C437.195 241.722 450.332 290.681 428.187 328.952C418.818 345.152 404.063 357.562 386.488 364.02V262.859C386.528 257.868 383.868 253.251 379.538 250.769Z"
              fill="var(--background)"
            />
            <path
              d="M415.343 196.94L412.817 195.432L327.656 146.326C323.339 143.804 317.993 143.804 313.662 146.326L209.696 206.267V164.767C209.67 164.34 209.87 163.926 210.204 163.66L296.288 114.073C334.632 91.989 383.655 105.133 405.76 143.43C415.102 159.603 418.484 178.538 415.316 196.94Z"
              fill="var(--background)"
            />
            <path
              d="M190.13 270.906L154.125 250.156C153.737 249.969 153.484 249.595 153.43 249.168V149.902C153.457 105.706 189.368 69.891 233.633 69.918C252.357 69.918 270.48 76.483 284.874 88.439L282.348 89.867L197.187 138.973C192.83 141.442 190.157 146.059 190.184 151.063L190.13 270.879Z"
              fill="var(--background)"
            />
            <path
              d="M209.683 228.818L255.993 202.117L302.302 228.805V282.195L255.993 308.883L209.683 282.195V228.818Z"
              fill="var(--background)"
            />
          </g>
          <defs>
            <clipPath id="oa-cl">
              <rect width="512" height="512" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Cursor",
      icon: (
        <svg width="14" height="14" viewBox="0 0 466.73 533.32" fill="none">
          <path
            d="M233.37,266.66l231.16,133.46c-1.42,2.46-3.48,4.56-6.03,6.03l-216.06,124.74c-5.61,3.24-12.53,3.24-18.14,0L8.24,406.15c-2.55-1.47-4.61-3.57-6.03-6.03l231.16-133.46h0Z"
            fill="#72716d"
          />
          <path
            d="M233.37,0v266.66L2.21,400.12c-1.42-2.46-2.21-5.3-2.21-8.24v-250.44c0-5.89,3.14-11.32,8.24-14.27L224.29,2.43c2.81-1.62,5.94-2.43,9.07-2.43h.01Z"
            fill="#55544f"
          />
          <path
            d="M464.52,133.2c-1.42-2.46-3.48-4.56-6.03-6.03L242.43,2.43c-2.8-1.62-5.93-2.43-9.06-2.43v266.66l231.16,133.46c1.42-2.46,2.21-5.3,2.21-8.24v-250.44c0-2.95-.78-5.77-2.21-8.24h-.01Z"
            fill="#43413c"
          />
          <path
            d="M448.35,142.54c1.31,2.26,1.49,5.16,0,7.74l-209.83,363.42c-1.41,2.46-5.16,1.45-5.16-1.38v-239.48c0-1.91-.51-3.75-1.44-5.36l216.42-124.95h.01Z"
            fill="#d6d5d2"
          />
          <path
            d="M448.35,142.54l-216.42,124.95c-.92-1.6-2.26-2.96-3.92-3.92L20.62,143.83c-2.46-1.41-1.45-5.16,1.38-5.16h419.65c2.98,0,5.4,1.61,6.7,3.87Z"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      name: "OpenCode",
      icon: (
        <svg width="14" height="14" viewBox="0 0 240 300" fill="none">
          <path d="M180 240H60V120H180V240Z" fill="#CFCECD" />
          <path
            d="M180 60H60V240H180V60ZM240 300H0V0H240V300Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ],
  [
    {
      name: "Skills",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      name: "MCPs",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
    },
    {
      name: "Workflows",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h6v6H3zM15 3h6v6h-6zM9 15h6v6H9z" />
          <path d="M6 9v3h3M18 9v3h-3M12 9v6" />
        </svg>
      ),
    },
    {
      name: "Ralph Loop",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 2l4 4-4 4" />
          <path d="M3 11v-1a4 4 0 014-4h14" />
          <path d="M7 22l-4-4 4-4" />
          <path d="M21 13v1a4 4 0 01-4 4H3" />
        </svg>
      ),
    },
  ],
  [
    {
      name: "OpenClaw",
      icon: (
        <svg width="14" height="14" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 10C30 10 15 35 15 55C15 75 30 95 45 100L45 110L55 110L55 100C55 100 60 102 65 100L65 110L75 110L75 100C90 95 105 75 105 55C105 35 90 10 60 10Z"
            fill="#E8553A"
          />
          <path
            d="M20 45C5 40 0 50 5 60C10 70 20 65 25 55C28 48 25 45 20 45Z"
            fill="#E8553A"
          />
          <path
            d="M100 45C115 40 120 50 115 60C110 70 100 65 95 55C92 48 95 45 100 45Z"
            fill="#E8553A"
          />
          <circle cx="45" cy="35" r="6" fill="#050810" />
          <circle cx="75" cy="35" r="6" fill="#050810" />
          <circle cx="46" cy="34" r="2" fill="#00e5cc" />
          <circle cx="76" cy="34" r="2" fill="#00e5cc" />
        </svg>
      ),
    },
    {
      name: "Orchestrators",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <circle cx="19" cy="19" r="3" />
          <path d="M12 8v4M8.5 16.5L10 14M15.5 16.5L14 14" />
        </svg>
      ),
    },
    {
      name: "Background Agents",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      ),
    },
  ],
];

const TOTAL = ROWS.flat().length;

function getThreshold(index: number) {
  return (index + 1) / (TOTAL + 1);
}

// ── Animated Check Mark ────────────────────────────────
function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <motion.rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        fill="oklch(0.5 0.18 145)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.path
        d="M7 12.5l3.5 3.5L17 8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
      />
    </svg>
  );
}

// ── Tag with crossfade animation ───────────────────────
function Tag({ item, checked }: { item: ToolItem; checked: boolean }) {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium"
      animate={{
        borderColor: checked ? "oklch(0.78 0.1 145)" : "var(--border)",
        boxShadow: checked
          ? "0 0 8px oklch(0.6 0.17 145 / 0.12)"
          : "0 0 0px oklch(0.6 0.17 145 / 0)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            checked
              ? {
                  opacity: [1, 0.4, 0],
                  scale: [1, 0.85, 0.7],
                  filter: ["blur(0px)", "blur(3px)", "blur(5px)"],
                }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.28, ease: "easeIn" }}
        >
          {item.icon}
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={
            checked
              ? {
                  opacity: [0, 0.6, 1],
                  scale: [1.4, 1.05, 1],
                  filter: ["blur(6px)", "blur(2px)", "blur(0px)"],
                }
              : { opacity: 0, scale: 1.4, filter: "blur(6px)" }
          }
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
            delay: checked ? 0.06 : 0,
          }}
        >
          {checked && <CheckMark />}
        </motion.span>
      </span>
      <span
        className="transition-colors duration-300"
        style={{
          color: checked ? "oklch(0.35 0.06 145)" : "var(--foreground)",
        }}
      >
        {item.name}
      </span>
    </motion.span>
  );
}

// ── Curve math ─────────────────────────────────────────
const CURVE_K = 4;
const CURVE_W = 1000;
const CURVE_H = 270;
const CURVE_AMP = 0.9;

function expCurve(frac: number) {
  return (Math.exp(CURVE_K * frac) - 1) / (Math.exp(CURVE_K) - 1);
}

function curveY(frac: number) {
  const norm = expCurve(frac);
  const wiggle = Math.sin(frac * 14) * 3 * (1 - norm);
  return CURVE_H - CURVE_H * CURVE_AMP * norm + wiggle;
}

// Pre-compute the full exponential path (never changes)
const CURVE_LINE = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const f = i / 80;
    pts.push(
      `${i === 0 ? "M" : "L"}${(f * CURVE_W).toFixed(1)},${curveY(f).toFixed(1)}`,
    );
  }
  return pts.join(" ");
})();

const CURVE_AREA = (() => {
  const pts: string[] = [`M0,${CURVE_H}`];
  for (let i = 0; i <= 80; i++) {
    const f = i / 80;
    pts.push(`L${(f * CURVE_W).toFixed(1)},${curveY(f).toFixed(1)}`);
  }
  pts.push(`L${CURVE_W},${CURVE_H} Z`);
  return pts.join(" ");
})();

// Milestones — appear when each row completes
const MILESTONES = [
  { at: ROWS[0].length, label: "ai coding" },
  { at: ROWS[0].length + ROWS[1].length, label: "background agents" },
  { at: TOTAL, label: "full orchestration" },
];

// ── Background growth curve ────────────────────────────
// The full exponential curve is always rendered, but a scaleX transform
// "zooms in" initially (showing only the flat start stretched to 100%).
// Each check zooms out — compressing earlier parts leftward and revealing
// the next steeper segment on the right. Like zooming out on a graph.
// ── Background growth curve ────────────────────────────
function GrowthCurve({ scaleXMV }: { scaleXMV: MotionValue<number> }) {
  const id = useId();

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${CURVE_W} ${CURVE_H}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={`${id}-mx`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={CURVE_W}
          y2="0"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="25%" stopColor="white" stopOpacity="0.2" />
          <stop offset="60%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width={CURVE_W} height={CURVE_H} fill={`url(#${id}-mx)`} />
        </mask>
      </defs>

      <g mask={`url(#${id}-mask)`}>
        <motion.g style={{ scaleX: scaleXMV, transformOrigin: "0px 0px" }}>
          <path d={CURVE_AREA} fill="oklch(0.6 0.17 145 / 0.1)" />
          <path
            d={CURVE_LINE}
            stroke="oklch(0.6 0.17 145 / 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
      </g>
    </svg>
  );
}

// ── Single milestone dot + label ───────────────────────
// Reads from the animated scaleX motion value so position is
// frame-synced with the curve. Dot appears at right edge when
// its row completes, then slides left as the graph compresses.
function MilestoneDot({
  frac,
  label,
  visible,
  scaleXMV,
}: {
  frac: number;
  label: string;
  visible: boolean;
  scaleXMV: MotionValue<number>;
}) {
  const left = useTransform(
    scaleXMV,
    (sx) => `${Math.min(frac * sx * 100, 100)}%`,
  );
  const top = useTransform(scaleXMV, (sx) => {
    const tDot = Math.min(frac, 1 / sx);
    return `${(curveY(tDot) / CURVE_H) * 100}%`;
  });

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ left, top, transform: "translate(-50%, -50%)" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="w-[5px] h-[5px] rounded-full"
        style={{
          backgroundColor: "oklch(0.55 0.17 145)",
          boxShadow: "0 0 6px oklch(0.6 0.17 145 / 0.4)",
        }}
      />
      <span
        className="absolute whitespace-nowrap text-[9px] font-mono tracking-wide"
        style={{
          color: "oklch(0.5 0.15 145 / 0.55)",
          top: "50%",
          transform: "translateY(-50%)",
          left: "12px",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────
export function ToolChecklist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.25"],
  });

  const [checkedCount, setCheckedCount] = useState(0);
  const scaleXMV = useMotionValue(TOTAL);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let count = 0;
    for (let i = 0; i < TOTAL; i++) {
      if (v >= getThreshold(i)) count = i + 1;
    }
    setCheckedCount(count);
  });

  useEffect(() => {
    const target = checkedCount > 0 ? TOTAL / checkedCount : TOTAL;
    motionAnimate(scaleXMV, target, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    });
  }, [checkedCount, scaleXMV]);

  let tagIndex = 0;

  return (
    <div ref={containerRef} className="relative pb-20">
      <GrowthCurve scaleXMV={scaleXMV} />

      {/* Milestone dots — derived from animated scaleX, frame-synced */}
      {MILESTONES.map((m) => (
        <MilestoneDot
          key={m.label}
          frac={m.at / TOTAL}
          label={m.label}
          visible={checkedCount >= m.at}
          scaleXMV={scaleXMV}
        />
      ))}

      {/* Tags — sit on top */}
      <div className="relative z-10 space-y-2">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex flex-wrap gap-2">
            {row.map((item) => {
              const idx = tagIndex++;
              return (
                <Tag key={item.name} item={item} checked={checkedCount > idx} />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
