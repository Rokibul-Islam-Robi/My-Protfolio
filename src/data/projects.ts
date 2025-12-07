export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  stats: {
    stars: number;
    forks: number;
    views: number;
  };
}

export const projects: Project[] = [
    {
      id: 1,
      title: "EduSphere - Academic Resource Hub",
      description: "A comprehensive academic platform for students to share study materials, collaborate on projects, and engage in peer-to-peer learning. Features include resource sharing, video lectures with timestamped notes, payment system for premium content, and university-based filtering.",
      tech: ["React", "Django", "PostgreSQL", "DRF", "JavaScript"],
      image: "/lovable-uploads/09356399-4a00-47d5-b816-7991d94860bd.png",
      githubUrl: "https://github.com/Rokibul-Islam-Robi/pipinstallc",
      liveUrl: "https://pipinstallc.vercel.app",
      stats: {
        stars: 0,
        forks: 3,
        views: 0,
      }
    },
    {
      id: 2,
      title: "Event360",
      description: "A modern event management platform built with JavaScript. Features include event creation, management, and seamless user experience for organizing and discovering events.",
      tech: ["JavaScript", "React", "Node.js"],
      image: "/lovable-uploads/62685ee9-0ba7-4378-8471-c27123d43751.png",
      githubUrl: "https://github.com/Rokibul-Islam-Robi/Event360",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 3,
      title: "GTA VI - Grand Theft Vibe",
      description: "An immersive gaming experience inspired by Grand Theft Auto. Built with modern web technologies to deliver engaging gameplay and stunning visuals.",
      tech: ["JavaScript", "HTML5", "CSS3", "Canvas API"],
      image: "/lovable-uploads/52545b39-a092-42b4-96e0-013af841c7d5.png",
      githubUrl: "https://github.com/Rokibul-Islam-Robi/GTAVI-Grand-Theft-vibe",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 4,
      title: "PuzzleBit",
      description: "An interactive puzzle game platform featuring various brain-teasing challenges. Built with JavaScript to provide an engaging and fun gaming experience.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      image: "/lovable-uploads/3ec37a13-3d91-4dee-9275-c66a34b180e0.png",
      githubUrl: "https://github.com/Rokibul-Islam-Robi/PuzzleBit",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 5,
      title: "Your Personal ChatGPT",
      description: "A personalized AI chatbot application that provides intelligent conversations and assistance. Built with modern JavaScript frameworks to deliver a seamless chat experience.",
      tech: ["JavaScript", "React", "OpenAI API"],
      image: "/lovable-uploads/4060dd43-2597-48b4-9abe-93c675ecd0fc.png",
      githubUrl: "https://github.com/Rokibul-Islam-Robi/Your-Personal-ChatGpt",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 6,
      title: "My Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my projects, skills, and experience. Built with React, TypeScript, and modern web technologies.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
      image: "/lovable-uploads/b3cad411-7107-4c48-8a87-4b066956b466.png",
      githubUrl: "https://github.com/Rokibul-Islam-Robi/My-Protfolio",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    }
  ];

export const getAllProjects = () => projects;

export const getFeaturedProjects = () => projects.slice(0, 3);