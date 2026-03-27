"use client";

import {
  type MotionValue,
  motion,
  animate as motionAnimate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  OpenCodeIcon,
  CursorIcon,
  CodexIcon,
  ClaudeCodeIcon,
  SkillsIcon,
  MCPsIcon,
  WorkflowsIcon,
  RalphLoopIcon,
  OpenClawIcon,
  OrchestratorsIcon,
  BackgroundAgentsIcon,
} from "./tool-icons";

// ── Item data ──────────────────────────────────────────
type ToolItem = { name: string; icon: React.ReactNode };

const ROWS: ToolItem[][] = [
  [
    { name: "OpenCode", icon: OpenCodeIcon },
    { name: "Cursor", icon: CursorIcon },
    { name: "Codex", icon: CodexIcon },
    { name: "Claude Code", icon: ClaudeCodeIcon },
  ],
  [
    { name: "Skills", icon: SkillsIcon },
    { name: "MCPs", icon: MCPsIcon },
    { name: "Workflows", icon: WorkflowsIcon },
    { name: "Ralph Loop", icon: RalphLoopIcon },
  ],
  [
    { name: "OpenClaw", icon: OpenClawIcon },
    { name: "Orchestrators", icon: OrchestratorsIcon },
    { name: "Background Agents", icon: BackgroundAgentsIcon },
  ],
];

const TOTAL = ROWS.flat().length;
// Virtual extra steps: the curve keeps growing past the last tag
const GRAPH_TOTAL = TOTAL + 3;
const EARLY_VISIBLE_FRAC_BOOST = 0.08;

