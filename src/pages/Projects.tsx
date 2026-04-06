import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import PlanetAnimation from '../components/PlanetAnimation';
import ProjectCard from '../components/ProjectCard';
import ProjectManager from '../components/ProjectManager';
import { projects as initialProjects, Project } from '../data/projects';
import { 
  GithubLogo, 
  LinkedinLogo, 
  EnvelopeSimple, 
  Plus
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load projects from localStorage or use initialProjects
    const currentVersion = '2.5';
    const storedVersion = localStorage.getItem('projects_version');
    const storedProjects = localStorage.getItem('projects');
    
    if (storedVersion !== currentVersion || !storedProjects) {
      setProjects(initialProjects);
      localStorage.setItem('projects', JSON.stringify(initialProjects));
      localStorage.setItem('projects_version', currentVersion);
    } else {
      try {
        const parsed = JSON.parse(storedProjects);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        } else {
          setProjects(initialProjects);
          localStorage.setItem('projects', JSON.stringify(initialProjects));
        }
      } catch {
        setProjects(initialProjects);
        localStorage.setItem('projects', JSON.stringify(initialProjects));
      }
    }
  }, []);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations can be re-enabled here if desired
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Derived project groups
  const featuredProjects = projects.slice(0, 3);
  const allProjects = projects;

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

      {/* Featured Projects */}
      <section id="featured-projects" className="featured-section py-20 px-6 lg:px-8 pt-32">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Featured Projects
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto mb-8">
              Highlighted projects that showcase my expertise in modern web development and innovative design.
            </p>
            <button
              onClick={() => {
                setEditingProject(null);
                setIsProjectManagerOpen(true);
              }}
              className="neon-button group"
              aria-label="Add New Project - Open project manager to add a new project"
            >
              <Plus size={20} className="mr-2" aria-hidden="true" />
              Add New Project
            </button>
          </div>
          
          {featuredProjects.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard 
                  key={`featured-${project.id}`} 
                  project={project} 
                  onDelete={handleDeleteProject}
                  onEdit={handleEditProject}
                  variant="featured" 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-card">
              <p className="text-text-secondary text-lg">No featured projects available.</p>
            </div>
          )}
        </div>
      </section>

      {/* All Projects */}
      <section className="all-projects-section py-20 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(271 81% 56%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              All Projects
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              A comprehensive collection of my work, from small experiments to large-scale applications.
            </p>
          </div>
          
          {allProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project) => (
                <ProjectCard 
                  key={`all-${project.id}`} 
                  project={project} 
                  onDelete={handleDeleteProject}
                  onEdit={handleEditProject}
                  variant="all" 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-card">
              <p className="text-text-secondary text-lg">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-glass-border/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-text-primary mb-4">Get in Touch</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://github.com/Rokibul-Islam-Robi" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-blue transition-colors">
                  <GithubLogo size={24} />
                </a>
                <a href="https://www.linkedin.com/in/rokibulislam088" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-purple transition-colors">
                  <LinkedinLogo size={24} />
                </a>
                <a href="mailto:hello@rokibulrobi.dev" className="text-text-secondary hover:text-neon-blue transition-colors">
                  <EnvelopeSimple size={24} />
                </a>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-text-primary mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="block text-neon-purple hover:text-neon-blue transition-colors">Home</a>
                <a href="#featured-projects" className="block text-neon-purple hover:text-neon-blue transition-colors">Featured</a>
                <a href="/education" className="block text-neon-purple hover:text-neon-blue transition-colors">Education</a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-text-primary mb-4">Newsletter</h3>
              <p className="text-text-secondary text-sm mb-4">
                Subscribe to get updates about new projects.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium rounded-lg hover:shadow-glow-purple transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          <div className="border-t border-glass-border/20 pt-8 text-center">
            <p className="text-text-muted">
              © 2024 Rokibul Islam Robi Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Project Manager Modal */}
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

export default Projects;
