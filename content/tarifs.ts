/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TARIFS DES COMMANDES — la grille de la page « Tarifs 2026 »
 * ──────────────────────────────────────────────────────────────────────────
 *  Pour changer un prix : modifie `price` (euros TTC). Pour ajouter un format : copie une ligne.
 *  Trois formats à prix fixe : S (le plus petit que Laurine peint en commande), M et L.
 *  Tout le reste (plus grand, jusqu’à 130 cm de côté, entre deux formats, diptyque…) est sur devis.
 *  Ces trois formats servent aussi à la page « Carte cadeau » (content/carte-cadeau.ts).
 *  `hours` = heures de travail par format, affichées dans le bloc « Pourquoi mes toiles coûtent plus cher… » (plus bas).
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
  /** Heures de travail, en moyenne (carte « Le temps » du bloc « pourquoi ») */
  hours?: number;
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
    { w: 60, h: 70, price: 400, hours: 10, tag: "S", star: true, color: "#D6336C" },
    { w: 80, h: 90, price: 500, hours: 13, tag: "M", star: true, color: "#1B4D3E" },
    { w: 100, h: 100, price: 600, hours: 15, tag: "L", star: true, color: "#D1232A" },
  ] as PriceFormat[],

  kicker: { fr: "Toiles sur commande", en: "Commissioned paintings" } as L,
  lead: {
    fr: "Une toile peinte pour toi, à partir de ton idée, de tes couleurs, de ton mur. Voici mes prix par format.",
    en: "A painting made for you, from your idea, your colours, your wall. Here are my prices by size.",
  } as L,
  gridTitle: { fr: "Trois formats, trois prix", en: "Three sizes, three prices" } as L,
  gridLead: {
    fr: "Du S, le plus petit format que je peins, au L d’un mètre de côté. Les toiles sont dessinées à la même échelle : tu vois tout de suite ce que change un format.",
    en: "From S, the smallest size I paint, to L at one metre a side. The canvases are drawn to the same scale, so you can see at a glance what each size changes.",
  } as L,
  starLabel: { fr: "Format", en: "Size" } as L,
  custom: {
    fr: "Plus grand, un format entre deux, un diptyque, un triptyque ? C’est sur devis, jusqu’à 130 cm de côté.",
    en: "Larger, a size in between, a diptych, a triptych? That’s on quote, up to 130 cm a side.",
  } as L,
  legal: {
    fr: "Prix en euros, TTC. TVA non applicable, art. 293 B du CGI. Les toiles disponibles de la galerie ont leur propre prix, indiqué sur leur fiche ou donné sur demande.",
    en: "Prices in euros, all taxes included. VAT not applicable, art. 293 B of the French General Tax Code. Available paintings in the gallery have their own price, shown on their page or given on request.",
  } as L,

  /** Deux rappels pratiques, affichés sous la grille */
  vary: {
    fr: "Un sujet très détaillé (un portrait, un animal), beaucoup de feuille d’or ou de perles : je te fais un devis avant de commencer.",
    en: "A very detailed subject (a portrait, an animal), a lot of gold leaf or beads: I send you a quote before I start.",
  } as L,
  notIncluded: {
    fr: "En plus : l’envoi, si la toile voyage. La remise en main propre est possible.",
    en: "Extra: shipping, if the painting travels. Collection in person is possible.",
  } as L,

  /**
   * Bloc « Pourquoi mes toiles coûtent plus cher qu’un tableau déco ? » : cinq cartes de couleur.
   * Chaque carte : un thème, un mot-clé en grand, la phrase de Laurine, et ce qui se passe « en enseigne de déco ».
   * Le mot-clé de la carte « time » se calcule tout seul à partir des `hours` des formats (plus haut).
   * Ne pas changer les `key` : les couleurs et la mise en page en dépendent.
   */
  pourquoi: {
    badge: { fr: "La question qu’on me pose", en: "The question I get asked" } as L,
    title: {
      fr: ["Pourquoi mes toiles coûtent plus cher", "qu’un tableau déco ?"],
      en: ["Why do my paintings cost more", "than a décor-store print?"],
    } as L<[string, string]>,
    lead: {
      fr: "En magasin de déco, un tableau coûte bien moins cher que les miens. C’est normal : ce n’est pas le même objet. La différence tient en cinq points.",
      en: "In a home décor store, a picture costs far less than mine. That’s normal: it isn’t the same object. The difference comes down to five points.",
    } as L,
    storeLabel: { fr: "En enseigne de déco", en: "In a décor store" } as L,
    hoursKeyword: {
      fr: (min: number, max: number) => (min === max ? `${min} heures` : `${min} à ${max} heures`),
      en: (min: number, max: number) => (min === max ? `${min} hours` : `${min} to ${max} hours`),
    },
    hoursLabel: { fr: "Format", en: "Size" } as L,
    cards: [
      {
        key: "unique",
        theme: { fr: "La rareté", en: "Rarity" },
        keyword: { fr: "Unique", en: "Unique" },
        text: {
          fr: "Chaque toile est différente et authentique. Je ne peins jamais deux fois la même.",
          en: "Every painting is different and authentic. I never paint the same one twice.",
        },
        store: { fr: "Une image imprimée à des milliers d’exemplaires.", en: "An image printed in thousands of copies." },
      },
      {
        key: "time",
        theme: { fr: "Le temps", en: "Time" },
        keyword: { fr: "", en: "" },
        text: {
          fr: "C’est le temps que je passe sur une toile, selon son format. Et derrière chaque geste, il y a tout ce que j’ai appris depuis ma première toile, en 2020.",
          en: "That’s the time I spend on a painting, depending on its size. And behind every gesture is everything I’ve learned since my first canvas, in 2020.",
        },
        store: { fr: "Quelques minutes d’impression.", en: "A few minutes of printing." },
      },
      {
        key: "relief",
        theme: { fr: "La matière", en: "Texture" },
        keyword: { fr: "Du relief", en: "Relief" },
        text: {
          fr: "De l’acrylique posée en épaisseur, de la feuille d’or, des perles. La lumière s’y accroche : la toile n’est pas la même le matin et le soir.",
          en: "Thickly laid acrylic, gold leaf, beads. Light catches on it: the painting isn’t the same in the morning and in the evening.",
        },
        store: { fr: "Une image à plat.", en: "A flat image." },
      },
      {
        key: "studio",
        theme: { fr: "Ce que le prix paie", en: "What the price pays for" },
        keyword: { fr: "Un atelier", en: "A studio" },
        text: {
          fr: "Avant de me payer, le prix d’une toile règle tout ça :",
          en: "Before it pays me, the price of a painting covers all of this:",
        },
        store: { fr: "Des coûts divisés par des milliers de ventes.", en: "Costs spread over thousands of sales." },
      },
      {
        key: "signed",
        theme: { fr: "La signature", en: "The signature" },
        keyword: { fr: "Signée", en: "Signed" },
        text: {
          fr: "Chaque toile part signée, avec son certificat d’authenticité. Elle a une histoire, une collection, parfois une distinction. Elle se garde et se transmet.",
          en: "Every painting leaves signed, with its certificate of authenticity. It has a story, a collection, sometimes an award. It’s made to be kept and passed on.",
        },
        store: { fr: "Un article de catalogue.", en: "A catalogue item." },
      },
    ] as { key: "unique" | "time" | "relief" | "studio" | "signed"; theme: L; keyword: L; text: L; store: L }[],
    /** Carte « studio » : les charges, dans l’ordre, puis ce qui reste */
    charges: {
      fr: ["Galerie, quand il y en a une", "Peinture, feuille d’or, perles", "Châssis", "Pinceaux et matériel", "Emballage", "Loyer de l’atelier", "Assurance", "Site web", "Cotisations sociales"],
      en: ["Gallery, when there is one", "Paint, gold leaf, beads", "Stretched canvas", "Brushes and tools", "Packaging", "Studio rent", "Insurance", "Website", "Social contributions"],
    } as L<string[]>,
    rest: { fr: "Ce qui reste : ma paie", en: "What’s left: my pay" } as L,
    endTitle: { fr: "Une question sur un prix, un format, une commande ?", en: "A question about a price, a size, a commission?" } as L,
    endText: { fr: "Écris-moi, c’est moi qui te réponds.", en: "Write to me, I’m the one who answers." } as L,
  },

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
