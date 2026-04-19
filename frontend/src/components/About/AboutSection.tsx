import React from 'react';
import { motion } from 'framer-motion';
import { Profile } from '../../types';

interface AboutSectionProps {
  profile: Profile;
  loading: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ profile, loading }) => {
  if (loading) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">Profil</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-surface-light rounded w-64 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow mb-3">// À propos</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mb-4">
            Profil
          </h2>
          <p className="font-body text-text-secondary text-lg max-w-2xl mx-auto">
            En savoir plus sur moi et mon parcours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-surface rounded-lg p-8 border border-border">
              <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                À propos de moi
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {profile.profile_text}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-text">
                    <strong className="text-primary">Autonome</strong> et capable de gérer des projets de manière indépendante
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-text">
                    <strong className="text-primary">Rigoureux</strong> dans l'écriture du code et le respect des bonnes pratiques
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-text">
                    <strong className="text-primary">Orienté résultats</strong> avec une focus sur la livraison de solutions fonctionnelles
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <motion.div
                className="bg-surface rounded-lg p-4 text-center border border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-display text-2xl font-bold text-primary mb-1">3+</div>
                <div className="font-code text-text-secondary text-xs tracking-wide-mono">Ans d'exp.</div>
              </motion.div>
              <motion.div
                className="bg-surface rounded-lg p-4 text-center border border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-display text-2xl font-bold text-primary mb-1">15+</div>
                <div className="font-code text-text-secondary text-xs tracking-wide-mono">Projets</div>
              </motion.div>
              <motion.div
                className="bg-surface rounded-lg p-4 text-center border border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-display text-2xl font-bold text-primary mb-1">10+</div>
                <div className="font-code text-text-secondary text-xs tracking-wide-mono">Techs</div>
              </motion.div>
              <motion.div
                className="bg-surface rounded-lg p-4 text-center border border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-display text-2xl font-bold text-primary mb-1">100%</div>
                <div className="font-code text-text-secondary text-xs tracking-wide-mono">Motivation</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h4 className="font-display text-lg font-semibold text-primary mb-4">Informations clés</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Nom</span>
                      <span className="text-text font-medium">{profile.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Titre</span>
                      <span className="text-text font-medium">{profile.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Localisation</span>
                      <span className="text-text font-medium">{profile.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Email</span>
                      <span className="text-text font-medium">{profile.email}</span>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h4 className="font-display text-lg font-semibold text-primary mb-4">Centres d'intérêt</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Intelligence Artificielle', 'Développement Mobile', 'Technologies Web', 'Open Source'].map((interest, index) => (
                      <motion.span
                        key={interest}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h4 className="font-display text-lg font-semibold text-primary mb-4">Langues</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-text">Arabe</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-4 h-4 bg-primary rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Français</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-4 h-4 bg-primary rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text">Anglais</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((star) => (
                          <div key={star} className="w-4 h-4 bg-primary rounded-full"></div>
                        ))}
                        <div className="w-4 h-4 bg-surface-light rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
