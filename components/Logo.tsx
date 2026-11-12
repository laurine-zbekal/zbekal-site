import type { CSSProperties } from "react";

/**
 * Monogramme LG de Laurine Girard : lettres rouges sur cercle rose.
 * Redessiné d’après la photo de profil Instagram. Le même dessin est dans public/logo.svg.
 *
 * Pendant les fêtes (voir `festiveUntil` dans content/site.ts), quelques paillettes dorées
 * scintillent discrètement sur le logo. Elles sont dans le dessin en permanence, mais restent
 * cachées hors période (voir « Paillettes des fêtes » dans globals.css).
 */
export type GlintSpec = { x: number; y: number; r: number; on: "red" | "pink" };

/** étoile à quatre branches, de rayon 1, centrée sur 0 0 */
const STAR = "M0 -1Q.13 -.13 1 0Q.13 .13 0 1Q-.13 .13 -1 0Q-.13 -.13 0 -1Z";

/** Une paillette : `delay` = moment où elle commence à scintiller (s), `pace` = durée d’un battement (s) */
export function Glint({ x, y, r, on, delay, pace }: GlintSpec & { delay: number; pace: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r})`}>
      <g className="glint" style={{ "--a": `${delay}s`, "--t": `${pace}s` } as CSSProperties}>
        {/* or plus soutenu sur le rose (pour rester lisible), plus clair sur le rouge */}
        <path d={STAR} fill={on === "red" ? "#FFD86B" : "#D9A21B"} />
        <circle r=".2" fill="#FFF6D0" />
      </g>
    </g>
  );
}

/** les paillettes du petit logo (menu) : cinq, pour rester discret */
const GLINTS: (GlintSpec & { delay: number; pace: number })[] = [
  { x: 232, y: 222, r: 46, on: "red", delay: -0.4, pace: 3.2 },
  { x: 508, y: 500, r: 50, on: "red", delay: -1.9, pace: 3.8 },
  { x: 562, y: 186, r: 38, on: "pink", delay: -1.1, pace: 2.9 },
  { x: 128, y: 470, r: 38, on: "pink", delay: -2.6, pace: 3.5 },
  { x: 452, y: 208, r: 34, on: "red", delay: -0.9, pace: 4.1 },
];

export function Logo({ size = 44, title = "Zbekal" }: { size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 719 719" role="img" aria-label={title}>
      <circle cx="359.5" cy="359.5" r="359.5" fill="#FEBCCA" />
      <g fill="#FE0000">
        <path d="M173 171H266V395A60 60 0 0 0 326 455H410V548H326A153 153 0 0 1 173 395Z" />
        <path d="M314 171H551V331.5A125 125 0 0 0 440 264H314Z" />
        <path d="M314 312H398A153 153 0 0 1 551 465V548H458V465A60 60 0 0 0 398 405H314Z" />
      </g>
      <g className="glitter">
        {GLINTS.map((g, i) => (
          <Glint key={i} {...g} />
        ))}
      </g>
    </svg>
  );
}
