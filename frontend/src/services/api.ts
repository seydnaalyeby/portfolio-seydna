import axios from 'axios';
import { Profile, Skill, Project, Education, KeyStrength, ContactMessage, ContactForm, SkillsByCategory } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Profile API
export const profileApi = {
  getMain: async (): Promise<Profile> => {
    const response = await api.get('/profile/main/');
    return response.data;
  },
};

// Skills API
export const skillsApi = {
  getAll: async (): Promise<Skill[]> => {
    const response = await api.get('/skills/');
    return response.data;
  },
  getByCategory: async (): Promise<SkillsByCategory> => {
    const response = await api.get('/skills/by_category/');
    return response.data;
  },
};

// Projects API
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects/');
    return response.data;
  },
  getFeatured: async (): Promise<Project[]> => {
    const response = await api.get('/projects/featured/');
    return response.data;
  },
};

// Education API
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    const response = await api.get('/education/');
    return response.data;
  },
};

// Key Strengths API
export const strengthsApi = {
  getAll: async (): Promise<KeyStrength[]> => {
    const response = await api.get('/strengths/');
    return response.data;
  },
};

// Contact API
export const contactApi = {
  sendMessage: async (message: ContactForm): Promise<void> => {
    await api.post('/contact/', message);
  },
};

export default api;