function getThreshold(index: number) {
  return index / Math.max(GRAPH_TOTAL - 1, 1);
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
      className="inline-flex items-center gap-0.75 border px-2.25 py-0.75 text-[10.5px] font-medium sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
      animate={{
        borderColor: checked ? "oklch(0.78 0.1 145)" : "var(--border)",
        boxShadow: checked
          ? "0 0 8px oklch(0.6 0.17 145 / 0.12)"
          : "0 0 0px oklch(0.6 0.17 145 / 0)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative flex h-2.75 w-2.75 items-center justify-center shrink-0 sm:h-3.5 sm:w-3.5">
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
const CURVE_K = 5;
const CURVE_W = 1000;
const CURVE_H = 340;
const CURVE_AMP = 0.92;
const CURVE_SAMPLES = 80;
const MAX_ENTRY_LIFT_PX = 12;
const ENTRY_SETTLE_RANGE = 0.22;

function expCurve(frac: number) {
  return (Math.exp(CURVE_K * frac) - 1) / (Math.exp(CURVE_K) - 1);
}

function easeOutQuad(value: number) {
  return 1 - (1 - value) * (1 - value);
}

function curveY(frac: number) {
  const earlyLift = 0.065 * easeOutQuad(frac) * (1 - frac) * (1 - frac);
  const norm = clamp01(expCurve(frac) + earlyLift);
  const wiggle = Math.sin(frac * 14) * 3 * (1 - norm);
  return CURVE_H - CURVE_H * CURVE_AMP * norm + wiggle;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function visibleFracForScale(scaleX: number) {
  return clamp01(1 / Math.max(scaleX, 1));
}

function entryLift(frac: number, visibleFrac: number) {
  const stageIntensity = 1 - visibleFrac;
  const settleProgress = clamp01((visibleFrac - frac) / ENTRY_SETTLE_RANGE);
  return (
    MAX_ENTRY_LIFT_PX *
    stageIntensity *
    (1 - settleProgress) *
    (1 - settleProgress)
  );
}

// How much the visible portion of the curve should be Y-scaled so early
// stages look tall, then compress as the full exponential is revealed.
function yScaleForVisibleFrac(visibleFrac: number) {
  // Find the peak curve value within the visible range
  const peakNorm = clamp01(
    expCurve(visibleFrac) + 0.22 * easeOutQuad(visibleFrac) * (1 - visibleFrac),
  );
  if (peakNorm < 0.001) return 1;
  // Scale so peak fills full container height, clamped to [1, maxBoost]
  const desired = 1.3;
  const boost = desired / peakNorm;
  return Math.min(boost, 8);
}

function projectCurvePoint(frac: number, scaleX: number) {
  const visibleFrac = visibleFracForScale(scaleX);
  const normalizedX = visibleFrac > 0 ? clamp01(frac / visibleFrac) : 0;
  const lift = entryLift(frac, visibleFrac);

  // Raw Y from curve (0 = top, CURVE_H = bottom baseline)
  const rawY = curveY(frac);
  // Distance from baseline (how far up the curve goes)
  const distFromBase = CURVE_H - rawY;
  const yScale = yScaleForVisibleFrac(visibleFrac);
  const scaledY = CURVE_H - distFromBase * yScale;

  return {
    x: normalizedX * CURVE_W,
    y: scaledY - lift,
  };
}

function buildProjectedCurvePath(scaleX: number) {
  const visibleFrac = visibleFracForScale(scaleX);
  const pts: string[] = [];

  for (let i = 0; i <= CURVE_SAMPLES; i++) {
    const frac = (visibleFrac * i) / CURVE_SAMPLES;
    const point = projectCurvePoint(frac, scaleX);
    pts.push(
      `${i === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`,
    );
  }

  return pts.join(" ");
}

function buildProjectedAreaPath(scaleX: number) {
  const visibleFrac = visibleFracForScale(scaleX);
  const pts: string[] = [`M0,${CURVE_H}`];

  for (let i = 0; i <= CURVE_SAMPLES; i++) {
    const frac = (visibleFrac * i) / CURVE_SAMPLES;
    const point = projectCurvePoint(frac, scaleX);
    pts.push(`L${point.x.toFixed(1)},${point.y.toFixed(1)}`);
  }

  pts.push(`L${CURVE_W},${CURVE_H} Z`);
  return pts.join(" ");
}

// Milestones — appear when each row completes
const MILESTONES = [
  { at: ROWS[0].length, label: "ai coding" },
  { at: ROWS[0].length + ROWS[1].length, label: "background agents" },
  { at: TOTAL, label: "full orchestration" },
  { at: GRAPH_TOTAL, label: "autonomous company" },
];

// ── Background growth curve ────────────────────────────
// The visible curve is rebuilt from the currently revealed fraction so the
// line and milestone dots share the same stage-aware projection.
// ── Background growth curve ────────────────────────────
function GrowthCurve({ scaleXMV }: { scaleXMV: MotionValue<number> }) {
  const id = useId();
  const curveLine = useTransform(scaleXMV, (sx) => buildProjectedCurvePath(sx));
  const curveArea = useTransform(scaleXMV, (sx) => buildProjectedAreaPath(sx));

  return (
    <svg
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      style={{ height: "300%" }}
      viewBox={`0 ${-CURVE_H * 2} ${CURVE_W} ${CURVE_H * 3}`}
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
          <rect y={-CURVE_H * 2} width={CURVE_W} height={CURVE_H * 3} fill={`url(#${id}-mx)`} />
        </mask>
      </defs>

      <g mask={`url(#${id}-mask)`}>
        <motion.path d={curveArea} fill="oklch(0.6 0.17 145 / 0.1)" />
        <motion.path
          d={curveLine}
          stroke="oklch(0.6 0.17 145 / 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
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
  const left = useTransform(scaleXMV, (sx) => {
    const point = projectCurvePoint(frac, sx);
    return `${(point.x / CURVE_W) * 100}%`;
  });
  const top = useTransform(scaleXMV, (sx) => {
    const point = projectCurvePoint(frac, sx);
    return `${(point.y / CURVE_H) * 100}%`;
  });
  const isTopMilestone =
    label === "full orchestration" || label === "autonomous company";

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
        className={`absolute whitespace-nowrap text-[9px] font-mono tracking-wide ${
          isTopMilestone
            ? "right-[20px] text-right sm:left-[12px] sm:right-auto sm:text-left"
            : ""
        }`}
        style={{
          color: "oklch(0.5 0.15 145 / 0.55)",
          top: "50%",
          transform: "translateY(-50%)",
          left: isTopMilestone ? undefined : "12px",
          right: isTopMilestone ? "20px" : undefined,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────
function countChecks(progress: number) {
  let count = 0;

  for (let i = 0; i < GRAPH_TOTAL; i++) {
    if (progress >= getThreshold(i)) count = i + 1;
  }

  return count;
}

function visibleFracForCheckedCount(checkedCount: number) {
  if (checkedCount <= 0) {
    return 1 / GRAPH_TOTAL;
  }

  const progress = checkedCount / GRAPH_TOTAL;
  const earlyBoost =
    EARLY_VISIBLE_FRAC_BOOST * easeOutQuad(progress) * (1 - progress);
  return clamp01(progress + earlyBoost);
}

function updateCheckedCount(
  progress: number,
  setCheckedCount: Dispatch<SetStateAction<number>>,
) {
  const nextCount = countChecks(progress);
  setCheckedCount((current) => (current === nextCount ? current : nextCount));
}

export function ToolChecklist({
  endTargetId,
}: {
  endTargetId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollBoundsRef = useRef({ start: 0, end: 1 });
  const { scrollY } = useScroll();

  const [checkedCount, setCheckedCount] = useState(0);
  const scaleXMV = useMotionValue(GRAPH_TOTAL);

  useEffect(() => {
    function updateBounds() {
      const graphEl = containerRef.current;
      const endTargetEl = endTargetId
        ? document.getElementById(endTargetId)
        : graphEl?.closest("section");

      if (!(graphEl instanceof HTMLDivElement) || !(endTargetEl instanceof HTMLElement)) {
        return;
      }

      const graphRect = graphEl.getBoundingClientRect();
      const endTargetRect = endTargetEl.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const start = graphRect.bottom + scrollTop - window.innerHeight + 80;
      const end = endTargetRect.top + scrollTop - window.innerHeight * 0.15;

      scrollBoundsRef.current = {
        start,
        end: Math.max(end, start + 1),
      };

      const progress =
        (scrollY.get() - scrollBoundsRef.current.start) /
        (scrollBoundsRef.current.end - scrollBoundsRef.current.start);

      updateCheckedCount(progress, setCheckedCount);
    }

    updateBounds();

    const graphEl = containerRef.current;
    const endTargetEl = endTargetId
      ? document.getElementById(endTargetId)
      : graphEl?.closest("section");

    if (!(graphEl instanceof HTMLDivElement) || !(endTargetEl instanceof HTMLElement)) {
      return;
    }

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(graphEl);
    resizeObserver.observe(endTargetEl);
    window.addEventListener("resize", updateBounds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [endTargetId, scrollY]);

  useMotionValueEvent(scrollY, "change", (value) => {
    const { start, end } = scrollBoundsRef.current;
    const progress = (value - start) / (end - start);
    updateCheckedCount(progress, setCheckedCount);
  });

  useEffect(() => {
    const target = 1 / visibleFracForCheckedCount(checkedCount);
    motionAnimate(scaleXMV, target, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    });
  }, [checkedCount, scaleXMV]);

  let tagIndex = 0;

  return (
    <div ref={containerRef} className="relative pb-20 overflow-visible">
      <GrowthCurve scaleXMV={scaleXMV} />

      {/* Milestone dots — derived from animated scaleX, frame-synced */}
      {MILESTONES.map((m) => (
        <MilestoneDot
          key={m.label}
          frac={m.at / GRAPH_TOTAL}
          label={m.label}
          visible={checkedCount >= m.at}
          scaleXMV={scaleXMV}
        />
      ))}

      {/* Tags — sit on top */}
      <div className="relative z-10 space-y-1 sm:space-y-2">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex flex-wrap gap-1 sm:gap-2">
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
