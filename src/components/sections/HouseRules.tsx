import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { checkTimes, houseRules } from "@/data/policies";

export function HouseRules() {
  return (
    <section
      id="house-rules"
      aria-label="Slow stay rules"
      className="section-space bg-linen"
    >
      <div className="page-container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            label="05 / Slow stay rules"
            lines={[{ text: "A few things" }, { text: "we ", emphasis: "ask." }]}
            description={
              <p>The resort is built for rest. These keep it that way for everyone.</p>
            }
          />
          <div className="label-mono lg:text-right">
            <p>Check-in {checkTimes.checkIn}</p>
            <p>Check-out {checkTimes.checkOut}</p>
            <p className="mt-2 max-w-xs tracking-normal text-ink/70 normal-case lg:ml-auto">
              {checkTimes.note}
            </p>
          </div>
        </div>

        <ol className="mt-14 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
          {houseRules.map((rule, index) => (
            <li
              key={rule.title}
              className="border-b border-ink/25 p-6 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <Reveal>
                <p className="label-mono text-brass-deep">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl">{rule.title}</h3>
                <p className="mt-2 text-ink/80">{rule.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
