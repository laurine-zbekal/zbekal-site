import { site } from "@/content/site";
import type { Locale } from "@/content/ui";
import { Logo } from "./Logo";

/**
 * Écran d’ouverture : fond sombre, le logo apparaît, puis le rideau se lève sur le site.
 * - Tout est en CSS (voir « Écran d’ouverture » dans globals.css) : il fonctionne sans JavaScript.
 * - Montré une seule fois par visite : le petit script ci-dessous le masque dès la deuxième page
 *   (ou au rechargement), et un clic ou une touche le passe tout de suite.
 * - Masqué pour les personnes qui ont demandé moins d’animations.
 * Pour le retirer : supprimer <Intro /> dans SiteShell.tsx.
 */
const script = `(function(){try{var d=document.documentElement,s=sessionStorage;if(s.getItem("zbekal-intro")){d.setAttribute("data-intro","seen");return}s.setItem("zbekal-intro","1");var skip=function(){d.setAttribute("data-intro","seen");removeEventListener("pointerdown",skip,true);removeEventListener("keydown",skip,true)};addEventListener("pointerdown",skip,true);addEventListener("keydown",skip,true);setTimeout(skip,4000)}catch(e){}})();`;

export function Intro({ locale }: { locale: Locale }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="intro" aria-hidden="true">
        <span className="intro__logo">
          <Logo size={148} title="" />
        </span>
        <span className="intro__name">{site.name}</span>
        <span className="intro__line" />
        <span className="intro__sub">
          {site.artist} · {site.job[locale]}
        </span>
      </div>
    </>
  );
}
