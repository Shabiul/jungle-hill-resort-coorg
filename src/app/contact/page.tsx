import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Contact", path: "/contact" });

export default function Page() {
  return <PagePlaceholder title="Contact" />;
}
