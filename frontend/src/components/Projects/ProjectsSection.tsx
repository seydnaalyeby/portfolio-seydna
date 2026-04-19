import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, loading }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">Projets</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-surface-light rounded w-64 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
    <motion.div
      className="bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(10, 132, 255, 0.2)' }}
      onClick={() => setSelectedProject(project)}
    >
      {/* Project Image */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 relative overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-primary text-4xl font-bold opacity-50">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        
        {project.featured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            Mis en avant
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2">{project.title}</h3>
        <p className="text-primary text-sm mb-3">{project.subtitle}</p>
        <p className="text-text-secondary mb-4 line-clamp-3">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.split(',').map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="h-5 w-5" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">
            ExpÃ©riences & Projets Techniques
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            DÃ©couvrez mes rÃ©alisations et les technologies que j'ai utilisÃ©es
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-text mb-6">Projets Vedettes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-text mb-6">Autres Projets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={featuredProjects.length + index} />
              ))}
            </div>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text mb-2">{selectedProject.title}</h3>
                    <p className="text-primary">{selectedProject.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-text-secondary hover:text-text transition-colors duration-200"
                  >
                    Ã—
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text mb-2">Description</h4>
                  <p className="text-text-secondary">{selectedProject.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text mb-2">DÃ©tails</h4>
                  <div className="text-text-secondary whitespace-pre-line">
                    {selectedProject.details}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-200"
                    >
                      <FaGithub className="h-5 w-5" />
                      Voir sur GitHub
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-200"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Voir en ligne
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;



