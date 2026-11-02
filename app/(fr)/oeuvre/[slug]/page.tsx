import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkPage } from "@/components/pages/ArtworkPage";
import { allArtworks, getArtwork, specLine, titleOf } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return allArtworks().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArtwork(slug);
  if (!a) return {};
  const { title, subtitle } = titleOf(a, "fr");
  const name = subtitle ? `${title} (${subtitle})` : title;
  return pageMetadata({
    locale: "fr",
    key: "artwork",
    slug: a.slug,
    title: `${name} — ${specLine(a, "fr")}`,
    description: a.description?.fr ?? `${name}, ${specLine(a, "fr")}. Toile originale de Zbekal, Laurine Girard.`,
    image: a.images[0] ? `/og/${a.slug}.jpg` : "/og/default.jpg",
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const a = getArtwork(slug);
  if (!a) notFound();
  return <ArtworkPage locale="fr" artwork={a} />;
}
