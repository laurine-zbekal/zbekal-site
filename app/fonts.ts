import localFont from "next/font/local";

/** Anton : titres en capitales condensées (licence OFL, fichier dans app/fonts). */
export const anton = localFont({
  src: "./fonts/anton-latin-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-anton",
  adjustFontFallback: "Arial",
});

/** DM Sans variable : texte courant (licence OFL). */
export const dmSans = localFont({
  // Un seul fichier (graisse variable) : l’italique, rare sur le site, est synthétisé par le navigateur.
  src: [{ path: "./fonts/dm-sans-latin-variable.woff2", weight: "100 1000", style: "normal" }],
  display: "swap",
  variable: "--font-dm",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${anton.variable} ${dmSans.variable}`;
