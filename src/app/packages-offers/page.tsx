import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Packages & Offers",
  path: "/packages-offers",
});

export default function Page() {
  return <PagePlaceholder title="Packages & Offers" />;
}
