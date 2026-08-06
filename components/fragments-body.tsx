"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function FragmentsBody() {
  return (
    <>
      <GrowthSection title="碎片与连线" subtitle="还没长成形状的想法">
        <p>
          这里放的是一些零碎的观察、跨领域的连接、半成型的思考。
          它们是种子——有些会发芽，有些不会。
        </p>
        <p className="mt-4">
          不一定有结论，不一定有结构。但有时候，
          一个碎片的旁边恰好有另一个碎片，它们之间突然出现了一条线。
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="一些在想的">
        <div className="space-y-6">
          <div className="rounded-lg bg-moss-warm/30 p-5">
            <h3 className="font-medium text-moss-ink/80">
              关于 AI 角色的「真实感」
            </h3>
            <p className="mt-2">
              什么样的 AI 回复让人感觉「它真的经历过什么」？
              不是知识的准确度，不是语言的自然度——好像是某种一致性。
              一个人说「哼」和说「嗯，在」之间，你能感觉到这是同一个人。
              这种一致性到底是什么？是可训练的吗？
            </p>
          </div>

          <div className="rounded-lg bg-moss-warm/30 p-5">
            <h3 className="font-medium text-moss-ink/80">
              关于「有用」和「我在乎」的区别
            </h3>
            <p className="mt-2">
              一个产品可以很有用但用户不在乎它。
              一个东西可以没什么实用价值但你就是想留着。
              设计能控制「有用」，但「被在乎」好像是规则之外的产物——
              就像光遇里两个陌生人递蜡烛的瞬间。
            </p>
          </div>

          <div className="rounded-lg bg-moss-warm/30 p-5">
            <h3 className="font-medium text-moss-ink/80">
              关于 OC 和设计角色
            </h3>
            <p className="mt-2">
              长期 OC 创作让我意识到：角色不是被「设定」出来的，
              是被「时间」养出来的。一开始你给角色写性格、写背景故事——
              但几年之后，你不再需要「设计」它了，你只是在记录它。
              这和训练 AI 角色的过程有某种相似——规则只是起点，
              后面的事是涌现出来的。
            </p>
          </div>

          <div className="rounded-lg bg-moss-warm/30 p-5">
            <h3 className="font-medium text-moss-ink/80">
              关于「不做社群，做工具」的选择
            </h3>
            <p className="mt-2">
              守护星和 CPTSD 两个项目都明确选择了不做社群。
              这个选择不是功能取舍，是对目标用户更深层的理解——
              当一个人连日常社交都消耗巨大的时候，「加入社群」不是帮助，
              是负担。但有趣的是，工具本身也可以创造连接——
              就诊地图、咨询师推荐，这些功能的本质也是连接，
              只是不叫「社群」。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="会持续更新">
        <p>
          这个页面是活的。有些碎片会慢慢长成完整的项目，
          有些会一直留在这里。两种结果都可以。
        </p>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
