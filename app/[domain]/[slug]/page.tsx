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

    /* future project bodies will be added here */
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
