# Les Mauvaises - Portfolio 3D

Ce projet est un portfolio interactif en 3D développé avec Next.js, TypeScript, React Three Fiber et Strapi. Il met en avant des projets à travers une expérience immersive mêlant animations, modèles 3D et interactions visuelles modernes.

## 🚀 Fonctionnalités principales
- **Page d'accueil immersive** avec scroll et section Hero 3D
- **Affichage de projets** dynamiques récupérés via Strapi (GraphQL)
- **Intégration de modèles 3D** (.glb) pour chaque projet
- **Animations fluides** (GSAP, Lenis)
- **Navigation détaillée** par projet
- **Responsive design** et expérience utilisateur moderne

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
Le projet est prêt pour un déploiement sur Vercel ou toute plateforme compatible Next.js.

## 🤝 Contribution
Les contributions sont les bienvenues !
- Forkez le repo
- Créez une branche (`git checkout -b feature/ma-feature`)
- Commitez vos modifications
- Ouvrez une Pull Request

## 📄 Licence
MIT

---

**Contact** : contact@les-mauvaises.fr
