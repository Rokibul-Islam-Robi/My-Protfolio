import { useState, useEffect } from 'react';
import { Plus, X, Upload } from 'phosphor-react';
import { Project } from '../data/projects';

interface ProjectManagerProps {
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject?: (project: Project) => void;
  isOpen: boolean;
  onClose: () => void;
  editingProject?: Project | null;
}

const ProjectManager = ({ onAddProject, onUpdateProject, isOpen, onClose, editingProject }: ProjectManagerProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    stats: {
      stars: 0,
      forks: 0,
      views: 0,
    }
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Update form when editingProject changes
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        tech: editingProject.tech.join(', '),
        image: editingProject.image,
        githubUrl: editingProject.githubUrl,
        liveUrl: editingProject.liveUrl || '',
        stats: editingProject.stats,
      });
      setSelectedFile(null);
    } else if (isOpen && !editingProject) {
      // Reset form when opening for new project
      setFormData({
        title: '',
        description: '',
        tech: '',
        image: '',
        githubUrl: '',
        liveUrl: '',
        stats: {
          stars: 0,
          forks: 0,
          views: 0,
        }
      });
      setSelectedFile(null);
    }
  }, [editingProject, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const base64Image = (reader.result as string).split(',')[1];
        
        const apiKey = 'ecbb2a65fe0552bbc6b63751371c113e';
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `image=${encodeURIComponent(base64Image)}`,
        });

        const result = await response.json();

        if (result.data && result.data.url) {
          imageUrl = result.data.url;
        }

        const projectData = {
          ...formData,
          tech: formData.tech.split(',').map(t => t.trim()),
          image: imageUrl,
        };

        if (editingProject && onUpdateProject) {
          onUpdateProject({ ...projectData, id: editingProject.id });
        } else {
          onAddProject(projectData);
        }
        resetForm();
      };
    } else {
      const projectData = {
        ...formData,
        tech: formData.tech.split(',').map(t => t.trim()),
      };
  
      if (editingProject && onUpdateProject) {
        onUpdateProject({ ...projectData, id: editingProject.id });
      } else {
        onAddProject(projectData);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tech: '',
      image: '',
      githubUrl: '',
      liveUrl: '',
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    });
    setSelectedFile(null);
  }

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('stats.')) {
      const statField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statField]: value,
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                value={formData.tech}
                onChange={(e) => handleInputChange('tech', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder="React, TypeScript, etc."
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-text-primary font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
              placeholder="Brief description of the project"
              rows={3}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-text-primary font-medium mb-2">
              <Upload size={20} className="inline mr-2" />
              Project Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Or Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
              placeholder="https://example.com/project-image.png"
            />
          </div>

          {/* URLs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder="https://github.com/user/repo"
              />
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">Live URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">Stars</label>
              <input
                type="number"
                value={formData.stats.stars}
                onChange={(e) => handleInputChange('stats.stars', parseInt(e.target.value))}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
              />
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">Forks</label>
              <input
                type="number"
                value={formData.stats.forks}
                onChange={(e) => handleInputChange('stats.forks', parseInt(e.target.value))}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
              />
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">Views</label>
              <input
                type="number"
                value={formData.stats.views}
                onChange={(e) => handleInputChange('stats.views', parseInt(e.target.value))}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="neon-button flex-1 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {editingProject ? 'Update Project' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="glass-card px-6 py-3 border border-glass-border/30 text-text-primary hover:border-neon-blue/50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectManager;
