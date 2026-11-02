# zbekal.fr — site de Laurine Girard, alias Zbekal

Site vitrine et galerie, bilingue français/anglais (`/` et `/en`), construit avec Next.js 16, hébergé sur Vercel.

## Mettre en ligne en 10 lignes

1. Crée un compte gratuit sur [github.com](https://github.com) et un sur [vercel.com](https://vercel.com) (connexion avec GitHub).
2. Sur GitHub : **New repository** → nom `zbekal-site`, privé → puis envoie ce dossier (GitHub Desktop, ou `git push` depuis le dossier).
3. Sur Vercel : **Add New → Project** → importe `zbekal-site` → **Deploy**. Le site est en ligne en 2 minutes sur une adresse `*.vercel.app`.
4. Dans Vercel → **Settings → Environment Variables**, ajoute `RESEND_API_KEY` (clé créée sur [resend.com](https://resend.com), gratuit) : sans elle, le formulaire de contact affiche ton e-mail au lieu d'envoyer.
5. Ajoute aussi `NEXT_PUBLIC_SITE_URL` = `https://zbekal.fr` et `CONTACT_TO` = l'adresse qui reçoit les messages. Redéploie (**Deployments → Redeploy**).
6. Achète `zbekal.fr` et `zbekal.com` sur [ovhcloud.com](https://www.ovhcloud.com/fr/domains/) (une boîte e-mail est incluse avec chaque domaine : crée `contact@zbekal.fr` dans l'espace client OVH, rubrique E-mails).
7. Dans Vercel → **Settings → Domains**, ajoute `zbekal.fr` puis `zbekal.com` (coche « redirect to zbekal.fr »). Vercel affiche les enregistrements DNS à copier.
8. Chez OVH → **Zone DNS** de chaque domaine : ajoute l'enregistrement `A` (`@` → `76.76.21.21`) et le `CNAME` (`www` → `cname.vercel-dns.com`) indiqués par Vercel. Compte 1 h de propagation.
9. Quand `contact@zbekal.fr` existe : dans Vercel, mets `CONTACT_TO` et `NEXT_PUBLIC_CONTACT_EMAIL` à `contact@zbekal.fr`, puis dans Resend ajoute le domaine `zbekal.fr` (DNS à copier chez OVH) et mets `CONTACT_FROM` = `Zbekal <contact@zbekal.fr>`.
10. Active **Vercel Analytics** (onglet Analytics du projet) : statistiques sans cookie, rien à ajouter au site.

## Ajouter une nouvelle toile

1. Photos : une photo de face, à plat, lumière du jour, sans perspective → `public/oeuvres/<slug>/main.jpg` ; les gros plans de matière → `detail-1.jpg`, `detail-2.jpg`… (JPEG, 2 000 px de large environ, moins de 1 Mo chacune).
2. Ouvre `content/oeuvres.ts`, copie le bloc **MODÈLE** en haut du fichier, colle-le dans la liste à la place voulue et remplis : titre, collection, année, dimensions, statut, prix (ou rien pour « prix sur demande »), chemins des images, texte alternatif FR/EN, description FR/EN.
3. Image de partage (facultatif, pour Instagram/WhatsApp) : `public/og/<slug>.jpg` en 1200 × 630. Sans fichier, l'image par défaut est utilisée.
4. Envoie sur GitHub (commit + push) : Vercel redéploie tout seul. Les pages `/oeuvre/<slug>` et `/en/artwork/<slug>`, le sitemap et les filtres se mettent à jour.

Ou, plus simple : envoie-moi la photo et les informations, et je fais la mise à jour.

Pour marquer une toile vendue : `status: "vendue"`. Pour une nouvelle collection : ajoute-la dans `content/collections.ts`.

## Ce qui reste à compléter avant la mise en ligne

- `content/site.ts` : SIRET, adresse postale (obligatoire dans les mentions légales), ville affichée si tu veux du référencement local, e-mail final.
- `content/oeuvres.ts` : années, prix, photos de face des toiles (les photos actuelles sont des découpes provisoires).
- Logo officiel : remplace le dessin dans `components/Logo.tsx` par ton fichier (SVG de préférence), et refais les icônes si besoin (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`).
- CV : dépose le PDF dans `public/` et ajoute `NEXT_PUBLIC_CV_FILE=/mon-cv.pdf` dans Vercel pour afficher le bouton sur la page Démarche.
- CGV : faire relire par un juriste et désigner un médiateur de la consommation (`NEXT_PUBLIC_MEDIATOR`).
- Newsletter : tant que Brevo n'est pas branché, chaque inscription t'arrive par e-mail. Pour Brevo : remplace l'appel `fetch` de `components/NewsletterForm.tsx` par le formulaire Brevo.

## Variables d'environnement

Copie `.env.example` en `.env.local` pour le développement. En production, tout se règle dans Vercel.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Adresse publique, sans `/` final (`https://zbekal.fr`). Sert aux liens absolus, au sitemap, aux partages. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail affiché sur le site. |
| `CONTACT_TO` | E-mail qui reçoit les formulaires. |
| `CONTACT_FROM` | Expéditeur des e-mails (domaine vérifié chez Resend). Par défaut `onboarding@resend.dev`. |
| `RESEND_API_KEY` | Clé API Resend (obligatoire pour l'envoi). |
| `NEXT_PUBLIC_CV_FILE` | Chemin du CV PDF dans `public/` (facultatif). |
| `NEXT_PUBLIC_MEDIATOR` | Nom et site du médiateur de la consommation (CGV). |

## Développer en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # vérification complète (types, pages, sitemap)
npm run lint
```

## Structure

```
app/                 pages (français à la racine, anglais sous app/en), API du formulaire, sitemap, robots, manifest
components/          en-tête, pied de page, cartes, visionneuse + zoom, formulaires, pages
content/             TOUT le contenu : site.ts, oeuvres.ts, collections.ts, expositions.ts, textes.ts, ui.ts
lib/                 routes localisées, métadonnées SEO, schema.org, utilitaires
public/oeuvres/      photos des toiles  ·  public/atelier/  photos d'atelier  ·  public/og/  images de partage
```

Polices : Anton et DM Sans (licence SIL Open Font License), servies depuis le site, sans requête vers Google.
