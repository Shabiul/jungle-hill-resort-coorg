"use client";

import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  // TODO: design
  return (
    <Container>
      <Heading level={1}>Something went wrong</Heading>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </Container>
  );
}
