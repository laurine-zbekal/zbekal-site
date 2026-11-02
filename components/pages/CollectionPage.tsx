import Link from "next/link";
import type { Collection } from "@/content/collections";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { artworksOf } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ArtworkCard } from "@/components/ArtworkCard";
import { JsonLd } from "@/components/JsonLd";

export function CollectionPage({ locale, collection }: { locale: Locale; collection: Collection }) {
  const t = ui[locale];
  const works = artworksOf(collection.slug);
  const shown = works.length;
  const planned = collection.planned ?? shown;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.breadcrumb.home, path: href(locale, "home") },
          { name: t.gallery.title, path: href(locale, "gallery") },
          { name: collection.title[locale], path: href(locale, "collection", collection.slug) },
        ])}
      />
      <section className="container section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <nav className="breadcrumb" aria-label="Fil d’Ariane" style={{ marginBottom: 20 }}>
          <Link href={href(locale, "home")}>{t.breadcrumb.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={href(locale, "gallery")}>{t.breadcrumb.gallery}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{collection.title[locale]}</span>
        </nav>
        <div className="section-head" style={{ alignItems: "flex-start" }}>
          <div className="stack" style={{ "--stack": "10px" } as React.CSSProperties}>
            <span className="kicker">
              {t.work.collection}
              {planned > shown ? ` · ${t.gallery.seriesProgress(shown, planned)}` : ""}
            </span>
            <h1 className="display h1" style={{ fontSize: "clamp(48px, 8vw, 104px)" }}>
              {collection.title[locale]}
            </h1>
          </div>
          <div className="prose" style={{ maxWidth: "52ch" }}>
            {collection.description[locale].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="grid-cards">
          {works.map((a, i) => (
            <ArtworkCard key={a.slug} artwork={a} locale={locale} priority={i < 3} />
          ))}
        </div>
        {collection.upcoming && planned > shown ? (
          <div className="panel panel--soft" style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: "16px 40px", alignItems: "center", justifyContent: "space-between" }}>
            <div className="stack" style={{ flex: "1 1 360px", "--stack": "8px" } as React.CSSProperties}>
              <h2 className="display h3">{t.gallery.upcomingTitle}</h2>
              <p className="prose">{collection.upcoming[locale]}</p>
            </div>
            <Link href={`${href(locale, "home")}#newsletter`} className="btn">
              {t.cta.notify}
            </Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
