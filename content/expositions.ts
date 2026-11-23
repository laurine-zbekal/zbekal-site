/**
 * Expositions, salons, prix et actualités — du plus récent au plus ancien.
 * `upcoming: true` affiche l’événement dans le bandeau d’actualité.
 * `now: true` (en plus) : l’événement a commencé, l’étiquette passe de « À venir » à « En ce moment ».
 * `ticker` : phrase à faire défiler dans le bandeau à la place du message automatique (titre, dates, détails).
 * `banner` : titre et phrase du bandeau jaune de la page d’accueil (sans lui : titre, dates et détails de l’événement).
 * À la fin de l’événement : retirer `upcoming`, `now`, `ticker` et `banner`.
 * `images` : photos déposées dans public/expos/ (facultatif).
 */
type L = { fr: string; en: string };

export type ExhibitionImage = { src: string; w: number; h: number; alt: L };

export type Exhibition = {
  year: number;
  /** Date ou période affichée */
  date: L;
  title: L;
  place: L;
  /** Une ligne de contexte (listes courtes) */
  details?: L;
  /** Le récit, en deux ou trois phrases (page Expos) */
  story?: L;
  award?: L;
  upcoming?: boolean;
  /** L’événement est en cours (avec `upcoming: true`) */
  now?: boolean;
  /** Message du bandeau défilant, à la place du message automatique */
  ticker?: L;
  /** Bandeau de la page d’accueil : un titre court et une phrase */
  banner?: { title: L; text: L };
  /** Lien externe (optionnel) */
  url?: string;
  urlLabel?: L;
  images?: ExhibitionImage[];
  /** false = n’apparaît pas dans les listes courtes (accueil, page Laurine) */
  highlight?: boolean;
};

