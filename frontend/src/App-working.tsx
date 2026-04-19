import React from 'react';
import './index.css';

const WorkingApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-500">Seydna Aly Eby</h1>
            <div className="flex gap-6">
              <a href="#about" className="text-gray-300 hover:text-white transition">Profil</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition">Compétences</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition">Projets</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Seydna Aly Eby
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Étudiant en Master 2 Informatique Appliquée à la Gestion
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition">
              Télécharger CV
            </button>
            <a href="#contact" className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition">
              Me contacter
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Profil</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed">
              Étudiant en Master 2 Informatique Appliquée à la Gestion à l'ISCAE, 
              je recherche un stage en développement logiciel. Passionné par les nouvelles technologies 
              et doté d'une forte capacité d'adaptation, je suis déterminé à contribuer 
              activement à des projets innovants tout en développant mes compétences techniques 
              et professionnelles.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Compétences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Python', level: 90 },
              { name: 'JavaScript', level: 85 },
              { name: 'React', level: 80 },
              { name: 'Django', level: 85 },
              { name: 'TypeScript', level: 75 },
              { name: 'SQL', level: 80 }
            ].map((skill, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 mt-2">{skill.level}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Votre message"
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Seydna Aly Eby. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WorkingApp;
