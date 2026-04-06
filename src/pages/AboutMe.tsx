import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import PlanetAnimation from '../components/PlanetAnimation';
import { 
  User, 
  Heart, 
  Target, 
  Lightbulb,
  Star,
  Trophy,
  BookOpen,
  Coffee
} from 'phosphor-react';
import { cvLinks } from '../data/cv';
import CVPreview from '../components/CVPreview';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Typing animation states
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [displayedText3, setDisplayedText3] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const fullText1 = "Hi, I'm";
  const fullText2 = "Rokibul Islam Robi";
  const fullText3 = "A passionate software engineer with a love for creating innovative solutions and pushing the boundaries of technology.";

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image', 
        { opacity: 0, x: -60, filter: 'blur(5px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.8 }
      );

      // Stats animations
      ScrollTrigger.create({
        trigger: '.stats-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.stat-item', 
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 }
          );
        }
      });

      // Skills animations
      ScrollTrigger.create({
        trigger: '.skills-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.skill-card', 
            { opacity: 0, y: 40, filter: 'blur(3px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.15 }
          );
        }
      });

      // Experience animations
      ScrollTrigger.create({
        trigger: '.experience-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.experience-item', 
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Trophy, label: 'Years Experience', value: '3+' },
    { icon: Star, label: 'Projects Completed', value: '20+' },
    { icon: Target, label: 'Happy Clients', value: '25+' },
    { icon: Trophy, label: 'Certificates', value: '15+' }
  ];

  const skills = [
    { name: 'React.js', level: 90, color: 'from-neon-blue to-neon-cyan' },
    { name: 'Django', level: 85, color: 'from-neon-purple to-neon-pink' },
    { name: 'Python', level: 88, color: 'from-neon-cyan to-neon-blue' },
    { name: 'REST Framework', level: 82, color: 'from-neon-pink to-neon-purple' },
    { name: 'Problem Solving', level: 95, color: 'from-neon-blue to-neon-purple' },
    { name: 'Critical Thinking', level: 90, color: 'from-neon-cyan to-neon-pink' }
  ];

  const experiences = [
    {
      year: '2023 - Present',
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      description: 'Leading development teams and architecting scalable solutions for enterprise clients.'
    },
    {
      year: '2021 - 2023',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      description: 'Developed and maintained web applications using modern technologies and best practices.'
    },
    {
      year: '2020 - 2021',
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      description: 'Collaborated with cross-functional teams to deliver high-quality software products.'
    }
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
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="text-center lg:text-left lg:pr-8">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-medium mb-6">
                  About Me
                </span>
              </div>
              
              <div className="hero-typing-wrapper mb-6">
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
              
              <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
                I believe in writing clean, efficient code and building products that make a difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <CVPreview type="resume">
                  <a 
                    href={cvLinks.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-button group"
                  >
                    Download Resume
                    <BookOpen size={20} className="ml-2 inline transition-transform group-hover:translate-x-1" />
                  </a>
                </CVPreview>
                <button className="glass-card px-8 py-3 border border-glass-border/30 text-text-primary hover:border-neon-blue/50 transition-all duration-300 flex items-center justify-center">
                  <Coffee size={20} className="mr-2" />
                  Let's Chat
                </button>
              </div>
            </div>
            
            <div className="about-image lg:pl-8">
              <div className="relative w-80 h-80 mx-auto lg:mx-0">
                <div className="glass-card p-8 rounded-full">
                  <img 
                    src="/lovable-uploads/967a4f32-a2c4-4362-a825-f837f03c0db1.png" 
                    alt="TASNIA" 
                    className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full blur-xl opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              About Me
            </h2>
          </div>
          
          <div className="glass-card p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">Who I Am</h3>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  A passionate software engineer with expertise in modern web technologies. 
                  I specialize in building scalable applications and sharing knowledge through comprehensive courses.
                </p>
                
                <div className="space-y-6">
                  {skills.slice(0, 4).map((skill, index) => (
                    <div key={skill.name} className="skill-item">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-text-primary">{skill.name}</h4>
                        <span className="text-neon-blue font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-glass-border/20 rounded-full h-3">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Experience</h3>
                  <p className="text-text-secondary">3+ years of professional development</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Projects</h3>
                  <p className="text-text-secondary">20+ completed projects</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Certificates</h3>
                  <p className="text-text-secondary">15+ professional certificates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item text-center">
                <div className="glass-card p-6 rounded-xl hover:shadow-glow-blue transition-all duration-300">
                  <stat.icon size={48} className="text-neon-blue mx-auto mb-4" />
                  <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              My Skills
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              A combination of technical expertise and soft skills that drive success in every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-card glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-text-primary">{skill.name}</h3>
                  <span className="text-neon-blue font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-glass-border/20 rounded-full h-3">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Work Experience
            </h2>
            <p className="text-white text-lg">
              My professional journey in software development and technology.
            </p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={index} className="experience-item glass-card p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{experience.title}</h3>
                    <p className="text-neon-blue font-medium">{experience.company}</p>
                  </div>
                  <span className="text-text-secondary text-sm lg:text-right mt-2 lg:mt-0">{experience.year}</span>
                </div>
                <p className="text-text-secondary leading-relaxed">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-glass-border/20">
        <div className="container mx-auto text-center">
          <p className="text-text-muted mb-4">
            © Rokibul Islam Robi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutMe; 