"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function LinhangBody() {
  return (
    <>
      <GrowthSection title="概述" subtitle="儿童环境监测与亲子情绪管理无人机">
        <p>
          面向 4-6 岁儿童家庭。不是传统的安全监控设备，而是一个
          「可移动的家庭情绪急救包」——在孩子情绪爆发的高压时刻，
          给家长提供即时、可操作的支撑，同时守护孩子的物理安全。
        </p>
        <p className="mt-2">
          完整的产品设计流程：用户画像 → 场景定义 → 四层洞察模型 →
          概念设计（三方案对比）→ 详细设计（CMF + 效果图 + 尺寸图）→
          使用流程图（室内+室外）。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 问题背景 */}
      <GrowthSection title="背景洞察" subtitle="4-6 岁：情绪认知发展的关键窗口">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-3xl font-light text-moss-green">4-6 岁</p>
            <p className="mt-1 text-xs text-moss-ink/50">情感发展关键期</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-3xl font-light text-moss-green">60%</p>
            <p className="mt-1 text-xs text-moss-ink/50">SEL教育后校园欺凌减少</p>
          </div>
        </div>
        <p>
          4-6 岁儿童正处于情绪认知发展的关键窗口期——共情能力在发展中、
          自我调节刚刚萌芽、社交情绪正在形成。这个阶段的情感教育质量，
          将影响一生的社交能力与心理健康。
        </p>
        <p className="mt-2">
          但传统的绘本说教和卡片抽问有两个致命问题：时机错误（情绪激动时
          无法理性学习）和脱离情境（抽象场景与真实冲突无法连接）。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 用户画像 */}
      <GrowthSection title="核心用户画像" subtitle="「效率维稳型家长」The Peacekeeper Parent">
        <div className="rounded-lg bg-moss-warm/30 p-5">
          <h3 className="font-medium text-moss-ink/80">典型画像</h3>
          <p className="mt-2">
            职场父母，工作育儿双重压力，心力交瘁，缺乏有效的情绪危机应对方法。
            核心驱动力：快速、高效、体面地恢复秩序。
          </p>
        </div>

        <h3 className="mb-3 mt-6 text-base font-medium text-moss-ink/80">三大核心痛点</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">1. 即时应对的无助感</h4>
            <p className="mt-1">
              孩子情绪爆发时「脑子一片空白」，所有育儿理论都无法应用。
              极度渴望清晰、可操作的即时指导。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">2. 自身情绪的失控感</h4>
            <p className="mt-1">
              在孩子的哭闹和外界压力下，自己的情绪也濒临崩溃，
              事后产生强烈的自责和愧疚。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">3. 现有方案的「非实战」性</h4>
            <p className="mt-1">
              尝试过绘本、课程等多种长期教育方式，但在危机爆发的当下，
              这些方法被认为「不落地」「不实战」。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 四个典型场景 */}
      <GrowthSection title="典型场景分析">
        <div className="space-y-4">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">
              场景 1 · 照本宣科的绘本说教
            </h4>
            <p className="mt-1 text-sm text-moss-ink/55">
              4 岁孩子抢玩具推了妹妹，妈妈立刻拿出绘本教育。
              痛点：时机错误（激动时无法理性学习）、脱离情境、单向灌输。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">
              场景 2 · 脱离情境的卡片抽问
            </h4>
            <p className="mt-1 text-sm text-moss-ink/55">
              爸爸用情绪卡片教 5 岁女儿认识「失望」「嫉妒」。
              痛点：认知超前（低龄无法理解复杂情绪）、缺乏实际体验支撑记忆。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">
              场景 3 · 公共场合的尴尬处理
            </h4>
            <p className="mt-1 text-sm text-moss-ink/55">
              超市里孩子因想买玩具大哭大闹，家长感到「所有人的目光都像探照灯」。
              痛点：社交压力 → 情绪失控 → 做出错误决策。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">
              场景 4 · 电子屏幕时间焦虑
            </h4>
            <p className="mt-1 text-sm text-moss-ink/55">
              孩子沉迷电子设备，找不到有效的替代活动。
              痛点：健康担忧 + 替代缺乏 + 管控困难 → 亲子冲突。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 四层模型 */}
      <GrowthSection title="四层洞察模型" subtitle="从痛点到概念的逻辑推导">
        <div className="relative space-y-0">
          {/* Layer 1 */}
          <div className="rounded-lg bg-moss-warm/40 p-4">
            <span className="text-xs font-medium text-moss-ink/40">痛点 PAIN</span>
            <p className="mt-1 text-moss-ink/75">
              家长在情绪危机时感到无助与尴尬——需要的不是教育，而是即时的支撑
            </p>
          </div>
          <div className="py-1 text-center text-moss-ink/25">↓</div>
          {/* Layer 2 */}
          <div className="rounded-lg bg-moss-warm/40 p-4">
            <span className="text-xs font-medium text-moss-ink/40">洞察 INSIGHT</span>
            <p className="mt-1 text-moss-ink/75">
              长期教育方式（绘本、卡片、课程）在危机当下全部失效——
              家长需要的是「此时此刻」能用的东西
            </p>
          </div>
          <div className="py-1 text-center text-moss-ink/25">↓</div>
          {/* Layer 3 */}
          <div className="rounded-lg bg-moss-warm/40 p-4">
            <span className="text-xs font-medium text-moss-ink/40">机会 OPPORTUNITY</span>
            <p className="mt-1 text-moss-ink/75">
              建立可移动的「家庭情绪急救包」——随身、即时、能在任何场景激活
            </p>
          </div>
          <div className="py-1 text-center text-moss-ink/25">↓</div>
          {/* Layer 4 */}
          <div className="rounded-lg bg-moss-green/15 p-4">
            <span className="text-xs font-medium text-moss-green/70">概念 CONCEPT</span>
            <p className="mt-1 text-moss-ink/80">
              智能监护与路径规划终端——危机预警 + 环境探查 + 语音引导 +
              路线规划，四位一体
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 产品定义 */}
      <GrowthSection title="产品定义" subtitle="麟航 · 四重核心功能">
        <div className="space-y-4">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/80">危机预警</h4>
            <p className="mt-1">
              AI 视觉识别 + 毫米波雷达 + 声音检测，主动发现儿童情绪和
              环境异常并预警。不是被动记录，是主动预判。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/80">路线规划</h4>
            <p className="mt-1">
              智能路径规划 + 安全区域设定。在出门前评估风险、规划路线，
              出行中提供实时环境监测和「B计划」——不给情绪爆发创造土壤。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/80">360° 环境探查</h4>
            <p className="mt-1">
              多种环境传感器 + 360° 旋转云台摄像头，将看不见的隐患
              转化为实时反馈。GPS 安全活动圈，超出范围自动预警。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/80">语音交互</h4>
            <p className="mt-1">
              温柔童声/监护人声纹 + 游戏化引导。在孩子情绪即将爆发时，
              用孩子愿意听的方式介入——不是命令，是邀请。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 概念设计 */}
      <GrowthSection title="概念设计" subtitle="三方案迭代 → 选定蝴蝶造型">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">方案一</h4>
            <ul className="mt-2 space-y-1 text-sm text-moss-ink/55">
              <li>· 方便收纳</li>
              <li>· 无方向性</li>
              <li>· 结构稳定</li>
            </ul>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">方案二</h4>
            <ul className="mt-2 space-y-1 text-sm text-moss-ink/55">
              <li>· 360° 旋转摄像头</li>
              <li>· 卡通外形</li>
              <li>· 呼吸光圈</li>
            </ul>
          </div>
          <div className="rounded-lg bg-moss-green/15 p-4">
            <h4 className="font-medium text-moss-green">方案三 ★ 选定</h4>
            <ul className="mt-2 space-y-1 text-sm text-moss-ink/60">
              <li>· 类蝴蝶外形</li>
              <li>· 呼吸光圈</li>
              <li>· 圆滑衔接</li>
              <li>· X 模式四轴布局</li>
            </ul>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 详细设计 */}
      <GrowthSection title="详细设计" subtitle="CMF · 尺寸 · 效果图">
        <h3 className="mb-3 text-base font-medium text-moss-ink/80">设计语言</h3>
        <ul className="space-y-1">
          <li>· 核心主题：守护、安全、引导</li>
          <li>· 造型原则：圆润无棱角、亲和力 + 科技感</li>
          <li>· 色彩方案：主体白 + 暖橙点缀 + 蓝色呼吸灯</li>
        </ul>

        <h3 className="mb-3 mt-6 text-base font-medium text-moss-ink/80">CMF 方案</h3>
        <ul className="space-y-1">
          <li>· 中央圆盘：枪色（Gunmetal）拉丝金属</li>
          <li>· 保护壳：半透明 PC，两种配色——米白+半透明 / 米白+亮黑</li>
          <li>· 转轴中心：精密的金属质感</li>
        </ul>

        <h3 className="mb-3 mt-6 text-base font-medium text-moss-ink/80">尺寸</h3>
        <ul className="space-y-1">
          <li>· 机身（含保护壳）：290 × 260 × 40mm</li>
          <li>· 摄像头：60 × 60mm</li>
        </ul>

        <h3 className="mb-3 mt-6 text-base font-medium text-moss-ink/80">关键部件</h3>
        <ul className="space-y-1">
          <li>· 360° 旋转摄像头（朝下、可自由转动）</li>
          <li>· 扬声器：360 度环绕音效</li>
          <li>· 底部集成多种环境传感器</li>
          <li>· 顶部 GPS 模块</li>
          <li>· LED 灯珠阵列（状态指示，待机微光）</li>
        </ul>
      </GrowthSection>

      <GrowthDivider />

      {/* 价值主张 */}
      <GrowthSection title="价值主张">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="text-sm font-medium text-moss-ink/70">痛点缓解</h4>
            <ul className="mt-2 space-y-1 text-sm text-moss-ink/55">
              <li>· 24h 不间断智能监护</li>
              <li>· 毫秒级危机预警与干预</li>
              <li>· 游戏化语音引导，避免冲突</li>
              <li>· 实时情绪状态监测反馈</li>
            </ul>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="text-sm font-medium text-moss-ink/70">收益创造</h4>
            <ul className="mt-2 space-y-1 text-sm text-moss-ink/55">
              <li>· 享受轻松愉快的亲子时光</li>
              <li>· 了解孩子行为模式，科学育儿</li>
              <li>· 成长轨迹记录，珍贵回忆</li>
              <li>· 个性化学习，持续优化守护策略</li>
            </ul>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="设计产出">
        <ul className="space-y-1">
          <li>· 用户画像 & 场景定义文档</li>
          <li>· 四层洞察模型</li>
          <li>· 价值主张画布</li>
          <li>· 概念设计三方案对比（含 3D 模拟图）</li>
          <li>· 详细设计：CMF 方案 + 三视图 + 效果图 + 尺寸图</li>
          <li>· 室内/室外双场景使用流程图</li>
          <li>· Gemini AI 辅助效果图生成</li>
        </ul>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
