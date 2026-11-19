/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CARTE CADEAU — la page « Carte cadeau » et le bloc de la page d’accueil
 * ──────────────────────────────────────────────────────────────────────────
 *  La carte donne droit à une toile sur commande au format offert (S, M ou L), sans date limite.
 *  Les formats et les prix ne sont PAS ici : ils viennent de content/tarifs.ts (un seul endroit à modifier).
 *  Les photos sont dans public/carte-cadeau/ : pour en changer, remplace le fichier en gardant son nom.
 *  Sur la photo du dos de la carte, le numéro de portable imprimé a été effacé (il n’est affiché nulle part sur le site).
 */
import type { Locale } from "./ui";

type L<T = string> = Record<Locale, T>;

export const carteCadeau = {
  photos: {
    recto: {
      src: "/carte-cadeau/recto.jpg",
      w: 1200,
      h: 1600,
      alt: {
        fr: "La carte cadeau Zbekal, rose avec le monogramme doré, tenue devant la toile aux deux perroquets",
        en: "The Zbekal gift card, pink with the gold monogram, held in front of the painting with two parrots",
      } as L,
    },
    verso: {
      src: "/carte-cadeau/verso.jpg",
      w: 1200,
      h: 1600,
      alt: {
        fr: "Le dos de la carte cadeau : à l’attention de, de la part de, votre format, message, et la mention « Pas de date limite »",
        en: "The back of the gift card, with lines for the recipient, the giver, the size and a message, and the note “No expiry date”",
      } as L,
    },
  },

  /* ── Haut de page ── */
  badge: { fr: "Idée cadeau", en: "Gift idea" } as L,
  /** la seconde partie est en rose */
  title: { fr: ["La carte cadeau,", "pour offrir une toile."], en: ["The gift card,", "to give a painting."] } as L<[string, string]>,
  lead: {
    fr: "Tu veux offrir une de mes toiles, mais tu hésites sur le sujet ou les couleurs ? Offre la carte. La personne me contacte quand elle veut, et on crée sa toile ensemble, à son image.",
    en: "You’d like to give one of my paintings, but you’re not sure about the subject or the colours? Give the card. The person gets in touch whenever they like, and we create their painting together, in their image.",
  } as L,
  /** pastille jaune posée sur la photo */
  sticker: { fr: "Pas de date limite", en: "No expiry date" } as L,
  cta: { fr: "Offrir une carte cadeau", en: "Give a gift card" } as L,

  /* ── Les formats ── */
  formatsTitle: { fr: "Trois formats, trois cartes", en: "Three sizes, three cards" } as L,
  formatsLead: {
    fr: "Tu choisis le format. Le sujet, les couleurs, l’ambiance : c’est la personne qui décide, avec moi.",
    en: "You choose the size. The subject, the colours, the mood: that’s for the person to decide, with me.",
  } as L,
  bigger: {
    fr: "Envie de plus grand, le moment venu ? La carte vaut pour le format offert, le reste se règle sur devis.",
    en: "Dreaming of something larger when the time comes? The card covers the size you gave; the rest is settled on quote.",
  } as L,
  legal: { fr: "Prix en euros, TTC.", en: "Prices in euros, all taxes included." } as L,
  seePrices: { fr: "Voir le détail des tarifs", en: "See the prices in detail" } as L,

  /* ── Les étapes ── */
  stepsTitle: { fr: "Comment ça se passe", en: "How it works" } as L,
  steps: {
    fr: [
      { title: "Tu choisis le format", text: "S, M ou L : c’est la taille de la toile que tu offres." },
      { title: "Tu m’écris", text: "Je te confirme la commande et je t’envoie un lien de paiement sécurisé." },
      { title: "Tu reçois la carte", text: "En main propre ou par courrier, prête à offrir." },
      { title: "On crée sa toile", text: "La personne me contacte quand elle est prête : son sujet, ses couleurs, et je peins." },
    ],
    en: [
      { title: "You choose the size", text: "S, M or L: that’s the size of the painting you’re giving." },
      { title: "You write to me", text: "I confirm the order and send you a secure payment link." },
      { title: "You receive the card", text: "Handed over in person or sent by post, ready to give." },
      { title: "We create the painting", text: "The person gets in touch when they’re ready: their subject, their colours, and I paint." },
    ],
  } as L<{ title: string; text: string }[]>,

  /* ── La carte elle-même ── */
  cardTitle: { fr: ["Une vraie carte,", "à glisser dans une enveloppe."], en: ["A real card,", "to slip into an envelope."] } as L<[string, string]>,
  cardText: {
    fr: "Rose, avec mon monogramme doré. Au dos : son prénom, le tien, le format offert et ton message.",
    en: "Pink, with my gold monogram. On the back: their name, yours, the size you’re giving and your message.",
  } as L,
  includedTitle: { fr: "Ce que la carte comprend", en: "What the card includes" } as L,
  included: {
    fr: [
      "Une toile sur mesure au format offert : le sujet et les couleurs se décident ensemble.",
      "La toile sur châssis et toute la matière : acrylique, médiums, feuilles dorées, perles.",
      "L’esquisse et une photo de la toile en cours, pour valider avant la fin.",
      "Le certificat d’authenticité, signé.",
      "Pas de date limite : la carte attend que l’idée soit là.",
    ],
    en: [
      "A made-to-order painting in the size you gave: the subject and colours are decided together.",
      "The stretched canvas and all the materials: acrylic, mediums, golden leaf, beads.",
      "The sketch and a photo of the work in progress, to approve before the end.",
      "The signed certificate of authenticity.",
      "No expiry date: the card waits until the idea is there.",
    ],
  } as L<string[]>,
  notIncluded: {
    fr: "En plus : l’envoi de la toile, si elle voyage. La remise en main propre est possible.",
    en: "Extra: shipping the painting, if it travels. Collection in person is possible.",
  } as L,
  termsLink: { fr: "Les conditions de la carte cadeau", en: "Gift card terms" } as L,

  /* ── Appel du bas de page ── */
  ctaTitle: { fr: "Quelqu’un à gâter ?", en: "Someone to spoil?" } as L,
  ctaText: {
    fr: "Dis-moi le format et pour qui c’est : je te réponds sous 48 h.",
    en: "Tell me the size and who it’s for: I reply within 48 hours.",
  } as L,

  /* ── Bloc de la page d’accueil ── (n = prix du plus petit format, calculé tout seul) */
  home: {
    badge: { fr: "Carte cadeau", en: "Gift card" } as L,
    title: { fr: "Une toile à offrir ?", en: "A painting to give?" } as L,
    text: {
      fr: (from: string) => `Anniversaire, Noël, crémaillère : avec la carte cadeau, la personne choisit son sujet et ses couleurs, et je peins sa toile. Trois formats, à partir de ${from}, sans date limite.`,
      en: (from: string) => `A birthday, Christmas, a new home: with the gift card, the person chooses their subject and colours, and I paint their canvas. Three sizes, from ${from}, with no expiry date.`,
    } as L<(from: string) => string>,
    cta: { fr: "Découvrir la carte cadeau", en: "Discover the gift card" } as L,
  },

  /* ── Lien depuis la page Tarifs ── */
  fromPrices: { fr: "Envie de l’offrir ? Il y a la carte cadeau", en: "Want to give it as a present? There’s the gift card" } as L,
};
