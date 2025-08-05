"use client";

import { useProjectData } from '@/hooks/useProjectData';
import { useSlideContext } from '@/contexts/SlideContext';
import { useEffect, useState } from 'react';

export default function ProjectSpecs() {
  const { getProjectByIndex, loading, error } = useProjectData();
  const { currentIndex, isTransitioning } = useSlideContext();
  const [displayProject, setDisplayProject] = useState<any>(null);
  const [animationState, setAnimationState] = useState('visible');

  const currentProject = getProjectByIndex(currentIndex);

  useEffect(() => {
    if (isTransitioning) {
      // Commencer par faire disparaître l'ancien contenu
      setAnimationState('exit-left');

      // Attendre que l'animation de sortie soit terminée
      setTimeout(() => {
        // changer le contenu
        setDisplayProject(currentProject);
        setAnimationState('hidden');
        
        // Pause puis faire apparaître le nouveau contenu
        setTimeout(() => {
          setAnimationState('enter-left');
        }, 500); // pause avant l'entré du nouveau
      }, 300); // Durée de l'animation de sortie
    } else {
      
      setDisplayProject(currentProject);
      setAnimationState('enter-left');
    }
  }, [currentIndex, currentProject, isTransitioning]);

  if (loading || error || !displayProject) return null;

  return (
    <div className={`project-specs-container ${animationState}`}>
      <div className='specs-title-container'>
        <div className="specs-title">Description</div>
        {displayProject.url && (
          <div className="specs-link">
            <svg className="specs-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-45deg) translateY(-2px)' }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <a href={displayProject.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ cursor: 'pointer', color: 'inherit', position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}>
              Voir le projet
            </a>
          </div>
        )}
      </div>
      {displayProject.description && (
        <div className="specs-description">{displayProject.description}</div>
      )}
    </div>
  );
}