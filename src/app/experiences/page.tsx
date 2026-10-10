import Link from "next/link";
import { RevealImage } from "@/components/animations/RevealImage";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/shared/PageHero";
import { Photo } from "@/components/shared/Photo";
import { PhotoGrid } from "@/components/shared/PhotoGrid";
import { experiences } from "@/data/experiences";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pool, kids park and games",
  description:
    "A swimming pool with a kids pool, a play area for children under 10, indoor games and outdoor shuttle badminton.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        label="03 — On the property"
        lines={[
          { text: "Water, swings," },
          { text: "and ", emphasis: "slow", after: " games." },
        ]}
        description={
          <p>
            Between meals and the view there is a pool, a play area for children and a few
            games. Nothing here is loud.
          </p>
        }
      />

      <section aria-label="Things to do" className="pb-24">
        <ol className="page-container">
          {experiences.map((item, index) => (
            <li
              key={item.slug}
              id={item.slug}
              className="grid scroll-mt-28 gap-8 border-t border-ink/25 py-12 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <p className="label-mono text-brass-deep">
                  {String(index + 1).padStart(2, "0")} · {item.label}
                </p>
                <h2 className="mt-3 text-4xl sm:text-6xl">{item.title}</h2>
                <p className="mt-5 max-w-md text-stone">{item.summary}</p>
                <ul className="mt-6 border-t border-ink/20">
                  {item.facts.map((fact) => (
                    <li key={fact} className="label-mono border-b border-ink/20 py-3">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                {item.images.length > 1 ? (
                  <PhotoGrid images={item.images} />
                ) : item.images[0] ? (
                  <RevealImage>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Photo
                        image={item.images[0]}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                  </RevealImage>
                ) : (
                  <div className="label-mono flex aspect-[4/3] items-end bg-linen p-6 text-stone">
                    {/* TODO: add a photo to public/images/experiences and reference it in data/experiences.ts */}
                    Photograph to come
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="page-container mt-4">
          <Link href="/gallery" className="label-mono link-underline">
            More photographs in the gallery
          </Link>
        </p>
      </section>

      <CTA />
    </>
  );
}
