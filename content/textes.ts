/**
 * Textes longs du site, en français et en anglais : accueil, page « Laurine », commandes.
 * Modifie librement : chaque bloc existe dans les deux langues.
 */
import type { Locale } from "./ui";

type L<T> = Record<Locale, T>;

export const home = {
  /** Titre de l’accueil : la seconde partie est en rose */
  title: { fr: ["Des toiles qu’on a", "envie de toucher."], en: ["Paintings you’ll", "want to touch."] } as L<[string, string]>,
  /** n = nombre de toiles disponibles (calculé tout seul) */
  intro: {
    fr: (n: number) =>
      `De l’acrylique posée en épaisseur, des feuilles dorées, des perles : mes toiles se regardent de loin pour la couleur, de près pour la matière. En ce moment, ${n} sont disponibles. Les autres ont trouvé leur maison : si l’une d’elles t’inspire, je crée la tienne, dans le même esprit.`,
    en: (n: number) =>
      `Thick acrylic, golden leaf, beads: my paintings are made to be seen from afar for the colour and up close for the texture. Right now, ${n} are available. The others have found their homes: if one of them inspires you, I’ll create yours in the same spirit.`,
  } as L<(n: number) => string>,
  heroAlt: {
    fr: "Laurine Girard en train de peindre Duo coloré en extérieur, palette à la main",
    en: "Laurine Girard painting Colourful Duo outdoors, palette in hand",
  } as L<string>,
  about: {
    fr: [
      "J’ai peint ma première toile le 10 avril 2020, en plein confinement. Je n’ai plus lâché les pinceaux.",
      "Depuis, il y a eu des corps, des mains, des bouquets, et maintenant une jungle entière. Toujours à l’acrylique, toujours en épaisseur : j’aime quand la peinture sort de la toile et accroche la lumière.",
    ],
    en: [
      "I painted my first canvas on 10 April 2020, in the middle of lockdown. I haven’t put the brushes down since.",
      "Since then there have been bodies, hands, bouquets, and now a whole jungle. Always in acrylic, always laid on thick: I love it when the paint rises off the canvas and catches the light.",
    ],
  } as L<string[]>,
  portraitAlt: {
    fr: "Laurine Girard souriante, appuyée sur une toile, pinceau et palette à la main",
    en: "Laurine Girard smiling, leaning on a canvas, brush and palette in hand",
  } as L<string>,
  /** Toiles déjà parties mises en avant sur l’accueil, comme sources d’inspiration (slugs de oeuvres.ts) */
  inspiredPicks: ["retiens-moi", "regarde-moi", "delicatesse", "fusion"],
};

/** Photo du bloc « Une toile rien que pour toi » (commande sur mesure). Remplace le fichier, garde le nom. */
export const commissionPhoto = {
  src: "/atelier/esquisse.jpg",
  w: 719,
  h: 1277,
  alt: { fr: "Laurine en train de peindre, pinceau à la main, sur une toile aux tons terracotta", en: "Laurine painting, brush in hand, on a canvas in terracotta tones" } as L<string>,
};

/**
 * Formats et tarifs des commandes sur mesure (publication Instagram de novembre 2025).
 * À TENIR À JOUR : mets `show: false` pour masquer le bloc, ou modifie les lignes.
 */
export const commissionFormats = {
  show: true,
  items: [
    { name: "S", size: "60 × 70 cm", price: { fr: "400 €", en: "€400" } },
    { name: "M", size: "80 × 90 cm", price: { fr: "500 €", en: "€500" } },
    { name: "L", size: "100 × 100 cm", price: { fr: "600 €", en: "€600" } },
    { name: { fr: "Sur mesure", en: "Custom" }, size: { fr: "Jusqu’à 130 cm", en: "Up to 130 cm" }, price: { fr: "Sur devis", en: "On quote" } },
  ] as { name: string | L<string>; size: string | L<string>; price: L<string> }[],
};

/** Palette de la collection Amazoni */
export const palette = [
  { hex: "#1B4D3E", name: { fr: "Vert forêt", en: "Forest green" } },
  { hex: "#2E8B57", name: { fr: "Vert feuille", en: "Leaf green" } },
  { hex: "#E85D9C", name: { fr: "Rose", en: "Pink" } },
  { hex: "#D1232A", name: { fr: "Rouge", en: "Red" } },
  { hex: "#2041B5", name: { fr: "Bleu roi", en: "Royal blue" } },
  { hex: "#F6C945", name: { fr: "Jaune", en: "Yellow" } },
  { hex: "#F26B21", name: { fr: "Orange", en: "Orange" } },
];

type Photo = { src: string; alt: L<string>; w: number; h: number };

