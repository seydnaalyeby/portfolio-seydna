import React from 'react';
import { motion } from 'framer-motion';
import { KeyStrength } from '../../types';

interface StrengthsSectionProps {
  strengths: KeyStrength[];
  loading: boolean;
}

const StrengthsSection: React.FC<StrengthsSectionProps> = ({ strengths, loading }) => {
  if (loading) {
    return (
      <section id="strengths" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">Atouts ClÃ©s</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-surface-light rounded w-64 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="strengths" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">
            Atouts ClÃ©s
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Mes qualitÃ©s personnelles et professionnelles qui font la diffÃ©rence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.id}
              className="bg-surface rounded-lg p-6 border border-border hover:border-primary transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(10, 132, 255, 0.1)' }}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {strength.icon ? (
                  <i className={`${strength.icon} text-primary text-2xl`}></i>
                ) : (
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                )}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-primary transition-colors duration-300">
                {strength.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {strength.description}
              </p>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 border border-primary/20">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              PrÃªt Ã  collaborer ?
            </h3>
            <p className="text-text-secondary text-lg mb-6 max-w-2xl mx-auto">
              Ces atouts, combinÃ©s Ã  mes compÃ©tences techniques, me permettent de m'adapter rapidement Ã  de nouveaux projets et de livrer des solutions de qualitÃ©.
            </p>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discutons de votre projet
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StrengthsSection;

