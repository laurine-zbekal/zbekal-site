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

/** Toiles parties chez leurs propriétaires : elles peuvent inspirer une création sur commande. */
export function onOrderArtworks(): Artwork[] {
  return artworks.filter((a) => a.status === "sur-commande");
}

/** Toiles disponibles, celles marquées `featured` en premier. */
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

/** Vrai quand largeur et hauteur de la toile sont connues. */
export function hasDimensions(a: Artwork): a is Artwork & { width: number; height: number } {
  return typeof a.width === "number" && typeof a.height === "number";
}

/** Titre affiché : titre original, et sa traduction en sous-titre pour l'anglais. */
export function titleOf(a: Artwork, locale: Locale): { title: string; subtitle?: string } {
  if (locale === "en" && a.titleEn) return { title: a.title, subtitle: a.titleEn };
  return { title: a.title };
}

/** Format affiché : le texte `size` s’il existe, sinon largeur × hauteur. Vide si rien n’est connu. */
export function dimensionsLabel(a: Artwork, locale: Locale): string | undefined {
  const t = ui[locale].work;
  if (a.size) return a.size[locale];
  const panels = a.panels === 3 ? t.triptych : a.panels === 4 ? t.quadriptych : a.panels && a.panels > 1 ? t.panels(a.panels) : undefined;
  if (!hasDimensions(a)) return panels;
  const base = `${a.width} × ${a.height} cm`;
  return panels ? `${panels} · ${base}` : base;
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
  const parts = [a.technique[locale], dimensionsLabel(a, locale), a.year ? String(a.year) : undefined];
  return parts.filter(Boolean).join(" · ");
}

export function mainImage(a: Artwork): string | undefined {
  return a.images[0];
}

/** Proportions de la vignette : `frame` si renseigné, sinon celles de la toile, sinon 4 / 5. */
export function aspectRatio(a: Artwork): string {
  if (a.frame) return a.frame;
  if (hasDimensions(a)) return `${a.width} / ${a.height}`;
  return "4 / 5";
}
