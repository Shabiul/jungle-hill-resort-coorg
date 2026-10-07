import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Gallery", path: "/gallery" });

export default function Page() {
  return <PagePlaceholder title="Gallery" />;
}
