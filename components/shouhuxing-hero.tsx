"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { hashString } from "@/components/spread-layout";
import { Project, Domain, domainTextClass, domainBgClass } from "@/lib/content";

/* easeInOutCubic（规格：越靠近中心越慢，像万有引力） */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const MotionLink = motion.create(Link);

/* ------------------------------------------------------------------ */
/*  家属每天面对、却没有答案的问题                                       */
/*                                                                      */
/*  x / y：句子在屏幕上的初始位置，取值范围 0–1（相对于视口宽/高）        */
/*  fontSize：可选，默认 20。调整位置时注意避开中心区域*/
/* ------------------------------------------------------------------ */

const SENTENCES = [
  { text: "今天药吃了吗？",       x: 0.12, y: 0.18, fontSize: 24 },
  { text: "为什么一直不说话？",    x: 0.72, y: 0.10, fontSize: 20 },
  { text: "什么时候该去医院？",    x: 0.25, y: 0.30, fontSize: 28 },
  { text: "是不是副作用？",        x: 0.50, y: 0.22, fontSize: 24 },
  { text: "他已经不认识我了……",   x: 0.10, y: 0.42, fontSize: 22 },
  { text: "我好累",               x: 0.85, y: 0.28, fontSize: 33 },
  { text: "我是不是做错了？",      x: 0.34, y: 0.58, fontSize: 34 },
  { text: "今天又没睡……",         x: 0.25, y: 0.90, fontSize: 20 },
  { text: "不敢告诉别人",          x: 0.14, y: 0.75, fontSize: 26 },
  { text: "什么时候才能好起来？",   x: 0.88, y: 0.70, fontSize: 22 },
  { text: "我还能坚持多久？",      x: 0.45, y: 0.82, fontSize: 24 },
  { text: "没人能理解……",         x: 0.75, y: 0.90, fontSize: 20 },
  { text: "为什么偏偏是我们",       x: 0.60, y: 0.65, fontSize: 30 },
  { text: "他以前不是这样的",       x: 0.40, y: 0.10, fontSize: 25 },
  { text: "我是不是不够好",         x: 0.92, y: 0.45, fontSize: 24 },
  { text: "到底有没有希望",         x: 0.65, y: 0.35, fontSize: 28 },

];

// Seconds on the internal clock; scrolling only starts this clock once.
const CONVERGE_THRESHOLD = 0.30;
const SENTENCE_INTERVAL = 0.40;
const SENTENCE_DURATION = 1.50;
const DISSOLVE_DURATION = 0.18;
const LAST_ARRIVAL = (SENTENCES.length - 1) * SENTENCE_INTERVAL + SENTENCE_DURATION;
const HEARTBEAT_AT = LAST_ARRIVAL + DISSOLVE_DURATION;
const TITLE_AT = HEARTBEAT_AT + 0.50 + 0.15;
const SEQUENCE_END = TITLE_AT + 1.22;

const NIGHT = "#152135";
const STAR_CORE = "radial-gradient(circle at 35% 35%, #f2fdfa, #35c9b8 55%, #15b7a8 100%)";

/* ------------------------------------------------------------------ */
/*  顶部导航栏（动画版：夜空阶段隐藏，星出现时淡入，颜色随背景变亮）     */
/* ------------------------------------------------------------------ */

function AnimatedTopBar({
  domain,
  progress,
  windowScroll,
  heroEnd,
}: {
  domain: Domain;
  progress: MotionValue<number>;
  windowScroll: MotionValue<number>;
  heroEnd: number;
}) {
  const opacity = useTransform(progress, [0.56, 0.7], [0, 1]);
  const pointer = useTransform(progress, [0.56, 0.7], ["none", "auto"] as const);
  // 顶部始终保留深色 → hero 内顶栏保持亮色；离开 hero 进入浅色正文时过渡为墨色
  const linkColor = useTransform(
    windowScroll,
    [heroEnd - 120, heroEnd],
    ["rgba(238,242,247,0.8)", "rgba(58,74,56,0.7)"]
  );
  const textClass = domainTextClass[domain.id];

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10"
      style={{ opacity, pointerEvents: pointer }}
    >
      <MotionLink
        href={`/${domain.id}`}
        className="text-sm font-light tracking-wide transition-colors duration-500"
        style={{ color: linkColor }}
      >
        ← 回到 {domain.label}
      </MotionLink>
      <span className="flex items-center gap-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-light ${textClass}/80`}
        >
          {domain.sub}
        </span>
        <MotionLink
          href="/"
          className="text-lg font-light tracking-tight transition-colors duration-500 sm:text-xl"
          style={{ color: linkColor }}
        >
          Project Moss
        </MotionLink>
      </span>
    </motion.header>
  );
}

