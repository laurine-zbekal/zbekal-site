import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Zbekal — Laurine Girard, artiste peintre", template: `%s · ${site.name}` },
  description: "Laurine Girard, alias Zbekal, peint à l’acrylique des toiles en relief, à la feuille d’or et aux perles. Originaux disponibles, toiles sur commande, en Maine-et-Loire.",
  applicationName: site.name,
  authors: [{ name: site.artist, url: site.url }],
  creator: site.artist,
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: { siteName: site.name, type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D6336C",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="fr">{children}</SiteShell>;
}