export const exhibitions: Exhibition[] = [
  {
    year: 2026,
    date: { fr: "14 au 22 novembre 2026", en: "14–22 November 2026" },
    title: { fr: "Salon des Arts de Jallais", en: "Salon des Arts, Jallais" },
    place: { fr: "Jallais, Maine-et-Loire (49)", en: "Jallais, Maine-et-Loire, France" },
    details: { fr: "Toco farouche, Maître silencieux et Le Regard y étaient exposés.", en: "Wild Toco, Silent Master and The Gaze were on show." },
    story: {
      fr: "Je suis revenue là où le public m’avait remis son prix en 2023, avec de nouvelles toiles : Toco farouche, Maître silencieux et Le Regard.",
      en: "I went back where the public gave me its award in 2023, with new paintings: Wild Toco, Silent Master and The Gaze.",
    },
  },
  {
    year: 2026,
    date: { fr: "Octobre 2026", en: "October 2026" },
    title: { fr: "Shop en Anjou parle de Zbekal", en: "Featured by Shop en Anjou" },
    place: { fr: "Chalonnes-sur-Loire, Maine-et-Loire (49)", en: "Chalonnes-sur-Loire, Maine-et-Loire, France" },
    details: { fr: "Une publication consacrée à mon travail.", en: "A post about my work." },
    story: {
      fr: "Shop en Anjou est venu découvrir Amazoni et mon atelier, à Chalonnes-sur-Loire. Coup de cœur pour le jaguar aux yeux bleus.",
      en: "Shop en Anjou came to discover Amazoni and my studio in Chalonnes-sur-Loire, and fell for the blue-eyed jaguar.",
    },
    url: "https://www.instagram.com/p/DeXGRzAAMQk/",
    urlLabel: { fr: "Voir la publication", en: "See the post" },
    // Photo de Laurine (et non une photo de la publication, qui appartient à Shop en Anjou)
    images: [
      {
        src: "/atelier/devant-jaguar.jpg",
        w: 1060,
        h: 1600,
        alt: { fr: "Laurine Girard devant sa toile Maître silencieux, le jaguar aux yeux bleus", en: "Laurine Girard in front of her painting Silent Master, the blue-eyed jaguar" },
      },
    ],
    highlight: false,
  },
  {
    year: 2025,
    date: { fr: "Décembre 2025", en: "December 2025" },
    title: { fr: "Concours de Noël, saison 5", en: "Christmas giveaway, season 5" },
    place: { fr: "Sur Instagram, @zbekal", en: "On Instagram, @zbekal" },
    story: {
      fr: "Cette année-là, la toile a été composée par ma communauté, vote après vote : « Plaisir d’offrir », offerte par tirage au sort.",
      en: "That year, the painting was designed by my community, one vote at a time: “Plaisir d’offrir”, given away in a prize draw.",
    },
    images: [
      {
        src: "/oeuvres/plaisir-d-offrir/main.jpg",
        w: 795,
        h: 1413,
        alt: { fr: "La toile Plaisir d’offrir : deux mains qui se transmettent un bouquet", en: "The painting Plaisir d’offrir: two hands passing a bouquet" },
      },
    ],
    highlight: false,
  },
  {
    year: 2024,
    date: { fr: "Décembre 2024", en: "December 2024" },
    title: { fr: "Concours de Noël, saison 4", en: "Christmas giveaway, season 4" },
    place: { fr: "Sur Instagram, @zbekal", en: "On Instagram, @zbekal" },
    story: {
      fr: "À gagner cette année-là : « Pétales de vie », un quadriptyque aux tons terracotta. Tirage au sort le 25 décembre, à 11 h.",
      en: "Up for grabs that year: “Pétales de vie”, a quadriptych in terracotta tones. The draw took place on 25 December at 11 am.",
    },
    images: [
      {
        src: "/oeuvres/petales-de-vie/main.jpg",
        w: 719,
        h: 1277,
        alt: { fr: "Laurine en train de peindre Pétales de vie, la toile du concours de Noël 2024", en: "Laurine painting Pétales de vie, the 2024 Christmas giveaway painting" },
      },
    ],
    highlight: false,
  },
  {
    year: 2023,
    date: { fr: "Décembre 2023", en: "December 2023" },
    title: { fr: "Concours de Noël, saison 3", en: "Christmas giveaway, season 3" },
    place: { fr: "Sur Instagram, @zbekal", en: "On Instagram, @zbekal" },
    story: {
      fr: "Saison 3 de « Noël avant l’heure » : « Lueur scintillante », un corps aux reflets cuivrés sur fond nuit, offerte par tirage au sort le 13 décembre.",
      en: "Season 3 of “Christmas comes early”: “Lueur scintillante”, a body with copper glints on a night-dark background, given away in a prize draw on 13 December.",
    },
    images: [
      {
        src: "/expos/noel-2023.jpg",
        w: 720,
        h: 1272,
        alt: { fr: "Lueur scintillante, la toile du concours de Noël 2023, posée sur un meuble entre des bougies", en: "Lueur scintillante, the 2023 Christmas giveaway painting, standing on a sideboard among candles" },
      },
    ],
    highlight: false,
  },
  {
    year: 2023,
    date: { fr: "Novembre 2023", en: "November 2023" },
    title: { fr: "Salon des Arts de Jallais", en: "Salon des Arts, Jallais" },
    place: { fr: "Jallais, Maine-et-Loire (49)", en: "Jallais, Maine-et-Loire, France" },
    details: { fr: "Trois toiles sur l’amour : Fusion, Fission, Passion.", en: "Three paintings on love: Fusion, Fission, Passion." },
    story: {
      fr: "J’y ai présenté trois toiles sur l’amour : Fusion, Fission et Passion. Le public a voté pour Fusion, et je suis repartie avec son prix.",
      en: "I showed three paintings on love: Fusion, Fission and Passion. The public voted for Fusion, and I went home with its award.",
    },
    award: { fr: "Prix du public pour « Fusion »", en: "Audience award for “Fusion”" },
    images: [
      {
        src: "/expos/jallais-2023-prix.jpg",
        w: 719,
        h: 889,
        alt: { fr: "Laurine Girard, le prix du public en main, devant ses trois toiles au Salon des Arts de Jallais", en: "Laurine Girard holding the audience award in front of her three paintings at the Salon des Arts in Jallais" },
      },
      {
        src: "/expos/jallais-2023-toiles.jpg",
        w: 719,
        h: 889,
        alt: { fr: "Fusion, Passion et Fission, les trois toiles présentées à Jallais en 2023", en: "Fusion, Passion and Fission, the three paintings shown in Jallais in 2023" },
      },
    ],
  },
  {
    year: 2022,
    date: { fr: "Décembre 2022", en: "December 2022" },
    title: { fr: "Concours de Noël, saison 2", en: "Christmas giveaway, season 2" },
    place: { fr: "Sur Instagram, @zbekal", en: "On Instagram, @zbekal" },
    story: {
      fr: "Saison 2 de « Noël avant l’heure » : « Nébuleuse », une silhouette blanche sur un ciel étoilé, offerte par tirage au sort.",
      en: "Season 2 of “Christmas comes early”: “Nébuleuse”, a white silhouette on a starry sky, given away in a prize draw.",
    },
    images: [
      {
        src: "/oeuvres/nebuleuse/main.jpg",
        w: 719,
        h: 1277,
        alt: { fr: "Nébuleuse, la toile du concours de Noël 2022", en: "Nébuleuse, the 2022 Christmas giveaway painting" },
      },
    ],
    highlight: false,
  },
  {
    year: 2022,
    date: { fr: "11 au 13 juin 2022", en: "11–13 June 2022" },
    title: { fr: "« Réalise »", en: "“Réalise”" },
    place: { fr: "La Caserne, Paris 10e", en: "La Caserne, Paris (10th arrondissement)" },
    details: {
      fr: "Ma première exposition, collective, sur invitation de l’artiste Julia Sidiatman.",
      en: "My first exhibition, a group show, at the invitation of artist Julia Sidiatman.",
    },
    story: {
      fr: "Ma toute première exposition : trois jours à Paris, une exposition collective sur invitation de l’artiste Julia Sidiatman, deux ans après ma première toile.",
      en: "My very first exhibition: three days in Paris, a group show at the invitation of artist Julia Sidiatman, two years after my first painting.",
    },
    images: [
      {
        src: "/expos/paris-2022.jpg",
        w: 719,
        h: 898,
        alt: { fr: "Laurine Girard, de dos, devant sa toile exposée à La Caserne, à Paris", en: "Laurine Girard, seen from behind, in front of her painting on show at La Caserne in Paris" },
      },
    ],
  },
  {
    year: 2021,
    date: { fr: "Décembre 2021", en: "December 2021" },
    title: { fr: "Concours de Noël, saison 1", en: "Christmas giveaway, season 1" },
    place: { fr: "Sur Instagram, @zbekal", en: "On Instagram, @zbekal" },
    story: {
      fr: "Le tout premier « Noël avant l’heure » : « Illuminée », une toile de 54 × 73 cm, offerte par tirage au sort.",
      en: "The very first “Christmas comes early”: “Illuminée”, a 54 × 73 cm canvas, given away in a prize draw.",
    },
    images: [
      {
        src: "/oeuvres/illuminee/main.jpg",
        w: 719,
        h: 1277,
        alt: { fr: "Illuminée, la toile du concours de Noël 2021", en: "Illuminée, the 2021 Christmas giveaway painting" },
      },
    ],
    highlight: false,
  },
];

/** Les événements montrés dans les listes courtes (accueil, page Laurine). */
export function highlightedExhibitions(): Exhibition[] {
  return exhibitions.filter((e) => e.highlight !== false);
}
