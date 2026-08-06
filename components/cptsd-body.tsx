"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function CptsdBody() {
  return (
    <>
      <GrowthSection title="概述" subtitle="「安途」C-PTSD 双场景调节系统">
        <p>
          为 CPTSD（复杂性创伤后应激障碍）患者设计，由颈挂式骨传导耳机（外出端）
          和模块化智能坐垫（居家/办公端）组成的双场景干预系统。
        </p>
        <p className="mt-4">
          核心理念：将临床验证的创伤干预协议（稳定化技术、双侧刺激、体感安抚）
          隐形于日常穿戴与家居物品中，在病耻感为零的前提下提供实时被动守护。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 问题洞察 */}
      <GrowthSection title="问题洞察" subtitle="CPTSD 不只是 PTSD 的变体">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-medium text-moss-ink/80">CPTSD 的主要症状</h3>
            <ul className="mt-2 space-y-1">
              <li>· 情绪闪回——突然重新体验创伤时的情绪状态</li>
              <li>· 毒性羞耻感——持续、弥漫的自我厌恶</li>
              <li>· 自我遗弃——在需要帮助时反而孤立自己</li>
              <li>· 恶性内在批判（内在批判者）</li>
              <li>· 社交焦虑——对人际关系极度不信任</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium text-moss-ink/80">核心数据</h3>
            <ul className="mt-2 space-y-1">
              <li>· 全球约 6.1 亿人受 CPTSD 影响</li>
              <li>· 人群患病率 7.8%，平均治疗延迟 15-20 年</li>
              <li>· 现有心理健康 APP 中，CPTSD 专用产品为 0</li>
            </ul>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 用户研究 */}
      <GrowthSection title="用户研究" subtitle="JTBD 框架 + 用户旅程地图">
        <h3 className="mb-2 text-base font-medium text-moss-ink/85">核心 JTBD 需求</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">1. 提供及时干预</h4>
            <p className="mt-1">
              用户在情绪失控的瞬间可能会有自我伤害或逃避行为，但这反而会加剧
              自我厌恶。需要一个能提供强烈、即时、甚至是「指令式」感官刺激的
              工具来获得支撑。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h4 className="font-medium text-moss-ink/75">2. 结构化记录与指导</h4>
            <p className="mt-1">
              提供「结构化输入」和「智能化输出」，帮助用户将碎片化体验转化为
              看得见的具体信息，进而获得针对性指导。
            </p>
          </div>
        </div>

        <h3 className="mb-2 mt-6 text-base font-medium text-moss-ink/85">用户旅程</h3>
        <p className="font-mono text-sm leading-relaxed text-moss-ink/50">
          发现问题 → 隐私顾虑 → 匿名探索 → 技能学习 → 专业求助
        </p>

        <h3 className="mb-2 mt-6 text-base font-medium text-moss-ink/85">五大痛点</h3>
        <ul className="space-y-1">
          <li>· 痛点 1：专业资源稀缺与「求助无门」的绝望感</li>
          <li>· 痛点 2：急性发作时的「失控羞辱感」与病耻感</li>
          <li>· 痛点 3：长期自我调节的「持续性耗竭」</li>
          <li>· 痛点 4：创伤记忆的「身体固着」与认知干预失效</li>
          <li>· 痛点 5：康复进程的「孤立无反馈」导致习得性无助</li>
        </ul>
      </GrowthSection>

      <GrowthDivider />

      {/* 竞品分析 */}
      <GrowthSection title="竞品分析" subtitle="CPTSD 专用产品：0">
        {/* 市场全景 */}
        <h3 className="mb-4 text-base font-medium text-moss-ink/80">市场全景</h3>
        <div className="space-y-3">
          {/* PTSD APP */}
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-moss-ink/65">PTSD 相关 APP</span>
              <span className="font-medium text-moss-ink/75">69 个 · 均分 3.36 / 5.0</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div
                className="h-full rounded-full bg-moss-green/50"
                style={{ width: "92%" }}
              />
            </div>
            <p className="mt-1 text-xs text-moss-ink/35">
              基于 CBT 的比例 50.7%
            </p>
          </div>

          {/* 可穿戴 */}
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-moss-ink/65">可穿戴设备</span>
              <span className="font-medium text-moss-ink/75">25 个</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div
                className="h-full rounded-full bg-moss-green/45"
                style={{ width: "36%" }}
              />
            </div>
          </div>

          {/* AI chatbot */}
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-moss-ink/65">AI 聊天机器人</span>
              <span className="font-medium text-moss-ink/75">15 个</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div
                className="h-full rounded-full bg-moss-green/40"
                style={{ width: "22%" }}
              />
            </div>
          </div>

          {/* CPTSD */}
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-moss-green/80">CPTSD 专用产品</span>
              <span className="font-bold text-moss-green">0</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-moss-warm/50">
              <div
                className="h-full rounded-full bg-moss-green"
                style={{ width: "2px" }}
              />
            </div>
          </div>
        </div>

        {/* AI 聊天机器人对比 */}
        <h3 className="mb-4 mt-10 text-base font-medium text-moss-ink/80">
          AI 聊天机器人对比
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-moss-green/20">
                <th className="py-2 pr-3 font-medium text-moss-ink/60">产品</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">定位</th>
                <th className="py-2 pr-3 font-medium text-moss-ink/60">CPTSD 适配</th>
              </tr>
            </thead>
            <tbody className="text-moss-ink/65">
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 pr-3 font-medium text-moss-ink/75">Wysa</td>
                <td className="py-3 pr-3">情绪支持</td>
                <td className="py-3 pr-3">无针对性设计</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 pr-3 font-medium text-moss-ink/75">Woebot</td>
                <td className="py-3 pr-3">CBT 指导</td>
                <td className="py-3 pr-3">无针对性设计</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 pr-3 font-medium text-moss-ink/75">Replika</td>
                <td className="py-3 pr-3">陪伴聊天</td>
                <td className="py-3 pr-3">无针对性设计</td>
              </tr>
              <tr className="border-b border-moss-warm/50">
                <td className="py-3 pr-3 font-medium text-moss-ink/75">Tess</td>
                <td className="py-3 pr-3">多语言支持</td>
                <td className="py-3 pr-3">无针对性设计</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 font-medium text-moss-green">
                  安途（本项目）
                </td>
                <td className="py-3 pr-3 text-moss-green/80">
                  硬件 + App 双场景
                </td>
                <td className="py-3 pr-3">
                  <span className="rounded-full bg-moss-green/15 px-2 py-0.5 text-xs text-moss-green">
                    专为 CPTSD 设计
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 用户接受度 */}
        <h3 className="mb-4 mt-10 text-base font-medium text-moss-ink/80">
          AI 心理健康工具用户接受度
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-2xl font-light text-moss-green">22%</p>
            <p className="mt-1 text-xs text-moss-ink/50">已使用</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-2xl font-light text-moss-green">47%</p>
            <p className="mt-1 text-xs text-moss-ink/50">有兴趣使用</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-2xl font-light text-moss-green">60%</p>
            <p className="mt-1 text-xs text-moss-ink/50">疫情期开始</p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4 text-center">
            <p className="text-2xl font-light text-moss-green">90%</p>
            <p className="mt-1 text-xs text-moss-ink/50">关注隐私</p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 产品详细 */}
      <GrowthSection title="产品设计" subtitle="耳机（外出）+ 坐垫（居家）双场景覆盖">
        {/* 耳机 */}
        <h3 className="mb-3 text-base font-medium text-moss-ink/85">
          颈挂式骨传导耳机（外出端）
        </h3>
        <div className="rounded-lg bg-moss-warm/30 p-5 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">应激预警</h4>
            <p className="text-sm">
              实时采集心率变异性、皮肤电导与皮温，边缘 AI 识别创伤应激模式，
              3 秒内完成判断——区分运动/情绪/创伤应激。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">自动干预</h4>
            <p className="text-sm">
              触发后立即播放 EMDR 双侧交替音调、4-7-8 呼吸指令、
              5-4-3-2-1 接地引导。骨传导仅佩戴者能听到，旁人无感知。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">隐私保护</h4>
            <p className="text-sm">
              外观为运动耳机，无医疗标识。指示灯可完全关闭。紧急联络：
              长按 3 秒静默发送定位+生理数据给预设联系人。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">硬件参数</h4>
            <p className="text-sm">
              重量 45g / Nordic nRF5340 双核 SoC / PPG + GSR + 皮温传感器 /
              48h 续航（监测模式）/ BLE 5.3 端到端加密
            </p>
          </div>
        </div>

        {/* 坐垫 */}
        <h3 className="mb-3 mt-8 text-base font-medium text-moss-ink/85">
          模块化智能坐垫（居家/办公端）
        </h3>
        <div className="rounded-lg bg-moss-warm/30 p-5 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">压力映射</h4>
            <p className="text-sm">
              16×16 点阵柔性传感器实时绘制压力分布，
              识别肩颈-核心肌群代偿性紧张热点。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">触觉干预</h4>
            <p className="text-sm">
              针对热点区域启动 30-50Hz 微振动或 2Hz 双侧交替轻拍
              （模拟 EFT 拍打），强度 0.5-2G 可调，静音运行。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">呼吸同步</h4>
            <p className="text-sm">
              边缘柔光带 + 腰部气动推顶同步起伏，引导腹式呼吸节律
              （吸气 4s / 呼气 6s），灯光亮度随呼吸深度自动校准。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">姿势矫正</h4>
            <p className="text-sm">
              检测到「坍塌坐姿」（冻结反应典型体态）时腰部轻微振动提醒，
              帮助恢复直立开放姿态。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-moss-ink/70">场景接力</h4>
            <p className="text-sm">
              耳机记录外出高应激事件 → 坐垫在用户坐下瞬间自动开启
              「安抚模式」，灯光、振动、推顶同时启动，
              完成从外出应急到居家修复的无缝过渡。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* App */}
      <GrowthSection title="App：Re-Nurture" subtitle="基于「再抚育 (Re-parenting)」理论的数字安全空间">
        <p>
          不是简单的工具软件，而是一个将生物反馈技术与心理干预深度结合的
          数字安全空间。通过与硬件的无缝联动，系统实时感知用户的躯体化症状，
          提供 EMDR 模拟练习、感官接纳引导、AI 认知校准等多维支持方案。
        </p>
      </GrowthSection>

      <GrowthDivider />

      {/* 创新亮点 */}
      <GrowthSection title="创新亮点">
        <div className="space-y-4">
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">「零病耻」隐形急救</h3>
            <p className="mt-1">
              把 PTSD 临床急救协议藏进运动颈圈，地铁里 3 秒止颤却无人知晓。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">坐垫会「拥抱」</h3>
            <p className="mt-1">
              压力-气动-振动三联——识别紧张点 → 自动给腰一个 5N 的推顶 +
              双侧轻拍，像治疗师的手。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">眼动 EMDR 居家微剂量</h3>
            <p className="mt-1">
              1.2Hz 光棒 + 交替音 + 振动，午休 10 分钟完成一次迷你眼动脱敏——
              全球首款非手持自助 EMDR 硬件。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">数据安全</h3>
            <p className="mt-1">
              原始生理信号不出设备，AI 只上传脱敏特征。急性发作无云端也能
              100% 本地干预。
            </p>
          </div>
          <div className="rounded-lg bg-moss-warm/30 p-4">
            <h3 className="font-medium text-moss-ink/80">场景接力</h3>
            <p className="mt-1">
              耳机在外触发 → 坐垫在家迎接，BLE 无缝切换，
              实现 24h 连续「情绪接力棒」，行业首次跨场景闭环。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      {/* 材料与工艺 */}
      <GrowthSection title="CMF 策略" subtitle="参考无印良品/网易严选家居美学">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-medium text-moss-ink/80">耳机</h3>
            <ul className="mt-2 space-y-1">
              <li>· 色彩：深空灰（稳重包裹感）/ 暖白（亲和力），点缀琥珀金</li>
              <li>· 材料：记忆钛合金骨架 + 亲肤医用级硅胶 + 陶瓷感振子面板</li>
              <li>· 工艺：哑光细颗粒喷砂（防指纹防反光）、隐藏式微孔按键</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium text-moss-ink/80">坐垫</h3>
            <ul className="mt-2 space-y-1">
              <li>· 色彩：燕麦色为主，中性治愈色系</li>
              <li>· 材料：3D 针织纹理面料 + 可拆洗设计</li>
              <li>· 结构：基础坐垫模块（45×45×8cm）+ 可拆卸靠垫模块（40×30×15cm），隐藏式磁吸连接</li>
            </ul>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="后续方向">
        <ul className="space-y-2">
          <li>· 更准的「情绪雷达」——加入语音情绪、微表情或脑电</li>
          <li>· 更懂你的「AI 教练」——记下哪种振动频率最管用，自动定制私人处方</li>
          <li>· 更多感官通道——冷热温差片快速回神 + 微量安全香氛</li>
          <li>· 医生端「透视窗」——治疗师看到实时曲线和干预记录，远程调参改方案</li>
        </ul>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
