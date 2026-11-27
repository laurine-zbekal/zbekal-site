import Link from "next/link";
import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";

/**
 * Conditions générales de vente — vente à distance d’œuvres originales, commandes sur mesure et carte cadeau.
 * À faire relire par un juriste avant la mise en ligne (médiateur de la consommation à désigner).
 */
export function TermsPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const mediator = process.env.NEXT_PUBLIC_MEDIATOR ?? "";

  if (locale === "en") {
    return (
      <section className="container section prose" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <h1 className="display h2">{t.footer.terms}</h1>
        <p>
          These terms apply to any purchase of an original painting or of a gift card, and to any commission, made with {site.artist} ({site.name}) through this site or following an exchange initiated on it. French law applies; the French version prevails in case of discrepancy.
        </p>
        <h2 className="display h4">1. Seller</h2>
        <p>
          {site.artist}, {site.legal.status.en}, SIRET {site.legal.siret || "[to be completed]"}, {site.legal.address || "[address to be completed]"}, <a href={`mailto:${site.email}`}>{site.email}</a>. {site.legal.vat.en}.
        </p>
        <h2 className="display h4">2. Paintings and prices</h2>
        <p>Each painting is a unique original, signed, and sold with a certificate of authenticity. Prices are shown in euros, all taxes included. Delivery costs are quoted separately, before payment, according to the destination and the size of the painting. Prices may change at any time; the price applicable is the one confirmed in writing when you order.</p>
        <h2 className="display h4">3. Ordering and payment</h2>
        <p>You send a request through the site or by email. I confirm the painting is available, the total price including delivery, and send you a secure payment link (card payment) or bank details. The painting is reserved for 72 hours from the sending of the payment link. The sale is final once payment has been received in full, which I confirm by email.</p>
        <h2 className="display h4">4. Delivery</h2>
        <p>Paintings are carefully packed and shipped insured, usually within 2 to 3 weeks of payment; the exact timing is confirmed with you. Hand delivery is possible in Angers, Cholet, Nantes and anywhere in Maine-et-Loire. Please check the parcel on delivery and let me know of any damage within 48 hours, with photographs, so that the insurance can be claimed.</p>
        <h2 className="display h4">5. Right of withdrawal</h2>
        <p>
          As a consumer buying at a distance, you have 14 days from delivery to change your mind, without having to give a reason (article L221-18 of the French Consumer Code). Tell me by email within that period, then return the painting in its original condition and packaging within 14 days; return costs are at your expense. I refund you within 14 days of receiving the painting back. The right of withdrawal does not apply to commissioned paintings made to your specifications (article L221-28, 3°).
        </p>
        <h2 className="display h4">6. Commissions</h2>
        <p>A commission starts with a written quote (size, subject, colours, price, timing). A 30% deposit confirms the order; a sketch or a photograph of the work in progress is submitted for your approval before completion; the balance is paid before delivery. Because the painting is made to your specifications, it cannot be returned once completed.</p>
        <h2 className="display h4" id="carte-cadeau">
          7. Gift card
        </h2>
        <p>
          The gift card entitles its holder to a commissioned painting in the size shown on the card (S, M or L). It is paid in full when purchased, at the price in force that day, and has no expiry date: the size given remains valid even if my prices change. It is handed over in person or sent by post. The person who receives it contacts me whenever they wish; their painting is then made as a commission (article 6), with no deposit to pay. A larger size or a special request remains possible, with a supplement on quote; any shipping costs for the painting are paid at that point. If you buy the card at a distance, you have 14 days from receiving it to change your mind and be refunded, as long as it has not been used (article L221-18 of the French Consumer Code). After that period, the card can be neither refunded nor exchanged for money.
        </p>
        <h2 className="display h4">8. Legal guarantees</h2>
        <p>You benefit from the legal guarantee of conformity (articles L217-3 and following of the French Consumer Code) and the guarantee against hidden defects (articles 1641 and following of the French Civil Code).</p>
        <h2 className="display h4">9. Copyright</h2>
        <p>Buying a painting transfers ownership of the physical work only. All reproduction and representation rights remain with the artist (article L111-3 of the French Intellectual Property Code): the painting may not be reproduced, printed, or used commercially without written permission.</p>
        <h2 className="display h4">10. Personal data</h2>
        <p>
          The data needed to process your order is handled as described in the <Link href={href(locale, "privacy")}>privacy policy</Link>.
        </p>
        <h2 className="display h4">11. Disputes and mediation</h2>
        <p>
          In the event of a dispute, please write to me first so that we can find a solution together. You may then use free of charge the consumer mediator: {mediator || "[mediator to be appointed]"}, or the European online dispute resolution platform at{" "}
          <a href="https://ec.europa.eu/consumers/odr" rel="noopener">
            ec.europa.eu/consumers/odr
          </a>
          . French courts have jurisdiction.
        </p>
      </section>
    );
  }

  return (
    <section className="container section prose" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
      <h1 className="display h2">{t.footer.terms}</h1>
      <p>
        Les présentes conditions s’appliquent à tout achat d’une toile originale ou d’une carte cadeau, et à toute commande sur mesure, passés auprès de {site.artist} ({site.name}) via ce site, ou à la suite d’un échange engagé sur ce site. Elles sont régies par le droit français.
      </p>
      <h2 className="display h4">1. Vendeuse</h2>
      <p>
        {site.artist}, {site.legal.status.fr}, SIRET {site.legal.siret || "[à compléter]"}, {site.legal.address || "[adresse à compléter]"}, <a href={`mailto:${site.email}`}>{site.email}</a>. {site.legal.vat.fr}.
      </p>
      <h2 className="display h4">2. Toiles et prix</h2>
      <p>Chaque toile est un original unique, signé, vendu avec un certificat d’authenticité. Les prix sont indiqués en euros, toutes taxes comprises. Les frais de livraison sont indiqués séparément, avant le paiement, selon la destination et le format. Les prix peuvent évoluer à tout moment ; le prix applicable est celui confirmé par écrit au moment de la commande.</p>
      <h2 className="display h4">3. Commande et paiement</h2>
      <p>Tu envoies une demande via le site ou par e-mail. Je confirme la disponibilité de la toile et le prix total, livraison comprise, puis je t’envoie un lien de paiement sécurisé (carte bancaire) ou un RIB pour un virement. La toile est réservée pendant 72 heures à compter de l’envoi du lien de paiement. La vente est ferme à réception du paiement intégral, que je confirme par e-mail.</p>
      <h2 className="display h4">4. Livraison</h2>
      <p>Les toiles sont emballées avec soin et expédiées en envoi assuré, en général sous 2 à 3 semaines après le paiement ; le délai exact est confirmé avec toi. La remise en main propre est possible à Angers, à Cholet, à Nantes et partout en Maine-et-Loire. À la réception, vérifie le colis et signale-moi tout dommage sous 48 heures, photos à l’appui, pour que l’assurance puisse jouer.</p>
      <h2 className="display h4">5. Droit de rétractation</h2>
      <p>
        En tant que consommateur achetant à distance, tu disposes de 14 jours à compter de la livraison pour changer d’avis, sans avoir à te justifier (article L221-18 du Code de la consommation). Préviens-moi par e-mail dans ce délai, puis renvoie la toile dans son état et son emballage d’origine sous 14 jours ; les frais de retour sont à ta charge. Je te rembourse sous 14 jours après réception de la toile. Le droit de rétractation ne s’applique pas aux toiles réalisées sur mesure selon tes spécifications (article L221-28, 3°).
      </p>
      <h2 className="display h4">6. Commandes sur mesure</h2>
      <p>Une commande commence par un devis écrit (format, sujet, couleurs, prix, délai). Un acompte de 30 % confirme la commande ; une esquisse ou une photo de la toile en cours t’est soumise pour validation avant la finalisation ; le solde est réglé avant la livraison. La toile étant réalisée selon tes spécifications, elle ne peut pas être retournée une fois terminée.</p>
      <h2 className="display h4" id="carte-cadeau">
        7. Carte cadeau
      </h2>
      <p>
        La carte cadeau donne droit à une toile sur commande au format indiqué sur la carte (S, M ou L). Elle est réglée en totalité à l’achat, au tarif en vigueur ce jour-là, et n’a pas de date limite d’utilisation : le format offert reste acquis, même si mes tarifs évoluent. Elle est remise en main propre ou envoyée par courrier. La personne qui la reçoit me contacte quand elle le souhaite ; sa toile est alors réalisée comme une commande sur mesure (article 6), sans acompte à verser. Un format plus grand ou une demande particulière reste possible, avec un complément sur devis ; les frais d’envoi de la toile, s’il y en a, sont réglés à ce moment-là. Si tu achètes la carte à distance, tu disposes de 14 jours à compter de sa réception pour changer d’avis et être remboursé, tant qu’elle n’a pas été utilisée (article L221-18 du Code de la consommation). Passé ce délai, la carte n’est ni remboursable ni échangeable contre de l’argent.
      </p>
      <h2 className="display h4">8. Garanties légales</h2>
      <p>Tu bénéficies de la garantie légale de conformité (articles L217-3 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).</p>
      <h2 className="display h4">9. Droits d’auteur</h2>
      <p>L’achat d’une toile transfère uniquement la propriété de l’objet. Les droits de reproduction et de représentation restent la propriété de l’artiste (article L111-3 du Code de la propriété intellectuelle) : la toile ne peut être reproduite, imprimée ou exploitée commercialement sans autorisation écrite.</p>
      <h2 className="display h4">10. Données personnelles</h2>
      <p>
        Les données nécessaires au traitement de ta commande sont traitées comme décrit dans la <Link href={href(locale, "privacy")}>politique de confidentialité</Link>.
      </p>
      <h2 className="display h4">11. Litiges et médiation</h2>
      <p>
        En cas de litige, écris-moi d’abord pour que nous trouvions une solution ensemble. Tu peux ensuite recourir gratuitement au médiateur de la consommation : {mediator || "[médiateur à désigner]"}, ou à la plateforme européenne de règlement en ligne des litiges :{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener">
          ec.europa.eu/consumers/odr
        </a>
        . Les tribunaux français sont compétents.
      </p>
    </section>
  );
}
