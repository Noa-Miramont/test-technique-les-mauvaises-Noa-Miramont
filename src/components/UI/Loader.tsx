// Loader de Démarrage //

"use client";

import { useState, useEffect } from "react";

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [hasBeenHidden, setHasBeenHidden] = useState(false);

  useEffect(() => {
    const checkLoading = () => {
      if (typeof window === 'undefined') return;
      
      // @ts-ignore
      const isLoading = window.isWebGLLoading;
      // @ts-ignore
      const opacityValue = window.canOpacity ?? 0;

      const hasLoaded = !isLoading && opacityValue >= 0.95;

      if (hasLoaded && isVisible && !hasBeenHidden) {
        const timer = setTimeout(() => {
          setOpacity(0);
        }, 100);
        return () => clearTimeout(timer);
      } else if (!hasLoaded && !isVisible && !hasBeenHidden) {
        setIsVisible(true);
        setOpacity(1);
      }
      
      return undefined;
    };

    checkLoading();
    const interval = setInterval(checkLoading, 100);
    return () => clearInterval(interval);
  }, [isVisible, hasBeenHidden]);

  useEffect(() => {
    if (opacity === 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setHasBeenHidden(true);
      }, 800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [opacity]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: opacity,
        transition: 'opacity 0.8s ease-in-out',
        pointerEvents: opacity > 0.1 ? 'auto' : 'none'
      }}
    >
      <div>
        <img 
          className="logo" 
          src="/icons/lesMauvaises.webp"
          style={{
            animation: 'rotateWithPause 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            width: '100px',
            height: 'auto'
          }}
        />
        <style jsx>{`
          @keyframes rotateWithPause {
            0% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(360deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;