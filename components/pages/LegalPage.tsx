import Link from "next/link";
import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";

const fill = (v: string, locale: Locale) => v || (locale === "fr" ? "[à compléter]" : "[to be completed]");

export function LegalPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const siret = fill(site.legal.siret, locale);
  const address = fill(site.legal.address, locale);

  if (locale === "en") {
    return (
      <section className="container section prose" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <h1 className="display h2">{t.footer.legal}</h1>
        <h2 className="display h4">Site publisher</h2>
        <p>
          This website, {site.url.replace(/^https?:\/\//, "")}, is published by {site.artist}, painter working under the name {site.name}.
        </p>
        <ul>
          <li>Status: {site.legal.status.en}</li>
          <li>SIRET: {siret}</li>
          <li>Address: {address}</li>
          <li>
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>Publishing director: {site.artist}</li>
          <li>{site.legal.vat.en}</li>
        </ul>
        <h2 className="display h4">Hosting</h2>
        <p>
          The site is hosted by {site.host.name}, {site.host.address} —{" "}
          <a href={site.host.url} rel="noopener">
            {site.host.url}
          </a>
          .
        </p>
        <h2 className="display h4">Intellectual property</h2>
        <p>
          All paintings, photographs, texts and graphic elements on this site are the work of {site.artist} and are protected by French and international copyright law (Code de la propriété intellectuelle). Any reproduction, representation, adaptation or distribution, in whole or in part, without prior written permission is prohibited. Buying an original painting does not transfer any reproduction rights.
        </p>
        <h2 className="display h4">Trademark</h2>
        <p>
          {site.trademark.notice.en} Application no. {site.trademark.number}, filed on 26 November 2026. Any use of the name {site.name} without permission is prohibited.
        </p>
        <h2 className="display h4">Personal data and cookies</h2>
        <p>
          This site uses no advertising or tracking cookies. Audience measurement is done without cookies or personal identifiers. The data you send through the forms is used only to answer you. Full details in the{" "}
          <Link href={href(locale, "privacy")}>privacy policy</Link>.
        </p>
        <h2 className="display h4">Credits</h2>
        <p>Design and development: {site.artist}. Photographs: {site.name}.</p>
      </section>
    );
  }

  return (
    <section className="container section prose" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
      <h1 className="display h2">{t.footer.legal}</h1>
      <h2 className="display h4">Éditeur du site</h2>
      <p>
        Le site {site.url.replace(/^https?:\/\//, "")} est édité par {site.artist}, artiste peintre sous le nom {site.name}.
      </p>
      <ul>
        <li>Statut : {site.legal.status.fr}</li>
        <li>SIRET : {siret}</li>
        <li>Adresse : {address}</li>
        <li>
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>Directrice de la publication : {site.artist}</li>
        <li>{site.legal.vat.fr}</li>
      </ul>
      <h2 className="display h4">Hébergement</h2>
      <p>
        Le site est hébergé par {site.host.name}, {site.host.address} —{" "}
        <a href={site.host.url} rel="noopener">
          {site.host.url}
        </a>
        .
      </p>
      <h2 className="display h4">Propriété intellectuelle</h2>
      <p>
        L’ensemble des toiles, photographies, textes et éléments graphiques de ce site sont l’œuvre de {site.artist} et sont protégés par le Code de la propriété intellectuelle. Toute reproduction, représentation, adaptation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite. L’achat d’une toile originale n’emporte aucune cession de droits de reproduction (article L111-3 du Code de la propriété intellectuelle).
      </p>
      <h2 className="display h4">Marque</h2>
      <p>
        {site.trademark.notice.fr} Dépôt INPI n° {site.trademark.number} du 26 novembre 2026. Toute utilisation du nom {site.name} sans autorisation est interdite.
      </p>
      <h2 className="display h4">Données personnelles et cookies</h2>
      <p>
        Ce site n’utilise aucun cookie publicitaire ni de suivi. La mesure d’audience se fait sans cookie ni identifiant personnel. Les informations transmises par les formulaires servent uniquement à te répondre. Tout est détaillé dans la{" "}
        <Link href={href(locale, "privacy")}>politique de confidentialité</Link>.
      </p>
      <h2 className="display h4">Crédits</h2>
      <p>Conception et réalisation : {site.artist}. Photographies : {site.name}.</p>
    </section>
  );
}
