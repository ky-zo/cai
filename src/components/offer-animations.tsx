"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Shared types
interface Particle {
  x: number;
  y: number;
  progress: number;
  speed: number;
  size: number;
  opacity: number;
}

// Shared constants
const GREEN_RGB = [58, 163, 82] as const;
const BLUE_RGB = [70, 120, 220] as const;
const PURPLE_RGB = [150, 80, 200] as const;
const MUTED_RGB = [160, 155, 148] as const;
const NODE_RADIUS = 8;
const NODE_RING_RADIUS = 14;
const SMALL_NODE_RADIUS = 4;
const SMALL_NODE_RING_RADIUS = 8;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dpr: number,
  color: readonly [number, number, number] = GREEN_RGB,
  scale = 1,
  glowIntensity = 0,
) {
  const r = lerp(SMALL_NODE_RADIUS, NODE_RADIUS, scale) * dpr;
  const rr = lerp(SMALL_NODE_RING_RADIUS, NODE_RING_RADIUS, scale) * dpr;

  // Glow
  if (glowIntensity > 0) {
    ctx.beginPath();
    ctx.arc(x, y, rr + 6 * dpr * glowIntensity, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.08 * glowIntensity})`;
    ctx.fill();
  }

  // Outer ring
  ctx.beginPath();
  ctx.arc(x, y, rr, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.15 + 0.1 * glowIntensity})`;
  ctx.lineWidth = 1.5 * dpr;
  ctx.stroke();

  // Inner dot
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.55 + 0.25 * scale})`;
  ctx.fill();
}

function drawDottedLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  dpr: number,
) {
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const dotSpacing = 6 * dpr;
  const dots = Math.floor(dist / dotSpacing);
  for (let i = 0; i <= dots; i++) {
    const t = i / dots;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    ctx.beginPath();
    ctx.arc(x, y, 1 * dpr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${MUTED_RGB[0]}, ${MUTED_RGB[1]}, ${MUTED_RGB[2]}, 0.25)`;
    ctx.fill();
  }
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
  dpr: number,
  color: readonly [number, number, number] = GREEN_RGB,
) {
  const s = size * dpr;
  ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
  const r = s * 0.3;
  ctx.beginPath();
  ctx.roundRect(x - s / 2, y - s / 2, s, s, r);
  ctx.fill();
}

// Mouse displacement — subtle water-like repulsion
interface Vec2 {
  x: number;
  y: number;
}

function getDisplacement(
  px: number,
  py: number,
  mouse: Vec2 | null,
  dpr: number,
  strength = 4,
  radius = 80,
): Vec2 {
  if (!mouse) return { x: 0, y: 0 };
  const mx = mouse.x * dpr;
  const my = mouse.y * dpr;
  const dx = px - mx;
  const dy = py - my;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const r = radius * dpr;
  if (dist > r || dist < 0.1) return { x: 0, y: 0 };
  // Gentle cubic falloff for smooth, water-like feel
  const t = 1 - dist / r;
  const force = t * t * t * strength * dpr;
  return { x: (dx / dist) * force, y: (dy / dist) * force };
}

