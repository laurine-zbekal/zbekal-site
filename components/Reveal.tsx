"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Apparition discrète au défilement : seuls les blocs encore sous le pli au
 * chargement sont masqués (.reveal--pending), puis révélés (.is-in) quand ils
 * entrent dans l’écran. Sans JavaScript ou avec « réduire les animations »,
 * tout reste visible. Une sécurité révèle tout au bout de 4 secondes.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const pending = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    els.forEach((el) => {
      if (!pending.includes(el)) el.classList.add("is-in");
    });
    pending.forEach((el) => el.classList.add("reveal--pending"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );
    pending.forEach((el) => io.observe(el));
    const safety = window.setTimeout(() => pending.forEach((el) => el.classList.add("is-in")), 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);
  return null;
}
