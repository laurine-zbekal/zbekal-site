import Image from "next/image";
import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { tarifs } from "@/content/tarifs";
import { carteCadeau } from "@/content/carte-cadeau";
import { href } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon } from "@/components/Icons";

const price = (n: number, locale: Locale) => new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export function PricesPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const title = `${t.nav.prices}`;
  // toutes les toiles sont dessinées à la même échelle : le plus grand côté de la grille occupe toute la hauteur du « mur »
  const max = Math.max(...tarifs.formats.map((f) => Math.max(f.w, f.h)));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.breadcrumb.home, path: href(locale, "home") },
          { name: title, path: href(locale, "prices") },
        ])}
      />

      {/* En-tête : le texte à gauche, Laurine devant sa toile vierge à droite */}
      <section className="container" style={{ paddingTop: "clamp(20px, 3vw, 32px)" }}>
        <div className="prices-hero">
          <div className="prices-hero__body">
            <span className="badge badge--yellow">{tarifs.kicker[locale]}</span>
            <h1 className="display prices-hero__title">
              {locale === "fr" ? "Tarifs" : "Prices"} <span>{tarifs.year}</span>
            </h1>
            <p className="prices-hero__lead">{tarifs.lead[locale]}</p>
          </div>
          <div className="prices-hero__photo">
            <Image
              src={tarifs.heroPhoto.src}
              alt={tarifs.heroPhoto.alt[locale]}
              width={tarifs.heroPhoto.w}
              height={tarifs.heroPhoto.h}
              sizes="(min-width: 900px) 520px, 100vw"
              priority
              quality={80}
            />
            <span className="prices-hero__caption">{tarifs.heroPhoto.caption[locale]}</span>
          </div>
        </div>
      </section>

      {/* La grille */}
      <section className="container section" aria-labelledby="grid-title" style={{ paddingBottom: "clamp(32px, 5vw, 56px)" }}>
        <div className="section-head">
          <h2 id="grid-title" className="display h2">
            {tarifs.gridTitle[locale]}
          </h2>
          <p className="lead" style={{ maxWidth: "42ch" }}>
            {tarifs.gridLead[locale]}
          </p>
        </div>
        <ul className={`price-grid${tarifs.formats.length === 3 ? " price-grid--3" : ""}`} style={{ "--cols": tarifs.formats.length } as React.CSSProperties}>
          {tarifs.formats.map((f) => (
            <li key={`${f.w}x${f.h}`} className={`price-card reveal${f.star ? " price-card--star" : ""}`}>
              <span className="price-card__wall" aria-hidden="true">
                <span className="price-card__canvas" style={{ width: `${(f.w / max) * 90}%`, aspectRatio: `${f.w} / ${f.h}`, background: f.color }} />
              </span>
              <span className="price-card__body">
                {f.tag ? <span className={`badge ${f.star ? "badge--pink" : "badge--grey"}`}>{`${tarifs.starLabel[locale]} ${f.tag}`}</span> : <span className="price-card__spacer" />}
                <span className="price-card__size">
                  {f.w} × {f.h} cm
                </span>
                <span className="price-card__price">{price(f.price, locale)}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="price-note">
          <strong>{tarifs.custom[locale]}</strong>
        </p>
        <p className="price-legal">{tarifs.legal[locale]}</p>
        <p style={{ marginTop: 20 }}>
          <Link href={href(locale, "gift")} className="link" style={{ fontWeight: 700 }}>
            {carteCadeau.fromPrices[locale]} →
          </Link>
        </p>
      </section>

      {/* Ce que le prix comprend */}
      <section className="container" aria-labelledby="included-title">
        <div className="panel panel--soft grid-2 reveal" style={{ alignItems: "start" }}>
          <h2 id="included-title" className="display h3">
            {tarifs.includedTitle[locale]}
          </h2>
          <div className="stack" style={{ "--stack": "16px" } as React.CSSProperties}>
            <ul className="included">
              {tarifs.included[locale].map((line) => (
                <li key={line}>
                  <CheckIcon /> <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: 15 }}>
              {tarifs.notIncluded[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* Des prix d’artiste, en début de carrière */}
      <section className="container section" aria-labelledby="why-title">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <h2 id="why-title" className="display h2">
            {tarifs.whyTitle[locale][0]} <span className="accent">{tarifs.whyTitle[locale][1]}</span>
          </h2>
          <div className="stack" style={{ "--stack": "20px" } as React.CSSProperties}>
            <div className="prose">
              {tarifs.why[locale].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="vary">
              <h3 className="approach__title">{tarifs.varyTitle[locale]}</h3>
              <p>{tarifs.vary[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section className="container" aria-labelledby="steps-title">
        <h2 id="steps-title" className="display h3" style={{ marginBottom: 20 }}>
          {tarifs.stepsTitle[locale]}
        </h2>
        <ol className="steps reveal">
          {tarifs.steps[locale].map((s, i) => (
            <li key={s.title}>
              <span className="steps__num">{i + 1}</span>
              <span className="steps__title">{s.title}</span>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Appel */}
      <section className="container section" aria-labelledby="cta-title">
        <div className="panel panel--pink reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px 48px" }}>
          <div className="stack" style={{ "--stack": "8px", flex: "1 1 340px" } as React.CSSProperties}>
            <h2 id="cta-title" className="display h2" style={{ color: "#fff" }}>
              {tarifs.ctaTitle[locale]}
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.45 }}>{tarifs.ctaText[locale]}</p>
          </div>
          <Link href={`${href(locale, "contact")}?sujet=commission`} className="btn btn--white btn--lg">
            {t.cta.commission}
          </Link>
        </div>
      </section>
    </>
  );
}
