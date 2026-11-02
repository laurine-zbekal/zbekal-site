import { AboutPage } from "@/components/pages/AboutPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "about",
          title: "Approach, inspirations and journey",
          description: "Laurine Girard, also known as Zbekal, painter in Maine-et-Loire, France: texture, colour, the Amazoni collection, inspirations and journey.",
          image: "/og/demarche.jpg",
});

        export default function Page() {
          return <AboutPage locale="en" />;
        }
