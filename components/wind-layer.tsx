"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  phase: number;
}

export function WindLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const centerX = () => width / 2;
    const centerY = () => height / 2;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const maxRadius = (Math.hypot(width, height) / 2) * 1.05;

    const particleCount = Math.min(
      160,
      Math.max(70, Math.floor((width * height) / 14000))
    );

    function opacityByDistance(x: number, y: number) {
      const d = Math.hypot(x - centerX(), y - centerY()) / maxRadius;
      // center is very faint, edges are clearer
      return 0.08 + Math.pow(Math.max(0, d), 1.6) * 0.42;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      // bias radius toward the edges: 1 - random^2 pushes values close to maxRadius
      const r = maxRadius * (1 - Math.pow(Math.random(), 2));

      const x = centerX() + Math.cos(angle) * r;
      const y = centerY() + Math.sin(angle) * r;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 2.6 + 0.9,
        baseOpacity: opacityByDistance(x, y),
        phase: Math.random() * Math.PI * 2,
      };
    });

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      setSize();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let time = 0;
    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.004;

      for (const p of particles) {
        // organic drift — moss-like, never mechanical
        p.vx +=
          Math.sin(time + p.phase) * 0.0014 +
          Math.cos(time * 0.6 + p.y * 0.008) * 0.0008;
        p.vy +=
          Math.cos(time + p.phase * 1.3) * 0.0014 +
          Math.sin(time * 0.5 + p.x * 0.008) * 0.0008;

        // gentle damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        // cursor wind field: a soft nudge, not attraction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const windRadius = 180;
        if (dist < windRadius && dist > 1) {
          const force = (1 - dist / windRadius) * 0.018;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges so the field feels endless
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // opacity changes with distance to center as particles drift
        const opacity = opacityByDistance(p.x, p.y) * (0.85 + Math.sin(time + p.phase) * 0.15);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(111, 158, 93, ${opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
