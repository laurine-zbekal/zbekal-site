import { PrivacyPage } from "@/components/pages/PrivacyPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "privacy",
          title: "Privacy policy",
          description: "Personal data collected on zbekal.com and visitors' rights.",
          noIndex: true,
});

        export default function Page() {
          return <PrivacyPage locale="en" />;
        }
