import { domains } from "@/lib/content";
import { DomainDirectory } from "@/components/domain-directory";

const domain = domains.find((d) => d.id === "connections")!;

export default function ConnectionsPage() {
  return <DomainDirectory domain={domain} />;
}
