"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleSurface() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, time: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      const prev = mouseRef.current;
      const dist = Math.hypot(e.clientX - prev.x, e.clientY - prev.y);

      if (now - prev.time > 100 && dist > 24) {
        const id = now + Math.random();
        setRipples((current) => [...current.slice(-7), { id, x: e.clientX, y: e.clientY }]);
        mouseRef.current = { x: e.clientX, y: e.clientY, time: now };

        setTimeout(() => {
          setRipples((current) => current.filter((r) => r.id !== id));
        }, 1800);
      } else {
        mouseRef.current = { ...prev, x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ width: 0, height: 0, opacity: 0.35 }}
            animate={{ width: 260, height: 260, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              left: r.x,
              top: r.y,
              x: "-50%",
              y: "-50%",
              background:
                "radial-gradient(circle, transparent 42%, rgba(183, 216, 168, 0.14) 58%, transparent 72%)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
