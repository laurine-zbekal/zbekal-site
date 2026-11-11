/**
 * Textes longs du site, en français et en anglais : accueil, démarche, bio.
 * Modifie librement : chaque bloc existe dans les deux langues.
 */
import type { Locale } from "./ui";

type L<T> = Record<Locale, T>;

export const home = {
  kicker: { fr: "Artiste peintre · Maine-et-Loire", en: "Painter · Maine-et-Loire, France" } as L<string>,
  title: { fr: ["Bienvenue dans", "ma jungle."], en: ["Welcome to", "my jungle."] } as L<[string, string]>,
  intro: {
    fr: "Ici, tu découvres mes toiles à l’acrylique, peintes en relief et en couleur : la collection Amazoni, ses perroquets, son jaguar aux yeux bleus. Choisis celle qui te parle, ou imaginons ensemble la tienne.",
    en: "Here you’ll find my acrylic paintings, built up in relief and full of colour: the Amazoni collection, its parrots, its blue-eyed jaguar. Pick the one that speaks to you, or let’s imagine yours together.",
  } as L<string>,
  heroAlt: {
    fr: "Laurine Girard en train de peindre Duo coloré en extérieur, palette à la main",
    en: "Laurine Girard painting Colourful Duo outdoors, palette in hand",
  } as L<string>,
  about: {
    fr: [
      "Je peins à l’acrylique, avec des médiums et des superpositions, pour que la toile ait du relief et accroche la lumière. La couleur est au centre de mon travail.",
      "Depuis plusieurs années, le corps féminin et les fleurs m’inspirent. Aujourd’hui, la nature prend toute la place : Amazoni, c’est une série de dix toiles dans une végétation luxuriante.",
    ],
    en: [
      "I paint in acrylic, with mediums and layered strokes, so the canvas has relief and catches the light. Colour is at the heart of my work.",
      "For several years, the female body and flowers have inspired me. Today, nature takes over: Amazoni is a series of ten paintings set in lush vegetation.",
    ],
  } as L<string[]>,
  portraitAlt: {
    fr: "Laurine Girard souriante, appuyée sur une toile, pinceau et palette à la main",
    en: "Laurine Girard smiling, leaning on a canvas, brush and palette in hand",
  } as L<string>,
};

/**
 * Photo du bloc « Une toile rien que pour toi » (commande sur mesure).
 * PROVISOIRE : en attendant une photo de Laurine en train de dessiner au crayon de bois,
 * le fichier esquisse.jpg est une copie de la photo au pinceau. Remplace le fichier, garde le nom.
 */
export const commissionPhoto = {
  src: "/atelier/esquisse.jpg",
  w: 1060,
  h: 1600,
  alt: { fr: "Laurine en train de dessiner l’esquisse d’une commande au crayon de bois", en: "Laurine sketching a commission in pencil" } as L<string>,
};

/** Palette de la collection Amazoni, affichée sur l’accueil */
export const palette = [
  { hex: "#1B4D3E", name: { fr: "Vert forêt", en: "Forest green" } },
  { hex: "#2E8B57", name: { fr: "Vert feuille", en: "Leaf green" } },
  { hex: "#E85D9C", name: { fr: "Rose", en: "Pink" } },
  { hex: "#D1232A", name: { fr: "Rouge", en: "Red" } },
  { hex: "#2041B5", name: { fr: "Bleu roi", en: "Royal blue" } },
  { hex: "#F6C945", name: { fr: "Jaune", en: "Yellow" } },
  { hex: "#F26B21", name: { fr: "Orange", en: "Orange" } },
];

