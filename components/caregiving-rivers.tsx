const rivers = [
  {
    title: "河流一：日常照护期",
    subtitle: "从一天的开始，到带着牵挂入睡",
    stages: [
      { label: ["起床"], emotion: "开始新一天", expression: "smile", y: 100 },
      { label: ["观察"], emotion: "留意状态", expression: "attentive", y: 115 },
      { label: ["用药"], emotion: "按计划照护", expression: "neutral", y: 95 },
      { label: ["不确定"], emotion: "担心判断出错", expression: "worried", y: 185 },
      { label: ["搜索 / 问"], emotion: "寻找答案", expression: "thinking", y: 155 },
      { label: ["暂时安心"], emotion: "松一口气", expression: "relieved", y: 120 },
      { label: ["入睡"], emotion: "仍有牵挂", expression: "sad", y: 135 },
    ],
    painPoints: [3],
    description: "照护行动看似重复，情绪却不断起伏。「不确定」是一天里的低谷，找到答案后，也只是暂时安心。",
    opportunity: "支持机会 · 在不确定时，给出可信的判断和明确的下一步。",
  },
  {
    title: "河流二：危机节点",
    subtitle: "从医疗支持，走向独自面对居家照护",
    stages: [
      { label: ["出院 /", "换药决策"], emotion: "还有医生支持", expression: "smile", y: 85 },
      { label: ["医生交代"], emotion: "怕记不住、做不对", expression: "worried", y: 155 },
      { label: ["回家初期"], emotion: "独自摸索", expression: "thinking", y: 185 },
      { label: ["波动期"], emotion: "担心再次恶化", expression: "anxious", y: 200 },
      { label: ["稳定 /", "再次危机"], emotion: "缓解，或再次承压", expression: "mixed", y: 120 },
    ],
    painPoints: [2, 3],
    description: "医生交代后，照护的责任回到家属身上。回家第一周持续低位，病情波动让判断与决策变得更难。",
    opportunity: "支持机会 · 衔接出院后的照护指引，在波动时提供就医分级。",
  },
] as const;

type Expression = (typeof rivers)[number]["stages"][number]["expression"];

function JourneyFace({ x, y, expression, highlighted }: {
  x: number;
  y: number;
  expression: Expression;
  highlighted: boolean;
}) {
  const closedEyes = expression === "relieved" || expression === "sad";
  const concerned = expression === "worried" || expression === "anxious";
  const mouth = {
    smile: "M-4 3 Q0 7 4 3",
    attentive: "M-3 4 Q0 5 3 4",
    neutral: "M-3 4H3",
    worried: "M-4 5 Q0 1 4 5",
    thinking: "M-3 4 3 3",
    relieved: "M-4 3 Q0 6 4 3",
    sad: "M-3 5 Q0 2 3 5",
    anxious: "M-3 5 Q-1 3 0 5 T3 5",
    mixed: "M-4 3 Q-1 6 1 4 T4 4",
  }[expression];

  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      {highlighted && <circle r="19" fill="#568d86" opacity="0.12" />}
      <circle r="13" fill="#e5f4f1" stroke="#568d86" strokeWidth="1.5" />
      <circle r="10" fill="#faf9f3" />
      <g fill="none" stroke="#568d86" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {closedEyes ? (
          <path d={expression === "relieved" ? "M-6-2 Q-4 0-2-2 M2-2 Q4 0 6-2" : "M-6-1  -2 0 M2 0 6-1"} />
        ) : (
          <>
            <path d="M-4-2v1 M4-2v1" />
            {concerned && <path d="M-6-5-2-6 M2-6 6-5" />}
            {(expression === "attentive" || expression === "thinking") && <path d="M-6-5-2-5 M2-6 6-5" />}
            {expression === "mixed" && <path d="M2-6 6-5" />}
          </>
        )}
        <path d={mouth} />
      </g>
    </g>
  );
}

export function CaregivingRivers() {
  return (
    <div className="mt-16 space-y-14">
      <p className="text-xs font-light tracking-wide text-moss-ink/55">照护者的情绪旅程 · 基于访谈理解的示意，非量化测量</p>
      {rivers.map((river, riverIndex) => {
        const points = river.stages.map((stage, index) => ({ ...stage, x: 85 + (index / (river.stages.length - 1)) * 590 }));
        // Horizontal tangents keep the curve smooth and passing through every node.
        const path = points.reduce((curve, point, index) => {
          if (index === 0) return `M${point.x} ${point.y}`;
          const previous = points[index - 1];
          const midpoint = (previous.x + point.x) / 2;
          return `${curve} C${midpoint} ${previous.y}, ${midpoint} ${point.y}, ${point.x} ${point.y}`;
        }, "");
        const accessibleTitle = `${river.title}：${river.stages.map((stage) => `${stage.label.join("")}，${stage.emotion}`).join("；")}。情绪曲线为访谈示意。`;
        return (
          <figure key={river.title} className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-wenkai text-lg text-moss-ink sm:text-xl">{river.title}</h3>
              <p className="text-xs font-light text-moss-ink/55">{river.subtitle}</p>
            </div>
            <p className="mt-3 pl-4 text-sm font-light leading-7 text-[#568d86] sm:pl-28">
              {river.opportunity}
            </p>
            <div className="mx-auto mt-6 w-full max-w-3xl overflow-x-auto lg:w-[82%]">
              <svg viewBox="0 0 760 300" role="img" aria-labelledby={`caregiving-river-${riverIndex}`} className="block w-full min-w-[640px]">
                {/* SVG title must be one text node for matching server/client markup. */}
                <title id={`caregiving-river-${riverIndex}`}>{accessibleTitle}</title>
                <g fill="currentColor" fontSize="11" className="text-moss-ink/55">
                  <text x="4" y="65">较安心</text>
                  <text x="4" y="210">较焦虑</text>
                </g>
                <path d="M65 65H710 M65 210H710" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" className="text-shx-teal/10" />
                <path d="M65 245H710" fill="none" stroke="currentColor" strokeWidth="1" className="text-shx-teal/20" />
                <path d="m705 241 5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1" className="text-shx-teal/40" />
                <path d={path} fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" className="text-shx-teal/10" />
                <path d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-shx-teal/70" />
                {points.map((point, index) => {
                  const highlighted = river.painPoints.some((painPoint) => painPoint === index);
                  return (
                    <g key={point.label.join("")}>
                      <path d={`M${point.x} ${point.y + 20}V245`} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" className="text-shx-teal/20" />
                      <JourneyFace x={point.x} y={point.y} expression={point.expression} highlighted={highlighted} />
                      <text x={point.x} y={point.y - 27} textAnchor="middle" fill="currentColor" fontSize="11" className={highlighted ? "text-moss-ink/80" : "text-moss-ink/60"}>{point.emotion}</text>
                      <text x={point.x} y="268" textAnchor="middle" fill="currentColor" fontSize="13" className="font-wenkai text-moss-ink/80">
                        {point.label.map((line, lineIndex) => <tspan key={line} x={point.x} dy={lineIndex === 0 ? 0 : 18}>{line}</tspan>)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="mt-1 text-right text-xs text-moss-ink/50 sm:hidden">左右滑动，查看完整旅程 →</p>
            <figcaption className="mt-4 text-sm font-light leading-7">
              <p className="text-moss-ink/60">{river.description}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

