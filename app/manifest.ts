import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.artist}`,
    short_name: site.name,
    description: site.tagline.fr,
    start_url: "/",
    display: "minimal-ui",
    background_color: "#ffffff",
    theme_color: "#D6336C",
    lang: "fr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
