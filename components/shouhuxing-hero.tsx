"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  motion,
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
/* ------------------------------------------------------------------ */

const SENTENCES = [
  "今天药吃了吗？",
  "为什么一直不说话？",
  "什么时候该去医院？",
  "是不是副作用？",
  "我是不是做错了？",
  "今天又没睡……",
  "我还能坚持多久？",
  "没人能理解……",
];

const NIGHT = "#0d1420";
const MINT = "#e5f4f1";
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
  const textClass = domainTextClass[domain.id];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10">
      <Link
        href={`/${domain.id}`}
        className="text-sm font-light tracking-wide text-moss-ink/50 transition-colors duration-500 hover:text-moss-ink"
      >
        ← 回到 {domain.label}
      </Link>
      <span className="flex items-center gap-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-light ${domainBgClass[domain.id]}/10 ${textClass}`}
        >
          {domain.sub}
        </span>
        <Link
          href="/"
          className="text-lg font-light tracking-tight text-moss-ink/70 transition-colors duration-500 hover:text-moss-ink sm:text-xl"
        >
          Project Moss
        </Link>
      </span>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  闪烁星点 — 确定性散点，缓慢呼吸                                     */
/* ------------------------------------------------------------------ */

function TwinkleStars({ progress }: { progress: MotionValue<number> }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => {
        const h = hashString(`star-${i}`);
        return {
          left: (h % 1000) / 10,
          top: ((h >> 3) % 880) / 10,
          size: 2 + ((h >> 5) % 3),
          duration: 4.5 + ((h >> 7) % 40) / 10,
          delay: ((h >> 9) % 50) / 10,
          glow: ((h >> 11) % 10) < 3,
        };
      }),
    []
  );
  // 背景变亮时星点退场
  const opacity = useTransform(progress, [0.66, 0.84], [1, 0]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: s.glow
                ? "rgba(186,240,231,0.9)"
                : "rgba(255,255,255,0.9)",
              boxShadow: s.glow
                ? "0 0 6px rgba(21,183,168,0.8)"
                : "0 0 4px rgba(255,255,255,0.5)",
              "--twinkle-duration": `${s.duration}s`,
              "--twinkle-delay": `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  漂浮句子 — 阶段1-2 慢速 sin+cos 漂移；阶段4 向中心收敛；阶段5 消散   */
/* ------------------------------------------------------------------ */

function FloatingSentence({
  text,
  progress,
  center,
}: {
  text: string;
  progress: MotionValue<number>;
  center: { x: number; y: number };
}) {
  const driftRef = useRef<HTMLDivElement>(null);

  const meta = useMemo(() => {
    const h = hashString(text);
    return {
      // 以屏幕中心对称分布（10%–90%），避免整体偏一侧
      baseX:
        (0.5 + (((h >> 1) % 1001) - 500) / 1000) * 0.8 * window.innerWidth +
        window.innerWidth * 0.1,
      baseY: 0.1 + (((h >> 3) % 72) / 100) * window.innerHeight, // 10%–82%
      fontSize: 20 + ((h >> 5) % 3) * 4, // 20 / 24 / 28px
      opacity: 0.2 + ((h >> 7) % 5) * 0.07, // 0.2–0.48 偏透明
      rotate: ((h >> 9) % 7) - 3, // -3°–3°
      amp: 6 + ((h >> 11) % 4) * 4, // 漂移幅度 6–18px
      speed: 0.00012 + ((h >> 13) % 5) * 0.00002, // 每帧角速度
      p1: ((h >> 15) % 628) / 100,
      p2: ((h >> 17) % 628) / 100,
    };
  }, [text]);

  // 漂移：rAF 直接写 inner transform，不触发 React 重渲染
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const el = driftRef.current;
      if (el) {
        const t = performance.now();
        const factor = progress.get() < 0.3 ? 1 : 0;
        const dx = Math.sin(t * meta.speed + meta.p1) * meta.amp * factor;
        const dy = Math.cos(t * meta.speed * 1.4 + meta.p2) * meta.amp * 0.85 * factor;
        el.style.transform = `rotate(${meta.rotate}deg) translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [meta, progress]);

  // 螺旋汇聚（0.30–0.62）：半径缓入缓出缩向中心，角度同时旋转
  // 1.5–2.4 圈（方向由哈希决定），越靠近中心越慢，像被引力卷进去
  const spiral = useMemo(() => {
    const h = hashString(`${text}-spiral`);
    const dx = meta.baseX - center.x;
    const dy = meta.baseY - center.y;
    const startR = Math.sqrt(dx * dx + dy * dy);
    const startTheta = Math.atan2(dy, dx);
    const dir = (h & 1) === 0 ? 1 : -1;
    const turns = dir * (1.5 + ((h >> 1) % 10) / 10);
    return { startR, startTheta, turns };
  }, [meta.baseX, meta.baseY, center.x, center.y, text]);

  const radius = useTransform(progress, [0.3, 0.62], [spiral.startR, 0], {
    ease: easeInOutCubic,
  });
  const angle = useTransform(
    progress,
    [0.3, 0.62],
    [spiral.startTheta, spiral.startTheta + spiral.turns * Math.PI * 2],
    { ease: easeInOutCubic }
  );
  const x = useTransform([radius, angle], ([r, a]: number[]) => center.x + r * Math.cos(a));
  const y = useTransform([radius, angle], ([r, a]: number[]) => center.y + r * Math.sin(a));

  // 消散（0.58–0.74）：文字变成光
  const opacity = useTransform(progress, [0.58, 0.74], [meta.opacity, 0]);
  const blurMV = useTransform(progress, [0.58, 0.74], [0, 6]);
  const scale = useTransform(progress, [0.58, 0.74], [1, 0.75]);
  const filter = useMotionTemplate`blur(${blurMV}px)`;

  return (
    <motion.div
      className="pointer-events-none absolute z-10"
      style={{ left: x, top: y, x: "-50%", y: "-50%", opacity, scale, filter }}
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

function StarGlow({ progress }: { progress: MotionValue<number> }) {
  const [pulsed, setPulsed] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    if (v > 0.74 && !pulsed) setPulsed(true);
  });

  const opacity = useTransform(progress, [0.66, 0.72], [0, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[36%] z-30 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity }}
      aria-hidden="true"
    >
      <motion.div
        animate={pulsed ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <span
          className="absolute h-[60px] w-[60px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(21,183,168,0.35) 0%, transparent 65%)",
          }}
        />
        <span
          className="absolute h-[30px] w-[30px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(21,183,168,0.5) 0%, transparent 70%)",
          }}
        />
        <span className="relative h-[14px] w-[14px] rounded-full" style={{ background: STAR_CORE }} />
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
  // 星形成时标题开始淡入，到 0.78 完全不透明并保持不变
  const opacity = useTransform(progress, [0.66, 0.78], [0, 1]);
  const y = useTransform(progress, [0.66, 0.78], [24, 0]);
  // 顶部始终保留深色 → 标题保持夜空亮色，全部不透明
  const color = "#eef2f7";
  const subColor = "#eef2f7";

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[46%] z-30 w-full -translate-x-1/2 px-6 text-center"
      style={{ opacity, y }}
    >
      <motion.h1
        className="font-wenkai text-5xl font-light tracking-wide sm:text-6xl"
        style={{ color }}
      >
        守护星
      </motion.h1>
      <motion.p
        className="mt-3 text-lg font-light tracking-[0.1em] sm:text-xl"
        style={{ color: subColor }}
      >
        Supporting the Ones Who Support
      </motion.p>
      <motion.p
        className="mx-auto mt-2 max-w-md text-sm font-light sm:text-base"
        style={{ color: subColor }}
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
}: {
  progress: MotionValue<number>;
  onEnter: () => void;
}) {
  const opacity = useTransform(progress, [0.85, 0.93], [0, 1]);
  const pointer = useTransform(
    progress,
    [0.85, 0.93],
    ["none", "auto"] as const
  );

  return (
    <div className="absolute inset-x-0 bottom-8 z-40 flex justify-center">
      <motion.button
        onClick={onEnter}
        aria-label="收起深色页面，进入正文"
        className="animate-float flex flex-col items-center gap-1 rounded-full border border-shx-teal/50 bg-shx-card/90 px-6 py-2.5 text-shx-teal shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-shx-teal hover:text-white"
        style={{ opacity, pointerEvents: pointer }}
      >
        <span className="text-sm font-light tracking-[0.2em]">第一章</span>
        <span className="text-base leading-none">↓</span>
      </motion.button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  滚动驱动 Hero — 400vh：动画放慢约四倍；标题界面锁死滚动，            */
/*  只能点击箭头收起深色页面进入正文                                    */
/* ------------------------------------------------------------------ */

function ScrollHero({ project, domain }: { project: Project; domain: Domain }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { scrollY: windowScroll } = useScroll();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 点击箭头后解锁；解锁前滚动到标题界面即被锁死
  const [unlocked, setUnlocked] = useState(false);

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

  // 标题界面完整呈现（progress 0.93，标题/箭头/背景变浅均已完成）后锁死
  // 滚动：下滚被 wheel 拦截 + scroll 拉回兜底（键盘等），上滚不受影响
  useEffect(() => {
    if (unlocked || !mounted) return;
    const lockAt = window.innerHeight * 3 * 0.93;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // 保留 Ctrl+滚轮缩放
      if (e.deltaY > 0 && window.scrollY >= lockAt - 2) {
        e.preventDefault();
        if (window.scrollY > lockAt) window.scrollTo(0, lockAt);
      }
    };
    const onScroll = () => {
      if (window.scrollY > lockAt) window.scrollTo(0, lockAt);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [unlocked, mounted]);

  // 收起深色页面：解锁并平滑滚到容器底，正文第一屏进入视口
  const enterBody = useCallback(() => {
    setUnlocked(true);
    window.scrollTo({ top: window.innerHeight * 4, behavior: "smooth" });
  }, []);

  // 句子汇聚完成后（~62%）下方开始变浅，80% 完成，之后停住
  const bgBrighten = useTransform(scrollYProgress, [0.62, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      {mounted && (
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* 夜空：纯深色，不用渐变 */}
          <div className="absolute inset-0" style={{ background: NIGHT }} />

          {/* 顶部保留深色、下方渐亮为浅青（句子汇聚之后开始） */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: bgBrighten,
              background: `linear-gradient(to bottom, ${NIGHT} 0%, ${NIGHT} 38%, ${MINT} 88%)`,
            }}
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
          <TwinkleStars progress={scrollYProgress} />

          {/* 漂浮的问题 */}
          {SENTENCES.map((s) => (
            <FloatingSentence
              key={s}
              text={s}
              progress={scrollYProgress}
              center={center}
            />
          ))}

          {/* 粒子汇聚 */}
          <ParticleBurst progress={scrollYProgress} center={center} />

          {/* 星 */}
          <StarGlow progress={scrollYProgress} />

          {/* 标题 */}
          <TitleBlock progress={scrollYProgress} subtitle={project.subtitle} />

          {/* 进入正文箭头（停住阶段淡入，点击收起深色页面） */}
          <ContinueArrow progress={scrollYProgress} onEnter={enterBody} />

          {/* 顶栏 */}
          <AnimatedTopBar
            domain={domain}
            progress={scrollYProgress}
            windowScroll={windowScroll}
            heroEnd={heroEnd}
          />
        </div>
      )}
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
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  if (reduced === true || isMobile) {
    return <StaticHero project={project} domain={domain} />;
  }

  return <ScrollHero project={project} domain={domain} />;
}
