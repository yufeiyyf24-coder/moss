"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GrowthSection,
  GrowthDivider,
} from "@/components/growth-node";
import {
  SusCurveChart,
  TaskCurveChart,
  WordCloud,
} from "@/components/shouhuxing-data-viz";
import { SpreadLayout } from "@/components/spread-layout";
import { CaregiverCarousel } from "@/components/caregiver-carousel";
import { CaregivingRivers } from "@/components/caregiving-rivers";

const quotes = [
  {
    id: "a",
    short: "我看了很多资料，但是我不知道哪些是对的。",
    name: "小陈",
    age: "29 岁",
    role: "女儿。母亲确诊后搬回家同住。",
    duration: "照护 1 年+",
    situation:
      "刚进入「照护者」角色，一切从零开始。搜索能力强，但判断力弱——越搜越焦虑。",
    daily:
      "观察母亲状态 → 不确定是否异常 → 反复搜索 → 更焦虑 → 暂时安心 → 再次怀疑。",
    deep: "怕自己做错决定耽误母亲。对「家属」这个新身份感到陌生。",
  },
  {
    id: "b",
    short: "我照顾了十一年了，可是没有人告诉我这样做对不对。",
    name: "老李",
    age: "54 岁",
    role: "父亲。退休后全心照护儿子。",
    duration: "照护 11 年",
    situation:
      "经验丰富，但从未被验证过「对不对」。信息只靠医生口头交代，记不住，凭感觉判断。",
    daily:
      "凭多年经验判断 → 习惯性焦虑 → 身心双重耗竭 → 继续撑下去。",
    deep: "身体累了，心也累了。最怕的是：「万一我一直以来都做错了呢」。",
  },
  {
    id: "c",
    short: "我学过怎么照顾别人，可是没有人教我怎么照顾自己。",
    name: "所有照护者",
    age: "",
    role: "不指向某一个人，而是所有照护者共通的处境。",
    duration: "",
    situation: "照护者自己也需要被照护——这是整个系统里最安静的需求。",
    daily: "",
    deep: "这句话作为一个没有答案的提问，留在页面里。它连接到后面的家属自我支持模块。",
  },
];

const insights = [
  {
    text: "家属难的不是「不知道」，而是「不确定对不对」。",
    emphasis: "不确定对不对",
    link: "AI 问答 + 就医分级",
  },
  {
    text: "照护中的焦虑是累积的，夜间尤其。",
    emphasis: "焦虑是累积的",
    link: "实时 AI + 夜间模式",
  },
  {
    text: "有经验的家属，需要让经验可见的工具。",
    emphasis: "让经验可见",
    link: "状态记录 + 趋势图",
  },
  {
    text: "家属自身也是需要被支持的人。",
    emphasis: "家属自身",
    link: "情绪自评 + 心理资源",
  },
  {
    text: "照护不会只有一个人。",
    emphasis: "不会只有一个人",
    link: "家庭协作 + 权限管理",
  },
];

const testStats = [
  { value: "6", label: "位参与者", note: "2026 年 5 月 · 两轮测试" },
  { value: "84", label: "SUS 平均分", note: "72.5 – 92.5，全部 ≥ 68 良好" },
  { value: "36", label: "次任务全部完成", note: "6 人 × 6 项任务，记录中无未完成" },
];

const testFindings = [
  "风险评估与添加家人最顺——全员秒过、零犹疑，「今天页」与「我的」的入口是对的。",
  "「学一学」藏得太深——找拒药应对方法 6/6 走错路径，最长花了 110 秒。",
  "记录分类不直观——记录食欲时全员犹疑：「不确定食欲分属哪一块」。",
  "AI 历史对话与日常记录的历史记录容易被混淆。",
  "SOS 是情感价值高点——3 人主动提起，但外框被一位用户认为多余。",
  "6 位参与者全部表示愿意推荐给其他家属。",
];

