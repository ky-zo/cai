"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 58;
const ROWS = 28;

const CHAR_POOL = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=?/<>~^:.";
const LIGHT_CHARS = ".:;'`";

// -- Bezier cloud shape from SVG path --
type Pt = [number, number];

function cubicBezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

const CURVES: [Pt, Pt, Pt, Pt][] = [
  [[64.37, 71.95], [102.7, -33.29], [181.32, -1.0], [215.24, 31.29]],
  [[215.24, 31.29], [326.61, 1.39], [351.75, 94.67], [330.2, 144.9]],
  [[330.2, 144.9], [390.07, 242.97], [263.14, 301.57], [226.02, 271.67]],
  [[226.02, 271.67], [176.93, 335.05], [97.89, 306.35], [75.14, 239.38]],
  [[75.14, 239.38], [-37.4, 216.66], [-8.67, 97.07], [64.37, 71.95]],
];

const SEGS = 24;
const polygon: Pt[] = [];
for (const [p0, p1, p2, p3] of CURVES) {
  for (let i = 0; i < SEGS; i++) {
    polygon.push(cubicBezier(p0, p1, p2, p3, i / SEGS));
  }
}

function isInShape(px: number, py: number): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (
      yi > py !== yj > py &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    ) {
      inside = !inside;
    }
  }
  return inside;
}

const SVG_W = 346;
const SVG_H = 307;

// Pre-compute masks by mapping grid cells to SVG coordinates
const cloudMask: boolean[][] = [];
const edgeMask: boolean[][] = [];
for (let y = 0; y < ROWS; y++) {
  cloudMask[y] = [];
  edgeMask[y] = [];
  for (let x = 0; x < COLS; x++) {
    const sx = ((x + 0.5) * SVG_W) / COLS;
    const sy = ((y + 0.5) * SVG_H) / ROWS;
    cloudMask[y][x] = isInShape(sx, sy);
  }
}
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x++) {
    if (!cloudMask[y][x]) {
      edgeMask[y][x] = false;
      continue;
    }
    edgeMask[y][x] =
      !cloudMask[y - 1]?.[x] ||
      !cloudMask[y + 1]?.[x] ||
      !cloudMask[y]?.[x - 1] ||
      !cloudMask[y]?.[x + 1];
  }
}

// Eyes positioned in SVG space, mapped to grid
// SVG center ~(173, 153), eyes slightly above center
const LEFT_EYE_BASE = { cx: 23, cy: 12, rx: 3.5, ry: 3.8 };
const RIGHT_EYE_BASE = { cx: 37, cy: 12, rx: 3.5, ry: 3.8 };

const BLINK_RY = 0.4;

function isInEllipse(
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number
): boolean {
  const dx = x - cx;
  const dy = y - cy;
  return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
}

function randomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function randomLightChar(): string {
  return LIGHT_CHARS[Math.floor(Math.random() * LIGHT_CHARS.length)];
}

