/**
 * ──────────────────────────────────────────────────────────────────────────
 *  LES TOILES — fichier de contenu
 * ──────────────────────────────────────────────────────────────────────────
 *
 *  Pour ajouter une toile :
 *  1. Déposer les photos dans  public/oeuvres/<slug>/  (main.jpg = photo
 *     principale, detail-1.jpg, detail-2.jpg… = gros plans, vues en situation).
 *  2. Copier le bloc "MODÈLE" ci-dessous dans la liste `artworks`, à la
 *     place voulue (l’ordre de la liste = l’ordre d’affichage).
 *  3. Remplir les champs. Les champs marqués (optionnel) peuvent être omis.
 *
 *  MODÈLE :
 *  {
 *    slug: "mon-titre",                       // identifiant dans l’adresse : minuscules, tirets, sans accents
 *    title: "Mon titre",                      // titre original
 *    titleEn: "My title",                     // (optionnel) traduction affichée sur la version anglaise
 *    collection: "amazoni",                   // "amazoni" | "fleurs" | "mains" | "corps" | "premieres-toiles" (voir collections.ts)
 *    year: 2026,                              // (optionnel)
 *    technique: acrylique,                    // ou { fr: "…", en: "…" }
 *    width: 80, height: 80,                   // (optionnel) en cm, largeur × hauteur, quand le format exact est connu
 *    size: { fr: "Format mini", en: "Mini format" }, // (optionnel) format en toutes lettres, remplace largeur × hauteur à l’affichage
 *    panels: 3,                               // (optionnel) 3 = triptyque, 4 = quadriptyque
 *    status: "disponible",                    // "disponible" = en stock · "sur-commande" = déjà partie, peut inspirer une nouvelle création · "reservee" · "vendue"
 *    price: 1200,                             // (optionnel) en euros TTC ; absent = « prix sur demande »
 *    images: imgs("mon-titre", 2),            // main.jpg + 2 détails ; ou la liste des chemins
 *    alt: { fr: "Description de l’image", en: "Image description" },
 *    description: { fr: "Deux phrases sur la toile.", en: "Two sentences about the piece." }, // (optionnel)
 *    featured: true,                          // (optionnel) mise en avant sur l’accueil
 *    frame: "1 / 1",                          // (optionnel) proportions de la vignette quand la photo n’est pas un cadrage serré de la toile
 *  },
 */

export type CollectionSlug = "amazoni" | "fleurs" | "mains" | "corps" | "premieres-toiles";
export type ArtworkStatus = "disponible" | "sur-commande" | "reservee" | "vendue";

type L = { fr: string; en: string };

export type Artwork = {
  slug: string;
  title: string;
  titleEn?: string;
  collection: CollectionSlug;
  year?: number;
  technique: L;
  /** Largeur et hauteur en cm, quand le format exact est connu */
  width?: number;
  height?: number;
  /** Format en toutes lettres (remplace largeur × hauteur à l’affichage) */
  size?: L;
  panels?: number;
  status: ArtworkStatus;
  price?: number;
  images: string[];
  alt: L;
  description?: L;
  featured?: boolean;
  /** Proportions de la vignette, ex. "4 / 5" (par défaut : celles de la toile si le format est connu) */
  frame?: string;
  /** Prix, distinction */
  award?: L;
};

const acrylique: L = { fr: "Acrylique sur toile", en: "Acrylic on canvas" };
const mixte: L = { fr: "Acrylique, feuille d’or et perles sur toile", en: "Acrylic, gold leaf and beads on canvas" };
const dorure: L = { fr: "Acrylique et feuille d’or sur toile", en: "Acrylic and gold leaf on canvas" };

/** main.jpg + n photos de détail */
function imgs(slug: string, details = 0): string[] {
  return [`/oeuvres/${slug}/main.jpg`, ...Array.from({ length: details }, (_, i) => `/oeuvres/${slug}/detail-${i + 1}.jpg`)];
}

/** Format tel qu’annoncé à la création de la toile, ex. cm("70 × 80") */
function cm(v: string): L {
  return { fr: `${v} cm`, en: `${v} cm` };
}

