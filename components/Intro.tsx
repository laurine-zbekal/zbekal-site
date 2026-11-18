import type { CSSProperties } from "react";

/**
 * Écran d’ouverture : sur fond rose, le rond bordeaux du logo est déjà là ; les trois traits roses du
 * monogramme sont peints au pinceau. Puis le logo s’efface, le voile rose se dissout doucement
 * et laisse voir le site.
 * - Tout est en SVG + CSS (voir « Écran d’ouverture » dans globals.css).
 * - Montré une seule fois par visite : le petit script ci-dessous le masque dès la deuxième page
 *   (ou au rechargement), et un clic ou une touche le passe tout de suite.
 * - Joué aussi quand l’ordinateur est réglé sur « moins d’animations » (réglage fréquent sous Windows) :
 *   le geste est court, sans clignotement, et se passe d’un clic.
 * Pour le retirer : supprimer <Intro /> dans SiteShell.tsx.
 */
const script = `(function(){try{var d=document.documentElement,s=sessionStorage;if(s.getItem("zbekal-intro")){d.setAttribute("data-intro","seen");return}s.setItem("zbekal-intro","1");var skip=function(){d.setAttribute("data-intro","seen");removeEventListener("pointerdown",skip,true);removeEventListener("keydown",skip,true)};addEventListener("pointerdown",skip,true);addEventListener("keydown",skip,true);setTimeout(skip,3600)}catch(e){}})();`;

const n = (v: number) => Math.round(v * 10) / 10;
const css = (delay: number, duration: number) => ({ "--d": `${delay.toFixed(3)}s`, "--t": `${duration.toFixed(3)}s` }) as CSSProperties;

/* ── Le logo, dans son repère 719 × 719 (mêmes tracés que Logo.tsx) ── */
const C = 359.5;
/** les trois traits roses, dans l’ordre où ils sont peints. `path(k)` = le poil décalé de k par rapport au milieu du trait */
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
/** nuances du rose pendant le geste : on voit les poils ; la forme nette (couleur exacte) arrive à la fin */
const HAIR_TONE = ["#f0bfc2", "#e3a9ad", "#f0bfc2", "#f6cfd1", "#dc9fa4", "#f0bfc2", "#e8b3b7"];

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
          {/* le rond bordeaux est là dès la première image, sans animation */}
          <circle cx={C} cy={C} r={C} fill="#680D22" />
          {/* les traits roses, peints l’un après l’autre */}
          {STROKES.map((s) => (
            <g key={s.id} clipPath={`url(#intro-clip-${s.id})`}>
              {HAIRS.map((k, j) => (
                <path key={k} className="intro__hair" pathLength={100} stroke={HAIR_TONE[j]} d={s.path(k)} style={css(s.start + HAIR_LAG[j], s.duration)} />
              ))}
              <path className="intro__solid" d={s.shape} fill="#F0BFC2" style={css(s.start + s.duration - 0.02, 0.14)} />
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}
