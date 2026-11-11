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

/** L’ordre de cette liste est l’ordre d’affichage sur la page « Toiles ». */
export const collections: Collection[] = [
  {
    slug: "amazoni",
    title: { fr: "Amazoni", en: "Amazoni" },
    lead: {
      fr: "Dix toiles, une jungle. Six sont dévoilées, toutes disponibles.",
      en: "Ten paintings, one jungle. Six are revealed, all available.",
    },
    description: {
      fr: [
        "Amazoni, c’est une jungle en dix toiles : des femmes, des animaux sauvages, des feuillages qui débordent. Chaque tableau a son caractère, et tous se répondent par leurs verts, leurs branches dorées et leurs fleurs.",
        "La peinture est posée en épaisseur, avec de la feuille d’or et des perles. De loin, tu vois la couleur. De près, tu vois la matière : c’est là que tout se joue.",
      ],
      en: [
        "Amazoni is a jungle in ten paintings: women, wild animals, foliage spilling over the edges. Each piece has its own character, and they all echo one another through their greens, golden branches and flowers.",
        "The paint is laid on thick, with gold leaf and beads. From afar, you see the colour. Up close, you see the texture: that’s where it all happens.",
      ],
    },
    planned: 10,
    cover: "/atelier/hero.jpg",
    upcoming: {
      fr: "Quatre toiles restent à dévoiler : des corps, des fleurs, des visages.",
      en: "Four paintings are still to be revealed: bodies, flowers, faces.",
    },
  },
  {
    slug: "fleurs",
    title: { fr: "Fleurs", en: "Flowers" },
    lead: {
      fr: "Des bouquets en relief, peints pour ne jamais faner.",
      en: "Bouquets in relief, painted so they never fade.",
    },
    description: {
      fr: [
        "Un bouquet qu’on t’a offert, un mariage, une fleur préférée : ici, les fleurs racontent toujours quelqu’un. Je les pose une à une, en épaisseur, pour que les pétales sortent de la toile.",
        "Cinq bouquets sont disponibles. Les autres ont trouvé leur maison : si l’un d’eux t’inspire, je crée le tien, à ton format et dans tes couleurs.",
      ],
      en: [
        "A bouquet someone gave you, a wedding, a favourite flower: here, flowers always tell someone’s story. I lay them down one by one, thickly, so the petals rise off the canvas.",
        "Five bouquets are available. The others have found their home: if one of them inspires you, I’ll create yours, in your size and your colours.",
      ],
    },
  },
  {
    slug: "mains",
    title: { fr: "Mains", en: "Hands" },
    lead: {
      fr: "Deux mains qui se cherchent, se frôlent, se tiennent.",
      en: "Two hands reaching, brushing, holding on.",
    },
    description: {
      fr: [
        "Deux mains suffisent à raconter un lien : un couple, un mariage, un premier chez-soi. Des fonds de nuit, de l’argent, du cuivre, de la feuille d’or.",
        "Ces toiles sont toutes parties chez leurs propriétaires, et chacune raconte leur histoire. Si l’une d’elles te parle, je crée la tienne, avec tes couleurs et ton histoire à toi.",
      ],
      en: [
        "Two hands are enough to tell a bond: a couple, a wedding, a first home. Night-sky backgrounds, silver, copper, gold leaf.",
        "These paintings have all gone to their owners, and each one tells their story. If one of them speaks to you, I’ll create yours, with your colours and your own story.",
      ],
    },
  },
  {
    slug: "corps",
    title: { fr: "Corps", en: "Bodies" },
    lead: {
      fr: "Des silhouettes, des courbes, de la couleur en liberté.",
      en: "Silhouettes, curves and colour set free.",
    },
    description: {
      fr: [
        "Le corps féminin est mon premier sujet : des silhouettes sans visage, des courbes, des aplats francs et des rehauts de feuille d’or.",
        "Toutes ces toiles ont été adoptées. Un coup de cœur ? Je m’en inspire pour créer la tienne, au format et dans les teintes de ton intérieur.",
      ],
      en: [
        "The female body is my first subject: faceless silhouettes, curves, bold flat colour and highlights in gold leaf.",
        "All these paintings have been adopted. Fallen for one? I’ll take it as inspiration to create yours, in the size and shades of your home.",
      ],
    },
  },
  {
    slug: "premieres-toiles",
    title: { fr: "Premières toiles", en: "Early works" },
    lead: {
      fr: "De 2020 à 2024 : les débuts, toile après toile.",
      en: "2020 to 2024: the beginnings, canvas after canvas.",
    },
    description: {
      fr: [
        "J’ai peint ma première toile le 10 avril 2020, en plein confinement. Voici celles qui ont suivi : des corps, des fruits, un lion, un œil, une abstraction.",
        "Elles sont toutes parties, mais elles racontent d’où je viens. Et si l’une d’elles t’inspire, on imagine la tienne ensemble.",
      ],
      en: [
        "I painted my first canvas on 10 April 2020, in the middle of lockdown. Here are the ones that followed: bodies, fruit, a lion, an eye, an abstraction.",
        "They have all gone, but they tell where I come from. And if one of them inspires you, we can imagine yours together.",
      ],
    },
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
