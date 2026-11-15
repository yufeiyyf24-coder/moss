"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LakeLayer } from "@/components/lake-layer";
import { WindLayer } from "@/components/wind-layer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface SecondaryProject {
  title: string;
  sub: string;
  href: string;
}

interface Flagship {
  id: string;
  section: string;
  sectionNote?: string;
  sectionEn: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  headline: string;
  description: string;
  role: string;
  method: string;
  result: string;
  href: string;
  visual: "research" | "ai" | "image";
  image?: string;
  secondary: SecondaryProject[];
}

const FLAGSHIPS: Flagship[] = [
  {
    id: "research",
    section: "用户研究",
    sectionEn: "UNDERSTAND PEOPLE",
    title: "守护星",
    subtitle: "照护者支持工具",
    eyebrow: "RESEARCH / SERVICE DESIGN",
    headline: "从照护者的日常，寻找真正需要的支持。",
    description:
      "从照护者真实场景出发，围绕复诊与日常照护需求，完成产品结构与核心流程设计。不是用药提醒 App，而是从家属每天面对却没有答案的问题出发，重建一套可被使用的支持流程。",
    role: "用户研究 / 交互设计",
    method: "专家访谈 + 家属代理访谈 / 2 个 Persona / 3 张旅程地图 / 6 个设计机会点",
    result: "6 位家属可用性测试 / SUS 84 / 网页 Demo",
    href: "/mind/shouhuxing",
    visual: "image",
    image: "/projects/shouhuxing/cover-final.webp",
    secondary: [
      {
        title: "哮喘环境守护",
        sub: "22 份问卷 / 呼吸灯替代数字屏",
        href: "/mind/asthma",
      },
      {
        title: "安途",
        sub: "C-PTSD 双场景调节系统",
        href: "/mind/cptsd",
      },
      {
        title: "ADHD 专注辅助副屏",
        sub: "鱼骨图 / 课堂注意力定锚",
        href: "/living/moor",
      },
      {
        title: "麟航",
        sub: "儿童环境安全监测无人机",
        href: "/living/linhang",
      },
    ],
  },
  {
    id: "ai",
    section: "AI 探索",
    sectionEn: "BUILD & EXPERIMENT",
    title: "洄",
    subtitle: "AI 桌宠",
    eyebrow: "AI / MODEL EXPERIMENT",
    headline: "不止使用 AI，也尝试理解与构建它。",
    description:
      "从模型训练到角色体验，验证 AI 的说话方式、人格一致性与陪伴感。73M 中文对话模型，从数据构建、BPE 分词到多轮迭代，完整走通了一遍「造一个小 AI」的流程。",
    role: "独立开发",
    method: "73M 中文对话模型 / 数据构建 / BPE 分词 / 多轮迭代 / PyTorch",
    result: "桌面猫 AI / 人格一致性 / 提示词与状态机",
    href: "/ai/xiaoji",
    visual: "image",
    image: "/projects/xiaoji/cover-standing.png",
    secondary: [
      {
        title: "我与 AI",
        sub: "从使用到协作的记录",
        href: "/ai/ai-thoughts",
      },
    ],
  },
];

interface HeroCard {
  position: string;
  duration: string;
  delay: string;
  title: string;
  sub: string;
  href: string;
  kind: "star" | "ai" | "texture" | "image";
  image?: string;
}

const HERO_CARDS: HeroCard[] = [
  {
    position: "left-[2%] top-[9%]",
    duration: "11s",
    delay: "0s",
    title: "守护星",
    sub: "照护者支持",
    href: "#research",
    kind: "image",
    image: "/projects/shouhuxing/cover-final.webp",
  },
  {
    position: "left-[13%] top-[38%]",
    duration: "13s",
    delay: "-3s",
    title: "用户访谈记录",
    sub: "研究过程",
    href: "#research",
    kind: "texture",
  },
  {
    position: "left-[0%] top-[64%]",
    duration: "9s",
    delay: "-1.5s",
    title: "问卷洞察",
    sub: "研究过程",
    href: "#research",
    kind: "texture",
  },
  {
    position: "right-[12%] top-[8%]",
    duration: "12s",
    delay: "-4s",
    title: "洄",
    sub: "AI 桌宠",
    href: "#ai",
    kind: "image",
    image: "/projects/xiaoji/cover-standing.png",
  },
  {
    position: "right-[1%] top-[34%]",
    duration: "10s",
    delay: "-2s",
    title: "此刻",
    sub: "状态记录",
    href: "#visual",
    kind: "image",
    image: "/projects/cike/cover-final.webp",
  },
  {
    position: "right-[13%] top-[58%]",
    duration: "14s",
    delay: "-6s",
    title: "卷卷",
    sub: "IP · UI",
    href: "#visual",
    kind: "image",
    image: "/projects/juanjuan/sketch-room.webp",
  },
  {
    position: "right-[2%] top-[70%]",
    duration: "11s",
    delay: "-5s",
    title: "视觉笔记",
    sub: "图像与观察",
    href: "#visual",
    kind: "texture",
  },
];

