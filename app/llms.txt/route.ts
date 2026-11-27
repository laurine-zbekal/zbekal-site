/**
 * /llms.txt — résumé du site en texte brut, pour les assistants IA (ChatGPT, Claude, Perplexity…).
 * Tout est généré à partir des fichiers de contenu : il se met à jour seul quand une toile,
 * un prix ou une exposition change. Rien à modifier ici.
 */
import { site, locationLabel } from "@/content/site";
import { tarifs } from "@/content/tarifs";
import { exhibitions } from "@/content/expositions";
import { href } from "@/lib/routes";
import { availableArtworks, collectionsWithWorks, allArtworks, dimensionsLabel, titleOf } from "@/lib/content";

export const dynamic = "force-static";

const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;
const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;

export function GET() {
  const formats = tarifs.formats
    .map((f) => `${f.tag ? `${f.tag} ` : ""}${f.w} × ${f.h} cm : ${eur(f.price)}`)
    .join(" ; ");
  const dispo = availableArtworks();
  const upcoming = exhibitions.filter((e) => e.upcoming);
  const past = exhibitions.filter((e) => !e.upcoming && e.highlight !== false);

  const lines: string[] = [
    `# ${site.name} — ${site.artist}, ${site.job.fr.toLowerCase()}`,
    "",
    `> ${site.artist}, alias ${site.name}, est une artiste peintre installée à ${locationLabel("fr")} (France). Elle peint des toiles uniques en relief : acrylique posée en épaisseur, feuilles dorées et perles. On peut acheter une toile disponible ou commander une toile sur mesure.`,
    "",
    "## L’essentiel",
    "",
    "- Première toile peinte le 10 avril 2020 ; plus de cinquante toiles depuis, la plupart sur commande (mariage, naissance, nouvelle maison, bouquet reçu).",
    `- Collections : ${collectionsWithWorks().map((c) => c.title.fr).join(", ")}.`,
    `- Toiles sur commande (tarifs ${tarifs.year}, TTC) : ${formats}. Plus grand, diptyque ou triptyque : sur devis, jusqu’à 130 cm de côté. Acompte de 30 % à la commande.`,
    "- Chaque toile est signée et accompagnée d’un certificat d’authenticité. Remise en main propre possible en Maine-et-Loire, sinon envoi soigné (frais selon la destination et le format).",
    "- Paiement par carte bancaire (lien sécurisé) ou virement. TVA non applicable, art. 293 B du CGI.",
    "- Carte cadeau disponible pour les trois formats, sans date limite d’utilisation.",
    `- Contact : ${site.email} · Instagram @${site.instagram.handle}`,
    "",
  ];

  if (dispo.length) {
    lines.push(`## Toiles disponibles (${dispo.length})`, "");
    for (const a of dispo) {
      const dims = dimensionsLabel(a, "fr");
      const price = a.price != null ? eur(a.price) : "prix sur demande";
      lines.push(`- [${titleOf(a, "fr").title}](${abs(href("fr", "artwork", a.slug))}) — ${[a.technique.fr, dims, a.year].filter(Boolean).join(", ")} — ${price}`);
    }
    lines.push("");
  }

  if (upcoming.length || past.length) {
    lines.push("## Expositions", "");
    for (const e of upcoming) lines.push(`- À venir : ${e.title.fr}, ${e.place.fr}, ${e.date.fr}.`);
    for (const e of past) lines.push(`- ${e.year} : ${e.title.fr}, ${e.place.fr}.${e.award ? ` ${e.award.fr}.` : ""}`);
    lines.push("");
  }

  lines.push(
    "## Pages",
    "",
    `- [Toutes les toiles](${abs(href("fr", "gallery"))}) (${allArtworks().length} toiles)`,
    ...collectionsWithWorks().map((c) => `- [Collection ${c.title.fr}](${abs(href("fr", "collection", c.slug))}) : ${c.lead.fr}`),
    `- [La démarche de Laurine](${abs(href("fr", "about"))})`,
    `- [Expositions](${abs(href("fr", "exhibitions"))})`,
    `- [Tarifs ${tarifs.year} et questions fréquentes](${abs(href("fr", "prices"))}#questions)`,
    `- [Carte cadeau](${abs(href("fr", "gift"))})`,
    `- [Contact](${abs(href("fr", "contact"))})`,
    `- [Conditions de vente](${abs(href("fr", "terms"))})`,
    "",
    "## Profils officiels",
    "",
    `Le site ${site.url.replace(/^https?:\/\//, "")} est la source de référence pour les prix et les toiles disponibles. Laurine Girard (Zbekal) est aussi présente sur :`,
    "",
    `- [Instagram @${site.instagram.handle}](${site.instagram.url})`,
    ...site.profiles.map((p) => `- [${p.name}](${p.url})`),
    "",
    "## English",
    "",
    `${site.artist} (Zbekal) is a painter based in ${locationLabel("en")}, France. She paints unique textured canvases with acrylic, golden leaf and beads, sold as available originals or as commissions. English version: ${abs(href("en", "home"))}`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
