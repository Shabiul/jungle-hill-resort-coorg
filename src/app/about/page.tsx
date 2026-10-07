import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "About", path: "/about" });

export default function Page() {
  return <PagePlaceholder title="About" />;
}
