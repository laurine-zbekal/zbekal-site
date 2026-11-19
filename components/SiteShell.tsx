import type { Locale } from "@/content/ui";
import { ui } from "@/content/ui";
import { fontClassName } from "@/app/fonts";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Ticker } from "./Ticker";
import { RevealObserver } from "./Reveal";
import { Intro } from "./Intro";
import { CookieConsent } from "./CookieConsent";
import { site } from "@/content/site";
import { href } from "@/lib/routes";

/** Structure commune aux deux langues : <html>, bandeau, en-tête, contenu, pied de page. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = ui[locale];
  return (
    <html lang={locale} className={fontClassName} suppressHydrationWarning>
      <body>
        <Intro />
        <a href="#contenu" className="skip-link">
          {t.skip}
        </a>
        <Ticker locale={locale} />
        <Header locale={locale} />
        <main id="contenu">{children}</main>
        <Footer locale={locale} />
        <RevealObserver />
        {/* bandeau cookies : seulement si Google Analytics est branché (content/site.ts, `analytics.gaId`) */}
        {site.analytics.gaId ? <CookieConsent gaId={site.analytics.gaId} labels={t.cookies} privacyHref={href(locale, "privacy")} /> : null}
      </body>
    </html>
  );
}
