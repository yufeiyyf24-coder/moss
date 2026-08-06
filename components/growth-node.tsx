"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project, Domain, domainTextClass, domainBgClass } from "@/lib/content";

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
  const textClass = domainTextClass[domain.id];
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
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 backdrop-blur-[2px] sm:px-10">
        <Link
          href={`/${domain.id}`}
          className="text-sm font-light tracking-wide text-moss-ink/50 transition-colors duration-500 hover:text-moss-ink"
        >
          ← 回到 {domain.label}
        </Link>
        <span className="flex items-center gap-5">
          <span
            className={`rounded-full px-3 py-1 text-xs font-light ${bgClass}/10 ${textClass}`}
          >
            {domain.sub}
          </span>
          <Link
            href="/"
            className="text-lg font-light tracking-tight text-moss-ink/70 transition-colors duration-500 hover:text-moss-ink sm:text-xl"
          >
            Project Moss
          </Link>
        </span>
      </div>

      {/* hero */}
      <section className="relative px-6 pb-12 pt-36 sm:px-10 sm:pt-44 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0, 0.2, 1] }}
          className="max-w-4xl"
        >
          <span
            className={`mb-5 inline-block text-xs font-medium tracking-[0.2em] ${textClass}`}
          >
            {domain.label.toUpperCase()} / {project.status === "growing" ? "正在生长" : project.status === "seed" ? "种子" : "根系"}
          </span>

          <h1 className="mb-4 font-wenkai text-4xl font-light leading-tight text-moss-ink sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mb-6 max-w-2xl text-xl font-light leading-relaxed text-moss-ink/80 sm:text-2xl">
            {project.subtitle}
          </p>

          <p className="max-w-2xl text-base font-light leading-7 text-moss-ink/60 sm:text-lg sm:leading-8">
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
                className={`mb-10 text-sm font-light italic leading-relaxed text-moss-ink/50 sm:text-base ${
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
