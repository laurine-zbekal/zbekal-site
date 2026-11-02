import { ExhibitionsPage } from "@/components/pages/ExhibitionsPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "exhibitions",
          title: "Expositions et actualités",
          description: "Les salons, expositions et prix de Zbekal, et les prochains rendez-vous : Salon des Arts de Jallais, novembre 2026.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <ExhibitionsPage locale="fr" />;
        }
