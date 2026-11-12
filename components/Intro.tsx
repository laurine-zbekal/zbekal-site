import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Glint, type GlintSpec } from "./Logo";

/**
 * Écran d’ouverture : sur fond sombre, le rond rose du logo est déjà là ; les trois traits rouges du
 * monogramme sont peints au pinceau. Pendant les fêtes (voir `festiveUntil` dans content/site.ts),
 * de petites paillettes dorées se posent ensuite sur le logo. Puis le voile sombre se dissout doucement
 * et laisse voir le site.
 * - Tout est en SVG + CSS (voir « Écran d’ouverture » dans globals.css).
 * - Montré une seule fois par visite : le petit script ci-dessous le masque dès la deuxième page
 *   (ou au rechargement), et un clic ou une touche le passe tout de suite.
 * - Masqué pour les personnes qui ont demandé moins d’animations.
 * Pour le retirer : supprimer <Intro /> dans SiteShell.tsx (garder alors la ligne « data-festive » du script).
 */
const script = `(function(){try{var d=document.documentElement,f=${JSON.stringify(site.festiveUntil)};if(f&&Date.now()<Date.parse(f))d.setAttribute("data-festive","1");var s=sessionStorage;if(s.getItem("zbekal-intro")){d.setAttribute("data-intro","seen");return}s.setItem("zbekal-intro","1");var skip=function(){d.setAttribute("data-intro","seen");removeEventListener("pointerdown",skip,true);removeEventListener("keydown",skip,true)};addEventListener("pointerdown",skip,true);addEventListener("keydown",skip,true);setTimeout(skip,4600)}catch(e){}})();`;

const n = (v: number) => Math.round(v * 10) / 10;
const css = (delay: number, duration: number) => ({ "--d": `${delay.toFixed(3)}s`, "--t": `${duration.toFixed(3)}s` }) as CSSProperties;

/* ── Le logo, dans son repère 719 × 719 (mêmes tracés que Logo.tsx) ── */
const C = 359.5;
/** les trois traits rouges, dans l’ordre où ils sont peints. `path(k)` = le poil décalé de k par rapport au milieu du trait */
const STROKES = [
  {
    id: "l",
    shape: "M173 171H266V395A60 60 0 0 0 326 455H410V548H326A153 153 0 0 1 173 395Z",
    start: 0.35,
    duration: 0.42,
    path: (k: number) => `M${n(219.5 + k)} 150V395A${n(106.5 - k)} ${n(106.5 - k)} 0 0 0 326 ${n(501.5 - k)}H430`,
  },
  {
    id: "top",
    shape: "M314 171H551V331.5A125 125 0 0 0 440 264H314Z",
    start: 0.73,
    duration: 0.36,
    path: (k: number) => `M294 ${n(217.5 + k)}H${n(504.5 - k)}V352`,
  },
  {
    id: "hook",
    shape: "M314 312H398A153 153 0 0 1 551 465V548H458V465A60 60 0 0 0 398 405H314Z",
    start: 1.05,
    duration: 0.42,
    path: (k: number) => `M300 ${n(358.5 + k)}H398A${n(106.5 - k)} ${n(106.5 - k)} 0 0 1 ${n(504.5 - k)} 465V566`,
  },
];
const HAIRS = [-39, -26, -13, 0, 13, 26, 39];
const HAIR_LAG = [0, 0.05, 0.015, 0.07, 0.03, 0.005, 0.045];
/** nuances du rouge pendant le geste : on voit les poils ; la forme nette (couleur exacte) arrive à la fin */
const HAIR_TONE = ["#fe0000", "#e20000", "#fe0000", "#f31212", "#d90000", "#fe0000", "#ea0000"];

/**
 * Les paillettes dorées des fêtes : x, y, taille (dans le repère du logo), `on` = posée sur le rouge ou sur le rose.
 * Elles arrivent une à une après le dernier trait rouge (à partir de 1,6 s), puis scintillent.
 */
const GLINTS: GlintSpec[] = [
  { x: 232, y: 214, r: 24, on: "red" },
  { x: 506, y: 506, r: 22, on: "red" },
  { x: 468, y: 206, r: 17, on: "red" },
  { x: 586, y: 162, r: 18, on: "pink" },
  { x: 250, y: 610, r: 15, on: "pink" },
  { x: 300, y: 505, r: 12, on: "red" },
  { x: 120, y: 300, r: 12, on: "pink" },
  { x: 350, y: 360, r: 10, on: "red" },
  { x: 610, y: 400, r: 10, on: "pink" },
  { x: 530, y: 292, r: 8, on: "red" },
  { x: 360, y: 116, r: 8, on: "pink" },
  { x: 205, y: 346, r: 7, on: "red" },
  { x: 440, y: 626, r: 7, on: "pink" },
  { x: 150, y: 500, r: 6, on: "pink" },
];
/** ordre d’arrivée et rythme du scintillement, différents pour chaque paillette */
const GLINT_ORDER = [0, 6, 3, 9, 1, 12, 5, 10, 2, 7, 13, 4, 8, 11];
const GLINT_PACE = [2.1, 2.9, 2.4, 3.3, 2.6, 2.2, 3.1, 2.7, 2.3, 3.4, 2.5, 3.0, 2.8, 2.0];

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="intro" aria-hidden="true">
        <svg className="intro__logo" viewBox="0 0 719 719" focusable="false">
          <defs>
            {STROKES.map((s) => (
              <clipPath key={s.id} id={`intro-clip-${s.id}`}>
                <path d={s.shape} />
              </clipPath>
            ))}
          </defs>
          {/* le rond rose est là dès la première image, sans animation */}
          <circle cx={C} cy={C} r={C} fill="#FEBCCA" />
          {/* les traits rouges, peints l’un après l’autre */}
          {STROKES.map((s) => (
            <g key={s.id} clipPath={`url(#intro-clip-${s.id})`}>
              {HAIRS.map((k, j) => (
                <path key={k} className="intro__hair" pathLength={100} stroke={HAIR_TONE[j]} d={s.path(k)} style={css(s.start + HAIR_LAG[j], s.duration)} />
              ))}
              <path className="intro__solid" d={s.shape} fill="#FE0000" style={css(s.start + s.duration - 0.02, 0.14)} />
            </g>
          ))}
          {/* les paillettes dorées (pendant les fêtes seulement) */}
          <g className="glitter glitter--intro">
            {GLINTS.map((g, i) => (
              <Glint key={i} {...g} delay={1.6 + GLINT_ORDER[i] * 0.04} pace={GLINT_PACE[i]} />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}
