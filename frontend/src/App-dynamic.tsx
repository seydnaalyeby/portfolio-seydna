import React, { useState, useEffect, useRef } from 'react';
import './index.css';
// v2

// ── Intersection observer hook ─────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

// ── Fade-in on scroll wrapper ──────────────────────────────────────────────
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ── Animated skill bar ─────────────────────────────────────────────────────
const SkillBar: React.FC<{ skill: any; delay: number }> = ({ skill, delay }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
        <span className="text-xs font-mono text-blue-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full"
          style={{
            width: inView ? `${skill.level}%` : '0%',
            transition: `width 1s ease ${delay}s`,
          }}
        />
      </div>
    </div>
  );
};

// ── Section heading ────────────────────────────────────────────────────────
const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <FadeIn>
    <h2 className="text-4xl font-bold mb-2">{title}</h2>
    <div className="w-12 h-1 bg-blue-500 mb-4 rounded-full" />
    {subtitle && <p className="text-gray-400 mb-10">{subtitle}</p>}
    {!subtitle && <div className="mb-10" />}
  </FadeIn>
);

// ── GitHub icon ────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ── LinkedIn icon ──────────────────────────────────────────────────────────
const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ══════════════════════════════════════════════════════════════════════════
// Main App
// ══════════════════════════════════════════════════════════════════════════
const DynamicApp: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [strengths, setStrengths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ── Fetch all data in parallel ─────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
        const [pR, sR, prR, eR, stR] = await Promise.all([
          fetch(`${API_URL}/profile/main/`),
          fetch(`${API_URL}/skills/`),
          fetch(`${API_URL}/projects/`),
          fetch(`${API_URL}/education/`),
          fetch(`${API_URL}/strengths/`),
        ]);
        const [p, s, pr, e, st] = await Promise.all([pR.json(), sR.json(), prR.json(), eR.json(), stR.json()]);
        setProfile(p); setSkills(s); setProjects(pr); setEducation(e); setStrengths(st);
      } catch (err) {
        setError('Erreur de chargement des données');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Scroll events: progress bar + active section + back-to-top ──────────
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (scrollTop / docH) * 100 : 0);
      setShowBackToTop(scrollTop > 500);

      const ids = ['contact', 'strengths', 'education', 'projects', 'skills', 'about', 'hero'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && scrollTop >= el.offsetTop - 140) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Group skills by category ───────────────────────────────────────────
  const skillGroups: Record<string, { label: string; items: any[] }> = {
    programming: { label: 'Programmation', items: [] },
    framework:   { label: 'Frameworks',    items: [] },
    database:    { label: 'Bases de données', items: [] },
    tool:        { label: 'Outils & DevOps', items: [] },
  };
  skills.forEach(s => { if (skillGroups[s.category]) skillGroups[s.category].items.push(s); });

  const navLinks = [
    { id: 'about',     label: 'Profil' },
    { id: 'skills',    label: 'Compétences' },
    { id: 'projects',  label: 'Projets' },
    { id: 'education', label: 'Formation' },
    { id: 'strengths', label: 'Atouts' },
    { id: 'contact',   label: 'Contact' },
  ];

  // ── Loading ────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
        <p className="text-gray-400 font-mono text-sm tracking-wide">Chargement du portfolio…</p>
      </div>
    </div>
  );

  // ── Error ──────────────────────────────────────────────────────────────
  if (error) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
          Réessayer
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-blue-500 z-[60] transition-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Header ── */}
      <header className="fixed top-0 w-full bg-black/85 backdrop-blur-md z-50 border-b border-gray-800/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-bold text-blue-500 hover:text-blue-400 transition tracking-tight"
          >
            {profile?.full_name || 'Portfolio'}
          </button>
          <nav className="hidden md:flex gap-7">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* ════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════ */}
        <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
          <div className="text-center max-w-3xl mx-auto">

            {/* Photo with animated ring */}
            {profile?.photo_url && (
              <div className="relative inline-block mb-8">
                <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDuration: '2.8s' }} />
                  <img
                    src={profile.photo_url}
                    alt={profile.full_name}
                    className="w-full h-full rounded-full object-cover border-2 border-blue-500/60 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                    onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }}
                  />
                </div>
              </div>
            )}

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Disponible pour un stage
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
              {profile?.full_name?.split(' ').map((word: string, i: number, arr: string[]) =>
                i === arr.length - 1
                  ? <span key={i} className="text-blue-500"> {word}</span>
                  : <span key={i}>{word} </span>
              )}
            </h1>

            {/* Title */}
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-6">{profile?.title}</p>

            {/* Bio */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              {profile?.profile_text}
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500 text-gray-400 hover:text-white transition text-sm">
                  <GithubIcon /> GitHub
                </a>
              )}
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500 text-gray-400 hover:text-white transition text-sm">
                  <LinkedinIcon /> LinkedIn
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500 text-gray-400 hover:text-white transition text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {profile?.cv_url && (
                <a href={profile.cv_url} download target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger CV
                </a>
              )}
              <a href="#contact"
                className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-7 py-3 rounded-xl font-semibold transition">
                Me contacter
              </a>
            </div>

            {/* Scroll hint */}
            <div className="mt-16 flex flex-col items-center gap-2 text-gray-600">
              <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            ABOUT
        ════════════════════════════════════════════════════════ */}
        <section id="about" className="py-24 bg-gray-950">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeading title="Profil" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <FadeIn delay={0.1}>
                <p className="text-gray-300 text-lg leading-relaxed">{profile?.profile_text}</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-3">
                  {[
                    { emoji: '📧', label: 'Email', value: profile?.email, href: `mailto:${profile?.email}` },
                    { emoji: '📱', label: 'Téléphone', value: profile?.phone },
                    { emoji: '📍', label: 'Localisation', value: profile?.location },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
                      <span className="text-xl w-8 text-center">{item.emoji}</span>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-0.5">{item.label}</p>
                        {item.href
                          ? <a href={item.href} className="text-white hover:text-blue-400 transition text-sm">{item.value}</a>
                          : <p className="text-white text-sm">{item.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SKILLS
        ════════════════════════════════════════════════════════ */}
        <section id="skills" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeading title="Compétences" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skillGroups).map(([key, { label, items }], i) =>
                items.length > 0 && (
                  <FadeIn key={key} delay={i * 0.1}>
                    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 h-full">
                      <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <span className="w-4 h-px bg-blue-500" />{label}
                      </h3>
                      <div className="space-y-4">
                        {items.map((skill, si) => <SkillBar key={skill.id} skill={skill} delay={si * 0.06} />)}
                      </div>
                    </div>
                  </FadeIn>
                )
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            PROJECTS
        ════════════════════════════════════════════════════════ */}
        <section id="projects" className="py-24 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading title="Projets" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.1}>
                  <div className="group flex flex-col h-full bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]">
                    {project.featured && (
                      <span className="inline-block text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full mb-3 w-fit tracking-widest uppercase">
                        ⭐ Featured
                      </span>
                    )}
                    <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-blue-400 text-sm mb-3 font-medium">{project.subtitle}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies?.split(',').map((tech: string, ti: number) => (
                        <span key={ti} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-md text-xs font-mono border border-gray-700">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    {(project.github_url || project.live_url) && (
                      <div className="flex gap-4 pt-3 border-t border-gray-800">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition text-sm">
                            <GithubIcon /> Code
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            EDUCATION  — timeline
        ════════════════════════════════════════════════════════ */}
        <section id="education" className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <SectionHeading title="Formation" />
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <FadeIn key={edu.id} delay={i * 0.12}>
                    <div className="relative pl-12">
                      <div className="absolute left-[13px] top-5 w-3 h-3 rounded-full bg-blue-500 border-2 border-black shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <h3 className="text-lg font-bold">{edu.degree}</h3>
                          <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded-lg shrink-0">
                            {edu.start_date?.slice(0, 4)} — {edu.current ? 'Présent' : edu.end_date?.slice(0, 4)}
                          </span>
                        </div>
                        <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
                        <p className="text-gray-500 text-sm mb-3">📍 {edu.location}</p>
                        {edu.description && <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            STRENGTHS
        ════════════════════════════════════════════════════════ */}
        <section id="strengths" className="py-24 bg-gray-950">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeading title="Atouts Clés" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {strengths.map((s, i) => (
                <FadeIn key={s.id} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl border border-gray-800 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-gray-950">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                      <span className="text-blue-400 text-sm font-mono">✦</span>
                    </div>
                    <h3 className="text-base font-bold mb-2">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════════════════════ */}
        <section id="contact" className="py-24">
          <div className="max-w-2xl mx-auto px-6">
            <SectionHeading
              title="Contact"
              subtitle="Disponible pour un stage ou une collaboration — n'hésitez pas !"
            />
            <FadeIn delay={0.1}>
              <ContactForm profile={profile} />
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-10 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 <span className="text-gray-300">{profile?.full_name}</span>. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition text-sm flex items-center gap-1.5">
                <GithubIcon /> GitHub
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition text-sm flex items-center gap-1.5">
                <LinkedinIcon /> LinkedIn
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="text-gray-500 hover:text-white transition text-sm">
                Email
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* ── Back to top ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Retour en haut"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

// ── Contact form (isolated to manage its own state cleanly) ───────────────
const ContactForm: React.FC<{ profile: any }> = ({ profile }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${API_URL}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      });
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else { throw new Error(); }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Votre nom" required className={inputClass} />
        <input type="email" name="email" placeholder="Votre email" required className={inputClass} />
      </div>
      <input type="text" name="subject" placeholder="Sujet" required className={inputClass} />
      <textarea name="message" placeholder="Votre message" rows={6} required className={`${inputClass} resize-none`} />
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full px-8 py-3.5 rounded-xl font-semibold transition text-white ${
          status === 'success' ? 'bg-green-600'
          : status === 'error' ? 'bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600'
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {status === 'sending' ? 'Envoi en cours…'
          : status === 'success' ? '✓ Message envoyé !'
          : status === 'error' ? '✗ Erreur — réessayer'
          : 'Envoyer le message'}
      </button>
    </form>
  );
};

export default DynamicApp;
