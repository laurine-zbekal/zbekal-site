/**
 * ──────────────────────────────────────────────────────────────────────────
 *  LES TOILES — fichier de contenu
 * ──────────────────────────────────────────────────────────────────────────
 *
 *  Pour ajouter une toile :
 *  1. Déposer les photos dans  public/oeuvres/<slug>/  (main.jpg = photo de
 *     face, detail-1.jpg, detail-2.jpg… = gros plans de la matière).
 *  2. Copier le bloc "MODÈLE" ci-dessous dans la liste `artworks`, à la
 *     place voulue (l’ordre de la liste = l’ordre d’affichage).
 *  3. Remplir les champs. Les champs marqués (optionnel) peuvent être omis.
 *
 *  MODÈLE :
 *  {
 *    slug: "mon-titre",                       // identifiant dans l’adresse : minuscules, tirets, sans accents
 *    title: "Mon titre",                      // titre original
 *    titleEn: "My title",                     // (optionnel) traduction affichée sur la version anglaise
 *    collection: "amazoni",                   // "amazoni" | "corps-feminin" | "fleurs" (voir collections.ts)
 *    year: 2026,                              // (optionnel)
 *    technique: { fr: "Acrylique sur toile", en: "Acrylic on canvas" },
 *    width: 80, height: 80,                   // en cm, largeur × hauteur de l’ensemble
 *    panels: 3,                               // (optionnel) 3 = triptyque, 4 = quadriptyque
 *    status: "disponible",                    // "disponible" | "vendue" | "reservee"
 *    price: 1200,                             // (optionnel) en euros TTC ; absent = « prix sur demande »
 *    images: ["/oeuvres/mon-titre/main.jpg", "/oeuvres/mon-titre/detail-1.jpg"],
 *    alt: { fr: "Description de l’image", en: "Image description" },
 *    description: { fr: "Deux phrases sur la toile.", en: "Two sentences about the piece." }, // (optionnel)
 *    featured: true,                          // (optionnel) mise en avant sur l’accueil
 *  },
 */

export type CollectionSlug = "amazoni" | "corps-feminin" | "fleurs";
export type ArtworkStatus = "disponible" | "vendue" | "reservee";

export type Artwork = {
  slug: string;
  title: string;
  titleEn?: string;
  collection: CollectionSlug;
  year?: number;
  technique: { fr: string; en: string };
  width: number;
  height: number;
  panels?: number;
  status: ArtworkStatus;
  price?: number;
  images: string[];
  alt: { fr: string; en: string };
  description?: { fr: string; en: string };
  featured?: boolean;
};

const acrylique = { fr: "Acrylique sur toile", en: "Acrylic on canvas" };

export const artworks: Artwork[] = [
  {
    slug: "la-femme-aux-perroquets",
    title: "La femme aux perroquets",
    titleEn: "The Woman with Parrots",
    collection: "amazoni",
    technique: acrylique,
    width: 97,
    height: 130,
    status: "disponible",
    // Photo provisoire : détail de la toile. À remplacer par la photo de face.
    images: ["/oeuvres/la-femme-aux-perroquets/main.jpg"],
    alt: {
      fr: "La femme aux perroquets : une chevelure noire ornée de fleurs, des perroquets rouge, orange et bleu, un feuillage vert sur fond rose",
      en: "The Woman with Parrots: black hair adorned with flowers, red, orange and blue parrots, green foliage on a pink background",
    },
    description: {
      fr: "Une femme aux cheveux noirs, des perroquets posés tout autour d’elle, un fond rose poudré et des feuillages qui l’enlacent. Le plus grand format de la série.",
      en: "A woman with black hair, parrots perched all around her, a powder-pink background and foliage wrapping around her. The largest piece in the series.",
    },
    featured: true,
  },
  {
    slug: "duo-colore",
    title: "Duo coloré",
    titleEn: "Colourful Duo",
    collection: "amazoni",
    technique: acrylique,
    width: 80,
    height: 80,
    status: "disponible",
    // Photo provisoire découpée dans une photo au chevalet. À remplacer par la photo de face.
    images: [
      "/oeuvres/duo-colore/main.jpg",
      "/oeuvres/duo-colore/detail-1.jpg",
      "/oeuvres/duo-colore/detail-2.jpg",
    ],
    alt: {
      fr: "Duo coloré : deux aras, l’un rouge et rose, l’autre bleu, posés sur des branches dorées dans un feuillage vert sombre",
      en: "Colourful Duo: two macaws, one red and pink, the other blue, perched on golden branches in dark green foliage",
    },
    description: {
      fr: "Deux aras face à face sur des branches dorées, dans un feuillage sombre travaillé en épaisseur. Le rouge et le bleu se répondent, la matière accroche la lumière.",
      en: "Two macaws face to face on golden branches, set in dark foliage painted thick. Red answers blue, and the texture catches the light.",
    },
    featured: true,
  },
  {
    slug: "maitre-silencieux",
    title: "Maître silencieux",
    titleEn: "Silent Master",
    collection: "amazoni",
    technique: acrylique,
    width: 100,
    height: 100,
    status: "disponible",
    // Photo provisoire : gros plan de la toile en image principale, vue entière en dernier.
    images: [
      "/oeuvres/maitre-silencieux/main.jpg",
      "/oeuvres/maitre-silencieux/detail-1.jpg",
      "/oeuvres/maitre-silencieux/detail-2.jpg",
      "/oeuvres/maitre-silencieux/detail-3.jpg",
    ],
    alt: {
      fr: "Maître silencieux : un jaguar aux yeux bleus entre des branches, des feuilles en relief et des oiseaux de paradis",
      en: "Silent Master: a blue-eyed jaguar among branches, textured leaves and birds of paradise",
    },
    description: {
      fr: "Un jaguar aux yeux bleus te regarde à travers les feuillages. Les taches sont posées en relief, les feuilles en épaisseur, quelques éclats dorés dans la fourrure.",
      en: "A blue-eyed jaguar watches you through the foliage. The spots are laid in relief, the leaves painted thick, with a few golden glints in the fur.",
    },
    featured: true,
  },
  {
    slug: "veilleur-perche",
    title: "Veilleur perché",
    titleEn: "Perched Watcher",
    collection: "amazoni",
    technique: acrylique,
    width: 90,
    height: 30,
    panels: 3,
    status: "disponible",
    images: [], // photos à venir
    alt: {
      fr: "Veilleur perché, triptyque de la collection Amazoni",
      en: "Perched Watcher, triptych from the Amazoni collection",
    },
    featured: true,
  },
  {
    slug: "toco-farouche",
    title: "Toco farouche",
    titleEn: "Wild Toco",
    collection: "amazoni",
    technique: acrylique,
    width: 80,
    height: 80,
    status: "disponible",
    images: [], // photos à venir
    alt: {
      fr: "Toco farouche, toile de la collection Amazoni",
      en: "Wild Toco, painting from the Amazoni collection",
    },
    featured: true,
  },
];