interface VisualProject {
  title: string;
  sub: string;
  href?: string;
  image?: string;
  note?: string;
}

interface VisualGroup {
  id: string;
  label: string;
  en: string;
  note?: string;
  projects: VisualProject[];
  fallbackHref?: string;
  fallbackLabel?: string;
}

const VISUAL_GROUPS: VisualGroup[] = [
  {
    id: "ui",
    label: "UI 设计",
    en: "Interface",
    projects: [
      {
        title: "卷卷",
        sub: "灵能卷卷 / 内容策划 · UI · IP",
        href: "/visual/juanjuan",
        image: "/projects/juanjuan/sketch-room.webp",
        note: "实习中",
      },
      {
        title: "此刻",
        sub: "状态记录与复诊辅助 / 独立设计开发",
        href: "/mind/cike",
        image: "/projects/cike/cover-final.webp",
      },
      {
        title: "小家",
        sub: "手机 AI 陪伴 App",
        image: "/projects/xiaojia/cover-ai-v2.webp",
        note: "进行中",
      },
    ],
  },
  {
    id: "ip",
    label: "IP 设计",
    en: "Character / IP",
    note: "图像待补——等你给图",
    projects: [
      {
        title: "夜鹭",
        sub: "实体 + 数字陪伴产品 / IP · 交互",
        note: "待补图",
      },
    ],
  },
  {
    id: "illustration",
    label: "插画与漫画",
    en: "Illustration / Comic",
    note: "作品待补",
    projects: [],
    fallbackHref: "/visual/visual-notes",
    fallbackLabel: "先看",
  },
  {
    id: "photography",
    label: "摄影",
    en: "Photography",
    note: "作品待补",
    projects: [],
    fallbackHref: "/visual/visual-notes",
    fallbackLabel: "先看",
  },
];

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function HeroCardThumb({ card }: { card: HeroCard }) {
  return (
    <span className="relative block aspect-square overflow-hidden rounded-[14px] border border-[#ccd2c6] bg-[#e2e8dc] transition-[outline-color,transform] duration-200 hover:outline hover:outline-2 hover:outline-offset-4 hover:outline-[#617a5e]">
      {card.kind === "image" && card.image ? (
        <Image
          src={card.image}
          alt=""
          fill
          sizes="136px"
          className="object-cover"
        />
      ) : card.kind === "star" ? (
        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dce7d8] to-[#f3f3ec]">
          <svg
            viewBox="0 0 100 100"
            className="h-[68%] w-[68%] text-[#617a5e]"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="30"
              y="9"
              width="40"
              height="82"
              rx="9"
              stroke="currentColor"
              strokeWidth="1.1"
              opacity="0.55"
            />
            <path
              d="M50 36l4.1 8.7 9.6 1.2-7 6.6 1.8 9.5-8.5-4.6-8.5 4.6 1.8-9.5-7-6.6 9.6-1.2L50 36z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="78" r="1" fill="currentColor" />
          </svg>
        </span>
      ) : card.kind === "ai" ? (
        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#e3e5f1] to-[#f3f3ec]">
          <svg
            viewBox="0 0 100 100"
            className="h-[68%] w-[68%] text-[#617a5e]"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="22"
              stroke="currentColor"
              strokeWidth="1.1"
              opacity="0.65"
            />
            <rect
              x="39"
              y="39"
              width="22"
              height="22"
              transform="rotate(45 50 50)"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path
              d="M14 50h72"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.45"
            />
            <circle cx="50" cy="50" r="1.2" fill="currentColor" />
          </svg>
        </span>
      ) : (
        <span className="career-texture block h-full w-full" aria-hidden="true" />
      )}
    </span>
  );
}

