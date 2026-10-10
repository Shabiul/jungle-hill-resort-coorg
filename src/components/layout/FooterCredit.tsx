import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";

/** Centred bottom bar: copyright, then the developer credit with a real outbound link. */
export function FooterCredit() {
  const { developer } = siteConfig;

  return (
    <div className="mt-6 flex flex-col items-center gap-4 pt-6 text-center">
      <p className="label-mono text-[0.6875rem] tracking-[0.22em] text-fog">
        &copy; {new Date().getFullYear()} Jungle Hill Resort
      </p>
      <p className="max-w-none font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-snug font-light text-mist">
        <em className="font-light">Designed and developed by</em>{" "}
        <a
          href={developer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-medium tracking-[0.04em] whitespace-nowrap text-champagne transition-colors hover:text-champagne-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          {developer.name}
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          />
        </a>
      </p>
    </div>
  );
}
