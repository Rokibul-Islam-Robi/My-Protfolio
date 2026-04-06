import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { liveEvents } from '../data/liveEvents';
import { MapPin, Calendar } from 'phosphor-react';
import './LiveEventSlider.css';

const LiveEventSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Clone elements for seamless loop
    const totalWidth = slider.scrollWidth;
    const items = Array.from(slider.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      slider.appendChild(clone);
    });

    const animate = () => {
      gsap.to(slider, {
        x: `-${totalWidth}`,
        duration: 30,
        ease: 'none',
        repeat: -1,
        onReverseComplete: () => {
          gsap.set(slider, { x: 0 });
        }
      });
    };

    animate();

    // Pause on hover
    slider.addEventListener('mouseenter', () => gsap.getTweensOf(slider).forEach(t => t.pause()));
    slider.addEventListener('mouseleave', () => gsap.getTweensOf(slider).forEach(t => t.resume()));

    return () => {
      gsap.killTweensOf(slider);
    };
  }, []);

  return (
    <div className="live-events-container overflow-hidden py-10 relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <div ref={sliderRef} className="flex gap-8 w-max">
        {liveEvents.map((event) => (
          <div 
            key={event.id} 
            className="live-event-card glass-card w-80 shrink-0 overflow-hidden group hover:shadow-glow-blue transition-all duration-500"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full border border-neon-blue/30 backdrop-blur-md">
                  Live Event
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-neon-blue transition-colors">
                {event.title}
              </h3>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Calendar size={16} className="text-neon-purple" />
                  <span>{event.date}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <MapPin size={16} className="text-neon-cyan" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveEventSlider;
