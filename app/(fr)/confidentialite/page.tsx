import { PrivacyPage } from "@/components/pages/PrivacyPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "privacy",
          title: "Politique de confidentialité",
          description: "Données personnelles collectées sur zbekal.com et droits des visiteurs.",
          noIndex: true,
});

        export default function Page() {
          return <PrivacyPage locale="fr" />;
        }
