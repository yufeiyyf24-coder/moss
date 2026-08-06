"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  手写 SVG 数据可视化：SUS 曲线 / 任务时长曲线 / 访谈词云              */
/*  设计语言跟随 moss：单一序列色、细线、墨色文字、少量直接标签           */
/* ------------------------------------------------------------------ */

const INK = "#3a4a38";
const LEAF = "#90b97b";

const ease = [0.2, 0, 0.2, 1] as const;

/* Catmull-Rom → Bezier：柔和的生长曲线 */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function LineChart({
  data,
  yMin,
  yMax,
  ticks,
  baseline,
  baselineLabel,
  valueLabel,
  xLabels,
  annotations,
  caption,
}: {
  data: { name: string; value: number }[];
  yMin: number;
  yMax: number;
  ticks: number[];
  baseline?: { value: number; label: string };
  baselineLabel?: string;
  valueLabel: string;
  xLabels: string[];
  annotations?: { index: number; text: string; dy?: number }[];
  caption: string;
}) {
  const W = 520;
  const H = 250;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 36;

  const x = (i: number) =>
    padL + (i / (data.length - 1)) * (W - padL - padR);
  const y = (v: number) =>
    padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);

  const pts = data.map((d, i) => [x(i), y(d.value)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L ${x(data.length - 1)},${y(yMin)} L ${x(0)},${y(yMin)} Z`;

  const dots = data.map((d, i) => ({ ...d, cx: x(i), cy: y(d.value) }));

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${valueLabel}：${caption}`}
      >
        {/* 网格线：hairline、退后 */}
        {ticks.map((t) => (
          <line
            key={t}
            x1={padL}
            x2={W - padR}
            y1={y(t)}
            y2={y(t)}
            stroke={INK}
            strokeOpacity={0.07}
            strokeWidth={1}
          />
        ))}
        {/* Y 轴刻度 */}
        {ticks.map((t) => (
          <text
            key={t}
            x={padL - 8}
            y={y(t) + 3}
            textAnchor="end"
            fontSize={9.5}
            fill={INK}
            fillOpacity={0.45}
          >
            {t}
          </text>
        ))}

        {/* 基准线（SUS ≥ 68） */}
        {baseline && (
          <>
            <line
              x1={padL}
              x2={W - padR}
              y1={y(baseline.value)}
              y2={y(baseline.value)}
              stroke={LEAF}
              strokeOpacity={0.4}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <text
              x={W - padR}
              y={y(baseline.value) - 5}
              textAnchor="end"
              fontSize={9.5}
              fill={INK}
              fillOpacity={0.45}
            >
              {baseline.label}
            </text>
          </>
        )}

        {/* 面积：序列色 ~10% 的水洗 */}
        <motion.path
          d={area}
          fill={LEAF}
          fillOpacity={0.09}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        />

        {/* 曲线：2px，生长动画 */}
        <motion.path
          d={line}
          fill="none"
          stroke={LEAF}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease }}
        />

        {/* 数据点：≥8px，表面色描边 */}
        {dots.map((d, i) => (
          <motion.g
            key={d.name}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.1, ease }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            className="cursor-pointer"
            whileHover={{ scale: 1.5 }}
          >
            <circle cx={d.cx} cy={d.cy} r={4.5} fill={LEAF} stroke="#fff" strokeWidth={2}>
              <title>{`${d.name} · ${d.value}`}</title>
            </circle>
          </motion.g>
        ))}

        {/* 标注：只在峰/谷放数值 */}
        {annotations?.map((a) => {
          const d = dots[a.index];
          return (
            <text
              key={a.index}
              x={d.cx}
              y={d.cy + (a.dy ?? -10)}
              textAnchor="middle"
              fontSize={10.5}
              fill={INK}
              fillOpacity={0.6}
            >
              {a.text}
            </text>
          );
        })}

        {/* X 轴标签 */}
        {xLabels.map((label, i) => (
          <text
            key={label}
            x={x(i)}
            y={H - 14}
            textAnchor="middle"
            fontSize={9.5}
            fill={INK}
            fillOpacity={0.5}
          >
            {label}
          </text>
        ))}
      </svg>
      <p className="mt-2 text-xs font-light leading-6 text-moss-ink/40">
        {caption}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SUS 得分曲线：6 位参与者，68 为良好线                              */
/* ------------------------------------------------------------------ */

