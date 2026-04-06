import { LinkedinLogo, Calendar, Medal, Link, Trash, CaretDown, CaretUp } from 'phosphor-react';
import { Certificate } from '../data/certificates';
import { useState } from 'react';

interface CertificateCardProps {
  certificate: Certificate;
  onDelete: (id: string) => void;
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

const CertificateCard = ({ certificate, onDelete }: CertificateCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const imageUrl = transformGoogleDriveUrl(certificate.image);

  const handleImageError = () => {
    setImageError(true);
  };

  const truncateDescription = (text: string, limit: number = 150) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  return (
    <div className="certification-card glass-card p-6 hover:shadow-glow-purple transition-all duration-500 group transform-gpu perspective-1000 flex flex-col h-full">
      {/* Certificate Image with 3D Effect */}
      <div className="relative mb-4 transform-gpu transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-105">
        {!imageError && imageUrl && !imageUrl.includes('placeholder') ? (
          <div className="w-full h-[220px] bg-gradient-to-br from-background-secondary/50 to-background-tertiary/50 rounded-lg p-2 border border-glass-border/30 flex items-center justify-center overflow-hidden">
            <img 
              src={imageUrl} 
              alt={certificate.name}
              className="w-full h-full object-contain rounded-lg transition-all duration-700 group-hover:scale-110"
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-[220px] relative overflow-hidden bg-background-secondary/30 rounded-lg border border-glass-border/20 group-hover:border-neon-purple/40 transition-all duration-500">
            {/* Artistic Abstract Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),transparent_70%)]"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%)]"></div>
            </div>
            
            <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 mb-4 relative">
                <div className="absolute inset-0 bg-neon-purple/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative glass-card w-full h-full rounded-2xl flex items-center justify-center border border-neon-purple/30 group-hover:rotate-12 transition-transform duration-500">
                  <Medal size={40} className="text-neon-purple drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </div>
              </div>
              <div className="space-y-1 max-w-[80%]">
                <p className="text-text-primary text-sm font-bold tracking-tight line-clamp-1">{certificate.name}</p>
                <p className="text-neon-cyan text-[10px] font-medium uppercase tracking-widest">{certificate.issuer}</p>
              </div>
              <div className="mt-4 px-3 py-1 rounded-full bg-background/60 border border-glass-border/20 backdrop-blur-md">
                <span className="text-[10px] text-text-muted font-medium">Digital Credential</span>
              </div>
            </div>
            
            {/* Cyber Corner Accents */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neon-purple/40"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neon-blue/40"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
      </div>

      {/* Certificate Info */}
      <div className="flex items-start mb-4">
        <div className="glass-card p-2 rounded-lg mr-3 mt-1 shrink-0">
          <Medal size={24} className="text-neon-purple transition-colors duration-300 group-hover:text-neon-cyan" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary leading-tight transition-colors duration-300 group-hover:text-neon-blue">{certificate.name}</h3>
          <p className="text-neon-purple font-medium text-xs mt-1 transition-colors duration-300 group-hover:text-neon-cyan">{certificate.issuer}</p>
        </div>
      </div>
      
      {/* Description with Read More */}
      <div className="mb-4 flex-grow">
        <p className="text-text-secondary text-sm leading-relaxed transition-colors duration-300">
          {isExpanded ? certificate.description : truncateDescription(certificate.description)}
          {certificate.description.length > 150 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-neon-blue hover:text-neon-cyan font-medium text-xs inline-flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>Read Less <CaretUp size={12} /></>
              ) : (
                <>Read More <CaretDown size={12} /></>
              )}
            </button>
          )}
        </p>
      </div>

      <div className="mt-auto space-y-4">
        {/* Date and Credential */}
        <div className="flex items-center justify-between text-[11px] border-t border-glass-border/10 pt-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-text-secondary" />
            <span className="text-text-secondary">Issued:</span>
            <span className="text-neon-cyan font-medium">{certificate.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Medal size={14} className="text-text-secondary" />
            <span className="text-text-secondary">ID:</span>
            <span className="text-neon-blue font-mono">{certificate.credential}</span>
          </div>
        </div>
        
        {/* Status Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-0.5 bg-neon-purple/10 text-neon-purple text-[10px] rounded-full border border-neon-purple/20">
            Verified
          </span>
          <span className="px-2 py-0.5 bg-neon-cyan/10 text-neon-cyan text-[10px] rounded-full border border-neon-cyan/20">
            {certificate.category === 'certificate' ? 'Certificate' : 'Workshop'}
          </span>
        </div>

        <div className="flex gap-2">
          <a 
            href={certificate.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow glass-card py-2.5 text-xs font-bold text-text-primary hover:text-neon-blue border border-glass-border/30 hover:border-neon-blue/50 transition-all duration-300 flex items-center justify-center gap-2 group transform-gpu hover:translate-y-[-2px]"
          >
            <LinkedinLogo size={14} />
            View on LinkedIn
            <Link size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
          </a>
          <button
            onClick={() => onDelete(certificate.id)}
            className="glass-card px-3 py-2.5 text-text-primary hover:text-red-500 border border-glass-border/30 hover:border-red-500/50 transition-all duration-300 transform-gpu hover:translate-y-[-2px]"
            title="Delete Certificate"
          >
            <Trash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
