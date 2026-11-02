/**
 * Monogramme LG (cercle rose, lettres rouges).
 * Version provisoire dessinée en SVG : pour utiliser le logo officiel, remplace
 * le contenu de ce composant par ton fichier (ou place logo.svg dans public/ et
 * affiche-le avec <img>).
 */
export function Logo({ size = 44, title = "Zbekal" }: { size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" role="img" aria-label={title}>
      <circle cx="22" cy="22" r="22" fill="#F4A6C3" />
      <path d="M11 12V33H21" fill="none" stroke="#D1232A" strokeWidth="4" strokeLinecap="square" />
      <path d="M32.5 16.5A8.5 8.5 0 1 0 35 22.5H27" fill="none" stroke="#D1232A" strokeWidth="4" strokeLinecap="square" />
    </svg>
  );
}
