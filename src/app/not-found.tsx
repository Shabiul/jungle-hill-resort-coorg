import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  // TODO: design
  return (
    <Container>
      <Heading level={1}>Page not found</Heading>
      <Link href="/">Back to home</Link>
    </Container>
  );
}
