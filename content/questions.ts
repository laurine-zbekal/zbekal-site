/**
 * ──────────────────────────────────────────────────────────────────────────
 *  QUESTIONS FRÉQUENTES — bloc en bas de la page « Tarifs 2026 »
 * ──────────────────────────────────────────────────────────────────────────
 *  Les réponses reprennent les conditions de vente (CGV), les tarifs et la page carte cadeau.
 *  Elles sont aussi publiées pour Google et les assistants IA (schéma FAQPage) : une réponse
 *  modifiée ici est mise à jour partout. Pour ajouter une question : copie un bloc.
 *  Si un prix ou une condition change dans les CGV, pense à vérifier ces réponses.
 */
import type { Locale } from "./ui";

type L = Record<Locale, string>;

export type Question = { q: L; a: L };

export const questions = {
  title: { fr: "Tes questions", en: "Your questions" } as L,
  lead: {
    fr: "Ce qu’on me demande le plus souvent avant de commander une toile.",
    en: "What people ask me most often before ordering a painting.",
  } as L,
  items: [
    {
      q: { fr: "Combien coûte une toile sur commande ?", en: "How much does a commissioned painting cost?" },
      a: {
        fr: "400 € pour le format S (60 × 70 cm), 500 € pour le M (80 × 90 cm) et 600 € pour le L (100 × 100 cm). Plus grand, jusqu’à 130 cm de côté, ou un sujet très détaillé : je te fais un devis avant de commencer.",
        en: "€400 for size S (60 × 70 cm), €500 for M (80 × 90 cm) and €600 for L (100 × 100 cm). Larger, up to 130 cm a side, or a very detailed subject: I send you a quote before I start.",
      },
    },
    {
      q: { fr: "Comment se passe une commande ?", en: "How does a commission work?" },
      a: {
        fr: "Tu m’écris ton idée, le format, tes couleurs et la pièce où la toile sera accrochée. Je te réponds sous 48 heures avec une proposition. L’acompte de 30 % lance la commande, et je t’envoie une photo de la toile en cours pour que tu la valides avant la fin.",
        en: "You write to me with your idea, the size, your colours and the room where the painting will hang. I reply within 48 hours with a proposal. A 30% deposit starts the commission, and I send you a photo of the painting in progress so you can approve it before I finish.",
      },
    },
    {
      q: { fr: "Je peux choisir le sujet ?", en: "Can I choose the subject?" },
      a: {
        fr: "Oui. Beaucoup de mes toiles sont nées d’une commande : un mariage, une naissance, une première maison, un bouquet reçu. Tu me confies une histoire, des couleurs, parfois une photo, et j’en fais une toile qui ne ressemble qu’à toi.",
        en: "Yes. Many of my paintings began as a commission: a wedding, a birth, a first home, a bouquet received. You trust me with a story, some colours, sometimes a photo, and I turn it into a painting that looks like no one but you.",
      },
    },
    {
      q: { fr: "Combien de temps faut-il pour recevoir ma toile ?", en: "How long until I receive my painting?" },
      a: {
        fr: "Une toile déjà peinte part en général 2 à 3 semaines après le paiement. Une toile sur commande me demande 10 à 15 heures de travail, en couches épaisses qui doivent sécher : je te donne le délai avec le devis.",
        en: "An available painting usually leaves 2 to 3 weeks after payment. A commission takes me 10 to 15 hours of work, in thick layers that need to dry: I give you the timing with the quote.",
      },
    },
    {
      q: { fr: "Tu livres ?", en: "Do you deliver?" },
      a: {
        fr: "Oui. Je remets la toile en main propre à Angers, à Cholet, à Nantes et partout en Maine-et-Loire. Ailleurs, je l’envoie soigneusement emballée. Les frais d’envoi dépendent de la destination et du format, et ils sont toujours indiqués avant le paiement.",
        en: "Yes. I hand the painting over in person in Angers, Cholet, Nantes and anywhere in Maine-et-Loire. Elsewhere, I ship it carefully packed. Shipping costs depend on the destination and the size, and they are always shown before payment.",
      },
    },
    {
      q: { fr: "Comment je paie ?", en: "How do I pay?" },
      a: {
        fr: "Par carte bancaire, avec un lien de paiement sécurisé, ou par virement. Pour une toile disponible, elle t’est réservée 72 heures à partir de l’envoi du lien.",
        en: "By card, through a secure payment link, or by bank transfer. An available painting is held for you for 72 hours from when I send the link.",
      },
    },
    {
      q: { fr: "Ma toile est-elle vraiment unique ?", en: "Is my painting really one of a kind?" },
      a: {
        fr: "Oui. Je ne peins jamais deux fois la même toile. Chaque toile est signée et accompagnée de son certificat d’authenticité.",
        en: "Yes. I never paint the same canvas twice. Every painting is signed and comes with its certificate of authenticity.",
      },
    },
    {
      q: { fr: "Avec quoi tu peins ?", en: "What do you paint with?" },
      a: {
        fr: "À l’acrylique, posée en épaisseur pour donner du relief, avec des feuilles dorées et des perles. La lumière s’accroche à la matière : la toile n’est pas la même le matin et le soir.",
        en: "Acrylic, laid on thickly for relief, with golden leaf and beads. Light catches on the texture: the painting isn’t the same in the morning and in the evening.",
      },
    },
    {
      q: { fr: "Je peux offrir une toile ?", en: "Can I give a painting as a gift?" },
      a: {
        fr: "Oui, avec la carte cadeau : format S, M ou L, sans date limite. La personne choisit ensuite son sujet et ses couleurs avec moi.",
        en: "Yes, with the gift card: size S, M or L, with no expiry date. The recipient then chooses the subject and colours with me.",
      },
    },
    {
      q: { fr: "Et si la toile ne me plaît pas ?", en: "What if I don’t like the painting?" },
      a: {
        fr: "Pour une toile déjà peinte achetée à distance, tu as 14 jours après la livraison pour changer d’avis. Pour une toile sur commande, le droit de rétractation ne s’applique pas : c’est pour ça que je te montre la toile en cours avant de la terminer.",
        en: "For an available painting bought remotely, you have 14 days after delivery to change your mind. For a commission, the right of withdrawal doesn’t apply: that’s why I show you the painting in progress before I finish it.",
      },
    },
    {
      q: { fr: "Où voir tes toiles en vrai ?", en: "Where can I see your paintings in person?" },
      a: {
        fr: "Dans les salons et expositions de la région, autour d’Angers et de Cholet, comme le Salon des Arts de Jallais, où le public m’a remis son prix en 2023. Les prochaines dates sont sur la page Expos et sur Instagram, @zbekal.",
        en: "At art fairs and exhibitions in the region, around Angers and Cholet, like the Salon des Arts in Jallais, where the public gave me its award in 2023. Upcoming dates are on the Shows page and on Instagram, @zbekal.",
      },
    },
  ] as Question[],
};
