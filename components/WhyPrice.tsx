import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { tarifs } from "@/content/tarifs";
import { href } from "@/lib/routes";

/**
 * Page Tarifs : « Pourquoi mes toiles coûtent plus cher qu’un tableau déco ? »
 * Cinq cartes de couleur (palette Amazoni). Les textes sont dans content/tarifs.ts (`pourquoi`),
 * le mot-clé « 10 à 15 heures » vient des formats de la grille (`hours`). Le détail par format n’est plus affiché
 * (demande de Laurine, 19 novembre 2026 : le temps passé évolue).
 */
export function WhyPrice({ locale }: { locale: Locale }) {
  const p = tarifs.pourquoi;
  const t = ui[locale];
  const hours = tarifs.formats.filter((f) => f.hours != null).map((f) => f.hours as number);
  const timeKeyword = hours.length ? p.hoursKeyword[locale](Math.min(...hours), Math.max(...hours)) : "";

  return (
    <section className="container section why-price" aria-labelledby="why-price-title">
      <div className="why-price__head">
        <span className="badge badge--yellow">{p.badge[locale]}</span>
        <h2 id="why-price-title" className="display h2">
          {p.title[locale][0]} <span className="accent">{p.title[locale][1]}</span>
        </h2>
        <p className="lead">{p.lead[locale]}</p>
      </div>

      <ol className="why-grid">
        {p.cards.map((c, i) => (
          <li key={c.key} className={`why-card why-card--${c.key} reveal`}>
            <h3 className="why-card__head">
              <span className="why-card__theme">
                {String(i + 1).padStart(2, "0")} · {c.theme[locale]}
              </span>
              <span className="why-card__keyword">{c.key === "time" ? timeKeyword : c.keyword[locale]}</span>
            </h3>
            <div className="why-card__body">
              <p className="why-card__text">{c.text[locale]}</p>
              {c.key === "studio" ? (
                <ul className="why-charges">
                  {p.charges[locale].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                  <li className="why-charges__rest">{p.rest[locale]}</li>
                </ul>
              ) : null}
            </div>
            <p className="why-card__store">
              <span>{p.storeLabel[locale]}</span>
              {c.store[locale]}
            </p>
          </li>
        ))}
      </ol>

      <div className="why-end reveal">
        <p>
          <strong>{p.endTitle[locale]}</strong>
          <span>{p.endText[locale]}</span>
        </p>
        <Link href={href(locale, "contact")} className="btn btn--forest">
          {t.cta.ask}
        </Link>
      </div>
    </section>
  );
}
