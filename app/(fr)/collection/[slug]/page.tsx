import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionPage } from "@/components/pages/CollectionPage";
import { getCollection } from "@/content/collections";
import { collectionsWithWorks } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return collectionsWithWorks().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return pageMetadata({
    locale: "fr",
    key: "collection",
    slug: c.slug,
    title: `${c.title.fr} — collection`,
    description: c.lead.fr,
    image: c.cover ? "/og/galerie.jpg" : "/og/default.jpg",
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c || !collectionsWithWorks().some((x) => x.slug === c.slug)) notFound();
  return <CollectionPage locale="fr" collection={c} />;
}
