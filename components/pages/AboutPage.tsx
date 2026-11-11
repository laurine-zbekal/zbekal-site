import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { about } from "@/content/textes";
import { highlightedExhibitions } from "@/content/expositions";
import { galleryHref, href } from "@/lib/routes";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/seo";
import { ExhibitionList } from "@/components/ExhibitionList";
import { JsonLd } from "@/components/JsonLd";

export function AboutPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const cv = process.env.NEXT_PUBLIC_CV_FILE; // ex. /cv-laurine-girard.pdf, à déposer dans public/

  return (
    <>
      <JsonLd
        data={[
          personJsonLd(locale),
          breadcrumbJsonLd([
            { name: t.breadcrumb.home, path: href(locale, "home") },
            { name: t.about.title, path: href(locale, "about") },
          ]),
        ]}
      />
      <section className="container section" style={{ paddingTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ "--stack": "20px" } as React.CSSProperties}>
            <span className="kicker">{about.kicker[locale]}</span>
            <h1 className="display h1" style={{ fontSize: "clamp(44px, 7vw, 92px)" }}>
              {t.about.title}
            </h1>
            <p className="lead" style={{ color: "var(--ink)", fontSize: "clamp(19px, 2vw, 23px)" }}>
              {about.intro[locale]}
            </p>
            <div className="cluster">
              <Link href={galleryHref(locale, "available")} className="btn btn--pink">
                {t.cta.seeWorks}
              </Link>
              <a href={site.instagram.url} className="btn" rel="noopener">
                {t.cta.follow}
              </a>
            </div>
          </div>
          <div className="rounded-img" style={{ aspectRatio: "3 / 4" }}>
            <Image src={about.portrait.src} alt={about.portrait.alt[locale]} width={about.portrait.w} height={about.portrait.h} sizes="(min-width: 900px) 44vw, 100vw" priority quality={75} style={{ objectPosition: "50% 20%" }} />
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="dates-title">
        <h2 id="dates-title" className="visually-hidden">
          {t.about.milestonesTitle}
        </h2>
        <ol className="milestones reveal">
          {about.milestones[locale].map((m) => (
            <li key={m.year}>
              <span className="milestones__year">{m.year}</span>
              <span>{m.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section" aria-labelledby="approach-title">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ "--stack": "24px" } as React.CSSProperties}>
            <h2 id="approach-title" className="display h2">
              {t.about.approachTitle}
            </h2>
            {about.approach[locale].map((b) => (
              <div key={b.title} className="stack" style={{ "--stack": "6px" } as React.CSSProperties}>
                <h3 className="approach__title">{b.title}</h3>
                <p className="prose">{b.text}</p>
              </div>
            ))}
          </div>
          <div className="stack" style={{ "--stack": "12px" } as React.CSSProperties}>
            {about.closeUps.map((p) => (
              <div key={p.src} className="rounded-img reveal" style={{ aspectRatio: "3 / 2" }}>
                <Image src={p.src} alt={p.alt[locale]} width={p.w} height={p.h} sizes="(min-width: 900px) 44vw, 100vw" quality={75} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="insp-title">
        <div className="panel panel--pink-soft reveal" style={{ display: "flex", flexWrap: "wrap", gap: "20px 48px", alignItems: "flex-start" }}>
          <h2 id="insp-title" className="display h3" style={{ flex: "0 1 280px" }}>
            {t.about.inspirationsTitle}
          </h2>
          <ul className="stack" style={{ flex: "1 1 320px", "--stack": "12px", fontSize: 19 } as React.CSSProperties}>
            {about.inspirations[locale].map((i) => (
              <li key={i.name}>
                <strong>{i.name}</strong>, {i.why}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container section" aria-labelledby="journey-title">
        <div className="stack" style={{ "--stack": "20px" } as React.CSSProperties}>
          <h2 id="journey-title" className="display h2">
            {t.about.journeyTitle}
          </h2>
          <p className="prose" style={{ fontSize: 19 }}>
            {about.journey[locale]}
          </p>
          <ExhibitionList items={highlightedExhibitions()} locale={locale} />
          <div className="cluster">
            <Link href={href(locale, "exhibitions")} className="link">
              {t.home.allExhibitions} →
            </Link>
            {cv ? (
              <a href={cv} className="btn" download>
                {about.cvLabel[locale]}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="studio-title" style={{ paddingTop: 0 }}>
        <h2 id="studio-title" className="display h3" style={{ marginBottom: 20 }}>
          {t.about.studioTitle}
        </h2>
        <div className="studio-grid reveal">
          {about.studio.map((p) => (
            <div key={p.src} className="rounded-img" style={{ aspectRatio: "3 / 4", borderRadius: "var(--radius-md)" }}>
              <Image src={p.src} alt={p.alt[locale]} width={p.w} height={p.h} sizes="(min-width: 960px) 380px, 50vw" quality={65} />
            </div>
          ))}
        </div>
        <div className="cluster" style={{ marginTop: 32 }}>
          <Link href={`${href(locale, "contact")}?sujet=commission`} className="btn btn--pink">
            {t.cta.commission}
          </Link>
          <Link href={href(locale, "contact")} className="btn">
            {t.cta.contactMe}
          </Link>
        </div>
      </section>
    </>
  );
}
