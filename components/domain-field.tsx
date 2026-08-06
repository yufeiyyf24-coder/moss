import { DomainOrb } from "@/components/domain-orb";

const domains = [
  {
    label: "Mind",
    sub: "心智",
    href: "/mind",
    positionClass: "left-[18%] top-[15%]",
  },
  {
    label: "AI",
    sub: "人工智能",
    href: "/ai",
    positionClass: "right-[40%] top-[6%]",
  },
  {
    label: "Living",
    sub: "生活",
    href: "/living",
    positionClass: "left-[6%] top-[46%]",
  },
  {
    label: "Sustainability",
    sub: "可持续",
    href: "/sustainability",
    positionClass: "right-[4%] top-[34%]",
  },
  {
    label: "Visual",
    sub: "视觉",
    href: "/visual",
    positionClass: "left-[20%] bottom-[2%]",
  },
  {
    label: "Connections",
    sub: "连接",
    href: "/connections",
    positionClass: "right-[16%] bottom-[16%]",
  },
];

export function DomainField() {
  return (
    <div className="relative h-full w-full">
      {domains.map((d) => (
        <DomainOrb key={d.label} {...d} />
      ))}
    </div>
  );
}
