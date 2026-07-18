# GymLevels

Application web autonome de suivi de musculation gamifié : niveaux, rangs par muscle,
programmes personnalisés. Aucun compte, aucun serveur — tout est stocké dans le
navigateur du téléphone.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application entière (React + JSX compilé dans le navigateur) |
| `manifest.json` | Manifeste PWA — permet l'ajout à l'écran d'accueil |
| `sw.js` | Service worker de nettoyage (voir plus bas) |
| `icon-192.png` / `icon-512.png` | Icônes de l'application |
| `.nojekyll` | Désactive Jekyll sur GitHub Pages |

## Déploiement sur GitHub Pages

1. Crée un dépôt GitHub **public**.
2. Place le contenu de ce dossier **à la racine du dépôt** (pas dans un sous-dossier),
   `.nojekyll` compris — c'est un fichier caché, pense à l'inclure.
3. Dépôt → *Settings* → *Pages* → Source : *Deploy from a branch*, branche `main`, dossier `/ (root)`.
4. L'app est en ligne sous `https://<ton-pseudo>.github.io/<ton-depot>/` après 1 à 2 minutes.

Tous les chemins sont relatifs (`./`) : l'app fonctionne aussi bien à la racine d'un
domaine que dans un sous-dossier. Netlify Drop et Vercel fonctionnent à l'identique.

## Installer l'icône sur le téléphone

**iPhone** — ouvre l'URL dans **Safari** (obligatoire), bouton Partager → *Sur l'écran d'accueil*.

**Android** — ouvre l'URL dans Chrome, menu ⋮ → *Installer l'application*.

## Fonctionnement du chargement

L'application est écrite en JSX et compilée **dans le navigateur** au démarrage. Trois
librairies sont donc téléchargées depuis un CDN au premier lancement : React, ReactDOM
et Babel (~3 Mo au total, mis en cache par le navigateur ensuite).

Le chargeur essaie chaque librairie sur **trois CDN successifs** — unpkg, puis jsDelivr,
puis cdnjs — avec un délai maximum de 20 secondes par tentative, et vérifie que chaque
librairie s'est réellement initialisée avant de continuer. En cas d'échec, l'écran
affiche le **détail technique précis** de l'erreur et un bouton *Réessayer*.

### Conséquence : l'app n'est pas utilisable hors-ligne

Une connexion internet est nécessaire tant que le navigateur n'a pas mis les librairies
en cache. Le service worker est **volontairement désactivé** : `sw.js` ne fait que
nettoyer les anciennes installations puis se désinscrire, car une version précédente
gardait en cache une page cassée.

Pour un vrai fonctionnement hors-ligne, il faudrait précompiler le JSX et embarquer
React dans le dépôt (suppression totale de la dépendance CDN). C'est l'évolution
naturelle de ce projet.

## Tes données

Elles sont stockées dans le `localStorage` du navigateur, sur l'appareil uniquement.
Changer de téléphone, effacer les données du navigateur ou désinstaller l'app en
supprime **définitivement** le contenu. Il n'existe aucune sauvegarde distante.

## Toujours une erreur après mise à jour ?

Si une ancienne version reste affichée, force un chargement propre une fois :

**iPhone** — supprime l'icône de l'écran d'accueil, puis Réglages → Safari → *Effacer
historique et données de site*, rouvre l'URL, puis réinstalle.

**Android** — désinstalle l'app, puis Chrome → ⋮ → Paramètres → Confidentialité →
*Effacer les données de navigation*, rouvre l'URL, puis réinstalle.
