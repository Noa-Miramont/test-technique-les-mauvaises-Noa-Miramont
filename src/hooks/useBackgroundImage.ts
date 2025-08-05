import { useEffect, useRef, useState } from 'react';
import { BACKGROUND_IMAGES } from '@/lib/projectMapping';

export const useBackgroundImage = (currentIndex: number) => {
  const [currentImage, setCurrentImage] = useState(BACKGROUND_IMAGES[0]);
  const [nextImage, setNextImage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const previousIndexRef = useRef(currentIndex);

  useEffect(() => {
    const previousIndex = previousIndexRef.current;
    const targetIndex = currentIndex;
    
    // Si c'est le premier rendu, appliquer directement
    if (previousIndex === targetIndex) {
      const image = BACKGROUND_IMAGES[targetIndex];
      if (image) {
        // Vérifier si l'image est déjà en erreur
        if (!imageErrors.has(image)) {
          setCurrentImage(image);
        }
      }
      return;
    }

    // Précharger la nouvelle image
    const newImage = BACKGROUND_IMAGES[targetIndex];
    if (!newImage) return;
    
    const img = new Image();
    
    // Ajouter un timestamp pour éviter le cache
    const timestamp = Date.now();
    const imageUrl = `${newImage}?t=${timestamp}`;
    img.src = imageUrl;
    
    img.onload = () => {
      setImageError(false);
      setImageErrors(prev => {
        const newSet = new Set(prev);
        newSet.delete(newImage);
        return newSet;
      });
      // Démarrer la transition
      setIsTransitioning(true);
      setNextImage(newImage);
      
      // Attendre que l'animation CSS se termine (600ms) avant de changer l'image courante
      setTimeout(() => {
        setCurrentImage(newImage);
        setNextImage(null);
        setIsTransitioning(false);
      }, 600); // Correspond à la durée de l'animation CSS
    };

    img.onerror = () => {
      console.error(`Failed to load background image: ${newImage}`);
      setImageError(true);
      setImageErrors(prev => new Set(prev).add(newImage));
    };

    previousIndexRef.current = targetIndex;
  }, [currentIndex]);

  return {
    currentImage,
    nextImage,
    isTransitioning,
    imageError,
    imageErrors
  };
}; 