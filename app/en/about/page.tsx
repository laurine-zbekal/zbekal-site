import { AboutPage } from "@/components/pages/AboutPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "about",
          title: "Laurine Girard, painter: approach and journey",
          description: "Laurine Girard, also known as Zbekal, painter in Chalonnes-sur-Loire, France: a first canvas in 2020, texture, colour, the Amazoni collection, inspirations and journey.",
          image: "/og/demarche.jpg",
});

        export default function Page() {
          return <AboutPage locale="en" />;
        }
