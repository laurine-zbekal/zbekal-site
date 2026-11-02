import { TermsPage } from "@/components/pages/TermsPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "terms",
          title: "Terms of sale",
          description: "Terms of sale for Zbekal’s original paintings and commissions.",
          noIndex: true,
});

        export default function Page() {
          return <TermsPage locale="en" />;
        }
