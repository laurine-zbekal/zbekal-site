import { ContactPage } from "@/components/pages/ContactPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "fr",
          key: "contact",
          title: "Contact et commande sur mesure",
          description: "Acquérir une toile de Zbekal ou commander un tableau sur mesure, unique : écris à Laurine, réponse sous 48 h. Atelier près d’Angers, remise en main propre à Angers, Cholet et Nantes.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <ContactPage locale="fr" />;
        }
