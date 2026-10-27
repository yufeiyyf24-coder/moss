"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

const threeSteps = [
  {
    n: "01",
    title: "打开",
    text: "点开 App，停在「这一刻」。没有登录，没有引导页。",
  },
  {
    n: "02",
    title: "点标签",
    text: "从「手边的词」或分类里，选一个最接近此刻的词。",
  },
  {
    n: "03",
    title: "记下",
    text: "先留下印记。程度、部位、补充，都可以之后再说。",
  },
];

const tagGroups = [
  {
    name: "情绪",
    tags: ["低落", "焦虑", "烦躁", "空", "想哭", "平静"],
  },
  {
    name: "身体",
    tags: ["头痛", "头晕", "胸闷", "心悸", "电流感", "恶心", "腹痛", "手抖", "发麻", "乏力", "疲惫"],
    note: "可标部位：头部 / 胸部 / 腹部 / 手部 / 四肢 / 全身 / 其他部位",
  },
  {
    name: "状态",
    tags: ["注意力差", "启动困难", "过载", "飘", "脑子关不掉", "说不清的难受"],
  },
  {
    name: "念头与冲动",
    tags: ["消极想法", "自伤念头 / 冲动"],
  },
  {
    name: "活动",
    tags: ["哭", "出门", "社交", "运动", "兴趣活动"],
  },
  {
    name: "用药",
    tags: ["正常服药", "晚服", "漏服", "不适"],
  },
];

const anxietyAnchors = [
  "脑中冒出担心，转去做别的事时还能放下。",
  "反复想同一件事，要提醒自己才回到眼前。",
  "很难停止担心，读一段文字或听别人说话会不断走神。",
  "坐着也难安定，需要暂停手头的事才能缓一缓。",
  "担心几乎占满脑子，此刻很难交谈或做简单的事。",
];

const principles = [
  { rule: "未评分不代表零程度", why: "没打分是「没打」，不是「没有」" },
  { rule: "未记录不代表未发生", why: "记录稀疏不等于状态变好" },
  { rule: "不跨标签加总、不出总分", why: "「疲惫 3」和「焦虑 3」不是同一种东西，加起来没有意义" },
  { rule: "5 档只作个人对照", why: "和上周的自己比，不和别人比" },
  { rule: "不诊断、不评价、不给建议", why: "判断留给医生，工具只负责把事实留住" },
];

const exportRows = [
  ["疲惫", "4 天", "2.5 / 5"],
  ["注意力差", "3 天", "2.3 / 5"],
  ["启动困难", "2 天", "2.5 / 5"],
  ["焦虑", "2 天", "2.5 / 5"],
  ["乏力", "2 天", "3.0 / 5"],
  ["胸闷", "2 天", "2.0 / 5"],
];

const versions = [
  {
    tag: "0.1.0",
    note: "首次提交：苔绿纸感界面，标签记录 + 五档程度参考",
  },
  {
    tag: "0.1.1",
    note: "记录操作栏固定；标签可单独补充；念头与冲动支持强烈程度",
  },
  {
    tag: "0.1.2",
    note: "本地持久化；记录可编辑、删除、撤销删除，支持跨重启恢复",
  },
  {
    tag: "0.1.3",
    note: "自定义标签可评分并计入导出均分；新增记录级自由描述；自定义标签可删除",
  },
  {
    tag: "0.1.4",
    note: "「手边的词」只管理常用词；分类底部改为「＋ 添加新标签」，新建时自选分类",
  },
];

