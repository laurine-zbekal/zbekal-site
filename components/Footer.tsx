import Link from "next/link";
import { site, locationLabel } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { collectionsWithWorks } from "@/lib/content";
import { CookieSettingsLink } from "./CookieConsent";

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const year = new Date().getFullYear();
  const copyrightYears = year > site.since ? `${site.since}–${year}` : `${site.since}`;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__col">
            <span className="footer__brand">
              {site.name}
              <sup className="tm" aria-hidden="true">®</sup>
            </span>
            <span className="footer__muted">
              {site.artist} · {site.job[locale]} · {locationLabel(locale)}
            </span>
          </div>
          <div className="footer__col">
            <h2>{t.nav.gallery}</h2>
            <Link href={href(locale, "gallery")}>{t.cta.allWorks}</Link>
            {collectionsWithWorks().map((c) => (
              <Link key={c.slug} href={href(locale, "collection", c.slug)}>
                {c.title[locale]}
              </Link>
            ))}
            <Link href={href(locale, "prices")}>{t.nav.prices}</Link>
            <Link href={href(locale, "gift")}>{t.nav.gift}</Link>
          </div>
          <div className="footer__col">
            <h2>{t.nav.contact}</h2>
            <Link href={href(locale, "contact")}>{t.cta.commission}</Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.instagram.url} rel="noopener">
              Instagram @{site.instagram.handle}
            </a>
            <Link href={href(locale, "exhibitions")}>{t.nav.exhibitions}</Link>
          </div>
          <div className="footer__col">
            <h2>{locale === "fr" ? "Informations" : "Information"}</h2>
            <Link href={href(locale, "legal")}>{t.footer.legal}</Link>
            <Link href={href(locale, "privacy")}>{t.footer.privacy}</Link>
            <Link href={href(locale, "terms")}>{t.footer.terms}</Link>
            {site.analytics.gaId ? <CookieSettingsLink label={t.cookies.manage} /> : null}
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            © {site.name} {copyrightYears} · {t.footer.rights} · {site.trademark.notice[locale]}
          </span>
          <span>{t.footer.madeBy}</span>
        </div>
      </div>
    </footer>
  );
}
