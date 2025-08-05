# Les Mauvaises - Portfolio 3D

Ce projet est un portfolio interactif en 3D développé avec Next.js, TypeScript, React Three Fiber et Strapi. Il met en avant des projets à travers une expérience immersive mêlant animations, modèles 3D et interactions visuelles modernes.

## 🚀 Fonctionnalités principales
- **Page d'accueil immersive** avec scroll et section Hero 3D
- **Affichage de projets** dynamiques récupérés via Strapi (GraphQL)
- **Intégration de modèles 3D** (.gltf + texture) pour chaque projet
- **Animations fluides** (GSAP, Lenis)
- **Responsive design** avec Adaptation des Contrôle du site (navbar button ---> swipe controls)

## Optimisation et performence
- **Optimisation du nombre de Polygones chargé** (clone du modèle)
- **Séparation du Modèle et des texture** (GLB ---> GLTF + Textures)
- **Chargement des modèles, aniamtions et textures au loader** pour évité tout problème de Performance pendant les transitions
- **Gestion des reflets et de la lumière** Optimiser entre réalisme et performances
- **Gestion Personnalisé du fov et du positionnement de la camera** pour un rendu plus réaliste et élégent

## 🛠️ Technologies utilisées
- **Next.js 15** (App Router)
- **TypeScript**
- **SCSS** pour le style
- **Three.js, React Three Fiber, Drei** pour la 3D
- **GSAP, Lenis** pour les animations
- **Strapi** (GraphQL) pour la gestion de contenu

## 📁 Structure du projet
```
/ ├── src/
│   ├── app/           # Pages, layout, hooks, styles
│   ├── components/    # Composants UI et 3D
│   ├── contexts/      # Contexts React
│   ├── hooks/         # Hooks personnalisés
│   ├── lib/           # Fonctions utilitaires, requêtes Strapi
│   └── types/         # Types TypeScript
├── public/            # Assets, modèles 3D, images
├── scripts/           # Scripts utilitaires
```

## ⚡ Installation & démarrage
1. **Cloner le repo**
   ```bash
   git clone https://github.com/Noa-Miramont/test-technique-les-mauvaises-Noa-Miramont.git
   cd test-technique-les-mauvaises-Noa-Miramont
   ```
2. **Installer les dépendances**
   ```bash
   pnpm install
   ```
3. **Configurer les variables d'environnement** (voir `.env.example` si disponible)
4. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   ```

## 🌐 Déploiement

Quelque problème ont été rencontrés lors du déploiement Vercel, des changement ont été fait pour régler les problème et des mesures de gestion d'erreur ont du être mis en place (voir DEPLOYEMENT_ISSUE.md)