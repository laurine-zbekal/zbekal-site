import { GiftCardPage } from "@/components/pages/GiftCardPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "fr",
  key: "gift",
  title: "Carte cadeau — offrir une toile sur mesure",
  description: "La carte cadeau Zbekal : offre une toile peinte sur mesure par Laurine Girard. Trois formats (S, M ou L), pas de date limite. La personne choisit son sujet et ses couleurs.",
  image: "/og/carte-cadeau.jpg",
});

export default function Page() {
  return <GiftCardPage locale="fr" />;
}
