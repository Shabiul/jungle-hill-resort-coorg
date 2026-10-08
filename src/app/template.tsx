import { PageTransition } from "@/components/animations/PageTransition";

/** Re-mounts on every navigation: a short, enter-only fade. Never hides the page or blocks clicks. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