export const artworks: Artwork[] = [
  // ───────────────────────── AMAZONI (en stock) ─────────────────────────
  {
    slug: "la-femme-aux-perroquets",
    title: "La femme aux perroquets",
    titleEn: "The Woman with Parrots",
    collection: "amazoni",
    year: 2026,
    technique: mixte,
    width: 97,
    height: 130,
    status: "disponible",
    // price: 700, — prix prévu, masqué pour le moment : la fiche affiche « Prix sur demande »
    images: imgs("la-femme-aux-perroquets", 3),
    alt: {
      fr: "La femme aux perroquets : une femme de profil allongée dans un feuillage vert, quatre perroquets rouge, jaune et bleu posés sur elle",
      en: "The Woman with Parrots: a woman in profile lying in green foliage, four red, yellow and blue parrots perched on her",
    },
    description: {
      fr: "Une femme allongée dans les feuillages, quatre perroquets posés sur elle. C’est la première toile d’Amazoni, inspirée de Frida Kahlo, et le plus grand format de la série.",
      en: "A woman lying in the foliage, four parrots perched on her. The first Amazoni painting, inspired by Frida Kahlo, and the largest piece in the series.",
    },
    featured: true,
  },
  {
    slug: "maitre-silencieux",
    title: "Maître silencieux",
    titleEn: "Silent Master",
    collection: "amazoni",
    year: 2026,
    technique: mixte,
    width: 100,
    height: 100,
    status: "disponible",
    // price: 600, — prix prévu, masqué pour le moment : la fiche affiche « Prix sur demande »
    images: imgs("maitre-silencieux", 5),
    alt: {
      fr: "Maître silencieux : un jaguar aux yeux bleus entre des branches, des feuilles en relief et des oiseaux de paradis en perles",
      en: "Silent Master: a blue-eyed jaguar among branches, textured leaves and beaded birds of paradise",
    },
    description: {
      fr: "Un jaguar aux yeux bleus te fixe à travers les feuillages. Les taches sont posées en relief, les fleurs sont faites de perles, la fourrure garde quelques éclats de feuille d’or.",
      en: "A blue-eyed jaguar stares at you through the foliage. The spots are laid in relief, the flowers are made of beads, and the fur holds a few glints of gold leaf.",
    },
    featured: true,
  },
  {
    slug: "le-regard",
    title: "Le Regard",
    titleEn: "The Gaze",
    collection: "amazoni",
    year: 2026,
    technique: mixte,
    width: 60,
    height: 70,
    status: "disponible",
    // price: 400, — prix prévu, masqué pour le moment : la fiche affiche « Prix sur demande »
    images: imgs("le-regard", 4),
    frame: "7 / 10",
    alt: {
      fr: "Le Regard : un visage de femme à moitié caché par des feuilles vertes bordées de perles, un œil vert grand ouvert, une mèche noire et des branches rehaussées de feuille d’or",
      en: "The Gaze: a woman’s face half hidden by green leaves edged with beads, one wide-open green eye, a black strand of hair and branches highlighted with gold leaf",
    },
    description: {
      fr: "Un visage à moitié caché par les feuilles, un œil vert qui ne te lâche pas. Mon premier visage détaillé, et la deuxième toile de la collection.",
      en: "A face half hidden by leaves, a green eye that won’t let go of you. My first detailed face, and the second painting in the collection.",
    },
    featured: true,
  },
  {
    slug: "duo-colore",
    title: "Duo coloré",
    titleEn: "Colourful Duo",
    collection: "amazoni",
    year: 2026,
    technique: mixte,
    width: 80,
    height: 80,
    status: "disponible",
    // price: 480, — prix prévu, masqué pour le moment : la fiche affiche « Prix sur demande »
    images: imgs("duo-colore", 4),
    alt: {
      fr: "Duo coloré : deux aras, l’un rouge et rose, l’autre bleu, posés sur des branches dorées dans un feuillage vert sombre",
      en: "Colourful Duo: two macaws, one red and pink, the other blue, perched on golden branches in dark green foliage",
    },
    description: {
      fr: "Deux aras tête contre tête sur des branches à la feuille d’or, dans un feuillage sombre travaillé en épaisseur. Le rouge et le bleu se répondent, les perles accrochent la lumière.",
      en: "Two macaws head to head on gold-leaf branches, set in dark foliage painted thick. Red answers blue, and the beads catch the light.",
    },
    featured: true,
  },
  {
    slug: "toco-farouche",
    title: "Toco farouche",
    titleEn: "Wild Toco",
    collection: "amazoni",
    year: 2026,
    technique: mixte,
    width: 80,
    height: 80,
    status: "disponible",
    // price: 480, — prix prévu, masqué pour le moment : la fiche affiche « Prix sur demande »
    images: imgs("toco-farouche"),
    alt: {
      fr: "Toco farouche : un toucan au grand bec jaune et orange, plumage bleu, perché sur une branche dorée dans un feuillage sombre",
      en: "Wild Toco: a toucan with a large yellow and orange beak and blue plumage, perched on a golden branch in dark foliage",
    },
    description: {
      fr: "Un toucan toco au bec orange, perché sur une branche dorée. Le plumage est piqué de perles, les feuilles sont posées en épaisseur.",
      en: "A toco toucan with an orange beak, perched on a golden branch. The plumage is dotted with beads, the leaves are laid on thick.",
    },
    featured: true,
  },
  {
    slug: "veilleur-perche",
    title: "Veilleur perché",
    titleEn: "Perched Watcher",
    collection: "amazoni",
    year: 2026,
    technique: mixte,
    width: 94,
    height: 90,
    size: { fr: "Triptyque · 3 toiles de 30 × 90 cm", en: "Triptych · 3 canvases, 30 × 90 cm each" },
    panels: 3,
    status: "disponible",
    // price: 550, — prix prévu, masqué pour le moment : la fiche affiche « Prix sur demande »
    images: imgs("veilleur-perche", 1),
    frame: "1 / 1",
    alt: {
      fr: "Veilleur perché : un serpent aux taches dorées enroulé sur une branche, feuillage vert et fleurs rouges, sur trois toiles",
      en: "Perched Watcher: a snake with golden markings coiled on a branch, green foliage and red flowers, across three canvases",
    },
    description: {
      fr: "Un serpent aux taches dorées, enroulé sur sa branche, qui se déploie sur trois toiles. Feuille d’or, perles et fleurs rouges en relief.",
      en: "A snake with golden markings, coiled on its branch, unfolding across three canvases. Gold leaf, beads and red flowers in relief.",
    },
    featured: true,
  },

  // ───────────────────────── FLEURS ─────────────────────────
  {
    slug: "bouquet-d-ete",
    title: "Bouquet d’été",
    titleEn: "Summer Bouquet",
    collection: "fleurs",
    year: 2026,
    technique: acrylique,
    width: 60,
    height: 70,
    status: "disponible",
    price: 400,
    images: imgs("bouquet-d-ete", 5),
    alt: {
      fr: "Bouquet d’été : un bouquet rond multicolore noué d’un ruban bordeaux, tenu par une main, sur fond rose poudré",
      en: "Summer Bouquet: a round multicoloured bouquet tied with a burgundy ribbon, held by a hand, on a powder-pink background",
    },
    description: {
      fr: "Un bouquet rond et serré, noué d’un ruban bordeaux, sur fond rose poudré. Chaque fleur est posée en épaisseur, une à une.",
      en: "A tight, round bouquet tied with a burgundy ribbon on a powder-pink background. Every flower is laid on thick, one by one.",
    },
  },
  {
    slug: "douceur",
    title: "Douceur",
    titleEn: "Softness",
    collection: "fleurs",
    year: 2026,
    technique: acrylique,
    width: 60,
    height: 70,
    status: "disponible",
    price: 400,
    images: imgs("douceur", 7),
    alt: {
      fr: "Douceur : un bouquet champêtre rose, jaune et orange noué d’un ruban blanc, tenu par une main, sur fond vert sauge",
      en: "Softness: a pink, yellow and orange wildflower bouquet tied with a white ribbon, held by a hand, on a sage-green background",
    },
    description: {
      fr: "Un bouquet champêtre noué d’un ruban blanc, sur fond vert sauge. Des roses, des fleurs des champs et des brins dorés en relief.",
      en: "A wildflower bouquet tied with a white ribbon on a sage-green background. Roses, field flowers and golden sprigs in relief.",
    },
  },
  {
    slug: "eternel",
    title: "Éternel",
    titleEn: "Eternal",
    collection: "fleurs",
    year: 2026,
    technique: acrylique,
    width: 60,
    height: 70,
    status: "disponible",
    price: 400,
    images: imgs("eternel", 7),
    alt: {
      fr: "Éternel : un bouquet de roses blanches, roses et corail tenu par une main, sur fond bordeaux",
      en: "Eternal: a bouquet of white, pink and coral roses held by a hand, on a burgundy background",
    },
    description: {
      fr: "On m’a offert ce bouquet. Je l’ai trouvé si beau que je l’ai peint pour qu’il ne fane jamais. Fond bordeaux, fleurs en épaisseur, spirales dorées.",
      en: "Someone gave me this bouquet. I found it so beautiful that I painted it so it would never fade. Burgundy background, thick flowers, golden spirals.",
    },
  },
  {
    slug: "fleur-du-soleil",
    title: "Fleur du soleil",
    titleEn: "Sunflower",
    collection: "fleurs",
    year: 2026,
    technique: acrylique,
    width: 60,
    height: 70,
    status: "disponible",
    price: 400,
    images: imgs("fleur-du-soleil", 6),
    alt: {
      fr: "Fleur du soleil : un bouquet de tournesols tenu à bout de bras sur fond bleu ciel",
      en: "Sunflower: a bouquet of sunflowers held at arm’s length on a sky-blue background",
    },
    description: {
      fr: "Un bouquet de tournesols tendu à bout de bras, sur un bleu de plein été. Les pétales sont épais, presque sculptés.",
      en: "A bouquet of sunflowers held out at arm’s length against a midsummer blue. The petals are thick, almost sculpted.",
    },
  },
  {
    slug: "hanami",
    title: "Hanami",
    collection: "fleurs",
    year: 2025,
    technique: dorure,
    width: 60,
    height: 70,
    status: "disponible",
    price: 400,
    images: imgs("hanami", 5),
    alt: {
      fr: "Hanami : une main rehaussée de feuille d’or parmi des fleurs roses, sur fond bleu canard",
      en: "Hanami: a hand highlighted with gold leaf among pink blossoms, on a teal background",
    },
    description: {
      fr: "Une main rehaussée de feuille d’or parmi des fleurs roses, sur fond bleu canard. Hanami, c’est la fête japonaise qui célèbre les cerisiers en fleurs.",
      en: "A hand highlighted with gold leaf among pink blossoms, on a teal background. Hanami is the Japanese celebration of cherry trees in bloom.",
    },
  },
  {
    slug: "delicatesse",
    title: "Délicatesse",
    titleEn: "Delicacy",
    collection: "fleurs",
    year: 2025,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("delicatesse", 4),
    alt: {
      fr: "Délicatesse : un grand bouquet rouge, blanc et violet tenu par une main, sur fond vieux rose",
      en: "Delicacy: a large red, white and purple bouquet held by a hand, on a dusty-pink background",
    },
    description: {
      fr: "Mon premier bouquet, imaginé avec ma sœur : un grand format, un maximum de couleurs, un rendu chaleureux pour une pièce de vie.",
      en: "My first bouquet, imagined with my sister: a large format, as much colour as possible, a warm feel for a living room.",
    },
  },
  {
    slug: "union",
    title: "Union",
    collection: "fleurs",
    year: 2026,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("union", 5),
    alt: {
      fr: "Union : un bouquet bohème aux tons beige et bordeaux noué d’un ruban, tenu par une main portant une alliance",
      en: "Union: a bohemian bouquet in beige and burgundy tones tied with a ribbon, held by a hand wearing a wedding ring",
    },
    description: {
      fr: "Peinte pour de futurs mariés : un bouquet bohème dans les teintes de leur pièce de vie, avec leur alliance et la robe pailletée glissées dans le tableau.",
      en: "Painted for a couple about to marry: a bohemian bouquet in the colours of their living room, with their ring and the sparkling dress slipped into the picture.",
    },
  },
  {
    slug: "rose-et-soleil",
    title: "Rose & Soleil",
    titleEn: "Pink & Sun",
    collection: "fleurs",
    year: 2026,
    technique: acrylique,
    size: { fr: "Format mini", en: "Mini format" },
    status: "sur-commande",
    images: imgs("rose-et-soleil", 2),
    alt: {
      fr: "Rose & Soleil : un bouquet de gerberas roses et orange sur fond rose pâle",
      en: "Pink & Sun: a bouquet of pink and orange gerberas on a pale pink background",
    },
    description: {
      fr: "Un format mini peint sur commande, pour un cadeau : ses fleurs préférées, les gerberas, dans ses couleurs, le rose et l’orange.",
      en: "A mini format painted to order, as a gift: her favourite flowers, gerberas, in her colours, pink and orange.",
    },
  },
  {
    slug: "eclat-de-printemps",
    title: "Éclat de printemps",
    titleEn: "Burst of Spring",
    collection: "fleurs",
    year: 2026,
    technique: acrylique,
    size: { fr: "Format mini", en: "Mini format" },
    status: "sur-commande",
    images: imgs("eclat-de-printemps", 4),
    alt: {
      fr: "Éclat de printemps : un bouquet de tulipes roses tenu par une main, sur fond jaune vif",
      en: "Burst of Spring: a bouquet of pink tulips held by a hand, on a bright yellow background",
    },
    description: {
      fr: "Un format mini, coloré, aux notes d’été : des tulipes roses sur un jaune franc.",
      en: "A colourful mini format with a hint of summer: pink tulips on a bold yellow.",
    },
  },
  {
    slug: "plaisir-d-offrir",
    title: "Plaisir d’offrir",
    titleEn: "The Joy of Giving",
    collection: "fleurs",
    year: 2025,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("plaisir-d-offrir"),
    alt: {
      fr: "Plaisir d’offrir : deux mains qui se transmettent un bouquet multicolore, sur fond kaki",
      en: "The Joy of Giving: two hands passing a multicoloured bouquet, on a khaki background",
    },
    description: {
      fr: "La toile de mon concours de Noël 2025, composée d’après les votes de ma communauté sur Instagram, puis offerte par tirage au sort.",
      en: "The painting from my 2025 Christmas giveaway, designed from my Instagram community’s votes, then given away in a prize draw.",
    },
  },
  {
    slug: "la-sagesse-des-fleurs",
    title: "La sagesse des fleurs",
    titleEn: "The Wisdom of Flowers",
    collection: "fleurs",
    year: 2025,
    technique: dorure,
    status: "sur-commande",
    images: imgs("la-sagesse-des-fleurs"),
    alt: {
      fr: "La sagesse des fleurs : trois magnolias blancs sur une branche dorée, fond bordeaux",
      en: "The Wisdom of Flowers: three white magnolias on a golden branch, burgundy background",
    },
    description: {
      fr: "Trois magnolias blancs sur une branche à la feuille d’or, fond bordeaux. Une toile aux airs de Sud-Ouest.",
      en: "Three white magnolias on a gold-leaf branch against burgundy. A painting with a touch of south-west France.",
    },
  },
  {
    slug: "petales-de-vie",
    title: "Pétales de vie",
    titleEn: "Petals of Life",
    collection: "fleurs",
    year: 2024,
    technique: dorure,
    panels: 4,
    size: { fr: "Quadriptyque", en: "Quadriptych" },
    status: "sur-commande",
    images: imgs("petales-de-vie"),
    alt: {
      fr: "Pétales de vie : Laurine peint un quadriptyque aux tons terracotta, un corps et des fleurs roses",
      en: "Petals of Life: Laurine painting a quadriptych in terracotta tones, a body and pink flowers",
    },
    description: {
      fr: "Quatre toiles qui n’en font qu’une : un corps et des fleurs roses, dans des tons terracotta. La toile de mon concours de Noël 2024.",
      en: "Four canvases that make one: a body and pink flowers in terracotta tones. The painting from my 2024 Christmas giveaway.",
    },
  },

  // ───────────────────────── MAINS ─────────────────────────
  {
    slug: "retiens-moi",
    title: "Retiens-moi",
    titleEn: "Hold Me Back",
    collection: "mains",
    year: 2026,
    technique: dorure,
    status: "sur-commande",
    images: imgs("retiens-moi", 4),
    alt: {
      fr: "Retiens-moi : une main argentée descend vers une main rehaussée de feuille d’or, fond kaki, cadre en bois foncé",
      en: "Hold Me Back: a silver hand reaching down to a hand highlighted with gold leaf, khaki background, dark wooden frame",
    },
    description: {
      fr: "Une main argentée descend vers une main dorée à la feuille, sur un vert kaki. Le cadre en bois foncé répond au mobilier de la pièce.",
      en: "A silver hand reaches down to a gold-leafed one, on khaki green. The dark wooden frame echoes the furniture of the room.",
    },
  },
  {
    slug: "a-travers-nos-mains",
    title: "À travers nos mains",
    titleEn: "Through Our Hands",
    collection: "mains",
    year: 2025,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("a-travers-nos-mains", 4),
    alt: {
      fr: "À travers nos mains : deux mains qui se tendent l’une vers l’autre sur fond bleu, la toile est tenue par Laurine devant une baie vitrée",
      en: "Through Our Hands: two hands reaching for each other on a blue background, the canvas held by Laurine in front of a window",
    },
    description: {
      fr: "D’habitude, je peins sans modèle. Ici, ce sont de vraies mains : celles d’un couple lié par des années de vie partagée.",
      en: "I usually paint without a model. Here, the hands are real: those of a couple bound by years of shared life.",
    },
  },
  {
    slug: "attraction",
    title: "Attraction",
    collection: "mains",
    year: 2023,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("attraction", 1),
    alt: {
      fr: "Attraction : deux poings face à face, l’un argenté, l’autre cuivré, reliés par une traînée d’étoiles sur fond bleu nuit",
      en: "Attraction: two fists facing each other, one silver, one copper, linked by a trail of stars on a midnight-blue background",
    },
    description: {
      fr: "Deux poings face à face, l’un argenté, l’autre cuivré. Entre eux, une traînée d’étoiles sur un bleu de nuit.",
      en: "Two fists face to face, one silver, one copper. Between them, a trail of stars on a night blue.",
    },
  },
  {
    slug: "a-deux-mains",
    title: "À deux mains",
    titleEn: "With Both Hands",
    collection: "mains",
    year: 2023,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("a-deux-mains"),
    alt: {
      fr: "À deux mains : deux mains enlacées aux reflets cuivrés sur un ciel étoilé bleu nuit",
      en: "With Both Hands: two entwined hands with copper highlights on a starry midnight-blue sky",
    },
    description: {
      fr: "Deux mains enlacées, cuivre et bronze, sur un ciel étoilé. Une toile peinte pour un mariage.",
      en: "Two entwined hands, copper and bronze, on a starry sky. A painting made for a wedding.",
    },
  },
  {
    slug: "fusion",
    title: "Fusion",
    collection: "mains",
    year: 2023,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("fusion", 3),
    alt: {
      fr: "Fusion : deux mains qui se frôlent, l’une cuivrée, l’autre bleu pâle, sur fond bleu nuit",
      en: "Fusion: two hands brushing against each other, one copper, one pale blue, on a midnight-blue background",
    },
    description: {
      fr: "Deux mains qui se rejoignent, bleu nuit et cuivre. La première toile de ma série sur l’amour, primée par le public du Salon des Arts de Jallais.",
      en: "Two hands meeting, midnight blue and copper. The first painting in my series on love, awarded by the public at the Salon des Arts in Jallais.",
    },
    award: { fr: "Prix du public, Salon des Arts de Jallais 2023", en: "Audience award, Salon des Arts, Jallais 2023" },
  },
  {
    slug: "petit-havre-de-paix",
    title: "Petit havre de paix",
    titleEn: "Little Haven of Peace",
    collection: "mains",
    year: 2024,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("petit-havre-de-paix", 1),
    frame: "1 / 1",
    alt: {
      fr: "Petit havre de paix : deux mains nouées, grise et cuivrée, sur un fond noir étoilé",
      en: "Little Haven of Peace: two clasped hands, grey and copper, on a starry black background",
    },
    description: {
      fr: "Deux mains nouées sur un ciel de nuit, offertes à deux proches pour leur premier chez-eux.",
      en: "Two clasped hands on a night sky, given to two loved ones for their first home.",
    },
  },

  // ───────────────────────── CORPS ─────────────────────────
  {
    slug: "regarde-moi",
    title: "Regarde-moi",
    titleEn: "Look at Me",
    collection: "corps",
    year: 2025,
    technique: dorure,
    status: "sur-commande",
    images: imgs("regarde-moi"),
    alt: {
      fr: "Regarde-moi : un dos féminin en courbes beige et brun rehaussées de feuille d’or, sur fond bleu nuit",
      en: "Look at Me: a woman’s back in beige and brown curves highlighted with gold leaf, on a midnight-blue background",
    },
    description: {
      fr: "Des courbes féminines, douces et sensuelles. Pensée pour un intérieur industriel, elle joue avec la lumière grâce à ses touches de feuille d’or.",
      en: "Feminine curves, soft and sensual. Designed for an industrial interior, it plays with the light through its touches of gold leaf.",
    },
  },
  {
    slug: "carmin",
    title: "Carmin",
    titleEn: "Carmine",
    collection: "corps",
    year: 2023,
    technique: dorure,
    panels: 3,
    size: { fr: "Triptyque", en: "Triptych" },
    status: "sur-commande",
    images: imgs("carmin", 3),
    alt: {
      fr: "Carmin : triptyque rouge, une silhouette allongée grise et dorée sous un croissant de lune",
      en: "Carmine: a red triptych, a reclining grey and gold figure under a crescent moon",
    },
    description: {
      fr: "Une silhouette allongée sous un croissant de lune, répartie sur trois toiles rouges. Les rehauts sont à la feuille d’or.",
      en: "A reclining figure under a crescent moon, spread across three red canvases. The highlights are in gold leaf.",
    },
  },
  {
    slug: "nous",
    title: "Nous",
    titleEn: "Us",
    collection: "corps",
    year: 2025,
    technique: dorure,
    status: "sur-commande",
    images: imgs("nous", 3),
    frame: "1 / 1",
    alt: {
      fr: "Nous : deux corps enlacés, blanc et bleu pâle, sur fond bleu nuit étoilé",
      en: "Us: two entwined bodies, white and pale blue, on a starry midnight-blue background",
    },
    description: {
      fr: "Deux corps enlacés sur un ciel de nuit. Une toile qui parle d’amour, de passion et de tendresse.",
      en: "Two bodies entwined on a night sky. A painting about love, passion and tenderness.",
    },
  },
  {
    slug: "tendrement",
    title: "Tendrement",
    titleEn: "Tenderly",
    collection: "corps",
    year: 2025,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("tendrement", 4),
    alt: {
      fr: "Tendrement : gros plan sur des mains posées sur un corps, tons beige, gris et cuivre sur fond bleu",
      en: "Tenderly: close-up of hands resting on a body, in beige, grey and copper tones on a blue background",
    },
    description: {
      fr: "L’amour et la tendresse entre deux âmes amoureuses. Beaucoup d’heures de travail dans ces mains-là.",
      en: "The love and tenderness between two souls in love. A great many hours went into those hands.",
    },
  },
  {
    slug: "au-fil-des-branches",
    title: "Au fil des branches",
    titleEn: "Along the Branches",
    collection: "corps",
    year: 2024,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("au-fil-des-branches", 2),
    alt: {
      fr: "Au fil des branches : un corps féminin en gris et blanc traversé de branches d’oranger, fond rose",
      en: "Along the Branches: a female body in grey and white crossed by orange-tree branches, pink background",
    },
    description: {
      fr: "La commande tenait en trois mots : un corps, du orange, du rose. Le format fait écho à mes toutes premières toiles, qui mêlaient déjà fruits et corps.",
      en: "The brief was three words: a body, orange, pink. The format echoes my very first paintings, which already mixed fruit and bodies.",
    },
  },
  {
    slug: "ames-reunies",
    title: "Âmes réunies",
    titleEn: "Souls Together",
    collection: "corps",
    year: 2024,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("ames-reunies", 5),
    alt: {
      fr: "Âmes réunies : une femme enceinte de profil, cheveux ornés de feuilles rouges, sur fond vert profond étoilé",
      en: "Souls Together: a pregnant woman in profile, her hair adorned with red leaves, on a deep green starry background",
    },
    description: {
      fr: "Une femme enceinte, sur un vert profond : une commande pour célébrer l’attente, accordée aux couleurs de son salon.",
      en: "A pregnant woman on deep green: a commission celebrating the wait, matched to the colours of her living room.",
    },
  },
  {
    slug: "aime-moi",
    title: "Aime-moi",
    titleEn: "Love Me",
    collection: "corps",
    year: 2024,
    technique: acrylique,
    size: { fr: "Format miniature", en: "Miniature format" },
    status: "sur-commande",
    images: imgs("aime-moi", 3),
    alt: {
      fr: "Aime-moi : un buste féminin en rose et prune avec des paillettes, toile miniature tenue à la main",
      en: "Love Me: a female torso in pink and plum with glitter, a miniature canvas held in one hand",
    },
    description: {
      fr: "Un format miniature : un corps en rose et prune, des touches fluo et des paillettes.",
      en: "A miniature format: a body in pink and plum, with neon touches and glitter.",
    },
  },
  {
    slug: "fission",
    title: "Fission",
    collection: "corps",
    year: 2023,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("fission", 1),
    alt: {
      fr: "Fission : un buste féminin zébré de noir et de gris sur fond bleu pailleté",
      en: "Fission: a female torso striped in black and grey on a glittering blue background",
    },
    description: {
      fr: "La deuxième toile de ma série sur l’amour, montrée au Salon des Arts de Jallais en 2023 : un corps zébré sur un bleu pailleté.",
      en: "The second painting in my series on love, shown at the Salon des Arts in Jallais in 2023: a striped body on glittering blue.",
    },
  },
  {
    slug: "constellation",
    title: "Constellation",
    collection: "corps",
    year: 2024,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("constellation", 1),
    alt: {
      fr: "Constellation : un corps de dos en cuivre, gris et blanc sur un ciel noir étoilé",
      en: "Constellation: a figure seen from behind in copper, grey and white on a starry black sky",
    },
    description: {
      fr: "Un corps de dos, cuivre, gris et blanc, posé sur un ciel noir piqué d’étoiles.",
      en: "A figure seen from behind, in copper, grey and white, set against a black sky dotted with stars.",
    },
  },

  // ───────────────────────── PREMIÈRES TOILES ─────────────────────────
  {
    slug: "regard-profond",
    title: "Regard profond",
    titleEn: "Deep Gaze",
    collection: "premieres-toiles",
    year: 2024,
    technique: acrylique,
    size: cm("90 × 80"),
    status: "sur-commande",
    images: imgs("regard-profond", 3),
    alt: { fr: "Regard profond : un œil en très gros plan, iris bleu sombre et touches rouges", en: "Deep Gaze: an eye in extreme close-up, dark blue iris and red touches" },
    description: {
      fr: "Mon premier œil sur toile. Avant de dessiner des corps, c’étaient les yeux qui remplissaient mes carnets du lycée.",
      en: "My first eye on canvas. Before I drew bodies, eyes were what filled my school sketchbooks.",
    },
  },
  {
    slug: "eclats-d-azur",
    title: "Éclats d’azur",
    titleEn: "Glints of Azure",
    collection: "premieres-toiles",
    year: 2023,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("eclats-d-azur", 1),
    alt: { fr: "Éclats d’azur : un buste gris pailleté, touches jaunes et bleues, sur fond bleu nuit", en: "Glints of Azure: a glittering grey torso with yellow and blue touches on a midnight-blue background" },
    description: {
      fr: "« Sous le soleil d’or, l’océan danse en mille éclats d’azur. » Un buste pailleté, des touches de jaune et de bleu sur fond nuit.",
      en: "“Under the golden sun, the ocean dances in a thousand glints of azure.” A glittering torso, touches of yellow and blue on a night-dark background.",
    },
  },
  {
    slug: "leona",
    title: "Leona",
    collection: "premieres-toiles",
    year: 2023,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("leona"),
    alt: { fr: "Leona : un lion de profil, crinière en rouges et ors, sur fond noir étoilé", en: "Leona: a lion in profile, its mane in reds and golds, on a starry black background" },
    description: { fr: "Changement d’ambiance : un lion à la crinière rouge et or, pour une commande pas comme les autres.", en: "A change of mood: a lion with a red and gold mane, for a commission unlike any other." },
  },
  {
    slug: "astre",
    title: "Astre",
    titleEn: "Star",
    collection: "premieres-toiles",
    year: 2023,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("astre"),
    alt: { fr: "Astre : un buste féminin en bruns et beiges, bras croisés, sur fond noir", en: "Star: a female torso in browns and beiges, arms crossed, on a black background" },
  },
  {
    slug: "tendresse",
    title: "Tendresse",
    titleEn: "Tenderness",
    collection: "premieres-toiles",
    year: 2023,
    technique: acrylique,
    size: cm("70 × 80"),
    status: "sur-commande",
    images: imgs("tendresse"),
    alt: { fr: "Tendresse : un corps féminin en beige et blanc, les mains posées sur la poitrine, sur fond noir et bordeaux", en: "Tenderness: a female body in beige and white, hands resting on her chest, on a black and burgundy background" },
  },
  {
    slug: "pauline",
    title: "Pauline",
    collection: "premieres-toiles",
    year: 2023,
    technique: acrylique,
    size: cm("90 × 75"),
    status: "sur-commande",
    images: imgs("pauline"),
    alt: { fr: "Pauline : un corps féminin en beige, brun et bordeaux, parsemé de feuilles dorées, sur fond noir", en: "Pauline: a female body in beige, brown and burgundy, scattered with golden leaves, on a black background" },
  },
  {
    slug: "sevda",
    title: "Sevda",
    collection: "premieres-toiles",
    year: 2023,
    technique: acrylique,
    size: cm("70 × 80"),
    status: "sur-commande",
    images: imgs("sevda", 1),
    alt: { fr: "Sevda : un couple enlacé, blanc et bleu, sur fond noir étoilé", en: "Sevda: an embracing couple in white and blue on a starry black background" },
  },
  {
    slug: "leonie-2023",
    title: "Léonie",
    collection: "premieres-toiles",
    year: 2023,
    technique: acrylique,
    size: cm("70 × 80"),
    status: "sur-commande",
    images: imgs("leonie-2023"),
    alt: { fr: "Léonie (2023) : un buste féminin beige et doré sur un fond de volutes roses", en: "Léonie (2023): a beige and gold female torso on a background of pink swirls" },
  },
  {
    slug: "nebuleuse",
    title: "Nébuleuse",
    titleEn: "Nebula",
    collection: "premieres-toiles",
    year: 2022,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("nebuleuse"),
    alt: { fr: "Nébuleuse : une silhouette féminine blanche cernée de bleu sur fond noir étoilé", en: "Nebula: a white female silhouette outlined in blue on a starry black background" },
    description: { fr: "La toile de mon concours de Noël 2022.", en: "The painting from my 2022 Christmas giveaway." },
  },
  {
    slug: "ame-sauvee",
    title: "Âme sauvée",
    titleEn: "Saved Soul",
    collection: "premieres-toiles",
    year: 2022,
    technique: dorure,
    size: cm("90 × 90"),
    status: "sur-commande",
    images: imgs("ame-sauvee"),
    alt: { fr: "Âme sauvée : Laurine, de dos, tient une toile rouge où se dessine un corps beige rehaussé d’or", en: "Saved Soul: Laurine, seen from behind, holding a red canvas with a beige body highlighted in gold" },
    description: { fr: "Ma première toile exposée : Paris, juin 2022.", en: "My first exhibited painting: Paris, June 2022." },
  },
  {
    slug: "golden",
    title: "Golden",
    collection: "premieres-toiles",
    year: 2022,
    technique: { fr: "Acrylique et copeaux dorés sur toile", en: "Acrylic and gold flakes on canvas" },
    size: cm("73 × 54"),
    status: "sur-commande",
    images: imgs("golden"),
    alt: { fr: "Golden : un buste féminin en beige, noir et copeaux cuivrés sur fond bordeaux", en: "Golden: a female torso in beige, black and copper flakes on a burgundy background" },
  },
  {
    slug: "miskinope",
    title: "Miskinope",
    collection: "premieres-toiles",
    year: 2022,
    technique: acrylique,
    size: cm("75 × 90"),
    status: "sur-commande",
    images: imgs("miskinope"),
    alt: { fr: "Miskinope : un corps en noir, blanc et bleu pâle traversé de branches de citronnier, fond bleu roi", en: "Miskinope: a body in black, white and pale blue crossed by lemon-tree branches, royal-blue background" },
  },
  {
    slug: "automne",
    title: "Automne",
    titleEn: "Autumn",
    collection: "premieres-toiles",
    year: 2022,
    technique: acrylique,
    size: cm("54 × 73"),
    status: "sur-commande",
    images: imgs("automne"),
    alt: { fr: "Automne : un buste féminin en orange, bordeaux et beige sur fond noir", en: "Autumn: a female torso in orange, burgundy and beige on a black background" },
  },
  {
    slug: "illuminee",
    title: "Illuminée",
    titleEn: "Illuminated",
    collection: "premieres-toiles",
    year: 2021,
    technique: dorure,
    size: cm("54 × 73"),
    status: "sur-commande",
    images: imgs("illuminee"),
    alt: { fr: "Illuminée : un buste féminin beige et doré sur fond bordeaux", en: "Illuminated: a beige and gold female torso on a burgundy background" },
    description: { fr: "La toile de mon tout premier concours de Noël, en 2021.", en: "The painting from my very first Christmas giveaway, in 2021." },
  },
  {
    slug: "lena",
    title: "Léna",
    collection: "premieres-toiles",
    year: 2021,
    technique: acrylique,
    size: cm("70 × 60"),
    status: "sur-commande",
    images: imgs("lena", 2),
    alt: { fr: "Léna : un buste féminin zébré de noir et de gris, des grappes de raisin vert, fond bleu gris", en: "Léna: a female torso striped in black and grey, bunches of green grapes, blue-grey background" },
  },
  {
    slug: "abstraction",
    title: "Abstraction",
    collection: "premieres-toiles",
    year: 2021,
    technique: acrylique,
    size: cm("54 × 73"),
    status: "sur-commande",
    images: imgs("abstraction"),
    alt: { fr: "Abstraction : une toile abstraite en éclaboussures bleues, orange, blanches et violettes", en: "Abstraction: an abstract canvas in blue, orange, white and purple splashes" },
  },
  {
    slug: "peaches",
    title: "Peaches",
    collection: "premieres-toiles",
    year: 2021,
    technique: acrylique,
    size: cm("60 × 80"),
    status: "sur-commande",
    images: imgs("peaches", 1),
    alt: { fr: "Peaches : un buste féminin zébré de noir et de gris, des pêches en relief, fond lilas", en: "Peaches: a female torso striped in black and grey, peaches in relief, lilac background" },
  },
  {
    slug: "leonie-2021",
    title: "Léonie",
    collection: "premieres-toiles",
    year: 2021,
    technique: acrylique,
    size: cm("60 × 70"),
    status: "sur-commande",
    images: imgs("leonie-2021", 1),
    frame: "1 / 1",
    alt: { fr: "Léonie (2021) : un corps féminin en noir, gris et rose sur fond framboise", en: "Léonie (2021): a female body in black, grey and pink on a raspberry background" },
  },
  {
    slug: "envie-d-ete",
    title: "Envie d’été",
    titleEn: "Longing for Summer",
    collection: "premieres-toiles",
    year: 2021,
    technique: acrylique,
    size: cm("70 × 80"),
    status: "sur-commande",
    images: imgs("envie-d-ete"),
    frame: "1 / 1",
    alt: { fr: "Envie d’été : un corps en gris et blanc, des citrons jaunes, fond bleu roi", en: "Longing for Summer: a body in grey and white, yellow lemons, royal-blue background" },
  },
  {
    slug: "gouvernante-de-la-bourgeonniere",
    title: "Gouvernante de la Bourgeonnière",
    titleEn: "The Governess of La Bourgeonnière",
    collection: "premieres-toiles",
    year: 2020,
    technique: acrylique,
    status: "sur-commande",
    images: imgs("gouvernante-de-la-bourgeonniere", 1),
    alt: { fr: "Gouvernante de la Bourgeonnière : Laurine, de dos, peint un portrait de femme aux cheveux bouclés sur fond rose", en: "The Governess of La Bourgeonnière: Laurine, from behind, painting a portrait of a woman with curly hair on a pink background" },
    description: { fr: "L’une de mes toutes premières toiles, en 2020 : un portrait, au couteau et en couleurs.", en: "One of my very first paintings, in 2020: a portrait, in palette knife and colour." },
  },
];
