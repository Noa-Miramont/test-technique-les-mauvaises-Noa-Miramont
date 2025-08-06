# Problème de déploiement - Images de fond

## Problème identifié

Les images de fond ne sont pas accessibles en production sur Vercel, retournant une erreur 404 :
- URL testée : `https://test-technique-les-mauvaises.vercel.app/backgrounds/ArteBG.png`
- Erreur : `404 Not Found`

## Cause probable

Le problème semble être lié au déploiement sur Vercel où les fichiers statiques du dossier `public/backgrounds/` ne sont pas correctement servis.

## Solution mise en place

### 1. Gestion d'erreur dans le hook `useBackgroundImage`

Le hook `useBackgroundImage` a été modifié pour :
- Détecter les erreurs de chargement d'images
- Retourner un état `imageError` 
- Logger les erreurs dans la console

### 2. Fallback visuel dans le composant `Homepage`

Le composant `Homepage` utilise maintenant :
- `backgroundColor: '#2e2e33'` en cas d'erreur d'image
- `backgroundImage: 'none'` pour éviter les tentatives de chargement répétées

### 3. Configuration Vercel

Un fichier `vercel.json` a été ajouté avec :
- Configuration des headers de cache pour les images
- Optimisation du déploiement

## Test de la solution

### Localement
```bash
npm run dev
npm run test-local-images
# Vérifie l'accessibilité des images localement
```

### Test du fallback
```bash
npm run test-fallback
# Teste le comportement en cas d'erreur d'image
```

### En production
```bash
npm run check-deployment
# Vérifie l'accessibilité des images sur Vercel
```

## Fichiers modifiés

1. `src/hooks/useBackgroundImage.ts` - Ajout de la gestion d'erreur robuste
2. `src/components/Homepage.tsx` - Ajout du fallback visuel avec Set d'erreurs
3. `vercel.json` - Configuration du déploiement

## Résultat attendu

En cas d'erreur 404 sur les images de fond :
- Le fond affichera une couleur de fallback (`#2e2e33`)
- Les erreurs seront loggées dans la console
- L'application continuera de fonctionner normalement
- La canette 3D restera visible et interactive

## Prochaines étapes

1. Déployer les modifications sur Vercel
2. Vérifier que le fallback fonctionne en production
3. Si le problème persiste, considérer :
   - Upload des images sur un CDN externe
   - Utilisation d'images optimisées (WebP)
   - Configuration alternative de Vercel 