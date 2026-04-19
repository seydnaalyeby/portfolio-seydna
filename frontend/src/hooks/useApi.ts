import { useState, useEffect } from 'react';
import { profileApi, skillsApi, projectsApi, educationApi, strengthsApi } from '../services/api';
import { Profile, Skill, Project, Education, KeyStrength, SkillsByCategory } from '../types';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await profileApi.getMain();
        setProfile(data);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsByCategory, setSkillsByCategory] = useState<SkillsByCategory>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const [allSkills, categorizedSkills] = await Promise.all([
          skillsApi.getAll(),
          skillsApi.getByCategory(),
        ]);
        setSkills(allSkills);
        setSkillsByCategory(categorizedSkills);
      } catch (err) {
        setError('Erreur lors du chargement des compétences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, skillsByCategory, loading, error };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const [allProjects, featured] = await Promise.all([
          projectsApi.getAll(),
          projectsApi.getFeatured(),
        ]);
        setProjects(allProjects);
        setFeaturedProjects(featured);
      } catch (err) {
        setError('Erreur lors du chargement des projets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, featuredProjects, loading, error };
};

export const useEducation = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await educationApi.getAll();
        setEducation(data);
      } catch (err) {
        setError('Erreur lors du chargement de la formation');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return { education, loading, error };
};

export const useStrengths = () => {
  const [strengths, setStrengths] = useState<KeyStrength[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStrengths = async () => {
      try {
        setLoading(true);
        const data = await strengthsApi.getAll();
        setStrengths(data);
      } catch (err) {
        setError('Erreur lors du chargement des atouts clés');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStrengths();
  }, []);

  return { strengths, loading, error };
};
