"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { alternatePath, href, type RouteKey } from "@/lib/routes";
import { Logo } from "./Logo";
import { InstagramIcon, CloseIcon } from "./Icons";

const items: { key: RouteKey; label: keyof (typeof ui)["fr"]["nav"] }[] = [
  { key: "gallery", label: "gallery" },
  { key: "about", label: "about" },
  { key: "exhibitions", label: "exhibitions" },
  { key: "prices", label: "prices" },
];

export function Header({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuId = useId();
  const other: Locale = locale === "fr" ? "en" : "fr";
  const switchHref = alternatePath(pathname, other);

  // Ferme le menu à chaque navigation (ajustement d’état pendant le rendu).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  // Échap ferme le menu ; le défilement de la page est bloqué derrière.
  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (key: RouteKey) => {
    const base = href(locale, key);
    return pathname === base || (key !== "home" && pathname.startsWith(base + "/"));
  };

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Link href={href(locale, "home")} className="brand" aria-label={`${site.name} — ${t.nav.home}`}>
            <Logo size={42} />
            <span>
              <span className="brand__name">{site.name}</span>
              <span className="brand__sub">{site.artist} · {site.job[locale]}</span>
            </span>
          </Link>

          <nav className="nav" aria-label={t.menu.label}>
            {items.map((it) => (
              <Link key={it.key} href={href(locale, it.key)} className="nav__link" aria-current={isCurrent(it.key) ? "page" : undefined}>
                {t.nav[it.label]}
              </Link>
            ))}
            <Link href={href(locale, "contact")} className="btn btn--pink btn--sm nav__cta" aria-current={isCurrent("contact") ? "page" : undefined}>
              {t.cta.commission}
            </Link>
            <Link href={switchHref} className="nav__lang" hrefLang={other} lang={other} aria-label={`${t.lang.code} · ${t.lang.switch}`}>
              {t.lang.code}
            </Link>
            <a href={site.instagram.url} className="icon-btn" aria-label={`Instagram @${site.instagram.handle}`} rel="noopener">
              <InstagramIcon />
            </a>
          </nav>

          <div className="header__right">
            <Link href={switchHref} className="nav__lang" hrefLang={other} lang={other} aria-label={`${t.lang.code} · ${t.lang.switch}`}>
              {t.lang.code}
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon size={16} /> : null}
              {open ? t.menu.close : t.menu.open}
            </button>
          </div>
        </div>

      </header>
      {/* Menu mobile : un panneau plein écran, posé à côté de l’en-tête (pas dedans), avec sa propre barre.
          Il ne dépend donc ni de la position de l’en-tête ni du bandeau du haut. */}
      <div id={menuId} className="menu" data-open={open ? "true" : "false"}>
        <div className="menu__bar">
          <Link href={href(locale, "home")} className="brand" aria-label={`${site.name} — ${t.nav.home}`}>
            <Logo size={42} />
            <span>
              <span className="brand__name">{site.name}</span>
            </span>
          </Link>
          <button type="button" className="menu__close" onClick={() => setOpen(false)}>
            <CloseIcon size={16} />
            {t.menu.close}
          </button>
        </div>
        <nav aria-label={t.menu.label}>
          <ul className="menu__list">
            <li>
              <Link href={href(locale, "home")} className="menu__link" aria-current={pathname === href(locale, "home") ? "page" : undefined}>
                {t.nav.home}
              </Link>
            </li>
            {items.map((it) => (
              <li key={it.key}>
                <Link href={href(locale, it.key)} className="menu__link" aria-current={isCurrent(it.key) ? "page" : undefined}>
                  {t.nav[it.label]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <Link href={href(locale, "contact")} className="btn btn--pink">
              {t.cta.commission}
            </Link>
            <a href={site.instagram.url} className="btn" rel="noopener">
              <InstagramIcon size={18} /> {t.cta.follow}
            </a>
            <Link href={switchHref} className="btn" hrefLang={other} lang={other}>
              {t.lang.switch}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
