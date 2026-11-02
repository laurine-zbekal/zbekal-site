import Link from "next/link";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section className="container section notfound">
      <span className="display" style={{ fontSize: "clamp(72px, 14vw, 180px)", lineHeight: 0.9, color: "var(--pink)" }}>
        404
      </span>
      <h1 className="display h2">{t.notFound.title}</h1>
      <p className="lead">{t.notFound.text}</p>
      <div className="cluster">
        <Link href={href(locale, "gallery")} className="btn btn--pink">
          {t.notFound.cta}
        </Link>
        <Link href={href(locale, "home")} className="btn">
          {t.nav.home}
        </Link>
      </div>
    </section>
  );
}
