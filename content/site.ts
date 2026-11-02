/**
 * Informations générales du site. C’est ici que l’on change l’adresse e-mail,
 * la ville affichée, le SIRET, etc.
 */
export const site = {
  name: "Zbekal",
  artist: "Laurine Girard",
  /** Métier affiché à côté du nom */
  job: { fr: "Artiste peintre", en: "Painter" },
  /** Phrase d’accroche (titre de la page d’accueil, partages) */
  tagline: { fr: "Des jungles qui ont du relief", en: "Jungles with relief" },

  /** Adresse publique du site (sans / final). Sur Vercel, définis NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zbekal.fr").replace(/\/$/, ""),

  /** E-mail affiché sur le site. Passe à contact@zbekal.fr une fois la boîte créée. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "lauriine.grdd@gmail.com",

  instagram: { handle: "zbekal", url: "https://www.instagram.com/zbekal" },

  /** Localisation affichée. Renseigne `city` pour l’afficher (SEO local). */
  region: "Maine-et-Loire",
  department: "49",
  city: "",
  country: { fr: "France", en: "France" },

  /** Mentions légales — à compléter avant la mise en ligne. */
  legal: {
    status: {
      fr: "Entrepreneure individuelle, artiste-auteur",
      en: "Sole trader (artist-author status, France)",
    },
    siret: "", // ex. "123 456 789 00012"
    address: "", // adresse postale complète (obligatoire pour une entreprise individuelle)
    vat: {
      fr: "TVA non applicable, art. 293 B du CGI",
      en: "VAT not applicable, art. 293 B of the French General Tax Code",
    },
  },

  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    url: "https://vercel.com",
  },

  /** Année de création du site, pour le copyright */
  since: 2026,
} as const;

export function locationLabel(locale: "fr" | "en"): string {
  const base = site.city ? `${site.city}, ${site.region}` : site.region;
  return locale === "fr" ? base : base;
}
