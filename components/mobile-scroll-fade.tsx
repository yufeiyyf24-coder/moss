"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 手机端（<lg）顶栏随滚动淡出：手指上滑阅读时降低不透明度，
 * 往回拉或停止滚动后恢复。桌面端与平板以上不受影响，也不加白色底。
 */
export function MobileScrollFade({ children }: { children: React.ReactNode }) {
  const [dimmed, setDimmed] = useState(false);
  const restTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      if (window.innerWidth >= 1024) return;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      if (dy > 3) setDimmed(true);
      else if (dy < -3) setDimmed(false);

      window.clearTimeout(restTimer.current);
      restTimer.current = window.setTimeout(() => setDimmed(false), 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(restTimer.current);
    };
  }, []);

  return (
    <div
      className={`max-lg:transition-opacity max-lg:duration-300 ${
        dimmed ? "max-lg:opacity-30" : "max-lg:opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