const susData = [
  { name: "淑林姐", value: 90 },
  { name: "强哥", value: 80 },
  { name: "李子", value: 87.5 },
  { name: "汶悦", value: 72.5 },
  { name: "蒋总", value: 80 },
  { name: "张二狗", value: 92.5 },
];

export function SusCurveChart() {
  return (
    <LineChart
      data={susData}
      yMin={60}
      yMax={100}
      ticks={[60, 70, 80, 90, 100]}
      baseline={{ value: 68, label: "SUS ≥ 68 · 可用性良好" }}
      valueLabel="SUS 得分分布"
      xLabels={susData.map((d) => d.name)}
      annotations={[
        { index: 5, text: "92.5", dy: -12 },
        { index: 3, text: "72.5", dy: 18 },
      ]}
      caption="SUS：90 / 80 / 87.5 / 72.5 / 80 / 92.5 · 平均 83.75，6 人全部 ≥ 68"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  任务时长曲线：6 项任务的平均完成秒数，峰值即痛点                    */
/* ------------------------------------------------------------------ */

const taskData = [
  { name: "记录食欲", value: 52 },
  { name: "AI 历史", value: 35 },
  { name: "风险评估", value: 6 },
  { name: "拒药应对", value: 64 },
  { name: "图文问诊", value: 10 },
  { name: "添加家人", value: 6 },
];

export function TaskCurveChart() {
  return (
    <LineChart
      data={taskData}
      yMin={0}
      yMax={70}
      ticks={[0, 20, 40, 60]}
      valueLabel="任务平均完成时长"
      xLabels={taskData.map((d) => d.name)}
      annotations={[
        { index: 3, text: "64s · 6/6 走错路径", dy: -14 },
        { index: 0, text: "52s · 全员犹疑", dy: -10 },
      ]}
      caption="平均完成时长（秒）：52 / 35 / 6 / 64 / 10 / 6"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  访谈词云：词频来自 6 份测试文档的访谈回答                           */
/* ------------------------------------------------------------------ */

const cloudWords = [
  { word: "患者", count: 13 },
  { word: "理解", count: 11 },
  { word: "记录", count: 10 },
  { word: "家属", count: 7 },
  { word: "功能", count: 5 },
  { word: "SOS", count: 3 },
  { word: "学一学", count: 3 },
  { word: "支持", count: 3 },
  { word: "问一问", count: 2 },
  { word: "清晰", count: 2 },
  { word: "健康", count: 2 },
  { word: "任务", count: 2 },
  { word: "清新", count: 2 },
  { word: "风险评估", count: 1 },
  { word: "新手指引", count: 1 },
  { word: "好用", count: 1 },
];

/* 确定性螺旋布点：中心出发，黄金角旋转，AABB 无重叠；布完后整体放大填满画布 */
function packWords(
  words: { word: string; count: number }[]
): { word: string; count: number; x: number; y: number; size: number }[] {
  const W = 560;
  const H = 300;
  const cx = W / 2;
  const cy = H / 2;
  const placed: { x0: number; y0: number; x1: number; y1: number }[] = [];
  const GOLDEN = 2.399963229728653; // 黄金角

  const sizeOf = (c: number) => 16 + c * 2.2;

  const items = words.map((w, i) => {
    // 「患者」是最高频词，再放大一点作为视觉锚点
    const size = sizeOf(w.count) * (w.word === "患者" ? 1.12 : 1);
    // 估算文字宽度：中文 ≈ 字号，英文 ≈ 0.6 字号
    const estW = [...w.word].reduce(
      (acc, ch) => acc + (ch.charCodeAt(0) > 255 ? size : size * 0.6),
      0
    );
    const estH = size * 1.35;
    let radius = 8;
    let angle = i * GOLDEN;
    let x = cx;
    let y = cy;
    let attempts = 0;
    while (attempts < 800) {
      const hit = placed.some(
        (r) =>
          x - estW / 2 - 6 < r.x1 &&
          x + estW / 2 + 6 > r.x0 &&
          y - estH / 2 - 6 < r.y1 &&
          y + estH / 2 + 6 > r.y0
      );
      if (
        !hit &&
        x - estW / 2 > 8 &&
        x + estW / 2 < W - 8 &&
        y - estH / 2 > 8 &&
        y + estH / 2 < H - 8
      ) {
        placed.push({
          x0: x - estW / 2,
          y0: y - estH / 2,
          x1: x + estW / 2,
          y1: y + estH / 2,
        });
        return { ...w, x, y, size, estW, estH };
      }
      attempts += 1;
      angle += GOLDEN;
      radius += 5;
      // 椭圆螺旋：横向 1.6 倍、纵向 0.9 倍，让词云自然更宽
      x = cx + Math.cos(angle) * radius * 1.6;
      y = cy + Math.sin(angle) * radius * 0.9;
    }
    return { ...w, x, y, size, estW, estH }; // 兜底：直接返回当前位置
  });

  // 「家属」与「支持」互换：家属优先落到「支持」现在的中心，放不下就在周围找最近空位；
  // 家属腾出的位置由「支持」补上（支持盒子更小，基本必能放下）
  const jiaIdx = items.findIndex((it) => it.word === "家属");
  const zhiIdx = items.findIndex((it) => it.word === "支持");
  if (jiaIdx >= 0 && zhiIdx >= 0) {
    const jia = items[jiaIdx];
    const zhi = items[zhiIdx];
    const jiaOldX = jia.x;
    const jiaOldY = jia.y;
    const zhiOldX = zhi.x;
    const zhiOldY = zhi.y;

    // 两个占位一并移除（互换个窝，避免对方盒子挡住自己）
    placed.splice(Math.max(jiaIdx, zhiIdx), 1);
    placed.splice(Math.min(jiaIdx, zhiIdx), 1);

    const fits = (x: number, y: number, estW: number, estH: number, pad = 4) =>
      !placed.some(
        (p) =>
          x - estW / 2 - pad < p.x1 &&
          x + estW / 2 + pad > p.x0 &&
          y - estH / 2 - pad < p.y1 &&
          y + estH / 2 + pad > p.y0
      ) &&
      x - estW / 2 > 8 &&
      x + estW / 2 < W - 8 &&
      y - estH / 2 > 8 &&
      y + estH / 2 < H - 8;

    let jiaAt: { x: number; y: number } | null = null;
    if (fits(zhiOldX, zhiOldY, jia.estW, jia.estH)) {
      jiaAt = { x: zhiOldX, y: zhiOldY };
    } else {
      // 支持原位置放不下大盒子，在它周围螺旋找最近空位
      for (let r = 6; r < 120 && !jiaAt; r += 4) {
        for (let t = 0; t < 24; t++) {
          const a = (t / 24) * Math.PI * 2 + r * 0.13;
          const x = zhiOldX + Math.cos(a) * r;
          const y = zhiOldY + Math.sin(a) * r;
          if (fits(x, y, jia.estW, jia.estH)) {
            jiaAt = { x, y };
            break;
          }
        }
      }
    }

    if (jiaAt) {
      jia.x = jiaAt.x;
      jia.y = jiaAt.y;
      placed.push({
        x0: jiaAt.x - jia.estW / 2,
        y0: jiaAt.y - jia.estH / 2,
        x1: jiaAt.x + jia.estW / 2,
        y1: jiaAt.y + jia.estH / 2,
      });
      if (fits(jiaOldX, jiaOldY, zhi.estW, zhi.estH)) {
        zhi.x = jiaOldX;
        zhi.y = jiaOldY;
        placed.push({
          x0: jiaOldX - zhi.estW / 2,
          y0: jiaOldY - zhi.estH / 2,
          x1: jiaOldX + zhi.estW / 2,
          y1: jiaOldY + zhi.estH / 2,
        });
      } else {
        // 家属原位置放不下支持（几乎不会发生）：在附近找空位
        let zhiAt: { x: number; y: number } | null = null;
        for (let r = 6; r < 60 && !zhiAt; r += 4) {
          for (let t = 0; t < 24; t++) {
            const a = (t / 24) * Math.PI * 2 + r * 0.13;
            const x = jiaOldX + Math.cos(a) * r;
            const y = jiaOldY + Math.sin(a) * r;
            if (fits(x, y, zhi.estW, zhi.estH)) {
              zhiAt = { x, y };
              break;
            }
          }
        }
        if (zhiAt) {
          zhi.x = zhiAt.x;
          zhi.y = zhiAt.y;
          placed.push({
            x0: zhiAt.x - zhi.estW / 2,
            y0: zhiAt.y - zhi.estH / 2,
            x1: zhiAt.x + zhi.estW / 2,
            y1: zhiAt.y + zhi.estH / 2,
          });
        } else {
          placed.push({
            x0: zhiOldX - zhi.estW / 2,
            y0: zhiOldY - zhi.estH / 2,
            x1: zhiOldX + zhi.estW / 2,
            y1: zhiOldY + zhi.estH / 2,
          });
        }
      }
    } else {
      // 家属没找到空位：原样恢复两个占位
      placed.push({
        x0: jiaOldX - jia.estW / 2,
        y0: jiaOldY - jia.estH / 2,
        x1: jiaOldX + jia.estW / 2,
        y1: jiaOldY + jia.estH / 2,
      });
      placed.push({
        x0: zhiOldX - zhi.estW / 2,
        y0: zhiOldY - zhi.estH / 2,
        x1: zhiOldX + zhi.estW / 2,
        y1: zhiOldY + zhi.estH / 2,
      });
    }
  }

  // 填满归一化：用「中心距 + 估算文字宽高」的完整包围盒做等比缩放
  const bbox = items.reduce(
    (acc, it) => ({
      minX: Math.min(acc.minX, it.x - it.estW / 2),
      maxX: Math.max(acc.maxX, it.x + it.estW / 2),
      minY: Math.min(acc.minY, it.y - it.estH / 2),
      maxY: Math.max(acc.maxY, it.y + it.estH / 2),
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );
  const spanX = bbox.maxX - bbox.minX;
  const spanY = bbox.maxY - bbox.minY;
  const bboxCX = (bbox.minX + bbox.maxX) / 2;
  const bboxCY = (bbox.minY + bbox.maxY) / 2;
  const scale = Math.min((W - 24) / spanX, (H - 24) / spanY);

  const base = items.map((it) => ({
    word: it.word,
    count: it.count,
    x: cx + (it.x - bboxCX) * scale,
    y: cy + (it.y - bboxCY) * scale,
    size: it.size * scale,
  }));

  // 等比后若某方向仍不足画布 86%，沿该方向单独拉开（只撑开中心距、不改变字号，不会产生重叠）
  const spanXScaled = spanX * scale;
  const spanYScaled = spanY * scale;
  const xFill = Math.min(1.35, (W - 32) / spanXScaled);
  const yFill = Math.min(1.35, (H - 32) / spanYScaled);
  return base.map((it) => ({
    ...it,
    x: cx + (it.x - cx) * Math.max(1, xFill),
    y: cy + (it.y - cy) * Math.max(1, yFill),
  }));
}

/* 高频词用粗圆艺术字（站酷快乐体），低频词保持幼圆 */
const DISPLAY_THRESHOLD = 5;
const ROUND_STACK =
  '"YouYuan", "Yuanti SC", "幼圆", "LXGW WenKai", "PingFang SC", sans-serif';

/* 词云调色板：按词频排名固定顺序取色（墨绿 → 苔深 → 琥珀 → 雾蓝 → 叶绿 → 浅叶绿） */
const CLOUD_PALETTE = ["#3a4a38", "#6f9e5d", "#c9a86a", "#8a9bb5", "#90b97b", "#b7d8a8"];

export function WordCloud() {
  const packed = packWords(cloudWords);
  // 词频排名（用于固定取色，不随机）
  const rankOf = new Map(
    [...cloudWords]
      .sort((a, b) => b.count - a.count)
      .map((w, i) => [w.word, i])
  );
  return (
    <div>
      <svg
        viewBox="0 0 560 300"
        className="h-auto w-full"
        role="img"
        aria-label="访谈回答关键词词云"
      >
        {packed.map((w, i) => {
          const rank = rankOf.get(w.word) ?? 0;
          const fill = CLOUD_PALETTE[Math.min(rank, CLOUD_PALETTE.length - 1)];
          const opacity = rank < 5 ? 0.9 : rank < 8 ? 0.72 : 0.5;
          return (
            <motion.text
              key={w.word}
              x={w.x}
              y={w.y}
              fontSize={w.size}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={fill}
              fillOpacity={opacity}
              fontFamily={
                w.count >= DISPLAY_THRESHOLD
                  ? `"ZCOOL KuaiLe", ${ROUND_STACK}`
                  : ROUND_STACK
              }
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              className="cursor-default"
            >
              {w.word}
              <title>{`「${w.word}」在访谈回答中出现 ${w.count} 次`}</title>
            </motion.text>
          );
        })}
      </svg>
      <p className="mt-2 text-xs font-light leading-6 text-moss-ink/40">
        词频来自 6 份测试文档的访谈回答 · 词越大越常被提到
      </p>
    </div>
  );
}
