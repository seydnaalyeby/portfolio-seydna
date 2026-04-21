import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Profile } from '../../types';
import { downloadFile, scrollToSection } from '../../utils/helpers';

interface HeroSectionProps {
  profile: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const handleDownloadCV = () => {
    if (profile.cv_url) {
      downloadFile(profile.cv_url, 'CV_Seydna_Aly_Eby.pdf');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-surface to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="section-eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              // Développeur Full-Stack
            </motion.p>

            <motion.h1
              className="text-display text-5xl sm:text-6xl lg:text-7xl text-text mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {profile.full_name.split(' ').map((word, index) => (
                <span key={index} className={index === profile.full_name.split(' ').length - 1 ? 'gradient-text' : ''}>
                  {word}
                  {index < profile.full_name.split(' ').length - 1 && ' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="font-display text-xl sm:text-2xl text-primary font-semibold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {profile.title}
            </motion.p>

            <motion.p
              className="font-body text-text-secondary text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {profile.profile_text}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Me contacter
              </motion.button>

              {profile.cv_url && (
                <motion.button
                  onClick={handleDownloadCV}
                  className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DocumentArrowDownIcon className="h-5 w-5" />
                  Télécharger CV
                </motion.button>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 text-text-secondary text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="font-medium">Email:</span>
                <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="font-medium">Téléphone:</span>
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="font-medium">Localisation:</span>
                <span>{profile.location}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {profile.photo_url ? (
                  <img
                    src={profile.photo_url}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.removeAttribute('style');
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center"
                  style={profile.photo_url ? { display: 'none' } : undefined}
                >
                  <span className="text-white text-4xl font-bold">
                    {profile.full_name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </motion.div>

              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="text-text-secondary hover:text-primary transition-colors duration-200"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDownIcon className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
