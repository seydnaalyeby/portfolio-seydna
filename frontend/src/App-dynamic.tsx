import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './index.css';

// ── Typewriter hook ───────────────────────────────────────────────────────
const useTypewriter = (text: string, speed = 42, startDelay = 900) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!text) return;
    setDisplayed('');
    let i = 0;
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text]);
  return displayed;
};

// ── Custom cursor ─────────────────────────────────────────────────────────
const Cursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28 });
  const dotX = useSpring(x, { stiffness: 900, damping: 35 });
  const dotY = useSpring(y, { stiffness: 900, damping: 35 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] w-9 h-9 rounded-full border border-blue-400/50"
        style={{ left: ringX, top: ringY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-blue-400"
        style={{ left: dotX, top: dotY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

// ── Hero background orbs ──────────────────────────────────────────────────
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    {/* Dot grid */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
    {/* Orb 1 - blue */}
    <motion.div
      className="absolute rounded-full blur-[120px]"
      style={{ width: 700, height: 700, left: '5%', top: '10%', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Orb 2 - violet */}
    <motion.div
      className="absolute rounded-full blur-[100px]"
      style={{ width: 500, height: 500, right: '5%', top: '30%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 30, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
    {/* Orb 3 - cyan */}
    <motion.div
      className="absolute rounded-full blur-[130px]"
      style={{ width: 400, height: 400, left: '40%', bottom: '10%', background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -15, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
    />
  </div>
);

// ── FadeIn scroll trigger ─────────────────────────────────────────────────
const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}> = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 40 : 0, x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Skill bar ─────────────────────────────────────────────────────────────
const SkillBar: React.FC<{ skill: any; delay: number }> = ({ skill, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">{skill.name}</span>
        <motion.span
          className="text-xs font-mono text-blue-400"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.9 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-800/70 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-1.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400"
          style={{ boxShadow: '0 0 10px rgba(59,130,246,0.6)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay }}
        />
      </div>
    </div>
  );
};

// ── Section heading ───────────────────────────────────────────────────────
const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="mb-16">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-4xl font-bold mb-3"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        style={{ originX: 0 }}
        className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-10"
        >
          {subtitle}
        </motion.p>
      )}
      {!subtitle && <div className="mb-10" />}
    </div>
  );
};

// ── 3D Tilt card ──────────────────────────────────────────────────────────
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Icons ─────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches);
  }, []);

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
        setProfile({ ...p, cv_url: '/seydna_aly_cv.pdf' });
        setSkills(s); setProjects(pr); setEducation(e); setStrengths(st);
      } catch {
        setError('Erreur de chargement des données');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const titleTyped = useTypewriter(profile?.title || '', 42, 1000);

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
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-16 h-16 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, transparent)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[3px] rounded-full bg-black" />
        </div>
        <p className="text-gray-500 font-mono text-xs tracking-[0.3em] uppercase">Chargement</p>
      </motion.div>
    </div>
  );

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

  const words = (profile?.full_name || '').split(' ');

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: isDesktop ? 'none' : 'auto' }}>
      {isDesktop && <Cursor />}

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[60]"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
        }}
      />

      {/* ── Header ── */}
      <motion.header
        className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800/50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-bold text-blue-500 hover:text-blue-400 transition tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {profile?.full_name || 'Portfolio'}
          </motion.button>
          <nav className="hidden md:flex gap-7">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative text-sm font-medium transition-colors duration-200 pb-1 ${
                  activeSection === id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      <main>
        {/* ════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
          <HeroBackground />
          <div className="text-center max-w-3xl mx-auto relative z-10">

            {/* Spinning gradient photo ring */}
            {profile?.photo_url && (
              <motion.div
                className="relative inline-block mb-8"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto">
                  <motion.div
                    className="absolute inset-[-3px] rounded-full"
                    style={{ background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-[2px] rounded-full bg-black" />
                  <img
                    src={profile.photo_url}
                    alt={profile.full_name}
                    className="absolute inset-[4px] rounded-full object-cover"
                    style={{ width: 'calc(100% - 8px)', height: 'calc(100% - 8px)' }}
                    onError={(e) => { e.currentTarget.parentElement!.parentElement!.style.display = 'none'; }}
                  />
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 40px rgba(59,130,246,0.25)' }} />
                </div>
              </motion.div>
            )}

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono tracking-widest uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Disponible pour un stage
            </motion.div>

            {/* Name - word by word */}
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
            >
              {words.map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden mr-3 md:mr-4">
                  <motion.span
                    variants={{
                      hidden: { y: 80, opacity: 0, filter: 'blur(8px)' },
                      show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
                    }}
                    className={wi === words.length - 1 ? 'text-blue-500 inline-block' : 'inline-block'}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Typewriter title */}
            <motion.p
              className="text-xl md:text-2xl text-gray-400 font-light mb-6 min-h-[2rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {titleTyped}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-blue-400 ml-0.5"
              >|</motion.span>
            </motion.p>

            {/* Bio */}
            <motion.p
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              {profile?.profile_text}
            </motion.p>

            {/* Social links */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center mb-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } } }}
            >
              {[
                profile?.github_url && { href: profile.github_url, icon: <GithubIcon />, label: 'GitHub' },
                profile?.linkedin_url && { href: profile.linkedin_url, icon: <LinkedinIcon />, label: 'LinkedIn' },
                profile?.email && {
                  href: `mailto:${profile.email}`,
                  icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  label: 'Email'
                },
              ].filter(Boolean).map((link: any) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(59,130,246,0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition text-sm"
                >
                  {link.icon} {link.label}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.3 } } }}
            >
              {profile?.cv_url && (
                <motion.a
                  href={profile.cv_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(59,130,246,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger CV
                </motion.a>
              )}
              <motion.a
                href="#contact"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Me contacter
              </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-16 flex flex-col items-center gap-2 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            ABOUT
        ════════════════════════════════════════════════════ */}
        <section id="about" className="py-24 bg-gray-950">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeading title="Profil" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <FadeIn delay={0.1} direction="left">
                <p className="text-gray-300 text-lg leading-relaxed">{profile?.profile_text}</p>
              </FadeIn>
              <FadeIn delay={0.25} direction="right">
                <div className="space-y-3">
                  {[
                    { emoji: '📧', label: 'Email', value: profile?.email, href: `mailto:${profile?.email}` },
                    { emoji: '📱', label: 'Téléphone', value: profile?.phone },
                    { emoji: '📍', label: 'Localisation', value: profile?.location },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/40 transition-all duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-xl w-8 text-center">{item.emoji}</span>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-0.5">{item.label}</p>
                        {item.href
                          ? <a href={item.href} className="text-white hover:text-blue-400 transition text-sm">{item.value}</a>
                          : <p className="text-white text-sm">{item.value}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SKILLS
        ════════════════════════════════════════════════════ */}
        <section id="skills" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeading title="Compétences" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skillGroups).map(([key, { label, items }], i) =>
                items.length > 0 && (
                  <FadeIn key={key} delay={i * 0.1}>
                    <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                      <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <motion.span
                          className="w-4 h-px bg-blue-500 inline-block"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                          style={{ originX: 0 }}
                        />
                        {label}
                      </h3>
                      <div className="space-y-4">
                        {items.map((skill, si) => <SkillBar key={skill.id} skill={skill} delay={si * 0.07} />)}
                      </div>
                    </div>
                  </FadeIn>
                )
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            PROJECTS
        ════════════════════════════════════════════════════ */}
        <section id="projects" className="py-24 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading title="Projets" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.1}>
                  <TiltCard className="h-full">
                    <div className="group flex flex-col h-full bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]">
                      {project.featured && (
                        <span className="inline-block text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full mb-3 w-fit tracking-widest uppercase">
                          ⭐ Featured
                        </span>
                      )}
                      <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                      <p className="text-blue-400 text-sm mb-3 font-medium">{project.subtitle}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies?.split(',').map((tech: string, ti: number) => (
                          <span key={ti} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-md text-xs font-mono border border-gray-700 hover:border-blue-500/40 transition">
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
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            EDUCATION — animated timeline
        ════════════════════════════════════════════════════ */}
        <section id="education" className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <SectionHeading title="Formation" />
            <div className="relative">
              {/* Animated timeline line */}
              <motion.div
                className="absolute left-4 top-0 w-px bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <FadeIn key={edu.id} delay={i * 0.15} direction={i % 2 === 0 ? 'right' : 'right'}>
                    <div className="relative pl-12">
                      {/* Pulsing dot */}
                      <motion.div
                        className="absolute left-[11px] top-6 w-4 h-4 rounded-full bg-blue-500 border-2 border-black"
                        style={{ boxShadow: '0 0 12px rgba(59,130,246,0.7)' }}
                        animate={{ boxShadow: ['0 0 8px rgba(59,130,246,0.5)', '0 0 20px rgba(59,130,246,0.9)', '0 0 8px rgba(59,130,246,0.5)'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      />
                      <motion.div
                        className="bg-gray-950 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <h3 className="text-lg font-bold">{edu.degree}</h3>
                          <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded-lg shrink-0">
                            {edu.start_date?.slice(0, 4)} — {edu.current ? 'Présent' : edu.end_date?.slice(0, 4)}
                          </span>
                        </div>
                        <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
                        <p className="text-gray-500 text-sm mb-3">📍 {edu.location}</p>
                        {edu.description && <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>}
                      </motion.div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            STRENGTHS
        ════════════════════════════════════════════════════ */}
        <section id="strengths" className="py-24 bg-gray-950">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeading title="Atouts Clés" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {strengths.map((s, i) => (
                <FadeIn key={s.id} delay={i * 0.1}>
                  <motion.div
                    className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 h-full"
                    whileHover={{ scale: 1.03, borderColor: 'rgba(59,130,246,0.4)', boxShadow: '0 8px 30px rgba(59,130,246,0.08)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="text-blue-400 text-base font-mono">✦</span>
                    </motion.div>
                    <h3 className="text-base font-bold mb-2">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════════════════ */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[100px] opacity-10"
              style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
          </div>
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <SectionHeading
              title="Contact"
              subtitle="Disponible pour un stage ou une collaboration — n'hésitez pas !"
            />
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-10 bg-black border-t border-gray-800/60">
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
              <a href={`mailto:${profile.email}`} className="text-gray-500 hover:text-white transition text-sm">Email</a>
            )}
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        aria-label="Retour en haut"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

// ── Contact form ───────────────────────────────────────────────────────────
const ContactForm: React.FC = () => {
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
      if (res.ok) { setStatus('success'); (e.target as HTMLFormElement).reset(); setTimeout(() => setStatus('idle'), 4000); }
      else throw new Error();
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)] transition-all text-sm";

  const fields = [
    { type: 'text', name: 'name', placeholder: 'Votre nom' },
    { type: 'email', name: 'email', placeholder: 'Votre email' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {fields.map(f => (
          <motion.div
            key={f.name}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            <input type={f.type} name={f.name} placeholder={f.placeholder} required className={inputClass} />
          </motion.div>
        ))}
      </motion.div>
      {[
        { type: 'text', name: 'subject', placeholder: 'Sujet', delay: 0.15 },
      ].map(f => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: f.delay, duration: 0.5 }}
        >
          <input type={f.type} name={f.name} placeholder={f.placeholder} required className={inputClass} />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <textarea name="message" placeholder="Votre message" rows={6} required className={`${inputClass} resize-none`} />
      </motion.div>
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full px-8 py-3.5 rounded-xl font-semibold transition-all text-white ${
          status === 'success' ? 'bg-green-600 shadow-lg shadow-green-500/20'
          : status === 'error' ? 'bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25'
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            Envoi en cours…
          </span>
        ) : status === 'success' ? '✓ Message envoyé !'
          : status === 'error' ? '✗ Erreur — réessayer'
          : 'Envoyer le message'}
      </motion.button>
    </form>
  );
};

export default DynamicApp;
