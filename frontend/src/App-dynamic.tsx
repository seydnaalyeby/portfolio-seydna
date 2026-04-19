import React, { useState, useEffect } from 'react';
import './index.css';

const DynamicApp: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [strengths, setStrengths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
        
        // Fetch profile
        const profileRes = await fetch(`${API_URL}/profile/main/`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch skills
        const skillsRes = await fetch(`${API_URL}/skills/`);
        const skillsData = await skillsRes.json();
        setSkills(skillsData);

        // Fetch projects
        const projectsRes = await fetch(`${API_URL}/projects/`);
        const projectsData = await projectsRes.json();
        setProjects(projectsData);

        // Fetch education
        const educationRes = await fetch(`${API_URL}/education/`);
        const educationData = await educationRes.json();
        setEducation(educationData);

        // Fetch strengths
        const strengthsRes = await fetch(`${API_URL}/strengths/`);
        const strengthsData = await strengthsRes.json();
        setStrengths(strengthsData);

      } catch (err) {
        setError('Erreur de chargement des données');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
          <p>Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-500">{profile?.full_name || 'Seydna Aly Eby'}</h1>
            <div className="flex gap-6">
              <a href="#about" className="text-gray-300 hover:text-white transition">Profil</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition">Compétences</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition">Projets</a>
              <a href="#education" className="text-gray-300 hover:text-white transition">Formation</a>
              <a href="#strengths" className="text-gray-300 hover:text-white transition">Atouts</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          {/* Photo de profil */}
          {profile?.photo && (
            <div className="mb-8">
              <img 
                src={`http://127.0.0.1:8000${profile.photo}`}
                alt={profile.full_name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-blue-500 shadow-xl object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {profile?.full_name || 'Seydna Aly Eby'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            {profile?.title || 'Développeur Web'}
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
              {profile?.profile_text || 'Description en cours de chargement...'}
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Compétences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
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

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex gap-2 mb-4">
                  {project.technologies?.split(',').map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                {project.demo_url && (
                  <a href={project.demo_url} className="text-blue-400 hover:text-blue-300 transition">
                    Voir le projet
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Formation</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                <p className="text-blue-400 mb-2">{edu.institution}</p>
                <p className="text-gray-400 mb-2">{edu.location}</p>
                <p className="text-gray-500">{edu.start_date} - {edu.current ? 'Présent' : edu.end_date}</p>
                {edu.description && (
                  <p className="text-gray-300 mt-3">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section id="strengths" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Atouts Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {strengths.map((strength, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                <h3 className="text-xl font-semibold mb-3">{strength.title}</h3>
                <p className="text-gray-300">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
              };
              
              try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
                const response = await fetch(`${API_URL}/contact/`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                
                if (response.ok) {
                  alert('Message envoyé avec succès!');
                  e.currentTarget.reset();
                } else {
                  alert('Erreur lors de l\'envoi du message');
                }
              } catch (error) {
                alert('Erreur de connexion');
              }
            }}>
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="message"
                placeholder="Votre message"
                rows={6}
                required
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
          <p className="text-gray-400 mb-2">
            © 2024 {profile?.full_name || 'Seydna Aly Eby'}. Tous droits réservés.
          </p>
          <div className="flex gap-4 justify-center">
            <span className="text-gray-500">Email: {profile?.email || 'seydnaalyeby@gmail.com'}</span>
            <span className="text-gray-500">Localisation: {profile?.location || 'Nouakchott, Mauritanie'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DynamicApp;
