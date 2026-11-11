import Link from "next/link";
import type { Artwork } from "@/content/oeuvres";
import { getCollection } from "@/content/collections";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { artworksOf, aspectRatio, dimensionsLabel, hasDimensions, priceLabel, titleOf } from "@/lib/content";
import { imageSizes } from "@/lib/images";
import { artworkJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ArtworkCard, ArtworkPlaceholder, StatusBadge } from "@/components/ArtworkCard";
import { ArtworkViewer } from "@/components/ArtworkViewer";
import { JsonLd } from "@/components/JsonLd";
import { ScaleHint } from "@/components/ScaleHint";
import { CheckIcon } from "@/components/Icons";

export async function ArtworkPage({ locale, artwork }: { locale: Locale; artwork: Artwork }) {
  const t = ui[locale];
  const { title, subtitle } = titleOf(artwork, locale);
  const collection = getCollection(artwork.collection);
  const images = await imageSizes(artwork.images);
  // Autres toiles de la collection : celles qui suivent dans la liste, en boucle.
  const siblings = artworksOf(artwork.collection);
  const at = siblings.findIndex((a) => a.slug === artwork.slug);
  const others = [...siblings.slice(at + 1), ...siblings.slice(0, Math.max(at, 0))].slice(0, 3);
  const sold = artwork.status === "vendue";
  const onOrder = artwork.status === "sur-commande";
  const dims = dimensionsLabel(artwork, locale);
  const slugParam = encodeURIComponent(artwork.slug);
  const contactHref = `${href(locale, "contact")}?sujet=${onOrder ? "commission" : "acquisition"}&oeuvre=${slugParam}`;

  return (
    <>
      <JsonLd
        data={[
          artworkJsonLd(artwork, locale),
          breadcrumbJsonLd([
            { name: t.breadcrumb.home, path: href(locale, "home") },
            { name: t.gallery.title, path: href(locale, "gallery") },
            ...(collection ? [{ name: collection.title[locale], path: href(locale, "collection", collection.slug) }] : []),
            { name: title, path: href(locale, "artwork", artwork.slug) },
          ]),
        ]}
      />
      <article className="container section" style={{ paddingTop: "clamp(24px, 4vw, 40px)" }}>
        <nav className="breadcrumb" aria-label="Fil d’Ariane" style={{ marginBottom: 24 }}>
          <Link href={href(locale, "home")}>{t.breadcrumb.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={href(locale, "gallery")}>{t.breadcrumb.gallery}</Link>
          {collection ? (
            <>
              <span aria-hidden="true">/</span>
              <Link href={href(locale, "collection", collection.slug)}>{collection.title[locale]}</Link>
            </>
          ) : null}
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <div className="artwork">
          <div>
            {images.length ? (
              <ArtworkViewer images={images} title={title} alt={artwork.alt[locale]} locale={locale} />
            ) : (
              <div className="viewer__main" style={{ aspectRatio: aspectRatio(artwork), minHeight: 240 }}>
                <ArtworkPlaceholder artwork={artwork} locale={locale} />
              </div>
            )}
          </div>

          <div className="artwork__info stack" style={{ "--stack": "22px" } as React.CSSProperties}>
            <div className="stack" style={{ "--stack": "10px" } as React.CSSProperties}>
              <div className="cluster" style={{ gap: 10 }}>
                <StatusBadge status={artwork.status} locale={locale} />
                {collection ? (
                  <Link href={href(locale, "collection", collection.slug)} className="badge badge--grey" style={{ textDecoration: "none" }}>
                    {t.work.collection} {collection.title[locale]}
                  </Link>
                ) : null}
              </div>
              <h1 className="display artwork__title">{title}</h1>
              {subtitle ? <p className="artwork__subtitle">{subtitle}</p> : null}
            </div>

            {artwork.description ? <p className="prose">{artwork.description[locale]}</p> : null}

            <dl className="specs">
              <dt>{t.work.technique}</dt>
              <dd>{artwork.technique[locale]}</dd>
              {dims ? (
                <>
                  <dt>{t.work.dimensions}</dt>
                  <dd>{dims}</dd>
                </>
              ) : null}
              {artwork.year ? (
                <>
                  <dt>{t.work.year}</dt>
                  <dd>{artwork.year}</dd>
                </>
              ) : null}
              {artwork.award ? (
                <>
                  <dt>{t.work.award}</dt>
                  <dd>★ {artwork.award[locale]}</dd>
                </>
              ) : null}
              <dt>{t.work.availability}</dt>
              <dd>{onOrder ? t.work.onOrderAvailability : t.status[artwork.status]}</dd>
            </dl>

            {onOrder ? (
              <div className="order-box stack" style={{ "--stack": "14px" } as React.CSSProperties}>
                <p className="order-box__title">{t.work.onOrderTitle}</p>
                <p>{t.work.onOrderText}</p>
                <div className="cluster" style={{ "--cluster": "10px" } as React.CSSProperties}>
                  <Link href={contactHref} className="btn btn--pink btn--lg">
                    {t.cta.wantMine}
                  </Link>
                  <Link href={`${href(locale, "contact")}?sujet=other&oeuvre=${slugParam}`} className="btn btn--lg">
                    {t.cta.ask}
                  </Link>
                </div>
              </div>
            ) : !sold ? (
              <div className="stack" style={{ "--stack": "16px" } as React.CSSProperties}>
                <p className="price">{priceLabel(artwork, locale)}</p>
                <div className="cluster" style={{ "--cluster": "10px" } as React.CSSProperties}>
                  <Link href={contactHref} className="btn btn--pink btn--lg">
                    {t.cta.wantIt}
                  </Link>
                  <Link href={`${href(locale, "contact")}?sujet=other&oeuvre=${slugParam}`} className="btn btn--lg">
                    {t.cta.ask}
                  </Link>
                </div>
              </div>
            ) : (
              <p className="price muted">{t.status.vendue}</p>
            )}

            <ul className="reassurance">
              {t.work.reassurance.map((r) => (
                <li key={r}>
                  <CheckIcon /> <span>{r}</span>
                </li>
              ))}
            </ul>

            {hasDimensions(artwork) ? (
              <details>
                <summary className="link" style={{ cursor: "pointer", listStyle: "none" }}>
                  {t.work.scaleTitle} →
                </summary>
                <div style={{ marginTop: 16 }}>
                  <ScaleHint artwork={artwork} locale={locale} />
                </div>
              </details>
            ) : null}
          </div>
        </div>

        {others.length ? (
          <section style={{ marginTop: "clamp(56px, 8vw, 96px)" }} aria-labelledby="more-title">
            <div className="section-head" style={{ marginBottom: 20 }}>
              <h2 id="more-title" className="display h3">
                {t.work.moreFromCollection}
              </h2>
              <Link href={href(locale, "gallery")} className="link">
                {t.cta.backToGallery} →
              </Link>
            </div>
            <div className="grid-cards">
              {others.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