export function CikeBody() {
  return (
    <>
      {/* 起点 */}
      <GrowthSection title="起点" subtitle="从一句「最近怎么样」开始">
        <p>
          我认识一位在精神科工作的老师，也陪朋友去就诊过。每次复诊，医生的第一句话几乎都是
          「最近怎么样」。
        </p>
        <p className="mt-4">
          但很多人并不知道该怎么回答——包括我在小红书看到的那些患者抱怨和疑惑。有些底色是一直存在的，
          很难说好与不好；模棱两可的叙述，让医生也很头疼。
        </p>
        <p className="mt-4">
          很多患者记忆力不好，无法准确叙述最近一两周甚至一个月的体验，只能靠医生凭经验追问。
        </p>

        <blockquote className="mt-8 border-l-2 border-moss-green/60 pl-5">
          <p className="font-wenkai text-xl font-light leading-relaxed text-moss-ink/75 sm:text-2xl">
            有些患者会写备忘录，她其实蛮喜欢的——一两页纸能抵得上半小时的问诊。
          </p>
          <footer className="mt-2 text-xs font-light tracking-wide text-moss-ink/45">
            一位精神科医生
          </footer>
        </blockquote>

        <p className="mt-6">
          但更常见的情况是：大部分人没有精力，也缺少把体验组织成文字的能力。
        </p>

        <p className="mt-8 font-wenkai text-xl font-light leading-relaxed text-moss-ink/80 sm:text-2xl">
          如果「写下来」本身太难，能不能把记录拆到只剩几个动作？
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 用户与替代方案 */}
      <GrowthSection title="用户与替代方案" subtitle="不是所有人，是愿意记录的那部分人">
        <p>
          此刻面向长期复诊、需要追踪状态、或参加实验需要一周或两周回访的人。他们可以在觉得不舒服的那一刻，
          或过后情绪允许时，尽可能准确地记下当时的感受，并用医生容易理解的方式留下依据。
        </p>
        <p className="mt-4">
          在这之前，少数人会写备忘录或日记；大部分人只凭感觉，靠医生追问和引导，不记得也没办法。
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-base font-medium text-moss-ink/80">低负担</h3>
            <p className="mt-1 text-sm leading-6 text-moss-ink/60">
              难受的时候也能完成记录，不必先组织好语言。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-base font-medium text-moss-ink/80">可回看</h3>
            <p className="mt-1 text-sm leading-6 text-moss-ink/60">
              留下的是发生过的事实，不是一个月后的印象。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-base font-medium text-moss-ink/80">可交付</h3>
            <p className="mt-1 text-sm leading-6 text-moss-ink/60">
              医生能看懂，也能据此继续追问。
            </p>
          </div>
        </div>

        <p className="mt-6 text-moss-ink/60">
          它不承诺让人变得愿意记录，只让已经愿意的人更容易记下来。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 研究输入 */}
      <GrowthSection title="研究输入" subtitle="患者的语言，医生的结构">
        <div className="space-y-3">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-base font-medium text-moss-ink/80">患者讨论帖</h3>
            <p className="mt-1 text-sm leading-6 text-moss-ink/65">
              采集网上精神类患者讨论里反复出现的症状与描述方式。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-base font-medium text-moss-ink/80">量表</h3>
            <p className="mt-1 text-sm leading-6 text-moss-ink/65">
              参考与日常生活有关的量表，以及临床访谈、研究量表的提纲。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-base font-medium text-moss-ink/80">医生视角</h3>
            <p className="mt-1 text-sm leading-6 text-moss-ink/65">
              门诊里医生如何追问、哪些信息真正有用、一份备忘录为什么能节省问诊时间。
            </p>
          </div>
        </div>

        <blockquote className="mt-8 border-l-2 border-moss-green/60 pl-5">
          <p className="font-wenkai text-lg font-light leading-relaxed text-moss-ink/75 sm:text-xl">
            每次填量表都有很多不确定的选项。频率还好说，但严重程度不知道怎么回答——有些我习以为常的东西
            不代表正常，有些让我很难受的，也不一定是临床上说的「严重」。
          </p>
          <footer className="mt-2 text-xs font-light tracking-wide text-moss-ink/45">
            朋友的反馈
          </footer>
        </blockquote>

        <p className="mt-6">
          这些输入最后落成六类标签和一套口语化的词表：既保留一定的专业性，也贴合患者真实的说话方式。
          不够用时，用户可以自己加标签，并选择归到哪一类。
        </p>
        <p className="mt-4">
          没有做成常见的日常向 App，是因为它们要么不够具体——心情好坏每个人的标准不一样；要么不够全面——
          一些症状不是日常 App 会涉及的，但对患者来说也是日常，也是医生会关注的点。
        </p>
        <p className="mt-4 font-medium text-moss-ink/85">
          此刻不做症状分类评估，只帮人记下此刻的感受。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 标签系统 */}
      <GrowthSection title="标签系统" subtitle="六类词，把「说不清」拆成可以指认的东西" layout="wide">
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {tagGroups.map((group) => (
            <div key={group.name}>
              <h3 className="mb-3 text-sm font-medium tracking-wide text-moss-ink/75">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-moss-light/70 px-3 py-1 text-sm font-light text-moss-ink/70 ring-1 ring-moss-green/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {group.note && (
                <p className="mt-3 text-xs font-light leading-5 text-moss-ink/50">
                  {group.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-moss-warm/30 p-5">
          <h3 className="text-base font-medium text-moss-ink/80">「手边的词」</h3>
          <p className="mt-2 text-sm leading-6 text-moss-ink/65">
            只管理常用词，点一下加入，再点一下移出。给用户绝对的自主权，也不希望算法反复提醒你
            「最近一直是某种状态」——它只是方便你在难受的时候，一眼找到标签。
          </p>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 程度 */}
      <GrowthSection title="程度" subtitle="不是轻度 / 中度 / 重度，是一句可以对照的日常">
        <p>
          可以评分的标签，每一档都配了一句具体的行为描述。它们来自临床访谈和研究量表的提纲，
          提炼了认可度较高、也比较具体的参考。
        </p>
        <p className="mt-4">
          「严重程度」对患者来说并不直观：感受的强弱、正常与否、临床上的分级，是三件不同的事。
        </p>
        <p className="mt-4">
          所以这里只提供参照，不下判断。点圆点可以看到对应例子，也可以不评分。导出时，
          它呈现为 1–5 的程度和均分；严重程度仍由医生判断。
        </p>

        <div className="mt-8">
          <h3 className="mb-3 text-sm font-medium tracking-wide text-moss-ink/60">
            以「焦虑」为例
          </h3>
          <div className="space-y-2">
            {anxietyAnchors.map((anchor, index) => (
              <div
                key={anchor}
                className={`flex gap-3 rounded-lg px-4 py-3 ${
                  index === 2
                    ? "bg-moss-light/70 ring-1 ring-moss-green/25"
                    : "bg-moss-warm/25"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    index === 2
                      ? "bg-moss-green/30 text-moss-deep"
                      : "bg-white/60 text-moss-ink/50"
                  }`}
                >
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-moss-ink/70">{anchor}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-light leading-5 text-moss-ink/50">
            五档分别对应：还能放下 / 需要提醒 / 不断走神 / 需要暂停 / 占满脑子。
            描述只作个人对照，不必每句都符合。
          </p>
        </div>

        <figure className="mt-8 overflow-hidden rounded-lg bg-moss-warm/30 p-4 sm:p-6">
          <img
            src="/projects/cike/rating.jpg"
            alt="此刻的五档程度参考"
            loading="lazy"
            className="w-full max-w-md rounded-md"
          />
          <figcaption className="mt-3 text-xs font-light leading-5 text-moss-ink/55">
            界面里点圆点就能看到对应例子，也可以不评分。
          </figcaption>
        </figure>
      </GrowthSection>

      <GrowthDivider />

      {/* 交付物 */}
      <GrowthSection
        title="交付物"
        subtitle="第一页回答「最近怎么样」，后面是追问的依据"
        layout="wide"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p>
              记录最终会导出成一份 Word。第一页是给医生看的摘要：时间范围、记录条数、覆盖天数，
              以及每个症状的出现天数和程度均分；下面留一块空白，写就诊时想问的问题。
            </p>
            <p className="mt-4">
              第二页起才是按天、按时刻的原始记录，保留标签、部位、程度、补充和自由描述。
            </p>
            <p className="mt-4">
              最前面放一个总表，是回答医生那句「最近怎么样」；后面的细分，是给医生做判断和追问的依据。
            </p>
            <p className="mt-4">
              不跨标签加总、不出总分。不同标签的程度不是同一种东西，加起来没有意义；
              医生如果需要一个总分，可以自己开量表。这里只负责把患者的日常感受，最大限度地还原到医生面前。
            </p>
            <p className="mt-4">
              文档由本地 Java 代码直接生成 OOXML，不经过任何在线服务；导出的 Word
              可以在手机或电脑上继续编辑。
            </p>

            <div className="mt-8 rounded-lg bg-moss-warm/30 p-4">
              <h3 className="text-sm font-medium text-moss-ink/75">文档结构</h3>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-moss-ink/60">
                <li>· 第 1 页：症状统计 + 就诊时想补充的问题</li>
                <li>· 第 2 页起：按天、按时刻的原始记录</li>
                <li>· 每条保留标签、部位、程度、补充与自由描述</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="rounded-sm bg-white/85 p-5 shadow-[0_12px_36px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/15 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-wenkai text-lg font-light text-moss-ink">
                  此刻 · 个人记录
                </h3>
                <span className="shrink-0 text-[10px] font-light text-moss-ink/40">
                  2026.10.09 — 10.15
                </span>
              </div>
              <p className="mt-1 text-[11px] font-light text-moss-ink/50">
                7 天 · 14 条记录 · 记录覆盖 7 天
              </p>

              <div className="mt-5 flex items-baseline justify-between gap-3">
                <h4 className="text-xs font-medium text-moss-ink/75">一周症状统计</h4>
                <span className="text-[10px] font-light text-moss-ink/35">
                  导出示例 · 虚构数据
                </span>
              </div>

              <table className="mt-2 w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-moss-green/25 text-moss-ink/45">
                    <th className="py-1.5 pr-2 font-normal">症状或不适</th>
                    <th className="py-1.5 pr-2 font-normal">出现天数</th>
                    <th className="py-1.5 font-normal">程度均分</th>
                  </tr>
                </thead>
                <tbody className="text-moss-ink/65">
                  {exportRows.map(([name, days, mean]) => (
                    <tr key={name} className="border-b border-moss-warm/60">
                      <td className="py-1.5 pr-2">{name}</td>
                      <td className="py-1.5 pr-2">{days}</td>
                      <td className="py-1.5">{mean}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-2 text-[9px] font-light leading-4 text-moss-ink/40">
                未评分不代表零程度；未记录不代表未发生。均分仅计算已评分记录。
              </p>

              <div className="mt-4 border-t border-dashed border-moss-green/25 pt-3">
                <p className="text-[11px] font-medium text-moss-ink/70">
                  想在就诊时补充的内容
                </p>
                <p className="mt-1 text-[10px] font-light leading-4 text-moss-ink/40">
                  可在这里补写想问的问题、近期变化，或需要向医生解释的背景。
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-sm bg-white/60 p-5 ring-1 ring-moss-green/10">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-xs font-medium text-moss-ink/70">
                  2026 年 10 月 9 日 星期五
                </h4>
                <span className="text-[10px] font-light text-moss-ink/35">第 2 页起</span>
              </div>
              <p className="mt-3 text-[11px] font-medium text-moss-ink/65">09:20</p>
              <p className="mt-1 text-[11px] text-moss-ink/60">疲惫 · 程度 2/5</p>
              <p className="text-[11px] text-moss-ink/60">注意力差 · 程度 2/5</p>
              <p className="mt-1 text-[10px] font-light leading-4 text-moss-ink/45">
                补充：昨晚睡得晚。早上读东西时需要重看几遍。
              </p>
            </div>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 克制 */}
      <GrowthSection title="克制" subtitle="找到一个需求点，只解决这个需求点">
        <p>
          不做每日打卡，不做算法提醒，不做趋势评价，不做诊断建议。App 里也没有统计图表——
          它不负责评估，只负责留下记录。
        </p>

        <div className="mt-6 hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-moss-green/20">
                <th className="py-2 pr-3 font-medium text-moss-ink/60">做法</th>
                <th className="py-2 font-medium text-moss-ink/60">原因</th>
              </tr>
            </thead>
            <tbody className="text-moss-ink/70">
              {principles.map((item) => (
                <tr key={item.rule} className="border-b border-moss-warm/50">
                  <td className="py-3 pr-3 font-medium text-moss-ink/80">{item.rule}</td>
                  <td className="py-3">{item.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 md:hidden">
          {principles.map((item) => (
            <div key={item.rule} className="rounded-lg bg-moss-warm/30 p-4">
              <h3 className="text-sm font-medium text-moss-ink/80">{item.rule}</h3>
              <p className="mt-1 text-sm leading-6 text-moss-ink/65">{item.why}</p>
            </div>
          ))}
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 隐私 */}
      <GrowthSection title="隐私" subtitle="本机唯一副本，是一种边界的选择">
        <ul className="space-y-2">
          <li>· 记录只写入本机 WebView 的 localStorage。</li>
          <li>· Android 清单不申请网络权限，也不申请存储权限。</li>
          <li>· 系统云备份已关闭，记录不会同步到云端。</li>
          <li>· 导出 Word 走系统文件保存器，App 不访问其他文件。</li>
        </ul>

        <div className="mt-6 rounded-lg border border-moss-green/25 bg-moss-light/50 p-4">
          <h3 className="text-sm font-medium text-moss-ink/80">代价也要说清楚</h3>
          <p className="mt-1 text-sm leading-6 text-moss-ink/65">
            卸载应用或清除应用数据，记录会一起消失。换手机时，把记录全部导出、单独存着就好。
          </p>
          <p className="mt-2 text-sm leading-6 text-moss-ink/65">
            它只是一个辅助工具——一次复诊不会因为缺少了它就不能进行。也有一部分原因是个人能做到的有限，
            一个简单的后端似乎也没太必要。
          </p>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 视觉 */}
      <GrowthSection title="视觉" subtitle="通用、舒适、有温度" layout="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p>
              它不是医疗产品，也不负责评估，所以界面里没有医疗蓝、没有量表、没有红色警告、没有分数环，
              也没有「今日未记录」的催促。视觉上只用纸的底色、苔绿和墨色，叶子是唯一的装饰。
            </p>
            <p className="mt-4">
              它不针对某一种诊断，也不想显得像某家医院的产品。目标是让用户下载、打开、看几眼、
              点几下，就知道怎么用——把学习成本降到最低，把注意力留给记录本身。
            </p>
            <p className="mt-4">
              记录页把「已经选中的词」放在最上面，程度和补充依次展开；未选标签之前，页面几乎是空的。
              它不要求你填满，只等你留下第一个词。
            </p>
          </div>

          <figure className="mx-auto w-full max-w-[300px] lg:mx-0">
            <img
              src="/projects/cike/interface.jpg"
              alt="此刻的记录界面"
              loading="lazy"
              className="w-full rounded-[2rem] border border-white/70 shadow-[0_24px_70px_rgba(58,74,56,0.14)]"
            />
            <figcaption className="mt-4 text-center text-xs font-light leading-5 text-moss-ink/50">
              记录页 · 标签、程度与自由描述
            </figcaption>
          </figure>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 迭代 */}
      <GrowthSection title="从 0.1.0 到 0.1.4" subtitle="两周，把「能记」推到「更愿意记」">
        <p>
          版本没有增加新模块。改动都集中在两件事：降低记录摩擦，保留用户自己的语言。
        </p>
        <p className="mt-4">
          「记下此刻」这部分改了很多次——操作流程、标签布局都反复调整，最后把一次记录压到三个动作：
          打开、点标签、记下。先留住印记，状态好一点再补充。一个人难受的时候，哪怕知道该记一下，
          也会非常嫌麻烦；能简化就简化，先记了再说，这才是它发挥作用的起点。
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {threeSteps.map((step, index) => (
            <div
              key={step.n}
              className="relative rounded-lg bg-moss-light/50 p-4 ring-1 ring-moss-green/15"
            >
              <span className="text-xs font-light tracking-[0.2em] text-moss-deep/70">
                {step.n}
              </span>
              <h3 className="mt-2 font-wenkai text-xl font-light text-moss-ink/85">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-moss-ink/60">{step.text}</p>
              {index < threeSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-moss-green/60 sm:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-4">
          {versions.map((version) => (
            <div key={version.tag} className="flex items-start gap-4">
              <span className="mt-0.5 shrink-0 self-start rounded-full bg-moss-green/20 px-2.5 py-0.5 text-xs font-medium text-moss-deep">
                {version.tag}
              </span>
              <p className="text-sm leading-6 text-moss-ink/65">{version.note}</p>
            </div>
          ))}
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 验证与未完成 */}
      <GrowthSection title="验证与未完成" subtitle="一个朋友没有继续用">
        <p>
          朋友用过，但还没给医生看过。她说她不想记录——可能因为就医太久，疲了。
        </p>
        <p className="mt-4">
          这当然不适用于所有人。有记录意愿是前提；这个工具只是让愿意记录的人，更容易记下来。
        </p>
        <p className="mt-4">
          我也怀疑过它是不是伪需求。但门诊里那些「说不清」的时刻是真实的；问题可能不在需求，
          而在记录的成本和持续性。不能因为一个人放弃，就否定这个需求——但如何让人愿意长期使用，
          确实是下一步要回答的问题。
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-sm font-medium text-moss-ink/80">已经知道</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-moss-ink/65">
              <li>· 一次记录可以压到三个动作。</li>
              <li>· 标签能覆盖常见的日常表达。</li>
              <li>· 导出能回答医生的第一句话。</li>
            </ul>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="text-sm font-medium text-moss-ink/80">还不知道</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-moss-ink/65">
              <li>· 医生是否真的会用这份文档。</li>
              <li>· 长期使用会不会厌倦。</li>
              <li>· 标签和描述是否足够准确。</li>
            </ul>
          </div>
        </div>

        <p className="mt-6">
          下一步：找医生评价一下，或去小红书招募测试者，优化流程、标签和描述。
          不为了丰富而加功能。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 说明与项目信息 */}
      <GrowthSection title="说明">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-light tracking-[0.15em] text-moss-ink/45">时间</dt>
            <dd className="mt-1 text-sm text-moss-ink/70">2026 年 10 月，约两周</dd>
          </div>
          <div>
            <dt className="text-xs font-light tracking-[0.15em] text-moss-ink/45">角色</dt>
            <dd className="mt-1 text-sm text-moss-ink/70">
              独立完成：研究、交互、视觉；开发与 AI 协作
            </dd>
          </div>
          <div>
            <dt className="text-xs font-light tracking-[0.15em] text-moss-ink/45">类型</dt>
            <dd className="mt-1 text-sm text-moss-ink/70">个人项目 · Android 工具</dd>
          </div>
          <div>
            <dt className="text-xs font-light tracking-[0.15em] text-moss-ink/45">边界</dt>
            <dd className="mt-1 text-sm text-moss-ink/70">
              本机存储，不联网；非医疗器械，判断留给医生
            </dd>
          </div>
        </dl>

        <p className="mt-8 text-sm leading-6 text-moss-ink/55">
          个人工具，代码按现状提供。不提供医疗建议，也不能替代诊断。
        </p>

        <blockquote className="mt-8 border-l-2 border-moss-green/60 pl-5">
          <p className="font-wenkai text-xl font-light leading-relaxed text-moss-ink/80 sm:text-2xl">
            找到一个需求点，就只解决这个需求点。不画蛇添足，不自以为是，更不去代替什么。
          </p>
        </blockquote>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
