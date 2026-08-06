"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function NextLifeBody() {
  return (
    <>
      <GrowthSection title="概述" subtitle="莫干山可持续租借与文创服务系统">
        <p>
          莫干山每年接待大量游客，登山竹杖是景区标配——但大多数竹杖用后即弃。
          这个项目接管了一个已经存在但没人认真做过的事：
          让游客手中的竹杖拥有「下一生」。
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="服务系统设计">
        <div className="space-y-6">
          <div className="rounded-lg bg-moss-warm/30 p-5">
            <h3 className="font-medium text-moss-ink/80">租借系统</h3>
            <p className="mt-2">
              在景区入口设置竹杖租借点。游客支付押金取用，
              使用完毕后归还至任意回收点（景区出口、主要休息站）。
              降低拥有成本的同时，让竹杖能够循环使用。
            </p>
          </div>

          <div className="rounded-lg bg-moss-warm/30 p-5">
            <h3 className="font-medium text-moss-ink/80">再造工坊</h3>
            <p className="mt-2">
              归还后的竹杖根据磨损程度分流：轻微磨损的清洗后重新投入使用；
              严重磨损或损坏的，送入再造工坊。工坊向游客开放参观——
              竹杖被加工成种子纸卡片、笔筒、花器、竹编小物等文创产品。
            </p>
          </div>

          <div className="rounded-lg bg-moss-warm/30 p-5">
            <h3 className="font-medium text-moss-ink/80">种子纸卡片</h3>
            <p className="mt-2">
              再造的终点是一张嵌入种子的手工纸卡片。游客可以带走它，
              种在土里。竹杖完成了从「登山工具」到「植物」的生命循环。
            </p>
          </div>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="设计理念">
        <p>
          非遗的可持续不只是材料层面的环保，而是让一件物品的生命周期被看见。
          游客不只是「用一根竹杖」，而是参与了它从竹子到工具、从工具到文创、
          从文创到植物的全部旅程。
        </p>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
