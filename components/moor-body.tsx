"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function MoorBody() {
  return (
    <>
      <GrowthSection
        title="概述"
        subtitle="为 ADHD 用户设计的课堂 / 会议辅助副屏设备"
      >
        <p>
          针对 ADHD 用户在听课和会议场景中的核心痛点：
          跟丢了、词卡住了、看不到全局。一台 5
          寸独立副屏设备，不抢注意力，但帮助定锚。
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="核心功能">
        <ul className="space-y-4">
          <li className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">
              线性脉络（默认模式）
            </h3>
            <p className="mt-1">
              按时间滚动，高亮当前节点。像一条实时生长的线，
              用户不需要主动操作，内容自动推进。
            </p>
          </li>
          <li className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">
              树状全局（切换模式）
            </h3>
            <p className="mt-1">
              鱼骨图可视化，双指缩放切换粒度。从「现在讲到哪儿了」
              到「今天讲了哪些大块」，一目了然。
            </p>
          </li>
          <li className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">关键词解释</h3>
            <p className="mt-1">
              遇到专业术语自动标注，点击展开解释。不打断当前听讲，
              需要时才深入。
            </p>
          </li>
          <li className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">导出笔记</h3>
            <p className="mt-1">
              课后自动整理成结构化文档——不是逐字稿，是有脉络的知识地图。
            </p>
          </li>
        </ul>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="设计原则">
        <ul className="space-y-2">
          <li>· 低存在感——不抢注意力，余光即可感知状态</li>
          <li>· 走神回来能一眼定位——高亮当前节点，快速重建上下文</li>
          <li>· 需要时才展开——默认安静，点击才深入</li>
          <li>· 全程自管理——不需要用户主动操作，自动跟上课件节奏</li>
        </ul>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="硬件形态">
        <ul className="space-y-2">
          <li>· 5 寸屏，4:3 比例</li>
          <li>
            · 竖屏 480×640（待机 / 主屏 / 设置）/
            横屏 640×480（收音鱼骨图）
          </li>
          <li>· USB-C + 蓝牙，无 WiFi</li>
        </ul>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="配色语义">
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-[#7d9b6a] px-4 py-1.5 text-sm text-white">
            绿 · 当前节点
          </span>
          <span className="rounded-full bg-[#8b7e9b] px-4 py-1.5 text-sm text-white">
            紫 · 关键词可展开
          </span>
          <span className="rounded-full bg-[#c9a86a] px-4 py-1.5 text-sm text-white">
            琥珀 · 待讲
          </span>
          <span className="rounded-full bg-[#b8b8b0] px-4 py-1.5 text-sm text-white">
            暖灰 · 已过
          </span>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="状态机设计">
        <p className="font-mono text-sm leading-relaxed text-moss-ink/60">
          静默监听 → VAD 语音检测 → AI 判断有效内容 → 收音中 →
          偏离自动暂停 → 恢复或结束
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="当前状态">
        <p>概念阶段 / UI 原型。</p>
        <p className="mt-2">
          计划后续走树莓派样机——先在 Claude Code 上搓界面，
          再迁移到硬件。
        </p>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
