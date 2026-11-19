import { HomePage } from "@/components/pages/HomePage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "home",
          title: { absolute: "Zbekal — Laurine Girard, painter in Chalonnes-sur-Loire, France" },
          description: "Laurine Girard, also known as Zbekal, paints textured acrylic canvases with golden leaf and beads. Originals available and paintings made to order, from Maine-et-Loire, France.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <HomePage locale="en" />;
        }
