import Image from "next/image";
import type { Exhibition } from "@/content/expositions";
import { ui, type Locale } from "@/content/ui";

/** Liste compacte : une ligne par événement (accueil, page Laurine, « à venir »). */
export function ExhibitionList({ items, locale, compact = false }: { items: Exhibition[]; locale: Locale; compact?: boolean }) {
  const t = ui[locale];
  return (
    <ul>
      {items.map((e, i) => (
        <li key={`${e.year}-${i}`} className="expo">
          <span className={`expo__year${e.upcoming ? " expo__year--upcoming" : ""}`}>{e.upcoming ? (e.now ? t.exhibitions.nowTag : t.exhibitions.upcoming) : e.year}</span>
          <div className="stack" style={{ "--stack": "2px" } as React.CSSProperties}>
            <span className="expo__title">
              {e.url ? (
                <a href={e.url} rel="noopener">
                  {e.title[locale]}
                </a>
              ) : (
                e.title[locale]
              )}
            </span>
            <span className="expo__meta">
              {e.place[locale]}
              {e.upcoming || !compact ? ` · ${e.date[locale]}` : ""}
              {e.details && !compact ? ` · ${e.details[locale]}` : ""}
              {e.details && compact && e.upcoming ? ` · ${e.details[locale]}` : ""}
            </span>
            {e.award ? <span className="expo__award">★ {e.award[locale]}</span> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Version illustrée : photos et récit de chaque événement (page Expos). */
export function ExhibitionStories({ items, locale }: { items: Exhibition[]; locale: Locale }) {
  return (
    <div className="stories">
      {items.map((e, i) => {
        const images = (e.images ?? []).slice(0, 2);
        const text = e.story ?? e.details;
        return (
          <article key={`${e.year}-${i}`} className={`story reveal${images.length === 0 ? " story--text" : images.length > 1 ? " story--two" : ""}`}>
            {images.length ? (
              <div className="story__media">
                {images.map((img) => (
                  <div key={img.src} className="story__img">
                    <Image src={img.src} alt={img.alt[locale]} width={img.w} height={img.h} sizes="(min-width: 820px) 270px, 46vw" quality={75} />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="story__body">
              <span className="expo__year">{e.year}</span>
              <h3 className="story__title">{e.title[locale]}</h3>
              <p className="expo__meta">
                {e.place[locale]} · {e.date[locale]}
              </p>
              {text ? <p className="story__text">{text[locale]}</p> : null}
              {e.award ? <span className="expo__award">★ {e.award[locale]}</span> : null}
              {e.url ? (
                <a href={e.url} className="link" rel="noopener">
                  {e.urlLabel?.[locale] ?? e.title[locale]} →
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
