"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ui, type Locale } from "@/content/ui";
import type { Sized } from "@/lib/images";
import { CloseIcon, ZoomIcon } from "./Icons";

type Props = {
  images: Sized[];
  title: string;
  alt: string;
  locale: Locale;
};

/**
 * Visionneuse d’une toile : image principale, vignettes des détails, et zoom
 * plein écran sur la matière (double-clic, pincement, boutons + / −).
 */
export function ArtworkViewer({ images, title, alt, locale }: Props) {
  const t = ui[locale];
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = images[index];

  return (
    <div className="viewer">
      <div className="viewer__main" style={{ aspectRatio: `${current.width} / ${current.height}` }}>
        <Image
          key={current.src}
          src={current.src}
          alt={index === 0 ? alt : t.work.imageOf(title, index + 1)}
          width={current.width}
          height={current.height}
          sizes="(min-width: 1240px) 720px, (min-width: 960px) 58vw, 100vw"
          priority={index === 0}
          quality={85}
        />
        <button type="button" className="btn btn--white btn--sm viewer__zoom" onClick={() => setOpen(true)}>
          <ZoomIcon size={18} /> {t.work.zoom}
        </button>
      </div>

      {images.length > 1 ? (
        <div className="viewer__thumbs" role="group" aria-label={t.work.detailsTitle}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className="viewer__thumb"
              aria-pressed={i === index}
              aria-label={i === 0 ? t.work.fullView : `${t.work.detailOf} ${i}`}
              onClick={() => setIndex(i)}
            >
              <Image src={img.src} alt="" width={84} height={84} sizes="84px" quality={60} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </button>
          ))}
        </div>
      ) : null}

      {open ? <Lightbox image={current} alt={index === 0 ? alt : t.work.imageOf(title, index + 1)} locale={locale} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}

function Lightbox({ image, alt, locale, onClose }: { image: Sized; alt: string; locale: Locale; onClose: () => void }) {
  const t = ui[locale];
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [fitWidth, setFitWidth] = useState(0);
  const [scale, setScale] = useState(1);
  const dragging = useRef<{ x: number; y: number; sl: number; st: number } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());

  // Largeur « ajustée » : l’image entière visible dans la scène.
  const measure = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    const ratio = image.width / image.height;
    const w = Math.min(el.clientWidth, el.clientHeight * ratio);
    setFitWidth(Math.max(1, Math.floor(w)));
  }, [image.width, image.height]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(4, s + 0.5));
      if (e.key === "-") setScale((s) => Math.max(1, s - 0.5));
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [measure, onClose]);

  const maxScale = Math.max(1.5, Math.min(4, image.width / Math.max(fitWidth, 1)));
  const clamp = (s: number) => Math.min(maxScale, Math.max(1, s));

  // Point à garder sous le curseur pendant un zoom (en fraction de l’image), appliqué après le rendu.
  const focus = useRef<{ fx: number; fy: number; vx: number; vy: number } | null>(null);
  const zoomAt = (next: number, cx?: number, cy?: number) => {
    const el = stageRef.current;
    const s = clamp(next);
    if (!el || s === scale) return;
    const rect = el.getBoundingClientRect();
    const vx = (cx ?? rect.left + rect.width / 2) - rect.left; // position dans la scène
    const vy = (cy ?? rect.top + rect.height / 2) - rect.top;
    const img = el.querySelector("img");
    const iw = img?.clientWidth || fitWidth * scale;
    const ih = img?.clientHeight || (iw * image.height) / image.width;
    const offX = Math.max(0, (el.clientWidth - iw) / 2); // marges quand l’image est plus petite que la scène
    const offY = Math.max(0, (el.clientHeight - ih) / 2);
    focus.current = { fx: (el.scrollLeft + vx - offX) / iw, fy: (el.scrollTop + vy - offY) / ih, vx, vy };
    setScale(s);
  };
  useEffect(() => {
    const el = stageRef.current;
    const f = focus.current;
    if (!el || !f) return;
    focus.current = null;
    const img = el.querySelector("img");
    if (!img) return;
    const iw = img.clientWidth;
    const ih = img.clientHeight;
    const offX = Math.max(0, (el.clientWidth - iw) / 2);
    const offY = Math.max(0, (el.clientHeight - ih) / 2);
    el.scrollLeft = f.fx * iw + offX - f.vx;
    el.scrollTop = f.fy * ih + offY - f.vy;
  }, [scale]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    el.setPointerCapture(e.pointerId);
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      dragging.current = null;
    } else if (e.pointerType === "mouse") {
      // À la souris : glisser pour se déplacer. Au doigt, le défilement natif suffit.
      dragging.current = { x: e.clientX, y: e.clientY, sl: el.scrollLeft, st: el.scrollTop };
      el.classList.add("is-dragging");
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current && pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const next = clamp((pinch.current.scale * dist) / pinch.current.dist);
      setScale(next);
      return;
    }
    if (dragging.current) {
      el.scrollLeft = dragging.current.sl - (e.clientX - dragging.current.x);
      el.scrollTop = dragging.current.st - (e.clientY - dragging.current.y);
    }
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) {
      dragging.current = null;
      stageRef.current?.classList.remove("is-dragging");
    }
  };

  const width = fitWidth ? Math.round(fitWidth * scale) : undefined;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${t.work.zoom} — ${alt}`}>
      <div className="lightbox__bar">
        <div className="cluster" style={{ gap: 8 }}>
          <button type="button" className="btn btn--sm" onClick={() => zoomAt(scale - 0.5)} aria-label={t.work.zoomOut} disabled={scale <= 1}>
            −
          </button>
          <span style={{ minWidth: 48, textAlign: "center", fontWeight: 700 }} aria-live="polite">
            {Math.round(scale * 100)}%
          </span>
          <button type="button" className="btn btn--sm" onClick={() => zoomAt(scale + 0.5)} aria-label={t.work.zoomIn} disabled={scale >= maxScale}>
            +
          </button>
        </div>
        <button ref={closeRef} type="button" className="btn btn--sm" onClick={onClose}>
          <CloseIcon size={16} /> {t.work.close}
        </button>
      </div>
      <div
        ref={stageRef}
        className="lightbox__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => zoomAt(scale > 1 ? 1 : Math.min(maxScale, 2.5), e.clientX, e.clientY)}
      >
        {/* Image d’origine (pleine résolution) pour le zoom sur la matière. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={alt} width={width} height={width ? Math.round((width * image.height) / image.width) : undefined} draggable={false} />
      </div>
      <p className="lightbox__hint">{t.work.zoomHint}</p>
    </div>
  );
}
