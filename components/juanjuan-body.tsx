"use client";

import { GrowthSection, GrowthDivider } from "@/components/growth-node";

const homeScreens = [
  { src: "/projects/juanjuan/home-1.webp", caption: "家园 · 书桌" },
  { src: "/projects/juanjuan/home-2.webp", caption: "家园 · 沙发" },
  { src: "/projects/juanjuan/home-3.webp", caption: "家园 · 收纳柜" },
  { src: "/projects/juanjuan/home-4.webp", caption: "家园 · 玄关" },
];

const onboardingScreens = [
  { src: "/projects/juanjuan/transition.webp", caption: "过渡页 · 正在前往家园" },
  { src: "/projects/juanjuan/greet.webp", caption: "请贴贴 · 把挂件贴到手机" },
  { src: "/projects/juanjuan/naming.webp", caption: "选择称呼 · 心形 / 花朵 / 星星" },
  { src: "/projects/juanjuan/custom-icon.webp", caption: "自定义称呼 · 手绘图案" },
  { src: "/projects/juanjuan/unsaved.webp", caption: "未保存离开确认" },
  { src: "/projects/juanjuan/set-location.webp", caption: "设置常住地点" },
  { src: "/projects/juanjuan/location-result.webp", caption: "定位结果 · 确认常住地" },
  { src: "/projects/juanjuan/setup-done.webp", caption: "设置成功 · 进入家园" },
];

const loginScreens = [
  { src: "/projects/juanjuan/login-password.webp", caption: "密码登录 / 注册" },
  { src: "/projects/juanjuan/login-code.webp", caption: "手机号验证码登录" },
  { src: "/projects/juanjuan/login-code-error.webp", caption: "验证码错误状态" },
];

const checkinScreens = [
  { src: "/projects/juanjuan/checkin-home.webp", caption: "首页 · 相机入口" },
  { src: "/projects/juanjuan/checkin-camera.webp", caption: "拍照 · 取景" },
  { src: "/projects/juanjuan/checkin-preview.webp", caption: "确认照片 · 重拍 / 使用" },
  { src: "/projects/juanjuan/checkin-actions.webp", caption: "想和卷卷做什么 · 三种互动" },
  { src: "/projects/juanjuan/checkin-locate.webp", caption: "正在确认位置" },
  { src: "/projects/juanjuan/checkin-permission.webp", caption: "相机权限提示" },
  { src: "/projects/juanjuan/checkin-card-edit.webp", caption: "打卡纪念卡 · 编辑" },
  { src: "/projects/juanjuan/checkin-card.webp", caption: "打卡纪念卡 · 私人纪念与公共留言" },
  { src: "/projects/juanjuan/checkin-share.webp", caption: "分享 · 可选择是否包含私人文字" },
];

const atlasScreens = [
  { src: "/projects/juanjuan/atlas-collection.webp", caption: "地球图鉴 · 明信片 / 打卡纪念 / 物品 / 票夹" },
  { src: "/projects/juanjuan/atlas-memory.webp", caption: "私人纪念 · 照片与一句话" },
  { src: "/projects/juanjuan/atlas-board.webp", caption: "公共留言板" },
];

const journalScreens = [
  { src: "/projects/juanjuan/journal-view.webp", caption: "手账 · 拼贴页面" },
  { src: "/projects/juanjuan/journal-edit.webp", caption: "编辑状态 · 增删与书写" },
  { src: "/projects/juanjuan/journal-add.webp", caption: "选择要添加的元素" },
  { src: "/projects/juanjuan/journal-pick.webp", caption: "从地球图鉴挑选明信片" },
  { src: "/projects/juanjuan/journal-selected.webp", caption: "已选素材 · 明信片 / 车票 / 物品" },
];

const screenGap =
  "gap-x-5 gap-y-14 sm:gap-x-8 sm:gap-y-20 lg:gap-x-12 lg:gap-y-24";

