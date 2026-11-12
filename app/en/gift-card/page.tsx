import { GiftCardPage } from "@/components/pages/GiftCardPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  key: "gift",
  title: "Gift card — give a made-to-order painting",
  description: "The Zbekal gift card: give a painting made to order by Laurine Girard. Three sizes (S, M or L), no expiry date. The person chooses their subject and colours.",
  image: "/og/carte-cadeau.jpg",
});

export default function Page() {
  return <GiftCardPage locale="en" />;
}
