import { HomePage } from "@/components/pages/HomePage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "home",
          title: { absolute: "Zbekal — Laurine Girard, artiste peintre en Maine-et-Loire" },
          description: "Laurine Girard, alias Zbekal, peint à l’acrylique des toiles en relief : la collection Amazoni, femmes, animaux sauvages et feuillages. Originaux disponibles et commandes sur mesure.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <HomePage locale="fr" />;
        }
