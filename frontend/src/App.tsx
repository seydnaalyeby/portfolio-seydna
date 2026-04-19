import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import SkillsSection from './components/Skills/SkillsSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import EducationSection from './components/Education/EducationSection';
import StrengthsSection from './components/Strengths/StrengthsSection';
import ContactSection from './components/Contact/ContactSection';
import { useProfile, useSkills, useProjects, useEducation, useStrengths } from './hooks/useApi';

const App: React.FC = () => {
  const profile = useProfile();
  const skills = useSkills();
  const projects = useProjects();
  const education = useEducation();
  const strengths = useStrengths();

  // Check if any data is still loading
  const isLoading = profile.loading || skills.loading || projects.loading || education.loading || strengths.loading;

  return (
    <div className="min-h-screen bg-background text-text">
      <Header />
      
      <main>
        <AnimatePresence>
          {profile.profile && !isLoading && (
            <HeroSection profile={profile.profile} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {profile.profile && !isLoading && (
            <AboutSection profile={profile.profile} loading={profile.loading} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && (
            <SkillsSection 
              skillsByCategory={skills.skillsByCategory} 
              loading={skills.loading} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && (
            <ProjectsSection 
              projects={projects.projects} 
              loading={projects.loading} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && (
            <EducationSection 
              education={education.education} 
              loading={education.loading} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && (
            <StrengthsSection 
              strengths={strengths.strengths} 
              loading={strengths.loading} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          <ContactSection />
        </AnimatePresence>
      </main>

      <Footer />

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-background z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-text-secondary">Chargement du portfolio...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error handling */}
      {(profile.error || skills.error || projects.error || education.error || strengths.error) && (
        <motion.div
          className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Une erreur est survenue lors du chargement des données.
        </motion.div>
      )}
    </div>
  );
};

export default App;
