"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function XiaojiBody() {
  return (
    <>
      {/* 项目概述 */}
      <GrowthSection title="概述" subtitle="2026年6月 · 独立完成">
        <p>
          洄是一个从零训练的 73M 参数中文对话语言模型，猫系桌面宠物角色。
          不是调用 API，而是完整走通了「数据管线 → 模型架构 → 预训练 →
          对话微调 → 推理部署」的全流程。
        </p>
        <p className="mt-4">
          硬件限制：RTX 4050 Laptop 6GB VRAM，在消费级笔记本显卡上完成全量训练。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 模型架构 */}
      <GrowthSection title="模型架构" subtitle="基于 Transformer 的轻量设计">
        <ul className="space-y-2">
          <li>· 参数量：73M（d_model=512, 16 layers, 8 heads, d_ff=2048）</li>
          <li>· 组件：SwiGLU FFN / RoPE 位置编码 / RMSNorm 归一化</li>
          <li>· 词表：12,000（BPE 分词器，自行训练）</li>
          <li>· 特殊 Token：&lt;user&gt; / &lt;assistant&gt; / &lt;system&gt;</li>
          <li>· 最大序列长度：512</li>
        </ul>
      </GrowthSection>

      <GrowthDivider />

      {/* 训练流程 */}
      <GrowthSection title="训练流程" subtitle="两阶段训练">
        <h3 className="mb-2 text-base font-medium text-moss-ink/85">
          第一阶段 — Wiki 预训练
        </h3>
        <p>
          中文 Wikipedia 语料，让模型学会基础语言能力。
          得到 best_model.pt（577MB），作为后续微调的基础。
        </p>

        <h3 className="mb-2 mt-6 text-base font-medium text-moss-ink/85">
          第二阶段 — 对话微调
        </h3>
        <p>
          混合数据训练：猫设角色扮演对话 ~44k 对 + LCCC
          微博中文闲聊 ~50k-200k 对（Claude:LCCC ≈ 2:1）。
          训练配置：epochs=5-10, batch_size=8, peak_lr=1e-4。
        </p>

        <h3 className="mb-2 mt-6 text-base font-medium text-moss-ink/85">
          关键技术细节
        </h3>
        <ul className="space-y-1">
          <li>
            · Loss Masking：只对 assistant
            回复计算 loss，显式布尔状态机追踪 in_asst
          </li>
          <li>· Checkpoint 热启动：strict=False 加载，支持架构升级后迁移</li>
          <li>· 数据清洗：CJK 字符间空格 strip</li>
          <li>· System Prompt 多样性：7 种变体 + 12% dropout 防过拟合</li>
        </ul>
      </GrowthSection>

      <GrowthDivider />

      {/* 数据清洗与迭代 */}
      <GrowthSection title="数据清洗与迭代" subtitle="不是一次就跑通——反复洗数据、调比例、重训练">
        <h3 className="mb-2 text-base font-medium text-moss-ink/85">
          LCCC 数据的意外干扰
        </h3>
        <p>
          一开始以为越多通用中文对话越好，所以从 LCCC 抽了大量微博闲聊数据。
          但实际训练后发现，LCCC 里大量的口语化表达和生活场景内容反而成了噪音——
          比如「今天吃了什么」「周末去哪玩」这类对话和猫设角色的语境完全不搭，
          模型学了之后回复开始变得口语化、闲聊化，冲淡了角色的一致性。
        </p>
        <p className="mt-2">
          另外 LCCC 数据里存在大量汉字间空格（如「会 有 你 的」），
          这是因为原始数据的分词残留。虽然写了 <code>strip_cjk_spaces()</code> 清洗函数，
          但第一次跑数据管线时漏掉了这一步，导致模型输出也带上了空格污染。
        </p>

        <h3 className="mb-2 mt-6 text-base font-medium text-moss-ink/85">
          长句子的影响
        </h3>
        <p>
          对话数据中有一些特别长的句子——几十上百字的连续独白。
          这些长句子在训练时会导致 attention 分散，模型学到的不是「对话」，
          而是「自言自语」。后来加了长度过滤，超过一定阈值的对话对被排除或截断，
          回复质量明显改善。
        </p>

        <h3 className="mb-2 mt-6 text-base font-medium text-moss-ink/85">
          过拟合与反复调试
        </h3>
        <p>
          73M 的参数吃 ~1168 万 token 的数据，很快就出现过拟合——
          模型开始逐字重复自己的回复（「去躺着歇一会儿。去躺着歇一会儿。」），
          或者陷入 emoji 循环（🥺😗 一直刷）。
        </p>
        <p className="mt-2">
          解决不是一次性的——是一个反复调整、重跑、再观察的循环：
        </p>
        <ul className="mt-2 space-y-1">
          <li>
            · 调整混合比例：Claude 对话比例从 2:1 降到 1:1 再调回来，
            在角色一致性和通用对话能力之间找平衡
          </li>
          <li>
            · 增加 LCCC 数据量：从 50k 加到 100k、200k，观察通用数据
            能否压制过拟合——有效，但加太多又会冲淡角色
          </li>
          <li>
            · 调整 System Prompt：7 种变体加 12% dropout，让模型不依赖
            某一种固定的开场白
          </li>
          <li>
            · 调整训练轮数：从 10 epoch 降到 5 epoch，减少过拟合风险
          </li>
          <li>
            · 推理端加拦截：有些问题训练侧解决不了，只能在推理端硬截——
            emoji 循环截断、复读检测、标点压缩
          </li>
        </ul>
        <p className="mt-3">
          整个过程前前后后重跑了不下十轮。每次改一个变量，跑一遍训练，
          看生成效果，再决定下一步改什么。没有标准答案，只能靠迭代摸索。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 推理部署 */}
      <GrowthSection title="推理与角色控制" subtitle="让 AI 保持猫设、不崩人设">
        <p>推理端实现了多道拦截机制，打磨「像真人聊天」的体验：</p>
        <ul className="mt-2 space-y-1">
          <li>· Emoji 循环截断（🥺😗 偶发 → 自动截断）</li>
          <li>· 猫设复读检测与截断</li>
          <li>· 标点压缩</li>
          <li>· 历史 6 轮自动清零（防止长上下文退化）</li>
          <li>· Claude 系统消息泄露过滤</li>
        </ul>
        <p className="mt-3">
          生成参数：temperature=0.65, repetition_penalty=1.4
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 测试对话 */}
      <GrowthSection title="不同时期的测试对话" subtitle="训练过程中的对话样本">
        <h3 className="mb-3 text-base font-medium text-moss-ink/85">
          早期（Wiki 预训练后，对话微调初期）
        </h3>
        <div className="rounded-lg bg-moss-warm/40 p-5 font-light leading-7 text-moss-ink/65">
          <p>
            <span className="text-moss-ink/40">你：</span>小洄？
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>
            你不说我是谁
          </p>
          <p className="mt-2">
            <span className="text-moss-ink/40">你：</span>你是谁
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>
            你忘了？我是洄呀！
          </p>
          <p className="mt-2">
            <span className="text-moss-ink/40">你：</span>哦好的，洄~
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>
            嗯，去吧。今天走了不少路。上课呢？还是下个星期多？还有一个月？
          </p>
          <p className="mt-3 text-sm text-moss-ink/30">
            ↑ 早期：能识别身份但容易跑题，句子间缺乏连贯性
          </p>
        </div>

        <h3 className="mb-3 mt-8 text-base font-medium text-moss-ink/85">
          中期（LCCC 混合微调后）
        </h3>
        <div className="rounded-lg bg-moss-warm/40 p-5 font-light leading-7 text-moss-ink/65">
          <p>
            <span className="text-moss-ink/40">你：</span>吃草莓吗
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>吃了，好。
          </p>
          <p className="mt-2">
            <span className="text-moss-ink/40">你：</span>你想我吗
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>想。
          </p>
          <p className="mt-2">
            <span className="text-moss-ink/40">你：</span>你想啥呢
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>你想我吗。
          </p>
          <p className="mt-3 text-sm text-moss-ink/30">
            ↑ 中期：能直接回答问题，开始有猫系简短风格；但偶发重复和过拟合
          </p>
        </div>

        <h3 className="mb-3 mt-8 text-base font-medium text-moss-ink/85">
          后期（调整数据比例 + 优化推理拦截后）
        </h3>
        <div className="rounded-lg bg-moss-warm/40 p-5 font-light leading-7 text-moss-ink/65">
          <p>
            <span className="text-moss-ink/40">你：</span>你真好
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>哼！
          </p>
          <p className="mt-2">
            <span className="text-moss-ink/40">你：</span>哈哈哈哈哈爱你
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>哼，你在说啥？
          </p>
          <p className="mt-2">
            <span className="text-moss-ink/40">你：</span>（探头）
          </p>
          <p>
            <span className="text-moss-green/70">洄：</span>嗯，在。
          </p>
          <p className="mt-3 text-sm text-moss-ink/30">
            ↑ 后期：猫设稳定——傲娇+嘴硬+温柔底色。「哼」和「嗯，在」之间
            是同一个人
          </p>
        </div>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
