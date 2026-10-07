import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Dining", path: "/dining" });

export default function Page() {
  return <PagePlaceholder title="Dining" />;
}
