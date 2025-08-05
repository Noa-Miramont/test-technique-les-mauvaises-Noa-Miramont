import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/strapi/fetchGraphql';
import { PROJET_QUERY } from '@/lib/strapi/queries';
import { ProjetsResponse, StrapiProjet } from '@/types/strapi';
import { getProjectSlugByIndex, normalizeProjectTitle } from '@/lib/projectMapping';

export const useProjectData = () => {
  const [projects, setProjects] = useState<StrapiProjet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        const data = await fetchGraphQL<ProjetsResponse>(PROJET_QUERY);
        
        if (data && data.projets) {
          setProjects(data.projets);
        } else {
          setError('Aucune donnée récupérée');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectByIndex = (index: number): StrapiProjet | null => {
    if (projects.length === 0) return null;
    
    const targetSlug = getProjectSlugByIndex(index);
    
    const project = projects.find(project => {
      const normalizedTitle = normalizeProjectTitle(project.title);
      return normalizedTitle === targetSlug;
    });
    
    if (!project) {
      return projects[index % projects.length] || null;
    }
    
    return project;
  };

  return {
    projects,
    loading,
    error,
    getProjectByIndex
  };
}; 