import { EnvelopeSimple, GithubLogo, LinkedinLogo, ArrowRight } from 'phosphor-react';

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  content: string;
  href?: string;
  color: 'blue' | 'purple' | 'cyan';
}

const ContactCard = ({ icon: Icon, title, content, href, color }: ContactCardProps) => {
  const colorClasses = {
    blue: {
      glow: 'hover:shadow-glow-blue',
      text: 'text-neon-blue',
      hoverText: 'group-hover:text-neon-blue',
      border: 'border-neon-blue/30 hover:border-neon-blue/60',
      bg: 'hover:bg-neon-blue/10',
    },
    purple: {
      glow: 'hover:shadow-glow-purple',
      text: 'text-neon-purple',
      hoverText: 'group-hover:text-neon-purple',
      border: 'border-neon-purple/30 hover:border-neon-purple/60',
      bg: 'hover:bg-neon-purple/10',
    },
    cyan: {
      glow: 'hover:shadow-glow-cyan',
      text: 'text-neon-cyan',
      hoverText: 'group-hover:text-neon-cyan',
      border: 'border-neon-cyan/30 hover:border-neon-cyan/60',
      bg: 'hover:bg-neon-cyan/10',
    },
  };

  const colors = colorClasses[color];
  const cardId = `contact-card-${title.toLowerCase().replace(/\s+/g, '-')}`;

  const cardContent = (
    <div className="project-card-3d-container" style={{ userSelect: 'none', width: '100%', height: '100%', minHeight: '120px' }}>
      <div className="project-card-3d-canvas" style={{ width: '100%', height: '100%' }}>
        {/* 3D Tracking Grid */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="project-card-3d-tracker" />
        ))}

        {/* 3D Card */}
        <div id={cardId} className="project-card-3d-card" style={{ width: '100%', height: '100%' }}>
          <div className={`project-card-3d-content glass-card p-6 ${colors.glow} transition-all duration-500 group flex items-center gap-4 ${colors.border} border ${colors.bg}`} style={{ width: '100%', height: '100%', minHeight: '120px' }}>
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

            {/* Icon with 3D effect */}
            <div className={`glass-card p-4 rounded-lg ${colors.text} flex-shrink-0 transform-gpu transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-lg`}>
              <Icon size={28} className="transform-gpu transition-transform duration-300 group-hover:scale-125" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 transform-gpu transition-transform duration-300 group-hover:translate-x-2">
              <p className="text-text-primary font-semibold mb-1 transition-colors duration-300 group-hover:text-white">
                {title}
              </p>
              <p className={`text-text-secondary text-sm transition-colors duration-300 ${colors.hoverText} truncate`}>
                {content}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform-gpu group-hover:translate-x-1 ${colors.text}`}>
              <ArrowRight size={20} className="transform-gpu transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? '_self' : '_blank'}
        rel={href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
        className="block h-full w-full"
        style={{ display: 'block', height: '100%', width: '100%' }}
        aria-label={`${title} - ${content}`}
      >
        {cardContent}
      </a>
    );
  }

  return <div className="h-full w-full" style={{ display: 'block', height: '100%', width: '100%' }}>{cardContent}</div>;
};

export default ContactCard;

