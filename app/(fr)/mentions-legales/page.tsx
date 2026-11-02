import { LegalPage } from "@/components/pages/LegalPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "legal",
          title: "Mentions légales",
          description: "Mentions légales du site zbekal.fr.",
          noIndex: true,
});

        export default function Page() {
          return <LegalPage locale="fr" />;
        }
