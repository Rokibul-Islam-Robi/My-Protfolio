import { useState } from 'react';
import { Plus, X, Upload, LinkedinLogo, Calendar, Medal, BookOpen } from 'phosphor-react';
import { Certificate } from '../data/certificates';

interface CertificateManagerProps {
  onAddCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  isOpen: boolean;
  onClose: () => void;
  type: 'certificate' | 'workshop';
}

const CertificateManager = ({ onAddCertificate, isOpen, onClose, type }: CertificateManagerProps) => {
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    description: '',
    image: '',
    date: '',
    credential: '',
    linkedinUrl: '',
    category: type
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        
        // Replace with your own imgbb API key
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

        const newCertificate = {
          ...formData,
          image: imageUrl,
          category: type
        };

        onAddCertificate(newCertificate);
        resetForm();
      };
    } else {
      const newCertificate = {
        ...formData,
        category: type
      };
  
      onAddCertificate(newCertificate);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      description: '',
      image: '',
      date: '',
      credential: '',
      linkedinUrl: '',
      category: type
    });
    setSelectedFile(null);
    onClose();
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">
            Add New {type === 'certificate' ? 'Certificate' : 'Workshop'}
          </h2>
          <button
            onClick={onClose}
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
                {type === 'certificate' ? 'Certificate' : 'Workshop'} Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder={`Enter ${type} name`}
                required
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Issuer/Organization</label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => handleInputChange('issuer', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder="Enter issuer name"
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
              placeholder={`Brief description of the ${type}`}
              rows={3}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-text-primary font-medium mb-2">
              <Upload size={20} className="inline mr-2" />
              {type === 'certificate' ? 'Certificate' : 'Workshop'} Image
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
              placeholder="https://example.com/certificate-image.png"
            />
          </div>

          {/* Date and Credential */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                <Calendar size={20} className="inline mr-2" />
                Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder="2023"
                required
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                <Medal size={20} className="inline mr-2" />
                Credential ID
              </label>
              <input
                type="text"
                value={formData.credential}
                onChange={(e) => handleInputChange('credential', e.target.value)}
                className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
                placeholder="CERT-001"
                required
              />
            </div>
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="block text-text-primary font-medium mb-2">
              <LinkedinLogo size={20} className="inline mr-2" />
              LinkedIn Post URL
            </label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              className="input-glow w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted"
              placeholder="https://www.linkedin.com/posts/username_certificate-activity-123456789"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="neon-button flex-1 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add {type === 'certificate' ? 'Certificate' : 'Workshop'}
            </button>
            <button
              type="button"
              onClick={onClose}
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

export default CertificateManager; 