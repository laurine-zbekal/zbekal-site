import { HomePage } from "@/components/pages/HomePage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "home",
          title: { absolute: "Zbekal — Laurine Girard, artiste peintre à Chalonnes-sur-Loire" },
          description: "Laurine Girard, alias Zbekal, peint à l’acrylique des toiles en relief, à la feuille d’or et aux perles. Originaux disponibles, toiles sur commande, en Maine-et-Loire.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <HomePage locale="fr" />;
        }
