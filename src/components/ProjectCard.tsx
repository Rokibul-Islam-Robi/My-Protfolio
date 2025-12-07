import { useState } from 'react';
import { GithubLogo, Globe, Star, Code, Link, Trash, Medal, PencilSimple } from 'phosphor-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: number) => void;
  onEdit?: (project: Project) => void;
  variant?: 'featured' | 'all';
}

const transformGoogleDriveUrl = (url: string) => {
  const googleDriveRegex = /drive\.google\.com\/file\/d\/([\w-]+)/;
  const match = url.match(googleDriveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  return url;
};

const ProjectCard = ({ project, onDelete, onEdit, variant }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = transformGoogleDriveUrl(project.image);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="project-card-3d-container" style={{ userSelect: 'none' }}>
      <div className="project-card-3d-canvas">
        {/* 3D Tracking Grid - Individual trackers as siblings */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="project-card-3d-tracker" />
        ))}

        {/* 3D Card */}
        <div id={`project-card-${project.id}`} className="project-card-3d-card">
        <div className="project-card-3d-content glass-card p-6 hover:shadow-glow-strong transition-all duration-500 group h-full">
          {/* Cyber Effects */}
          <div className="project-card-cyber-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="project-card-corners">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="project-card-glows">
            <div className="project-card-glow"></div>
            <div className="project-card-glow"></div>
            <div className="project-card-glow"></div>
          </div>

          <div className="project-card-scan-line"></div>
          <div className="project-card-glare"></div>

          {/* Image Section */}
          <div className="relative overflow-hidden rounded-lg mb-6">
            {!imageError ? (
                <img 
                  src={imageUrl} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center border-2 border-dashed border-neon-blue/30">
                  <div className="text-center">
                    <Medal size={48} className="text-neon-purple mx-auto mb-2" />
                    <p className="text-text-secondary text-sm">Project Image</p>
                    <p className="text-text-muted text-xs">Not Available</p>
                  </div>
                </div>
              )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* GitHub Button Overlay */}
            {project.githubUrl && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-2 rounded-lg bg-neon-blue/20 border border-neon-blue/30 text-white hover:bg-neon-blue/30 transition-all duration-300"
                >
                  <GithubLogo size={20} />
                </a>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-neon-blue transition-colors">
            {project.title}
          </h3>
          
          <p className="text-text-secondary mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full border border-neon-blue/20">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <Star size={16} />
                <span>{project.stats.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <Code size={16} />
                <span>{project.stats.forks}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe size={16} />
                <span>{project.stats.views}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass-card py-2 text-sm font-medium text-text-primary hover:text-neon-blue border border-glass-border/30 hover:border-neon-blue/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <GithubLogo size={16} />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass-card py-2 text-sm font-medium text-text-primary hover:text-neon-purple border border-glass-border/30 hover:border-neon-purple/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Link size={16} />
                Live
              </a>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(project)}
                className="glass-card p-3 text-sm font-medium text-text-primary hover:text-neon-blue border border-glass-border/30 hover:border-neon-blue/50 transition-all duration-300 flex items-center justify-center gap-2 group transform-gpu hover:translate-y-[-2px] hover:shadow-lg hover:shadow-neon-blue/20"
                title="Edit Project"
              >
                <PencilSimple size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(project.id)}
                className="glass-card p-3 text-sm font-medium text-text-primary hover:text-red-500 border border-glass-border/30 hover:border-red-500/50 transition-all duration-300 flex items-center justify-center gap-2 group transform-gpu hover:translate-y-[-2px] hover:shadow-lg hover:shadow-red-500/20"
                title="Delete Project"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProjectCard;