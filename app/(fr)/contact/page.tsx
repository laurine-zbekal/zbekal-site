import { ContactPage } from "@/components/pages/ContactPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "contact",
          title: "Contact et commande sur mesure",
          description: "Acquérir une toile de Zbekal, en faire repeindre une ou commander une création sur mesure : écris à Laurine, réponse sous 48 h.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <ContactPage locale="fr" />;
        }
