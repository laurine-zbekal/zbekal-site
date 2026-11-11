import { GalleryPage } from "@/components/pages/GalleryPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "gallery",
          title: "The paintings",
          description: "All of Zbekal’s paintings: the Amazoni collection, bouquets, hands, bodies. Originals available, and paintings that can be repainted to order.",
          image: "/og/galerie.jpg",
});

        export default function Page() {
          return <GalleryPage locale="en" />;
        }
