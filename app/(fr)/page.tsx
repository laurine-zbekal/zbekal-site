import { HomePage } from "@/components/pages/HomePage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "home",
          title: { absolute: "Zbekal — Laurine Girard, artiste peintre près d’Angers" },
          description: "Laurine Girard, alias Zbekal, peint à Chalonnes-sur-Loire, près d’Angers, des toiles en relief aux feuilles dorées et aux perles. Originaux et tableaux sur mesure, remis en main propre à Angers, Cholet et Nantes.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <HomePage locale="fr" />;
        }
