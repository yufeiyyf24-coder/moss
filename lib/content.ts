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
    title: "把 C-PTSD 急救藏进耳机和坐垫里",
    subtitle: "创伤反应的早期安抚与身体介入",
    summary:
      "探索如何通过骨传导耳机与智能坐垫，在创伤反应出现的早期提供非语言、身体化的安抚与接地支持。",
    domains: ["mind"],
    status: "seed",
  },
  {
    slug: "asthma",
    title: "哮喘环境守护",
    subtitle: "为哮喘患者设计的居家空气守护系统",
    summary:
      "从居家环境诱因出发，设计无感监测、光语言预警与行动建议相结合的哮喘空气守护系统。",
    domains: ["mind"],
    status: "seed",
  },
  {
    slug: "moor",
    title: "Moor",
    subtitle: "给 ADHD 的专注辅助副屏",
    summary:
      "一款为 ADHD 用户在课堂与会议场景设计的独立桌面副屏，实时整理内容脉络，辅助注意力定锚与课后回顾。",
    domains: ["living"],
    status: "seed",
  },
  {
    slug: "linhang",
    title: "麟航",
    subtitle: "儿童环境安全检测无人机",
    summary:
      "面向儿童活动空间的环境安全检测无人机，让不可见的风险被温和地看见，让安全关怀不变成监控。",
    domains: ["living"],
    status: "seed",
  },
  {
    slug: "xiaoji",
    title: "洄小叽",
    subtitle: "一只住在桌面上的猫系 AI 伙伴",
    summary:
      "从零炼成的 48M 参数 LLM 驱动的桌面宠物：傲娇、会捣乱、也会在你需要时出现。",
    domains: ["ai"],
    status: "seed",
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
    slug: "books",
    title: "书单与阅读的痕迹",
    subtitle: "一些书，以及它们留下的连接",
    summary:
      "阅读不是为了读完，而是为了在某句话里停下来，让想法继续生长。",
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
