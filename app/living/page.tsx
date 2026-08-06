import { domains } from "@/lib/content";
import { DomainDirectory } from "@/components/domain-directory";

const domain = domains.find((d) => d.id === "living")!;

export default function LivingPage() {
  return <DomainDirectory domain={domain} />;
}
