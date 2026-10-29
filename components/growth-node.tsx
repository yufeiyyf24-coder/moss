"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project, Domain, domainBgClass } from "@/lib/content";
import { MobileScrollFade } from "@/components/mobile-scroll-fade";

export function GrowthNode({
  project,
  domain,
  children,
  hero,
}: {
  project: Project;
  domain: Domain;
  children: React.ReactNode;
  /** 自定义 hero——提供时跳过默认顶栏与 hero 区，由 hero 组件自行处理 */
  hero?: React.ReactNode;
}) {
  const bgClass = domainBgClass[domain.id];

  if (hero) {
    return (
      <article className="relative z-10 min-h-screen">
        {hero}
        {children}
      </article>
    );
  }

  return (
    <article className="relative z-10 min-h-screen">
      {/* top navigation bar */}
      <MobileScrollFade>
        <div className="fixed inset-x-0 top-0 z-40 px-5 py-4 sm:px-10 lg:py-5">
          <div className="relative flex items-center justify-between gap-3">
            <Link
              href={`/${domain.id}`}
              className="min-w-0 truncate text-sm font-light tracking-wide text-moss-ink/60 transition-colors duration-500 hover:text-moss-ink"
            >
              <span className="sm:hidden">← {domain.label}</span>
              <span className="hidden sm:inline">← 回到 {domain.label}</span>
            </Link>
            <span className="flex shrink-0 items-center gap-3 transition-opacity duration-300 max-lg:opacity-[var(--header-fade)] sm:gap-5">
              <span
                className={`hidden items-center gap-1.5 rounded-full bg-white/55 px-3 py-1 text-xs font-light text-moss-ink/60 ring-1 ring-white/70 sm:inline-flex`}
              >
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${bgClass}`} />
                {domain.sub}
              </span>
              <Link
                href="/"
                className="text-lg font-light tracking-tight text-moss-ink/75 transition-colors duration-500 hover:text-moss-ink sm:text-xl"
              >
                Project Moss
              </Link>
            </span>
          </div>
        </div>
      </MobileScrollFade>

      {/* hero */}
      <section className="relative px-6 pb-12 pt-36 sm:px-10 sm:pt-44 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0, 0.2, 1] }}
          className="max-w-4xl"
        >
          <span className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-moss-ink/55">
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${bgClass}`} />
            {domain.label.toUpperCase()} / {project.status === "growing" ? "正在生长" : project.status === "seed" ? "种子" : "根系"}
          </span>

          <h1 className="mb-4 font-wenkai text-4xl font-light leading-tight text-moss-ink sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mb-6 max-w-2xl text-xl font-light leading-relaxed text-moss-ink/80 sm:text-2xl">
            {project.subtitle}
          </p>

          <p className="max-w-2xl text-base font-light leading-7 text-moss-ink/65 sm:text-lg sm:leading-8">
            {project.summary}
          </p>
        </motion.div>

        {project.cover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.2, 0, 0.2, 1] }}
            className="mt-14 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl bg-moss-warm/60 shadow-sm"
          >
            <img
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </section>

      {children}
    </article>
  );
}

export function GrowthSection({
  title,
  subtitle,
  children,
  className = "",
  layout = "centered",
  titleAlign = "left",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  /* 容器宽度：centered 居中窄栏（默认）| wide 宽栏 | full-bleed 通栏 */
  layout?: "centered" | "wide" | "full-bleed";
  /* 标题摆放：left（默认）| right 右对齐 | overlay 大字浮层，内容与其重叠 */
  titleAlign?: "left" | "right" | "overlay";
}) {
  const containerClass =
    layout === "centered"
      ? "mx-auto max-w-3xl"
      : layout === "wide"
        ? "mx-auto max-w-6xl"
        : "max-w-none";

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.2, 0, 0.2, 1] }}
      className={`px-6 py-20 sm:px-10 lg:px-20 ${className}`}
    >
      <div className={containerClass}>
        {titleAlign === "overlay" ? (
          <div className="relative">
            <h2 className="mb-10 select-none font-wenkai text-5xl font-light leading-none text-moss-green/30 sm:text-6xl">
              {title}
            </h2>
            <div className="relative z-10 -mt-12">{children}</div>
          </div>
        ) : (
          <>
            <h2
              className={`mb-3 font-wenkai text-2xl font-light text-moss-ink sm:text-3xl ${
                titleAlign === "right" ? "text-right" : ""
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`mb-10 text-sm font-light italic leading-relaxed text-moss-ink/55 sm:text-base ${
                  titleAlign === "right" ? "text-right" : ""
                }`}
              >
                {subtitle}
              </p>
            )}
            <div className="text-base font-light leading-8 text-moss-ink/75 sm:text-lg sm:leading-9">
              {children}
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}

export function GrowthDivider() {
  return (
    <div className="mx-auto max-w-xs py-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-moss-green/40 to-transparent" />
    </div>
  );
}
