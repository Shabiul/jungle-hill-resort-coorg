import type { Transition, Variants } from "motion/react";

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const defaultTransition: Transition = { duration: 0.8, ease: easeOut };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/** No-motion variants for users who prefer reduced motion. */
export const reducedVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function pickVariants(variants: Variants, reduced: boolean): Variants {
  return reduced ? reducedVariants : variants;
}
