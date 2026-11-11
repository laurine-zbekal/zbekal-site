import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { availableArtworks, upcomingExhibition } from "@/lib/content";

/** Bandeau défilant en haut de page : actualité + toiles disponibles. */
export function Ticker({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const expo = upcomingExhibition();
  const available = availableArtworks().length;
  const parts: { text: string; to: string }[] = [];
  if (expo) {
    parts.push({
      text: `${t.ticker.upcoming} · ${expo.title[locale]} · ${expo.date[locale]}${expo.details ? ` · ${expo.details[locale]}` : ""}`,
      to: href(locale, "exhibitions"),
    });
  }
  parts.push({ text: t.ticker.available(available), to: href(locale, "gallery") });
  parts.push({ text: t.ticker.inspired, to: href(locale, "gallery") });
  if (parts.length === 0) return null;

  const group = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined}>
      {parts.map((p, i) => (
        <span key={i} style={{ display: "inline-flex", gap: 48 }}>
          <Link href={p.to} tabIndex={hidden ? -1 : undefined}>
            {p.text}
          </Link>
          <span aria-hidden="true">—</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="ticker" role="region" aria-label={locale === "fr" ? "Actualité" : "News"}>
      <div className="ticker__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
