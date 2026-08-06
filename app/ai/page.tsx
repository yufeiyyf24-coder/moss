import { domains } from "@/lib/content";
import { DomainDirectory } from "@/components/domain-directory";

const domain = domains.find((d) => d.id === "ai")!;

export default function AIPage() {
  return <DomainDirectory domain={domain} />;
}
