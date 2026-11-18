/**
 * Monogramme LG de Laurine Girard : lettres roses sur cercle bordeaux (couleurs changées le 18 novembre 2026).
 * Redessiné d’après la photo de profil Instagram. Le même dessin est dans public/logo.svg.
 */
export function Logo({ size = 44, title = "Zbekal" }: { size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 719 719" role="img" aria-label={title}>
      <circle cx="359.5" cy="359.5" r="359.5" fill="#680D22" />
      <g fill="#F0BFC2">
        <path d="M173 171H266V395A60 60 0 0 0 326 455H410V548H326A153 153 0 0 1 173 395Z" />
        <path d="M314 171H551V331.5A125 125 0 0 0 440 264H314Z" />
        <path d="M314 312H398A153 153 0 0 1 551 465V548H458V465A60 60 0 0 0 398 405H314Z" />
      </g>
    </svg>
  );
}