function StaticTopBar({ domain }: { domain: Domain }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-4 sm:px-10 lg:py-5">
      <div className="relative flex items-center justify-between gap-3">
        <Link
          href={`/${domain.id}`}
          className="min-w-0 truncate text-sm font-light tracking-wide text-moss-ink/60 transition-colors duration-500 hover:text-moss-ink"
        >
          <span className="sm:hidden">← {domain.label}</span>
          <span className="hidden sm:inline">← 回到 {domain.label}</span>
        </Link>
        <span className="flex shrink-0 items-center gap-3 sm:gap-5">
          <span
            className={`hidden items-center gap-1.5 rounded-full bg-white/55 px-3 py-1 text-xs font-light text-moss-ink/60 ring-1 ring-white/70 sm:inline-flex`}
          >
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${domainBgClass[domain.id]}`} />
            {domain.sub}
          </span>
          <Link
            href="/"
            className="text-lg font-light tracking-tight text-moss-ink/75 transition-colors duration-500 hover:text-moss-ink sm:text-xl"
          >
            Project Moss
          </Link>
        </span>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  闪烁星点 — 确定性散点，缓慢呼吸                                     */
/* ------------------------------------------------------------------ */

function TwinkleStars({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => {
        const h = hashString(`star-${i}`);
        // 用 index 乘大质数分散坐标，避免 hash 值太接近导致星星扎堆
        const x = (((h ^ (i * 7919)) >>> 0) % 100000) / 1000;
        const y = ((((h >>> 3) ^ (i * 6271)) >>> 0) % 92000) / 1000;
        return {
          x,
          y,
          r: 0.4 + ((h >>> (i % 17)) % 12) / 10, // 0.4–1.5px
          twinkleSpeed: 0.0008 + ((h >>> (8 + (i % 7))) % 5) / 1000,
          phase: ((h >>> (16 + (i % 5))) % 628) / 100,
          brightness: 0.25 + ((h >>> (i % 13)) % 7) / 10, // 0.25–0.85
          glow: ((h >>> (i % 11)) % 10) < 1,
        };
      }),
    []
  );

  const containerOpacity = useTransform(progress, [0.66, 0.84], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const t = performance.now();
      for (const s of stars) {
        const alpha = s.brightness * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.phase));
        const x = (s.x / 100) * w;
        const y = (s.y / 100) * h;

        if (s.glow) {
          // 带微光的大星
          const grd = ctx.createRadialGradient(x, y, 0, x, y, s.r * 2.5);
          grd.addColorStop(0, `rgba(186,240,231,${alpha})`);
          grd.addColorStop(0.4, `rgba(186,240,231,${alpha * 0.3})`);
          grd.addColorStop(1, "rgba(186,240,231,0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // 星核
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 普通小白点
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stars]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ opacity: containerOpacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  漂浮句子 — 阶段1-2 慢速 sin+cos 漂移；阶段4 向中心收敛；阶段5 消散   */
/* ------------------------------------------------------------------ */

function FloatingSentence({
  sentence,
  elapsed,
  center,
  rank,
}: {
  sentence: { text: string; x: number; y: number; fontSize?: number };
  elapsed: MotionValue<number>;
  center: { x: number; y: number };
  /** 0-based 排名：0 = 离中心最近，最先进入 */
  rank: number;
}) {
  const text = sentence.text;
  const driftRef = useRef<HTMLDivElement>(null);

  const meta = useMemo(() => {
    const h = hashString(text);
    return {
      baseX: sentence.x * window.innerWidth,
      baseY: sentence.y * window.innerHeight,
      fontSize: sentence.fontSize ?? 20,
      opacity: 0.2 + ((h >> 7) % 5) * 0.07,
      rotate: ((h >> 9) % 7) - 3,
      amp: 6 + ((h >> 11) % 4) * 4,
      speed: 0.00012 + ((h >> 13) % 5) * 0.00002,
      p1: ((h >> 15) % 628) / 100,
      p2: ((h >> 17) % 628) / 100,
    };
  }, [sentence, text]);

  // 漂移：rAF 直接写 inner transform，不触发 React 重渲染
  useEffect(() => {
    let raf: number;
    let frozenDrift: { x: number; y: number } | null = null;
    const tick = () => {
      const el = driftRef.current;
      if (el) {
        const t = performance.now();
        const local = elapsed.get() - rank * SENTENCE_INTERVAL;
        const driftX = Math.sin(t * meta.speed + meta.p1) * meta.amp;
        const driftY = Math.cos(t * meta.speed * 1.4 + meta.p2) * meta.amp * 0.85;
        if (local >= 0 && !frozenDrift) frozenDrift = { x: driftX, y: driftY };
        const factor = 1 - easeInOutCubic(Math.max(0, Math.min(1, local / SENTENCE_DURATION)));
        const dx = frozenDrift ? frozenDrift.x * factor : driftX;
        const dy = frozenDrift ? frozenDrift.y * factor : driftY;
        el.style.transform = `rotate(${meta.rotate}deg) translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [meta, elapsed, rank]);

  // 逐个进入中心：最近（rank=0）最早，最远最晚，直线慢飞
  const convergeStart = rank * SENTENCE_INTERVAL;
  const convergeEnd = convergeStart + SENTENCE_DURATION;

  // 直线飞入：直接从初始位置平滑移动到中心
  const x = useTransform(elapsed, [convergeStart, convergeEnd], [meta.baseX, center.x], {
    ease: easeInOutCubic,
  });
  const y = useTransform(elapsed, [convergeStart, convergeEnd], [meta.baseY, center.y], {
    ease: easeInOutCubic,
  });

  // 抵达中心后消散：在汇聚窗口结束后的 dissolveDuration 内淡出
  const dissolveDuration = DISSOLVE_DURATION;
  const dissolveEnd = convergeEnd + dissolveDuration;

  // 完整生命周期：漂浮 → 汇聚（保持不透明） → 消散 → 隐藏
  const sentenceOpacity = useTransform(elapsed, (v) => {
    if (v < convergeStart) return meta.opacity;
    if (v < convergeEnd) return meta.opacity;
    if (v < dissolveEnd) {
      const t = (v - convergeEnd) / dissolveDuration;
      return meta.opacity * (1 - t);
    }
    return 0;
  });
  const sentenceScale = useTransform(elapsed, (v) => {
    if (v < convergeEnd) return 1;
    if (v < dissolveEnd) {
      const t = (v - convergeEnd) / dissolveDuration;
      return 1 - 0.25 * t;
    }
    return 0.75;
  });
  const sentenceBlur = useTransform(elapsed, (v) => {
    if (v < convergeEnd) return 0;
    if (v < dissolveEnd) {
      const t = (v - convergeEnd) / dissolveDuration;
      return 6 * t;
    }
    return 6;
  });
  const sentenceFilter = useMotionTemplate`blur(${sentenceBlur}px)`;

  return (
    <motion.div
      className="pointer-events-none absolute z-10"
      style={{
        left: x,
        top: y,
        x: "-50%",
        y: "-50%",
        opacity: sentenceOpacity,
        scale: sentenceScale,
        filter: sentenceFilter,
      }}
    >
      <div ref={driftRef} className="will-change-transform">
        <span
          className="font-wenkai whitespace-nowrap"
          style={{ fontSize: meta.fontSize, color: "rgba(232,240,246,0.92)" }}
        >
          {text}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  粒子爆发 — 阶段5：散落的光点向中心汇聚，最终落入星里                 */
/* ------------------------------------------------------------------ */

function ParticleBurst({
  progress,
  center,
}: {
  progress: MotionValue<number>;
  center: { x: number; y: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const palette = ["255,255,255", "222,248,243", "21,183,168"];
    const particles = Array.from({ length: 300 }, (_, i) => {
      const hh = hashString(`burst-${i}`);
      const angle = ((hh % 628) / 100);
      const radius = 90 + ((hh >> 3) % 340);
      return {
        sx: center.x + Math.cos(angle) * radius,
        sy: center.y + Math.sin(angle) * radius,
        size: 1 + ((hh >> 5) % 3) * 0.7,
        color: palette[(hh >> 7) % 3],
        wob: ((hh >> 9) % 628) / 100,
      };
    });

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let raf: number;
    const draw = () => {
      const p = progress.get();
      const t = (p - 0.56) / 0.16; // 0.56 → 0.72 收敛窗口
      ctx.clearRect(0, 0, w, h);
      if (t > 0 && t < 1) {
        const e = easeInOutCubic(t);
        const now = performance.now();
        for (const pt of particles) {
          const wobble = Math.sin(now * 0.001 + pt.wob) * 3 * (1 - e);
          const px = pt.sx + (center.x - pt.sx) * e + wobble;
          const py = pt.sy + (center.y - pt.sy) * e - wobble * 0.6;
          ctx.globalAlpha = Math.max(0, (1 - t) * 0.7);
          ctx.fillStyle = `rgba(${pt.color}, ${ctx.globalAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [center.x, center.y, progress]);

  const canvasOpacity = useTransform(progress, [0.72, 0.78], [1, 0]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20"
      style={{ opacity: canvasOpacity }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  星 — 最亮的一颗，心跳一次                                          */
/* ------------------------------------------------------------------ */

function StarGlow({
  elapsed,
  glowIntensity,
}: {
  elapsed: MotionValue<number>;
  /** 0–1，每有一个句子抵达中心就亮一分 */
  glowIntensity: MotionValue<number>;
}) {
  const [pulsed, setPulsed] = useState(false);
  useMotionValueEvent(elapsed, "change", (v) => {
    if (v >= HEARTBEAT_AT && !pulsed) setPulsed(true);
  });

  const baseOpacity = useTransform(glowIntensity, [0, 1 / SENTENCES.length], [0, 1]);
  // 亮度随句子抵达数从 0.35 升到 1.0
  const glowMultiplier = useTransform(glowIntensity, [0, 1], [0.35, 1.0]);

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[36%] z-30 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity: baseOpacity }}
      aria-hidden="true"
    >
      <motion.div
        animate={pulsed ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <motion.span
          className="absolute h-[80px] w-[80px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(116,215,208,0.18) 0%, transparent 70%)",
            opacity: glowMultiplier,
          }}
        />
        <motion.span
          className="absolute h-[30px] w-[30px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(178,239,232,0.38) 0%, transparent 70%)",
            opacity: glowMultiplier,
          }}
        />
        <motion.span
          className="relative h-[9px] w-[9px] rounded-full"
          style={{
            background: "radial-gradient(circle, #f4fffc 0%, #c5f2e9 28%, rgba(136,222,208,0.55) 55%, transparent 75%)",
            opacity: glowMultiplier,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  标题 — 星出现后淡入                                                */
/* ------------------------------------------------------------------ */

function TitleBlock({
  progress,
  subtitle,
}: {
  progress: MotionValue<number>;
  subtitle: string;
}) {
  // 星形成时标题开始淡入，到 0.78 后强制保持 1
  const opacity = useTransform(progress, (v) => (v >= 0.78 ? 1 : v <= 0.66 ? 0 : (v - 0.66) / 0.12));
  const y = useTransform(progress, [0.66, 0.78], [24, 0]);
  const color = "#ffffff";
  const subColor = "rgba(226,236,244,0.74)";

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[42%] z-30 w-full -translate-x-1/2 px-6 text-center"
      style={{ opacity, y }}
    >
      <motion.h1
        className="font-wenkai text-5xl font-light tracking-wide sm:text-6xl"
        style={{ color }}
      >
        守护星
      </motion.h1>
      <motion.p
        className="mt-5 text-sm font-light tracking-[0.035em] sm:text-base"
        style={{ color: subColor }}
      >
        Supporting the Ones Who Support
      </motion.p>
      <motion.p
        className="mx-auto mt-4 max-w-md text-xs font-light leading-relaxed sm:text-sm"
        style={{ color: "rgba(226,236,244,0.58)" }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  进入正文 — 动画停住后出现的箭头，点击收起深色页面                    */
/* ------------------------------------------------------------------ */

function ContinueArrow({
  progress,
  onEnter,
  ready,
}: {
  progress: MotionValue<number>;
  onEnter: () => void;
  ready: boolean;
}) {
  const opacity = useTransform(progress, [0.85, 0.93], [0, 1]);
  const color = useTransform(progress, [0.62, 0.80], ["rgba(238,242,247,0.65)", "rgba(40,66,72,0.8)"]);
  const pointer = useTransform(
    progress,
    [0.85, 0.93],
    ["none", "auto"] as const
  );

  return (
    <div className="absolute inset-x-0 bottom-8 z-40 flex justify-center">
      <motion.button
        onClick={onEnter}
        disabled={!ready}
        tabIndex={ready ? 0 : -1}
        aria-label="收起深色页面，进入正文"
        className="animate-float flex flex-col items-center gap-3 text-[#eef2f7]/65 transition-colors duration-500 hover:text-[#eef2f7]"
        style={{ opacity, pointerEvents: pointer, color }}
      >
        <span className="text-xs font-light tracking-[0.2em]">第一章</span>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  滚动到阈值后固定场景；汇聚完成后停在标题，点击第一章才进入正文       */
/* ------------------------------------------------------------------ */

function ScrollHero({ project, domain }: { project: Project; domain: Domain }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { scrollY: windowScroll } = useScroll();

  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- 客户端测量窗口尺寸前必须先挂载
  useEffect(() => setMounted(true), []);

  const elapsed = useMotionValue(-1);
  const sceneProgress = useMotionValue(0);
  const phase = useRef<"waiting" | "running" | "complete" | "entered">("waiting");
  const [ready, setReady] = useState(false);

  const center = useMemo(
    () =>
      mounted
        ? { x: window.innerWidth / 2, y: window.innerHeight * 0.36 }
        : { x: 0, y: 0 },
    [mounted]
  );

  // hero 结束点 = sticky 释放点（400vh 容器 − 100vh 视口）
  const heroEnd = useMemo(
    () => (mounted ? window.innerHeight * 3 : 0),
    [mounted]
  );

  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    let previousTime = 0;
    const anchor = () => {
      const element = containerRef.current;
      const top = element ? element.getBoundingClientRect().top + window.scrollY : 0;
      return top + window.innerHeight * 3 * CONVERGE_THRESHOLD;
    };
    const pin = () => window.scrollTo({ top: anchor(), behavior: "instant" });
    const tick = (now: number) => {
      // Pause in background tabs, rather than skipping the story on return.
      const delta = previousTime ? (now - previousTime) / 1000 : 0;
      previousTime = now;
      if (!document.hidden) elapsed.set(Math.min(SEQUENCE_END, elapsed.get() + Math.min(delta, 0.05)));
      const time = elapsed.get();
      const times = [0, LAST_ARRIVAL, HEARTBEAT_AT, TITLE_AT, TITLE_AT + 0.6, SEQUENCE_END];
      const values = [0.30, 0.60, 0.62, 0.66, 0.78, 0.93];
      let i = 0;
      while (i < times.length - 2 && time > times[i + 1]) i++;
      const fraction = Math.min(1, (time - times[i]) / (times[i + 1] - times[i]));
      sceneProgress.set(values[i] + (values[i + 1] - values[i]) * fraction);
      if (time < SEQUENCE_END) {
        raf = requestAnimationFrame(tick);
      } else {
        phase.current = "complete";
        setReady(true);
        // Keep the finished title pinned until the chapter button is activated.
        pin();
      }
    };
    const start = () => {
      if (phase.current !== "waiting") return;
      phase.current = "running"; // Synchronous guard against wheel/scroll races.
      elapsed.set(0);
      sceneProgress.set(CONVERGE_THRESHOLD);
      pin();
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (phase.current === "entered") return;
      if (phase.current === "running" || phase.current === "complete") {
        if (Math.abs(window.scrollY - anchor()) > 1) pin();
      } else if (window.scrollY >= anchor() - 1) {
        start();
      } else {
        sceneProgress.set(Math.min(CONVERGE_THRESHOLD, scrollYProgress.get()));
      }
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || phase.current === "entered") return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (phase.current === "running" || phase.current === "complete" || (delta > 0 && window.scrollY + delta >= anchor())) {
        event.preventDefault();
        start();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || phase.current === "entered") return;
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(event.key)) return;
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, button, a, [contenteditable]")) return;
      if (phase.current === "running" || phase.current === "complete" || event.key === "End") {
        event.preventDefault();
        start();
      }
    };
    const onTouchMove = (event: TouchEvent) => {
      if (phase.current === "running" || phase.current === "complete") event.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchmove", onTouchMove);
      // Strict Mode may set up this effect again after cleanup.
      if (phase.current === "running") phase.current = "waiting";
    };
  }, [mounted, elapsed, sceneProgress, scrollYProgress]);

  // 收起深色页面：回到顶部，同时折叠 hero，过渡完正文自然在视口里
  const [collapsed, setCollapsed] = useState(false);
  const enterBody = useCallback(() => {
    if (phase.current !== "complete") return;
    phase.current = "entered";
    window.scrollTo({ top: 0, behavior: "instant" });
    setCollapsed(true);
  }, []);

  // 天光从底部升起；标题区域保持深蓝，不叠加椭圆暗角。
  const brightBg = useTransform(sceneProgress, (v) => {
    const t = v < 0.62 ? 0 : v > 0.80 ? 1 : (v - 0.62) / 0.18;
    const tint = (r: number, g: number, b: number) =>
      `rgb(${Math.round(21 + (r - 21) * t)},${Math.round(33 + (g - 33) * t)},${Math.round(53 + (b - 53) * t)})`;
    return `linear-gradient(to bottom, ${NIGHT} 0%, ${NIGHT} 48%, ${tint(40,70,86)} 68%, ${tint(117,158,156)} 85%, ${tint(194,222,212)} 100%)`;
  });

  // 句子按距离中心排序：最近的 rank=0，最先进入
  const sortedSentences = useMemo(() => {
    if (!mounted) return SENTENCES.map((s, i) => ({ ...s, dist: 0, origIndex: i }));
    const withDist = SENTENCES.map((s, i) => {
      const sx = s.x * window.innerWidth;
      const sy = s.y * window.innerHeight;
      return { ...s, dist: Math.hypot(sx - center.x, sy - center.y), origIndex: i };
    });
    withDist.sort((a, b) => a.dist - b.dist);
    return withDist;
  }, [center.x, center.y, mounted]);

  // Only completed arrivals contribute light, one step per sentence.
  const centerGlow = useTransform(elapsed, (time) =>
    Math.max(0, Math.min(SENTENCES.length,
      Math.floor((time - SENTENCE_DURATION + 1e-6) / SENTENCE_INTERVAL) + 1
    )) / SENTENCES.length
  );

  return (
    <div
      ref={containerRef}
      className="relative transition-[height] duration-500 ease-out"
      style={{ height: collapsed ? "0px" : "400vh" }}
    >
      {mounted && !collapsed && (
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* 夜空：纯深色，不用渐变 */}
          <div className="absolute inset-0" style={{ background: NIGHT }} />

          {/* 从深蓝夜空过渡到底部浅青色天光 */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ background: brightBg }}
          />

          {/* 噪点纹理 */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* 星点 */}
          <TwinkleStars progress={sceneProgress} />

          {/* 漂浮的问题：按距离排序，最近的先进入中心 */}
          {sortedSentences.map((s, i) => (
            <FloatingSentence
              key={s.text}
              sentence={s}
              elapsed={elapsed}
              center={center}
              rank={i}
            />
          ))}

          {/* 粒子汇聚 */}
          <ParticleBurst progress={sceneProgress} center={center} />

          {/* 星：每个句子抵达时亮一分 */}
          <StarGlow elapsed={elapsed} glowIntensity={centerGlow} />

          {/* 标题 */}
          <TitleBlock progress={sceneProgress} subtitle={project.subtitle} />

          {/* 进入正文箭头（停住阶段淡入，点击收起深色页面） */}
          <ContinueArrow progress={sceneProgress} onEnter={enterBody} ready={ready} />

          {/* 顶栏 */}
          <AnimatedTopBar
            domain={domain}
            progress={sceneProgress}
            windowScroll={windowScroll}
            heroEnd={heroEnd}
          />
        </div>
      )}
      {/* hero 折叠后显示静态顶栏，替代消失的 AnimatedTopBar */}
      {collapsed && <StaticTopBar domain={domain} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  静态态 — 移动端 / 减少动态                                         */
/* ------------------------------------------------------------------ */

function StaticHero({ project, domain }: { project: Project; domain: Domain }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-shx-mint px-6 text-center">
      <StaticTopBar domain={domain} />
      <div className="relative flex items-center justify-center">
        <span
          className="absolute h-[60px] w-[60px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(21,183,168,0.25) 0%, transparent 65%)",
          }}
        />
        <span
          className="relative h-[14px] w-[14px] rounded-full"
          style={{ background: STAR_CORE }}
        />
      </div>
      <h1 className="mt-6 font-wenkai text-5xl font-light tracking-wide text-moss-ink sm:text-6xl">
        守护星
      </h1>
      <p className="mt-3 text-lg font-light tracking-[0.1em] text-moss-ink/70 sm:text-xl">
        Supporting the Ones Who Support
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm font-light text-moss-ink/60 sm:text-base">
        {project.subtitle}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  入口 — 移动端 / 减少动态走静态态                                    */
/* ------------------------------------------------------------------ */

export function ShouhuxingHero({
  project,
  domain,
}: {
  project: Project;
  domain: Domain;
}) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- matchMedia 只能在挂载后读取
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  if (reduced === true || isMobile) {
    return <StaticHero project={project} domain={domain} />;
  }

  return <ScrollHero project={project} domain={domain} />;
}
