/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TARIFS DES COMMANDES — la grille de la page « Tarifs 2026 »
 * ──────────────────────────────────────────────────────────────────────────
 *  Pour changer un prix : modifie `price` (euros TTC). Pour ajouter un format : copie une ligne.
 *  Cinq formats, du S (le plus petit que Laurine peint en commande) au XXL : 130 cm de côté au maximum.
 *  Les formats S, M et L sont ceux de Laurine (publication de novembre 2025, confirmés en nov. 2026).
 *  Les prix XL et XXL sont DÉDUITS de ces trois-là : on prolonge l’écart M → L,
 *  soit 50 € pour 30 cm de plus (hauteur + largeur), environ 1,67 € par cm.
 *  Ils sont à valider par Laurine avant la mise en ligne.
 *  L’année affichée partout sur la page est `year`.
 */
import type { Locale } from "./ui";

type L<T = string> = Record<Locale, T>;

export type PriceFormat = {
  /** Largeur et hauteur en cm */
  w: number;
  h: number;
  /** Prix en euros TTC */
  price: number;
  /** Petit nom du format (optionnel) */
  tag?: string;
  /** true = format phare (S, M, L) */
  star?: boolean;
  /** Couleur de la toile dessinée sur la carte (palette Amazoni) */
  color: string;
};

