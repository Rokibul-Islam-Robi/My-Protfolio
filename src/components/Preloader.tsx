import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // GSAP loading animation
    const tl = gsap.timeline();

    // Initial logo animation
    tl.fromTo('.preloader-logo', 
      { opacity: 0, scale: 0.5, filter: 'blur(20px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Progress bar animation
    gsap.to('.progress-fill', {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onComplete: () => {
        // Exit animation
        gsap.to('.preloader-content', {
          opacity: 0,
          scale: 0.9,
          filter: 'blur(10px)',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.to('.preloader', {
              y: '-100%',
              duration: 1,
              ease: 'power3.inOut',
              onComplete: onComplete
            });
          }
        });
      }
    });

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center">
      <div className="preloader-content text-center">
        {/* Animated Logo */}
        <div className="preloader-logo mb-8">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold text-gradient">
              Robi
            </h1>
            <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-neon-blue/20 blur-xl">
              Robi
            </div>
          </div>
          <p className="text-text-secondary mt-4 text-lg">
            Software Engineer
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-text-secondary text-sm">Loading...</span>
            <span className="text-text-primary text-sm font-mono">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1 bg-glass-border/30 rounded-full overflow-hidden">
            <div 
              className="progress-fill h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-glow-blue transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue/50 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;