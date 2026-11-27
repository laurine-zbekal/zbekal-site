import { HomePage } from "@/components/pages/HomePage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "home",
          title: { absolute: "Zbekal — Laurine Girard, painter near Angers, France" },
          description: "Laurine Girard, also known as Zbekal, paints textured acrylic canvases with golden leaf and beads. Originals available and paintings made to order, from Chalonnes-sur-Loire, near Angers, France.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <HomePage locale="en" />;
        }
