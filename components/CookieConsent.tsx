"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

/**
 * Bandeau cookies + Google Analytics 4.
 * - Rien n’est chargé ni envoyé à Google tant que la personne n’a pas cliqué sur « Accepter ».
 * - « Refuser » et « Accepter » sont au même niveau, avec le même bouton (règle de la CNIL).
 * - Le choix (accepté ou refusé) est gardé 6 mois dans le navigateur, puis la question est reposée.
 * - Le lien « Gérer les cookies » du pied de page rouvre le bandeau (voir CookieSettingsLink plus bas).
 * Le composant n’est monté que si un identifiant Google Analytics est renseigné (content/site.ts, `analytics.gaId`).
 * Les textes sont dans content/ui.ts (`cookies`) ; ils sont passés par SiteShell et Footer.
 */

export type CookieLabels = { label: string; title: string; text: string; more: string; refuse: string; accept: string; manage: string };

const KEY = "zbekal-cookies";
/** à augmenter si le texte ou les finalités du bandeau changent : la question est alors reposée à tout le monde */
const VERSION = 1;
const SIX_MONTHS = 183 * 24 * 60 * 60 * 1000;
/**
 * Durée de vie des cookies Google Analytics : 13 mois, sans prolongation à chaque visite.
 * Attention : la balise Google ne tient pas compte de cette valeur passée par le site (constaté le 19/11/2026).
 * Le vrai réglage est dans Google Analytics : Administration > Flux de données > Configurer les paramètres de la balise
 * > Remplacer les paramètres des cookies (13 mois, par rapport à la première visite). On garde la valeur ici au cas où.
 */
const THIRTEEN_MONTHS_S = 395 * 24 * 60 * 60;
const OPEN_EVENT = "zbekal:cookies";

type Choice = { v: number; analytics: boolean; at: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Choice;
    if (c.v !== VERSION || typeof c.analytics !== "boolean") return null;
    if (Date.now() - Date.parse(c.at) > SIX_MONTHS) return null;
    return c;
  } catch {
    return null;
  }
}

function saveChoice(analytics: boolean) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics, at: new Date().toISOString() } satisfies Choice));
  } catch {
    /* stockage indisponible (navigation privée stricte) : le choix vaut pour la page en cours */
  }
}

function loadAnalytics(id: string) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = false;
  if (document.getElementById("ga-script")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // mesure d’audience seulement : aucune fonction publicitaire
  window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: THIRTEEN_MONTHS_S,
    cookie_update: false,
    cookie_flags: "SameSite=Lax;Secure",
  });
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Retrait de l’accord : Google Analytics est coupé et ses cookies sont effacés. */
function stopAnalytics(id: string) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = true;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function CookieConsent({ gaId, labels: t, privacyHref }: { gaId: string; labels: CookieLabels; privacyHref: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice?.analytics) loadAnalytics(gaId);
    // pas encore de choix : le bandeau arrive une fois l’écran d’ouverture passé (3,1 s à la première page)
    const introSeen = document.documentElement.getAttribute("data-intro") === "seen";
    const timer = choice ? undefined : window.setTimeout(() => setOpen(true), introSeen ? 500 : 3400);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, [gaId]);

  const choose = useCallback(
    (analytics: boolean) => {
      saveChoice(analytics);
      if (analytics) loadAnalytics(gaId);
      else stopAnalytics(gaId);
      setOpen(false);
    },
    [gaId],
  );

  if (!open) return null;
  return (
    <aside className="cookie" role="region" aria-label={t.label}>
      <p className="cookie__title">{t.title}</p>
      <p className="cookie__text">
        {t.text}{" "}
        <Link href={`${privacyHref}#cookies`}>{t.more}</Link>
      </p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--sm" onClick={() => choose(false)}>
          {t.refuse}
        </button>
        <button type="button" className="btn btn--sm" onClick={() => choose(true)}>
          {t.accept}
        </button>
      </div>
    </aside>
  );
}

/** Lien du pied de page : rouvre le bandeau pour changer d’avis. */
export function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button type="button" className="footer__link-btn" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {label}
    </button>
  );
}
