import type { Exhibition } from "@/content/expositions";
import { ui, type Locale } from "@/content/ui";

export function ExhibitionList({ items, locale, compact = false }: { items: Exhibition[]; locale: Locale; compact?: boolean }) {
  const t = ui[locale];
  return (
    <ul>
      {items.map((e, i) => (
        <li key={`${e.year}-${i}`} className="expo">
          <span className={`expo__year${e.upcoming ? " expo__year--upcoming" : ""}`}>{e.upcoming ? t.exhibitions.upcoming : e.year}</span>
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
