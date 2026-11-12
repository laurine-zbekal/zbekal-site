import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = ui[locale];

  if (locale === "en") {
    return (
      <section className="container section prose" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <h1 className="display h2">{t.footer.privacy}</h1>
        <p>
          This policy explains what personal data is collected on this site, why, and what your rights are. The data controller is {site.artist} ({site.name}),{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2 className="display h4">What is collected</h2>
        <ul>
          <li>
            <strong>Contact and commission form:</strong> your name, email address, the subject of your request, the painting concerned and your message. Purpose: answering you and, where relevant, preparing a sale or a commission. Legal basis: your consent and steps taken at your request prior to a contract.
          </li>
          <li>
            <strong>Newsletter:</strong> your email address and the date of your consent. Purpose: sending news about new paintings and shows. Legal basis: your consent, which you can withdraw at any time via the unsubscribe link or by writing to the address above.
          </li>
          <li>
            <strong>Technical logs:</strong> the hosting provider processes technical data (IP address, browser) for security purposes, for a limited time.
          </li>
        </ul>
        <h2 className="display h4">How long it is kept</h2>
        <ul>
          <li>Messages: 3 years after our last exchange, unless a sale takes place (accounting documents are then kept for 10 years as required by law).</li>
          <li>Newsletter: until you unsubscribe, or after 3 years without any interaction.</li>
        </ul>
        <h2 className="display h4">Who receives it</h2>
        <p>Your data is not sold or shared for advertising. It is processed by the following service providers, acting on instructions:</p>
        <ul>
          <li>{site.host.name} (hosting of the site and of the forms).</li>
          <li>Resend (delivery of the emails sent by the forms).</li>
          <li>Brevo (newsletter tool, servers in the European Union), once the newsletter is launched.</li>
        </ul>
        <p>Some of these providers are located in the United States; transfers are governed by the European Commission’s standard contractual clauses or an adequacy decision.</p>
        <h2 className="display h4">Your rights</h2>
        <p>
          You can access, rectify or delete your data, object to or limit its processing, and request its portability. Write to <a href={`mailto:${site.email}`}>{site.email}</a>. You can also lodge a complaint with the French data protection authority, the CNIL (
          <a href="https://www.cnil.fr" rel="noopener">
            cnil.fr
          </a>
          ).
        </p>
        <h2 className="display h4">Cookies</h2>
        <p>This site places no advertising or tracking cookies, which is why there is no cookie banner. Only strictly necessary technical storage may be used.</p>
      </section>
    );
  }

  return (
    <section className="container section prose" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
      <h1 className="display h2">{t.footer.privacy}</h1>
      <p>
        Cette page explique quelles données personnelles sont collectées sur ce site, pourquoi, et quels sont tes droits. La responsable du traitement est {site.artist} ({site.name}),{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2 className="display h4">Ce qui est collecté</h2>
      <ul>
        <li>
          <strong>Formulaire de contact et de commande :</strong> ton nom, ton adresse e-mail, l’objet de ta demande, la toile concernée et ton message. Finalité : te répondre et, le cas échéant, préparer une vente ou une commande. Base légale : ton consentement et les mesures précontractuelles prises à ta demande.
        </li>
        <li>
          <strong>Lettre d’atelier (newsletter) :</strong> ton adresse e-mail et la date de ton consentement. Finalité : t’envoyer les nouvelles toiles et les expositions. Base légale : ton consentement, que tu peux retirer à tout moment via le lien de désinscription ou en écrivant à l’adresse ci-dessus.
        </li>
        <li>
          <strong>Journaux techniques :</strong> l’hébergeur traite des données techniques (adresse IP, navigateur) à des fins de sécurité, pour une durée limitée.
        </li>
      </ul>
      <h2 className="display h4">Combien de temps</h2>
      <ul>
        <li>Messages : 3 ans après notre dernier échange, sauf vente (les pièces comptables sont alors conservées 10 ans, comme la loi l’impose).</li>
        <li>Newsletter : jusqu’à ta désinscription, ou après 3 ans sans interaction.</li>
      </ul>
      <h2 className="display h4">Qui y a accès</h2>
      <p>Tes données ne sont ni vendues ni partagées à des fins publicitaires. Elles sont traitées par les prestataires suivants, qui agissent sur instruction :</p>
      <ul>
        <li>{site.host.name} (hébergement du site et des formulaires).</li>
        <li>Resend (acheminement des e-mails envoyés par les formulaires).</li>
        <li>Brevo (outil de newsletter, serveurs dans l’Union européenne), une fois la newsletter lancée.</li>
      </ul>
      <p>Certains de ces prestataires sont situés aux États-Unis ; les transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou une décision d’adéquation.</p>
      <h2 className="display h4">Tes droits</h2>
      <p>
        Tu peux accéder à tes données, les rectifier, les faire effacer, t’opposer à leur traitement ou le limiter, et demander leur portabilité. Écris à <a href={`mailto:${site.email}`}>{site.email}</a>. Tu peux aussi déposer une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" rel="noopener">
          cnil.fr
        </a>
        ).
      </p>
      <h2 className="display h4">Cookies</h2>
      <p>Ce site ne dépose aucun cookie publicitaire ni de suivi, c’est pourquoi il n’y a pas de bandeau cookies. Seul un stockage technique strictement nécessaire peut être utilisé.</p>
    </section>
  );
}
