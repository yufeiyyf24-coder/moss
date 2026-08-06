import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  domains,
  getProjectBySlug,
  getDomainById,
  getAllProjectPaths,
} from "@/lib/content";
import { WorldShell } from "@/components/world-shell";
import { GrowthNode } from "@/components/growth-node";
import { ShouhuxingBody } from "@/components/shouhuxing-body";
import { ShouhuxingHero } from "@/components/shouhuxing-hero";
import { XiaojiBody } from "@/components/xiaoji-body";
import { CptsdBody } from "@/components/cptsd-body";
import { AsthmaBody } from "@/components/asthma-body";
import { MoorBody } from "@/components/moor-body";
import { LinhangBody } from "@/components/linhang-body";
import { NextLifeBody } from "@/components/next-life-body";
import { VisualNotesBody } from "@/components/visual-notes-body";
import { YesBookBody } from "@/components/yes-book-body";
import { FragmentsBody } from "@/components/fragments-body";
import { AiThoughtsBody } from "@/components/ai-thoughts-body";

/* ------------------------------------------------------------------ */
/*  Static params                                                      */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return getAllProjectPaths();
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found – Project Moss" };
  return {
    title: `${project.title} – Project Moss`,
    description: project.summary,
  };
}

/* ------------------------------------------------------------------ */
/*  Project body resolver                                              */
/* ------------------------------------------------------------------ */

function ProjectBody({ slug }: { slug: string }) {
  switch (slug) {
    case "shouhuxing":
      return <ShouhuxingBody />;
    case "xiaoji":
      return <XiaojiBody />;
    case "ai-thoughts":
      return <AiThoughtsBody />;
    case "cptsd":
      return <CptsdBody />;
    case "asthma":
      return <AsthmaBody />;
    case "moor":
      return <MoorBody />;
    case "linhang":
      return <LinhangBody />;
    case "next-life":
      return <NextLifeBody />;
    case "visual-notes":
      return <VisualNotesBody />;
    case "yes-book":
      return <YesBookBody />;
    case "fragments":
      return <FragmentsBody />;

    default:
      return (
        <section className="px-6 pb-32 pt-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <p className="font-wenkai text-lg font-light italic leading-relaxed text-moss-ink/40 sm:text-xl">
              这片叶子还在生长中。
              <br />
              不久后，这里会有更多关于这个项目的痕迹。
            </p>
          </div>
        </section>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}) {
  const { domain: domainId, slug } = await params;

  const project = getProjectBySlug(slug);
  const domain = getDomainById(domainId);

  if (!project || !domain) {
    notFound();
  }

  // If the project doesn't actually belong to this domain, still show it
  // (projects can be reached from any of their domains)

  return (
    <WorldShell
      hideHeader
      tintClass={slug === "shouhuxing" ? "bg-shx-mint" : undefined}
      trailColor={slug === "shouhuxing" ? "#15b7a8" : undefined}
    >
      <GrowthNode
        project={project}
        domain={domain}
        hero={
          slug === "shouhuxing" ? (
            <ShouhuxingHero project={project} domain={domain} />
          ) : undefined
        }
      >
        <ProjectBody slug={slug} />
      </GrowthNode>
    </WorldShell>
  );
}
