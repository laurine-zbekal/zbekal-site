import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { site } from "@/content/site";
import { alternates, type RouteKey } from "@/lib/routes";
import { allArtworks, collectionsWithWorks } from "@/lib/content";

const abs = (p: string) => `${site.url}${p}`;

function entry(key: RouteKey, slug: string | undefined, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap {
  const alt = alternates(key, slug);
  const languages = { fr: abs(alt.fr), en: abs(alt.en), "x-default": abs(alt.fr) };
  return [
    { url: abs(alt.fr), lastModified: new Date(), changeFrequency, priority, alternates: { languages } },
    { url: abs(alt.en), lastModified: new Date(), changeFrequency, priority, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("home", undefined, 1, "weekly"),
    ...entry("gallery", undefined, 0.9, "weekly"),
    ...collectionsWithWorks().flatMap((c) => entry("collection", c.slug, 0.8, "weekly")),
    ...allArtworks().flatMap((a) => entry("artwork", a.slug, 0.8, "monthly")),
    ...entry("about", undefined, 0.7, "monthly"),
    ...entry("exhibitions", undefined, 0.6, "monthly"),
    ...entry("prices", undefined, 0.7, "monthly"),
    ...entry("contact", undefined, 0.6, "yearly"),
    ...entry("legal", undefined, 0.2, "yearly"),
    ...entry("privacy", undefined, 0.2, "yearly"),
    ...entry("terms", undefined, 0.2, "yearly"),
  ];
}
