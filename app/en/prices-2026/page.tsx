import { PricesPage } from "@/components/pages/PricesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  key: "prices",
  title: "Prices 2026 — commissioned paintings",
  description: "Zbekal’s 2026 prices for a commissioned painting, by size: S 60 × 70 cm, M 80 × 90 cm, L 100 × 100 cm. Larger sizes on quote, up to 130 cm a side. And why a hand-painted canvas costs more than a décor-store print.",
  image: "/og/default.jpg",
});

export default function Page() {
  return <PricesPage locale="en" />;
}
