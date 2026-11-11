import type { Locale } from "@/content/ui";

/**
 * Routes localisées. Le français vit à la racine (/galerie), l'anglais sous /en (/en/gallery).
 * Les slugs des toiles et des collections sont communs aux deux langues.
 */
export type RouteKey =
  | "home"
  | "gallery"
  | "collection"
  | "artwork"
  | "about"
  | "exhibitions"
  | "contact"
  | "legal"
  | "privacy"
  | "terms";

const table: Record<RouteKey, Record<Locale, string>> = {
  home: { fr: "/", en: "/en" },
  gallery: { fr: "/galerie", en: "/en/gallery" },
  collection: { fr: "/collection", en: "/en/collection" },
  artwork: { fr: "/oeuvre", en: "/en/artwork" },
  about: { fr: "/demarche", en: "/en/about" },
  exhibitions: { fr: "/expositions", en: "/en/exhibitions" },
  contact: { fr: "/contact", en: "/en/contact" },
  legal: { fr: "/mentions-legales", en: "/en/legal-notice" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
  terms: { fr: "/cgv", en: "/en/terms" },
};

/** Chemin d'une page dans une langue, avec un slug optionnel (toile, collection). */
export function href(locale: Locale, key: RouteKey, slug?: string): string {
  const base = table[key][locale];
  return slug ? `${base}/${slug}` : base;
}

/** Filtres de la page « Toiles », tels qu'ils apparaissent dans l'adresse : /galerie?filtre=disponibles, /en/gallery?filter=available */
export type GalleryFilter = "available" | "order" | "sold";
export const galleryFilterParam: Record<Locale, { key: string; values: Record<GalleryFilter, string> }> = {
  fr: { key: "filtre", values: { available: "disponibles", order: "sur-commande", sold: "vendues" } },
  en: { key: "filter", values: { available: "available", order: "made-to-order", sold: "sold" } },
};

/** Lien vers la page « Toiles » avec un filtre de disponibilité déjà appliqué. */
export function galleryHref(locale: Locale, filter: GalleryFilter): string {
  const p = galleryFilterParam[locale];
  return `${href(locale, "gallery")}?${p.key}=${p.values[filter]}`;
}

/** Les deux versions d'une même page (pour hreflang et le sélecteur de langue). */
export function alternates(key: RouteKey, slug?: string): Record<Locale, string> {
  return { fr: href("fr", key, slug), en: href("en", key, slug) };
}

/** Retrouve la clé de route et le slug à partir d'un chemin, dans une langue donnée. */
export function matchPath(pathname: string): { locale: Locale; key: RouteKey; slug?: string } | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const locales: Locale[] = ["fr", "en"];
  for (const locale of locales) {
    for (const key of Object.keys(table) as RouteKey[]) {
      const base = table[key][locale];
      if (clean === base) return { locale, key };
      if ((key === "artwork" || key === "collection") && clean.startsWith(base + "/")) {
        const slug = clean.slice(base.length + 1);
        if (slug && !slug.includes("/")) return { locale, key, slug };
      }
    }
  }
  return null;
}

/** Chemin équivalent dans l'autre langue (sélecteur de langue). */
export function alternatePath(pathname: string, target: Locale): string {
  const m = matchPath(pathname);
  if (!m) return href(target, "home");
  return href(target, m.key, m.slug);
}
