"use client";

import { useProjectData } from '@/hooks/useProjectData';
import { useSlideContext } from '@/contexts/SlideContext';
import { useEffect, useState } from 'react';

export default function ProjectTitle() {
  const { getProjectByIndex, loading, error } = useProjectData();
  const { currentIndex, isTransitioning } = useSlideContext();
  const [displayProject, setDisplayProject] = useState<any>(null);
  const [animationState, setAnimationState] = useState('visible');

  const currentProject = getProjectByIndex(currentIndex);

  useEffect(() => {
    if (isTransitioning) {
      // Faire disparaître l'ancien contenu
      setAnimationState('exit-right');

      // Attendre que l'animation de sortie soit terminée
      setTimeout(() => {
        // Changer le contenu
        setDisplayProject(currentProject);
        setAnimationState('hidden');
        
        // Attendre un peu puis faire apparaître le nouveau contenu
        setTimeout(() => {
          setAnimationState('enter-right');
        }, 500);
      }, 300); // Durée de l'animation de sortie
    } else {
      
      setDisplayProject(currentProject);
      setAnimationState('enter-right');
    }
  }, [currentIndex, currentProject, isTransitioning]);

  if (loading || error || !displayProject) return null;

  return (
    <div className={`project-title-container ${animationState}`}>
      <div className="project-title-main">{displayProject.title}</div>
      {displayProject.years && (
        <div className="project-title-year">{displayProject.years}</div>
      )}
    </div>
  );
}