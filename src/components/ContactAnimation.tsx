import { useEffect, useRef } from 'react';

const ContactAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Modern corporate color palette
    const colors = [
      { r: 59, g: 130, b: 246, name: 'blue' },    // neon-blue
      { r: 168, g: 85, b: 247, name: 'purple' },  // neon-purple
      { r: 34, g: 211, b: 238, name: 'cyan' },    // neon-cyan
      { r: 236, g: 72, b: 153, name: 'pink' },    // neon-pink
    ];

    // Enhanced Particle class
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: { r: number; g: number; b: number; name: string };
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      rotation: number;
      rotationSpeed: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.radius = this.size;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Smooth boundary handling
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Pulsing effect
        this.pulsePhase += this.pulseSpeed;
        this.opacity = 0.3 + Math.sin(this.pulsePhase) * 0.4;
        this.radius = this.size + Math.sin(this.pulsePhase) * 0.5;

        // Rotation
        this.rotation += this.rotationSpeed;
      }

      draw() {
        if (!ctx) return;
        
        // Draw geometric shape based on color
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Different shapes for variety
        const shapeType = Math.floor(Math.random() * 3);
        
        if (this.color.name === 'blue' || this.color.name === 'cyan') {
          // Draw circle/dot
          ctx.beginPath();
          ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.8})`;
          ctx.fill();
        } else {
          // Draw geometric shape (square/diamond)
          ctx.beginPath();
          const size = this.radius * 1.5;
          ctx.moveTo(-size, 0);
          ctx.lineTo(0, -size);
          ctx.lineTo(size, 0);
          ctx.lineTo(0, size);
          ctx.closePath();
          ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.7})`;
          ctx.fill();
        }
        
        ctx.restore();
        ctx.shadowBlur = 0;
      }
    }

    // Enhanced Connection class with gradient
    class Connection {
      particle1: Particle;
      particle2: Particle;
      maxDistance: number;

      constructor(p1: Particle, p2: Particle) {
        this.particle1 = p1;
        this.particle2 = p2;
        this.maxDistance = 120;
      }

      draw() {
        if (!ctx) return;
        const dx = this.particle1.x - this.particle2.x;
        const dy = this.particle1.y - this.particle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance) {
          const opacity = (1 - distance / this.maxDistance) * 0.3;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(
            this.particle1.x,
            this.particle1.y,
            this.particle2.x,
            this.particle2.y
          );
          
          gradient.addColorStop(0, `rgba(${this.particle1.color.r}, ${this.particle1.color.g}, ${this.particle1.color.b}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${this.particle2.color.r}, ${this.particle2.color.g}, ${this.particle2.color.b}, ${opacity})`);

          ctx.beginPath();
          ctx.moveTo(this.particle1.x, this.particle1.y);
          ctx.lineTo(this.particle2.x, this.particle2.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    // Floating geometric shapes
    class GeometricShape {
      x: number;
      y: number;
      size: number;
      color: { r: number; g: number; b: number };
      rotation: number;
      rotationSpeed: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 40;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.1 + 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw hexagon
        ctx.beginPath();
        const sides = 6;
        for (let i = 0; i < sides; i++) {
          const angle = (Math.PI * 2 * i) / sides;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Create particles and shapes
    const particleCount = 50;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const shapeCount = 3;
    const shapes: GeometricShape[] = [];
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new GeometricShape());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw floating geometric shapes
      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const connection = new Connection(particles[i], particles[j]);
          connection.draw();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.4 }}
      aria-hidden="true"
    />
  );
};

export default ContactAnimation;

