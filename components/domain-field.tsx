import { DomainOrb } from "@/components/domain-orb";

const domains = [
  {
    label: "Mind",
    sub: "心智",
    href: "/mind",
    mobileClass: "left-[4%] top-[2%] -rotate-2",
    positionClass: "sm:left-[18%] sm:top-[15%]",
  },
  {
    label: "AI",
    sub: "人工智能",
    href: "/ai",
    mobileClass: "right-[6%] top-[15%] rotate-1",
    positionClass: "sm:right-[40%] sm:top-[6%]",
  },
  {
    label: "Living",
    sub: "生活",
    href: "/living",
    mobileClass: "left-[14%] top-[35%] rotate-1",
    positionClass: "sm:left-[6%] sm:top-[46%]",
  },
  {
    label: "Sustainability",
    sub: "可持续",
    href: "/sustainability",
    mobileClass: "right-[0%] top-[29%] -rotate-1",
    positionClass: "sm:right-[4%] sm:top-[34%]",
  },
  {
    label: "Visual",
    sub: "视觉",
    href: "/visual",
    mobileClass: "left-[6%] top-[63%] -rotate-1",
    positionClass: "sm:left-[20%] sm:bottom-[2%] sm:top-auto",
  },
  {
    label: "Connections",
    sub: "连接",
    href: "/connections",
    mobileClass: "right-[6%] top-[82%] rotate-2",
    positionClass: "sm:right-[16%] sm:bottom-[16%] sm:top-auto",
  },
];

export function DomainField() {
  return (
    <div className="relative h-[430px] w-full sm:h-full">
      {domains.map((d) => (
        <DomainOrb key={d.label} {...d} />
      ))}
    </div>
  );
}
