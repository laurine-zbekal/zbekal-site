"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ui, type Locale } from "@/content/ui";
import type { Sized } from "@/lib/images";
import { ArrowIcon, CloseIcon, ZoomIcon } from "./Icons";

type Props = {
  images: Sized[];
  title: string;
  alt: string;
  locale: Locale;
  /** Lien « retour » affiché sur la photo, sur téléphone (la collection de la toile) */
  back?: { href: string; label: string };
};

/** Le cadre des photos suit le format de la photo principale, dans ces limites (largeur / hauteur). */
const FRAME_MIN = 0.8;
const FRAME_MAX = 1.6;

/**
 * Visionneuse d’une toile.
 * - Les photos se font glisser au doigt (défilement horizontal natif, une photo par cran) ;
 *   à la souris : flèches, vignettes, ou les touches ← →.
 * - Le cadre garde la même hauteur d’une photo à l’autre : la page ne saute plus.
 *   La photo principale est montrée (presque) entière ; une autre vue d’un format très différent du cadre aussi, sur fond clair.
 * - Les vignettes suivent la photo affichée ; sur téléphone elles tiennent sur une seule ligne.
 * - Zoom plein écran sur la matière (double-clic, pincement, boutons + / −).
 */
export function ArtworkViewer({ images, title, alt, locale, back }: Props) {
  const t = ui[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const n = images.length;
  const frame = Math.min(FRAME_MAX, Math.max(FRAME_MIN, images[0].width / images[0].height));
  // La photo principale n’est presque jamais rognée ; les autres vues remplissent le cadre, sauf format vraiment différent.
  const fit = (img: Sized, i: number) => {
    const r = img.width / img.height;
    const limit = i === 0 ? 1.15 : 1.6;
    return r / frame > limit || frame / r > limit ? "contain" : "cover";
  };
  const altOf = (i: number) => (i === 0 ? alt : t.work.imageOf(title, i + 1));

  // La photo affichée se déduit de la position du défilement.
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const i = Math.max(0, Math.min(n - 1, Math.round(el.scrollLeft / el.clientWidth)));
    setIndex((cur) => (cur === i ? cur : i));
  }, [n]);

  const go = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const k = Math.max(0, Math.min(n - 1, i));
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: k * el.clientWidth, behavior: calm ? "auto" : "smooth" });
  };

  // La vignette active reste visible dans sa rangée (on ne fait défiler que la rangée, jamais la page).
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: "smooth" });
  }, [index]);

  return (
    <div className="viewer" style={{ "--frame": String(frame) } as CSSProperties}>
      <div className="viewer__stage">
        <div
          ref={trackRef}
          className="viewer__track"
          onScroll={onScroll}
          tabIndex={n > 1 ? 0 : undefined}
          role={n > 1 ? "group" : undefined}
          aria-label={n > 1 ? t.work.detailsTitle : undefined}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
        >
          {images.map((img, i) => (
            <div key={img.src} className="viewer__slide" data-fit={fit(img, i)}>
              <Image
                src={img.src}
                alt={altOf(i)}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1240px) 720px, (min-width: 960px) 58vw, 100vw"
                priority={i === 0}
                loading={i === 0 ? undefined : i === 1 ? "eager" : "lazy"}
                quality={85}
              />
            </div>
          ))}
        </div>

        {back ? (
          <Link href={back.href} className="viewer__back" aria-label={back.label}>
            <ArrowIcon size={20} />
          </Link>
        ) : null}
        {n > 1 ? (
          <span className="viewer__count" aria-hidden="true">
            {index + 1} / {n}
          </span>
        ) : null}
        {n > 1 ? (
          <>
            <button type="button" className="viewer__nav viewer__nav--prev" onClick={() => go(index - 1)} disabled={index === 0} aria-label={t.work.prev}>
              <ArrowIcon size={20} />
            </button>
            <button type="button" className="viewer__nav viewer__nav--next" onClick={() => go(index + 1)} disabled={index === n - 1} aria-label={t.work.next}>
              <ArrowIcon size={20} />
            </button>
          </>
        ) : null}
        <button type="button" className="btn btn--white btn--sm viewer__zoom" onClick={() => setOpen(true)} aria-label={t.work.zoom}>
          <ZoomIcon size={18} /> <span>{t.work.zoom}</span>
        </button>
      </div>

      {/* Sur téléphone, ce bloc est le haut du feuillet blanc qui remonte sur la photo. */}
      <div className="viewer__cap">
        {n > 1 ? (
          <div ref={stripRef} className="viewer__thumbs" role="group" aria-label={t.work.detailsTitle}>
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className="viewer__thumb"
                aria-pressed={i === index}
                aria-label={i === 0 ? t.work.fullView : `${t.work.detailOf} ${i}`}
                onClick={() => go(i)}
              >
                <Image src={img.src} alt="" width={84} height={84} sizes="84px" quality={60} />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {open ? <Lightbox image={images[index]} alt={altOf(index)} locale={locale} onClose={() => setOpen(false)} /> : null}
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
