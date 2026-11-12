# zbekal.com — site de Laurine Girard, alias Zbekal

Site vitrine et galerie, bilingue français/anglais (`/` et `/en`), construit avec Next.js 16.

## Mise en ligne

Le site n'est pas encore en ligne : il se valide d'abord sur l'aperçu privé.

Ce qui est déjà fait :

- Domaines `zbekal.com` (adresse principale) et `zbekal.fr` (redirigera vers `zbekal.com`) achetés chez OVH, au nom de Laurine.
- Boîte `laurine@zbekal.com` sur Google Workspace (alias `contact@zbekal.com`). C'est l'adresse affichée partout sur le site.

- Dépôt GitHub privé `laurine-zbekal/zbekal-site` (compte de Laurine).
- Hébergement sur Netlify (offre gratuite, utilisable pour un site commercial), branché sur ce dépôt : chaque envoi sur `main` redéploie le site.
- Envoi des formulaires par [Resend](https://resend.com) (domaine `zbekal.com`, région Irlande).

- Variables d'environnement réglées chez Netlify : `RESEND_API_KEY` (secrète, contexte Production) et `CONTACT_FROM` = `Zbekal <laurine@zbekal.com>`.
- Zone DNS de `zbekal.com` chez OVH : enregistrements de Resend ajoutés (`send`, `rsend`, `resend._domainkey`, `_dmarc`), domaine vérifié chez Resend. Formulaire testé le 12/11/2026 : messages reçus sur `laurine@zbekal.com`.

Ce qui reste à faire au moment de publier :

1. Chez Netlify : passer le projet en public (« Make public ») et déclarer le domaine `zbekal.com` (et `www`).
2. Chez OVH, zone DNS de `zbekal.com` : remplacer l'enregistrement `A` et le `www` (page d'attente OVH) par ceux que donne Netlify. Rediriger `zbekal.fr` vers `zbekal.com`.

Une variable d'environnement modifiée chez Netlify ne prend effet qu'au déploiement suivant (« Trigger deploy »). Chaque déploiement de production consomme des crédits de l'offre gratuite : grouper les mises à jour.

L'adresse provisoire `xxx.netlify.app` n'est pas référencée par les moteurs de recherche (en-tête `noindex` dans `next.config.ts`).

## Ajouter une nouvelle toile

1. Photos : une photo de face, à plat, lumière du jour, sans perspective → `public/oeuvres/<slug>/main.jpg` ; les gros plans de matière → `detail-1.jpg`, `detail-2.jpg`… (JPEG, 2 000 px de large environ, moins de 1 Mo chacune).
2. Ouvre `content/oeuvres.ts`, copie le bloc **MODÈLE** en haut du fichier, colle-le dans la liste à la place voulue et remplis : titre, collection, année, dimensions, statut, prix (ou rien pour « prix sur demande »), images, texte alternatif FR/EN, description FR/EN.
3. Image de partage (facultatif, pour Instagram/WhatsApp) : `public/og/<slug>.jpg` en 1200 × 630. Sans fichier, l'image par défaut est utilisée.
4. Envoie sur GitHub (commit + push) : l'hébergeur redéploie tout seul. Les pages `/oeuvre/<slug>` et `/en/artwork/<slug>`, le sitemap et les filtres se mettent à jour.

Ou, plus simple : envoie-moi la photo et les informations, et je fais la mise à jour.

Les statuts d'une toile :

- `"disponible"` : en stock, bouton « Je la veux ».
- `"sur-commande"` : déjà partie chez son propriétaire, où elle reste unique. Elle peut inspirer une nouvelle création : la fiche affiche « Coup de cœur ? » et le bouton « Je veux la mienne », qui ouvre le formulaire de commande avec la toile déjà choisie. On ne parle jamais de « repeindre » ou de « refaire » une toile : on en crée une nouvelle, dans le même esprit.
- `"reservee"` et `"vendue"` : affichées sans bouton d'achat.

Quand une toile en stock est vendue, passe-la en `"sur-commande"` (ou `"vendue"` si elle ne doit pas servir d’inspiration à une commande). Pour une nouvelle collection : ajoute-la dans `content/collections.ts`.

## Ce qui reste à compléter avant la mise en ligne

- `content/site.ts` : SIRET et adresse postale (obligatoires dans les mentions légales), hébergeur.
- `content/oeuvres.ts` : prix des toiles disponibles (sans prix, la fiche affiche « Prix sur demande »), dimensions manquantes, titres des deux « Sans titre ».
- `content/textes.ts` : formats et tarifs des commandes (`commissionFormats`), repris d'une publication Instagram de novembre 2025.
- Photos : celles venues d'Instagram et de WeTransfer sont en définition moyenne ; les originaux en haute définition donneront un zoom plus net.
- Logo : redessiné d'après la photo de profil Instagram (`components/Logo.tsx`, `public/logo.svg`, icônes). À remplacer par le fichier d'origine s'il existe.
- CV : dépose le PDF dans `public/` et ajoute `NEXT_PUBLIC_CV_FILE=/mon-cv.pdf` pour afficher le bouton sur la page « Laurine ».
- CGV : à faire relire par un juriste ; désigner un médiateur de la consommation (`NEXT_PUBLIC_MEDIATOR`).
- Newsletter : tant que Brevo n'est pas branché, chaque inscription arrive par e-mail. Pour Brevo : remplace l'appel `fetch` de `components/NewsletterForm.tsx` par le formulaire Brevo.

## Variables d'environnement

Copie `.env.example` en `.env.local` pour le développement. En production, tout se règle chez l'hébergeur.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Adresse publique, sans `/` final (`https://zbekal.com`). Sert aux liens absolus, au sitemap, aux partages. |
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
public/oeuvres/      photos des toiles  ·  public/atelier/  photos d'atelier  ·  public/expos/  photos des expositions  ·  public/og/  images de partage
```

Polices : Anton et DM Sans (licence SIL Open Font License), servies depuis le site, sans requête vers Google.
