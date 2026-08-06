# Project Moss · 开发交接文档

> 最后更新：2026-08-02  
> 当前阶段：守护星案例页完成展览式排版改造（GrowthSection layout/titleAlign prop + SpreadLayout/ScatterField），第四章嵌入可交互 demo（滚动联动手机），第五章填入真实可用性测试数据 + 手写 SVG 可视化（SUS 曲线/任务时长曲线/访谈词云）

---

## 项目概览

**Moss** — 清霖的个人网站，Next.js + Framer Motion，苔藓隐喻。不是作品集，是"想法生长的地方"。

路径：`D:\Projects\网站\moss`  
启动：`npx next dev --port 3099`

---

## 页面结构

```
/                       首页（湖面背景 + 六个漂浮领域球 + 左侧介绍）
/[domain]               领域目录页（左侧 40% 固定领域信息，右侧项目列表）
/[domain]/[slug]        项目详情页（GrowthNode 壳 + 项目专属内容）
```

### 6 个领域 & 项目

| 领域 | 项目 | 状态 |
|------|------|------|
| mind | 守护星、C-PTSD、哮喘环境守护 | 守护星内容最完整 |
| living | Moor、麟航 | 仅有项目入口 |
| ai | 洄小叽 | 仅有项目入口 |
| sustainability | 竹杖的下一程 | 仅有项目入口 |
| connections | 书单与阅读的痕迹 | 仅有项目入口 |
| visual | *(空)* | 显示"种子等待发芽" |

---

## 关键文件

```
components/
├── world-shell.tsx          ← 页面壳（湖面+风+涟漪+水痕+Project Moss 顶栏）
├── domain-directory.tsx     ← 领域目录页（左右分栏，项目列表）
├── domain-orb.tsx           ← 首页漂浮领域球
├── domain-field.tsx         ← 首页右半区（6 个球的布局）
├── intro-field.tsx          ← 首页左半区介绍文字
├── growth-node.tsx          ← 项目页壳（回到领域←、hero、GrowthSection/GrowthDivider）
├── shouhuxing-body.tsx      ← 守护星六章内容（含金句交互、PersonaQuotes）
├── transition-engine.tsx    ← 首页→领域页转场动画引擎（冻结→聚焦→炸裂→展开→导航→揭示）
├── lake-layer.tsx           ← 湖面光晕背景
├── wind-layer.tsx           ← 风粒子 canvas
├── ripple-surface.tsx       ← 鼠标涟漪
└── water-trail.tsx          ← 鼠标拖尾

lib/
├── content.ts               ← 6 个领域定义 + 8 个项目入口数据 + 查询函数
└── transition-context.tsx    ← 转场状态机（idle→freezing→focusing→...→revealing）

app/
├── page.tsx                 ← 首页
├── layout.tsx               ← 根布局（TransitionProvider + TransitionEngine）
├── globals.css              ← Moss 色板 + 呼吸/漂浮/shimmer 动画
├── [domain]/[slug]/page.tsx ← 动态项目页（generateStaticParams + ProjectBody 路由）
├── mind/page.tsx            ← → DomainDirectory
├── ai/page.tsx              ← → DomainDirectory
├── living/page.tsx          ← → DomainDirectory
├── sustainability/page.tsx  ← → DomainDirectory
├── visual/page.tsx          ← → DomainDirectory
└── connections/page.tsx     ← → DomainDirectory
```

---

## 守护星项目页（当前重点）

**ShouhuxingBody** 六章结构（2026-08-02 展览化改造后）：
1. **土壤** — overlay 大标题 + 55-45 跨页（左 700 万 96px 大字，左栏整体下移 96px 对齐 700 万下沿；右困境卡片下移 56px 微旋 -0.5deg）+ 研究方法脚注带偏右
2. **根系** — 金句→画像交互（语录气泡确定性散落偏移 6%~19%，气泡带对话框小尖角 + 双角装饰性引号，文字 16/18px 墨 70%）、两条河流 45-55 跨页右栏上移、五条洞察左右锯齿 + SVG 手绘连接线
3. **枝干** — 三原则横向卡片高度错落（0/48/20px）、对比表改 4 张翻牌卡（灰→主题色+箭头）、系统全貌不对称（今天主导 lg:row-span-3）
4. **叶子** — 可交互 demo：左侧 sticky 手机（iframe 375×812 缩放 0.8）+ 右侧 4 条说明，IntersectionObserver 中心带联动 iframe 内 switchTab/openPage/openChatModal
5. **果实与落叶** — 真实测试数据：6 人/SUS 平均 84/36 次任务全完成 + 手写 SVG 可视化（SUS 曲线、任务时长曲线、访谈词云）+ 反馈→优化方向
6. **种子** — 隐藏彩蛋（hover 星星 → "I was here when you needed me."）

