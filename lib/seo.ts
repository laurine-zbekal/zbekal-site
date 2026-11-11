import type { Metadata } from "next";
import { site, locationLabel } from "@/content/site";
import type { Artwork } from "@/content/oeuvres";
import type { Locale } from "@/content/ui";
import { alternates, href, type RouteKey } from "./routes";
import { getCollection } from "@/content/collections";
import { dimensionsLabel, hasDimensions, titleOf } from "./content";

const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_GB" };

type PageMeta = {
  locale: Locale;
  key: RouteKey;
  slug?: string;
  /** Titre de l'onglet ; { absolute } pour ignorer le gabarit « %s · Zbekal » */
  title: string | { absolute: string };
  description: string;
  /** Chemin d'une image de partage dans public/ (1200 × 630) */
  image?: string;
  noIndex?: boolean;
};

/** Construit les métadonnées d'une page : titre, description, canonical, hreflang, Open Graph. */
export function pageMetadata(m: PageMeta): Metadata {
  const alt = alternates(m.key, m.slug);
  const canonical = href(m.locale, m.key, m.slug);
  const image = m.image ?? "/og/default.jpg";
  const plainTitle = typeof m.title === "string" ? m.title : m.title.absolute;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical,
      languages: { fr: alt.fr, en: alt.en, "x-default": alt.fr },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[m.locale],
      alternateLocale: [ogLocale[m.locale === "fr" ? "en" : "fr"]],
      url: canonical,
      title: plainTitle,
      description: m.description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: plainTitle, description: m.description, images: [image] },
    robots: m.noIndex ? { index: false, follow: true } : undefined,
  };
}

export function absolute(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.url}${path}`;
}

/** Schema.org Person : l'artiste. */
export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.artist,
    alternateName: site.name,
    jobTitle: site.job[locale],
    description: site.tagline[locale],
    url: absolute(href(locale, "home")),
    image: absolute("/og/demarche.jpg"),
    email: `mailto:${site.email}`,
    sameAs: [site.instagram.url],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city || undefined,
      addressRegion: site.region,
      addressCountry: "FR",
    },
    knowsAbout: locale === "fr" ? ["Peinture acrylique", "Peinture en relief", "Art contemporain"] : ["Acrylic painting", "Textured painting", "Contemporary art"],
    homeLocation: { "@type": "Place", name: locationLabel(locale) },
  };
}

/** Schema.org VisualArtwork : une toile. */
export function artworkJsonLd(a: Artwork, locale: Locale) {
  const { title } = titleOf(a, locale);
  const url = absolute(href(locale, "artwork", a.slug));
  const availability: Record<Artwork["status"], string> = {
    disponible: "https://schema.org/InStock",
    "sur-commande": "https://schema.org/MadeToOrder",
    vendue: "https://schema.org/SoldOut",
    reservee: "https://schema.org/LimitedAvailability",
  };
  const dims = dimensionsLabel(a, locale);
  const sized = hasDimensions(a) ? a : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "@id": `${url}#artwork`,
    name: title,
    alternateName: locale === "en" ? a.titleEn : undefined,
    url,
    inLanguage: locale,
    image: a.images.length ? a.images.map(absolute) : undefined,
    description: a.description?.[locale],
    creator: { "@id": `${site.url}/#person` },
    artform: locale === "fr" ? "Peinture" : "Painting",
    artMedium: a.technique[locale],
    artworkSurface: locale === "fr" ? "Toile" : "Canvas",
    dateCreated: a.year ? String(a.year) : undefined,
    width: sized ? { "@type": "QuantitativeValue", value: sized.width, unitCode: "CMT" } : undefined,
    height: sized ? { "@type": "QuantitativeValue", value: sized.height, unitCode: "CMT" } : undefined,
    award: a.award?.[locale],
    isPartOf: { "@type": "CreativeWorkSeries", name: getCollection(a.collection)?.title[locale] },
    offers:
      a.price != null
        ? {
            "@type": "Offer",
            price: a.price,
            priceCurrency: "EUR",
            availability: availability[a.status],
            url: absolute(href(locale, "contact")),
            seller: { "@id": `${site.url}/#person` },
          }
        : { "@type": "Offer", availability: availability[a.status], url: absolute(href(locale, "contact")), priceCurrency: "EUR" },
    additionalProperty: dims ? [{ "@type": "PropertyValue", name: "dimensions", value: dims }] : undefined,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: absolute(href(locale, "home")),
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#person` },
  };
}
