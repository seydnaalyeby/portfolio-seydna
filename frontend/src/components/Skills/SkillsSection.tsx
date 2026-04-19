import React from 'react';
import { motion } from 'framer-motion';
import { Skill, SkillsByCategory } from '../../types';
import { SKILL_CATEGORY_LABELS } from '../../utils/constants';
import { getSkillColor } from '../../utils/helpers';

interface SkillsSectionProps {
  skillsByCategory: SkillsByCategory;
  loading: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skillsByCategory, loading }) => {
  if (loading) {
    return (
      <section id="skills" className="py-20 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">Compétences</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-surface-light rounded w-64 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow mb-3">// Stack technique</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">
            Compétences
          </h2>
          <p className="font-body text-text-secondary text-lg max-w-2xl mx-auto">
            Un aperçu de mes compétences techniques et de mon niveau de maîtrise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              className="bg-background rounded-lg p-6 border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-xl font-semibold text-primary mb-6">
                {SKILL_CATEGORY_LABELS[category as keyof typeof SKILL_CATEGORY_LABELS]}
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-body text-text font-medium">{skill.name}</span>
                      <span className="font-code text-text-secondary text-xs">{skill.level}%</span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-surface-light rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Overview */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-wrap gap-3 justify-center">
            {Object.values(skillsByCategory).flat().slice(0, 8).map((skill, index) => (
              <motion.span
                key={skill.id}
                className="font-code px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20 tracking-wide"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