// Smooth hover transition helper
function useHoverTransition(duration = 300) {
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const transitionRef = useRef(0); // 0..1
  const lastFrameRef = useRef(0);
  const mouseRawRef = useRef<Vec2 | null>(null);
  const mousePosRef = useRef<Vec2 | null>(null);

  hoveredRef.current = hovered;

  const updateTransition = useCallback(
    (now: number) => {
      if (lastFrameRef.current === 0) lastFrameRef.current = now;
      const dt = now - lastFrameRef.current;
      lastFrameRef.current = now;
      const step = dt / duration;
      if (hoveredRef.current) {
        transitionRef.current = Math.min(1, transitionRef.current + step);
      } else {
        transitionRef.current = Math.max(0, transitionRef.current - step);
      }
      // Smooth mouse position with slow lerp for gentle, laggy feel
      const raw = mouseRawRef.current;
      const smooth = mousePosRef.current;
      const lerpFactor = Math.min(1, dt * 0.004); // very slow tracking
      if (raw && smooth) {
        smooth.x += (raw.x - smooth.x) * lerpFactor;
        smooth.y += (raw.y - smooth.y) * lerpFactor;
      } else if (raw && !smooth) {
        mousePosRef.current = { x: raw.x, y: raw.y };
      } else if (!raw && smooth) {
        // Fade out smoothly — once raw is null, let smooth drift to null
        // We just set it null; the displacement function handles null
        mousePosRef.current = null;
      }
      return transitionRef.current;
    },
    [duration],
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRawRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!mousePosRef.current) {
      mousePosRef.current = { x: mouseRawRef.current.x, y: mouseRawRef.current.y };
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRawRef.current = null;
    mousePosRef.current = null;
    setHovered(false);
  }, [setHovered]);

  return { hovered, setHovered, hoveredRef, updateTransition, transitionRef, mousePosRef, onMouseMove, onMouseLeave };
}

