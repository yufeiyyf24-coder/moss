import Link from "next/link";
import { LakeLayer } from "@/components/lake-layer";
import { WindLayer } from "@/components/wind-layer";
import { RippleSurface } from "@/components/ripple-surface";
import { WaterTrail } from "@/components/water-trail";

export function WorldShell({
  children,
  trailColor,
  backHref,
  backLabel,
  hideHeader = false,
  tintClass,
}: {
  children: React.ReactNode;
  /** Overrides the water-trail hue (hex) — used by domain pages */
  trailColor?: string;
  /** When set, renders a back link at top-left (logo sits top-right) */
  backHref?: string;
  backLabel?: string;
  /** Skip the header entirely (pages that render their own top bar) */
  hideHeader?: boolean;
  /** Full-bleed background tint over the lake — used to unify page tone */
  tintClass?: string;
}) {
  return (
    <>
      <LakeLayer />
      <WindLayer />
      <WaterTrail color={trailColor} />
      <RippleSurface />

      {tintClass && (
        <div
          className={`fixed inset-0 -z-[15] ${tintClass}`}
          aria-hidden="true"
        />
      )}

      {!hideHeader && (
        <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10">
          {backHref && (
            <Link
              href={backHref}
              className="text-sm font-light tracking-wide text-moss-ink/50 transition-colors duration-500 hover:text-moss-ink"
            >
              {backLabel ?? "← 返回"}
            </Link>
          )}
          <Link
            href="/"
            className="text-lg font-light tracking-tight text-moss-ink/70 transition-colors duration-500 hover:text-moss-ink sm:text-xl"
          >
            Project Moss
          </Link>
        </header>
      )}

      {children}
    </>
  );
}
