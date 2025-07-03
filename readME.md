# 📝 Application de Gestion de Tâches (Projet 2)

Projet réalisé dans le cadre du cours *Applications Web Multiplateformes (420-726-AH)*  
Développé avec **Ionic Vue + Firebase**

## 🎯 Objectifs

Cette application permet à chaque utilisateur de :
- Créer un compte personnel ou se connecter
- Gérer ses propres tâches (ajouter, modifier, marquer comme terminée)
- Voir les tâches des autres utilisateurs en lecture seule
- Accéder aux tâches archivées (faites) de tous les utilisateurs
- Ne modifier **que ses propres tâches**

## 🖼️ Aperçu personnalisé

Palette de couleurs inspirée des **Canadiens de Montréal** :
- 🎨 Fond : rouge pâle `#f4c6c6`
- 🔵 Barres (haut/bas) : bleu CH `#192168`
- ✍️ Texte : bleu foncé ou blanc selon le contexte

## 🔐 Fonctionnalités

- 🔑 Authentification Firebase (email + mot de passe)
- 🧑 Gestion d'utilisateurs avec Firestore
- 🗂️ Tâches liées à un utilisateur (`ownerId`)
- 📅 Affichage trié par date de création
- ✅ Checkbox pour marquer une tâche comme terminée
- 🔁 Archivage / désarchivage sécurisé
- 🔒 Permissions strictes (lecture seule sur les tâches des autres)

## 🗂️ Structure des vues

``` src/
├── views/
│ ├── Login.vue
│ ├── Register.vue
│ ├── NouvelleTache.vue
│ ├── Tabs.vue
│ └── tabs/
│ ├── MesTaches.vue
│ ├── Autres.vue
│ └── Archivees.vue
├── router/index.js
├── state.js
├── firebase.js
└── theme/variables.css


## ⚙️ Lancer le projet en local

```bash
npm install
ionic serve
