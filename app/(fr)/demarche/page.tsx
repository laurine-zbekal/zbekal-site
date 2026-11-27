import { AboutPage } from "@/components/pages/AboutPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "about",
          title: "Laurine Girard, artiste peintre : démarche et parcours",
          description: "Laurine Girard, alias Zbekal, artiste peintre à Chalonnes-sur-Loire, près d’Angers : une première toile en 2020, la matière, la couleur, la collection Amazoni, les inspirations et le parcours.",
          image: "/og/demarche.jpg",
});

        export default function Page() {
          return <AboutPage locale="fr" />;
        }
