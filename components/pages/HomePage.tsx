import Image from "next/image";
import Link from "next/link";
import { site, locationLabel } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { commissionFormats, commissionPhoto, home, studioPhotos } from "@/content/textes";
import { carteCadeau } from "@/content/carte-cadeau";
import { tarifs } from "@/content/tarifs";
import { highlightedExhibitions } from "@/content/expositions";
import { getCollection } from "@/content/collections";
import { galleryHref, href } from "@/lib/routes";
import { artworksOf, availableArtworks, getArtwork, hasDimensions, onOrderArtworks, upcomingExhibition } from "@/lib/content";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { ArtworkCard } from "@/components/ArtworkCard";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ExhibitionList } from "@/components/ExhibitionList";
import { InstagramIcon } from "@/components/Icons";

const text = (v: string | Record<Locale, string>, locale: Locale) => (typeof v === "string" ? v : v[locale]);
const euros = (n: number, locale: Locale) => new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export function HomePage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const availableWorks = availableArtworks();
  const available = availableWorks.length;
  // Vitrine : les toiles Amazoni disponibles (3 en grand, les suivantes en ligne), puis les autres en vignettes.
  const jungle = availableWorks.filter((a) => a.collection === "amazoni");
  // à droite de la grande carte : deux toiles carrées, pour que les deux colonnes tombent à la même hauteur
  const showcase = [jungle[0], ...jungle.filter((a) => a !== jungle[0] && hasDimensions(a) && a.width === a.height).slice(0, 2)].filter(Boolean);
  const jungleRest = jungle.filter((a) => !showcase.includes(a));
  const others = availableWorks.filter((a) => a.collection !== "amazoni");
  const adoptedCount = onOrderArtworks().length;
  const inspiredPicks = home.inspiredPicks.map((slug) => getArtwork(slug)).filter((a) => a != null && a.status === "sur-commande");
  const amazoni = getCollection("amazoni");
  const amazoniShown = artworksOf("amazoni").length;
  const amazoniPlanned = amazoni?.planned ?? amazoniShown;
  // bandeau d’actualité : l’exposition en cours ou la prochaine (content/expositions.ts)
  const news = upcomingExhibition();
  const giftFrom = euros(Math.min(...tarifs.formats.map((f) => f.price)), locale);

  return (
    <>
      <JsonLd data={[websiteJsonLd(locale), personJsonLd(locale)]} />

      {/* Actualité : un bandeau fixe, bien visible, au-dessus du titre */}
      {news ? (
        <section className="container home-news" aria-label={locale === "fr" ? "Actualité" : "News"}>
          <Link href={href(locale, "exhibitions")} className="home-news__link">
            <span className="home-news__tag">{news.now ? t.exhibitions.nowTag : t.exhibitions.upcoming}</span>
            <span className="home-news__text">
              <strong>{news.banner ? news.banner.title[locale] : `${news.title[locale]} ·`}</strong>{" "}
              {news.banner ? news.banner.text[locale] : `${news.date[locale]}${news.details ? ` · ${news.details[locale]}` : ""}`}
            </span>
            <span className="home-news__more">{t.exhibitions.more} →</span>
          </Link>
        </section>
      ) : null}

      {/* Hero */}
      <section className="container hero" aria-labelledby="hero-title">
        <div className="stack" style={{ "--stack": "24px" } as React.CSSProperties}>
          <span className="badge badge--yellow" style={{ alignSelf: "flex-start", whiteSpace: "normal" }}>
            {site.job[locale]} · {locationLabel(locale)}
          </span>
          <h1 id="hero-title" className="display h1 hero__title">
            {home.title[locale][0]} <span className="accent">{home.title[locale][1]}</span>
          </h1>
          <p className="lead" style={{ fontSize: "clamp(19px, 2vw, 22px)", color: "var(--ink)" }}>
            {home.intro[locale](available)}
          </p>
          <div className="cluster" style={{ "--cluster": "12px 14px" } as React.CSSProperties}>
            <Link href={galleryHref(locale, "available")} className="btn btn--pink btn--lg">
              {t.cta.seeWorks}
            </Link>
            <Link href={href(locale, "contact")} className="btn btn--lg">
              {t.cta.commission}
            </Link>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__img">
            <Image src="/atelier/hero.jpg" alt={home.heroAlt[locale]} width={2200} height={1457} sizes="(min-width: 900px) 46vw, 100vw" priority quality={75} style={{ objectPosition: "50% 40%" }} />
          </div>
          {available > 0 ? (
            <Link href={galleryHref(locale, "available")} className="hero__badge">
              {t.home.badge(available)}
            </Link>
          ) : null}
        </div>
      </section>

      {/* Dispo maintenant */}
      <section className="band" aria-labelledby="dispo-title">
        <div className="container section">
          <div className="section-head">
            <div className="stack" style={{ "--stack": "14px" } as React.CSSProperties}>
              <h2 id="dispo-title" className="display h2">
                {t.home.availableTitle}
              </h2>
              {available > 0 ? <span className="count-pill">{t.home.availableCount(available)}</span> : null}
            </div>
            <p className="lead" style={{ maxWidth: "44ch" }}>
              {t.home.availableLead}
            </p>
          </div>

          {showcase.length ? (
            <div className="showcase">
              {showcase.map((a, i) => (
                <ArtworkCard
                  key={a.slug}
                  artwork={a}
                  locale={locale}
                  priority={i < 2}
                  lead={i === 0}
                  className={i === 0 ? "showcase__lead reveal" : "reveal"}
                  sizes={i === 0 ? "(min-width: 1240px) 740px, (min-width: 960px) 60vw, 100vw" : "(min-width: 1240px) 480px, (min-width: 960px) 40vw, (min-width: 720px) 50vw, 100vw"}
                />
              ))}
            </div>
          ) : null}

          {jungleRest.length ? (
            <div className="grid-cards grid-cards--top" style={{ marginTop: "clamp(16px, 2.4vw, 28px)" }}>
              {jungleRest.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} locale={locale} className="reveal" />
              ))}
            </div>
          ) : null}

          {others.length ? (
            <div className="stack" style={{ "--stack": "16px", marginTop: "clamp(32px, 5vw, 56px)" } as React.CSSProperties}>
              <h3 className="display h3">{t.home.moreAvailable}</h3>
              <div className={`tiles tiles--${Math.min(others.length, 5)}`}>
                {others.map((a) => (
                  <ArtworkCard key={a.slug} artwork={a} locale={locale} mini className="reveal" sizes="(min-width: 1000px) 230px, (min-width: 720px) 31vw, 46vw" />
                ))}
              </div>
            </div>
          ) : null}

          {amazoniPlanned > amazoniShown ? (
            <div className="soon reveal">
              <span className="soon__num">
                {String(amazoniShown).padStart(2, "0")}
                <small>/{amazoniPlanned}</small>
              </span>
              <div className="soon__body">
                <p className="soon__title">{t.home.upcomingTitle}</p>
                <p>{amazoni?.upcoming?.[locale]}</p>
              </div>
              <Link href="#newsletter" className="btn btn--dark">
                {t.cta.notify}
              </Link>
            </div>
          ) : null}

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

      {/* Déjà partie ? Je crée la tienne */}
      {inspiredPicks.length ? (
        <section className="container section" aria-labelledby="inspired-title">
          <div className="section-head">
            <h2 id="inspired-title" className="display h2">
              {t.home.inspiredTitle}
            </h2>
            <p className="lead" style={{ maxWidth: "46ch" }}>
              {t.home.inspiredLead(adoptedCount)}
            </p>
          </div>
          <div className="tiles tiles--4">
            {inspiredPicks.map((a) => (a ? <ArtworkCard key={a.slug} artwork={a} locale={locale} mini className="reveal" sizes="(min-width: 1240px) 280px, (min-width: 720px) 24vw, 46vw" /> : null))}
          </div>
          <div className="cluster" style={{ marginTop: 28 }}>
            <Link href={href(locale, "gallery")} className="btn">
              {t.cta.seeAllWorks}
            </Link>
            <Link href={`${href(locale, "contact")}?sujet=commission`} className="link">
              {t.cta.commission} →
            </Link>
          </div>
        </section>
      ) : null}

      {/* Commande sur mesure */}
      <section className="container" aria-labelledby="commission-title">
        <div className="panel panel--pink commission reveal">
          <div className="commission__img rounded-img">
            <Image src={commissionPhoto.src} alt={commissionPhoto.alt[locale]} width={commissionPhoto.w} height={commissionPhoto.h} sizes="(min-width: 900px) 34vw, 100vw" quality={75} style={{ objectPosition: "50% 30%" }} />
          </div>
          <div className="commission__body stack" style={{ "--stack": "16px" } as React.CSSProperties}>
            <h2 id="commission-title" className="display h2" style={{ color: "#fff" }}>
              {t.home.commissionTitle}
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: "50ch" }}>{t.home.commissionText}</p>
            {commissionFormats.show ? (
              <div className="stack" style={{ "--stack": "10px" } as React.CSSProperties}>
                <span className="formats__label">{site.showPrices ? t.home.formatsLabel : t.home.formatsOnlyLabel}</span>
                <ul className="formats">
                  {commissionFormats.items.map((f) => (
                    <li key={text(f.name, "fr")}>
                      <strong>{text(f.name, locale)}</strong>
                      <span>{text(f.size, locale)}</span>
                      {site.showPrices ? <span>{f.price[locale]}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="cluster" style={{ "--cluster": "10px 18px" } as React.CSSProperties}>
              <Link href={`${href(locale, "contact")}?sujet=commission`} className="btn btn--white btn--lg">
                {t.home.commissionCta}
              </Link>
              <Link href={href(locale, "prices")} className="link" style={{ color: "#fff" }}>
                {t.cta.seePrices} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carte cadeau */}
      <section className="container" aria-labelledby="gift-home-title">
        <div className="panel panel--green gift-home reveal">
          <div className="stack" style={{ "--stack": "16px" } as React.CSSProperties}>
            <span className="badge badge--yellow" style={{ alignSelf: "flex-start" }}>
              {carteCadeau.home.badge[locale]}
            </span>
            <h2 id="gift-home-title" className="display h2" style={{ color: "#fff" }}>
              {carteCadeau.home.title[locale]}
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: "50ch" }}>{carteCadeau.home.text[locale](giftFrom)}</p>
            <div className="cluster" style={{ "--cluster": "10px 18px" } as React.CSSProperties}>
              <Link href={href(locale, "gift")} className="btn btn--white btn--lg">
                {carteCadeau.home.cta[locale]}
              </Link>
            </div>
          </div>
          <div className="gift-home__img rounded-img">
            <Image src={carteCadeau.photos.recto.src} alt={carteCadeau.photos.recto.alt[locale]} width={carteCadeau.photos.recto.w} height={carteCadeau.photos.recto.h} sizes="(min-width: 900px) 34vw, 100vw" quality={78} />
          </div>
        </div>
      </section>

      {/* Salut, moi c’est Laurine */}
      <section className="container section" aria-labelledby="about-title">
        <div className="panel panel--pink-soft grid-2 reveal">
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
          <div className="rounded-img" style={{ aspectRatio: "3 / 4", maxWidth: 460, justifySelf: "end", width: "100%" }}>
            <Image src="/atelier/laurine-sourire.jpg" alt={home.portraitAlt[locale]} width={1457} height={2200} sizes="(min-width: 900px) 40vw, 100vw" quality={75} />
          </div>
        </div>
      </section>

      {/* L’atelier, en direct */}
      <section className="container section" aria-labelledby="studio-title" style={{ paddingTop: 0 }}>
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
              <Image src={p.src} alt={p.alt[locale]} width={p.w} height={p.h} sizes="(min-width: 720px) 25vw, 50vw" quality={60} />
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
        <ExhibitionList items={highlightedExhibitions()} locale={locale} compact />
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
