# EcoRide – Frontend

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-563d7c)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)
![Licence](https://img.shields.io/badge/Licence-MIT-green)
![Status](https://img.shields.io/badge/status-Stable-success)

Ce dépôt regroupe l’ensemble des livrables du projet **EcoRide** :  
documentation, maquettes, manuel utilisateur et l'application frontend qui se trouve dans le dossier **/front**.

Cette application constitue l’interface web de l’application, développée en JavaScript (SPA) et connectée à [l’API backend](https://github.com/Nico8321/Ecoride_back.git) .

## 📝 Description

EcoRide est une interface web responsive permettant de rechercher, proposer, réserver et évaluer des trajets de covoiturage.  
Il s’agit d’une **SPA (Single Page Application)** développée en **JavaScript**, avec **Bootstrap 5** (via CDN ) et un routeur personnalisé.  
Le frontend communique avec une API backend en PHP via des appels `fetch`.  
L’API est disponible 👉 [ici](https://github.com/Nico8321/Ecoride_back.git)

## 🕹️ Fonctionnalités principales

Selon le rôle (Admin, Employé, Utilisateur), différentes fonctionnalités sont accessibles.

- ### 👨‍💻 Utilisateur

  - Rechercher un covoiturage avec filtres (ville, date, énergie…)
  - Proposer un trajet en tant que conducteur
  - Réserver un covoiturage via une modale
  - Visualiser l’historique des trajets effectués
  - Déposer un avis après un trajet terminé
  - Afficher les avis associés à chaque covoiturage

- ### 👷 Employé

  - Validation des avis
  - Gestion des litiges

- ### 🔑 Admin
  - Accès aux indicateurs ( graphiques covoiturages/jour, crédits/jour )
  - Création et suspension des comptes

## 🛠️ Technologies utilisées

- HTML5 / CSS3
- Bootstrap 5
- JavaScript Vanilla (ES6+)
- API adresse.data.gouv (pour l'autocompletion des adresses saisies)
- API REST (backend PHP séparé)

## 🚔 Sécurité Front

- Validation des formulaires (regex, champs requis, `autocomplete`)
- Vérification des rôles côté front (user, staff, admin)
- Stockage sécurisé en **sessionStorage**

⚠️ Les contrôles côté frontend servent uniquement à l’affichage. La sécurité réelle est assurée par le backend (vérification des tokens JWT, droits d’accès, etc.).

## 📁 Structure des fichiers

- `index.html` → page principale
- `/pages` → contenu des pages
- `/js` → scripts JS des pages
- `/js/auth` → contient le fichier authHelper pour la vérification du token
- `/js/api` → appels backend API REST (fetch)
- `/js/components` → composants réutilisables( toast, cards, etc.)
- `/js/utils` → fonctions réutilisables ( getFiltres, inputValidator etc.)
- `/router` → routeur SPA personnalisé

## ▶️ Démarrer le projet

### Prérequis :

- Un serveur local (ex : http-server-spa)
- [Backend de l'application Ecoride](https://github.com/Nico8321/Ecoride_back.git)

### ⚙️ Étapes

#### 1. Cloner le dépôt

```
git clone https://github.com/Nico8321/Ecoride_front.git
cd Ecoride_front/front
```

#### 2.Configurer l’URL de l’API dans `/js/config.js` :

⚠️ Le fichier `config.js` doit pointer vers l’URL du backend (ex: `http://localhost:8000`)

```js
export const apiUrl = "http://localhost:8000";
```

#### 3. Lancer le serveur :

Via le terminal :

```bash
npx http-server-spa . index.html 3000
```

#### 4. Accès à la page

Via votre navigateur à l'adresse `http://localhost:3000`

## 🌍 Compatibilité

Projet testé sur :

- Google Chrome
- Mozilla Firefox
- Safari

Responsive testé sur:

- Chrome DevTools (simulations iOS/Android)
- iPad Pro M1
- iPhone 16 Pro.

## 📑 Documentation / Livrables

Ce dépôt contient également les documents livrables du projet EcoRide, accessibles dans le dossier /docs :

- [Charte Graphique](./docs/CharteGraphique.pdf)
- [Documentation technique](./docs/DocumentationTechnique.pdf)
- [Manuel utilisateur](./docs/ManuelUtilisateur.pdf)

## 🖋️ Auteur

**Nicolas Beuve**

_Projet réalisé dans le cadre du titre professionnel DWWM (Studi – 2025-2026)_
