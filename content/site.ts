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

  /**
   * Marque verbale ZBEKAL déposée à l’INPI le 26 novembre 2026 au nom de Laurine GIRARD
   * (demande n° 5325207, classes 16 et 41). Le petit ® s’affiche à côté du nom dans l’en-tête et le pied de page.
   */
  trademark: {
    number: "5325207",
    notice: {
      fr: "Zbekal® est une marque déposée de Laurine GIRARD.",
      en: "Zbekal® is a trademark filed by Laurine GIRARD with the INPI (French Intellectual Property Office).",
    },
  },

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
    address: "101 2nd Street, San Francisco, CA 94105, États-Unis",
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
   * Mesure d’audience : identifiant de mesure Google Analytics 4 (de la forme « G-XXXXXXXXXX », ce n’est pas un secret).
   * Vide      = pas de Google Analytics, pas de bandeau cookies ; la page Confidentialité dit qu’aucun cookie de suivi n’est déposé.
   * Renseigné = le bandeau cookies s’affiche ; Google Analytics n’est chargé qu’après un clic sur « Accepter »
   *             (components/CookieConsent.tsx), et la page Confidentialité décrit la mesure d’audience.
   * Propriété « zbekal.com » du compte Google Analytics « Zbekal », créé le 19 novembre 2026 sur le compte Google laurine@zbekal.com.
   */
  analytics: { gaId: (process.env.NEXT_PUBLIC_GA_ID ?? "G-SQZV8JB60C").trim() },

  /** Année de création du site, pour le copyright */
  since: 2026,
} as const;

export function locationLabel(locale: "fr" | "en"): string {
  const base = site.city ? `${site.city}, ${site.region}` : site.region;
  return locale === "fr" ? base : base;
}
