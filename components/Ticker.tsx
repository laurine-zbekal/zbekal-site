import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { upcomingExhibition } from "@/lib/content";

/** Le message est répété pour remplir toute la largeur de l’écran pendant le défilement. */
const REPEAT = 4;

/** Bandeau défilant en haut de page : uniquement la prochaine exposition (rien s’il n’y en a pas). */
export function Ticker({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const expo = upcomingExhibition();
  if (!expo) return null;
  const text = `${t.ticker.upcoming} · ${expo.title[locale]} · ${expo.date[locale]}${expo.details ? ` · ${expo.details[locale]}` : ""}`;
  const to = href(locale, "exhibitions");

  // Seule la première occurrence est lue par les lecteurs d’écran et atteignable au clavier.
  const group = (copy: boolean) => (
    <span aria-hidden={copy || undefined}>
      {Array.from({ length: REPEAT }).map((_, i) => {
        const mute = copy || i > 0;
        return (
          <span key={i} aria-hidden={mute && !copy ? true : undefined}>
            <Link href={to} tabIndex={mute ? -1 : undefined}>
              {text}
            </Link>
            <span aria-hidden="true">—</span>
          </span>
        );
      })}
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
