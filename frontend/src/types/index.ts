export interface Profile {
  id: number;
  full_name: string;
  title: string;
  profile_text: string;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  photo_url?: string;
  cv_url?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  level: number;
  order: number;
  is_active: boolean;
}

export type SkillCategory = 'programming' | 'framework' | 'database' | 'tool' | 'soft';

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string;
  details: string;
  github_url?: string;
  live_url?: string;
  image_url?: string;
  featured: boolean;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  order: number;
  is_active: boolean;
}

export interface KeyStrength {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  sent_at: string;
  processed: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface SkillsByCategory {
  [key: string]: Skill[];
}
