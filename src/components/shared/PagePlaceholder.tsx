import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

interface PagePlaceholderProps {
  title: string;
}

// Temporary stand-in for pages that have not been designed yet.
export function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <Container>
      <Heading level={1}>{title}</Heading>
      {/* TODO: page content */}
    </Container>
  );
}
