"use client";

import { useCallback, useEffect, useRef } from "react";

export const CLOUD_COLS = 58;
export const CLOUD_ROWS = 28;

const COLS = CLOUD_COLS;
const ROWS = CLOUD_ROWS;

const CHAR_POOL = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=?/<>~^:.";
const LIGHT_CHARS = ".:;'`";

// -- Bezier cloud shape from SVG path --
type Pt = [number, number];

function cubicBezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return [
    u * u * u * p0[0] +
      3 * u * u * t * p1[0] +
      3 * u * t * t * p2[0] +
      t * t * t * p3[0],
    u * u * u * p0[1] +
      3 * u * u * t * p1[1] +
      3 * u * t * t * p2[1] +
      t * t * t * p3[1],
  ];
}

const CURVES: [Pt, Pt, Pt, Pt][] = [
  [
    [64.37, 71.95],
    [102.7, -33.29],
    [181.32, -1.0],
    [215.24, 31.29],
  ],
  [
    [215.24, 31.29],
    [326.61, 1.39],
    [351.75, 94.67],
    [330.2, 144.9],
  ],
  [
    [330.2, 144.9],
    [390.07, 242.97],
    [263.14, 301.57],
    [226.02, 271.67],
  ],
  [
    [226.02, 271.67],
    [176.93, 335.05],
    [97.89, 306.35],
    [75.14, 239.38],
  ],
  [
    [75.14, 239.38],
    [-37.4, 216.66],
    [-8.67, 97.07],
    [64.37, 71.95],
  ],
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
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

const SVG_W = 346;
const SVG_H = 307;

// Pre-compute masks by mapping grid cells to SVG coordinates
export const cloudMask: boolean[][] = [];
export const edgeMask: boolean[][] = [];
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
export const LEFT_EYE_BASE = { cx: 23, cy: 12, rx: 3.5, ry: 3.8 };
export const RIGHT_EYE_BASE = { cx: 37, cy: 12, rx: 3.5, ry: 3.8 };

const BLINK_RY = 0.4;

export function isInEllipse(
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
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

function getChar(
  x: number,
  y: number,
  leftEye: EyeParams,
  rightEye: EyeParams,
  tick: number,
): string {
  if (!cloudMask[y][x]) return "\u00A0"; // non-breaking space to preserve layout

  if (
    isInEllipse(x, y, leftEye.cx, leftEye.cy, leftEye.rx, leftEye.ry) ||
    isInEllipse(x, y, rightEye.cx, rightEye.cy, rightEye.rx, rightEye.ry)
  ) {
    return "\u00A0";
  }

  if (edgeMask[y][x]) return randomLightChar();

  const phase = (tick + x * 2 + y * 3) % 6;
  if (phase < 2) return randomChar();
  if (phase < 4) return randomChar().toUpperCase();
  return randomLightChar();
}

// -- Fluid repulsion physics --
const REPULSION_RADIUS = 6; // in grid cells
const REPULSION_STRENGTH = 3;
const SPRING_K = 0.025;
const DAMPING = 0.86;
const MAX_DISPLACEMENT = 10; // max pixels a char can move from origin

export function AsciiCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const charEls = useRef<(HTMLSpanElement | null)[][]>([]);
  const displacements = useRef<{ x: number; y: number; vx: number; vy: number }[][]>([]);

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
  const isGyroActive = useRef(false);

  // Mouse position in client coordinates
  const mouseClient = useRef({ x: -9999, y: -9999 });

  // Ripple waves triggered by click
  const ripples = useRef<{ cx: number; cy: number; t: number; speed: number }[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    // Store click position in pixels relative to grid
    ripples.current.push({
      cx: e.clientX - rect.left,
      cy: e.clientY - rect.top,
      t: 0,
      speed: 3, // pixels per frame the wave front expands
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseClient.current = { x: e.clientX, y: e.clientY };

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

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    const gamma = e.gamma ?? 0;
    const beta = e.beta ?? 0;
    const tiltX = Math.max(-30, Math.min(30, gamma)) / 30;
    const tiltY = Math.max(-30, Math.min(30, beta - 60)) / 30;
    const maxShift = 2.8;

    targetOffset.current = {
      x: tiltX * maxShift,
      y: tiltY * maxShift * 0.5,
    };

    bodyTarget.current = {
      x: tiltX * 6,
      y: tiltY * 3,
    };

    lastMouseMove.current = performance.now();
    isMouseActive.current = true;
    isGyroActive.current = true;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const container = containerRef.current;
    container?.addEventListener("click", handleClick);

    const DOE = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    if (typeof DOE.requestPermission === "function") {
      const requestGyro = () => {
        DOE.requestPermission!().then((state) => {
          if (state === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, {
              passive: true,
            });
          }
        });
        window.removeEventListener("touchstart", requestGyro);
      };
      window.addEventListener("touchstart", requestGyro, { once: true });
    } else if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
      container?.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleOrientation, handleClick]);

  // Build DOM and run animation
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Initialize per-character state
    for (let y = 0; y < ROWS; y++) {
      charEls.current[y] = [];
      displacements.current[y] = [];
      for (let x = 0; x < COLS; x++) {
        displacements.current[y][x] = { x: 0, y: 0, vx: 0, vy: 0 };
      }
    }

    // Create DOM: rows of spans
    for (let y = 0; y < ROWS; y++) {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.lineHeight = "1";
      for (let x = 0; x < COLS; x++) {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.style.width = "1ch";
        span.style.textAlign = "center";
        span.textContent = cloudMask[y][x] ? randomChar() : "\u00A0";
        row.appendChild(span);
        charEls.current[y][x] = span;
      }
      grid.appendChild(row);
    }

    let elapsed = 0;
    const startTime = performance.now();
    let visible = true;

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    if (containerRef.current) io.observe(containerRef.current);

    const animate = (time: number) => {
      if (!visible) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      const t = (time - startTime) / 1000;
      const dt = time - (lastCharUpdate.current || time);

      // Idle gaze
      const mouseIdleMs = time - lastMouseMove.current;
      if (
        isMouseActive.current &&
        mouseIdleMs > 2000 &&
        !isGyroActive.current
      ) {
        isMouseActive.current = false;
      }
      if (!isMouseActive.current) {
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

      // Eye follow
      const eyeEase = isMouseActive.current ? 0.3 : 0.06;
      eyeOffset.current.x +=
        (targetOffset.current.x - eyeOffset.current.x) * eyeEase;
      eyeOffset.current.y +=
        (targetOffset.current.y - eyeOffset.current.y) * eyeEase;

      // Body float
      const floatX =
        Math.sin(t * 0.4) * 8 +
        Math.sin(t * 0.9) * 4 +
        Math.sin(t * 0.15) * 6;
      const floatY =
        Math.cos(t * 0.3) * 6 +
        Math.cos(t * 0.7) * 3 +
        Math.cos(t * 0.12) * 5;
      bodyPos.current.x +=
        (bodyTarget.current.x + floatX - bodyPos.current.x) * 0.04;
      bodyPos.current.y +=
        (bodyTarget.current.y + floatY - bodyPos.current.y) * 0.04;

      // Blink
      elapsed += dt;
      if (!blinking.current && elapsed > nextBlink.current) {
        blinking.current = true;
        blinkStart.current = time;
        nextBlink.current = 5000 + Math.random() * 7000;
        elapsed = 0;
      }
      if (blinking.current && time - blinkStart.current > 120) {
        blinking.current = false;
      }

      // -- Advance ripple waves --
      const RIPPLE_WIDTH = 30; // wave band width in px
      const RIPPLE_STRENGTH = 4;
      const RIPPLE_MAX_RADIUS = 400;
      for (let i = ripples.current.length - 1; i >= 0; i--) {
        ripples.current[i].t += ripples.current[i].speed;
        if (ripples.current[i].t > RIPPLE_MAX_RADIUS) {
          ripples.current.splice(i, 1);
        }
      }

      // -- Physics: run every frame for smooth fluid motion --
      const gridRect = grid.getBoundingClientRect();
      const cellW = gridRect.width / COLS;
      const cellH = gridRect.height / ROWS;
      const mxPx = mouseClient.current.x - gridRect.left;
      const myPx = mouseClient.current.y - gridRect.top;
      const radiusPx = REPULSION_RADIUS * cellW;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!cloudMask[y][x]) continue;

          const d = displacements.current[y][x];
          const cxPx = (x + 0.5) * cellW;
          const cyPx = (y + 0.5) * cellH;
          // Use current displaced position, not original
          const curX = cxPx + d.x;
          const curY = cyPx + d.y;
          const dx = curX - mxPx;
          const dy = curY - myPx;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Repulsion force
          if (dist < radiusPx && dist > 1) {
            const falloff = 1 - dist / radiusPx;
            const force = REPULSION_STRENGTH * falloff * falloff;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }

          // Ripple wave forces
          for (const ripple of ripples.current) {
            const rdx = cxPx - ripple.cx;
            const rdy = cyPx - ripple.cy;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
            // Character is near the expanding wave front
            const waveFront = ripple.t;
            const distFromFront = Math.abs(rDist - waveFront);
            if (distFromFront < RIPPLE_WIDTH && rDist > 1) {
              // Sine-shaped pulse: peaks at wavefront, fades at edges
              const envelope = Math.cos((distFromFront / RIPPLE_WIDTH) * Math.PI * 0.5);
              // Fade out as wave expands
              const decay = 1 - ripple.t / RIPPLE_MAX_RADIUS;
              const force = RIPPLE_STRENGTH * envelope * decay * decay;
              d.vx += (rdx / rDist) * force;
              d.vy += (rdy / rDist) * force;
            }
          }

          // Spring back to origin
          d.vx -= d.x * SPRING_K;
          d.vy -= d.y * SPRING_K;

          // Damping
          d.vx *= DAMPING;
          d.vy *= DAMPING;

          // Integrate
          d.x += d.vx;
          d.y += d.vy;

          // Clamp displacement
          const mag = Math.sqrt(d.x * d.x + d.y * d.y);
          if (mag > MAX_DISPLACEMENT) {
            d.x = (d.x / mag) * MAX_DISPLACEMENT;
            d.y = (d.y / mag) * MAX_DISPLACEMENT;
          }

          // Apply transform
          const span = charEls.current[y]?.[x];
          if (span) {
            if (Math.abs(d.x) > 0.1 || Math.abs(d.y) > 0.1) {
              span.style.transform = `translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px)`;
            } else {
              span.style.transform = "";
            }
          }
        }
      }

      // -- Character content update ~24fps --
      if (time - lastCharUpdate.current > 42) {
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

        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const span = charEls.current[y]?.[x];
            if (span) {
              span.textContent = getChar(x, y, leftEye, rightEye, tick.current);
            }
          }
        }

        // Body float transform on the grid container
        grid.style.transform = `translate(${bodyPos.current.x.toFixed(1)}px, ${bodyPos.current.y.toFixed(1)}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId.current);
      io.disconnect();
      // Clean up DOM
      while (grid.firstChild) grid.removeChild(grid.firstChild);
    };
  }, []);

  return (
    <div ref={containerRef} className="select-none" aria-hidden="true">
      <div
        ref={gridRef}
        className="font-mono text-[0.45rem] leading-none sm:text-[0.55rem] md:text-[0.65rem] tracking-tight will-change-transform"
        style={{
          color: "var(--muted)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
