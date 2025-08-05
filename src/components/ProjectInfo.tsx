"use client";

import { useProjectData } from '@/hooks/useProjectData';
import { useSlideContext } from '@/contexts/SlideContext';
import { useEffect, useState } from 'react';
import ProjectDetails from './ProjectDetails';

export default function ProjectInfo() {
  const { getProjectByIndex, loading, error } = useProjectData();
  const { currentIndex, isTransitioning } = useSlideContext();
  const [displayProject, setDisplayProject] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  const currentProject = getProjectByIndex(currentIndex);



  // Animation lors du changement de projet
  useEffect(() => {
    if (isTransitioning) {
      setIsVisible(false);
      setTimeout(() => {
        setDisplayProject(currentProject);
        setIsVisible(true);
      }, 150);
    } else {
      setDisplayProject(currentProject);
      setIsVisible(true);
    }
  }, [currentIndex, currentProject, isTransitioning]);

  if (loading) {
    return (
      <div className="project-info">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-info">
        <div className="error">Erreur: {error}</div>
      </div>
    );
  }

  if (!displayProject) {
    return (
      <div className="project-info">
        <div className="no-data">Aucun projet trouvé</div>
      </div>
    );
  }

  return (
    <div className={`project-info ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="project-layout">
        {/* Titre à gauche */}
        <div className="project-title-section">
          <div className="project-title">
            {displayProject.title}
          </div>
          {displayProject.years && (
            <div className="project-years">
              {displayProject.years}
            </div>
          )}
        </div>
        
        {/* Description à droite */}
        <div className="project-description-section">
          <div className="specifications-title">Description</div>
          {displayProject.description && (
            <div className="project-description">
              {displayProject.description}
            </div>
          )}
          <ProjectDetails project={displayProject} />
        </div>
      </div>
    </div>
  );
} 