// ─────────────────────────────────────────────
// Offer 1: Acceleration — slow flow, hover = fast
// ─────────────────────────────────────────────
export function AccelerateAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setHovered, hoveredRef, updateTransition, mousePosRef, onMouseMove, onMouseLeave } = useHoverTransition(400);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const animRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;
    const now = performance.now();
    ctx.clearRect(0, 0, w, h);

    const t = updateTransition(now);
    const pulse = Math.sin(now / 400) * 0.3 + 0.7; // 0.4..1.0

    const padding = 24 * dpr;
    const nodeAx = padding + NODE_RING_RADIUS * dpr;
    const nodeBx = w - padding - NODE_RING_RADIUS * dpr;
    const cy = h / 2;

    // Mouse displacement
    const mouse = mousePosRef.current;

    // Start node — grey, small→big on hover with pulse
    const startScale = lerp(0.3, 1, t);
    const startGlow = t * pulse;
    const dA = getDisplacement(nodeAx, cy, mouse, dpr);
    drawNode(ctx, nodeAx + dA.x, cy + dA.y, dpr, MUTED_RGB, startScale, startGlow);

    // End node — green, small→big on hover with pulse
    const endScale = lerp(0.3, 1, t);
    const endGlow = t * pulse;
    const dB = getDisplacement(nodeBx, cy, mouse, dpr);
    drawNode(ctx, nodeBx + dB.x, cy + dB.y, dpr, GREEN_RGB, endScale, endGlow);

    // Spawn particles
    const spawnInterval = lerp(1800, 120, t);
    if (now - lastSpawnRef.current > spawnInterval) {
      lastSpawnRef.current = now;
      particlesRef.current.push({
        x: 0,
        y: 0,
        progress: 0,
        speed: 0.003 + Math.random() * 0.002,
        size: 4 + Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.3,
      });
    }

    // Update & draw particles
    const startX = nodeAx + NODE_RING_RADIUS * dpr + 6 * dpr;
    const endX = nodeBx - NODE_RING_RADIUS * dpr - 6 * dpr;
    const pathLen = endX - startX;
    const speedMult = lerp(1, 3.5, t);

    particlesRef.current = particlesRef.current.filter((p) => {
      p.progress += p.speed * speedMult;
      if (p.progress > 1) return false;

      p.x = startX + pathLen * p.progress;
      p.y = cy + Math.sin(p.progress * Math.PI * 4) * 2 * dpr;

      const dp = getDisplacement(p.x, p.y, mouse, dpr, 3, 60);

      let alpha = p.opacity;
      if (p.progress < 0.1) alpha *= p.progress / 0.1;
      if (p.progress > 0.85) alpha *= (1 - p.progress) / 0.15;

      drawParticle(ctx, p.x + dp.x, p.y + dp.y, p.size, alpha, dpr);
      return true;
    });

    animRef.current = requestAnimationFrame(animate);
  }, [updateTransition, mousePosRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[100px]"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}

// ─────────────────────────────────────────────
// Offer 2: Multiplier — dots in, 3x dots out on single line
// Middle node is blue
// ─────────────────────────────────────────────
interface MultiplyParticle extends Particle {
  lane: number; // -1 = input, 1 = output
}

export function MultiplyAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setHovered, hoveredRef, updateTransition, mousePosRef, onMouseMove, onMouseLeave } = useHoverTransition(400);
  const particlesRef = useRef<MultiplyParticle[]>([]);
  const lastSpawnRef = useRef(0);
  const animRef = useRef<number>(0);
  const pulseRef = useRef(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;
    const now = performance.now();
    ctx.clearRect(0, 0, w, h);

    const t = updateTransition(now);
    const pulse = Math.sin(now / 400) * 0.3 + 0.7;

    const padding = 24 * dpr;
    const nodeAx = padding + NODE_RING_RADIUS * dpr;
    const nodeBx = w / 2;
    const nodeCx = w - padding - NODE_RING_RADIUS * dpr;
    const cy = h / 2;

    // Mouse displacement
    const mouse = mousePosRef.current;

    // Start node — grey, small→big on hover
    const sideScale = lerp(0.3, 1, t);
    const sideGlow = t * pulse;
    const dA = getDisplacement(nodeAx, cy, mouse, dpr);
    drawNode(ctx, nodeAx + dA.x, cy + dA.y, dpr, MUTED_RGB, sideScale, sideGlow);

    // End node — green, small→big on hover
    const dC = getDisplacement(nodeCx, cy, mouse, dpr);
    drawNode(ctx, nodeCx + dC.x, cy + dC.y, dpr, GREEN_RGB, sideScale, sideGlow);

    // Kamil node — BLUE, always visible, soft pulse on multiply
    const pulseDecay = Math.max(0, 1 - (now - pulseRef.current) / 600);
    const eased = pulseDecay * pulseDecay * (3 - 2 * pulseDecay); // smoothstep
    const kamScale = 0.85 + eased * 0.15;
    const kamGlow = 0.15 + eased * 0.35;

    // Soft glow
    const dB = getDisplacement(nodeBx, cy, mouse, dpr);
    const bx = nodeBx + dB.x;
    const by = cy + dB.y;
    ctx.beginPath();
    ctx.arc(bx, by, (NODE_RING_RADIUS + 2 + eased * 4) * dpr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${BLUE_RGB[0]}, ${BLUE_RGB[1]}, ${BLUE_RGB[2]}, ${0.04 * kamGlow})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bx, by, (NODE_RING_RADIUS + eased * 2) * dpr, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${BLUE_RGB[0]}, ${BLUE_RGB[1]}, ${BLUE_RGB[2]}, ${0.14 + eased * 0.16})`;
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(bx, by, NODE_RADIUS * kamScale * dpr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${BLUE_RGB[0]}, ${BLUE_RGB[1]}, ${BLUE_RGB[2]}, ${0.65 + eased * 0.15})`;
    ctx.fill();

    // Spawn input particles
    const spawnInterval = lerp(2200, 200, t);
    if (now - lastSpawnRef.current > spawnInterval) {
      lastSpawnRef.current = now;
      particlesRef.current.push({
        x: 0,
        y: 0,
        progress: 0,
        speed: 0.008 + Math.random() * 0.004,
        size: 4 + Math.random() * 2,
        opacity: 0.7,
        lane: -1,
      });
    }

    const inputStartX = nodeAx + NODE_RING_RADIUS * dpr + 6 * dpr;
    const inputEndX = nodeBx - NODE_RING_RADIUS * dpr - 6 * dpr;
    const outputStartX = nodeBx + NODE_RING_RADIUS * dpr + 6 * dpr;
    const outputEndX = nodeCx - NODE_RING_RADIUS * dpr - 6 * dpr;

    const toSpawn: MultiplyParticle[] = [];
    const speedMult = lerp(1, 2.5, t);

    particlesRef.current = particlesRef.current.filter((p) => {
      p.progress += p.speed * speedMult;

      if (p.lane === -1) {
        if (p.progress > 1) {
          // Arrived at Kamil — spawn 3 output particles on single line
          pulseRef.current = now;
          for (let i = 0; i < 3; i++) {
            toSpawn.push({
              x: 0,
              y: 0,
              progress: -i * 0.12, // stagger them along the line
              speed: 0.007 + Math.random() * 0.004,
              size: 4 + Math.random() * 2,
              opacity: 0.7 + Math.random() * 0.2,
              lane: 1,
            });
          }
          return false;
        }
        const pathLen = inputEndX - inputStartX;
        p.x = inputStartX + pathLen * p.progress;
        p.y = cy;
      } else {
        if (p.progress > 1) return false;
        if (p.progress < 0) {
          // Still waiting (stagger)
          return true;
        }
        const pathLen = outputEndX - outputStartX;
        p.x = outputStartX + pathLen * p.progress;
        p.y = cy + Math.sin(p.progress * Math.PI * 3) * 1.5 * dpr;
      }

      let alpha = p.opacity;
      const prog = Math.max(0, p.progress);
      if (prog < 0.1) alpha *= prog / 0.1;
      if (p.progress > 0.85) alpha *= (1 - p.progress) / 0.15;

      if (p.progress >= 0) {
        const dp = getDisplacement(p.x, p.y, mouse, dpr, 3, 60);
        drawParticle(ctx, p.x + dp.x, p.y + dp.y, p.size, alpha, dpr);
      }
      return true;
    });

    particlesRef.current.push(...toSpawn);

    animRef.current = requestAnimationFrame(animate);
  }, [updateTransition, mousePosRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[100px]"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}

// ─────────────────────────────────────────────
// Offer 3: Pipeline — 4 gray input nodes → purple agent → production
// Hover speeds it up
// ─────────────────────────────────────────────
interface PipelineParticle extends Particle {
  stage: 0 | 1;
  sourceIdx: number; // which input node (0..3)
}

export function PipelineAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setHovered, hoveredRef, updateTransition, mousePosRef, onMouseMove, onMouseLeave } = useHoverTransition(400);
  const particlesRef = useRef<PipelineParticle[]>([]);
  const lastSpawnRef = useRef(0);
  const animRef = useRef<number>(0);
  const checkmarksRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const agentAngleRef = useRef(0);
  const spawnIdxRef = useRef(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;
    const now = performance.now();
    ctx.clearRect(0, 0, w, h);

    const t = updateTransition(now);
    const pulse = Math.sin(now / 400) * 0.3 + 0.7;

    const padding = 20 * dpr;
    // 4 input nodes on the left, purple agent in center, production on far right
    const agentX = w * 0.5;
    const prodX = w - padding - NODE_RING_RADIUS * dpr;
    const cy = h / 2;

    // 4 input node positions — arranged in a smooth arc
    const inputSpacing = 16 * dpr;
    const baseX = padding + SMALL_NODE_RING_RADIUS * dpr;
    const inputNodes = [0, 1, 2, 3].map((i) => {
      // Map i to -1.5, -0.5, 0.5, 1.5
      const t = i - 1.5;
      // Parabolic arc: nodes at edges are further left
      const arcOffset = (t * t) * 4 * dpr;
      return {
        x: baseX + arcOffset,
        y: cy + t * inputSpacing,
      };
    });

    const agentNodeR = NODE_RING_RADIUS * dpr;

    // Mouse displacement
    const mouse = mousePosRef.current;

    // Draw input nodes — grey, small, grow + pulse on hover
    const inputScale = lerp(0.3, 0.8, t);
    const inputGlow = t * pulse * 0.5;
    for (const node of inputNodes) {
      const dn = getDisplacement(node.x, node.y, mouse, dpr);
      drawNode(ctx, node.x + dn.x, node.y + dn.y, dpr, MUTED_RGB, inputScale, inputGlow);
    }

    // Agent — purple dot node in the center with orbiting dot
    const agentScale = lerp(0.5, 1, t);
    const agentGlow = t * pulse * 0.6;
    const dAgent = getDisplacement(agentX, cy, mouse, dpr);
    drawNode(ctx, agentX + dAgent.x, cy + dAgent.y, dpr, PURPLE_RGB, agentScale, agentGlow);

    // Orbiting dot around purple node
    agentAngleRef.current += 0.03;
    const orbR = (NODE_RING_RADIUS + 6) * dpr;
    const orbX = agentX + dAgent.x + Math.cos(agentAngleRef.current) * orbR;
    const orbY = cy + dAgent.y + Math.sin(agentAngleRef.current) * orbR;
    ctx.beginPath();
    ctx.arc(orbX, orbY, 2 * dpr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${PURPLE_RGB[0]}, ${PURPLE_RGB[1]}, ${PURPLE_RGB[2]}, 0.5)`;
    ctx.fill();

    // Production node — green dot
    const prodScale = lerp(0.3, 1, t);
    const prodGlow = t * pulse;
    const dProd = getDisplacement(prodX, cy, mouse, dpr);
    drawNode(ctx, prodX + dProd.x, cy + dProd.y, dpr, GREEN_RGB, prodScale, prodGlow);

    // Spawn particles — round-robin from input nodes
    const spawnInterval = lerp(1600, 140, t);
    if (now - lastSpawnRef.current > spawnInterval) {
      lastSpawnRef.current = now;
      const idx = spawnIdxRef.current % 4;
      spawnIdxRef.current++;
      particlesRef.current.push({
        x: 0,
        y: 0,
        progress: 0,
        speed: 0.008 + Math.random() * 0.005,
        size: 4 + Math.random() * 2,
        opacity: 0.7,
        stage: 0,
        sourceIdx: idx,
      });
    }

    const speedMult = lerp(1, 3, t);

    const toPromote: PipelineParticle[] = [];

    particlesRef.current = particlesRef.current.filter((p) => {
      p.progress += p.speed * speedMult;

      if (p.stage === 0) {
        const src = inputNodes[p.sourceIdx];
        const sx = src.x + SMALL_NODE_RING_RADIUS * dpr + 4 * dpr;
        const sy = src.y;
        const ex = agentX - agentNodeR - 4 * dpr;
        const ey = cy;

        if (p.progress > 1) {
          toPromote.push({
            ...p,
            progress: 0,
            stage: 1,
            speed: 0.01 + Math.random() * 0.006,
          });
          return false;
        }
        p.x = sx + (ex - sx) * p.progress;
        p.y = sy + (ey - sy) * p.progress;
      } else {
        const sx = agentX + agentNodeR + 4 * dpr;
        const ex = prodX - NODE_RING_RADIUS * dpr - 4 * dpr;

        if (p.progress > 1) {
          checkmarksRef.current.push({ x: prodX, y: cy, time: now });
          return false;
        }
        p.x = sx + (ex - sx) * p.progress;
        p.y = cy;
      }

      let alpha = p.opacity;
      if (p.progress < 0.1) alpha *= p.progress / 0.1;
      if (p.progress > 0.85) alpha *= (1 - p.progress) / 0.15;

      const dp = getDisplacement(p.x, p.y, mouse, dpr, 3, 60);
      drawParticle(ctx, p.x + dp.x, p.y + dp.y, p.size, alpha, dpr);
      return true;
    });

    particlesRef.current.push(...toPromote);

    // Checkmarks
    checkmarksRef.current = checkmarksRef.current.filter((c) => {
      const age = now - c.time;
      if (age > 600) return false;
      const alpha = 1 - age / 600;
      const yOff = -((NODE_RING_RADIUS + 10) * dpr) - (age / 600) * 6 * dpr;
      ctx.save();
      ctx.font = `${10 * dpr}px monospace`;
      ctx.fillStyle = `rgba(${GREEN_RGB[0]}, ${GREEN_RGB[1]}, ${GREEN_RGB[2]}, ${alpha * 0.8})`;
      ctx.textAlign = "center";
      ctx.fillText("✓", c.x, c.y + yOff);
      ctx.restore();
      return true;
    });

    animRef.current = requestAnimationFrame(animate);
  }, [updateTransition, mousePosRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[100px]"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}
