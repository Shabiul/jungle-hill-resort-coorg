import { Marquee } from "@/components/animations/Marquee";

const items = [
  "Coffee estate",
  "Pepper vines",
  "Pool",
  "Kids park",
  "Restaurant 7 AM to 10 PM",
  "13 rooms",
];

/** Slim mono strip under the hero. Drifts slowly; static for reduced motion. */
export function MarqueeStrip() {
  const row = [...items, ...items];
  return (
    <section aria-label="At a glance" className="dark-surface bg-forest text-ivory">
      <Marquee duration={40} className="py-4">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="label-mono flex items-center whitespace-nowrap"
          >
            <span className="px-6">{item}</span>
            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-brass" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
