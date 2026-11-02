/**
 * Expositions, salons et prix — du plus récent au plus ancien.
 * `upcoming: true` affiche l’événement dans le bandeau d’actualité.
 */
export type Exhibition = {
  year: number;
  /** Date ou période affichée */
  date: { fr: string; en: string };
  title: { fr: string; en: string };
  place: { fr: string; en: string };
  details?: { fr: string; en: string };
  award?: { fr: string; en: string };
  upcoming?: boolean;
  /** Lien externe (optionnel) */
  url?: string;
};

export const exhibitions: Exhibition[] = [
  {
    year: 2026,
    date: { fr: "Novembre 2026", en: "November 2026" },
    title: { fr: "Salon des Arts de Jallais", en: "Salon des Arts, Jallais" },
    place: { fr: "Jallais, Maine-et-Loire (49)", en: "Jallais, Maine-et-Loire, France" },
    details: { fr: "Trois toiles présentées.", en: "Three paintings on show." },
    upcoming: true,
  },
  {
    year: 2023,
    date: { fr: "2023", en: "2023" },
    title: { fr: "Salon des Arts de Jallais", en: "Salon des Arts, Jallais" },
    place: { fr: "Jallais, Maine-et-Loire (49)", en: "Jallais, Maine-et-Loire, France" },
    award: { fr: "Lauréate du prix du public", en: "Winner of the audience award" },
  },
  {
    year: 2022,
    date: { fr: "2022", en: "2022" },
    title: { fr: "« Réalise »", en: "“Réalise”" },
    place: { fr: "La Caserne, Paris 10e", en: "La Caserne, Paris (10th arrondissement)" },
    details: {
      fr: "Exposition collective avec trois artistes, sur invitation de l’artiste Julia Sidiatman.",
      en: "Group exhibition with three artists, at the invitation of artist Julia Sidiatman.",
    },
  },
];
