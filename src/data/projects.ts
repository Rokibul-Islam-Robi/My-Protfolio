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
      title: "3D Interactive Email Platform",
      description: "Modern email solution with 3D animations and developer-focused features.",
      tech: ["React", "Three.js", "GSAP"],
      image: "/lovable-uploads/09356399-4a00-47d5-b816-7991d94860bd.png",
      githubUrl: "",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 2,
      title: "Next-Level Gaming UI",
      description: "Futuristic gaming interface with advanced 3D elements and smooth animations.",
      tech: ["React", "WebGL", "TypeScript"],
      image: "/lovable-uploads/62685ee9-0ba7-4378-8471-c27123d43751.png",
      githubUrl: "",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 3,
      title: "3D Portfolio Website",
      description: "Immersive portfolio experience with cutting-edge 3D visuals.",
      tech: ["Spline", "React", "GSAP"],
      image: "/lovable-uploads/52545b39-a092-42b4-96e0-013af841c7d5.png",
      githubUrl: "",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 4,
      title: "Gaming Website Platform",
      description: "Dynamic gaming platform with interactive character showcases.",
      tech: ["React", "Framer Motion", "CSS3"],
      image: "/lovable-uploads/3ec37a13-3d91-4dee-9275-c66a34b180e0.png",
      githubUrl: "",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 5,
      title: "Animation Tools Platform",
      description: "Professional animation tools platform with modern UI design.",
      tech: ["React", "GSAP", "Tailwind"],
      image: "/lovable-uploads/4060dd43-2597-48b4-9abe-93c675ecd0fc.png",
      githubUrl: "",
      liveUrl: "",
      stats: {
        stars: 0,
        forks: 0,
        views: 0,
      }
    },
    {
      id: 6,
      title: "Developer Portfolio",
      description: "Clean and modern portfolio design with smooth interactions.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/lovable-uploads/b3cad411-7107-4c48-8a87-4b066956b466.png",
      githubUrl: "",
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