interface EyeParams {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

function buildGrid(
  leftEye: EyeParams,
  rightEye: EyeParams,
  tick: number
): string {
  const lines: string[] = [];

  for (let y = 0; y < ROWS; y++) {
    let line = "";
    for (let x = 0; x < COLS; x++) {
      if (!cloudMask[y][x]) {
        line += " ";
        continue;
      }

      if (
        isInEllipse(x, y, leftEye.cx, leftEye.cy, leftEye.rx, leftEye.ry) ||
        isInEllipse(x, y, rightEye.cx, rightEye.cy, rightEye.rx, rightEye.ry)
      ) {
        line += " ";
        continue;
      }

      if (edgeMask[y][x]) {
        line += randomLightChar();
        continue;
      }

      const phase = (tick + x * 2 + y * 3) % 6;
      if (phase < 2) {
        line += randomChar();
      } else if (phase < 4) {
        line += randomChar().toUpperCase();
      } else {
        line += randomLightChar();
      }
    }
    lines.push(line);
  }

  return lines.join("\n");
}

export function AsciiCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState("");
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const eyeOffset = useRef({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const tick = useRef(0);
  const rafId = useRef<number>(0);
  const lastCharUpdate = useRef(0);
  const blinking = useRef(false);
  const nextBlink = useRef(5000 + Math.random() * 6000);
  const blinkStart = useRef(0);
  const bodyPos = useRef({ x: 0, y: 0 });
  const bodyTarget = useRef({ x: 0, y: 0 });
  const lastMouseMove = useRef(0);
  const isMouseActive = useRef(false);
  const idleGazeTarget = useRef({ x: 0, y: 0 });
  const nextGazeChange = useRef(1500 + Math.random() * 2000);
  const gazeElapsed = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxShift = 2.8;
    const norm = Math.min(distance / 250, 1);
    const dir = distance || 1;

    targetOffset.current = {
      x: (dx / dir) * maxShift * norm,
      y: (dy / dir) * maxShift * norm * 0.5,
    };

    bodyTarget.current = {
      x: (dx / dir) * 6 * norm,
      y: (dy / dir) * 3 * norm,
    };

    lastMouseMove.current = performance.now();
    isMouseActive.current = true;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    let elapsed = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const t = (time - startTime) / 1000;

      // Idle gaze
      const mouseIdleMs = time - lastMouseMove.current;
      if (isMouseActive.current && mouseIdleMs > 2000) {
        isMouseActive.current = false;
      }
      if (!isMouseActive.current) {
        const dt = time - (lastCharUpdate.current || time);
        gazeElapsed.current += dt;
        if (gazeElapsed.current > nextGazeChange.current) {
          const angle = Math.random() * Math.PI * 2;
          const strength = 0.4 + Math.random() * 0.6;
          idleGazeTarget.current = {
            x: Math.cos(angle) * 2.8 * strength,
            y: Math.sin(angle) * 1.4 * strength,
          };
          nextGazeChange.current = 2500 + Math.random() * 4000;
          gazeElapsed.current = 0;
        }
        targetOffset.current = { ...idleGazeTarget.current };
      }

      // Eye follow — snappy for mouse, smooth drift for idle gaze
      const eyeEase = isMouseActive.current ? 0.3 : 0.06;
      eyeOffset.current.x +=
        (targetOffset.current.x - eyeOffset.current.x) * eyeEase;
      eyeOffset.current.y +=
        (targetOffset.current.y - eyeOffset.current.y) * eyeEase;

      // Idle float + mouse lean
      const floatX = Math.sin(t * 0.4) * 8 + Math.sin(t * 0.9) * 4 + Math.sin(t * 0.15) * 6;
      const floatY = Math.cos(t * 0.3) * 6 + Math.cos(t * 0.7) * 3 + Math.cos(t * 0.12) * 5;
      bodyPos.current.x +=
        (bodyTarget.current.x + floatX - bodyPos.current.x) * 0.04;
      bodyPos.current.y +=
        (bodyTarget.current.y + floatY - bodyPos.current.y) * 0.04;

      // Blink logic
      elapsed += time - (lastCharUpdate.current || time);
      if (!blinking.current && elapsed > nextBlink.current) {
        blinking.current = true;
        blinkStart.current = time;
        nextBlink.current = 5000 + Math.random() * 7000;
        elapsed = 0;
      }
      if (blinking.current && time - blinkStart.current > 120) {
        blinking.current = false;
      }

      // Refresh ~25fps
      if (time - lastCharUpdate.current > 40) {
        tick.current++;
        lastCharUpdate.current = time;

        const ox = eyeOffset.current.x;
        const oy = eyeOffset.current.y;
        const tilt = ox * 0.3;
        const bRy = blinking.current ? BLINK_RY : LEFT_EYE_BASE.ry;

        const leftEye: EyeParams = {
          cx: LEFT_EYE_BASE.cx + Math.round(ox),
          cy: LEFT_EYE_BASE.cy + Math.round(oy) - tilt,
          rx: LEFT_EYE_BASE.rx,
          ry: bRy,
        };

        const rightEye: EyeParams = {
          cx: RIGHT_EYE_BASE.cx + Math.round(ox),
          cy: RIGHT_EYE_BASE.cy + Math.round(oy) + tilt,
          rx: RIGHT_EYE_BASE.rx,
          ry: bRy,
        };

        setGrid(buildGrid(leftEye, rightEye, tick.current));
        setTranslate({ x: bodyPos.current.x, y: bodyPos.current.y });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    setGrid(buildGrid({ ...LEFT_EYE_BASE }, { ...RIGHT_EYE_BASE }, 0));
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div ref={containerRef} className="select-none" aria-hidden="true">
      <pre
        className="font-mono text-[0.45rem] leading-none sm:text-[0.55rem] md:text-[0.65rem] tracking-tight will-change-transform"
        style={{
          color: "var(--muted)",
          opacity: 0.7,
          transform: `translate(${translate.x.toFixed(1)}px, ${translate.y.toFixed(1)}px)`,
        }}
      >
        {grid}
      </pre>
    </div>
  );
}
