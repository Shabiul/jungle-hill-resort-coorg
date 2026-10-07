import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Rooms", path: "/rooms" });

export default function Page() {
  return <PagePlaceholder title="Rooms" />;
}
