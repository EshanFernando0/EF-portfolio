import React, { useState, useEffect } from 'react';
import { Moon, Sun, Github, Linkedin, Instagram, Mail, Download, ExternalLink, Menu, X } from 'lucide-react';
import { personalInfo, techStack, projects, education, softSkills } from './portfolioData';
import TechGlobe from './TechGlobe';
import Slideshow from './components/Slideshow';
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const roles = ["DevOps", "Backend", "Mobile"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Toggle theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Track mouse position for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);
  
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio inquiry from ${contactForm.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${contactForm.name || 'Not provided'}\n` +
      `Email: ${contactForm.email || 'Not provided'}\n\n` +
      `${contactForm.message || ''}`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#0ea5e9] selection:text-white bg-[#0a0a0a] text-white">
      
      {/* Custom Cursor */}
      <div 
        className="hidden lg:flex fixed pointer-events-none z-[100] w-4 h-4 rounded-full bg-[#0ea5e9] shadow-[0_0_15px_#0ea5e9] items-center justify-center transition-transform duration-75 ease-out"
        style={{ left: 0, top: 0, transform: `translate(${mousePos.x - 8}px, ${mousePos.y - 8}px)` }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        <div className="absolute inset-0 rounded-full border border-[#0ea5e9] scale-[2.5] opacity-50"></div>
      </div>

      {/* Navbar Component */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 font-bold text-3xl tracking-tighter cursor-pointer text-white flex items-center" onClick={() => window.scrollTo(0, 0)}>
              EF<span className="text-[#0ea5e9]">.</span>dev
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Contact</button>
            </div>

            {/* Resume Button */}
            <div className="hidden md:flex">
              <a href={personalInfo.cvUrl} download="Eshan_Fernando_CV.pdf" className="bg-white hover:bg-gray-200 text-black px-5 py-2 rounded-full text-sm font-bold transition-all">
                Download CV
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-800 transition-colors">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900">About</button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900">Contact</button>
              <a href={personalInfo.cvUrl} download="Eshan_Fernando_CV.pdf" className="inline-block mt-4 bg-white hover:bg-gray-200 text-black px-5 py-2 rounded-full text-sm font-bold transition-all mx-3">
                Download CV
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Social Links Bottom Right */}
      <div className="hidden lg:flex fixed right-8 bottom-8 flex-col gap-5 z-40">
        <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all hover:scale-110">
          <Github size={22} />
        </a>
        <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all hover:scale-110">
          <Linkedin size={22} />
        </a>
        <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all hover:scale-110">
          <Instagram size={22} />
        </a>
      </div>

      {/* Main Content */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center relative overflow-hidden px-4">

          <div className="text-center z-10 mt-12">
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-gray-200 mb-2">
              Hello, I'm {personalInfo.name.split(' ')[0]}
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-4">
              <span key={roleIndex} className="text-[#0ea5e9] animate-fade-in-up inline-block">
                {roles[roleIndex]}
              </span> <span className="text-gray-300">Developer</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto italic">
              *{personalInfo.tagline}*
            </p>
          </div>
          
          {/* Central Image with White Outline effect & Floating Icons */}
          <div className="relative mt-16 w-full max-w-xl mx-auto aspect-square flex justify-center items-center">
            <div className="relative z-10 w-72 h-72 md:w-[26rem] md:h-[26rem] flex items-center justify-center">
               <img 
                 src="profile.png" 
                 alt="Profile" 
                 className="object-contain w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)] transition-all duration-500" 
                 style={{ 
                   WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', 
                   maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' 
                 }}
               />
               {/* Fading bottom gradient overlay to blend with background */}
               <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none"></div>
            </div>

            {/* Floating Tech Icons around image */}
            <div className="absolute top-[10%] left-[20%] animate-float"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-10 h-10 md:w-14 md:h-14 opacity-90 drop-shadow-lg" /></div>
            <div className="absolute top-[20%] right-[15%] animate-float-delayed"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" alt="Flutter" className="w-10 h-10 md:w-14 md:h-14 opacity-90 drop-shadow-lg" /></div>
            <div className="absolute top-[45%] left-[5%] animate-float-slow"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-10 h-10 md:w-14 md:h-14 opacity-90 drop-shadow-lg" /></div>
            <div className="absolute top-[45%] right-[5%] animate-float"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-10 h-10 md:w-14 md:h-14 opacity-90 drop-shadow-lg" /></div>
            <div className="absolute bottom-[20%] left-[10%] animate-float-delayed"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" alt="Firebase" className="w-10 h-10 md:w-14 md:h-14 opacity-90 drop-shadow-lg" /></div>
            <div className="absolute bottom-[25%] right-[10%] animate-float-slow"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-10 h-10 md:w-14 md:h-14 opacity-90 drop-shadow-lg" /></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-[#0ea5e9]">Me</span></h2>
              <div className="w-20 h-1 bg-[#0ea5e9] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Profile Card */}
              <div className="bg-[#0f0f11] p-8 rounded-3xl border border-gray-800/60 hover:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-white">Who I Am</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {personalInfo.bio}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-[#0ea5e9]">📍</span> {personalInfo.location}
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-[#0ea5e9]">📞</span> 
                    <a 
                      href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-[#0ea5e9] transition-colors"
                      title="Chat on WhatsApp"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-[#0ea5e9]">✉️</span> 
                    <a 
                      href={`mailto:${personalInfo.email}`} 
                      className="hover:text-[#0ea5e9] transition-colors"
                      title="Send an Email"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Education Card */}
              <div className="bg-[#0f0f11] p-8 rounded-3xl border border-gray-800/60 hover:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-6 text-white">Education</h3>
                <div className="border-l-2 border-[#0ea5e9] pl-6 py-1">
                  <h4 className="text-xl font-bold text-white mb-1">{education.degree}</h4>
                  <p className="text-[#0ea5e9] font-medium text-sm mb-4">{education.institution} • {education.timeline}</p>
                  <div className="flex flex-wrap gap-2">
                    {education.coursework.map((course, i) => (
                      <span key={i} className="text-xs font-medium bg-[#1a1a1c] text-gray-300 px-3 py-1.5 rounded-full border border-gray-800">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Technical Focus */}
              <div className="bg-[#0f0f11] p-8 rounded-3xl border border-gray-800/60 hover:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-6 text-white">Technical Focus</h3>
                <div className="grid grid-cols-2 gap-4">
                  {techStack.map((tech, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-4 bg-[#1a1a1c] rounded-2xl border border-gray-800 hover:border-[#0ea5e9]/50 transition-all group">
                      <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-[#0f0f11] p-8 rounded-3xl border border-gray-800/60 hover:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-6 text-white">Soft Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {softSkills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-[#1a1a1c] text-gray-300 rounded-xl text-sm font-medium border border-gray-800 flex-grow text-center hover:border-[#0ea5e9]/50 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <TechGlobe />

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-blue-500">Projects</span></h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Some of my recent work</p>
            </div>
            
            <div className="space-y-32">
              {projects.map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={project.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                    
                    {/* Project Image */}
                    <div className="w-full md:w-1/2 group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                      {project.images && project.images.length > 0 ? (
                        <div className="relative">
                          <Slideshow images={project.images} />
                        </div>
                      ) : (
                        <div className="relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-video shadow-2xl">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Project Details */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <div className="text-blue-500 font-mono text-sm mb-2">0{project.id}.</div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/80 p-6 rounded-2xl mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800/50">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 mt-2 px-5 py-3 rounded-full bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors w-fit"
                        >
                          Visit <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0f0f11]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="text-blue-500">Touch</span></h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required
                    value={contactForm.message}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Mail size={20} /> Send Message
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  This opens your email app with the message prefilled and sends it directly to {personalInfo.email}.
                </p>
              </form>
            </div>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Eshan Fernando. Designed & Built with ❤️.
        </p>
      </footer>
    </div>
  );
}

export default App;
