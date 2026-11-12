import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

/**
 * Réception des formulaires (contact, commande sur mesure, newsletter).
 * Envoi par e-mail via Resend. Variables d’environnement :
 *   RESEND_API_KEY  — clé API Resend (obligatoire pour l’envoi)
 *   CONTACT_TO      — adresse qui reçoit les messages (défaut : l’e-mail du site)
 *   CONTACT_FROM    — expéditeur, un domaine vérifié chez Resend (défaut : onboarding@resend.dev)
 */

type Payload = {
  type?: "contact" | "newsletter";
  kind?: "acquisition" | "commission" | "gift" | "other";
  artwork?: string;
  artworkLabel?: string;
  name?: string;
  email?: string;
  message?: string;
  locale?: "fr" | "en";
  website?: string; // pot de miel : doit rester vide
  elapsed?: number; // temps passé sur le formulaire (ms)
  page?: string;
};

// Limite simple : 5 envois par adresse IP et par 10 minutes (mémoire de l’instance).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const clean = (s: unknown, max = 5000) => (typeof s === "string" ? s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "");
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "too_many_requests" }, { status: 429 });

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Robots : pot de miel rempli, ou formulaire soumis en moins de 3 secondes.
  if (clean(body.website) || (typeof body.elapsed === "number" && body.elapsed < 3000)) {
    return NextResponse.json({ ok: true }); // on ne leur dit rien
  }

  const email = clean(body.email, 200);
  if (!isEmail(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  const locale = body.locale === "en" ? "en" : "fr";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante : le formulaire ne peut pas envoyer d’e-mail.");
    return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
  }
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`;
  const resend = new Resend(apiKey);

  if (body.type === "newsletter") {
    const subject = `[${site.name}] Nouvelle inscription à la lettre d’atelier`;
    const text = [`Nouvelle inscription à la newsletter.`, ``, `E-mail : ${email}`, `Langue : ${locale}`, `Date : ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}`, ``, `À ajouter à ta liste Brevo (consentement coché sur le site).`].join("\n");
    const { error } = await resend.emails.send({ from, to: [to], subject, text, replyTo: email });
    if (error) {
      console.error(error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 200);
  const message = clean(body.message, 5000);
  if (!name || !message) return NextResponse.json({ error: "missing_fields" }, { status: 400 });

  const kinds: Record<string, string> = { acquisition: "Acquérir une toile", commission: "Commande sur mesure", gift: "Carte cadeau", other: "Autre" };
  const kind = kinds[body.kind ?? ""] ?? "Autre";
  const artwork = clean(body.artworkLabel ?? body.artwork, 200);
  const subject = `[${site.name}] ${kind}${artwork ? ` — ${artwork}` : ""} — ${name}`;
  const text = [
    `Nouveau message depuis le site (${locale === "en" ? "version anglaise" : "version française"}).`,
    ``,
    `Objet : ${kind}`,
    artwork ? `Toile : ${artwork}` : null,
    `Nom : ${name}`,
    `E-mail : ${email}`,
    body.page ? `Page : ${clean(body.page, 300)}` : null,
    `Date : ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}`,
    ``,
    `Message :`,
    message,
    ``,
    `— Réponds directement à cet e-mail pour écrire à ${name}.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const { error } = await resend.emails.send({ from, to: [to], subject, text, replyTo: email });
  if (error) {
    console.error(error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