export const tarifs = {
  year: 2026,

  /** Photo du haut de page */
  heroPhoto: {
    src: "/atelier/pinceau-chevalet.jpg",
    w: 1014,
    h: 1531,
    alt: {
      fr: "Laurine Girard, pinceau et palette à la main, accoudée à une toile vierge sur son chevalet",
      en: "Laurine Girard, brush and palette in hand, leaning on a blank canvas on her easel",
    } as L,
    caption: { fr: "Ta toile commence ici", en: "Your painting starts here" } as L,
  },

  formats: [
    { w: 60, h: 70, price: 220, tag: "S", star: true, color: "#D6336C" },
    { w: 80, h: 90, price: 250, tag: "M", star: true, color: "#1B4D3E" },
    { w: 100, h: 100, price: 300, tag: "L", star: true, color: "#D1232A" },
    { w: 100, h: 120, price: 335, tag: "XL", color: "#F6C945" },
    { w: 130, h: 130, price: 400, tag: "XXL", color: "#2041B5" },
  ] as PriceFormat[],

  kicker: { fr: "Toiles sur commande", en: "Commissioned paintings" } as L,
  lead: {
    fr: "Une toile peinte pour toi, à partir de ton idée, de tes couleurs, de ton mur. Voici mes prix par format : clairs, et volontairement doux.",
    en: "A painting made for you, from your idea, your colours, your wall. Here are my prices by size: clear, and deliberately gentle.",
  } as L,
  gridTitle: { fr: "Cinq formats, cinq prix", en: "Five sizes, five prices" } as L,
  gridLead: {
    fr: "Du S, le plus petit format que je peins, au XXL de 130 cm de côté, le plus grand. Les toiles sont dessinées à la même échelle : tu vois tout de suite ce que change un format.",
    en: "From S, the smallest size I paint, to XXL at 130 cm a side, the largest. The canvases are drawn to the same scale, so you can see at a glance what each size changes.",
  } as L,
  starLabel: { fr: "Format", en: "Size" } as L,
  custom: {
    fr: "Un format entre deux, un diptyque, un triptyque ? Je te fais un devis, de 60 × 70 cm à 130 cm de côté.",
    en: "A size in between, a diptych, a triptych? I’ll send you a quote, from 60 × 70 cm up to 130 cm a side.",
  } as L,
  legal: {
    fr: "Prix en euros, TTC. TVA non applicable, art. 293 B du CGI. Les toiles disponibles de la galerie ont leur propre prix, sur demande.",
    en: "Prices in euros, all taxes included. VAT not applicable, art. 293 B of the French General Tax Code. Available paintings in the gallery have their own price, on request.",
  } as L,

  includedTitle: { fr: "Ce que le prix comprend", en: "What the price includes" } as L,
  included: {
    fr: [
      "La toile sur châssis et toute la matière : acrylique, médiums, feuille d’or, perles.",
      "Les heures de création, du premier trait à la signature.",
      "Nos échanges, l’esquisse et une photo de la toile en cours : tu valides avant la fin.",
      "Le certificat d’authenticité, signé.",
    ],
    en: [
      "The stretched canvas and all the materials: acrylic, mediums, gold leaf, beads.",
      "The hours of creation, from the first line to the signature.",
      "Our conversations, the sketch and a photo of the work in progress: you approve before the end.",
      "The signed certificate of authenticity.",
    ],
  } as L<string[]>,
  notIncluded: {
    fr: "En plus : l’envoi, si la toile voyage. La remise en main propre est possible.",
    en: "Extra: shipping, if the painting travels. Collection in person is possible.",
  } as L,

  whyTitle: { fr: ["Des prix d’artiste,", "en début de carrière."], en: ["An artist’s prices,", "early in her career."] } as L<[string, string]>,
  why: {
    fr: [
      "Le prix d’une toile ne se calcule pas comme celui d’un objet. Il dépend du format, du temps passé et de la matière, mais aussi du parcours de l’artiste : ses expositions, ses prix, les personnes qui vivent déjà avec ses toiles. C’est ce qu’on appelle la cote.",
      "La mienne commence. J’ai peint ma première toile en 2020, exposé à Paris en 2022, reçu le prix du public à Jallais en 2023. Mes tarifs sont donc ceux d’une artiste en début de carrière : je préfère voir mes toiles vivre chez toi plutôt qu’attendre à l’atelier.",
      "Ils évolueront avec mon parcours, comme pour tout artiste. Une toile commandée cette année l’est au tarif 2026.",
    ],
    en: [
      "The price of a painting isn’t worked out like that of an object. It depends on the size, the time spent and the materials, but also on the artist’s journey: her exhibitions, her awards, the people who already live with her paintings. That’s what makes an artist’s standing.",
      "Mine is just beginning. I painted my first canvas in 2020, exhibited in Paris in 2022, received the audience award in Jallais in 2023. So my prices are those of an artist early in her career: I’d rather see my paintings live in your home than wait in the studio.",
      "They will grow with my journey, as they do for every artist. A painting commissioned this year is at the 2026 price.",
    ],
  } as L<string[]>,
  varyTitle: { fr: "Ce qui peut faire varier le prix", en: "What can change the price" } as L,
  vary: {
    fr: "Un sujet très détaillé (un portrait, un animal), beaucoup de feuille d’or ou de perles, un format hors grille : dans ces cas-là, je te fais un devis avant de commencer.",
    en: "A very detailed subject (a portrait, an animal), a lot of gold leaf or beads, a size outside the grid: in those cases, I send you a quote before I start.",
  } as L,

  stepsTitle: { fr: "Comment ça se passe", en: "How it works" } as L,
  steps: {
    fr: [
      { title: "Tu m’écris", text: "Ton idée, ton format, tes couleurs, la pièce où elle sera accrochée." },
      { title: "Je te fais un devis", text: "Un acompte de 30 % lance la commande." },
      { title: "Je peins", text: "Tu reçois une photo de la toile en cours, pour valider avant la fin." },
      { title: "Elle arrive chez toi", text: "Remise en main propre ou envoi soigné, avec son certificat." },
    ],
    en: [
      { title: "You write to me", text: "Your idea, your size, your colours, the room where it will hang." },
      { title: "I send you a quote", text: "A 30% deposit starts the commission." },
      { title: "I paint", text: "You receive a photo of the work in progress, to approve before the end." },
      { title: "It arrives at your home", text: "Hand delivery or careful shipping, with its certificate." },
    ],
  } as L<{ title: string; text: string }[]>,

  ctaTitle: { fr: "Une idée de toile ?", en: "An idea for a painting?" } as L,
  ctaText: {
    fr: "Raconte-moi : je te réponds sous 48 h, avec une proposition.",
    en: "Tell me about it: I reply within 48 hours, with a proposal.",
  } as L,
};
