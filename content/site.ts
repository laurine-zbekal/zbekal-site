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
  tagline: { fr: "Des toiles qu’on a envie de toucher", en: "Paintings you’ll want to touch" },

  /** Adresse publique du site (sans / final). zbekal.fr redirige vers zbekal.com. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zbekal.com").replace(/\/$/, ""),

  /** E-mail affiché partout sur le site. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "laurine@zbekal.com",

  instagram: { handle: "zbekal", url: "https://www.instagram.com/zbekal" },

  /** Localisation affichée. Renseigne `city` pour l’afficher (SEO local). */
  region: "Maine-et-Loire",
  department: "49",
  city: "Chalonnes-sur-Loire",
  country: { fr: "France", en: "France" },

  /** Mentions légales — à compléter avant la mise en ligne. */
  legal: {
    status: {
      fr: "Entrepreneure individuelle · Création artistique relevant des arts plastiques",
      en: "Sole trader · Artistic creation in the visual arts (France)",
    },
    siret: "992 072 728 00015",
    address: "49290 Chalonnes-sur-Loire", // ville seule pour l’instant : l’adresse complète est en principe obligatoire (à valider)
    vat: {
      fr: "TVA non applicable, art. 293 B du CGI",
      en: "VAT not applicable, art. 293 B of the French General Tax Code",
    },
  },

  /** Hébergeur du site (repris dans les mentions légales et la politique de confidentialité). */
  host: {
    name: "Netlify, Inc.",
    address: "San Francisco, Californie, États-Unis",
    url: "https://www.netlify.com",
  },

  /**
   * Afficher les prix sur le site ?
   * true  = les toiles de la galerie affichent « Prix sur demande » (ou leur prix, si `price` est rempli
   *         dans oeuvres.ts), et les formats de commande affichent leur tarif.
   * false = aucun prix nulle part.
   */
  showPrices: true,

  /**
   * Paillettes dorées du logo pour les fêtes (écran d’ouverture et logo du menu).
   * Elles s’affichent jusqu’à cette date (non comprise), puis disparaissent toutes seules.
   * Pour les arrêter tout de suite : mettre "". Pour l’an prochain : mettre par exemple "2028-01-07".
   */
  festiveUntil: "2027-01-07",

  /** Année de création du site, pour le copyright */
  since: 2026,
} as const;

export function locationLabel(locale: "fr" | "en"): string {
  const base = site.city ? `${site.city}, ${site.region}` : site.region;
  return locale === "fr" ? base : base;
}
