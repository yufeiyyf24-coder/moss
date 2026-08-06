import { domains } from "@/lib/content";
import { DomainDirectory } from "@/components/domain-directory";

const domain = domains.find((d) => d.id === "visual")!;

export default function VisualPage() {
  return <DomainDirectory domain={domain} />;
}