/** Photos d’atelier utilisées sur l’accueil (bloc Instagram) et la page démarche */
export const studioPhotos: { src: string; alt: L<string>; w: number; h: number }[] = [
  { src: "/atelier/main-pinceau.jpg", w: 1060, h: 1600, alt: { fr: "Main de l’artiste posant une touche de peinture sur le perroquet rouge", en: "The artist’s hand adding a touch of paint to the red parrot" } },
  { src: "/atelier/matiere.jpg", w: 2000, h: 1325, alt: { fr: "Détail de matière : feuilles en relief, perles vertes et moustaches dorées", en: "Texture detail: leaves in relief, green beads and golden whiskers" } },
  { src: "/atelier/devant-jaguar.jpg", w: 1060, h: 1600, alt: { fr: "Laurine Girard devant la toile Maître silencieux", en: "Laurine Girard in front of the painting Silent Master" } },
  { src: "/atelier/chaise.jpg", w: 1060, h: 1600, alt: { fr: "Pinceaux et palette posés sur une chaise en bois, au bord de l’eau", en: "Brushes and palette on a wooden chair by the water" } },
  { src: "/atelier/laurine-dos.jpg", w: 1060, h: 1600, alt: { fr: "Laurine Girard de dos, ajustant une toile sur son chevalet en plein air", en: "Laurine Girard from behind, adjusting a canvas on her easel outdoors" } },
  { src: "/atelier/oeil.jpg", w: 2000, h: 1325, alt: { fr: "Détail de Maître silencieux : l’œil bleu du jaguar et des éclats dorés", en: "Detail of Silent Master: the jaguar’s blue eye and golden glints" } },
  { src: "/atelier/palette-riviere.jpg", w: 1060, h: 1600, alt: { fr: "Laurine Girard, palette à la main, devant la rivière", en: "Laurine Girard, palette in hand, by the river" } },
  { src: "/atelier/riviere.jpg", w: 2000, h: 1427, alt: { fr: "La toile Maître silencieux posée sur les rochers au bord de l’eau", en: "The painting Silent Master resting on rocks by the water" } },
];

export const about = {
  intro: {
    fr: "Je suis Laurine Girard, artiste peintre sous le nom Zbekal, en Maine-et-Loire. Je peins à l’acrylique sur toile, et je peins en relief.",
    en: "I’m Laurine Girard, a painter working under the name Zbekal, based in Maine-et-Loire, France. I paint in acrylic on canvas, and I paint in relief.",
  } as L<string>,
  approach: {
    fr: [
      "Sur mes toiles, la peinture a de l’épaisseur. Je travaille la matière avec des médiums et des superpositions : les couches se chevauchent, les reliefs accrochent la lumière, et le tableau change selon l’heure et l’endroit où tu le regardes. C’est une expérience visuelle, et presque tactile.",
      "La couleur est au centre de mon travail. Des verts profonds, des roses, des rouges, des bleus francs : je ne cherche pas la demi-teinte, je cherche l’énergie.",
      "Depuis plusieurs années, le corps féminin et les fleurs m’inspirent. Mon travail évolue aujourd’hui vers un univers où la nature est au cœur des toiles. Amazoni, ma série en cours, est une immersion dans une végétation luxuriante où se mêlent femmes, animaux sauvages et feuillages : dix toiles qui ont chacune leur identité, reliées entre elles par des éléments visuels communs. La suite explore d’autres formats, triptyques et quadriptyques, avec un caméléon, un regard caché et des fleurs exotiques.",
    ],
    en: [
      "On my canvases, the paint has thickness. I work the texture with mediums and layered strokes: the layers overlap, the relief catches the light, and the painting changes with the time of day and the place you look at it from. It’s a visual experience, and almost a tactile one.",
      "Colour is at the heart of my work. Deep greens, pinks, reds, bold blues: I’m not after half-tones, I’m after energy.",
      "For several years, the female body and flowers have been my inspiration. My work is now moving towards a world where nature is at the heart of the canvas. Amazoni, my current series, is an immersion in lush vegetation where women, wild animals and foliage intertwine: ten paintings, each with its own identity, connected by shared visual elements. The next ones explore other formats, triptychs and quadriptychs, with a chameleon, a hidden gaze and exotic flowers.",
    ],
  } as L<string[]>,
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
    fr: "Mes toiles ont été montrées à Paris et en Maine-et-Loire. En 2023, le public du Salon des Arts de Jallais m’a décerné son prix. En novembre 2026, j’y reviens avec trois nouvelles toiles.",
    en: "My paintings have been shown in Paris and in Maine-et-Loire. In 2023, the public of the Salon des Arts in Jallais gave me its award. In November 2026, I’m back there with three new paintings.",
  } as L<string>,
  portraitAlt: {
    fr: "Laurine Girard de profil, pinceau et palette à la main, appuyée sur une toile vierge",
    en: "Laurine Girard in profile, brush and palette in hand, leaning on a blank canvas",
  } as L<string>,
  cvLabel: { fr: "Télécharger mon CV (PDF)", en: "Download my CV (PDF)" } as L<string>,
};
