import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/content/oeuvres";
import { getCollection } from "@/content/collections";
import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { artworksOf, aspectRatio, dimensionsLabel, hasDimensions, priceLabel, specLine, titleOf } from "@/lib/content";
import { imageSizes } from "@/lib/images";
import { artworkJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ArtworkPlaceholder, StatusBadge } from "@/components/ArtworkCard";
import { ArtworkViewer } from "@/components/ArtworkViewer";
import { JsonLd } from "@/components/JsonLd";
import { ScaleHint } from "@/components/ScaleHint";
import { ArrowIcon, CheckIcon, ChevronIcon } from "@/components/Icons";

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
  const askHref = `${href(locale, "contact")}?sujet=other&oeuvre=${slugParam}`;
  // sous le titre : l’essentiel en une ligne (le détail est dans le volet « Fiche technique »)
  // (espaces insécables dans les dimensions : « 100 × 100 cm » ne se coupe pas en fin de ligne)
  const meta = [artwork.technique[locale], dims?.replace(/ /g, "\u00a0"), artwork.year].filter(Boolean).join(" · ");
  const back = collection
    ? { href: href(locale, "collection", collection.slug), label: `${t.work.collection} ${collection.title[locale]}` }
    : { href: href(locale, "gallery"), label: t.cta.backToGallery };

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
      {/* Sur téléphone : la photo occupe toute la largeur, et la fiche est un feuillet blanc qui remonte dessus.
          Sur ordinateur : deux colonnes, les photos à gauche, la fiche à droite. */}
      <article className="container section artwork-page">
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
          {images.length ? (
            <ArtworkViewer images={images} title={title} alt={artwork.alt[locale]} locale={locale} back={back} />
          ) : (
            <div className="viewer">
              <div className="viewer__stage viewer__stage--empty" style={{ aspectRatio: aspectRatio(artwork) }}>
                <ArtworkPlaceholder artwork={artwork} locale={locale} />
                <Link href={back.href} className="viewer__back" aria-label={back.label}>
                  <ArrowIcon size={20} />
                </Link>
              </div>
              <div className="viewer__cap" />
            </div>
          )}

          <div className="artwork__info">
            <div className="stack" style={{ "--stack": "10px" } as React.CSSProperties}>
              <div className="cluster" style={{ gap: 8 }}>
                <StatusBadge status={artwork.status} locale={locale} />
                {collection ? (
                  <Link href={href(locale, "collection", collection.slug)} className="badge badge--grey" style={{ textDecoration: "none" }}>
                    {t.work.collection} {collection.title[locale]}
                  </Link>
                ) : null}
                {artwork.award ? <span className="badge badge--yellow">★ {t.work.award}</span> : null}
              </div>
              <h1 className="display artwork__title">{title}</h1>
              {subtitle ? <p className="artwork__subtitle">{subtitle}</p> : null}
              {meta ? <p className="artwork__meta">{meta}</p> : null}
            </div>

            {onOrder ? (
              <div className="order-box stack" style={{ "--stack": "14px" } as React.CSSProperties}>
                <p className="order-box__title">{t.work.onOrderTitle}</p>
                <p>{t.work.onOrderText}</p>
                <div className="cluster" style={{ "--cluster": "10px" } as React.CSSProperties}>
                  <Link href={contactHref} className="btn btn--pink btn--lg">
                    {t.cta.wantMine}
                  </Link>
                  <Link href={askHref} className="btn btn--lg">
                    {t.cta.ask}
                  </Link>
                </div>
              </div>
            ) : !sold ? (
              <div className="buy">
                {site.showPrices ? <p className="price">{priceLabel(artwork, locale)}</p> : null}
                <Link href={contactHref} className="btn btn--pink btn--lg">
                  {t.cta.wantIt}
                </Link>
              </div>
            ) : (
              <p className="price muted">{t.status.vendue}</p>
            )}

            {/* Les volets : la description est ouverte, le reste s’ouvre au toucher. */}
            <div className="folds">
              {artwork.description ? (
                <details className="fold" open>
                  <summary>
                    <span>{t.work.folds.description}</span>
                    <ChevronIcon />
                  </summary>
                  <div className="fold__body prose">
                    <p>{artwork.description[locale]}</p>
                  </div>
                </details>
              ) : null}
              <details className="fold">
                <summary>
                  <span>{t.work.folds.specs}</span>
                  <ChevronIcon />
                </summary>
                <div className="fold__body">
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
                </div>
              </details>
              <details className="fold">
                <summary>
                  <span>{t.work.folds.delivery}</span>
                  <ChevronIcon />
                </summary>
                <div className="fold__body">
                  <ul className="reassurance">
                    {t.work.reassurance.map((r) => (
                      <li key={r}>
                        <CheckIcon /> <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
              {hasDimensions(artwork) ? (
                <details className="fold">
                  <summary>
                    <span>{t.work.scaleTitle}</span>
                    <ChevronIcon />
                  </summary>
                  <div className="fold__body">
                    <ScaleHint artwork={artwork} locale={locale} />
                  </div>
                </details>
              ) : null}
            </div>

            {!onOrder && !sold ? (
              <Link href={askHref} className="btn btn--lg artwork__ask">
                {t.cta.ask}
              </Link>
            ) : null}
          </div>
        </div>

        {others.length ? (
          <section style={{ marginTop: "clamp(48px, 8vw, 96px)" }} aria-labelledby="more-title">
            <div className="section-head" style={{ marginBottom: 16 }}>
              <h2 id="more-title" className="display h3">
                {t.work.moreFromCollection}
              </h2>
              <Link href={href(locale, "gallery")} className="link">
                {t.cta.backToGallery} →
              </Link>
            </div>
            <ul className="more-list">
              {others.map((a) => {
                const main = a.images[0];
                return (
                  <li key={a.slug}>
                    <Link href={href(locale, "artwork", a.slug)} className="more-row">
                      <span className="more-row__img">{main ? <Image src={main} alt={a.alt[locale]} fill sizes="84px" quality={60} style={{ objectFit: "cover" }} /> : <ArtworkPlaceholder artwork={a} locale={locale} />}</span>
                      <span className="more-row__body">
                        <span className="more-row__title">{titleOf(a, locale).title}</span>
                        <span className="more-row__sub">{specLine(a, locale)}</span>
                        <span>
                          <StatusBadge status={a.status} locale={locale} />
                        </span>
                      </span>
                      <ArrowIcon className="more-row__arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
