"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTransitionContext } from "@/lib/transition-context";

/* ------------------------------------------------------------------ */
/*  Particle type & sampling                                           */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

function sampleTextParticles(
  text: string,
  cx: number,
  cy: number,
  fontSize: number,
  dpr: number
): Particle[] {
  const offscreen = document.createElement("canvas");
  const estW = text.length * fontSize * 0.7;
  const estH = fontSize * 1.4;
  offscreen.width = Math.ceil(estW * dpr);
  offscreen.height = Math.ceil(estH * dpr);

  const octx = offscreen.getContext("2d")!;
  octx.scale(dpr, dpr);
  octx.font = `600 ${fontSize}px "DM Sans", sans-serif`;
  octx.fillStyle = "#7d9b6a";
  octx.textBaseline = "middle";
  octx.textAlign = "center";
  octx.fillText(text, estW / 2, estH / 2);

  const imageData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
  const particles: Particle[] = [];

  // Larger text → larger step to keep particle count stable
  const step = Math.max(3, Math.round(fontSize / 16));

  const offsetX = cx - estW / 2;
  const offsetY = cy - estH / 2;

  for (let py = 0; py < offscreen.height; py += step) {
    for (let px = 0; px < offscreen.width; px += step) {
      const i = (py * offscreen.width + px) * 4;
      const alpha = imageData.data[i + 3];
      if (alpha < 80) continue;

      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 2.4;

      particles.push({
        x: offsetX + px / dpr + (Math.random() - 0.5) * 2,
        y: offsetY + py / dpr + (Math.random() - 0.5) * 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1 + Math.random() * 3,
        color: `rgba(${r},${g},${b},1)`,
        opacity: 0.65 + Math.random() * 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
      });
    }
  }

  return particles;
}

/* ------------------------------------------------------------------ */
/*  Phase 2: Focus — text flies to centre                              */
/* ------------------------------------------------------------------ */

function FocusText({
  origin,
  label,
  onComplete,
}: {
  origin: { x: number; y: number };
  label: string;
  onComplete: () => void;
}) {
  return (
    <motion.div
      className="fixed z-[10000] font-light tracking-wide text-moss-ink"
      style={{
        left: origin.x,
        top: origin.y,
        transform: "translate(-50%, -50%)",
        fontSize: "clamp(1.35rem, 3.2vw, 2.5rem)",
        whiteSpace: "nowrap",
      }}
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={{
        x: window.innerWidth / 2 - origin.x,
        y: window.innerHeight / 2 - origin.y,
        scale: 3,
      }}
      transition={{ duration: 0.55, ease: [0.2, 0.0, 0.8, 1.0] }}
      onAnimationComplete={onComplete}
    >
      {label}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phase 3: Particle shatter (receives pre‑computed particles)        */
/* ------------------------------------------------------------------ */

function ParticleCanvas({
  particles,
  onComplete,
}: {
  particles: Particle[];
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const duration = 800;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const start = performance.now();
    let raf: number;

    const draw = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, w, h);
      ctx.filter = `blur(${progress * 2.5}px)`;

      for (const p of particles) {
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentX = p.x + p.vx * ease * 80;
        const currentY = p.y + p.vy * ease * 80;
        const driftX = Math.sin(now * 0.001 + p.x * 0.01) * progress * 6;
        const driftY = Math.cos(now * 0.0013 + p.y * 0.01) * progress * 6;

        const opacity = p.opacity * (1 - progress * 1.05);
        const radius = p.radius * (1 - progress * 0.35);
        const rotation =
          (p.rotation + p.rotationSpeed * progress * 60) * (Math.PI / 180);

        if (opacity <= 0.01 || radius < 0.3) continue;

        ctx.save();
        ctx.translate(currentX + driftX, currentY + driftY);
        ctx.rotate(rotation);
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
        ctx.restore();
      }

      ctx.filter = "none";

      if (progress < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        onComplete();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [particles, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main engine                                                        */
/* ------------------------------------------------------------------ */

export function TransitionEngine() {
  const { phase, origin, label, advance } = useTransitionContext();
  const cachedParticles = useRef<Particle[] | null>(null);
  const centre = useRef({ x: 0, y: 0 });

  // Phase 1: Freeze → auto-advance after 300ms
  useEffect(() => {
    if (phase !== "freezing") return;
    const t = setTimeout(() => advance(), 300);
    return () => clearTimeout(t);
  }, [phase, advance]);

  // Phase 5: Expanding → gentle fade to full green cover
  useEffect(() => {
    if (phase !== "expanding") return;
    const t = setTimeout(() => advance(), 800);
    return () => clearTimeout(t);
  }, [phase, advance]);

  // Phase 7: Revealing → slow fade out to reveal new page
  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => advance(), 1500);
    return () => clearTimeout(t);
  }, [phase, advance]);

  // Pre‑compute particles as soon as "focusing" starts
  useEffect(() => {
    if (phase !== "focusing") return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    centre.current = { x: cx, y: cy };

    const w = window.innerWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const baseFontSize = Math.max(28, Math.min(64, w * 0.045));
    const fontSize = baseFontSize * 3;

    cachedParticles.current = sampleTextParticles(
      label,
      cx,
      cy,
      fontSize,
      dpr
    );
  }, [phase, label]);

  if (phase === "idle") return null;

  // Green haze opacity — gradually builds, no sudden jumps
  const hazeOpacity =
    phase === "freezing"
      ? 0.25
      : phase === "focusing"
      ? 0.4
      : phase === "shattering"
      ? 0.7
      : phase === "expanding" || phase === "navigating"
      ? 0.95
      : phase === "revealing"
      ? 0
      : 0;

  return (
    <div className="fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Green haze — covers old page, fades to reveal new page */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--color-moss-soft)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hazeOpacity }}
        transition={{
          duration:
            phase === "expanding"
              ? 0.8
              : phase === "revealing"
              ? 1.5
              : 0.5,
          ease: "easeInOut",
        }}
      />

      {/* Phase 2: Focus — text flies to centre */}
      {phase === "focusing" && (
        <FocusText origin={origin} label={label} onComplete={advance} />
      )}

      {/* Phase 3: Shatter */}
      {phase === "shattering" && cachedParticles.current && (
        <ParticleCanvas
          particles={cachedParticles.current}
          onComplete={advance}
        />
      )}
    </div>
  );
}
