"use client";

import { useEffect, useRef } from "react";

/**
 * 手机端（<lg）内容顶部渐隐：离开页面顶端后，内容在固定顶栏下方
 * 约 104px 范围内逐渐透明，滚回顶端则完全撤销。顶栏本身不受影响。
 * 通过 mask-position 跟随滚动，让透明带始终贴在视口顶部——
 * 直接给容器加 mask-image 会随文档滚走，所以这里每帧同步一次位置。
 */
export function MobileContentFade({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const clear = () => {
      el.style.maskImage = "";
      el.style.webkitMaskImage = "";
      el.style.maskPosition = "";
      el.style.webkitMaskPosition = "";
      el.style.maskSize = "";
      el.style.webkitMaskSize = "";
      el.style.maskRepeat = "";
      el.style.webkitMaskRepeat = "";
    };

    const apply = () => {
      raf = 0;
      if (window.innerWidth >= 1024 || window.scrollY <= 8) {
        clear();
        return;
      }
      const gradient =
        "linear-gradient(to bottom, transparent 0, #000 104px)";
      el.style.webkitMaskImage = gradient;
      el.style.maskImage = gradient;
      el.style.webkitMaskSize = "100% 100vh";
      el.style.maskSize = "100% 100vh";
      el.style.webkitMaskRepeat = "repeat-y";
      el.style.maskRepeat = "repeat-y";
      el.style.webkitMaskPosition = `0 ${window.scrollY}px`;
      el.style.maskPosition = `0 ${window.scrollY}px`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
