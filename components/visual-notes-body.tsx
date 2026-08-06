"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

export function VisualNotesBody() {
  return (
    <>
      <GrowthSection title="摄影与绘画" subtitle="用镜头和笔留下的观察">
        <p>
          不是作品集，不是精心挑选的「代表作」。这里放的是那些
          在某个瞬间让我停下来按下快门的东西——一些光、一些影子、
          一些在脑子里停留过的画面。
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="绘画">
        <p>
          平板手绘为主。小时候得过很多奖，老师说有天赋，
          临摹和想象能力极强。现在更多是随手画——给朋友画周边卖漫展，
          或者单纯想画就画。
        </p>
        <p className="mt-4">
          比起「画得像」，更喜欢「画出那个感觉」。
          有时候脑子里有个画面，不画出来就一直卡在那里。
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="摄影">
        <p>
          没有系统地学过，纯粹是观察的延伸。看到好看的光线、有趣的角落、
          被忽略的东西——就会想拍下来。
        </p>
        <p className="mt-4">
          喜欢拍的东西：水、植物、影子、角落、有人在没在看的状态。
          不喜欢摆拍。
        </p>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="视觉作为一种思考方式">
        <p>
          对我来说，画画和拍照不只是产出图像——它们是一种注意力的练习。
          当你在画一棵树的时候，你才会真的看见那棵树的形状。
          拍照也一样：取景框帮你决定什么重要、什么不重要。
        </p>
        <p className="mt-4">
          这和设计是同一件事：选择看什么、怎么呈现。
        </p>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
