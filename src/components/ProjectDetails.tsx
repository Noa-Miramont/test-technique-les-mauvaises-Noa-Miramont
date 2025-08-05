"use client";

import { StrapiProjet } from '@/types/strapi';

interface ProjectDetailsProps {
  project: StrapiProjet;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="project-details">
      {/* URL du projet */}
      {project.url && (
        <div className="project-url">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
            Voir le projet →
          </a>
        </div>
      )}
    </div>
  );
} 