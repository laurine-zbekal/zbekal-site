# zbekal.com — site de Laurine Girard, alias Zbekal

Site vitrine et galerie, bilingue français/anglais (`/` et `/en`), construit avec Next.js 16.

## Mise en ligne

Le site est en ligne depuis le 12 novembre 2026 sur `https://zbekal.com`.

- **Code** : dépôt GitHub privé `laurine-zbekal/zbekal-site` (compte de Laurine). Chaque envoi sur `main` redéploie le site.
- **Hébergement** : Netlify, projet `zbekal` (offre gratuite, utilisable pour un site commercial). Adresse technique : `zbekal.netlify.app` (non référencée par les moteurs de recherche, en-tête `noindex` dans `next.config.ts`).
- **Domaines** (achetés chez OVH, au nom de Laurine) : `zbekal.com` est l'adresse principale ; `www.zbekal.com`, `zbekal.fr` et `www.zbekal.fr` y renvoient (alias Netlify + règle de redirection dans `next.config.ts`).
- **DNS chez OVH**, zones `zbekal.com` et `zbekal.fr` : `A` → `75.2.60.5` et `www` `CNAME` → `zbekal.netlify.app.` Pour revenir à la page d'attente OVH : remettre `213.186.33.5`.
- **E-mails** : boîte `laurine@zbekal.com` sur Google Workspace (alias `contact@zbekal.com`). C'est l'adresse affichée partout sur le site.
- **Formulaires** : envoyés par [Resend](https://resend.com) (domaine `zbekal.com` vérifié, région Irlande ; enregistrements `send`, `rsend`, `resend._domainkey`, `_dmarc` dans la zone OVH). Variables chez Netlify : `RESEND_API_KEY` (secrète, contexte Production) et `CONTACT_FROM` = `Zbekal <laurine@zbekal.com>`.

À savoir :

- Une variable d'environnement modifiée chez Netlify ne prend effet qu'au déploiement suivant (« Trigger deploy »).
- Chaque déploiement de production consomme des crédits de l'offre gratuite de Netlify : grouper les mises à jour.

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

## Tarifs et carte cadeau

- `content/tarifs.ts` : la grille de la page « Tarifs 2026 ». Trois formats à prix fixe (S 400 €, M 500 €, L 600 € depuis le 14 novembre 2026) ; tout le reste est sur devis, jusqu'à 130 cm de côté. Pour changer un prix, modifie `price`. La règle de prix : (largeur + hauteur en cm) × 3.
- Même fichier, `pourquoi` : le bloc « Pourquoi mes toiles coûtent plus cher qu'un tableau déco ? » (cinq cartes de couleur, composant `components/WhyPrice.tsx`). Le titre « 10 à 15 heures » se calcule à partir du champ `hours` des formats (plus petit et plus grand chiffre) ; le détail par format n'est plus affiché depuis le 19 novembre 2026 ; la liste des charges est dans `charges`. Ne pas changer les `key` des cartes : les couleurs en dépendent.
- Prix des toiles disponibles : champ `price` de chaque toile dans `content/oeuvres.ts` (sans ce champ, la fiche affiche « Prix sur demande »). « La femme aux perroquets » a été retirée du site le 19 novembre 2026 : fiche, photos et carte de partage supprimées, anciennes adresses renvoyées vers la collection Amazoni (`next.config.ts`) ; tout reste dans l'historique du dépôt. Le bloc « formats » de l'accueil se règle dans `content/textes.ts` (`commissionFormats`).
- `content/carte-cadeau.ts` : les textes de la page « Carte cadeau » (`/carte-cadeau`, `/en/gift-card`) et du bloc vert de la page d'accueil. Les formats et les prix de la carte viennent de `content/tarifs.ts` : un seul endroit à modifier.
- Photos de la carte : `public/carte-cadeau/recto.jpg` et `verso.jpg`. Sur la photo du dos, le numéro de portable imprimé a été effacé (il n'est affiché nulle part sur le site).
- Les conditions de la carte (pas de date limite, format acquis, 14 jours de rétractation à distance) sont à l'article 7 des conditions de vente (`components/pages/TermsPage.tsx`).
- Le formulaire de contact a un sujet « Offrir une carte cadeau » (`/contact?sujet=gift`).

## Photos

- Les photos des toiles sont dans `public/oeuvres/<nom>/` : `main.jpg` puis `detail-1.jpg`, `detail-2.jpg`… Le nombre de détails se règle dans `content/oeuvres.ts` (`imgs("<nom>", n)`).
- Depuis le 14 novembre 2026, 87 photos viennent des fichiers d'origine (HEIC ou JPEG, jusqu'à 2 200 px de côté) et 44 ont été ajoutées aux fiches. Les autres sont encore en définition moyenne (captures Instagram ou WeTransfer) : il faut l'original pour les améliorer.
- Toutes les photos ont reçu la même retouche : un peu plus de lumière pour les photos sombres, des couleurs plus présentes, sans changer les teintes.
- « Le Regard » garde son ancienne photo principale, à la demande de Charly.

## Fiche d'une toile

`components/pages/ArtworkPage.tsx` et `components/ArtworkViewer.tsx`.

- Sur téléphone : la photo prend toute la largeur, les photos se font glisser au doigt, et la fiche est un feuillet blanc qui remonte sur la photo (vignettes sur une ligne, titre, prix, bouton, puis des volets à ouvrir).
- Sur ordinateur : deux colonnes, les photos à gauche (flèches, vignettes, touches ← →), la fiche à droite.
- Le cadre des photos suit le format de la photo principale (`main.jpg`) et garde la même hauteur d'une photo à l'autre. Une photo d'un format très différent est montrée en entier sur fond clair ; les autres remplissent le cadre et peuvent être un peu rognées (le zoom montre toujours la photo entière).
- Les volets (« Description », « Fiche technique », « Livraison et paiement », « À l'échelle ») sont des balises `<details>` : ils fonctionnent sans script. Leurs titres sont dans `content/ui.ts` (`work.folds`).

## Mesure d'audience et cookies

- Google Analytics 4 se branche avec un seul réglage : l'identifiant de mesure (`G-XXXXXXXXXX`), à mettre dans la variable d'environnement `NEXT_PUBLIC_GA_ID` chez l'hébergeur, ou directement dans `content/site.ts` (`analytics.gaId`). Ce n'est pas un secret.
- Sans identifiant : pas de Google Analytics, pas de bandeau, et la page Confidentialité dit qu'aucun cookie de suivi n'est déposé.
- Avec identifiant : le bandeau cookies s'affiche (`components/CookieConsent.tsx`, textes dans `content/ui.ts`, `cookies`). Rien n'est chargé ni envoyé à Google avant un clic sur « Accepter ». « Refuser » et « Accepter » ont le même bouton. Le choix est gardé 6 mois dans le navigateur ; le lien « Gérer les cookies » du pied de page permet de changer d'avis. Les cookies Google Analytics durent 13 mois au plus, les fonctions publicitaires de Google sont désactivées.
- La rubrique « Cookies » de la page Confidentialité (`components/pages/PrivacyPage.tsx`) s'adapte toute seule. Si le texte du bandeau ou sa finalité change, augmenter `VERSION` dans `CookieConsent.tsx` : la question est reposée à tout le monde.
- Compte Google Analytics « Zbekal », propriété « zbekal.com » (identifiant `G-SQZV8JB60C`), créé le 19 novembre 2026 sur le compte Google laurine@zbekal.com. Réglages faits dans Google Analytics : partages de données avec Google décochés, signaux Google désactivés, données utilisateur gardées 14 mois sans remise à zéro, e-mails promotionnels refusés.
- La durée des cookies (13 mois à compter de la première visite) se règle dans la balise Google, pas dans le code : Administration > Flux de données > Site zbekal.com > Configurer les paramètres de la balise > Remplacer les paramètres des cookies, puis « Envoyer » pour publier. La balise ne tient pas compte des valeurs `cookie_expires` passées par le site.

## Animation d'ouverture

`components/Intro.tsx` : le logo sur fond sombre, les traits rouges peints au pinceau, puis un fondu vers le site. Jouée une fois par visite, y compris quand l'ordinateur est réglé sur « moins d'animations » (réglage fréquent sous Windows, qui la masquait avant). Pour la retirer : supprimer `<Intro />` dans `components/SiteShell.tsx`.

## Ce qui reste à compléter avant la mise en ligne

- `content/site.ts` : SIRET et adresse postale (obligatoires dans les mentions légales), hébergeur.
- `content/oeuvres.ts` : prix des toiles disponibles (sans prix, la fiche affiche « Prix sur demande »), dimensions manquantes, titres des deux « Sans titre ».
- `content/textes.ts` : formats et tarifs des commandes sur la page d'accueil (`commissionFormats`) ; ils doivent rester identiques à ceux de `content/tarifs.ts`.
- Photos : celles venues d'Instagram et de WeTransfer sont en définition moyenne ; les originaux en haute définition donneront un zoom plus net.
- Logo : redessiné d'après la photo de profil Instagram (`components/Logo.tsx`, `public/logo.svg`, icônes). À remplacer par le fichier d'origine s'il existe. Couleurs : rond rose `#FEBCCA`, lettres rouges `#FE0000` (un essai bordeaux et rose a été en ligne les 18 et 19 novembre 2026, puis retiré à la demande de Laurine).
- CV : dépose le PDF dans `public/` et ajoute `NEXT_PUBLIC_CV_FILE=/mon-cv.pdf` pour afficher le bouton sur la page « Laurine ».
- CGV : à faire relire par un juriste, article 7 « Carte cadeau » compris ; désigner un médiateur de la consommation (`NEXT_PUBLIC_MEDIATOR`).
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
