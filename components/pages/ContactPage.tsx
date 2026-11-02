import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";
import { allArtworks, titleOf } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { InstagramIcon, MailIcon } from "@/components/Icons";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const options = allArtworks()
    .filter((a) => a.status !== "vendue")
    .map((a) => ({ slug: a.slug, label: titleOf(a, locale).title }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.breadcrumb.home, path: href(locale, "home") },
          { name: t.contact.title, path: href(locale, "contact") },
        ])}
      />
      <section className="container section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="grid-2" style={{ alignItems: "start", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))" }}>
          <div className="stack" style={{ "--stack": "20px" } as React.CSSProperties}>
            <h1 className="display h1" style={{ fontSize: "clamp(48px, 8vw, 104px)" }}>
              {t.contact.title}
            </h1>
            <p className="lead" style={{ color: "var(--ink)" }}>
              {t.contact.lead}
            </p>
            <div className="panel panel--soft stack" style={{ padding: 24, "--stack": "12px" } as React.CSSProperties}>
              <h2 className="kicker" style={{ color: "var(--ink)" }}>
                {t.contact.directTitle}
              </h2>
              <p className="muted">{t.contact.directText}</p>
              <a href={`mailto:${site.email}`} className="cluster" style={{ gap: 10, textDecoration: "none", fontWeight: 700 }}>
                <MailIcon /> {site.email}
              </a>
              <a href={site.instagram.url} className="cluster" rel="noopener" style={{ gap: 10, textDecoration: "none", fontWeight: 700 }}>
                <InstagramIcon size={18} /> @{site.instagram.handle}
              </a>
            </div>
          </div>
          <div className="panel panel--line" style={{ padding: "clamp(20px, 3.5vw, 40px)" }}>
            <ContactForm locale={locale} artworks={options} />
          </div>
        </div>
      </section>
    </>
  );
}
