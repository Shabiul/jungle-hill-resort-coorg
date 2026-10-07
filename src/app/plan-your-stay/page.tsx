import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Plan Your Stay",
  path: "/plan-your-stay",
});

export default function Page() {
  return <PagePlaceholder title="Plan Your Stay" />;
}
