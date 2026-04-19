import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../../types';
import { formatDateRange } from '../../utils/helpers';

interface EducationSectionProps {
  education: Education[];
  loading: boolean;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, loading }) => {
  if (loading) {
    return (
      <section id="education" className="py-20 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">Formation</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-surface-light rounded w-64 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">
            Formation
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Mon parcours acadÃ©mique et mes certifications
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className="relative flex items-start gap-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className="flex-1 bg-background rounded-lg p-6 border border-border hover:border-primary transition-all duration-300"
                    whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(10, 132, 255, 0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-text mb-1">{edu.degree}</h3>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <p className="text-text-secondary text-sm">
                          {formatDateRange(edu.start_date, edu.end_date, edu.current)}
                        </p>
                        <p className="text-text-secondary text-sm">{edu.location}</p>
                      </div>
                    </div>

                    {edu.description && (
                      <p className="text-text-secondary leading-relaxed">
                        {edu.description}
                      </p>
                    )}

                    {/* Status badge */}
                    {edu.current && (
                      <motion.div
                        className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        En cours
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
              <h4 className="text-lg font-semibold text-primary mb-3">Formation continue</h4>
              <p className="text-text-secondary mb-4">
                Je suis passionnÃ© par l'apprentissage continu et je reste constamment Ã  jour avec les derniÃ¨res technologies et meilleures pratiques du dÃ©veloppement.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Certifications Cloud', 'Cours en ligne', 'Workshops', 'CommunautÃ©s tech'].map((item, index) => (
                  <motion.span
                    key={item}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

