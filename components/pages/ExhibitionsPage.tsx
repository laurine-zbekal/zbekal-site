import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { exhibitions } from "@/content/expositions";
import { href } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ExhibitionList } from "@/components/ExhibitionList";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/NewsletterForm";

export function ExhibitionsPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const upcoming = exhibitions.filter((e) => e.upcoming);
  const past = exhibitions.filter((e) => !e.upcoming);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.breadcrumb.home, path: href(locale, "home") },
          { name: t.exhibitions.title, path: href(locale, "exhibitions") },
        ])}
      />
      <section className="container section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="section-head">
          <h1 className="display h1" style={{ fontSize: "clamp(44px, 8vw, 104px)" }}>
            {t.exhibitions.title}
          </h1>
          <p className="lead" style={{ maxWidth: "40ch" }}>
            {t.exhibitions.lead}
          </p>
        </div>

        {upcoming.length ? (
          <div className="stack" style={{ "--stack": "16px", marginBottom: 48 } as React.CSSProperties}>
            <h2 className="display h3">{t.exhibitions.upcoming}</h2>
            <div className="panel panel--pink-soft" style={{ padding: "8px clamp(16px, 3vw, 32px)" }}>
              <ExhibitionList items={upcoming} locale={locale} />
            </div>
          </div>
        ) : null}

        <div className="stack" style={{ "--stack": "16px" } as React.CSSProperties}>
          <h2 className="display h3">{t.exhibitions.past}</h2>
          <ExhibitionList items={past} locale={locale} />
        </div>
      </section>

      <section className="container" aria-labelledby="nl-title">
        <div className="panel panel--yellow" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px 56px" }}>
          <div className="stack" style={{ flex: "1 1 360px", minWidth: 0, "--stack": "10px" } as React.CSSProperties}>
            <h2 id="nl-title" className="display h2">
              {t.home.newsletterTitle}
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.45, maxWidth: "44ch" }}>{t.home.newsletterText}</p>
          </div>
          <div style={{ flex: "1 1 380px", minWidth: 0 }}>
            <NewsletterForm locale={locale} />
          </div>
        </div>
        <p style={{ marginTop: 24 }}>
          <Link href={href(locale, "gallery")} className="link">
            {t.cta.allWorks} →
          </Link>
        </p>
      </section>
    </>
  );
}
