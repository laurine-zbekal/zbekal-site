import { PricesPage } from "@/components/pages/PricesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "fr",
  key: "prices",
  title: "Tarifs 2026 — toiles sur commande",
  description: "Les tarifs 2026 de Zbekal pour une toile sur commande, par format : S 60 × 70 cm, M 80 × 90 cm, L 100 × 100 cm et sept autres. Des prix d’artiste en début de carrière, expliqués simplement.",
  image: "/og/default.jpg",
});

export default function Page() {
  return <PricesPage locale="fr" />;
}
