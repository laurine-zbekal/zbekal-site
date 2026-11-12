import Image from "next/image";
import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { site } from "@/content/site";
import { tarifs } from "@/content/tarifs";
import { carteCadeau as g } from "@/content/carte-cadeau";
import { href } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon } from "@/components/Icons";

const price = (n: number, locale: Locale) => new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/** Page « Carte cadeau » : textes dans content/carte-cadeau.ts, formats et prix dans content/tarifs.ts. */
export function GiftCardPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const formats = tarifs.formats;
  const max = Math.max(...formats.map((f) => Math.max(f.w, f.h)));
  const contactHref = `${href(locale, "contact")}?sujet=gift`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.breadcrumb.home, path: href(locale, "home") },
          { name: t.nav.gift, path: href(locale, "gift") },
        ])}
      />

      {/* Haut de page : le texte à gauche, la carte à droite */}
      <section className="container hero" aria-labelledby="gift-title">
        <div className="stack" style={{ "--stack": "24px" } as React.CSSProperties}>
          <span className="badge badge--yellow" style={{ alignSelf: "flex-start" }}>
            {g.badge[locale]}
          </span>
          <h1 id="gift-title" className="display h1 hero__title gift-title">
            {g.title[locale][0]} <span className="accent">{g.title[locale][1]}</span>
          </h1>
          <p className="lead" style={{ fontSize: "clamp(19px, 2vw, 22px)", color: "var(--ink)" }}>
            {g.lead[locale]}
          </p>
          <div className="cluster" style={{ "--cluster": "12px 14px" } as React.CSSProperties}>
            <Link href={contactHref} className="btn btn--pink btn--lg">
              {g.cta[locale]}
            </Link>
            <Link href="#formats" className="btn btn--lg">
              {g.formatsTitle[locale]}
            </Link>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__img hero__img--card">
            <Image src={g.photos.recto.src} alt={g.photos.recto.alt[locale]} width={g.photos.recto.w} height={g.photos.recto.h} sizes="(min-width: 900px) 46vw, 100vw" priority quality={80} />
          </div>
          <span className="hero__badge">{g.sticker[locale]}</span>
        </div>
      </section>

      {/* Les formats */}
      <section className="band" aria-labelledby="formats-title" id="formats">
        <div className="container section">
          <div className="section-head">
            <h2 id="formats-title" className="display h2">
              {g.formatsTitle[locale]}
            </h2>
            <p className="lead" style={{ maxWidth: "42ch" }}>
              {g.formatsLead[locale]}
            </p>
          </div>
          <ul className={`price-grid${formats.length === 3 ? " price-grid--3" : ""}`} style={{ "--cols": formats.length } as React.CSSProperties}>
            {formats.map((f) => (
              <li key={`${f.w}x${f.h}`} className="price-card price-card--star reveal">
                <span className="price-card__wall" aria-hidden="true">
                  <span className="price-card__canvas" style={{ width: `${(f.w / max) * 90}%`, aspectRatio: `${f.w} / ${f.h}`, background: f.color }} />
                </span>
                <span className="price-card__body">
                  {f.tag ? <span className="badge badge--pink">{`${tarifs.starLabel[locale]} ${f.tag}`}</span> : null}
                  <span className="price-card__size">
                    {f.w} × {f.h} cm
                  </span>
                  <span className="price-card__price">{price(f.price, locale)}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="price-note">
            <strong>{g.bigger[locale]}</strong>
          </p>
          <p className="price-legal">
            {g.legal[locale]} {site.legal.vat[locale]}.{" "}
            <Link href={href(locale, "prices")} className="link">
              {g.seePrices[locale]} →
            </Link>
          </p>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section className="container section" aria-labelledby="gift-steps-title">
        <h2 id="gift-steps-title" className="display h3" style={{ marginBottom: 20 }}>
          {g.stepsTitle[locale]}
        </h2>
        <ol className="steps reveal">
          {g.steps[locale].map((s, i) => (
            <li key={s.title}>
              <span className="steps__num">{i + 1}</span>
              <span className="steps__title">{s.title}</span>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* La carte elle-même : le dos, et ce qu’elle comprend */}
      <section className="container" aria-labelledby="gift-card-title">
        <div className="panel panel--pink-soft gift-card reveal">
          <div className="gift-card__img rounded-img">
            <Image src={g.photos.verso.src} alt={g.photos.verso.alt[locale]} width={g.photos.verso.w} height={g.photos.verso.h} sizes="(min-width: 900px) 38vw, 100vw" quality={80} />
          </div>
          <div className="stack" style={{ "--stack": "18px" } as React.CSSProperties}>
            <h2 id="gift-card-title" className="display h2">
              {g.cardTitle[locale][0]} <span className="accent">{g.cardTitle[locale][1]}</span>
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: "48ch" }}>{g.cardText[locale]}</p>
            <h3 className="approach__title" style={{ marginTop: 8 }}>
              {g.includedTitle[locale]}
            </h3>
            <ul className="included">
              {g.included[locale].map((line) => (
                <li key={line}>
                  <CheckIcon /> <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: 15 }}>
              {g.notIncluded[locale]}{" "}
              <Link href={`${href(locale, "terms")}#carte-cadeau`} className="link">
                {g.termsLink[locale]}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Appel */}
      <section className="container section" aria-labelledby="gift-cta-title">
        <div className="panel panel--pink reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px 48px" }}>
          <div className="stack" style={{ "--stack": "8px", flex: "1 1 340px" } as React.CSSProperties}>
            <h2 id="gift-cta-title" className="display h2" style={{ color: "#fff" }}>
              {g.ctaTitle[locale]}
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.45 }}>{g.ctaText[locale]}</p>
          </div>
          <Link href={contactHref} className="btn btn--white btn--lg">
            {g.cta[locale]}
          </Link>
        </div>
      </section>
    </>
  );
}
