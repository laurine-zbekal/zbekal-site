import { ContactPage } from "@/components/pages/ContactPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "contact",
          title: "Contact et commande sur mesure",
          description: "Acquérir une toile de Zbekal, commander une œuvre sur mesure ou poser une question : réponse sous 48 h.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <ContactPage locale="fr" />;
        }
