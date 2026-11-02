import { TermsPage } from "@/components/pages/TermsPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "terms",
          title: "Conditions générales de vente",
          description: "Conditions de vente des toiles originales et des commandes sur mesure de Zbekal.",
          noIndex: true,
});

        export default function Page() {
          return <TermsPage locale="fr" />;
        }
