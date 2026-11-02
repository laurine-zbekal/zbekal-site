import type { Metadata } from "next";
import "./globals.css";
import { fontClassName } from "./fonts";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page introuvable · Zbekal",
  description: "Cette page n’existe pas.",
};

/** 404 globale : adresses qui ne correspondent à aucune page (français par défaut). */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClassName}>
      <body>
        <Header locale="fr" />
        <main id="contenu">
          <NotFoundPage locale="fr" />
        </main>
        <Footer locale="fr" />
      </body>
    </html>
  );
}
