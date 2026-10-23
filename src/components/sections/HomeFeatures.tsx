import { Baby, Dices, Trees, Utensils, Waves } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";

// Only real facts from the resort's own information.
const features = [
  { icon: Trees, title: "Coffee Estate Views", detail: "Coffee and pepper plantations" },
  { icon: Utensils, title: "Restaurant", detail: "South Indian, North Indian, Chinese" },
  { icon: Waves, title: "Swimming Pool", detail: "With a shallow kids pool" },
  { icon: Baby, title: "Kids Park", detail: "A play area for children under 10" },
  {
    icon: Dices,
    title: "Indoor and Outdoor Games",
    detail: "Indoor games and shuttle badminton",
  },
] as const;

/** Five short facts in one row. No rules between them. */
export function HomeFeatures() {
  return (
    <section aria-label="At the resort" className="bg-surface py-8 text-body sm:py-10">
      <ul className="page-container grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-5">
        {features.map(({ icon: Icon, title, detail }, index) => (
          <li
            key={title}
            className="px-2 text-center last:col-span-2 lg:border-l lg:border-line lg:first:border-l-0 lg:last:col-span-1"
          >
            <FadeUp index={index} rise={8}>
              <Icon
                size={30}
                strokeWidth={1.5}
                aria-hidden="true"
                className="mx-auto text-olive"
              />
              <p className="mt-3 font-display text-xl leading-tight">{title}</p>
              <p className="mx-auto mt-1 max-w-[22ch] text-small text-body">{detail}</p>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}