### 金句交互（PersonaQuotes）

最新版本：三句话以对话气泡形式一左一右交错排列。点击后：
1. 金句文字移到卡片上方作为标题
2. 下方展开用户画像卡片（姓名/年龄/身份/日常循环/深层情绪）
3. 其他金句 fade 到 0.18
4. 点「收起」回到初始状态

---

## 设计约定

- **色板**：moss-background `#F7FAF4` / moss-ink `#3A4A38` / moss-leaf `#90B97B`
- **字体**：DM Sans（正文）+ LXGW WenKai（中文/标题）
- **动画**：Framer Motion，spring/ease-in-out，0.4-0.7s，不机械
- **页面壳**：有背景动画的页面用 `<WorldShell>` 包裹
- **领域目录页背景**：`DomainDirectory` 内渲染 `-z-[15]` 领域色整页背景（`domainBgClass[domain.id]`）+ 白色呼吸光晕，盖住 `-z-20` 湖面；风粒子/涟漪/水痕在其上
- **鼠标拖尾随领域换色相**：`WorldShell` 接 `trailColor` prop → `WaterTrail` 用领域色 hex 的色相 + moss 绿固定 sat/light（39%/75%）渲染，保持淡雅质感。hex 映射在 `content.ts` 的 `domainColorHex`（与 globals.css 同步）
- **一键启动**：`start-moss.bat`（双击跑 `next dev --port 3099`，3 秒后自动开浏览器，桌面有 Moss 快捷方式）
- **项目页**：用 `<GrowthNode>` 包裹，children 里放项目专属内容
- **项目内容路由**：`app/[domain]/[slug]/page.tsx` 的 `ProjectBody` switch-case 按 slug 分发

---

## 下一步待办

- [x] 第四章·叶子：嵌入可交互 demo（sticky 手机 + 滚动联动，方案 A+B）
- [x] 第五章：提取 6 份可用性测试 docx 数据（提取稿在 `C:\Users\35050\shouhuxing_test_extract\`），填入 SUS/发现/优化方向 + 数据可视化
- [x] 版面错落化：GrowthSection layout prop + SpreadLayout/ScatterField，第一~三章展览化
- [ ] 嵌入 demo 入口：hero 区加「查看可交互原型」链接
- [ ] 封面图：复制 `守护星 APP.jpg` 到 `public/projects/shouhuxing/cover.jpg`
- [ ] 第五章 Before/After 迭代案例（需要清霖补充真实迭代动作，不编造）
- [ ] 词云 webfont 跨设备一致性（可选：站酷快乐体已在用，幼圆在其他设备回退圆体/文楷）
- [ ] 其他项目内容页（CPTSD、Moor 等）
- [ ] Visual 领域暂时留空（摄影绘画后面再说）
- [ ] AI 领域补充「对 AI 的看法」「与 AI 合作的方式」（清霖后面单独写）

---

## 原始资料位置

- 守护星 Demo：`D:\Projects\守护星\守护星APP-demo.html`（3192 行完整原型）
- 守护星内容框架：`D:\Projects\网站\守护星-内容框架.md`
- 守护星 README：`D:\Projects\网站\projects-shouhuxing-README.md`
- 可用性测试 docx：`D:\Projects\守护星\`（6 份，需转 txt）
- 设计文档：`D:\Projects\网站\0*.md`（00-06，Manifesto/Design/Architecture/Content/Components/Motion/Tech）
- 清霖的指示：`D:\Projects\网站\刚刚做的.txt`
