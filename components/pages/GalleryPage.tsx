import Image from "next/image";
import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { getCollection } from "@/content/collections";
import { href } from "@/lib/routes";
import { allArtworks, artworksOf, collectionsWithWorks } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { JsonLd } from "@/components/JsonLd";

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const collections = collectionsWithWorks();
  const amazoni = getCollection("amazoni");
  const shown = artworksOf("amazoni").length;
  const planned = amazoni?.planned ?? shown;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.breadcrumb.home, path: href(locale, "home") },
          { name: t.gallery.title, path: href(locale, "gallery") },
        ])}
      />
      <section className="container section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="section-head">
          <h1 className="display h1" style={{ fontSize: "clamp(48px, 8vw, 104px)" }}>
            {t.gallery.title}
          </h1>
          <p className="lead" style={{ maxWidth: "44ch" }}>
            {t.gallery.lead}
          </p>
        </div>
        <ArtworkGrid artworks={allArtworks()} collections={collections} locale={locale} />
      </section>

      {amazoni && planned > shown ? (
        <section className="container" aria-labelledby="suite-title">
          <div className="panel panel--soft" style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "center" }}>
            <div className="rounded-img" style={{ flex: "0 1 300px", aspectRatio: "3 / 4", maxWidth: 320 }}>
              <Image src="/atelier/a-venir.jpg" alt={locale === "fr" ? "Toile à venir : un visage entre des feuilles vertes et une branche dorée" : "Upcoming painting: a face among green leaves and a golden branch"} width={1170} height={1520} sizes="(min-width: 720px) 300px, 100vw" quality={70} />
            </div>
            <div className="stack" style={{ flex: "1 1 320px", minWidth: 0, "--stack": "14px" } as React.CSSProperties}>
              <span className="kicker">{t.gallery.seriesProgress(shown, planned)}</span>
              <h2 id="suite-title" className="display h3">
                {t.gallery.upcomingTitle}
              </h2>
              <p className="prose">{amazoni.upcoming?.[locale]}</p>
              <Link href={`${href(locale, "home")}#newsletter`} className="btn" style={{ alignSelf: "flex-start" }}>
                {t.cta.notify}
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
