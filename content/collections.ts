import type { CollectionSlug } from "./oeuvres";

export type Collection = {
  slug: CollectionSlug;
  title: { fr: string; en: string };
  /** Sous-titre court (cartes, listes) */
  lead: { fr: string; en: string };
  /** Texte de présentation (page de la collection) */
  description: { fr: string[]; en: string[] };
  /** Nombre de toiles prévues dans la série (optionnel) */
  planned?: number;
  /** Image d’ambiance pour la collection (optionnel) */
  cover?: string;
  /** Note sur la suite de la série (optionnel) */
  upcoming?: { fr: string; en: string };
};

export const collections: Collection[] = [
  {
    slug: "amazoni",
    title: { fr: "Amazoni", en: "Amazoni" },
    lead: {
      fr: "Dix toiles, une jungle où se mêlent femmes, animaux sauvages et feuillages.",
      en: "Ten paintings, a jungle where women, wild animals and foliage intertwine.",
    },
    description: {
      fr: [
        "Amazoni est une série de dix toiles : une immersion dans une végétation luxuriante où se mêlent femmes, animaux sauvages et feuillages. Chaque tableau a sa propre identité, tout en restant relié aux autres par des éléments visuels communs.",
        "La peinture est travaillée en épaisseur, avec des médiums et des superpositions, pour créer du relief et capter la lumière. Les toiles se regardent de loin pour la couleur, et de près pour la matière.",
      ],
      en: [
        "Amazoni is a series of ten paintings: an immersion in lush vegetation where women, wild animals and foliage intertwine. Each painting has its own identity while staying connected to the others through shared visual elements.",
        "The paint is built up in layers, with mediums and overlays, to create relief and catch the light. The paintings are made to be seen from afar for the colour, and up close for the texture.",
      ],
    },
    planned: 10,
    cover: "/atelier/hero.jpg",
    upcoming: {
      fr: "Les cinq toiles suivantes explorent d’autres formats, triptyques et quadriptyques, avec un caméléon, un regard caché et des fleurs exotiques.",
      en: "The next five paintings explore other formats, triptychs and quadriptychs, with a chameleon, a hidden gaze and exotic flowers.",
    },
  },
  {
    slug: "corps-feminin",
    title: { fr: "Corps féminin", en: "The Female Body" },
    lead: {
      fr: "Les toiles antérieures, inspirées par le corps féminin.",
      en: "Earlier paintings inspired by the female body.",
    },
    description: {
      fr: [
        "Avant Amazoni, le corps féminin a été pendant plusieurs années le point de départ des toiles : des silhouettes, des courbes, de la couleur en liberté.",
      ],
      en: [
        "Before Amazoni, the female body was for several years the starting point of the paintings: silhouettes, curves and colour set free.",
      ],
    },
  },
  {
    slug: "fleurs",
    title: { fr: "Fleurs", en: "Flowers" },
    lead: {
      fr: "Les toiles antérieures, inspirées par les fleurs.",
      en: "Earlier paintings inspired by flowers.",
    },
    description: {
      fr: [
        "Les fleurs sont l’autre fil de départ : des bouquets et des pétales en relief, avant que la nature ne prenne toute la place dans Amazoni.",
      ],
      en: [
        "Flowers are the other starting thread: bouquets and petals in relief, before nature took over entirely in Amazoni.",
      ],
    },
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
