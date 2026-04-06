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
  Globe, 
  Star, 
  Calendar,
  MapPin,
  Lightbulb,
  Rocket,
  Code,
  Link,
  Plus,
  LinkedinLogo,
  EnvelopeSimple,
  ArrowRight
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
      // Hero animations
...
  }, []);

  // Derived project groups
  const featuredProjects = projects.slice(0, 3);
  const allProjects = projects;

  return (
    <div ref={containerRef} className="relative min-h-screen">
...
      {/* Featured Projects */}
      <section id="featured-projects" className="featured-section py-20 px-6 lg:px-8">
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
...
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
...
      {/* Footer */}
...
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