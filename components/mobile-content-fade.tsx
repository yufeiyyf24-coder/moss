"use client";

import { useEffect, useState } from "react";

/**
 * 手机端（<lg）页面内容随滚动下沉：离开页面顶端后整块内容保持半透明，
 * 回到顶端恢复全亮。顶栏与返回键不在其中，始终保持清晰。
 */
export function MobileContentFade({ children }: { children: React.ReactNode }) {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 1024) {
        setAway(false);
        return;
      }
      setAway(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`max-lg:transition-opacity max-lg:duration-500 ${
        away ? "max-lg:opacity-50" : "max-lg:opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
