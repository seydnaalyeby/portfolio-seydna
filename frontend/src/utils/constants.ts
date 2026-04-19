export const SKILL_CATEGORY_LABELS = {
  programming: 'Programmation',
  framework: 'Frameworks',
  database: 'Bases de données',
  tool: 'Outils',
  soft: 'Compétences douces',
} as const;

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Accueil', href: '#home' },
  { id: 'about', label: 'Profil', href: '#about' },
  { id: 'skills', label: 'Compétences', href: '#skills' },
  { id: 'projects', label: 'Projets', href: '#projects' },
  { id: 'education', label: 'Formation', href: '#education' },
  { id: 'strengths', label: 'Atouts', href: '#strengths' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/seydna',
  linkedin: 'https://linkedin.com/in/seydna',
  email: 'mailto:seydnaalyeby@gmail.com',
} as const;

export const ANIMATION_DURATION = {
  fast: 300,
  normal: 500,
  slow: 800,
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
