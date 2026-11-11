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
          <div className="soon" style={{ marginTop: 0 }}>
            <span className="soon__num">
              {String(shown).padStart(2, "0")}
              <small>/{planned}</small>
            </span>
            <div className="soon__body">
              <h2 id="suite-title" className="soon__title">
                Amazoni · {t.gallery.upcomingTitle}
              </h2>
              <p>{amazoni.upcoming?.[locale]}</p>
            </div>
            <Link href={`${href(locale, "home")}#newsletter`} className="btn btn--dark">
              {t.cta.notify}
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
