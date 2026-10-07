import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Booking", path: "/booking" });

export default function Page() {
  return <PagePlaceholder title="Booking" />;
}
