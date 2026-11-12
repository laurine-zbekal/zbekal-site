import type { CSSProperties } from "react";

/**
 * Écran d’ouverture : sur fond sombre, le rond rose du logo est déjà là ; les trois traits rouges du
 * monogramme sont peints au pinceau, puis de larges coups de pinceau traversent l’écran et découvrent le site.
 * - Tout est en SVG + CSS (voir « Écran d’ouverture » dans globals.css) : il fonctionne sans JavaScript.
 * - Montré une seule fois par visite : le petit script ci-dessous le masque dès la deuxième page
 *   (ou au rechargement), et un clic ou une touche le passe tout de suite.
 * - Masqué pour les personnes qui ont demandé moins d’animations.
 * Pour le retirer : supprimer <Intro /> dans SiteShell.tsx.
 *
 * Réglages : les horaires (en secondes) sont ci-dessous ; les couleurs des coups de pinceau dans BANDS.
 * Si tu changes WIPE ou la durée du balayage, reporte-les dans globals.css (.intro, .intro__logo) :
 * le logo doit disparaître quand le coup de pinceau du milieu le recouvre entièrement (WIPE + 0,55 s).
 */
const script = `(function(){try{var d=document.documentElement,s=sessionStorage;if(s.getItem("zbekal-intro")){d.setAttribute("data-intro","seen");return}s.setItem("zbekal-intro","1");var skip=function(){d.setAttribute("data-intro","seen");removeEventListener("pointerdown",skip,true);removeEventListener("keydown",skip,true)};addEventListener("pointerdown",skip,true);addEventListener("keydown",skip,true);setTimeout(skip,4200)}catch(e){}})();`;

const n = (v: number) => Math.round(v * 10) / 10;
const css = (delay: number, duration?: number) =>
  ({ "--d": `${delay.toFixed(3)}s`, ...(duration ? { "--t": `${duration.toFixed(3)}s` } : {}) }) as CSSProperties;

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

/* ── Le passage au site : cinq larges coups de pinceau, dans un repère 1600 × 1000 étiré à l’écran ── */
const WIPE = 1.9; // début du balayage
const BANDS = [
  { y: 90, bend: 130, color: [254, 188, 202] },
  { y: 295, bend: 150, color: [27, 77, 62] }, // vert forêt de la collection Amazoni
  { y: 500, bend: 110, color: [254, 0, 0] },
  { y: 705, bend: 160, color: [255, 210, 63] },
  { y: 910, bend: 120, color: [32, 65, 181] }, // bleu roi des perroquets (palette Amazoni)
];
/** chaque coup de pinceau = 14 poils côte à côte ; chacun a son léger retard, sa longueur et sa nuance */
const BAND_HAIRS = Array.from({ length: 14 }, (_, j) => -143 + 22 * j);
/** tirage pseudo-aléatoire fixe (le rendu est identique à chaque chargement) */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const tone = ([r, g, b]: number[], k: number) => {
  const mix = (c: number) => Math.round(k < 0 ? c * (1 + k) : c + (255 - c) * k);
  return `rgb(${mix(r)} ${mix(g)} ${mix(b)})`;
};
const bandHairs = BANDS.flatMap((b, i) =>
  BAND_HAIRS.map((o, j) => {
    const seed = i * 31 + j;
    const streak = rand(seed + 0.5) > 0.82; // quelques poils en retard : les mèches qui traînent
    return {
      key: `${i}-${j}`,
      d: sweep(b.y + o, b.bend, i % 2 === 1),
      delay: WIPE + i * 0.07 + rand(seed) * 0.012 + (streak ? 0.012 : 0),
      length: Math.round(640 + rand(seed + 0.25) * 120), // longueur de la traînée de peinture (sur 1000)
      color: tone(b.color, (rand(seed + 0.75) - 0.5) * 0.16),
    };
  }),
);
/** un coup de pinceau sur toute la largeur, une fois de gauche à droite, une fois de droite à gauche */
function sweep(y: number, bend: number, reverse: boolean) {
  return reverse ? `M1760 ${y}C1180 ${y + bend} 420 ${y - bend} -160 ${y}` : `M-160 ${y}C420 ${y - bend} 1180 ${y + bend} 1760 ${y}`;
}

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="intro" aria-hidden="true">
        {/* le fond sombre : il part sous les coups de pinceau */}
        <svg className="intro__layer" viewBox="0 0 1600 1000" preserveAspectRatio="none" focusable="false">
          {bandHairs.map((h) => (
            <path key={h.key} className="intro__canvas" pathLength={1000} d={h.d} style={css(h.delay)} />
          ))}
        </svg>

        {/* le logo, peint trait après trait */}
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
          {STROKES.map((s) => (
            <g key={s.id} clipPath={`url(#intro-clip-${s.id})`}>
              {HAIRS.map((k, j) => (
                <path key={k} className="intro__hair" pathLength={100} stroke={HAIR_TONE[j]} d={s.path(k)} style={css(s.start + HAIR_LAG[j], s.duration)} />
              ))}
              <path className="intro__solid" d={s.shape} fill="#FE0000" style={css(s.start + s.duration - 0.02)} />
            </g>
          ))}
        </svg>

        {/* la peinture qui traverse l’écran */}
        <svg className="intro__layer" viewBox="0 0 1600 1000" preserveAspectRatio="none" focusable="false">
          {bandHairs.map((h) => (
            <path
              key={h.key}
              className="intro__paint"
              pathLength={1000}
              stroke={h.color}
              d={h.d}
              style={{ ...css(h.delay), "--s": h.length } as CSSProperties}
            />
          ))}
        </svg>
      </div>
    </>
  );
}
