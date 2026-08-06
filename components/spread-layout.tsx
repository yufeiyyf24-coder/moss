import { Children } from "react";

/* ------------------------------------------------------------------ */
/*  展览式排版原语：非对称跨页容器 + 散落卡片容器                        */
/*  设计约束：错位、旋转幅度克制，避免真正变成缝合怪                     */
/* ------------------------------------------------------------------ */

/* 确定性散列：同一输入永远得到同一输出（用于给卡片生成稳定的偏移量） */
export function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

type SpreadRatio = "60-40" | "40-60" | "55-45" | "45-55" | "70-30" | "50-50";
type SpreadOffset = "none" | "right-down" | "right-up" | "left-down" | "left-up";

const RATIO_CLASS: Record<SpreadRatio, string> = {
  "60-40": "lg:grid-cols-[3fr_2fr]",
  "40-60": "lg:grid-cols-[2fr_3fr]",
  "55-45": "lg:grid-cols-[11fr_9fr]",
  "45-55": "lg:grid-cols-[9fr_11fr]",
  "70-30": "lg:grid-cols-[7fr_3fr]",
  "50-50": "lg:grid-cols-2",
};

/**
 * 跨页容器：左右两栏不等宽、可整体上下错开，模拟杂志跨页里图文不对齐的错位感。
 * 用法：<SpreadLayout ratio="55-45" offset="right-down"> 左栏 / 右栏 </SpreadLayout>
 * （约定：第一个子元素是左栏，第二个是右栏）
 */
export function SpreadLayout({
  children,
  ratio = "60-40",
  offset = "none",
  className = "",
}: {
  children: React.ReactNode;
  ratio?: SpreadRatio;
  offset?: SpreadOffset;
  className?: string;
}) {
  const [left, right] = Children.toArray(children);

  const [side, dir] = offset === "none" ? ["", ""] : offset.split("-");
  const shift = dir === "down" ? "lg:mt-14" : dir === "up" ? "lg:-mt-12" : "";
  const leftShift = side === "left" ? shift : "";
  const rightShift = side === "right" ? shift : "";

  return (
    <div className={`grid items-start gap-10 lg:grid-cols-2 ${RATIO_CLASS[ratio]} lg:gap-14 ${className}`}>
      <div className={leftShift}>{left}</div>
      <div className={rightShift}>{right}</div>
    </div>
  );
}

/**
 * 散落卡片容器：每张卡片沿基准侧（左/右交替）偏移一个确定性的百分比，
 * 做出「散落」而非「整齐列表」的观感。偏移由 hashString 决定，刷新后位置不变。
 */
export function ScatterField({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-8 sm:space-y-10 ${className}`}>
      {Children.map(children, (child, i) => {
        const h = hashString(`scatter-${i}`);
        const side = i % 2 === 0 ? "left" : "right";
        const shift = 6 + (h % 14); // 6% ~ 19%
        const nudge = i === 0 ? 0 : ((h >> 2) % 5 - 2) * 6; // -12px ~ +12px 垂直微调
        return (
          <div
            className={`flex ${side === "left" ? "justify-start" : "justify-end"}`}
            style={{ marginTop: nudge }}
          >
            <div style={side === "left" ? { marginLeft: `${shift}%` } : { marginRight: `${shift}%` }}>
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}
