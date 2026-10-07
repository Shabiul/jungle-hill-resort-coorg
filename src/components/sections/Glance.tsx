import { glanceFacts } from "@/data/site";

/** Slim facts strip under the hero. */
export function Glance() {
  return (
    <section aria-label="At a glance" className="bg-forest-900 text-paper">
      <div className="page-container">
        <dl className="grid grid-cols-2 divide-x divide-paper/15 sm:grid-cols-3 lg:grid-cols-5">
          {glanceFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={`px-4 py-5 first:pl-0 lg:py-6 ${index >= 2 ? "border-paper/15 max-sm:border-t" : ""} ${index === 4 ? "max-sm:col-span-2" : ""}`}
            >
              <dt className="label-mono text-paper/70">{fact.label}</dt>
              <dd className="mt-1 font-display text-xl sm:text-2xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
