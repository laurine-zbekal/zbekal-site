import type { Artwork } from "@/content/oeuvres";
import { ui, type Locale } from "@/content/ui";

/**
 * Schéma à l’échelle : la toile à côté d’une silhouette de 1,70 m.
 * 1 unité SVG = 1 cm.
 */
export function ScaleHint({ artwork, locale }: { artwork: Artwork; locale: Locale }) {
  const t = ui[locale];
  const figureH = 170;
  const figureW = 56;
  const gap = 24;
  const floor = Math.max(figureH, artwork.height) + 8;
  const totalW = figureW + gap + artwork.width + 8;
  const px = figureW + gap; // x de la toile
  const py = floor - 4 - artwork.height; // y du haut de la toile (posée au sol - 4 cm… au mur à hauteur de regard serait trop variable)
  const panels = artwork.panels && artwork.panels > 1 ? artwork.panels : 1;
  const panelW = (artwork.width - (panels - 1) * 2) / panels;

  return (
    <figure className="scale">
      <svg viewBox={`0 0 ${totalW} ${floor + 4}`} role="img" aria-label={t.work.scaleHint(artwork.width, artwork.height)} preserveAspectRatio="xMinYMax meet">
        {/* silhouette */}
        <g fill="#141413" opacity="0.18">
          <circle cx={figureW / 2} cy={floor - figureH + 11} r="11" />
          <rect x={figureW / 2 - 13} y={floor - figureH + 25} width="26" height="62" rx="9" />
          <rect x={figureW / 2 - 12} y={floor - figureH + 86} width="10" height="80" rx="4" />
          <rect x={figureW / 2 + 2} y={floor - figureH + 86} width="10" height="80" rx="4" />
        </g>
        {/* toile (ou panneaux) */}
        {Array.from({ length: panels }).map((_, i) => (
          <rect key={i} x={px + i * (panelW + 2)} y={py} width={panelW} height={artwork.height} fill="#FCE4EE" stroke="#141413" strokeWidth="1.2" />
        ))}
        {/* sol */}
        <line x1="0" y1={floor} x2={totalW} y2={floor} stroke="#141413" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <text x={figureW / 2} y={floor - figureH - 4} fontSize="9" textAnchor="middle" fill="#4A4A45" fontFamily="var(--font-dm), Arial, sans-serif">
          1,70 m
        </text>
        <text x={px + artwork.width / 2} y={py - 4} fontSize="9" textAnchor="middle" fill="#4A4A45" fontFamily="var(--font-dm), Arial, sans-serif">
          {artwork.width} × {artwork.height} cm
        </text>
      </svg>
      <figcaption className="muted" style={{ fontSize: 14 }}>
        {t.work.scaleHint(artwork.width, artwork.height)}
      </figcaption>
    </figure>
  );
}
