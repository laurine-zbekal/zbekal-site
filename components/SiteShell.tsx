import { Analytics } from "@vercel/analytics/next";
import type { Locale } from "@/content/ui";
import { ui } from "@/content/ui";
import { fontClassName } from "@/app/fonts";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Ticker } from "./Ticker";
import { RevealObserver } from "./Reveal";

/** Structure commune aux deux langues : <html>, bandeau, en-tête, contenu, pied de page. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = ui[locale];
  return (
    <html lang={locale} className={fontClassName}>
      <body>
        <a href="#contenu" className="skip-link">
          {t.skip}
        </a>
        <Ticker locale={locale} />
        <Header locale={locale} />
        <main id="contenu">{children}</main>
        <Footer locale={locale} />
        <RevealObserver />
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