const photos = {
  mainPinceau: { src: "/atelier/main-pinceau.jpg", w: 1403, h: 2200, alt: { fr: "Main de l’artiste posant une touche de peinture sur le perroquet rouge", en: "The artist’s hand adding a touch of paint to the red parrot" } },
  matiere: { src: "/atelier/matiere.jpg", w: 2000, h: 1325, alt: { fr: "Détail de matière : feuilles en relief, perles vertes et moustaches dorées", en: "Texture detail: leaves in relief, green beads and golden whiskers" } },
  devantJaguar: { src: "/atelier/devant-jaguar.jpg", w: 1060, h: 1600, alt: { fr: "Laurine Girard devant la toile Maître silencieux", en: "Laurine Girard in front of the painting Silent Master" } },
  chaise: { src: "/atelier/chaise.jpg", w: 1060, h: 1600, alt: { fr: "Pinceaux et palette posés sur une chaise en bois, au bord de l’eau", en: "Brushes and palette on a wooden chair by the water" } },
  laurineRire: { src: "/atelier/laurine-rire.jpg", w: 1325, h: 1766, alt: { fr: "Laurine Girard riant, accoudée au dos d’une toile, palette et pinceau à la main, au bord de l’eau", en: "Laurine Girard laughing, leaning on the back of a canvas, palette and brush in hand, by the water" } },
  laurineTresse: { src: "/atelier/laurine-tresse.jpg", w: 1325, h: 1766, alt: { fr: "Laurine Girard de dos, une longue tresse dans le dos, pinceau à la main, face à la rivière", en: "Laurine Girard from behind, a long braid down her back, brush in hand, facing the river" } },
  laurineDos: { src: "/atelier/laurine-dos.jpg", w: 1060, h: 1600, alt: { fr: "Laurine Girard de dos, ajustant une toile sur son chevalet en plein air", en: "Laurine Girard from behind, adjusting a canvas on her easel outdoors" } },
  oeil: { src: "/atelier/oeil.jpg", w: 2000, h: 1325, alt: { fr: "Détail de Maître silencieux : l’œil bleu du jaguar et des éclats dorés", en: "Detail of Silent Master: the jaguar’s blue eye and golden glints" } },
  paletteRiviere: { src: "/atelier/palette-riviere.jpg", w: 1060, h: 1600, alt: { fr: "Laurine Girard, palette à la main, devant la rivière", en: "Laurine Girard, palette in hand, by the river" } },
  riviere: { src: "/atelier/riviere.jpg", w: 2000, h: 1427, alt: { fr: "La toile Maître silencieux posée sur les rochers au bord de l’eau", en: "The painting Silent Master resting on rocks by the water" } },
  auSol: { src: "/atelier/au-sol.jpg", w: 719, h: 942, alt: { fr: "Laurine Girard assise par terre, en train de rire, au milieu de ses toiles", en: "Laurine Girard sitting on the floor, laughing, surrounded by her canvases" } },
  portraitRose: { src: "/atelier/portrait-rose.jpg", w: 1457, h: 2200, alt: { fr: "Laurine Girard en train de rire, une toile dans les mains, sous un ciel bleu", en: "Laurine Girard laughing, a canvas in her hands, under a blue sky" } },
} satisfies Record<string, Photo>;

/** Photos du bloc Instagram de l’accueil */
export const studioPhotos: Photo[] = [photos.mainPinceau, photos.auSol, photos.devantJaguar, photos.matiere];

