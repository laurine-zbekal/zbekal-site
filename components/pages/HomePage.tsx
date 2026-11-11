import Image from "next/image";
import Link from "next/link";
import { site, locationLabel } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { home, studioPhotos } from "@/content/textes";
import { exhibitions } from "@/content/expositions";
import { getCollection } from "@/content/collections";
import { href } from "@/lib/routes";
import { artworksOf, availableArtworks, featuredArtworks } from "@/lib/content";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { ArtworkCard } from "@/components/ArtworkCard";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ExhibitionList } from "@/components/ExhibitionList";
import { InstagramIcon } from "@/components/Icons";

export function HomePage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const available = availableArtworks().length;
  const featured = featuredArtworks(5);
  const amazoni = getCollection("amazoni");
  const amazoniShown = artworksOf("amazoni").length;
  const amazoniPlanned = amazoni?.planned ?? amazoniShown;
  const latestExhibitions = exhibitions.slice(0, 3);

  return (
    <>
      <JsonLd data={[websiteJsonLd(locale), personJsonLd(locale)]} />

      {/* Hero */}
      <section className="container hero" aria-labelledby="hero-title">
        <div className="stack" style={{ "--stack": "24px" } as React.CSSProperties}>
          <span className="badge badge--yellow" style={{ alignSelf: "flex-start" }}>
            {site.job[locale]} · {locationLabel(locale)}
          </span>
          <h1 id="hero-title" className="display h1 hero__title">
            {home.title[locale][0]} <span className="accent">{home.title[locale][1]}</span>
          </h1>
          <p className="lead" style={{ fontSize: "clamp(19px, 2vw, 22px)", color: "var(--ink)" }}>
            {home.intro[locale]}
          </p>
          <div className="cluster" style={{ "--cluster": "12px 14px" } as React.CSSProperties}>
            <Link href={href(locale, "gallery")} className="btn btn--pink btn--lg">
              {t.cta.seeWorks}
            </Link>
            <Link href={`${href(locale, "contact")}?sujet=commission`} className="btn btn--lg">
              {t.cta.commission}
            </Link>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__img">
            <Image src="/atelier/hero.jpg" alt={home.heroAlt[locale]} width={2000} height={1325} sizes="(min-width: 900px) 46vw, 100vw" priority quality={75} style={{ objectPosition: "50% 40%" }} />
          </div>
          {available > 0 ? (
            <Link href={href(locale, "gallery")} className="hero__badge">
              {t.home.badge(available)}
            </Link>
          ) : null}
        </div>
      </section>

      {/* Dispo maintenant */}
      <section className="band" aria-labelledby="dispo-title">
        <div className="container section">
          <div className="section-head">
            <h2 id="dispo-title" className="display h2">
              {t.home.availableTitle}
            </h2>
            <p className="lead" style={{ maxWidth: "46ch" }}>
              {t.home.availableLead}
            </p>
          </div>
          <div className="grid-cards">
            {featured.map((a, i) => (
              <div key={a.slug} className="reveal">
                <ArtworkCard artwork={a} locale={locale} priority={i < 2} />
              </div>
            ))}
            {amazoniPlanned > amazoniShown ? (
              <Link href="#newsletter" className="card card--teaser reveal">
                <span className="card__num">
                  {String(amazoniShown).padStart(2, "0")}
                  <small>/{amazoniPlanned}</small>
                </span>
                <span className="stack" style={{ "--stack": "10px" } as React.CSSProperties}>
                  <span style={{ fontWeight: 700, fontSize: 24, lineHeight: 1.15 }}>{t.home.upcomingTitle}</span>
                  <span style={{ fontSize: 16, lineHeight: 1.45 }}>{amazoni?.upcoming?.[locale]}</span>
                  <span className="link">{t.cta.notify} →</span>
                </span>
              </Link>
            ) : null}
          </div>
          <div className="cluster" style={{ marginTop: 32 }}>
            <Link href={href(locale, "gallery")} className="btn">
              {t.cta.allWorks}
            </Link>
            {amazoni ? (
              <Link href={href(locale, "collection", "amazoni")} className="link">
                {t.cta.seeCollection} Amazoni →
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Salut, moi c’est Laurine */}
      <section className="container section" aria-labelledby="about-title">
        <div className="panel panel--pink-soft grid-2 reveal">
          <div className="rounded-img" style={{ aspectRatio: "3 / 4", maxWidth: 460 }}>
            <Image src="/atelier/laurine-sourire.jpg" alt={home.portraitAlt[locale]} width={1059} height={1600} sizes="(min-width: 900px) 40vw, 100vw" quality={75} />
          </div>
          <div className="stack" style={{ "--stack": "18px" } as React.CSSProperties}>
            <h2 id="about-title" className="display h2">
              {t.home.aboutTitle}
            </h2>
            {home.about[locale].map((p, i) => (
              <p key={i} className="prose" style={{ fontSize: 19 }}>
                {p}
              </p>
            ))}
            <Link href={href(locale, "about")} className="btn" style={{ alignSelf: "flex-start" }}>
              {t.cta.readMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Commande sur mesure */}
      <section className="container" aria-labelledby="commission-title">
        <div className="panel panel--pink reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px 56px" }}>
          <div className="stack" style={{ flex: "1 1 420px", minWidth: 0, "--stack": "14px" } as React.CSSProperties}>
            <h2 id="commission-title" className="display h2" style={{ color: "#fff" }}>
              {t.home.commissionTitle}
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: "50ch" }}>{t.home.commissionText}</p>
          </div>
          <Link href={`${href(locale, "contact")}?sujet=commission`} className="btn btn--white btn--lg">
            {t.home.commissionCta}
          </Link>
        </div>
      </section>

      {/* L’atelier, en direct */}
      <section className="container section" aria-labelledby="studio-title">
        <div className="section-head" style={{ marginBottom: 24 }}>
          <h2 id="studio-title" className="display h3">
            {t.home.studioTitle}
          </h2>
          <a href={site.instagram.url} className="btn" rel="noopener">
            <InstagramIcon size={18} /> {t.cta.follow}
          </a>
        </div>
        <div className="ig-grid reveal">
          {studioPhotos.slice(0, 4).map((p) => (
            <a key={p.src} href={site.instagram.url} rel="noopener" aria-label={`Instagram @${site.instagram.handle} — ${p.alt[locale]}`}>
              <Image src={p.src} alt="" width={p.w} height={p.h} sizes="(min-width: 720px) 25vw, 50vw" quality={60} />
            </a>
          ))}
        </div>
      </section>

      {/* Expositions */}
      <section className="container section--tight" aria-labelledby="expo-title">
        <div className="section-head" style={{ marginBottom: 20 }}>
          <h2 id="expo-title" className="display h3">
            {t.home.exhibitionsTitle}
          </h2>
          <Link href={href(locale, "exhibitions")} className="link">
            {t.home.allExhibitions} →
          </Link>
        </div>
        <ExhibitionList items={latestExhibitions} locale={locale} compact />
      </section>

      {/* Newsletter */}
      <section className="container section" aria-labelledby="newsletter-title" id="newsletter">
        <div className="panel panel--yellow reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px 56px" }}>
          <div className="stack" style={{ flex: "1 1 360px", minWidth: 0, "--stack": "10px" } as React.CSSProperties}>
            <h2 id="newsletter-title" className="display h2">
              {t.home.newsletterTitle}
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.45, maxWidth: "44ch" }}>{t.home.newsletterText}</p>
          </div>
          <div style={{ flex: "1 1 380px", minWidth: 0 }}>
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
