import { useEffect, useRef } from 'react';
import './CyberCard.css';

interface CyberCardProps {
  title?: string;
  subtitle?: string;
  prompt?: string;
  className?: string;
  children?: React.ReactNode;
}

const CyberCard = ({ 
  title = "CYBER\nCARD", 
  subtitle = "INTERACTIVE 3D EFFECT",
  prompt = "HOVER ME",
  className = "",
  children 
}: CyberCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`cyber-card-container ${className}`} ref={containerRef}>
      <div className="cyber-card-canvas">
        <div className="cyber-card-tracker tr-1"></div>
        <div className="cyber-card-tracker tr-2"></div>
        <div className="cyber-card-tracker tr-3"></div>
        <div className="cyber-card-tracker tr-4"></div>
        <div className="cyber-card-tracker tr-5"></div>
        <div className="cyber-card-tracker tr-6"></div>
        <div className="cyber-card-tracker tr-7"></div>
        <div className="cyber-card-tracker tr-8"></div>
        <div className="cyber-card-tracker tr-9"></div>

        <div className="cyber-card" ref={cardRef}>
          <div className="cyber-card-content">
            <div className="cyber-card-glare"></div>
            
            <div className="cyber-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <p className="cyber-card-prompt">{prompt}</p>
            
            <div className="cyber-card-title">
              {title.split('\n').map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>

            <div className="glowing-elements">
              <div className="glow-1"></div>
              <div className="glow-2"></div>
              <div className="glow-3"></div>
            </div>

            {subtitle && (
              <div className="cyber-card-subtitle">
                {subtitle.includes(' ') ? (
                  <>
                    <span>{subtitle.split(' ')[0]}</span>
                    <span className="highlight">{subtitle.split(' ').slice(1).join(' ')}</span>
                  </>
                ) : (
                  <span>{subtitle}</span>
                )}
              </div>
            )}

            {children && (
              <div className="cyber-card-children">
                {children}
              </div>
            )}

            <div className="card-particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="corner-elements">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="scan-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberCard;

