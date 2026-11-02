import { ContactPage } from "@/components/pages/ContactPage";
        import { pageMetadata } from "@/lib/seo";

        export const metadata = pageMetadata({
          locale: "en",
          key: "contact",
          title: "Contact and commissions",
          description: "Buy a painting by Zbekal, commission a custom piece or ask a question: reply within 48 hours.",
          image: "/og/default.jpg",
});

        export default function Page() {
          return <ContactPage locale="en" />;
        }