function ScreenGrid({
  screens,
  columns = "lg:grid-cols-4",
  gap = screenGap,
}: {
  screens: { src: string; caption: string }[];
  columns?: string;
  gap?: string;
}) {
  return (
    <div className={`grid grid-cols-2 ${gap} ${columns}`}>
      {screens.map((screen) => (
        <a
          key={screen.src}
          href={screen.src}
          target="_blank"
          rel="noreferrer"
          className="group block"
        >
          <div className="overflow-hidden rounded-2xl shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
            <img
              src={screen.src}
              alt={screen.caption}
              loading="lazy"
              className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>
          <p className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55 transition-colors duration-500 group-hover:text-moss-ink/75">
            {screen.caption}
          </p>
        </a>
      ))}
    </div>
  );
}

export function JuanjuanBody() {
  return (
    <>
      <GrowthSection title="关于" subtitle="2026 · 实习项目 · 美术 / 视觉 / UI">
        <p>
          卷卷是一个「实体挂件 + App」的陪伴产品：挂件带在身上，App 里的卷卷会出门旅行，
          寄回明信片和小礼物——有点像旅行青蛙。第一次使用时，把挂件贴在手机上，
          App 读取到卷卷，再进入家园。
        </p>
        <p className="mt-4">
          我负责 IP 设计与插画、界面视觉和 UI：从家园里的四个房间，到第一次见面的引导流程、
          登录，再到地球图鉴、贴贴打卡与手账；也保留了一些角色设定、手稿和动效。
        </p>
        <p className="mt-4">
          视觉方向是一本可以点开的图画书：米色纸、蓝白格纹和朱红手写字，
          让界面看起来像从绘本里长出来的，而不是一套标准的 App 组件。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["IP 设计与插画", "界面视觉", "UI 组件与状态"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-moss-light/70 px-3 py-1 text-sm font-light text-moss-ink/70 ring-1 ring-moss-green/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="IP 设计" subtitle="角色、实体挂件与动效" layout="wide">
        <p className="max-w-3xl">
          IP 设计不只是画一个角色：它要能做成实体挂件，放进场景，还要能表演。
          三视图确定布褶、流苏和配色的基本形；实体挂件把它从屏幕里拿出来；
          场景和动效再让它活起来。
        </p>

        <div className="mt-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
          <figure>
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
              <img
                src="/projects/juanjuan/sketch-character.webp"
                alt="卷卷角色三视图与配色"
                loading="lazy"
                className="w-full"
              />
            </div>
            <figcaption className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55">
              角色三视图 · 配色与布褶
            </figcaption>
          </figure>

          <figure>
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
              <img
                src="/projects/juanjuan/sketch-hand.webp"
                alt="卷卷被托在手里的动作草图"
                loading="lazy"
                className="w-full"
              />
            </div>
            <figcaption className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55">
              实体挂件 · 托在手里
            </figcaption>
          </figure>
        </div>

        <figure className="mt-4 sm:mt-6">
          <div className="overflow-hidden rounded-2xl shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
            <img
              src="/projects/juanjuan/sketch-room.webp"
              alt="卷卷们在房间里的水彩场景插画"
              loading="lazy"
              className="w-full"
            />
          </div>
          <figcaption className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55">
            场景插画 · 房间里的卷卷
          </figcaption>
        </figure>

        <div className="mt-12 flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium tracking-wide text-moss-ink/60">动效</h3>
          <span className="text-xs font-light tracking-wide text-moss-ink/40">
            形体 / 表情 / 待机
          </span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <figure>
            <div className="overflow-hidden rounded-2xl shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
              <img
                src="/projects/juanjuan/motion-writing.webp"
                alt="卷卷在玻璃罩下写信的动画"
                loading="lazy"
                className="w-full"
              />
            </div>
            <figcaption className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55">
              场景动效 · 在玻璃罩下写信
            </figcaption>
          </figure>

          <figure>
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
              <video
                src="/projects/juanjuan/motion-form.mp4"
                poster="/projects/juanjuan/motion-form-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                controls
                className="block w-full"
              />
            </div>
            <figcaption className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55">
              手稿动画 · 形体与表情
            </figcaption>
          </figure>

          <figure>
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
              <video
                src="/projects/juanjuan/motion-idle.mp4"
                poster="/projects/juanjuan/motion-idle-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                controls
                className="block w-full"
              />
            </div>
            <figcaption className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55">
              待机动画 · 呼吸与眨眼
            </figcaption>
          </figure>
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="家园" subtitle="四个房间视角" layout="wide">
        <div className="mx-auto max-w-5xl">
          <ScreenGrid screens={homeScreens} />
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="初次见面" subtitle="从贴贴到进入家园" layout="wide">
        <div className="mx-auto max-w-5xl">
          <ScreenGrid screens={onboardingScreens} />
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="登录" subtitle="密码 / 验证码 / 错误状态" layout="wide">
        <div className="max-w-[756px]">
          <ScreenGrid screens={loginScreens} columns="lg:grid-cols-3" />
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="贴贴打卡" subtitle="拍一张照片，留下当天的纪念" layout="wide">
        <p className="max-w-3xl">
          把挂在手机上的卷卷带出门：拍一张照片，选「陪伴出行 / 贴贴卷卷 / 晚安」，
          确认位置后生成一张打卡纪念卡。卡片上是照片和地点时间，下面留一句只属于自己的记录；
          公共留言板可以读别人留下的句子，也可以自己写一句。相机权限、正在定位这些状态，
          也沿用了同一套图画书语言。
        </p>

        <div className="mt-8 max-w-[756px]">
          <ScreenGrid screens={checkinScreens} columns="lg:grid-cols-3" />
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="地球图鉴" subtitle="明信片 / 打卡纪念 / 物品 / 票夹" layout="wide">
        <p className="max-w-3xl">
          旅行的痕迹被收进一本图鉴：明信片、打卡纪念、物品和票夹四个分栏。
          每个地方有自己的印章和成套明信片，点开一张可以看大图、自己写一句，
          也可以翻开公共留言板。
        </p>

        <div className="mt-8 max-w-[756px]">
          <ScreenGrid screens={atlasScreens} columns="lg:grid-cols-3" />
        </div>

        <div className="mt-12 flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium tracking-wide text-moss-ink/60">票夹</h3>
          <span className="text-xs font-light tracking-wide text-moss-ink/40">
            纸品 / 车票设计
          </span>
        </div>

        <figure className="mt-4">
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(58,74,56,0.08)] ring-1 ring-moss-green/10">
            <img
              src="/projects/juanjuan/ticket-design.webp"
              alt="卷卷车票设计：晨光站出发的上车凭证"
              loading="lazy"
              className="w-full"
            />
          </div>
          <figcaption className="mt-2.5 text-xs font-light tracking-wide text-moss-ink/55">
            车票 · 晨光站 → ？（2026.11.16）
          </figcaption>
        </figure>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="手账" subtitle="把旅行带回来的东西贴起来" layout="wide">
        <p className="max-w-3xl">
          把图鉴里的东西贴进手账：明信片、车票、物品都能作为素材加进来，
          配上手绘贴纸、胶带和一句当天的心情。编辑状态下的工具只有加、删、写三个动作，
          界面尽量像一张真的纸。
        </p>

        <div className="mt-8">
          <ScreenGrid
            screens={journalScreens}
            columns="lg:grid-cols-5"
            gap="gap-4 sm:gap-6"
          />
        </div>
      </GrowthSection>

      <GrowthDivider />

      <GrowthSection title="说明">
        <p className="text-sm leading-6 text-moss-ink/55">
          实习项目 · 实体挂件 + App 陪伴产品。界面为 UI 前端交付图与后期界面设计稿；
          IP 设计、手稿与动效为过程稿，保留原始导出画面。新增的界面图保留了顶部的时间 /
          电量状态条，仅作展示。
        </p>
      </GrowthSection>

      <div className="pb-24" />
    </>
  );
}
