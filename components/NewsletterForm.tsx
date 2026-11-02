"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";
import { ui, type Locale } from "@/content/ui";

/**
 * Inscription à la lettre d’atelier.
 * Tant que Brevo n’est pas branché, l’inscription arrive par e-mail (via /api/contact).
 * Pour brancher Brevo plus tard : remplacer l’appel fetch par le formulaire Brevo.
 */
export function NewsletterForm({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const t = ui[locale].newsletter;
  const c = ui[locale].cta;
  const id = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");
  const [startedAt] = useState(() => Date.now());

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) || !consent) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email: email.trim(), locale, website, elapsed: Date.now() - startedAt }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <p className="form__status form__status--ok" role="status">
        {t.success}
      </p>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit} noValidate>
      <div className="newsletter-form__row">
        <label htmlFor={`${id}-email`} className="visually-hidden">
          {t.email}
        </label>
        <input
          id={`${id}-email`}
          className="input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "invalid"}
          required
        />
        <button type="submit" className={`btn ${dark ? "btn--white" : "btn--dark"}`} disabled={status === "sending"}>
          {status === "sending" ? c.sending : c.subscribe}
        </button>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <label className="check" htmlFor={`${id}-consent`} style={dark ? { color: "inherit" } : undefined}>
        <input id={`${id}-consent`} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>{t.consent}</span>
      </label>
      {status === "invalid" ? (
        <p className="field__error" role="alert">
          {ui[locale].contact.form.invalid}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form__status form__status--err" role="alert">
          {t.error} <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      ) : null}
    </form>
  );
}
