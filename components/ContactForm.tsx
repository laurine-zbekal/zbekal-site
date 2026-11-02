"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";
import { href } from "@/lib/routes";

type Kind = "acquisition" | "commission" | "other";
export type ArtworkOption = { slug: string; label: string };

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export function ContactForm({ locale, artworks }: { locale: Locale; artworks: ArtworkOption[] }) {
  const t = ui[locale].contact.form;
  const id = useId();

  const [kind, setKind] = useState<Kind>("acquisition");
  const [artwork, setArtwork] = useState("");

  // Pré-remplissage depuis l’adresse : /contact?sujet=commission ou ?oeuvre=<slug>
  // (une seule synchronisation après l’hydratation ; le rendu serveur reste identique pour tous)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const k = params.get("sujet") ?? params.get("subject");
    const a = params.get("oeuvre") ?? params.get("artwork") ?? "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (k === "acquisition" || k === "commission" || k === "other") setKind(k);
    if (a && artworks.some((x) => x.slug === a)) setArtwork(a);
  }, [artworks]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // pot de miel anti-spam
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [startedAt] = useState(() => Date.now());

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = t.required;
    if (!email.trim()) e.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = t.invalidEmail;
    if (!message.trim()) e.message = t.required;
    if (!consent) e.consent = t.consentRequired;
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          kind,
          artwork: artwork || undefined,
          artworkLabel: artworks.find((a) => a.slug === artwork)?.label,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          locale,
          website,
          elapsed: Date.now() - startedAt,
          page: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="form__status form__status--ok" role="status">
        {t.success}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${id}-kind`}>{t.kind}</label>
        <select id={`${id}-kind`} className="select" value={kind} onChange={(e) => setKind(e.target.value as Kind)}>
          <option value="acquisition">{t.kinds.acquisition}</option>
          <option value="commission">{t.kinds.commission}</option>
          <option value="other">{t.kinds.other}</option>
        </select>
      </div>

      {kind === "acquisition" && artworks.length > 0 ? (
        <div className="field">
          <label htmlFor={`${id}-artwork`}>{t.artwork}</label>
          <select id={`${id}-artwork`} className="select" value={artwork} onChange={(e) => setArtwork(e.target.value)}>
            <option value="">{t.artworkNone}</option>
            {artworks.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className={`field${errors.name ? " field--error" : ""}`}>
        <label htmlFor={`${id}-name`}>{t.name}</label>
        <input id={`${id}-name`} className="input" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} required />
        {errors.name ? (
          <span id={`${id}-name-err`} className="field__error">
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className={`field${errors.email ? " field--error" : ""}`}>
        <label htmlFor={`${id}-email`}>{t.email}</label>
        <input id={`${id}-email`} className="input" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined} required />
        {errors.email ? (
          <span id={`${id}-email-err`} className="field__error">
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className={`field${errors.message ? " field--error" : ""}`}>
        <label htmlFor={`${id}-message`}>{t.message}</label>
        <textarea id={`${id}-message`} className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.messagePlaceholder[kind]} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-message-err` : undefined} required />
        {errors.message ? (
          <span id={`${id}-message-err`} className="field__error">
            {errors.message}
          </span>
        ) : null}
      </div>

      {/* Champ invisible : s’il est rempli, c’est un robot. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className={`field${errors.consent ? " field--error" : ""}`}>
        <label className="check" htmlFor={`${id}-consent`}>
          <input id={`${id}-consent`} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={!!errors.consent} />
          <span>
            {t.consent}{" "}
            <Link href={href(locale, "privacy")} className="link">
              {t.privacy}
            </Link>
          </span>
        </label>
        {errors.consent ? <span className="field__error">{errors.consent}</span> : null}
      </div>

      {Object.keys(errors).length ? (
        <p className="field__error" role="alert">
          {t.invalid}
        </p>
      ) : null}

      {status === "error" ? (
        <div className="form__status form__status--err" role="alert">
          {t.error} <a href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      ) : null}

      <div>
        <button type="submit" className="btn btn--pink btn--lg" disabled={status === "sending"}>
          {status === "sending" ? ui[locale].cta.sending : ui[locale].cta.send}
        </button>
      </div>
    </form>
  );
}
