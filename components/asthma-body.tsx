"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function AsthmaBody() {
  return (
    <>
      <GrowthSection title="概述" subtitle="为哮喘患者设计的居家空气守护系统 · 小组合作项目">
        <p>
          一款手掌大小的家居空气质量监测设备。核心理念：把不可见的空气风险
          翻译成直觉可感知的光，让监测不再需要「主动去看」。
        </p>
        <p className="mt-2 text-sm text-moss-ink/40">
          * 与张如合作的小组课程项目。本人负责：调查问卷设计与数据分析、硬件原型搭建（传感器选型/面包板验证/BOM核算），用户研究与竞品分析各承担一半。
        </p>
        <p className="mt-4 text-xl font-light italic text-moss-green/80">
          「How might we dissolve the boundaries between medical intervention
          and domestic tranquility?」
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 问题背景 */}
      <GrowthSection title="问题背景" subtitle="一个被忽视的日常">
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-3xl font-light text-moss-green">81.8%</p>
            <p className="mt-1 text-xs text-moss-ink/50">家中无检测设备</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-3xl font-light text-moss-green">4.5%</p>
            <p className="mt-1 text-xs text-moss-ink/50">主动监测空气质量</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-3xl font-light text-moss-green">50.7%</p>
            <p className="mt-1 text-xs text-moss-ink/50">现有APP基于CBT</p>
          </div>
        </div>
        <p>
          现有空气质量检测产品的共同缺口：只有数字，不指导行动。
          用户看到 PM2.5 超标了，然后呢？开窗还是关窗？开空气净化器还是
          先离开房间？——这些产品都不回答。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 用户研究 */}
      <GrowthSection title="用户研究" subtitle="22 份有效问卷 · 2026年5月">
        <h3 className="mb-3 text-base font-medium text-moss-ink/80">受访者画像</h3>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <p className="text-xl font-light text-moss-green">72.7%</p>
            <p className="text-xs text-moss-ink/50">女性</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <p className="text-xl font-light text-moss-green">59.1%</p>
            <p className="text-xs text-moss-ink/50">30-50岁</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <p className="text-xl font-light text-moss-green">86.4%</p>
            <p className="text-xs text-moss-ink/50">与家人同住</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <p className="text-xl font-light text-moss-green">81.8%</p>
            <p className="text-xs text-moss-ink/50">轻度患者</p>
          </div>
        </div>

        <h3 className="mb-3 text-base font-medium text-moss-ink/80">室内诱发因素（冰山模型）</h3>
        <div className="space-y-2">
          <div>
            <div className="mb-1 flex justify-between text-xs text-moss-ink/60">
              <span>使用空调/暖气时</span>
              <span>68.2%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div className="h-full rounded-full bg-moss-green/55" style={{ width: "68.2%" }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs text-moss-ink/60">
              <span>打扫/吸尘时</span>
              <span>63.6%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div className="h-full rounded-full bg-moss-green/50" style={{ width: "63.6%" }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs text-moss-ink/60">
              <span>使用清洁剂时</span>
              <span>50.0%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div className="h-full rounded-full bg-moss-green/40" style={{ width: "50%" }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs text-moss-ink/60">
              <span>烹饪时</span>
              <span>40.9%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div className="h-full rounded-full bg-moss-green/35" style={{ width: "40.9%" }} />
            </div>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 竞品 */}
      <GrowthSection title="竞品分析" subtitle="现有产品：「只显示数字，不指导行动」">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-moss-green/20">
                <th className="py-2 pr-3 font-medium text-moss-ink/60">产品</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">检测指标</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">交互方式</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">主动推送</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">外观定位</th>
              </tr>
            </thead>
            <tbody className="text-moss-ink/60">
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 font-medium text-moss-ink/75">Airthings</td>
                <td className="py-3">PM2.5/CO₂/VOC/温湿/氡</td>
                <td className="py-3">APP查看</td>
                <td className="py-3">有</td>
                <td className="py-3">科技感</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 font-medium text-moss-ink/75">Birdie 2.0</td>
                <td className="py-3">CO₂</td>
                <td className="py-3">小鸟物理下落</td>
                <td className="py-3">无</td>
                <td className="py-3">家居装饰</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 font-medium text-moss-ink/75">Awair</td>
                <td className="py-3">PM2.5/CO₂/VOC/温湿</td>
                <td className="py-3">APP+屏幕</td>
                <td className="py-3">有</td>
                <td className="py-3">科技感</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 font-medium text-moss-ink/75">青萍</td>
                <td className="py-3">PM2.5/CO₂/温湿</td>
                <td className="py-3">屏幕显示</td>
                <td className="py-3">无</td>
                <td className="py-3">简约电子</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-moss-green">本项目</td>
                <td className="py-3 text-moss-green/80">PM/CO₂/VOC/甲醛/温湿/噪声</td>
                <td className="py-3 text-moss-green/80">光语言+APP</td>
                <td className="py-3">
                  <span className="rounded-full bg-moss-green/15 px-2 py-0.5 text-xs text-moss-green">
                    主动预警
                  </span>
                </td>
                <td className="py-3 text-moss-green/80">家居装饰品</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 产品定义 */}
      <GrowthSection title="产品定义" subtitle="四个核心设计决策">
        <div className="space-y-4">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">① 无感监测优于主动查看</h3>
            <p className="mt-1">
              24 小时自动运行。不需要用户记得去查看、去打开 APP。
              空气质量出问题时，设备自己会告诉你。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">② 光语言替代屏幕</h3>
            <p className="mt-1">
              不用数字，用颜色和呼吸节奏传达信息。余光即可感知——
              就像你会注意到房间里的灯变了颜色，但不会觉得被打扰。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">③ 家居物件而非医疗器械</h3>
            <p className="mt-1">
              织物包裹 + 暖色系 + 手掌大小。放在床头或客厅不突兀，
              不需要藏起来，也不会让客人问「这是什么医疗设备」。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">④ 行动建议优于数字展示</h3>
            <p className="mt-1">
              不只告诉你 PM2.5 超标了，而是告诉你现在该做什么：
              开窗通风 / 关窗开净化器 / 暂时离开房间。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 系统架构 */}
      <GrowthSection title="系统架构" subtitle="居家主机 + 子节点 + 随身 + APP">
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-moss-warm/30 px-4 py-3">
            <span className="text-lg">🏠</span>
            <div>
              <h4 className="font-medium text-moss-ink/80">居家主机</h4>
              <p className="text-sm text-moss-ink/50">
                织物包裹的主监测设备，放在床头/客厅/厨房
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-moss-warm/30 px-4 py-3">
            <span className="text-lg">📡</span>
            <div>
              <h4 className="font-medium text-moss-ink/80">分类子节点</h4>
              <p className="text-sm text-moss-ink/50">
                布置在多个房间，覆盖全屋监测
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-moss-warm/30 px-4 py-3">
            <span className="text-lg">📱</span>
            <div>
              <h4 className="font-medium text-moss-ink/80">随身分身</h4>
              <p className="text-sm text-moss-ink/50">
                出门在外也能查看家中空气质量，接收预警
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-moss-warm/30 px-4 py-3">
            <span className="text-lg">📊</span>
            <div>
              <h4 className="font-medium text-moss-ink/80">APP 端</h4>
              <p className="text-sm text-moss-ink/50">
                7 大功能模块：Atmosphere / Invisible Triggers / Breathing
                Companion / Body×Environment / Care Circle / Learn Through
                Living / AI Reflection
              </p>
            </div>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 功能优先级 */}
      <GrowthSection title="功能优先级">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-moss-green/20">
                <th className="py-2 pr-3 font-medium text-moss-ink/60">优先级</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">模块</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">功能</th>
              </tr>
            </thead>
            <tbody className="text-moss-ink/60">
              <tr className="border-b border-moss-warm/50">
                <td className="py-2"><span className="rounded-full bg-moss-green/20 px-2 py-0.5 text-xs font-medium text-moss-green">P0</span></td>
                <td className="py-2">主动预警</td>
                <td className="py-2">空气质量异常时自动灯光+APP推送</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2"><span className="rounded-full bg-moss-green/20 px-2 py-0.5 text-xs font-medium text-moss-green">P0</span></td>
                <td className="py-2">无感监测</td>
                <td className="py-2">24小时自动运行，不需要用户查看</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2"><span className="rounded-full bg-moss-green/20 px-2 py-0.5 text-xs font-medium text-moss-green">P0</span></td>
                <td className="py-2">一键求助</td>
                <td className="py-2">物理SOS按钮 → 自动通知紧急联系人</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2"><span className="rounded-full bg-moss-green/20 px-2 py-0.5 text-xs font-medium text-moss-green">P0</span></td>
                <td className="py-2">行动指导</td>
                <td className="py-2">不只显示数字，给出具体操作建议</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2"><span className="rounded-full bg-moss-ink/15 px-2 py-0.5 text-xs text-moss-ink/50">P1</span></td>
                <td className="py-2">手机APP</td>
                <td className="py-2">远程查看、历史数据、症状记录</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2"><span className="rounded-full bg-moss-ink/15 px-2 py-0.5 text-xs text-moss-ink/50">P1</span></td>
                <td className="py-2">通风建议</td>
                <td className="py-2">综合天气+室内数据，建议是否开窗</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2"><span className="rounded-full bg-moss-ink/15 px-2 py-0.5 text-xs text-moss-ink/50">P1</span></td>
                <td className="py-2">症状追踪</td>
                <td className="py-2">简单记录症状 → 生成环境关联分析</td>
              </tr>
              <tr>
                <td className="py-2"><span className="rounded-full bg-moss-ink/10 px-2 py-0.5 text-xs text-moss-ink/40">P2</span></td>
                <td className="py-2">多房间覆盖</td>
                <td className="py-2">多设备组网，全屋空气质量热力图</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 灯光交互 */}
      <GrowthSection title="灯光交互设计" subtitle="5 种状态颜色 · 呼吸节奏编码信息">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-[#d4e8d4] shadow-[0_0_12px_rgba(180,210,180,0.5)]" />
            <p className="text-xs font-medium text-moss-ink/70">待机</p>
            <p className="text-xs text-moss-ink/40">冷白 · 常亮</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-[#7d9b6a] shadow-[0_0_12px_rgba(125,155,106,0.5)]" />
            <p className="text-xs font-medium text-moss-ink/70">良好</p>
            <p className="text-xs text-moss-ink/40">苔绿 · 6s慢呼吸</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-[#d4a84b] shadow-[0_0_12px_rgba(212,168,75,0.5)]" />
            <p className="text-xs font-medium text-moss-ink/70">轻度超标</p>
            <p className="text-xs text-moss-ink/40">琥珀 · 3s呼吸</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-[#d4784b] shadow-[0_0_12px_rgba(212,120,75,0.5)]" />
            <p className="text-xs font-medium text-moss-ink/70">中度超标</p>
            <p className="text-xs text-moss-ink/40">暖橙 · 1.5s呼吸</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3 text-center">
            <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-[#d45a5a] shadow-[0_0_12px_rgba(212,90,90,0.5)]" />
            <p className="text-xs font-medium text-moss-ink/70">严重</p>
            <p className="text-xs text-moss-ink/40">珊瑚红 · 快闪</p>
          </div>
        </div>
        <div className="rounded-lg bg-moss-warm/30 p-4">
          <h4 className="text-sm font-medium text-moss-ink/70">交互逻辑</h4>
          <ul className="mt-2 space-y-1 text-sm text-moss-ink/55">
            <li>· 待机冷白常亮 → 检测到超标指标后轮播显示</li>
            <li>· 呼吸频率编码严重程度：越紧迫呼吸越快</li>
            <li>· 多指标超标时，驻留时间按严重程度分配</li>
            <li>· 珊瑚红（严重级）豁免夜间模式——即使开了勿扰也会显示</li>
          </ul>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 硬件 */}
      <GrowthSection title="硬件与工程" subtitle="原型搭建 · BOM · 传感器选型">
        <h3 className="mb-3 text-base font-medium text-moss-ink/80">传感器配置</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-moss-green/20">
                <th className="py-2 pr-3 font-medium text-moss-ink/60">传感器</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">型号</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">原理</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">零售价</th>
              </tr>
            </thead>
            <tbody className="text-moss-ink/60">
              <tr className="border-b border-moss-warm/50">
                <td className="py-2 font-medium text-moss-ink/75">PM2.5/PM10</td>
                <td className="py-2">攀藤 PMS5003</td>
                <td className="py-2">激光散射</td>
                <td className="py-2">¥70-85</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2 font-medium text-moss-ink/75">温湿度</td>
                <td className="py-2">BME280 / AHT21</td>
                <td className="py-2">数字 I²C</td>
                <td className="py-2">¥10-20</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2 font-medium text-moss-ink/75">TVOC/eCO₂</td>
                <td className="py-2">ENS160</td>
                <td className="py-2">MOX 半导体</td>
                <td className="py-2">¥15-25</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-2 font-medium text-moss-ink/75">甲醛</td>
                <td className="py-2">煊康 ZE08-CH2O</td>
                <td className="py-2">电化学</td>
                <td className="py-2">¥60-80</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-moss-ink/75">CO₂</td>
                <td className="py-2">Sensirion SCD40</td>
                <td className="py-2">光声式</td>
                <td className="py-2">¥65-80</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mb-3 mt-8 text-base font-medium text-moss-ink/80">BOM 成本</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-sm text-moss-ink/50">原型散买（1台）</p>
            <p className="text-2xl font-light text-moss-green">¥300–420</p>
            <p className="mt-1 text-xs text-moss-ink/40">
              传感器 ¥140-185 + CO₂ ¥65-80 + 主控 ¥25-35 + 交互 ¥25-40 + 电源 ¥30-50 + 外壳 ¥15-30
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-sm text-moss-ink/50">量产估算（1000台）</p>
            <p className="text-2xl font-light text-moss-green">¥145–220</p>
            <p className="mt-1 text-xs text-moss-ink/40">
              对比市面竞品 ¥500-1500 零售价，成本空间健康
            </p>
          </div>
        </div>

        <h3 className="mb-3 mt-8 text-base font-medium text-moss-ink/80">外观设计：去医疗化策略</h3>
        <p>
          采用织物包裹方案——内部功能结构件（格栅+气道），外套可更换织物套，
          同时解决进气透气、视觉温暖、隔尘三大需求。
          外壳尺寸目标：10×10×5cm，手掌大小。
        </p>
        <p className="mt-2">
          气道设计：PM 传感器自带风扇主动抽气，需要独立进出气口；
          CO₂/VOC/甲醛传感器被动扩散；温湿度传感器必须热隔离，
          远离 ESP32 和 PM 传感器，布置在独立小腔中。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 原型验证 */}
      <GrowthSection title="原型验证" subtitle="面包板搭建 · 传感器数据跑通">
        <h3 className="mb-3 text-base font-medium text-moss-ink/80">裸板验证（第一阶段）</h3>
        <p>
          ESP32 开发板 + PMS5003（UART）+ ENS160+AHT21（I²C）+
          RGB LED（PWM 驱动呼吸灯效），在面包板上完成所有传感器数据读取。
          代码实现了 PMS5003 帧头校验（0x42+0x4D）、ENS160 标准模式测量、
          五级空气质量状态判定逻辑、正弦呼吸灯驱动。
        </p>

        <h3 className="mb-3 mt-6 text-base font-medium text-moss-ink/80">原型搭建路线（四阶段）</h3>
        <div className="space-y-3">
          <div className="rounded-lg bg-moss-warm/30 p-3">
            <h4 className="text-sm font-medium text-moss-ink/70">
              阶段 1：裸板传感器验证（¥400 以内，1-2 周）✅ 已完成
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              面包板跑通所有传感器，确认数据可用，PMS5003 / ENS160 / AHT21
              均正常读取
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3">
            <h4 className="text-sm font-medium text-moss-ink/70">
              阶段 2：PCB 集成原型（¥200-300，1-2 周）
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              定制 PCB，解决 I²C 总线冲突、PM 传感器独立供电、布局与外壳对应
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3">
            <h4 className="text-sm font-medium text-moss-ink/70">
              阶段 3：外壳集成原型（¥50-100，1 周）
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              3D 打印外壳，PCB 装进去，验证气流、散热、交互
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-3">
            <h4 className="text-sm font-medium text-moss-ink/70">
              阶段 4：用户验证原型（¥100-200）
            </h4>
            <p className="mt-1 text-sm text-moss-ink/50">
              小批量打印 3-5 台，从问卷受访者中招募目标用户试用 1-2 周
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="下一步">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-sm font-medium text-moss-ink/70">3D 打印外壳集成</p>
            <p className="mt-1 text-xs text-moss-ink/45">
              PCB 装入外壳，验证气流和散热
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-sm font-medium text-moss-ink/70">APP 界面视觉设计</p>
            <p className="mt-1 text-xs text-moss-ink/45">
              7 大模块的信息架构与视觉落地
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-sm font-medium text-moss-ink/70">用户测试招募</p>
            <p className="mt-1 text-xs text-moss-ink/45">
              从问卷受访者中招募，验证核心假设
            </p>
          </div>
        </div>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
