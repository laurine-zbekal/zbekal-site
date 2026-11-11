"use client";

import { useEffect, useMemo, useState } from "react";
import type { Artwork, CollectionSlug } from "@/content/oeuvres";
import type { Collection } from "@/content/collections";
import { ui, type Locale } from "@/content/ui";
import { galleryFilterParam, type GalleryFilter } from "@/lib/routes";
import { ArtworkCard } from "./ArtworkCard";

type Filter = "all" | GalleryFilter;

/** Valeur du filtre dans l’adresse (français ou anglais) → filtre */
function filterFromParam(value: string | null): Filter {
  for (const p of Object.values(galleryFilterParam)) {
    const hit = (Object.keys(p.values) as GalleryFilter[]).find((k) => p.values[k] === value);
    if (hit) return hit;
  }
  return "all";
}

/**
 * Grille de la galerie avec filtres : disponibilité et collection. Seules les toiles
 * qui correspondent aux filtres sont affichées, groupées par collection.
 * Les filtres sont lus dans l’adresse (/galerie?filtre=disponibles&collection=fleurs)
 * et y sont reportés à chaque clic : un lien partagé ou un retour arrière garde le tri.
 */
export function ArtworkGrid({
  artworks,
  collections,
  locale,
  initialCollection,
}: {
  artworks: Artwork[];
  collections: Collection[];
  locale: Locale;
  initialCollection?: CollectionSlug;
}) {
  const t = ui[locale];
  const [filter, setFilterState] = useState<Filter>("all");
  const [collection, setCollectionState] = useState<CollectionSlug | "all">(initialCollection ?? "all");

  // Filtres présents dans l’adresse à l’arrivée sur la page (une synchronisation après l’hydratation).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = filterFromParam(params.get("filtre") ?? params.get("filter"));
    const c = collections.find((x) => x.slug === params.get("collection"))?.slug;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (f !== "all") setFilterState(f);
    if (c) setCollectionState(c);
  }, [collections]);

  const apply = (nextFilter: Filter, nextCollection: CollectionSlug | "all") => {
    setFilterState(nextFilter);
    setCollectionState(nextCollection);
    const p = galleryFilterParam[locale];
    const params = new URLSearchParams();
    if (nextFilter !== "all") params.set(p.key, p.values[nextFilter]);
    if (nextCollection !== "all") params.set("collection", nextCollection);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
  };
  const setFilter = (f: Filter) => apply(f, collection);
  const setCollection = (c: CollectionSlug | "all") => apply(filter, c);

  const filtered = useMemo(
    () =>
      artworks.filter((a) => {
        if (filter === "available" && a.status !== "disponible") return false;
        if (filter === "order" && a.status !== "sur-commande") return false;
        if (filter === "sold" && a.status !== "vendue") return false;
        if (collection !== "all" && a.collection !== collection) return false;
        return true;
      }),
    [artworks, filter, collection],
  );

  const groups = collections
    .filter((c) => collection === "all" || c.slug === collection)
    .map((c) => ({ collection: c, works: filtered.filter((a) => a.collection === c.slug) }))
    .filter((g) => g.works.length > 0);

  const hasSold = artworks.some((a) => a.status === "vendue");
  const hasOnOrder = artworks.some((a) => a.status === "sur-commande");

  return (
    <div className="stack" style={{ "--stack": "clamp(28px, 4vw, 48px)" } as React.CSSProperties}>
      <div className="stack" style={{ "--stack": "12px" } as React.CSSProperties}>
        <div className="filters" role="group" aria-label={t.work.availability}>
          <span className="filters__label">{t.work.availability}</span>
          <button type="button" className="chip" data-filter="all" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            {t.gallery.filterAll}
          </button>
          <button type="button" className="chip chip--pink" data-filter="available" aria-pressed={filter === "available"} onClick={() => setFilter("available")}>
            {t.gallery.filterAvailable}
          </button>
          {hasOnOrder ? (
            <button type="button" className="chip" data-filter="order" aria-pressed={filter === "order"} onClick={() => setFilter("order")}>
              {t.gallery.filterOnOrder}
            </button>
          ) : null}
          {hasSold ? (
            <button type="button" className="chip" data-filter="sold" aria-pressed={filter === "sold"} onClick={() => setFilter("sold")}>
              {t.gallery.filterSold}
            </button>
          ) : null}
        </div>
        {collections.length > 1 ? (
          <div className="filters" role="group" aria-label={t.gallery.collectionsLabel}>
            <span className="filters__label">{t.gallery.collectionsLabel}</span>
            <button type="button" className="chip" aria-pressed={collection === "all"} onClick={() => setCollection("all")}>
              {t.gallery.allCollections}
            </button>
            {collections.map((c) => (
              <button key={c.slug} type="button" className="chip" aria-pressed={collection === c.slug} onClick={() => setCollection(c.slug)}>
                {c.title[locale]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="muted" aria-live="polite" style={{ fontSize: 15 }}>
        {filtered.length ? t.gallery.count(filtered.length) : t.gallery.empty}
      </p>

      {groups.map((g, gi) => (
        <section key={g.collection.slug} aria-labelledby={`col-${g.collection.slug}`} className="stack" style={{ "--stack": "20px" } as React.CSSProperties}>
          <div className="cluster" style={{ justifyContent: "space-between" }}>
            <h2 id={`col-${g.collection.slug}`} className="display h3">
              {g.collection.title[locale]}
            </h2>
            <span className="muted" style={{ fontSize: 15 }}>
              {g.collection.lead[locale]}
            </span>
          </div>
          <div className="grid-cards">
            {g.works.map((a, i) => (
              <ArtworkCard key={a.slug} artwork={a} locale={locale} priority={gi === 0 && i < 3} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
