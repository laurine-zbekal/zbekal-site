import { AboutPage } from "@/components/pages/AboutPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "about",
          title: "Démarche, inspirations et parcours",
          description: "Laurine Girard, alias Zbekal, artiste peintre en Maine-et-Loire : la matière, la couleur, la collection Amazoni, les inspirations et le parcours.",
          image: "/og/demarche.jpg",
});

        export default function Page() {
          return <AboutPage locale="fr" />;
        }
