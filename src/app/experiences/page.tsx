import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Experiences", path: "/experiences" });

export default function Page() {
  return <PagePlaceholder title="Experiences" />;
}
