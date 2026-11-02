import { HomePage } from "@/components/pages/HomePage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "home",
          title: { absolute: "Zbekal — Laurine Girard, painter in Maine-et-Loire, France" },
          description: "Laurine Girard, also known as Zbekal, paints textured acrylic canvases: the Amazoni collection, women, wild animals and foliage. Originals available and commissions.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <HomePage locale="en" />;
        }
