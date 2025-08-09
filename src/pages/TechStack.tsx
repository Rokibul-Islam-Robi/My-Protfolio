import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import PlanetAnimation from '../components/PlanetAnimation';
import { 
  Code, 
  Palette, 
  Rocket, 
  Monitor, 
  Globe, 
  Database,
  Cloud,
  Shield,
  Lightning,
  Cpu,
  DeviceMobile,
  HardDrives,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.tech-hero-title', 
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo('.tech-hero-subtitle', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Category animations
      ScrollTrigger.create({
        trigger: '.frontend-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.tech-card', 
            { opacity: 0, y: 40, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 }
          );
        }
      });

      ScrollTrigger.create({
        trigger: '.backend-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.backend-card', 
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 }
          );
        }
      });

      ScrollTrigger.create({
        trigger: '.tools-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.tool-card', 
            { opacity: 0, y: 40, filter: 'blur(3px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.1 }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const frontendTech = [
    { name: 'React', icon: Monitor, level: 95, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-600/20' },
    { name: 'TypeScript', icon: Code, level: 90, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/20' },
    { name: 'JavaScript', icon: Lightning, level: 92, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-600/20' },
    { name: 'HTML/CSS', icon: Palette, level: 88, color: 'text-orange-400', bg: 'from-orange-500/20 to-orange-600/20' },
    { name: 'Tailwind CSS', icon: Globe, level: 85, color: 'text-teal-400', bg: 'from-teal-500/20 to-teal-600/20' },
    { name: 'Next.js', icon: Rocket, level: 80, color: 'text-gray-400', bg: 'from-gray-500/20 to-gray-600/20' }
  ];

  const backendTech = [
    { name: 'Node.js', icon: HardDrives, level: 88, color: 'text-green-400', bg: 'from-green-500/20 to-green-600/20' },
    { name: 'Python', icon: Cpu, level: 85, color: 'text-blue-500', bg: 'from-blue-500/20 to-blue-600/20' },
    { name: 'PostgreSQL', icon: Database, level: 82, color: 'text-blue-600', bg: 'from-blue-600/20 to-blue-700/20' },
    { name: 'MongoDB', icon: Database, level: 80, color: 'text-green-500', bg: 'from-green-500/20 to-green-600/20' },
    { name: 'Express.js', icon: HardDrives, level: 85, color: 'text-gray-400', bg: 'from-gray-500/20 to-gray-600/20' },
    { name: 'GraphQL', icon: Globe, level: 78, color: 'text-pink-400', bg: 'from-pink-500/20 to-pink-600/20' }
  ];

  const toolsTech = [
    { name: 'Git', icon: Code, level: 90, color: 'text-orange-500', bg: 'from-orange-500/20 to-orange-600/20' },
    { name: 'Docker', icon: Cloud, level: 75, color: 'text-blue-500', bg: 'from-blue-500/20 to-blue-600/20' },
    { name: 'AWS', icon: Cloud, level: 70, color: 'text-yellow-500', bg: 'from-yellow-500/20 to-yellow-600/20' },
    { name: 'Figma', icon: Palette, level: 85, color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-600/20' },
    { name: 'VS Code', icon: Monitor, level: 95, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/20' },
    { name: 'Postman', icon: Shield, level: 80, color: 'text-orange-400', bg: 'from-orange-500/20 to-orange-600/20' }
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
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-medium mb-6">
              Tech Stack
            </span>
          </div>
          
          <h1 className="tech-hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            My Technology Stack
          </h1>
          
          <p className="tech-hero-subtitle text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            A comprehensive collection of modern technologies and tools I use to build innovative solutions. 
            From frontend frameworks to backend services, I stay current with the latest industry standards.
          </p>
        </div>
      </section>

      {/* Frontend Technologies */}
      <section className="frontend-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Frontend Technologies
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Modern frameworks and libraries for creating responsive and interactive user interfaces.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frontendTech.map((tech, index) => (
              <div key={tech.name} className="tech-card glass-card p-6 hover:shadow-glow-blue transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tech.bg} mr-4`}>
                    <tech.icon size={32} className={tech.color} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">{tech.name}</h3>
                    <span className="text-neon-blue font-bold">{tech.level}%</span>
                  </div>
                </div>
                <div className="w-full bg-glass-border/20 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backend Technologies */}
      <section className="backend-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Backend Technologies
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Server-side technologies and databases for building robust and scalable applications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendTech.map((tech, index) => (
              <div key={tech.name} className="backend-card glass-card p-6 hover:shadow-glow-purple transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tech.bg} mr-4`}>
                    <tech.icon size={32} className={tech.color} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">{tech.name}</h3>
                    <span className="text-neon-purple font-bold">{tech.level}%</span>
                  </div>
                </div>
                <div className="w-full bg-glass-border/20 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section className="tools-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Tools & Platforms
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Essential tools and platforms that streamline my development workflow and enhance productivity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolsTech.map((tech, index) => (
              <div key={tech.name} className="tool-card glass-card p-6 hover:shadow-glow-cyan transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tech.bg} mr-4`}>
                    <tech.icon size={32} className={tech.color} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">{tech.name}</h3>
                    <span className="text-neon-cyan font-bold">{tech.level}%</span>
                  </div>
                </div>
                <div className="w-full bg-glass-border/20 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 text-center">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-text-secondary text-lg mb-8">
              Let's collaborate on your next project using these cutting-edge technologies. 
              I'm always excited to work with new tools and frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="neon-button group">
                Start a Project
                <Rocket size={20} className="ml-2 inline transition-transform group-hover:translate-x-1" />
              </button>
              <button className="glass-card px-8 py-3 border border-glass-border/30 text-text-primary hover:border-neon-blue/50 transition-all duration-300 flex items-center justify-center">
                <Code size={20} className="mr-2" />
                View Projects
              </button>
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
                <a href="/" className="block text-neon-purple hover:text-neon-blue transition-colors">Home</a>
                <a href="/projects" className="block text-neon-purple hover:text-neon-blue transition-colors">Projects</a>
                <a href="/education" className="block text-neon-purple hover:text-neon-blue transition-colors">Education</a>
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
    </div>
  );
};

export default TechStack;