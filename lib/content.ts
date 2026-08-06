export const domains = [
  {
    id: "mind",
    label: "Mind",
    sub: "心智",
    color: "domain-mind",
    description:
      "Psychology, mental health, cognition, self-understanding. 关于人的情绪、意识、关系与内在经验的问题。",
  },
  {
    id: "living",
    label: "Living",
    sub: "生活",
    color: "domain-living",
    description:
      "Life assistance, accessibility, human-centered tools. 技术如何支持日常、环境如何影响人、更好的生活可能是什么。",
  },
  {
    id: "sustainability",
    label: "Sustainability",
    sub: "可持续",
    color: "domain-sustainability",
    description:
      "Environmental thinking and sustainable development. 人与自然的关系、可持续系统、未来生活模式。",
  },
  {
    id: "ai",
    label: "AI",
    sub: "人工智能",
    color: "domain-ai",
    description:
      "Artificial intelligence, agents, products, experiments. AI 系统、人与 AI 的关系、实验与产品。",
  },
  {
    id: "visual",
    label: "Visual",
    sub: "视觉",
    color: "domain-visual",
    description:
      "Photography, painting, observation, aesthetics. 图像、审美、视觉思考与艺术表达。",
  },
  {
    id: "connections",
    label: "Connections",
    sub: "连接",
    color: "domain-connections",
    description:
      "Interdisciplinary knowledge network. 领域之间的关系、意外的连接、新的视角。",
  },
] as const;

export type DomainId = (typeof domains)[number]["id"];

export interface Domain {
  id: DomainId;
  label: string;
  sub: string;
  color: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  domains: DomainId[];
  status: "growing" | "seed" | "root";
  cover?: string;
}

export const projects: Project[] = [
  {
    slug: "shouhuxing",
    title: "守护星",
    subtitle: "为精神疾病照护家属设计的支持系统",
    summary:
      "中国约 700 万确诊精神分裂症患者，每一个患者背后至少有一个家庭在承担日常照护。守护星不是用药提醒 App，而是为家属设计的完整支持系统。",
    domains: ["mind"],
    status: "growing",
    cover: "/projects/shouhuxing/cover.jpg",
  },
  {
    slug: "cptsd",
    title: "安途",
    subtitle: "C-PTSD 双场景调节系统 · 骨传导耳机 + 智能坐垫",
    summary:
      "将 EMDR 双侧刺激、稳定化技术与体感安抚隐形于运动颈圈与家居坐垫中，在病耻感为零的前提下提供实时被动守护。",
    domains: ["mind"],
    status: "seed",
  },
  {
    slug: "asthma",
    title: "哮喘环境守护",
    subtitle: "居家空气质量监测 · 光语言替代屏幕 · 织物包裹去医疗化",
    summary:
      "22份问卷驱动设计。81.8%患者家中无检测设备——不是不需要，是现有产品「只显示数字不指导行动」。用呼吸灯色替代数字屏幕，把监测仪做成家居装饰品。",
    domains: ["mind"],
    status: "growing",
  },
  {
    slug: "moor",
    title: "ADHD 专注辅助副屏",
    subtitle: "鱼骨图实时脉络 · 课堂注意力定锚设备",
    summary:
      "5 寸独立副屏，实时语音转文字+AI 脉络整理。低存在感设计——走神回来能一眼定位，需要时才展开，全程自管理。",
    domains: ["living"],
    status: "seed",
  },
  {
    slug: "linhang",
    title: "麟航",
    subtitle: "儿童环境安全监测无人机 · 三重递进式干预",
    summary:
      "面向 4-6 岁儿童家庭。毫米波雷达+AI 视觉预警 → 儿童心理学适配语音引导 → 物理阻隔。定义了两套完整场景：室内厨房 + 室外游乐场。",
    domains: ["living"],
    status: "seed",
  },
  {
    slug: "xiaoji",
    title: "洄",
    subtitle: "73M 参数，从零训练的桌面猫系 AI",
    summary:
      "不是调用 API，而是从 Wiki 预训练开始，到对话微调，到推理部署，完整走通了一遍「造一个小 AI」的全流程。傲娇、会捣乱、也会在你需要时出现。",
    domains: ["ai"],
    status: "growing",
  },
  {
    slug: "ai-thoughts",
    title: "我与 AI",
    subtitle: "从使用到协作 —— 和 AI 一起思考的这两年",
    summary:
      "从 DeepSeek 到 Claude，从「AI 帮我干活」到「AI 是我的搭档」再到「我训练了自己的 AI」。一段关于人机关系持续演化的记录。",
    domains: ["ai"],
    status: "growing",
  },
  {
    slug: "next-life",
    title: "竹杖的下一程",
    subtitle: "莫干山可持续租借与文创服务系统",
    summary:
      "接管一个已经存在但没人认真做过的事：让游客手中的竹杖拥有「下一生」——归还、再造、成为种子纸卡片。",
    domains: ["sustainability"],
    status: "seed",
  },
  {
    slug: "visual-notes",
    title: "视觉笔记",
    subtitle: "摄影与绘画的碎片",
    summary:
      "不是作品集，是用镜头和笔留下的观察。一些光、一些影子、一些在脑子里停留过的画面。",
    domains: ["visual"],
    status: "seed",
  },
  {
    slug: "yes-book",
    title: "《Yes》",
    subtitle: "一本关于「自我」的科普书",
    summary:
      "从神经科学、心理学到 AI，追问同一个问题：一个复杂系统什么时候开始说「我」？",
    domains: ["connections"],
    status: "growing",
  },
  {
    slug: "fragments",
    title: "碎片与连线",
    subtitle: "一些还没长成形状的想法",
    summary:
      "零碎的观察、跨领域的连接、半成型的思考。它们是种子，有些会发芽，有些不会。",
    domains: ["connections"],
    status: "seed",
  },
];

export function getDomainById(id: string): Domain | undefined {
  return domains.find((d) => d.id === id);
}

export function getProjectsByDomain(domainId: DomainId): Project[] {
  return projects.filter((p) => p.domains.includes(domainId));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectPaths(): { domain: DomainId; slug: string }[] {
  const paths: { domain: DomainId; slug: string }[] = [];
  for (const project of projects) {
    for (const domainId of project.domains) {
      paths.push({ domain: domainId, slug: project.slug });
    }
  }
  return paths;
}

/* Tailwind-safe class maps — avoid dynamic class concatenation */
export const domainTextClass: Record<DomainId, string> = {
  mind: "text-domain-mind",
  living: "text-domain-living",
  sustainability: "text-domain-sustainability",
  ai: "text-domain-ai",
  visual: "text-domain-visual",
  connections: "text-domain-connections",
};

export const domainBgClass: Record<DomainId, string> = {
  mind: "bg-domain-mind",
  living: "bg-domain-living",
  sustainability: "bg-domain-sustainability",
  ai: "bg-domain-ai",
  visual: "bg-domain-visual",
  connections: "bg-domain-connections",
};

export const domainRingClass: Record<DomainId, string> = {
  mind: "ring-domain-mind/40",
  living: "ring-domain-living/40",
  sustainability: "ring-domain-sustainability/40",
  ai: "ring-domain-ai/40",
  visual: "ring-domain-visual/40",
  connections: "ring-domain-connections/40",
};

/* Hex values for canvas-based layers (water trail etc.) — keep in sync with globals.css @theme */
export const domainColorHex: Record<DomainId, string> = {
  mind: "#ddf0ea",
  living: "#d4ddbe",
  sustainability: "#d5dac4",
  ai: "#ebecf6",
  visual: "#fcf9e9",
  connections: "#d6cfe0",
};
