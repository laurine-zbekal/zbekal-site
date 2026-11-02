import { artworks, type Artwork, type CollectionSlug } from "@/content/oeuvres";
import { collections, type Collection } from "@/content/collections";
import { exhibitions } from "@/content/expositions";
import type { Locale } from "@/content/ui";
import { ui } from "@/content/ui";

export function allArtworks(): Artwork[] {
  return artworks;
}

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function artworksOf(collection: CollectionSlug): Artwork[] {
  return artworks.filter((a) => a.collection === collection);
}

export function availableArtworks(): Artwork[] {
  return artworks.filter((a) => a.status === "disponible");
}

export function featuredArtworks(max = 6): Artwork[] {
  const featured = artworks.filter((a) => a.featured && a.status === "disponible");
  const rest = artworks.filter((a) => !featured.includes(a) && a.status === "disponible");
  return [...featured, ...rest].slice(0, max);
}

/** Collections qui contiennent au moins une toile, dans l'ordre du fichier collections.ts */
export function collectionsWithWorks(): Collection[] {
  return collections.filter((c) => artworks.some((a) => a.collection === c.slug));
}

export function upcomingExhibition() {
  return exhibitions.find((e) => e.upcoming);
}

/** Titre affiché : titre original, et sa traduction en sous-titre pour l'anglais. */
export function titleOf(a: Artwork, locale: Locale): { title: string; subtitle?: string } {
  if (locale === "en" && a.titleEn) return { title: a.title, subtitle: a.titleEn };
  return { title: a.title };
}

export function dimensionsLabel(a: Artwork, locale: Locale): string {
  const t = ui[locale].work;
  const base = `${a.width} × ${a.height} cm`;
  if (a.panels === 3) return `${t.triptych} · ${base}`;
  if (a.panels === 4) return `${t.quadriptych} · ${base}`;
  if (a.panels && a.panels > 1) return `${t.panels(a.panels)} · ${base}`;
  return base;
}

export function priceLabel(a: Artwork, locale: Locale): string {
  if (a.price == null) return ui[locale].work.priceOnRequest;
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(a.price);
}

/** Ligne technique : « Acrylique sur toile · 80 × 80 cm · 2026 » */
export function specLine(a: Artwork, locale: Locale): string {
  const parts = [a.technique[locale], dimensionsLabel(a, locale)];
  if (a.year) parts.push(String(a.year));
  return parts.join(" · ");
}

export function mainImage(a: Artwork): string | undefined {
  return a.images[0];
}

/** Ratio largeur/hauteur de la toile, pour réserver l'espace des images. */
export function aspectRatio(a: Artwork): string {
  return `${a.width} / ${a.height}`;
}
