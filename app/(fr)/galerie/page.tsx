import { GalleryPage } from "@/components/pages/GalleryPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "gallery",
          title: "Les toiles",
          description: "Toutes les toiles de Zbekal : la collection Amazoni, les bouquets, les mains, les corps. Originaux disponibles et créations sur commande.",
          image: "/og/galerie.jpg",
});

        export default function Page() {
          return <GalleryPage locale="fr" />;
        }
