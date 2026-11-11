import { LegalPage } from "@/components/pages/LegalPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "legal",
          title: "Legal notice",
          description: "Legal notice for zbekal.com.",
          noIndex: true,
});

        export default function Page() {
          return <LegalPage locale="en" />;
        }