const testImprovements = [
  {
    feedback: "「学一学」藏得太深，0/6 找到拒药应对",
    direction: "情景应对入口前移，命名更直白（用户建议「问一问 / 答疑解惑」）",
  },
  {
    feedback: "记录分类模糊，6/6 记录食欲时犹疑",
    direction: "打卡分类重构：身体细化（头痛 / 手抖 / 牙痛），情绪加入社交反思与成长记录",
  },
  {
    feedback: "图文问诊位置有分歧，2/6 提出替代方案",
    direction: "入口重排：中部加号 / 与支持资源合并为「求医问诊」",
  },
  {
    feedback: "缺少新手指引，首页没有日历",
    direction: "新增新手指引，首页增加日历与快捷跳转",
  },
];

const principles = [
  {
    title: "把「不知道怎么办」转化为可执行的步骤",
    desc: "减少决策负担，每个功能都给出明确的下一步。",
  },
  {
    title: "记录是零成本的，理解是有路径的",
    desc: "让数据自然积累，用 AI 帮助低认知负荷地理解趋势。",
  },
  {
    title: "系统服务的是人，不只是疾病",
    desc: "关注照护者本身的情绪和健康。",
  },
];

const comparisons = [
  {
    scene: "AI 问答",
    old: "自由输入框：请描述您的问题",
    fresh: "关键词选择 → AI 主动提问 → 信息逐步完善",
  },
  {
    scene: "风险评估",
    old: "纯数字评分",
    fresh: "情境感知 + 颜色分级 + 行动建议",
  },
  {
    scene: "家属支持",
    old: "没有 / 只有科普内容",
    fresh: "情绪自评 + 心理资源 + 家庭协作",
  },
  {
    scene: "就医判断",
    old: "没有 / 「请咨询医生」",
    fresh: "分层建议：继续观察 → 联系医生 → 紧急就医",
  },
];

const demoSteps = [
  {
    title: "每日记录 + 状态感知",
    desc: "3 步完成状态记录：选维度 → 填具体 → 保存。趋势与基线对比让「感觉」变成「数据」——语音输入与智能默认值，让记录不再是负担。",
    hint: "已联动到「记录」页，也可以直接点击手机屏幕操作",
    action: { tab: "record" },
  },
  {
    title: "情境模式",
    desc: "感知阶段 → 动态响应。出院期、换药期、换季预警——界面随处境变化，而不是让用户去适应界面。今天页的状态概览，就是感知层最直观的入口。",
    hint: "已联动到「今天」页",
    action: { tab: "today" },
  },
  {
    title: "AI 问答 + 就医判断",
    desc: "不是「AI 聊天机器人」，是降低表达成本的探索工具：关键词选择 → AI 主动提问 → 信息逐步完善。就医分级建议 🟢 继续观察 → 🟡 联系医生 → 🔴 紧急就医。",
    hint: "已打开 AI 问答弹窗",
    action: { tab: "today", modal: true },
  },
  {
    title: "家属自我支持 + 家庭协作",
    desc: "情绪自评与心理资源，关注照护者本人；家庭协作支持邀请成员、权限分级与信息共享——照护不会只有一个人。",
    hint: "已联动到「我的」页，并打开家庭成员管理",
    action: { tab: "profile", page: "familyManage" },
  },
];

type DemoAction = { tab?: string; page?: string; modal?: boolean };