function HeroCardLink({ card }: { card: HeroCard }) {
  return (
    <a
      href={card.href}
      aria-label={`${card.title}，${card.sub}`}
      className={`career-card pointer-events-auto absolute ${card.position} block w-[clamp(108px,9.5vw,136px)]`}
      style={
        {
          "--career-float-duration": card.duration,
          "--career-float-delay": card.delay,
        } as CSSProperties
      }
    >
      <HeroCardThumb card={card} />
      <span className="mt-2.5 block text-[12px] leading-5 text-[#737e74]">
        <b className="font-normal text-[#303b35]">{card.title}</b>
        {card.sub ? ` · ${card.sub}` : ""}
      </span>
    </a>
  );
}

function SectionHead({
  title,
  note,
  en,
  number,
}: {
  title: string;
  note?: string;
  en: string;
  number: number;
}) {
  return (
    <div className="relative mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:gap-6">
      <span
        className="absolute h-2.5 w-2.5 rounded-full border border-[#617a5e] bg-[#f3f3ec]"
        style={{ left: "calc(-6vw - 5px)", top: 20 }}
        aria-hidden="true"
      />
      <h2 className="font-editorial text-[25px] font-normal sm:text-[29px]">
        {title}
        {note && (
          <span className="block text-[13px] font-normal tracking-normal text-[#737e74] sm:ml-2 sm:inline sm:text-[15px]">
            {note}
          </span>
        )}
      </h2>
      <span className="hidden font-mono text-[10px] tracking-[1px] text-[#737e74] sm:inline sm:text-[11px]">
        0{number} / {en}
      </span>
    </div>
  );
}

