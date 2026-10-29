"use client";

import { useEffect, useState } from "react";

/**
 * 手机端（<lg）顶栏随滚动淡出：离开页面顶端后保持半透明，回到顶端恢复。
 * 桌面端不受影响。
 * 透明度通过 CSS 变量 --header-fade 提供给子元素——返回键这类独立元素
 * 不引用该变量，就能和顶栏分开层级、始终清晰。
 */
export function MobileScrollFade({ children }: { children: React.ReactNode }) {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 1024) return;
      setAway(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ "--header-fade": away ? "0.45" : "1" } as React.CSSProperties}>
      {children}
    </div>
  );
}