function ComparisonCard({ comparison, index }: {
  comparison: (typeof comparisons)[number];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={`${comparison.scene}：${flipped ? `本方案，${comparison.fresh}。点击查看常规做法` : `常规做法，${comparison.old}。点击查看本方案`}`}
      className="group w-full cursor-pointer rounded-xl text-left [perspective:1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shx-teal"
    >
      <span className="block transition-transform duration-300 ease-out [transform-style:preserve-3d] group-hover:[transform:translateY(-4px)_rotateX(3deg)_rotateY(-6deg)] motion-reduce:transition-none motion-reduce:[transform:none]">
      <span className={`relative grid rounded-xl transition-transform duration-700 ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none motion-reduce:[transform:none] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <span
          aria-hidden={flipped}
          className={`col-start-1 row-start-1 flex min-h-[250px] flex-col rounded-xl border border-shx-teal/20 bg-[#fffdf7] p-6 shadow-[0_4px_14px_rgba(62,105,94,0.07)] transition-shadow duration-300 group-hover:shadow-[0_12px_24px_rgba(62,105,94,0.14)] [backface-visibility:hidden] ${flipped ? "motion-reduce:opacity-0" : "motion-reduce:opacity-100"}`}
        >
          <span className="flex items-center justify-between text-xs font-light text-moss-ink/55">
            <span>常规做法</span><span>{String(index + 1).padStart(2, "0")}</span>
          </span>
          <span className="mt-6 font-wenkai text-xl text-moss-ink/75">{comparison.scene}</span>
          <span className="mt-3 text-sm font-light leading-7 text-moss-ink/60">{comparison.old}</span>
          <span className="mt-auto flex items-center justify-between pt-7 text-xs font-light text-[#568d86]">
            <span>翻面，看看另一种可能</span><span aria-hidden="true" className="text-lg transition-transform group-hover:rotate-45 motion-reduce:transform-none">↻</span>
          </span>
        </span>
        <span
          aria-hidden={!flipped}
          className={`col-start-1 row-start-1 flex min-h-[250px] flex-col rounded-xl border border-white/20 bg-[#15B7A8]/80 p-6 shadow-[0_4px_14px_rgba(62,105,94,0.07)] transition-shadow duration-300 group-hover:shadow-[0_12px_24px_rgba(62,105,94,0.14)] [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:[transform:none] ${flipped ? "motion-reduce:opacity-100" : "motion-reduce:opacity-0"}`}
        >
          <span className="flex items-center justify-between text-xs font-light text-white/80">
            <span>本方案</span><span>{String(index + 1).padStart(2, "0")}</span>
          </span>
          <span className="mt-6 font-wenkai text-xl text-white">{comparison.scene}</span>
          <span className="mt-3 text-sm font-light leading-7 text-white">{comparison.fresh}</span>
          <span className="mt-auto flex items-center justify-between pt-7 text-xs font-light text-white/80">
            <span>再点一下，回到正面</span><span aria-hidden="true" className="text-lg">↻</span>
          </span>
        </span>
      </span>
      </span>
    </button>
  );
}

/* demo 文件在全局暴露的交互函数 */
type DemoWindow = Window & {
  switchTab?: (tab: string) => void;
  openPage?: (pageId: string) => void;
  closePage?: (pageId: string) => void;
  openChatModal?: () => void;
  closeChatModal?: () => void;
};

function DemoShowcase() {
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActionRef = useRef<{ page?: string; modal?: boolean } | null>(null);

  /* 驱动左侧手机：先清理上一个动作（关闭弹窗/子页面），再执行当前动作 */
  const driveDemo = (action: DemoAction) => {
    const win = iframeRef.current?.contentWindow as DemoWindow | null;
    if (!win) return;
    try {
      if (lastActionRef.current?.modal) win.closeChatModal?.();
      if (lastActionRef.current?.page) win.closePage?.(lastActionRef.current.page);
      if (action.tab) win.switchTab?.(action.tab);
      if (action.page) win.openPage?.(action.page);
      if (action.modal) win.openChatModal?.();
      lastActionRef.current = { page: action.page, modal: action.modal };
    } catch {
      /* iframe 尚未加载完成时静默跳过，用户仍可自行点击 */
    }
  };

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* 桌面端保留滚动联动；手机端改用步骤按钮，避免手机滚出屏幕后失去参考 */
  useEffect(() => {
    if (!isDesktop) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActive(idx);
            driveDemo(demoSteps[idx].action);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isDesktop]);

  const selectStep = (idx: number) => {
    setActive(idx);
    driveDemo(demoSteps[idx].action);
  };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
      {/* 第一部分：四步介绍（手机在上，桌面在右） */}
      <div className="space-y-10 lg:order-2 lg:space-y-14">
        <p className="text-xs font-light italic leading-6 text-moss-ink/60 lg:hidden">
          先读这四步，再在下面的原型里点一点。
        </p>
        {demoSteps.map((step, idx) => {
          const isActive = active === idx;
          return (
            <div
              key={step.title}
              data-idx={idx}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              className={`transition-all duration-500 ${
                isActive ? "opacity-100" : "opacity-100 lg:opacity-50 lg:hover:opacity-80"
              }`}
            >
              <div
                className={`border-l-2 pl-5 transition-colors duration-500 ${
                  isActive ? "border-shx-teal/60" : "border-shx-teal/25 lg:border-shx-teal/20"
                }`}
              >
                <span className="mb-2 block font-wenkai text-2xl font-thin text-shx-teal/60">
                  0{idx + 1}
                </span>
                <h4 className="mb-3 font-wenkai text-xl font-light text-moss-ink">
                  {step.title}
                </h4>
                <p className="text-sm font-light leading-7 text-moss-ink/70 sm:text-base sm:leading-8">
                  {step.desc}
                </p>
                <p className="mt-3 text-xs font-light italic text-moss-ink/60">
                  → {step.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 第二部分：原型试用（手机在下，桌面在左） */}
      <div className="mt-12 lg:order-1 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
        <p className="mb-4 text-xs font-light tracking-wide text-moss-ink/60 lg:hidden">
          可交互原型 · 选一步试试
        </p>

        <div className="flex justify-center">
          <div>
            <div className="relative h-[650px] w-[300px] overflow-hidden rounded-[2.5rem] shadow-[0_25px_60px_rgba(21,183,168,0.2)] ring-1 ring-shx-teal/25 max-[360px]:h-[600px] max-[360px]:w-[277px]">
              <iframe
                ref={iframeRef}
                src="/shouhuxing-demo.html"
                title="守护星可交互原型"
                onLoad={() => driveDemo(demoSteps[0].action)}
                style={{
                  width: 375,
                  height: 812,
                }}
                className="block border-0 bg-[#E5F4F1] [transform:scale(0.8)] [transform-origin:top_left] max-[360px]:[transform:scale(0.738)]"
              />
            </div>
            <p className="mt-4 text-center text-xs font-light text-moss-ink/60">
              可以直接点击屏幕操作
            </p>
          </div>
        </div>

        {/* 手机端：用按钮切换演示步骤 */}
        <div className="mt-6 grid grid-cols-2 gap-2 lg:hidden">
          {demoSteps.map((step, idx) => (
            <button
              key={step.title}
              type="button"
              onClick={() => selectStep(idx)}
              aria-pressed={active === idx}
              className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition-colors duration-300 ${
                active === idx
                  ? "border-shx-teal/50 bg-white text-moss-ink shadow-[0_4px_14px_-10px_rgba(21,183,168,0.5)]"
                  : "border-shx-teal/15 bg-white/45 text-moss-ink/60"
              }`}
            >
              <span className="shrink-0 font-wenkai text-sm text-shx-teal/70">
                0{idx + 1}
              </span>
              <span className="min-w-0 leading-5">{step.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EasterEggStar() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex h-24 items-center justify-center">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="text-2xl text-shx-teal/60 transition-transform duration-500 hover:scale-110 hover:text-shx-teal"
        aria-label="hidden star"
      >
        ✦
      </button>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="absolute -bottom-2 whitespace-nowrap text-xs font-light italic text-moss-ink/60"
          >
            I was here when you needed me.
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ShouhuxingBody() {
  return (
    <>
      <GrowthSection
        title="第一章 · 土壤"
        subtitle="为什么做？在精神疾病面前，有一个群体被系统性地忽视了。"
        layout="wide"
        className="lg:pb-8 lg:[&_h2+p]:mb-6"
      >
        <SpreadLayout ratio="55-45" offset="none">
          {/* 左栏略低于右侧小标题，让数字与第一组图形呼应。 */}
          <div className="lg:mt-6">
            <p className="font-wenkai text-7xl font-thin leading-none text-shx-teal/70 sm:text-8xl">
              <span className="font-normal" style={{ fontFamily: '"ZCOOL KuaiLe", sans-serif' }}>700</span><span className="text-4xl sm:text-5xl">万</span>
            </p>
            <p className="mt-4 text-base font-light text-moss-ink/60">
              中国约 700 万确诊精神分裂症患者
            </p>
            <p className="mt-8 max-w-md font-wenkai text-xl font-light italic leading-relaxed text-moss-ink/80 sm:text-2xl">
              每一个患者背后，
              <br />
              至少有一个家庭在承担日常照护。
            </p>
            <p className="mt-6 max-w-md text-sm font-light leading-7 text-moss-ink/55">
              医疗系统聚焦于患者本身，家属作为实际照护者，长期处于无人支持的真空地带。
            </p>
            <p className="mt-8 max-w-md text-xs font-light leading-6 text-moss-ink/55">
              研究方法：专家访谈 · 代理访谈 · 桌面研究。
              <br />
              局限：本项目未进行大规模问卷调研，研究深度依赖临床专家中转获取的家属反馈。
            </p>
          </div>

          {/* 三种帮助停在不同的缺口：开放排版，短线在疑问前断开。 */}
          <div>
            <h3 className="flex items-center justify-start gap-4 font-wenkai text-xl font-normal tracking-wide text-moss-ink/85 sm:justify-end sm:text-right sm:text-2xl">
              <span aria-hidden="true" className="hidden h-px w-20 shrink-0 bg-shx-teal/40 sm:block sm:w-32" />
              <span>现有工具的困境</span>
            </h3>
            <ul className="mt-6 space-y-7 lg:mt-4 lg:space-y-5">
              {[
                { kind: "medicine", name: "用药提醒 App", help: "提醒吃药", question: "然后该观察什么？", offset: "" },
                { kind: "article", name: "疾病科普公众号", help: "解释知识", question: "那我家现在属于哪种情况？", offset: "ml-auto w-fit max-w-full" },
                { kind: "chat", name: "病友群", help: "分享经验", question: "别人的做法适合我们吗？", offset: "sm:ml-3" },
              ].map((tool) => (
                <li key={tool.kind} className={tool.offset}>
                  <div className="flex items-center gap-4">
                    <span className="relative isolate flex h-12 w-12 shrink-0 items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-2 -z-10 bg-shx-teal/10"
                        style={{
                          borderRadius: tool.kind === "medicine" ? "58% 42% 65% 35% / 45% 58% 42% 55%" : tool.kind === "article" ? "36% 64% 42% 58% / 60% 38% 62% 40%" : "62% 38% 45% 55% / 38% 55% 45% 62%",
                          transform: tool.kind === "article" ? "rotate(12deg)" : "rotate(-8deg)",
                        }}
                      />
                    <svg
                      className="h-12 w-12 shrink-0 text-shx-teal/80"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {tool.kind === "medicine" ? (
                        <>
                          <path d="M9 27 21 15a7 7 0 0 1 10 10L19 37A7 7 0 0 1 9 27Z" />
                          <path d="m15 21 10 10" />
                          <circle cx="34" cy="12" r="9" fill="#e5f4f1" />
                          <path d="M34 7v5l3 2" />
                        </>
                      ) : tool.kind === "article" ? (
                        <>
                          <path d="M12 6h18l7 7v29H12Z" />
                          <path d="M30 6v8h7M18 21h13M18 27h13M18 33h8" />
                        </>
                      ) : (
                        <>
                          <path d="M7 9h25a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H17l-9 7v-7H7a4 4 0 0 1-4-4V13a4 4 0 0 1 4-4Z" />
                          <path d="M36 18h5a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-2v5l-7-5h-9M11 17h17M11 23h11" />
                        </>
                      )}
                    </svg>
                    </span>
                    <div>
                      <p className="text-sm font-normal text-moss-ink/85">{tool.name}</p>
                      <p className="mt-1 text-xs font-light text-moss-ink/55">{tool.help}</p>
                    </div>
                  </div>
                  <div className="ml-6 mt-2 flex items-start gap-3">
                    <svg className="mt-1 h-6 w-7 shrink-0 text-shx-teal/40" viewBox="0 0 28 24" fill="none" aria-hidden="true">
                      <path d="M1 1v8q0 8 8 8h8" stroke="currentColor" strokeWidth="1" />
                      <path d="M21 17h2" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                    <p className="pt-1 font-wenkai text-base leading-7 text-moss-ink/75 sm:text-lg">
                      {tool.question}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-center font-wenkai text-lg leading-8 text-moss-ink/80 lg:mt-12">
              信息、提醒、经验都有。
              <br />
              <span className="text-base font-normal text-[#568d86]">
                但如何把它们变成今天的照护行动，仍要靠家属自己。
              </span>
            </p>
          </div>
        </SpreadLayout>

      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第二章 · 根系"
        subtitle="发现了什么？在开始设计之前，我们先试着理解他们真正需要的是什么。"
        layout="wide"
      >
        <p className="mb-6 text-moss-ink/60">
          同样是照护，每个人承受的重量并不相同。
        </p>
        <CaregiverCarousel people={quotes} />

        <CaregivingRivers />

        <div className="mt-16">
          <h3 className="mb-6 font-wenkai text-xl text-moss-ink">
            五个核心洞察
          </h3>
          <ol className="mx-auto w-full max-w-3xl lg:w-[82%]">
            {insights.map((item, idx) => {
              const [before, after] = item.text.split(item.emphasis);
              return (
                <li
                  key={item.text}
                  className="relative grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-3 py-8 sm:gap-x-6 md:grid-cols-[2rem_minmax(0,1fr)_auto] md:gap-x-4"
                >
                  <span aria-hidden="true" className="font-wenkai text-2xl font-light text-shx-teal/35">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-light leading-8 text-moss-ink/70">
                    {before}<strong className="font-normal text-moss-ink/90">{item.emphasis}</strong>{after}
                  </p>
                  <p className="col-start-2 flex items-baseline gap-2 text-sm font-light leading-7 text-[#568d86] md:col-start-3 md:justify-self-end md:whitespace-nowrap">
                    <span aria-hidden="true" className="text-shx-teal/60">→</span>
                    <span>{item.link}</span>
                  </p>
                  {idx < insights.length - 1 && (
                    <span aria-hidden="true" className="absolute bottom-0 left-13 h-px w-12 bg-shx-teal/15 sm:left-14" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第三章 · 枝干"
        subtitle="怎么解决？创新不一定是增加功能，而是让一个功能真的被需要它的人用得上。"
        layout="wide"
      >
        {/* 开放的三栏设计原则，以细竖线分隔。 */}
        <div className="grid gap-y-8 md:grid-cols-3 md:gap-y-0">
          {principles.map((p, i) => (
            <div
              key={i}
              className={`border-l border-shx-teal/25 pl-5 pr-2 md:px-7 lg:px-9 ${
                i === 0 ? "md:border-l-0 md:pl-0" : ""
              }`}
            >
              <p className="font-wenkai text-lg font-normal leading-8 text-[#568d86] lg:text-xl">
                {p.title}
              </p>
              <p className="mt-3 text-sm font-light leading-7 text-moss-ink/60">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* 对比翻牌卡：常规做法（灰调弱化）→ 本方案（主题色强调） */}
        <div className="mt-16">
          <h3 className="mb-6 font-wenkai text-xl text-moss-ink">
            常规做法 vs 本方案
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {comparisons.map((comparison, index) => (
              <ComparisonCard key={comparison.scene} comparison={comparison} index={index} />
            ))}
          </div>
        </div>

        {/* 系统全貌：今天作为主导入口，其余三个环绕 */}
        <div className="mt-16">
          <h3 className="mb-6 font-wenkai text-xl text-moss-ink">系统全貌</h3>
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col justify-center rounded-lg border border-shx-teal/25 bg-shx-teal/10 p-8 lg:row-span-3">
              <span className="block text-lg font-medium text-moss-ink/70">今天</span>
              <span className="mt-2 font-wenkai text-xl font-light text-moss-ink">
                一目了然的当前状态
              </span>
              <span className="mt-4 text-sm leading-6 text-moss-ink/55">
                所有模块的入口：状态概览、任务清单、风险评估、AI 问答都在这里汇合。
              </span>
            </div>
            <div className="rounded-lg bg-shx-card/50 p-5">
              <span className="block text-sm font-medium text-moss-ink/60">记录</span>
              <span className="text-moss-ink/80">每日打卡 + 数据趋势</span>
            </div>
            <div className="rounded-lg bg-shx-card/50 p-5">
              <span className="block text-sm font-medium text-moss-ink/60">学一学</span>
              <span className="text-moss-ink/80">知识库 + 情景应对</span>
            </div>
            <div className="rounded-lg bg-shx-card/50 p-5">
              <span className="block text-sm font-medium text-moss-ink/60">我的</span>
              <span className="text-moss-ink/80">家庭协作 + 设置</span>
            </div>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第四章 · 叶子"
        subtitle="方案展示。每一个功能都是一片叶子，看完前面的根系，自然就懂了。"
        layout="wide"
      >
        <DemoShowcase />
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第五章 · 果实与落叶"
        subtitle="验证与反思。设计不是在交付时结束，它在使用中才真正开始。"
      >
        <div className="mb-12">
          <h3 className="mb-5 font-wenkai text-xl text-moss-ink">可用性测试</h3>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {testStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-shx-teal/15 bg-shx-card/60 p-6 text-center"
              >
                <p className="font-wenkai text-4xl font-thin text-shx-teal sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm tracking-wide text-moss-ink/60">{s.label}</p>
                <p className="mt-1 text-xs font-light text-moss-ink/55">{s.note}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-shx-teal/15 bg-shx-card/60 p-5 sm:p-6">
              <p className="mb-3 text-sm tracking-wide text-moss-ink/60">
                SUS 得分分布
              </p>
              <SusCurveChart />
            </div>
            <div className="rounded-xl border border-shx-teal/15 bg-shx-card/60 p-5 sm:p-6">
              <p className="mb-3 text-sm tracking-wide text-moss-ink/60">
                任务完成时长
              </p>
              <TaskCurveChart />
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-shx-teal/15 bg-shx-card/60 p-5 sm:p-8">
            <p className="mb-3 text-sm tracking-wide text-moss-ink/60">
              访谈关键词
            </p>
            <WordCloud />
          </div>

          <p className="mb-4 text-sm tracking-wide text-moss-ink/60">主要发现</p>
          <div className="mb-8 space-y-3">
            {testFindings.map((f, idx) => (
              <div
                key={idx}
                className="flex items-baseline gap-4 border-b border-shx-teal/10 pb-3"
              >
                <span className="shrink-0 font-wenkai text-sm text-shx-teal/70">
                  0{idx + 1}
                </span>
                <p className="text-sm leading-7 text-moss-ink/75 sm:text-base">
                  {f}
                </p>
              </div>
            ))}
          </div>

          <p className="mb-4 text-sm tracking-wide text-moss-ink/60">
            测试反馈 → 下一阶段优化方向
          </p>
          <div className="space-y-3">
            {testImprovements.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-shx-teal/15 bg-shx-card/50 p-5"
              >
                <p className="text-xs font-light italic text-moss-ink/55">
                  {item.feedback}
                </p>
                <p className="mt-2 text-sm leading-7 text-moss-ink/75">
                  → {item.direction}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs font-light italic text-moss-ink/55">
            * 以上为基于测试反馈提出的优化方向，尚在迭代中，未全部落地。
          </p>
        </div>

        <div className="mb-10">
          <h3 className="mb-4 font-wenkai text-xl text-moss-ink">
            设计约束与取舍
          </h3>
          <ul className="list-inside list-disc space-y-2 text-moss-ink/70">
            <li>偏远地区网络不稳定 → 关键流程支持离线优先</li>
            <li>中老年用户界面简化 → 信息层级与字体优化</li>
            <li>隐私保护 → 家庭权限分级，敏感记录可控</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-wenkai text-xl text-moss-ink">
            反思与下一步
          </h3>
          <p className="text-moss-ink/70">
            研究局限在于代理访谈的边界；未验证的假设将在后续测试中继续澄清。未来的迭代方向包括更细的情境模式、更自然的 AI 交互，以及照护者社区的可行性探索。
          </p>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第六章 · 种子"
        subtitle="有些东西不需要被所有人看到，但被发现的人会记住。"
      >
        <blockquote className="mb-10 border-l-2 border-shx-teal/40 pl-5 text-lg font-light italic text-moss-ink/70">
          “The best AI is the one you can eventually live without.”
          <br />
          最好的 AI，是最终让你不再需要它的 AI。
        </blockquote>

        <p className="mb-12 text-moss-ink/70">
          所有长程慢性疾病最终都会让家属「久病成医」。AI 起不到作用，正是它起到作用的表现——它能带着一个毫无知识储备的人慢慢了解这个疾病、学会与之共存，直到他们可以独立面对问题。这是工具最温柔的意义。
        </p>

        <p className="mb-8 text-center text-sm text-moss-ink/55">
          在照护过程中，有一颗星星帮你标记方向。
        </p>

        <EasterEggStar />
      </GrowthSection>
    </>
  );
}