function VisualCard({ project }: { project: VisualProject }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden border border-[#ccd2c6] bg-[#e2e8dc]">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dce7d8] to-[#f3f3ec]">
            <svg
              viewBox="0 0 120 120"
              className="h-20 w-20 text-[#617a5e]"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="38"
                y="18"
                width="44"
                height="84"
                rx="12"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M48 38h24M48 46h16"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <circle cx="60" cy="78" r="1.2" fill="currentColor" />
            </svg>
          </span>
        )}
        {project.note && (
          <span className="absolute bottom-3 left-3 bg-[#f3f3ec]/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#737e74]">
            {project.note}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="text-[14px]">{project.title}</span>
        <span className="text-[11px] text-[#737e74]">{project.sub}</span>
      </div>
    </>
  );

  return project.href ? (
    <Link href={project.href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group block">{body}</div>
  );
}

function VisualGroup({ group }: { group: VisualGroup }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#ccd2c6] pb-2">
        <h3 className="font-editorial text-[19px] font-normal">
          {group.label}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#737e74]">
          {group.en}
        </span>
        {group.note && (
          <span className="ml-auto text-[11px] text-[#737e74]">
            {group.note}
          </span>
        )}
      </div>

      {group.projects.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {group.projects.map((project) => (
            <VisualCard key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[180px] items-center justify-center border border-dashed border-[#ccd2c6] bg-[#e2e8dc]/30">
          <div className="text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#737e74]">
              Image pending
            </p>
            <p className="mt-2 text-[11px] text-[#737e74]">
              {group.id === "ip" ? "等你给图" : "作品整理中"}
            </p>
          </div>
        </div>
      )}

      {group.fallbackHref && group.fallbackLabel && (
        <p className="mt-3 text-[11px] text-[#737e74]">
          {group.fallbackLabel}：
          <Link
            href={group.fallbackHref}
            className="border-b border-[#303b35]/15 pb-0.5 text-[#303b35] transition-colors hover:border-[#617a5e]"
          >
            视觉笔记 ↗
          </Link>
        </p>
      )}
    </div>
  );
}

function VisualSection({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.section
      id="visual"
      className="scroll-mt-24 pb-16 pt-7"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SectionHead
        title="视觉"
        note="（UI / IP 设计等）"
        en="MAKE IT TANGIBLE"
        number={1}
      />
      <p className="mb-10 max-w-[430px] text-[13px] leading-7 text-[#737e74]">
        把研究和技术落到界面、形象与图像上的部分。
      </p>
      <div className="space-y-12">
        {VISUAL_GROUPS.map((group) => (
          <VisualGroup key={group.id} group={group} />
        ))}
      </div>
    </motion.section>
  );
}

function ProjectVisual({
  project,
  open,
  onToggle,
}: {
  project: Flagship;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={`detail-${project.id}`}
      aria-label={`显示${project.title}的项目介绍`}
      className="group relative block w-full cursor-pointer overflow-hidden border border-[#ccd2c6] bg-[#e2e8dc] p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#617a5e]"
      style={{ aspectRatio: "1.45" }}
    >
      {project.visual === "image" && project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : project.visual === "research" ? (
        <span
          className="relative flex h-full w-full items-center justify-center"
          aria-hidden="true"
        >
          <span className="relative h-[65%] w-[64%]">
            <span className="absolute left-0 top-[8%] h-[80%] w-[60%] border border-[#617a5e]" />
            <span className="absolute right-0 top-[20%] h-[80%] w-[60%] border border-[#617a5e] bg-[#f3f3ec]" />
            <span className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#617a5e] bg-[#e2e8dc]" />
          </span>
        </span>
      ) : (
        <span
          className="relative flex h-full w-full items-center justify-center"
          aria-hidden="true"
        >
          <span className="relative flex h-[65%] w-[64%] items-center justify-center">
            <span className="absolute h-[65%] w-[65%] rounded-full border border-[#617a5e]" />
            <span className="absolute h-[44%] w-[44%] rotate-45 border border-[#617a5e]" />
            <span className="absolute h-px w-full bg-[#617a5e]" />
          </span>
        </span>
      )}

      <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[1px] text-[#737e74]">
        {project.visual === "image"
          ? "PROJECT IMAGE"
          : project.visual === "research"
            ? "RESEARCH / 几何占位"
            : "MODEL / 几何占位"}
      </span>
    </button>
  );
}

function ProjectSection({
  project,
  number,
  reduced,
}: {
  project: Flagship;
  number: number;
  reduced: boolean | null;
}) {
  const [open, setOpen] = useState(false);

  const rows = [
    { label: "我的职责", value: project.role },
    { label: "方法 / 证据", value: project.method },
    { label: "结果", value: project.result },
  ];

  return (
    <motion.section
      id={project.id}
      className="scroll-mt-24 pb-16 pt-7"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SectionHead
        title={project.section}
        note={project.sectionNote}
        en={project.sectionEn}
        number={number}
      />

      <article
        className={`career-project grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-[5vw] ${
          open ? "open" : ""
        }`}
      >
        <div>
          <ProjectVisual
            project={project}
            open={open}
            onToggle={() => setOpen((value) => !value)}
          />
          <div className="mt-3 flex items-baseline justify-between gap-3 text-[13px]">
            <span>{project.title}</span>
            <span className="text-[11px] text-[#737e74]">{project.subtitle}</span>
          </div>
          <p className="mt-3 text-[11px] text-[#737e74] lg:hidden">
            点按图片查看项目介绍
          </p>
          <p className="mt-3 hidden text-[11px] text-[#737e74] lg:block">
            移入图片，在右侧展开项目介绍 ↗
          </p>
        </div>

        <div id={`detail-${project.id}`} className="career-details">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737e74]">
            {project.eyebrow}
          </p>
          <h3 className="mt-3 font-editorial text-[21px] font-normal leading-[1.5] sm:text-[24px]">
            {project.headline}
          </h3>
          <p className="mt-3 max-w-[330px] text-[13px] leading-7 text-[#737e74]">
            {project.description}
          </p>

          <dl className="mt-6 border-t border-[#ccd2c6] pt-1 text-[12px]">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[80px_1fr] gap-2 border-b border-[#ccd2c6]/60 py-2.5"
              >
                <dt className="text-[#737e74]">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={project.href}
            className="mt-6 inline-flex items-center gap-1 border-b border-[#303b35]/25 pb-1 text-[13px] transition-colors hover:border-[#617a5e]"
          >
            完整案例 <span aria-hidden="true">↗</span>
          </Link>
          <p className="mt-3 text-[11px] text-[#737e74]">
            移入图片查看；点按可固定展开
          </p>
        </div>
      </article>

      {project.secondary.length > 0 && (
        <div className="mt-10 border-t border-[#ccd2c6] pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#737e74]">
            Also in this direction
          </p>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {project.secondary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline justify-between gap-4 border-b border-transparent py-2 text-[13px] transition-colors hover:border-[#ccd2c6]"
                >
                  <span>{item.title}</span>
                  <span className="flex-1 text-right text-[11px] text-[#737e74]">
                    {item.sub}
                  </span>
                  <span
                    className="text-[11px] text-[#737e74] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-[9vw] border-t border-[#ccd2c6] pb-14 pt-16"
    >
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#737e74]">
            About
          </p>
          <h2 className="mt-4 font-editorial text-[23px] font-normal leading-snug">
            作品之外，仍在生长。
          </h2>
          <p className="mt-5 max-w-[330px] text-[13px] leading-7 text-[#737e74]">
            上海理工大学 · 工业设计本科 · 2027 届。GPA 3.37 / 加权均分 85.44 / 专业排名 8/36。
          </p>
          <p className="mt-3 max-w-[330px] text-[12px] leading-6 text-[#737e74]">
            二等奖学金（24-25 下、25-26 上）、三等奖学金（24-25 上）、少数民族励志奖学金。
          </p>

          <div id="contact" className="mt-7 scroll-mt-24">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em]">
              Contact
            </p>
            <div className="mt-2 flex flex-col gap-1.5 text-[13px]">
              <a
                href="mailto:3505039698@qq.com"
                className="w-fit border-b border-[#303b35]/20 pb-0.5 text-[#303b35] transition-colors hover:border-[#617a5e]"
              >
                3505039698@qq.com
              </a>
              <a
                href="tel:18195981396"
                className="w-fit border-b border-[#303b35]/15 pb-0.5 text-[#737e74] transition-colors hover:border-[#617a5e]"
              >
                181 9598 1396
              </a>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href="/resume.pdf"
                  className="border-b border-[#303b35]/15 pb-0.5 transition-colors hover:border-[#617a5e]"
                >
                  简历 PDF ↗
                </a>
                <a
                  href="https://mossfield.xyz"
                  className="border-b border-[#303b35]/15 pb-0.5 transition-colors hover:border-[#617a5e]"
                >
                  主站 ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
            <span className="text-[#737e74]">其他探索：</span>
            <Link
              href="/sustainability/next-life"
              className="transition-colors hover:text-[#303b35]"
            >
              竹杖的下一程
            </Link>
            <Link
              href="/connections/yes-book"
              className="transition-colors hover:text-[#303b35]"
            >
              《Yes》
            </Link>
            <Link
              href="/connections/fragments"
              className="transition-colors hover:text-[#303b35]"
            >
              碎片与连线
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#737e74]">
              能力
            </p>
            <ul className="mt-3 space-y-2 text-[13px] leading-6 text-[#303b35]/80">
              <li>用户研究 · 需求分析</li>
              <li>信息架构 · 交互流程</li>
              <li>原型设计 · 可用性测试</li>
              <li>AI 产品设计 · 模型训练</li>
              <li>网页 Demo · 萌芽 AI Agent 工作流</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#737e74]">
              工具
            </p>
            <p className="mt-3 text-[13px] leading-7 text-[#737e74]">
              Figma / ProcessOn
              <br />
              Illustrator / Photoshop
              <br />
              C4D / Keyshot
              <br />
              Next.js / TypeScript
              <br />
              Python / PyTorch
              <br />
              Claude Code / Kimi Code
              <br />
              Gemini / GPT / Codex / Atypica
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#737e74]">
              其他
            </p>
            <p className="mt-3 text-[13px] leading-7 text-[#737e74]">
              公益社团负责人，带十余人团队服务孤独症机构与聋哑学校；2026
              全国高校商业精英挑战赛品牌策划竞赛全国总决赛二等奖（团队 5 人，负责视觉）；TTS
              / LLM 本地集成、手环固件逆向与自定义开发。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CareerPage() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div
      className={`career-page relative min-h-screen overflow-x-clip bg-[#f3f3ec] text-[#303b35] ${
        paused ? "career-paused" : ""
      }`}
    >
      <LakeLayer />
      <div
        className="pointer-events-none fixed inset-0 -z-[15] bg-[#f3f3ec]/60"
        aria-hidden="true"
      />
      <WindLayer />

      <header className="relative z-20 mx-[6vw] flex h-[82px] items-center justify-between border-b border-[#ccd2c6]">
        <a
          href="https://mossfield.xyz"
          className="group text-[23px] tracking-[-1px]"
        >
          Moss / 包欣如
          <span className="ml-2 align-middle font-mono text-[9px] uppercase tracking-[0.16em] text-[#737e74] transition-colors group-hover:text-[#303b35]">
            main ↗
          </span>
        </a>
        <nav className="flex items-center gap-4 text-[13px] sm:gap-7">
          <a href="#visual" className="transition-colors hover:text-[#617a5e]">
            项目
          </a>
          <a
            href="#about"
            className="hidden transition-colors hover:text-[#617a5e] sm:inline"
          >
            关于
          </a>
          <a href="#contact" className="transition-colors hover:text-[#617a5e]">
            联系
          </a>
          <a
            href="https://mossfield.xyz"
            className="hidden transition-colors hover:text-[#617a5e] sm:inline"
          >
            主站 ↗
          </a>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative flex min-h-[calc(100svh-82px)] items-center justify-center overflow-hidden px-[9vw] pb-24 pt-16">
          <div
            className="pointer-events-none absolute inset-0 grid place-items-center"
            aria-hidden="true"
          >
            <div className="career-arc career-arc-out" />
            <div className="career-arc career-arc-in" />
          </div>

          <div className="pointer-events-none absolute inset-0 hidden min-[1360px]:block">
            {HERO_CARDS.map((card) => (
              <HeroCardLink key={card.title} card={card} />
            ))}
          </div>

          <div className="relative z-10 max-w-[760px] text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#737e74] sm:text-[11px]">
              AI 产品 · 交互设计 · 用户研究 · 2027 届 · Open to work
            </p>
            <h1 className="font-editorial mt-5 text-[clamp(34px,6.2vw,78px)] font-normal leading-[1.1] tracking-[-2px]">
              理解人，
              <br />
              探索技术的可能。
            </h1>
            <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-7 text-[#737e74] sm:text-[17px]">
              用户研究 / AI / 视觉（UI / IP 设计等）— 三个方向，一条动线。让作品自己说话。
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#visual"
                className="inline-block rounded-[10px] bg-[#303b35] px-6 py-3 text-[14px] text-[#f3f3ec] transition-transform hover:-translate-y-0.5"
              >
                查看项目
              </a>
              <a
                href="#contact"
                className="inline-block rounded-[10px] border border-[#ccd2c6] bg-[#f3f3ec] px-6 py-3 text-[14px] transition-transform hover:-translate-y-0.5"
              >
                联系我
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-10 text-center font-mono text-[11px] tracking-[0.08em] text-[#737e74]">
            向下滚动，进入项目 ↓
          </div>
        </section>

        {/* The line leaves the hero and becomes the left rail of the project list */}
        <div
          className="relative hidden h-[130px] w-full overflow-hidden md:block"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1000 130"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M730 0 C730 85 150 22 150 130"
              fill="none"
              stroke="rgba(204,210,198,0.9)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className="absolute bottom-0 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-[#617a5e] bg-[#f3f3ec]"
            style={{ left: "15vw" }}
          />
        </div>

        {/* Projects */}
        <div className="relative ml-[9vw] mr-[7vw] border-l border-[#ccd2c6] pl-[6vw] md:ml-[15vw] md:mr-[9vw]">
          <VisualSection reduced={reduced} />
          {FLAGSHIPS.map((project, index) => (
            <ProjectSection
              key={project.id}
              project={project}
              number={index + 2}
              reduced={reduced}
            />
          ))}
        </div>

        <AboutSection />
      </main>

      <footer className="relative z-10 mx-[9vw] flex flex-col gap-3 border-t border-[#ccd2c6] py-6 text-[10px] text-[#737e74] sm:flex-row sm:items-center sm:justify-between">
        <span>Project Moss / cv.mossfield.xyz · 2026</span>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            className="border border-[#ccd2c6] px-3 py-1.5 text-[11px] transition-colors hover:border-[#617a5e]"
          >
            {paused ? "继续动效" : "暂停动效"}
          </button>
          <a
            href="https://mossfield.xyz"
            className="transition-colors hover:text-[#303b35]"
          >
            回到主站 ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
