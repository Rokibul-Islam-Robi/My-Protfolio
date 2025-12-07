import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import PlanetAnimation from '../components/PlanetAnimation';
import { 
  GithubLogo, 
  LinkedinLogo, 
  EnvelopeSimple, 
  ArrowRight,
  Code,
  Palette,
  Rocket,
  Monitor,
  Globe,
  Database,
  Medal,
  Plus
} from 'phosphor-react';
import CertificateCard from '../components/CertificateCard';
import { certificates as initialCertificates, Certificate } from '../data/certificates';
import { projects as initialProjects, Project } from '../data/projects';
import ProjectManager from '../components/ProjectManager';
import ProjectCard from '../components/ProjectCard';


gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  // CRITICAL: Always initialize with initialProjects - this ensures projects show immediately
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Typing animation states
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [displayedText3, setDisplayedText3] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const fullText1 = "Hi, I'm";
  const fullText2 = "Rokibul Islam Robi";
  const fullText3 = "A Passionate Software Engineer";

  useEffect(() => {
    // Load certificates
    const storedCertificates = localStorage.getItem('certificates');
    if (storedCertificates) {
      try {
        const parsed = JSON.parse(storedCertificates);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCertificates(parsed);
        } else {
          setCertificates(initialCertificates);
          localStorage.setItem('certificates', JSON.stringify(initialCertificates));
        }
      } catch {
        setCertificates(initialCertificates);
        localStorage.setItem('certificates', JSON.stringify(initialCertificates));
      }
    } else {
      setCertificates(initialCertificates);
      localStorage.setItem('certificates', JSON.stringify(initialCertificates));
    }

    // CRITICAL: Always ensure projects are set to initialProjects
    // Force set projects to ensure they're always there
    console.log('useEffect: Setting projects. initialProjects length:', initialProjects.length);
    console.log('useEffect: initialProjects:', initialProjects);
    setProjects(initialProjects);
    
    // Update localStorage to match
    localStorage.setItem('projects', JSON.stringify(initialProjects));
    localStorage.setItem('projects_version', '2.3');
  }, []);

  const handleDeleteCertificate = (certificateId: string) => {
    const updatedCertificates = certificates.filter(cert => cert.id !== certificateId);
    setCertificates(updatedCertificates);
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
  };

  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const projectWithId = { ...newProject, id: newId };
    const updatedProjects = [...projects, projectWithId];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleDeleteProject = (projectId: number) => {
    const updatedProjects = projects.filter(proj => proj.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsProjectManagerOpen(true);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    const updatedProjects = projects.map(proj => 
      proj.id === updatedProject.id ? updatedProject : proj
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setEditingProject(null);
    setIsProjectManagerOpen(false);
  };

  const getCertificates = () => certificates.filter(item => item.category === 'certificate');
  const getWorkshops = () => certificates.filter(item => item.category === 'workshop');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations can be re-enabled here if desired
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Typing animation effect
  useEffect(() => {
    let currentIndex1 = 0;
    let currentIndex2 = 0;
    let currentIndex3 = 0;
    let timeoutId: NodeJS.Timeout;
    let pauseTimeoutId1: NodeJS.Timeout;
    let pauseTimeoutId2: NodeJS.Timeout;

    const typeText1 = () => {
      if (currentIndex1 < fullText1.length) {
        setDisplayedText1(fullText1.slice(0, currentIndex1 + 1));
        currentIndex1++;
        timeoutId = setTimeout(typeText1, 50); // Typing speed
      } else {
        // Pause for 1000ms after first text
        pauseTimeoutId1 = setTimeout(() => {
          typeText2();
        }, 1000);
      }
    };

    const typeText2 = () => {
      if (currentIndex2 < fullText2.length) {
        setDisplayedText2(fullText2.slice(0, currentIndex2 + 1));
        currentIndex2++;
        timeoutId = setTimeout(typeText2, 50); // Typing speed
      } else {
        // Pause for 1000ms after second text
        pauseTimeoutId2 = setTimeout(() => {
          typeText3();
        }, 1000);
      }
    };

    const typeText3 = () => {
      if (currentIndex3 < fullText3.length) {
        setDisplayedText3(fullText3.slice(0, currentIndex3 + 1));
        currentIndex3++;
        timeoutId = setTimeout(typeText3, 50); // Typing speed
      } else {
        setIsTyping(false);
      }
    };

    // Start typing after a short delay
    const startDelay = setTimeout(() => {
      typeText1();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(pauseTimeoutId1);
      clearTimeout(pauseTimeoutId2);
      clearTimeout(startDelay);
    };
  }, []);

  const skills = [
    { icon: Code, name: 'HTML', color: 'text-orange-400' },
    { icon: Palette, name: 'CSS', color: 'text-blue-400' },
    { icon: Rocket, name: 'JavaScript', color: 'text-yellow-400' },
    { icon: Monitor, name: 'React', color: 'text-cyan-400' },
    { icon: Globe, name: 'GSAP', color: 'text-green-400' },
    { icon: Database, name: 'Node.js', color: 'text-green-500' },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Planet Animation Background */}
      <PlanetAnimation />
      
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb glow-orb-1 w-64 h-64 bg-neon-blue/20 top-20 left-10"></div>
        <div className="glow-orb glow-orb-2 w-48 h-48 bg-neon-purple/30 top-1/3 right-20"></div>
        <div className="glow-orb glow-orb-3 w-32 h-32 bg-neon-cyan/25 bottom-1/4 left-1/3"></div>
      </div>
      
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left relative overflow-hidden rounded-xl">
            {/* Video Background for Intro Text Section */}
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-30"
                style={{ filter: 'blur(1px)' }}
              >
                <source src="/videos/particle-planet.mp4" type="video/mp4" />
                <source src="/videos/particle-planet.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/40"></div>
            </div>
            
            {/* Content with higher z-index */}
            <div className="relative z-10">
            <div className="hero-typing-wrapper">
              {/* Section 1: Hi, I'm */}
              <div className="hero-section-top">
                <span className="typing-text typing-section-1">
                  {displayedText1}
                </span>
              </div>
              
              {/* Section 2: Rokibul Islam Robi (White/Glass) */}
              {displayedText1.length === fullText1.length && (
                <div className="hero-section-middle">
                  <span className="typing-text typing-section-2">
                    {displayedText2}
                  </span>
                </div>
              )}
              
              {/* Section 3: A Passionate Software Engineer */}
              {displayedText2.length === fullText2.length && (
                <div className="hero-section-bottom">
                  <span className="typing-text typing-section-3">
                    {displayedText3}
                  </span>
                </div>
              )}
            </div>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-12">
              <button className="neon-button group">
                Hire Me
                <ArrowRight size={20} className="ml-2 inline transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            </div>
          </div>
          
          <div className="spline-container lg:h-screen flex items-center justify-center">
            <div className="w-full h-96 lg:h-full rounded-xl overflow-hidden">
              <iframe 
                src='https://my.spline.design/particleplanet-5e0fIrNj2I6HQxOgBFekzc02/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="pointer-events-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="about-image">
              <div className="relative w-80 h-80 mx-auto lg:mx-0">
                <div className="glass-card p-8 rounded-full">
                  <img 
                    src="/lovable-uploads/967a4f32-a2c4-4362-a825-f837f03c0db1.png" 
                    alt="Rokibul Islam Robi" 
                    className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full blur-xl opacity-50"></div>
              </div>
            </div>
            
            <div className="about-content">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                About Me
              </h2>
              
              <p className="text-white text-lg mb-8 leading-relaxed">
                I'm a passionate software engineer with expertise in modern web technologies. 
                I specialize in building scalable applications and creating immersive user experiences 
                through innovative design and cutting-edge technology.
              </p>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="skill-icon text-center group">
                    <div className="glass-card p-4 rounded-lg hover:shadow-glow-blue transition-all duration-300">
                      <skill.icon size={32} className={`${skill.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                      <span className="text-xs text-text-muted">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button className="neon-button">
                  Get In Touch
                </button>
                <button className="glass-card px-6 py-3 border border-glass-border/30 text-text-primary hover:border-neon-purple/50 transition-all duration-300">
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Contact Information
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Get in touch with me for collaborations, opportunities, or just to say hello.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 lg:p-12 border border-glass-border/30 backdrop-blur-xl bg-background/40">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-glass-border/20">
                    <div className="glass-card p-3 rounded-lg border border-glass-border/20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-neon-blue">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">Rokibul Islam Robi</h3>
                      <p className="text-text-secondary">Software Engineering Student</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 py-3">
                      <div className="glass-card p-2 rounded-lg border border-glass-border/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Contact Number</p>
                        <p className="text-text-primary font-medium">01531150655</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 py-3">
                      <div className="glass-card p-2 rounded-lg border border-glass-border/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Primary Email</p>
                        <p className="text-text-primary font-medium">rokebul.islam088@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 py-3">
                      <div className="glass-card p-2 rounded-lg border border-glass-border/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Academic Email</p>
                        <p className="text-text-primary font-medium">islam222053411672diu.edu.bd</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 py-3">
                      <div className="glass-card p-2 rounded-lg border border-glass-border/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Occupation</p>
                        <p className="text-text-primary font-medium">Student</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 py-3">
                      <div className="glass-card p-2 rounded-lg border border-glass-border/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Nationality</p>
                        <p className="text-text-primary font-medium">Bangladeshi</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 py-3">
                      <div className="glass-card p-2 rounded-lg border border-glass-border/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Blood Group</p>
                        <p className="text-text-primary font-medium">B+</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4 pb-4 border-b border-glass-border/20">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full glass-card p-4 text-left border border-glass-border/20 rounded-lg hover:border-glass-border/40 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg border border-glass-border/20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                          </div>
                          <span className="text-text-primary font-medium">Send Email</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 19l8-8-8-8z"/>
                        </svg>
                      </div>
                    </button>
                    
                    <button className="w-full glass-card p-4 text-left border border-glass-border/20 rounded-lg hover:border-glass-border/40 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg border border-glass-border/20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <span className="text-text-primary font-medium">Schedule Call</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 19l8-8-8-8z"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Featured Projects
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              A showcase of my latest work in web development, 3D experiences, and innovative digital solutions.
            </p>
            <button
              onClick={() => {
                setEditingProject(null);
                setIsProjectManagerOpen(true);
              }}
              className="neon-button group mt-8"
            >
              <Plus size={20} className="mr-2" />
              Add New Project
            </button>
          </div>
          
          {/* Force render projects - use initialProjects directly to ensure they show */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialProjects.map((project) => {
              // Validate project before rendering
              if (!project || !project.id || !project.title) {
                console.error('Invalid project data:', project);
                return null;
              }
              
              return (
                <ProjectCard 
                  key={`project-${project.id}`}
                  project={project} 
                  onDelete={handleDeleteProject}
                  onEdit={handleEditProject}
                />
              );
            })}
          </div>
          
          {/* Fallback message if no projects */}
          {initialProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">
                No projects available. Please check the projects data file.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Certificates & Workshops
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Industry-recognized certifications and hands-on workshops that validate my expertise in various technologies.
            </p>
          </div>
          
          {/* Certificates */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="glass-card p-3 rounded-lg mr-4">
                <Medal size={32} className="text-neon-purple" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Professional Certifications</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getCertificates().slice(0, 3).map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} onDelete={handleDeleteCertificate} />
              ))}
            </div>
          </div>
          
          {/* Workshops */}
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="glass-card p-3 rounded-lg mr-4">
                <Code size={32} className="text-neon-cyan" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Workshops & Training</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getWorkshops().slice(0, 3).map((workshop) => (
                <CertificateCard key={workshop.id} certificate={workshop} onDelete={handleDeleteCertificate} />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/education" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg border-2 border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-300 shadow-lg hover:shadow-glow-blue"
            >
              View All Certificates
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Get In Touch
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="contact-info">
              <h3 className="text-3xl font-bold mb-8 text-text-primary">Let's Connect</h3>
              <p className="text-text-secondary mb-10 leading-relaxed text-lg">
                I'm always interested in hearing about new opportunities and creative projects. 
                Whether you have a question or just want to say hello, feel free to drop me a line.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 glass-card rounded-lg hover:shadow-glow-blue transition-all duration-300">
                  <div className="glass-card p-3 rounded-lg">
                    <EnvelopeSimple size={24} className="text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Email</p>
                    <p className="text-text-secondary">rokebul.islam088@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 glass-card rounded-lg hover:shadow-glow-purple transition-all duration-300">
                  <div className="glass-card p-3 rounded-lg">
                    <GithubLogo size={24} className="text-neon-purple" />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">GitHub</p>
                    <p className="text-text-secondary">github.com/Rokibul-Islam-Robi</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 glass-card rounded-lg hover:shadow-glow-cyan transition-all duration-300">
                  <div className="glass-card p-3 rounded-lg">
                    <LinkedinLogo size={24} className="text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">LinkedIn</p>
                    <p className="text-text-secondary">linkedin.com/in/rokibulislam088</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form glass-card p-10">
              <h3 className="text-2xl font-bold mb-8 text-text-primary text-center">Send Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-text-primary font-medium mb-3">Name</label>
                  <input 
                    type="text" 
                    className="input-glow w-full px-4 py-4 rounded-lg text-text-primary placeholder-text-muted"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-text-primary font-medium mb-3">Email</label>
                  <input 
                    type="email" 
                    className="input-glow w-full px-4 py-4 rounded-lg text-text-primary placeholder-text-muted"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-text-primary font-medium mb-3">Message</label>
                  <textarea 
                    rows={5}
                    className="input-glow w-full px-4 py-4 rounded-lg text-text-primary placeholder-text-muted resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button type="submit" className="neon-button w-full py-4 text-lg font-semibold">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-glass-border/20">
        <div className="container mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Get in Touch */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-text-primary mb-4">Get in Touch</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://github.com/Rokibul-Islam-Robi" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-blue transition-colors">
                  <GithubLogo size={24} />
                </a>
                <a href="https://www.linkedin.com/in/rokibulislam088?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-purple transition-colors">
                  <LinkedinLogo size={24} />
                </a>
                <a href="https://www.facebook.com/Its.Robbii?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-cyan transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary hover:text-neon-cyan transition-colors">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="mailto:hello@rokibulrobi.dev" className="text-text-secondary hover:text-neon-blue transition-colors">
                  <EnvelopeSimple size={24} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-text-primary mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-neon-purple hover:text-neon-blue transition-colors">About</a>
                <a href="#projects" className="block text-neon-purple hover:text-neon-blue transition-colors">Projects</a>
                <a href="/education" className="block text-neon-purple hover:text-neon-blue transition-colors">Courses</a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-text-primary mb-4">Newsletter</h3>
              <p className="text-text-secondary text-sm mb-4">
                Subscribe to get updates about new courses and projects.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium rounded-lg hover:shadow-glow-purple transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-glass-border/20 pt-8 text-center">
            <p className="text-text-muted">
              © 2024 Rokibul Islam Robi Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <ProjectManager
        isOpen={isProjectManagerOpen}
        onClose={() => {
          setIsProjectManagerOpen(false);
          setEditingProject(null);
        }}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        editingProject={editingProject}
      />
    </div>
  );
};

export default Portfolio;
