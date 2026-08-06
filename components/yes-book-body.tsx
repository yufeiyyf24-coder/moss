"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function YesBookBody() {
  return (
    <>
      <GrowthSection title="关于这本书" subtitle="暂定名：《Yes》· 写作中">
        <p>
          这不是一本教材，而是一次追问。从神经科学、心理学到 AI
          和动物行为学，这本书穿过不同学科，反复回到同一个问题：
        </p>
        <p className="mt-4 text-2xl font-light italic leading-relaxed text-moss-green/80 sm:text-3xl">
          「一个复杂系统，什么时候开始说『我』？」
        </p>
        <p className="mt-4">
          写作气质：短、跳、不过度解释。不灌输，不兜售结论。
          读者跟着跑，最后发现这些看似无关的碎片全是同一件事的不同切面。
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="全书目录" subtitle="五部分 · 15 章">
        {/* Part 1 */}
        <h3 className="mb-4 text-lg font-medium text-moss-ink/80">
          第一部分：是谁在感知？
        </h3>
        <div className="space-y-4 rounded-lg bg-moss-warm/30 p-5">
          <div>
            <h4 className="font-medium text-moss-ink/75">
              01 · 我看到了一只猫
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              感知不是录像，而是预测 / 错觉为什么存在 /
              大脑如何建模世界 / AI 为什么也需要预测
              <span className="ml-2 text-moss-green/60">— Prediction</span>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              02 · 我真的记得吗？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              记忆不是硬盘 / reconsolidation / 睡眠整理记忆 / 梦是压缩日志 /
              阿尔茨海默症：索引崩溃
              <span className="ml-2 text-moss-green/60">— Memory</span>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              03 · 谁在做决定？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              Agent 投票 / 自由意志 / LLM Agent / 章鱼为什么那么特别 /
              微服务架构
              <span className="ml-2 text-moss-green/60">— Decision</span>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              04 · 「我」到底是谁？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              Ship of Theseus / 意识连续性的幻觉 / 「活」过来的角色 /
              自我是过程，不是实体 / Self 作为协议
              <span className="ml-2 text-moss-green/60">— Self</span>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              05 · 我们怎么认出另一个「自我」
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              主体性的判断 / 「另一个主体」一定要是真实的吗 /
              承认另一个主体的恐惧 / 跨越次元的关系 / 共情是否创造了「他者」
            </p>
          </div>
        </div>

        {/* Part 2 */}
        <h3 className="mb-4 mt-8 text-lg font-medium text-moss-ink/80">
          第二部分：身体，比意识更早知道答案
        </h3>
        <div className="space-y-4 rounded-lg bg-moss-warm/30 p-5">
          <div>
            <h4 className="font-medium text-moss-ink/75">
              06 · 身体什么时候说 Yes？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              开放标签安慰剂 / 心因性发热 / 精神神经免疫学 /
              癌症自愈案例（谨慎讨论）/ 皮质醇
            </p>
            <p className="mt-1 text-sm italic text-moss-green/70">
              ——身体不懂生死，它只是在判断：Yes，还是 No。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              07 · 为什么哭会舒服？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              情绪性眼泪 / 皮质醇 / 为什么只有少数动物会哭 / 哭不是软弱
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              08 · 为什么有人喜欢吃辣？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              TRPV1 / 内啡肽 / 蹦极 / 恐怖片 / 感觉寻求
            </p>
            <p className="mt-1 text-sm italic text-moss-green/70">
              ——这一章讨论的其实是奖励系统。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              09 · 肠子也会思考吗？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              肠脑轴 / 血清素 / 迷走神经 / 微生物 ——最后回到：谁在影响谁？
            </p>
          </div>
        </div>

        {/* Part 3 */}
        <h3 className="mb-4 mt-8 text-lg font-medium text-moss-ink/80">
          第三部分：连接
        </h3>
        <div className="space-y-4 rounded-lg bg-moss-warm/30 p-5">
          <div>
            <h4 className="font-medium text-moss-ink/75">
              10 · 活下去，比吃饱更重要
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              哈洛恒河猴实验 / 依恋 / 抚摸 / 皮肤 / 婴儿 / 孤儿院
            </p>
            <p className="mt-1 text-sm italic text-moss-green/70">
              ——先有连接，才觉得活着值得。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              11 · 求生与停止
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              死本能 / 创伤 / 长期 No / 系统关闭 / 活着到底意味着什么
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">12 · 龙血树</h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              所有生命都在寻找继续存在的方法。龙血树只是其中一种答案。
            </p>
          </div>
        </div>

        {/* Part 4 */}
        <h3 className="mb-4 mt-8 text-lg font-medium text-moss-ink/80">
          第四部分：不同的世界
        </h3>
        <div className="space-y-4 rounded-lg bg-moss-warm/30 p-5">
          <div>
            <h4 className="font-medium text-moss-ink/75">
              13 · 神经多样性
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              ADHD / ASD / Tourette / 感觉寻求 / 注意力
            </p>
            <p className="mt-1 text-sm italic text-moss-green/70">
              ——不同的架构，看见不同的世界。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">
              14 · AI 为什么像我们？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              LLM / Token / Attention / Pattern / 补偿策略 / 字面理解
              ——理解，到底是什么？
            </p>
          </div>
        </div>

        {/* Part 5 */}
        <h3 className="mb-4 mt-8 text-lg font-medium text-moss-ink/80">
          第五部分：织网
        </h3>
        <div className="space-y-4 rounded-lg bg-moss-warm/30 p-5">
          <div>
            <h4 className="font-medium text-moss-ink/75">
              15 · 我们为什么需要故事？
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              Narrative Self / Default Mode Network /
              为什么人喜欢讲故事 / 为什么记忆总有剧情
            </p>
          </div>
          <div>
            <h4 className="font-medium text-moss-ink/75">16 · Yes.</h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              不讲新知识。只是把所有线重新织起来——睡眠、免疫、眼泪、章鱼、LLM、龙血树。
              全部回到一句话：生命从来没有学会什么叫活着。它只是无数个微小的系统，
              在每一个瞬间，对世界回答：Yes。
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-8 rounded-lg border border-moss-green/20 p-6">
          <p className="font-wenkai text-lg leading-relaxed text-moss-ink/70">
            也许，所谓意识，并不是一个站在系统中央的观察者。
            <br />
            而是当无数个「Yes」同时发生时，系统听见了自己的声音。
          </p>
          <p className="mt-3 text-sm text-moss-ink/35">
            ——全书结尾（暂定）
          </p>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="素材与跨学科视野" subtitle="为写作建立的素材库">
        <p>
          素材库覆盖 15 个跨学科条目，来自神经科学（预测编码、记忆再巩固、
          肠脑轴、精神神经免疫学）、心理学（依恋理论、安慰剂效应、感觉寻求）、
          AI/计算机科学（Agent 投票、微服务架构、LLM
          与 Token）、动物行为学（章鱼分布式智能、牛的情绪性眼泪）、
          植物学（龙血树）……
        </p>
        <p className="mt-4">
          每个条目不是简单的知识卡片，而是已经用自己的语言重新组织过，
          找到它们与「自我」这个核心问题之间的连接。
        </p>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
