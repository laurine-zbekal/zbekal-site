import { GalleryPage } from "@/components/pages/GalleryPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "gallery",
          title: "Les toiles",
          description: "Toutes les toiles de Zbekal : la collection Amazoni et les originaux disponibles à l’achat. Acrylique sur toile, peinture en relief.",
          image: "/og/galerie.jpg",
});

        export default function Page() {
          return <GalleryPage locale="fr" />;
        }
