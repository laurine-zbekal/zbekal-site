import { PricesPage } from "@/components/pages/PricesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "fr",
  key: "prices",
  title: "Tableau sur mesure : tarifs 2026 des toiles sur commande",
  description: "Les tarifs 2026 de Zbekal pour une toile sur commande, par format : S 60 × 70 cm, M 80 × 90 cm, L 100 × 100 cm. Plus grand : sur devis, jusqu’à 130 cm de côté. Atelier près d’Angers, remise en main propre à Angers, Cholet et Nantes. Délais, livraison, paiement : les réponses aux questions fréquentes.",
  image: "/og/default.jpg",
});

export default function Page() {
  return <PricesPage locale="fr" />;
}
