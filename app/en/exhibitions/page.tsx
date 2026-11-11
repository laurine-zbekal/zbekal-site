import { ExhibitionsPage } from "@/components/pages/ExhibitionsPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "exhibitions",
          title: "Shows and news",
          description: "Zbekal’s exhibitions, art fairs and awards, in pictures: Paris, Jallais, Cugand. Coming up: Salon des Arts in Jallais, November 2026.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <ExhibitionsPage locale="en" />;
        }
