"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SlideContextType {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (transitioning: boolean) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

const SlideContext = createContext<SlideContextType | undefined>(undefined);

export const useSlideContext = () => {
  const context = useContext(SlideContext);
  if (context === undefined) {
    throw new Error('useSlideContext must be used within a SlideProvider');
  }
  return context;
};

interface SlideProviderProps {
  children: ReactNode;
  totalSlides: number;
}

export const SlideProvider: React.FC<SlideProviderProps> = ({ children, totalSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const value: SlideContextType = {
    currentIndex,
    setCurrentIndex,
    isTransitioning,
    setIsTransitioning,
    nextSlide,
    prevSlide,
  };

  return (
    <SlideContext.Provider value={value}>
      {children}
    </SlideContext.Provider>
  );
}; 