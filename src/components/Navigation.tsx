import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X, Sun, Moon, DownloadSimple } from 'phosphor-react';
import { Link, useLocation } from 'react-router-dom';
import { cvLinks } from '../data/cv';
import CVPreview from './CVPreview';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic here
    document.documentElement.classList.toggle('light-mode');
  };

  const navItems = [
    { name: 'About Me', path: '/about' },
    { name: 'Tech Stack', path: '/tech-stack' },
    { name: 'Projects', path: '/projects' },
    { name: 'Education', path: '/education' },
    { name: 'Problem Solving', path: '/problem-solving' },
  ];

  return (
    <>
      <nav className={`navbar fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-glass-border/20'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-12 lg:h-14">
            {/* Logo */}
            <div className="nav-logo">
              <Link
                to="/"
                className="text-xl lg:text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
              >
                ROBI
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="nav-container relative bg-background-secondary/90 backdrop-blur-sm rounded-full px-2 py-2 flex items-center">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-link relative inline-block transition-all duration-300 ease-out py-2 px-5 mx-1 uppercase text-sm font-medium ${
                      location.pathname === item.path 
                        ? 'text-[#ff4d3d]' 
                        : 'text-white hover:text-[#ff4d3d]/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Download CV Button */}
              <CVPreview type="cv">
                <a 
                  href={cvLinks.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-lg border-2 border-[#ff4d3d] text-white uppercase text-sm font-medium hover:bg-[#ff4d3d]/10 transition-all duration-300 flex items-center gap-2"
                >
                  <DownloadSimple size={18} />
                  Download CV
                </a>
              </CVPreview>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn glass-card p-2 rounded-lg border border-glass-border/30 hover:border-neon-blue/50 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-text-primary group-hover:text-neon-blue transition-colors" />
                ) : (
                  <Moon size={20} className="text-text-primary group-hover:text-neon-purple transition-colors" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-text-primary hover:text-neon-blue transition-all duration-300 hover:scale-110 hover:rotate-3"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-80 bg-background-secondary/95 backdrop-blur-xl border-l border-glass-border/20 z-50 transform translate-x-full lg:hidden`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-glass-border/20">
            <span className="text-xl font-bold text-gradient">Menu</span>
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button for Mobile */}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn glass-card p-2 rounded-lg border border-glass-border/30 hover:border-neon-blue/50 transition-all duration-300 hover:scale-110 group"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-text-primary group-hover:text-neon-blue transition-colors" />
                ) : (
                  <Moon size={20} className="text-text-primary group-hover:text-neon-purple transition-colors" />
                )}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 text-text-primary hover:text-neon-blue transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 p-6">
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={toggleMenu}
                  className={`block w-full text-left text-lg transition-all duration-500 ease-out py-3 border-b border-glass-border/10 hover:border-neon-blue/30 hover:scale-105 hover:translate-x-2 ${
                    location.pathname === item.path
                      ? 'text-neon-blue scale-105 translate-x-2'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-glass-border/20">
            <p className="text-text-muted text-sm text-center">
              © 2024 ROBI
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navigation;