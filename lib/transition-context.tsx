"use client";

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";

export type Phase =
  | "idle"
  | "freezing"
  | "focusing"
  | "shattering"
  | "expanding"
  | "navigating"
  | "revealing";

export interface TransitionState {
  phase: Phase;
  origin: { x: number; y: number };
  label: string;
  advance: () => void;
  startTransition: (
    href: string,
    x: number,
    y: number,
    label: string
  ) => void;
}

const TransitionContext = createContext<TransitionState | null>(null);

const PHASE_ORDER: Phase[] = [
  "idle",
  "freezing",
  "focusing",
  "shattering",
  "expanding",
  "navigating",
  "revealing",
];

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState("");

  const targetRef = useRef<string | null>(null);
  const lockedRef = useRef(false);

  // Freeze page animations during transition
  useEffect(() => {
    if (phase !== "idle" && phase !== "revealing") {
      document.body.setAttribute("data-transitioning", "true");
    } else {
      document.body.removeAttribute("data-transitioning");
    }
    return () => {
      document.body.removeAttribute("data-transitioning");
    };
  }, [phase]);

  // Trigger navigation when phase advances to "navigating"
  useEffect(() => {
    if (phase === "navigating" && targetRef.current) {
      router.push(targetRef.current);
    }
  }, [phase, router]);

  // Listen for pathname change → switch from navigating to revealing
  useEffect(() => {
    if (phase === "navigating" && pathname === targetRef.current) {
      setPhase("revealing");
    }
  }, [pathname, phase]);

  // Clean up after transition completes
  useEffect(() => {
    if (phase === "idle" && lockedRef.current) {
      targetRef.current = null;
      lockedRef.current = false;
    }
  }, [phase]);

  const advance = useCallback(() => {
    setPhase((prev) => {
      const idx = PHASE_ORDER.indexOf(prev);
      // Advance to next phase (side-effects handled by useEffects above)
      const next = PHASE_ORDER[idx + 1];
      return next ?? "idle";
    });
  }, []);

  const startTransition = useCallback(
    (href: string, x: number, y: number, text: string) => {
      if (lockedRef.current) return;
      lockedRef.current = true;

      setOrigin({ x, y });
      setLabel(text);
      targetRef.current = href;
      setPhase("freezing");
    },
    []
  );

  return (
    <TransitionContext.Provider
      value={{ phase, origin, label, advance, startTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error(
      "useTransitionContext must be used within TransitionProvider"
    );
  }
  return ctx;
}
