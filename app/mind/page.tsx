import { domains } from "@/lib/content";
import { DomainDirectory } from "@/components/domain-directory";

const domain = domains.find((d) => d.id === "mind")!;

export default function MindPage() {
  return <DomainDirectory domain={domain} />;
}
