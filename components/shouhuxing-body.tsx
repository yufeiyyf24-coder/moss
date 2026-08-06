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
import { SpreadLayout, hashString } from "@/components/spread-layout";

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
    text: "家属最大的困难不是「不知道」，而是「不确定自己知道的对不对」。",
    link: "AI 问答 + 就医分级",
  },
  {
    text: "照护中的焦虑是累积的，夜间尤其。",
    link: "实时 AI + 夜间模式",
  },
  {
    text: "经验丰富的家属需要的不是更多信息，而是让经验可见的工具。",
    link: "状态记录 + 趋势图",
  },
  {
    text: "家属自身也是需要被支持的人。",
    link: "情绪自评 + 心理资源",
  },
  {
    text: "照护不会只有一个人。",
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

function PersonaQuotes() {
  const [active, setActive] = useState<string | null>(null);

  const activeQuote = active ? quotes.find((q) => q.id === active) : null;

  return (
    <motion.div layout className="mt-12">
      {/* Active state: quote title → persona card → other quotes */}
      <AnimatePresence mode="popLayout">
        {active && activeQuote && (
          <motion.div
            key={`detail-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Active quote as title — pinned to top-left */}
            <motion.div
              layoutId={`quote-${active}`}
              className="mb-6"
            >
              <span className="mb-2 block select-none font-wenkai text-xl leading-none text-shx-teal/40 sm:text-2xl">
                "
              </span>
              <p className="font-wenkai text-lg leading-relaxed text-moss-ink/80 sm:text-xl">
                {activeQuote.short}
              </p>
            </motion.div>

            {/* Persona card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0.2, 1] }}
              className="mb-10 rounded-2xl border border-shx-teal/20 bg-white/50 p-6 shadow-sm backdrop-blur-sm sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-light tracking-[0.15em] text-moss-ink/30">
                  照护者画像
                </span>
                <button
                  onClick={() => setActive(null)}
                  className="text-xs tracking-wide text-moss-ink/30 underline-offset-4 transition-colors hover:text-moss-ink/60"
                >
                  收起 ✕
                </button>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
                <div className="shrink-0 sm:min-w-[120px]">
                  <p className="font-wenkai text-2xl font-light text-moss-ink/85 sm:text-3xl">
                    {activeQuote.name}
                  </p>
                  {activeQuote.age && (
                    <p className="mt-1 text-4xl font-thin tracking-tight text-shx-teal/40 sm:text-5xl">
                      {activeQuote.age}
                    </p>
                  )}
                  {activeQuote.duration && (
                    <p className="mt-2 text-xs tracking-wide text-moss-ink/35">
                      {activeQuote.duration}
                    </p>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-4">
                  <p className="text-sm leading-7 text-moss-ink/70 sm:text-base sm:leading-8">
                    {activeQuote.role}
                  </p>
                  <p className="text-sm leading-7 text-moss-ink/65 sm:text-base sm:leading-8">
                    {activeQuote.situation}
                  </p>
                  {activeQuote.daily && (
                    <div className="rounded-lg bg-shx-card/60 px-4 py-3 text-xs leading-6 text-moss-ink/50 sm:text-sm">
                      <span className="mr-2 text-moss-ink/30">日常循环</span>
                      {activeQuote.daily}
                    </div>
                  )}
                  <p className="font-wenkai text-sm italic leading-7 text-moss-ink/75 sm:text-base sm:leading-8">
                    「{activeQuote.deep}」
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote bubbles — alternating left/right like drifting thoughts */}
      <div className="flex flex-col gap-8 sm:gap-12">
        {(active
          ? quotes.filter((q) => q.id !== active)
          : quotes
        ).map((q, i) => {
          const isDimmed = !!active;
          const isLeft = i % 2 === 0;
          const shift = 6 + (hashString(q.id) % 14); // 6%~19% 确定性散落

          return (
            <div
              key={q.id}
              className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
            >
            <motion.button
              layout
              onClick={() => setActive(q.id)}
              animate={{
                opacity: isDimmed ? 0.18 : 1,
                x: isDimmed ? (isLeft ? -12 : 12) : 0,
              }}
              transition={{
                layout: { duration: 0.5, ease: [0.2, 0, 0.2, 1] },
                opacity: { duration: 0.6 },
                x: { duration: 0.6, ease: [0.2, 0, 0.2, 1] },
              }}
              style={
                isLeft
                  ? { marginLeft: `${shift}%` }
                  : { marginRight: `${shift}%` }
              }
              className="group relative max-w-[85%] text-left sm:max-w-[70%]"
            >
              <div
                className={`relative rounded-2xl px-6 py-5 transition-all duration-700 sm:px-7 ${
                  isLeft
                    ? "rounded-bl-md bg-shx-card/80"
                    : "rounded-br-md bg-white/60"
                } shadow-sm hover:shadow-md hover:bg-white/80`}
              >
                {/* 对话框小尖角：贴在气泡底角，颜色跟随气泡本体（含 hover） */}
                <span
                  className={`absolute -bottom-1.5 h-3 w-3 rotate-45 transition-colors duration-700 ${
                    isLeft
                      ? "left-4 bg-shx-card/80 group-hover:bg-white/80"
                      : "right-4 bg-white/60 group-hover:bg-white/80"
                  }`}
                />
                {/* 装饰性引号：左上开引号 + 右下闭引号，大号淡色图形 */}
                <span className="pointer-events-none absolute -top-3 left-2 select-none font-wenkai text-3xl leading-none text-shx-teal/20 transition-colors duration-500 group-hover:text-shx-teal/40 sm:text-4xl">
                  “
                </span>
                <span className="pointer-events-none absolute bottom-2 right-3 select-none font-wenkai text-3xl leading-none text-shx-teal/20 transition-colors duration-500 group-hover:text-shx-teal/40 sm:text-4xl">
                  ”
                </span>
                <p className="font-wenkai text-base leading-relaxed text-moss-ink/70 transition-colors duration-500 group-hover:text-moss-ink/90 sm:text-lg">
                  {q.short}
                </p>
              </div>
            </motion.button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

type DemoAction = { tab?: string; page?: string; modal?: boolean };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
      {/* 左侧：sticky 手机 */}
      <div className="flex justify-center lg:sticky lg:top-24 lg:self-start">
        <div>
          <div className="relative h-[650px] w-[300px] overflow-hidden rounded-[2.5rem] shadow-[0_25px_60px_rgba(21,183,168,0.2)] ring-1 ring-shx-teal/25">
            <iframe
              ref={iframeRef}
              src="/shouhuxing-demo.html"
              title="守护星可交互原型"
              onLoad={() => driveDemo(demoSteps[0].action)}
              style={{
                width: 375,
                height: 812,
                transform: "scale(0.8)",
                transformOrigin: "top left",
              }}
              className="block border-0 bg-[#E5F4F1]"
            />
          </div>
          <p className="mt-4 text-center text-xs font-light text-moss-ink/40">
            可交互原型 · 可以直接点击屏幕
          </p>
        </div>
      </div>

      {/* 右侧：四条说明，滚动到中间时高亮并联动手机 */}
      <div className="space-y-14">
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
                isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
              }`}
            >
              <div
                className={`border-l-2 pl-5 transition-colors duration-500 ${
                  isActive ? "border-shx-teal/60" : "border-shx-teal/20"
                }`}
              >
                <span className="mb-2 block font-wenkai text-2xl font-thin text-shx-teal/50">
                  0{idx + 1}
                </span>
                <h4 className="mb-3 font-wenkai text-xl font-light text-moss-ink">
                  {step.title}
                </h4>
                <p className="text-sm font-light leading-7 text-moss-ink/70 sm:text-base sm:leading-8">
                  {step.desc}
                </p>
                <p className="mt-3 text-xs font-light italic text-moss-ink/40">
                  → {step.hint}
                </p>
              </div>
            </div>
          );
        })}
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
            className="absolute -bottom-2 whitespace-nowrap text-xs font-light italic text-moss-ink/50"
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
        titleAlign="overlay"
      >
        <SpreadLayout ratio="55-45" offset="right-down">
          {/* 左栏：700 万大字 + 引言；lg:mt-24 让左栏整体下移一个 700 万行高（96px），顶部对齐 700 万字的下沿 */}
          <div className="lg:mt-24">
            <p className="font-wenkai text-7xl font-thin leading-none text-shx-teal/70 sm:text-8xl">
              700<span className="text-4xl sm:text-5xl">万</span>
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
          </div>

          {/* 右栏：下移 + 微旋的困境卡片 */}
          <div>
            <div className="rotate-[-0.5deg] rounded-xl border border-shx-teal/15 bg-shx-card/60 p-6 shadow-sm sm:p-8">
              <p className="mb-4 text-sm tracking-wide text-moss-ink/50">
                现有工具的困境
              </p>
              <ul className="list-inside list-disc space-y-2 text-moss-ink/70">
                <li>用药提醒 App → 只解决一个点</li>
                <li>疾病科普公众号 → 单向信息，无法应对具体场景</li>
                <li>病友群 → 信息碎片化，缺乏专业指引</li>
                <li>三者彼此割裂，没有一个为家属设计的完整支持系统</li>
              </ul>
            </div>
            <p className="mt-8 max-w-sm text-sm font-light italic leading-7 text-moss-ink/50">
              医疗系统一直关注患者。
              <br />
              那谁在照顾照顾者？
            </p>
          </div>
        </SpreadLayout>

        {/* 脚注带：研究方法，窄、不居中、偏右，像展览墙上贴的说明卡片 */}
        <div className="ml-auto mt-12 max-w-md">
          <p className="text-xs font-light leading-6 text-moss-ink/45">
            研究方法：专家访谈 · 代理访谈 · 桌面研究。
            <br />
            局限：本项目未进行大规模问卷调研，研究深度依赖临床专家中转获取的家属反馈。
          </p>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第二章 · 根系"
        subtitle="发现了什么？在开始设计之前，我们先试着理解他们真正需要的是什么。"
        layout="wide"
      >
        <p className="mb-6 text-moss-ink/60">
          轻淡地浮在页面上方，像是有人留下的声音。点击其中一句，看看它背后的人。
        </p>
        <PersonaQuotes />

        <SpreadLayout ratio="45-55" offset="right-up" className="mt-16">
          <div className="rounded-xl border border-shx-teal/15 bg-shx-card/50 p-6">
            <h3 className="mb-3 font-wenkai text-lg text-moss-ink">
              河流一：日常照护期
            </h3>
            <p className="text-sm leading-7 text-moss-ink/65">
              起床 → 观察 → 用药 → 不确定 → 搜索/问 → 入睡。情绪曲线在「不确定」处骤降，在「暂时安心」处有小回升。
            </p>
          </div>
          <div className="rounded-xl border border-shx-teal/15 bg-shx-card/50 p-6">
            <h3 className="mb-3 font-wenkai text-lg text-moss-ink">
              河流二：危机节点
            </h3>
            <p className="text-sm leading-7 text-moss-ink/65">
              出院/换药决策 → 回家初期 → 波动期 → 稳定/再次危机。情绪在医生交代后陡降，回家第一周持续低位。
            </p>
          </div>
        </SpreadLayout>

        <div className="mt-16">
          <h3 className="mb-10 font-wenkai text-xl text-moss-ink">
            五个核心洞察
          </h3>
          <div className="space-y-10">
            {insights.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[72%] ${
                      isLeft ? "" : "text-right"
                    }`}
                  >
                    <p className="text-base font-light leading-8 text-moss-ink/80 sm:text-lg sm:leading-9">
                      {item.text}
                    </p>
                    <div
                      className={`mt-3 flex items-center gap-3 ${
                        isLeft ? "" : "flex-row-reverse"
                      }`}
                    >
                      <svg
                        className="h-3 w-12 text-shx-teal/70"
                        viewBox="0 0 48 12"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M2 6 C 14 0.5, 30 11.5, 46 5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-sm text-shx-teal/80">
                        {item.link}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第三章 · 枝干"
        subtitle="怎么解决？创新不一定是增加功能，而是让一个功能真的被需要它的人用得上。"
        layout="wide"
      >
        {/* 三条设计原则：横向三栏，高度故意错落，像展台上摆放的三块说明牌 */}
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={i}
              className={`rounded-xl border border-shx-teal/15 bg-shx-card/60 p-6 ${
                i === 1 ? "md:mt-12" : i === 2 ? "md:mt-5" : ""
              }`}
            >
              <p className="font-normal text-moss-ink">{p.title}</p>
              <p className="mt-2 text-sm leading-6 text-moss-ink/60">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* 对比翻牌卡：常规做法（灰调弱化）→ 本方案（主题色强调） */}
        <div className="mt-16">
          <h3 className="mb-6 font-wenkai text-xl text-moss-ink">
            常规做法 vs 本方案
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {comparisons.map((c) => (
              <div
                key={c.scene}
                className="rounded-xl border border-shx-teal/15 bg-white/40 p-5"
              >
                <p className="mb-3 text-sm font-medium text-moss-ink/50">
                  {c.scene}
                </p>
                <div className="rounded-lg bg-moss-ink/[0.04] px-3 py-2.5 text-xs leading-5 text-moss-ink/45">
                  {c.old}
                </div>
                <div className="flex justify-center py-1.5 text-shx-teal/60">
                  <svg className="h-3 w-4" viewBox="0 0 16 12" fill="none" aria-hidden>
                    <path
                      d="M8 1 C 8 4, 8 8, 8 11 M4 7 L 8 11 L 12 7"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rounded-lg border border-shx-teal/25 bg-white/50 px-3 py-2.5 text-xs leading-5 text-moss-ink/75">
                  {c.fresh}
                </div>
              </div>
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
              <span className="block text-sm font-medium text-moss-ink/50">记录</span>
              <span className="text-moss-ink/80">每日打卡 + 数据趋势</span>
            </div>
            <div className="rounded-lg bg-shx-card/50 p-5">
              <span className="block text-sm font-medium text-moss-ink/50">学一学</span>
              <span className="text-moss-ink/80">知识库 + 情景应对</span>
            </div>
            <div className="rounded-lg bg-shx-card/50 p-5">
              <span className="block text-sm font-medium text-moss-ink/50">我的</span>
              <span className="text-moss-ink/80">家庭协作 + 设置</span>
            </div>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection
        title="第四章 · 叶子"
        subtitle="方案展示。每一个功能都是一片叶子，看完前面的根系，自然就懂了。右侧滚动时，左侧的手机会跟着动。"
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
                <p className="mt-1 text-xs font-light text-moss-ink/40">{s.note}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-shx-teal/15 bg-shx-card/60 p-5 sm:p-6">
              <p className="mb-3 text-sm tracking-wide text-moss-ink/50">
                SUS 得分分布
              </p>
              <SusCurveChart />
            </div>
            <div className="rounded-xl border border-shx-teal/15 bg-shx-card/60 p-5 sm:p-6">
              <p className="mb-3 text-sm tracking-wide text-moss-ink/50">
                任务完成时长
              </p>
              <TaskCurveChart />
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-shx-teal/15 bg-shx-card/60 p-5 sm:p-8">
            <p className="mb-3 text-sm tracking-wide text-moss-ink/50">
              访谈关键词
            </p>
            <WordCloud />
          </div>

          <p className="mb-4 text-sm tracking-wide text-moss-ink/50">主要发现</p>
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

          <p className="mb-4 text-sm tracking-wide text-moss-ink/50">
            测试反馈 → 下一阶段优化方向
          </p>
          <div className="space-y-3">
            {testImprovements.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-shx-teal/15 bg-shx-card/50 p-5"
              >
                <p className="text-xs font-light italic text-moss-ink/45">
                  {item.feedback}
                </p>
                <p className="mt-2 text-sm leading-7 text-moss-ink/75">
                  → {item.direction}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs font-light italic text-moss-ink/35">
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
          "The best AI is the one you can eventually live without."
          <br />
          最好的 AI，是最终让你不再需要它的 AI。
        </blockquote>

        <p className="mb-12 text-moss-ink/70">
          所有长程慢性疾病最终都会让家属「久病成医」。AI 起不到作用，正是它起到作用的表现——它能带着一个毫无知识储备的人慢慢了解这个疾病、学会与之共存，直到他们可以独立面对问题。这是工具最温柔的意义。
        </p>

        <p className="mb-8 text-center text-sm text-moss-ink/40">
          在照护过程中，有一颗星星帮你标记方向。
        </p>

        <EasterEggStar />
      </GrowthSection>
    </>
  );
}
