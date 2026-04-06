import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy,
  Star,
  Calendar,
  MapPin,
  Lightbulb,
  Rocket,
  Medal,
  Plus,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple
} from 'phosphor-react';
import CertificateCard from '../components/CertificateCard';
import CertificateManager from '../components/CertificateManager';
import { certificates as initialCertificates, Certificate } from '../data/certificates';
import { cvLinks } from '../data/cv';
import CVPreview from '../components/CVPreview';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCertificateManagerOpen, setIsCertificateManagerOpen] = useState(false);
  const [isWorkshopManagerOpen, setIsWorkshopManagerOpen] = useState(false);
  const [managerType, setManagerType] = useState<'certificate' | 'workshop'>('certificate');
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const storedCertificates = localStorage.getItem('certificates');
    if (storedCertificates) {
      setCertificates(JSON.parse(storedCertificates));
    } else {
      setCertificates(initialCertificates);
    }
  }, []);

  const handleAddCertificate = (newCertificate: Omit<Certificate, 'id'>) => {
    const newId = (certificates.length + 1).toString();
    const certificateWithId = { ...newCertificate, id: newId };
    const updatedCertificates = [...certificates, certificateWithId];
    setCertificates(updatedCertificates);
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
  };

  const handleDeleteCertificate = (certificateId: string) => {
    const updatedCertificates = certificates.filter(cert => cert.id !== certificateId);
    setCertificates(updatedCertificates);
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
  };

  const getCertificates = () => certificates.filter(item => item.category === 'certificate');
  const getWorkshops = () => certificates.filter(item => item.category === 'workshop');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations can be re-enabled here if desired
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const education = [
    {
      year: '2022 - Present',
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'Daffodil International University',
      location: 'Dhaka, Bangladesh',
      gpa: '3.76/4.00',
      description: 'Majoring in Data Science. Maintaining a CGPA of 3.76 out of 4.00.',
      achievements: ['Data Science Focus', 'High Academic Performance', 'Software Engineering Specialization']
    },
    {
      year: '2018 - 2020',
      degree: 'Higher Secondary School Certificate',
      institution: 'Chandpur Government College',
      location: 'Chandpur, Bangladesh',
      gpa: '5.00/5.00',
      description: 'Completed HSC with a focus on Science. Achieved GPA 5.00 out of 5.00.',
      achievements: ['Science Focus', 'Perfect GPA', 'Academic Excellence']
    },
    {
      year: '2016 - 2018',
      degree: 'Secondary School Certificate',
      institution: 'Al-Amin Academy School & College',
      location: 'Chandpur, Bangladesh',
      gpa: '5.00/5.00',
      description: 'Completed SSC with a focus on Science. Achieved GPA 5.00 out of 5.00.',
      achievements: ['Science Focus', 'Perfect GPA', 'Academic Excellence']
    }
  ];

  const skills = [
    { name: 'Programming Languages', level: 95, items: ['JavaScript', 'Python', 'Java', 'C++'] },
    { name: 'Web Technologies', level: 90, items: ['React', 'Node.js', 'HTML/CSS', 'TypeScript'] },
    { name: 'Database Management', level: 85, items: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'] },
    { name: 'Cloud Platforms', level: 80, items: ['AWS', 'Google Cloud', 'Azure', 'Docker'] },
    { name: 'DevOps & Tools', level: 75, items: ['Git', 'CI/CD', 'Kubernetes', 'Jenkins'] },
    { name: 'Soft Skills', level: 90, items: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'] }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />
      
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
              Education
            </span>
          </div>
          
          <h1 className="education-hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            My Educational Journey
          </h1>
          
          <p className="education-hero-subtitle text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            A comprehensive overview of my academic background, certifications, and continuous learning journey 
            in the field of computer science and software development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <Medal size={20} className="mr-2" />
              View Certificates
            </button>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="education-timeline py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Academic Background
            </h2>
            <p className="text-white text-lg">
              My formal education and academic achievements in computer science and technology.
            </p>
          </div>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="timeline-item glass-card p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div className="glass-card p-3 rounded-lg">
                      <GraduationCap size={32} className="text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2">{edu.degree}</h3>
                      <p className="text-neon-blue font-medium">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-text-secondary text-sm">{edu.year}</span>
                    <div className="text-neon-purple font-bold text-lg">{edu.gpa}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{edu.year}</span>
                  </div>
                </div>
                
                <p className="text-text-secondary leading-relaxed mb-4">
                  {edu.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement, idx) => (
                    <span key={idx} className="px-3 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full border border-neon-blue/20">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Professional Certifications
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto mb-8">
              Industry-recognized certifications that validate my expertise in various technologies and methodologies.
            </p>
            <button
              onClick={() => {
                setManagerType('certificate');
                setIsCertificateManagerOpen(true);
              }}
              className="neon-button group"
            >
              <Plus size={20} className="mr-2" />
              Add New Certificate
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCertificates().map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} onDelete={handleDeleteCertificate} />
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="workshops-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Workshops & Training
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto mb-8">
              Hands-on workshops and training sessions that enhance my skills and knowledge in various technologies.
            </p>
            <button
              onClick={() => {
                setManagerType('workshop');
                setIsWorkshopManagerOpen(true);
              }}
              className="neon-button group"
            >
              <Plus size={20} className="mr-2" />
              Add New Workshop
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getWorkshops().map((workshop) => (
              <CertificateCard key={workshop.id} certificate={workshop} onDelete={handleDeleteCertificate} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Competencies */}
      <section className="skills-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Skills & Competencies
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Technical and soft skills developed through education, certifications, and hands-on experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-text-primary">{skill.name}</h3>
                  <span className="text-neon-blue font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-glass-border/20 rounded-full h-3 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full border border-neon-blue/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Learning */}
      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 text-center">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Continuous Learning
            </h3>
            <p className="text-text-secondary text-lg mb-8">
              I believe in lifelong learning and staying current with the latest technologies and industry trends. 
              Currently pursuing advanced certifications and exploring emerging technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-neon-blue/10 text-neon-blue rounded-full text-sm">
                Machine Learning
              </span>
              <span className="px-4 py-2 bg-neon-purple/10 text-neon-purple rounded-full text-sm">
                Blockchain
              </span>
              <span className="px-4 py-2 bg-neon-cyan/10 text-neon-cyan rounded-full text-sm">
                Web3
              </span>
              <span className="px-4 py-2 bg-neon-pink/10 text-neon-pink rounded-full text-sm">
                AI/ML
              </span>
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
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
                <a href="/tech-stack" className="block text-neon-purple hover:text-neon-blue transition-colors">Tech Stack</a>
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

      {/* Certificate Manager Modal */}
      <CertificateManager
        isOpen={isCertificateManagerOpen}
        onClose={() => setIsCertificateManagerOpen(false)}
        onAddCertificate={handleAddCertificate}
        type="certificate"
      />

      {/* Workshop Manager Modal */}
      <CertificateManager
        isOpen={isWorkshopManagerOpen}
        onClose={() => setIsWorkshopManagerOpen(false)}
        onAddCertificate={handleAddCertificate}
        type="workshop"
      />
    </div>
  );
};

export default Education;