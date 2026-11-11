import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/content/oeuvres";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { aspectRatio, priceLabel, specLine, titleOf } from "@/lib/content";

export function StatusBadge({ status, locale }: { status: Artwork["status"]; locale: Locale }) {
  const t = ui[locale];
  const cls = status === "disponible" ? "badge--green" : status === "sur-commande" ? "badge--order" : status === "reservee" ? "badge--yellow" : "badge--grey";
  return <span className={`badge ${cls}`}>{t.status[status]}</span>;
}

export function ArtworkPlaceholder({ artwork, locale }: { artwork: Artwork; locale: Locale }) {
  const t = ui[locale];
  if (artwork.panels && artwork.panels > 1) {
    return (
      <span className="placeholder placeholder--panels" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${artwork.panels}, minmax(0, 1fr))` }}>
        {Array.from({ length: artwork.panels }).map((_, i) => (
          <span key={i}>{i === 0 ? t.work.photoSoon : ""}</span>
        ))}
      </span>
    );
  }
  return (
    <span className="placeholder" aria-hidden="true">
      {t.work.photoSoon}
    </span>
  );
}

export function ArtworkCard({
  artwork,
  locale,
  priority = false,
  sizes = "(min-width: 1240px) 380px, (min-width: 720px) 45vw, 100vw",
  className = "",
  lead = false,
  mini = false,
}: {
  artwork: Artwork;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
  /** Classes supplémentaires (mise en page) */
  className?: string;
  /** Carte vedette : grand titre et bouton d’appel */
  lead?: boolean;
  /** Petite carte : image, statut, titre et une ligne d’appel */
  mini?: boolean;
}) {
  const t = ui[locale];
  const { title, subtitle } = titleOf(artwork, locale);
  const main = artwork.images[0];
  const sold = artwork.status === "vendue";
  const onOrder = artwork.status === "sur-commande";
  return (
    <Link href={href(locale, "artwork", artwork.slug)} className={`card card--bordered${sold ? " card__sold" : ""}${lead ? " card--lead" : ""}${mini ? " card--mini" : ""}${className ? ` ${className}` : ""}`}>
      <span className="card__img" style={{ aspectRatio: aspectRatio(artwork) }}>
        {main ? (
          <Image src={main} alt={artwork.alt[locale]} fill sizes={sizes} priority={priority} quality={75} style={{ objectFit: "cover" }} />
        ) : (
          <ArtworkPlaceholder artwork={artwork} locale={locale} />
        )}
      </span>
      <span className="card__body">
        <span>
          <StatusBadge status={artwork.status} locale={locale} />
        </span>
        <span className="card__title">
          {title}
          {subtitle ? <span className="muted" style={{ fontWeight: 500, fontSize: 15, display: "block" }}>{subtitle}</span> : null}
        </span>
        {mini ? null : <span className="card__sub">{specLine(artwork, locale)}</span>}
        {mini ? (
          <span className="card__foot">{sold ? <span>{t.status.vendue}</span> : <span className="accent">{onOrder ? t.work.crush : t.cta.wantIt} →</span>}</span>
        ) : (
          <span className="card__foot">
            <span>{sold ? t.status.vendue : onOrder ? t.work.adopted : priceLabel(artwork, locale)}</span>
            {sold ? null : onOrder ? (
              <span className="accent">{t.work.crush} →</span>
            ) : lead ? (
              <span className="btn btn--pink btn--sm">{t.cta.wantIt} →</span>
            ) : (
              <span className="accent">{t.cta.wantIt} →</span>
            )}
          </span>
        )}
      </span>
    </Link>
  );
}
