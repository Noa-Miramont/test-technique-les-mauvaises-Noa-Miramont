import { useEffect, useRef } from 'react';

// Couleurs principales pour chaque canette (sans le gradient)
const BACKGROUND_COLORS = [
  { r: 57, g: 48, b: 46 },   // arte 
  { r: 49, g: 56, b: 67 },   // floa 
  { r: 75, g: 64, b: 60 }, // diurne
  { r: 71, g: 39, b: 59 },  // les_mauvaises
  { r: 64, g: 60, b: 43 },  // sharp_and_cheesy
  { r: 71, g: 69, b: 60 }, // soap_nova
  { r: 60, g: 71, b: 76 }  // vdk
];

const BACKGROUND_GRADIENTS = [
  'radial-gradient(circle,rgb(57, 48, 46) 10%, rgba(46, 46, 51, 1) 50%)',
  'radial-gradient(circle,rgb(49, 56, 67) 10%, rgba(46, 46, 51, 1) 50%)',
  'radial-gradient(circle,rgb(75, 64, 60) 0%, rgba(46, 46, 51, 1) 50%)',
  'radial-gradient(circle,rgb(71, 39, 59) 0%, rgba(46, 46, 51, 1) 50%)',
  'radial-gradient(circle,rgb(64, 60, 43) 0%, rgba(46, 46, 51, 1) 50%)',
  'radial-gradient(circle,rgb(71, 69, 60) 0%, rgba(46, 46, 51, 1) 50%)',
  'radial-gradient(circle,rgb(60, 71, 76) 0%, rgba(46, 46, 51, 1) 50%)'
];

export const useBackgroundColor = (currentIndex: number) => {
  const animationRef = useRef<number | undefined>(undefined);
  const previousIndexRef = useRef(currentIndex);

  useEffect(() => {
    const root = document.documentElement;
    const previousIndex = previousIndexRef.current;
    const targetIndex = currentIndex;
    
    // Si c'est le premier rendu, appliquer directement
    if (previousIndex === targetIndex) {
      const gradient = BACKGROUND_GRADIENTS[targetIndex] ?? BACKGROUND_GRADIENTS[0];
      if (gradient) {
        root.style.setProperty('--bg', gradient);
      }
      return;
    }

    // Animation fluide entre les couleurs
    const startTime = performance.now();
    const duration = 1500; // 2 secondes pour une transition lente
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
    
      const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
      const easedProgress = easeInOut(progress);
    
      const prevColor = BACKGROUND_COLORS[previousIndex] ?? BACKGROUND_COLORS[0];
      const targetColor = BACKGROUND_COLORS[targetIndex] ?? BACKGROUND_COLORS[0];
    
      if (prevColor && targetColor) {
        const r = Math.round(prevColor.r + (targetColor.r - prevColor.r) * easedProgress);
        const g = Math.round(prevColor.g + (targetColor.g - prevColor.g) * easedProgress);
        const b = Math.round(prevColor.b + (targetColor.b - prevColor.b) * easedProgress);
    
        const gradient = `radial-gradient(circle,rgba(${r}, ${g}, ${b}, 1) 10%, rgba(46, 46, 51, 1) 50%)`;
        root.style.setProperty('--bg', gradient);
      }
    
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Nettoyer l'animation précédente si elle existe
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);
    previousIndexRef.current = targetIndex;
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentIndex]);
}; 