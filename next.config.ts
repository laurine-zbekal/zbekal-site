import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 : export statique (dossier out/) utilisé pour fabriquer un aperçu privé, hors hébergeur.
const preview = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(preview ? { output: "export" as const, trailingSlash: false } : {}),
  images: preview
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
        qualities: [60, 75, 85],
        deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
        imageSizes: [96, 160, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30,
      },
  experimental: {
    // Deux « root layouts » (français à la racine, anglais sous /en) : la 404 globale
    // doit donc être définie dans app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    if (preview) return [];
    return [
      // zbekal.fr (avec ou sans www) renvoie vers zbekal.com, page pour page.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?zbekal\\.fr" }],
        destination: "https://zbekal.com/:path*",
        permanent: true,
      },
      // Le français est servi à la racine : /fr/... renvoie vers /...
      // « La femme aux perroquets » a été retirée du site le 19 novembre 2026 : ses anciennes adresses mènent à la collection.
      { source: "/oeuvre/la-femme-aux-perroquets", destination: "/collection/amazoni", permanent: false },
      { source: "/en/artwork/la-femme-aux-perroquets", destination: "/en/collection/amazoni", permanent: false },
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    if (preview) return [];
    return [
      // L’adresse provisoire de l’hébergeur (xxx.netlify.app) ne doit pas apparaître dans Google :
      // seul zbekal.com est référencé.
      {
        source: "/(.*)",
        has: [{ type: "host", value: ".*\\.netlify\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
