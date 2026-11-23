import { ExhibitionsPage } from "@/components/pages/ExhibitionsPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "exhibitions",
          title: "Expositions et actualités",
          description: "Les expositions, salons et prix de Zbekal, en photos : Paris, Jallais.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <ExhibitionsPage locale="fr" />;
        }