export const about = {
  kicker: { fr: "Artiste peintre · Chalonnes-sur-Loire", en: "Painter · Chalonnes-sur-Loire, France" } as L<string>,
  intro: {
    fr: "Je peins des toiles qui ont du relief : de l’acrylique en épaisseur, des feuilles dorées, des perles. Tout a commencé le 10 avril 2020, en plein confinement, avec une première toile. Je ne me suis plus arrêtée.",
    en: "I paint canvases with relief: thick acrylic, golden leaf, beads. It all began on 10 April 2020, in the middle of lockdown, with a first painting. I haven’t stopped since.",
  } as L<string>,
  portrait: {
    src: "/atelier/portrait-palette.jpg",
    w: 1457,
    h: 2200,
    alt: {
      fr: "Laurine Girard souriante, accoudée à une toile sur son chevalet, palette à la main, au bord de l’eau",
      en: "Laurine Girard smiling, leaning on a canvas on her easel, palette in hand, by the water",
    } as L<string>,
  },
  /** Les repères, en quatre dates */
  milestones: {
    fr: [
      { year: "2020", text: "Première toile, le 10 avril, en plein confinement." },
      { year: "2022", text: "Première exposition, à Paris." },
      { year: "2023", text: "Cinquantième toile, et prix du public au Salon des Arts de Jallais." },
      { year: "2026", text: "Amazoni : dix toiles, une jungle." },
    ],
    en: [
      { year: "2020", text: "First painting, on 10 April, in the middle of lockdown." },
      { year: "2022", text: "First exhibition, in Paris." },
      { year: "2023", text: "Fiftieth painting, and the audience award at the Salon des Arts in Jallais." },
      { year: "2026", text: "Amazoni: ten paintings, one jungle." },
    ],
  } as L<{ year: string; text: string }[]>,
  approach: {
    fr: [
      {
        title: "La matière d’abord",
        text: "Sur mes toiles, la peinture a de l’épaisseur. Je la pose couche après couche, j’y glisse des feuilles dorées et des perles. Les reliefs accrochent la lumière : le tableau n’est pas le même le matin et le soir, de face et de côté.",
      },
      {
        title: "De la couleur, franchement",
        text: "Des verts profonds, des roses, des rouges, des bleus de nuit. Je ne cherche pas la demi-teinte, je cherche l’énergie : une toile doit réveiller un mur.",
      },
      {
        title: "Du corps à la jungle",
        text: "J’ai commencé par le corps féminin, sans visage, tout en courbes. Puis sont venues les mains, les bouquets, et aujourd’hui Amazoni : dix toiles dans une végétation luxuriante, où se croisent femmes, animaux sauvages et feuillages.",
      },
      {
        title: "Des toiles qui racontent quelqu’un",
        text: "Beaucoup de mes toiles sont nées d’une commande : un mariage, un bébé qui arrive, un premier chez-soi, un bouquet reçu. On me confie une histoire, des couleurs, parfois une photo. J’en fais une toile qui ne ressemble qu’à ses propriétaires.",
      },
    ],
    en: [
      {
        title: "Texture first",
        text: "On my canvases, the paint has thickness. I lay it down layer after layer and slip in golden leaf and beads. The relief catches the light: the painting isn’t the same in the morning and in the evening, from the front and from the side.",
      },
      {
        title: "Colour, and plenty of it",
        text: "Deep greens, pinks, reds, midnight blues. I’m not after half-tones, I’m after energy: a painting should wake up a wall.",
      },
      {
        title: "From the body to the jungle",
        text: "I started with the female body, faceless, all curves. Then came hands, bouquets, and today Amazoni: ten paintings set in lush vegetation, where women, wild animals and foliage cross paths.",
      },
      {
        title: "Paintings that tell someone’s story",
        text: "Many of my paintings began as a commission: a wedding, a baby on the way, a first home, a bouquet received. People trust me with a story, some colours, sometimes a photo. I turn it into a painting that looks like no one but its owners.",
      },
    ],
  } as L<{ title: string; text: string }[]>,
  /** Les deux gros plans à côté de « Ma façon de peindre » */
  closeUps: [
    {
      src: "/oeuvres/duo-colore/detail-3.jpg",
      w: 1085,
      h: 719,
      alt: { fr: "Gros plan sur Duo coloré : les deux aras, rouge et bleu, avec leurs perles et les feuilles dorées en relief", en: "Close-up of Colourful Duo: the two macaws, red and blue, with their beads and golden leaf in relief" },
    },
    {
      src: "/oeuvres/maitre-silencieux/detail-3.jpg",
      w: 1600,
      h: 1060,
      alt: { fr: "Gros plan sur Maître silencieux : une fleur en perles orange, jaunes et bleues, sous les moustaches du jaguar", en: "Close-up of Silent Master: a flower made of orange, yellow and blue beads, beneath the jaguar’s whiskers" },
    },
  ] as Photo[],
  inspirations: {
    fr: [
      { name: "Frida Kahlo", why: "pour la nature et la figure féminine." },
      { name: "Sophie Tea", why: "pour la liberté dans la couleur et l’énergie des corps." },
    ],
    en: [
      { name: "Frida Kahlo", why: "for nature and the female figure." },
      { name: "Sophie Tea", why: "for freedom in colour and the energy of bodies." },
    ],
  } as L<{ name: string; why: string }[]>,
  journey: {
    fr: "Une première exposition à Paris en 2022. Un prix du public au Salon des Arts de Jallais en 2023. Et chaque Noël, une toile offerte à ma communauté sur Instagram. En novembre 2026, j’y suis retournée avec de nouvelles toiles.",
    en: "A first exhibition in Paris in 2022. An audience award at the Salon des Arts in Jallais in 2023. And every Christmas, a painting given away to my Instagram community. In November 2026, I went back with new paintings.",
  } as L<string>,
  /** Photos du bloc « À l’atelier » */
  studio: [photos.devantJaguar, photos.laurineRire, photos.auSol, photos.laurineDos, photos.paletteRiviere, photos.chaise, photos.portraitRose, photos.laurineTresse] as Photo[],
  cvLabel: { fr: "Télécharger mon CV (PDF)", en: "Download my CV (PDF)" } as L<string>,
};
