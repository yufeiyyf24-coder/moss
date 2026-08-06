import { domains } from "@/lib/content";
import { DomainDirectory } from "@/components/domain-directory";

const domain = domains.find((d) => d.id === "sustainability")!;

export default function SustainabilityPage() {
  return <DomainDirectory domain={domain} />;
}
