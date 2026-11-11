import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 : export statique (dossier out/) utilisé pour fabriquer un aperçu hors Vercel.
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
      // Le français est servi à la racine : /fr/... renvoie vers /...
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    if (preview) return [];
    return [
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
