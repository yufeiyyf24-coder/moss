import Link from "next/link";
import { WorldShell } from "@/components/world-shell";
import {
  type Domain,
  type Project,
  getProjectsByDomain,
  domainBgClass,
  domainColorHex,
} from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Status label                                                       */
/* ------------------------------------------------------------------ */

function statusLabel(status: Project["status"]) {
  switch (status) {
    case "growing":
      return "正在生长";
    case "seed":
      return "种子";
    case "root":
      return "根系";
  }
}

function statusEmoji(status: Project["status"]) {
  switch (status) {
    case "growing":
      return "🌱";
    case "seed":
      return "🌰";
    case "root":
      return "🌿";
  }
}

/* ------------------------------------------------------------------ */
/*  Project entry — organic, not card-like                             */
/* ------------------------------------------------------------------ */

function ProjectEntry({
  project,
  domainId,
}: {
  project: Project;
  domainId: string;
}) {
  return (
    <Link
      href={`/${domainId}/${project.slug}`}
      className="group block py-8 transition-all duration-700 ease-out sm:py-10"
    >
      <div className="flex items-start gap-5 sm:gap-8">
        {/* status indicator */}
        <span
          className="mt-1 shrink-0 select-none text-lg leading-none opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110 sm:text-xl"
          title={statusLabel(project.status)}
        >
          {statusEmoji(project.status)}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-wenkai text-2xl font-light leading-snug text-moss-ink/85 transition-colors duration-700 group-hover:text-moss-ink sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-2 text-sm font-light leading-relaxed text-moss-ink/45 transition-colors duration-700 group-hover:text-moss-ink/65 sm:text-base">
            {project.subtitle}
          </p>
        </div>

        {/* subtle arrow */}
        <span className="mt-2 shrink-0 text-lg font-thin text-moss-ink/25 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-1 sm:text-xl">
          →
        </span>
      </div>

      {/* organic divider — like a thin root */}
      <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-moss-green/25 to-transparent transition-all duration-700 group-hover:via-moss-green/50" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function DomainDirectory({ domain }: { domain: Domain }) {
  const projects = getProjectsByDomain(domain.id);

  return (
    <WorldShell
      trailColor={domainColorHex[domain.id]}
      backHref="/"
      backLabel="← 回到入口"
    >
      {/* Domain-tinted water — replaces the global lake tone */}
      <div
        className={`fixed inset-0 -z-[15] ${domainBgClass[domain.id]}`}
        aria-hidden="true"
      />

      {/* Soft light orbs breathing over the domain tint */}
      <div
        className="pointer-events-none fixed inset-0 -z-[15] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -left-[20vw] -top-[20vh] h-[80vh] w-[80vh] rounded-full blur-[120px] animate-breathe"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[20vh] -right-[20vw] h-[90vh] w-[90vh] rounded-full blur-[140px] animate-breathe-slow"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 65%)",
          }}
        />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col sm:flex-row">
        {/* Left half — domain identity */}
        <section className="flex min-h-[35vh] flex-col justify-center px-8 pt-28 sm:fixed sm:bottom-0 sm:left-0 sm:top-0 sm:w-[40%] sm:min-h-screen sm:pt-0 lg:px-16">
          <div className="sm:max-w-sm lg:max-w-md">
            <span className="mb-4 inline-block text-xs font-light tracking-[0.2em] text-moss-ink/35 sm:text-sm">
              {domain.label.toUpperCase()}
            </span>

            <h1 className="font-wenkai text-4xl font-light tracking-wide text-moss-ink sm:text-5xl lg:text-6xl">
              {domain.label}
            </h1>

            <p className="mt-3 font-wenkai text-xl text-moss-ink/45 sm:text-2xl">
              {domain.sub}
            </p>

            <p className="mt-8 text-sm font-light leading-7 text-moss-ink/50 sm:text-base sm:leading-8">
              {domain.description}
            </p>
          </div>
        </section>

        {/* Right half — project listing */}
        <section className="min-h-[50vh] flex-1 px-6 pb-24 pt-6 sm:ml-[40%] sm:min-h-screen sm:py-28 sm:pr-10 lg:pr-20">
          {projects.length > 0 ? (
            <>
              <p className="mb-2 text-xs font-light tracking-[0.15em] text-moss-ink/30">
                项目 · {projects.length}
              </p>

              <div className="mt-6">
                {projects.map((project) => (
                  <ProjectEntry
                    key={project.slug}
                    project={project}
                    domainId={domain.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-full items-center">
              <p className="font-wenkai text-lg font-light italic leading-relaxed text-moss-ink/25 sm:text-xl">
                这个领域还没有项目，
                <br />
                种子正在土壤里等待发芽。
              </p>
            </div>
          )}
        </section>
      </main>
    </WorldShell>
  );
}
