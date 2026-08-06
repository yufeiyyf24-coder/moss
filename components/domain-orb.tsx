"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import { useTransitionContext } from "@/lib/transition-context";

interface DomainOrbProps {
  label: string;
  sub: string;
  href: string;
  positionClass: string;
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function DomainOrb({ label, sub, href, positionClass }: DomainOrbProps) {
  const [hovered, setHovered] = useState(false);
  const { startTransition } = useTransitionContext();
  const orbRef = useRef<HTMLAnchorElement>(null);

  // deterministic floating parameters based on label → no hydration mismatch
  const float = useMemo(() => {
    const h = hashString(label);
    return {
      duration: (7 + (h % 5000) / 1000).toFixed(2),
      delay: ((h % 3000) / 1000).toFixed(2),
      y: -(5 + (h % 500) / 100).toFixed(1),
      x: (2 + (h % 300) / 100).toFixed(1),
    };
  }, [label]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      // Use the orb's visual center as the transition origin
      const rect = orbRef.current?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : e.clientX;
      const cy = rect ? rect.top + rect.height / 2 : e.clientY;
      startTransition(href, cx, cy, label);
    },
    [href, label, startTransition]
  );

  return (
    <a
      ref={orbRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`absolute group flex flex-col items-center justify-center rounded-full p-4 sm:p-6 text-center opacity-50 transition-all duration-700 ease-out hover:scale-[1.08] hover:opacity-100 ${positionClass} animate-float`}
      style={{
        ["--float-duration" as string]: `${float.duration}s`,
        ["--float-delay" as string]: `${float.delay}s`,
        ["--float-x" as string]: `${float.x}px`,
        ["--float-y" as string]: `${float.y}px`,
        animationPlayState: hovered ? "paused" : "running",
      }}
    >
      {/* soft ambient glow that blooms on hover */}
      <div
        className="absolute inset-0 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-1000 group-hover:opacity-80"
        style={{
          background:
            "radial-gradient(circle at center, rgba(183, 216, 168, 0.9) 0%, transparent 65%)",
        }}
      />

      <span className="whitespace-nowrap text-[clamp(1.35rem,3.2vw,2.5rem)] font-light tracking-wide text-moss-ink/55 transition-colors duration-700 group-hover:text-moss-ink">
        {label}
      </span>

      <span className="mt-1 max-w-[14ch] font-wenkai text-xs font-light text-moss-ink/70 opacity-0 transition-all duration-700 group-hover:opacity-100 sm:text-sm">
        {sub}
      </span>
    </a>
  );
}
