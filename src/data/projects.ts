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
    description: "EduSphere is a dynamic online platform designed to enhance university learning through: Personalized learning pathways, Academic collaboration, Peer teaching opportunities, and Resource sharing. It empowers students to seamlessly transition between the roles of learner and mentor, improving outcomes and fostering community.\n\n✨ Key Highlights:\n📚 Academic Resource Hub – Share study materials, notes, etc.\n🤝 Peer-to-Peer Collaboration – Group projects, discussions\n🧠 Teach What You Know – Students mentor others\n🏫 Community Building – Strong academic network",
    tech: ["React", "Django", "PostgreSQL", "DRF", "JavaScript"],
    image: "/images/projects/edusphare.png",
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
    title: "Daycare Connect",
    description: "A specialized platform connecting parents with reliable daycare providers. It features a comprehensive search system, real-time availability tracking, and a secure communication channel between parents and caregivers to ensure child safety and peace of mind.",
    tech: ["React", "JavaScript", "Node.js"],
    image: "/images/projects/daycare-Connect.png",
    githubUrl: "https://github.com/Rokibul-Islam-Robi",
    liveUrl: "",
    stats: {
      stars: 0,
      forks: 0,
      views: 0,
    }
  },
  {
    id: 3,
    title: "Event360",
    description: "A modern event management platform built with JavaScript. Features include event creation, management, and seamless user experience for organizing and discovering events.",
    tech: ["JavaScript", "React", "Node.js"],
    image: "/images/projects/event360.png",
    githubUrl: "https://github.com/Rokibul-Islam-Robi/Event360",
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
    image: "/images/projects/PuzzaleBit.png",
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
    title: "GTA VI - Grand Theft Vibe",
    description: "An immersive gaming experience inspired by Grand Theft Auto. Built with modern web technologies to deliver engaging gameplay and stunning visuals.",
    tech: ["JavaScript", "HTML5", "CSS3", "Canvas API"],
    image: "/images/projects/gitavi.png",
    githubUrl: "https://github.com/Rokibul-Islam-Robi/GTAVI-Grand-Theft-vibe",
    liveUrl: "",
    stats: {
      stars: 0,
      forks: 0,
      views: 0,
    }
  },
  {
    id: 6,
    title: "Your Personal ChatGPT",
    description: "A personalized AI chatbot application that provides intelligent conversations and assistance. Built with modern JavaScript frameworks to deliver a seamless chat experience.",
    tech: ["JavaScript", "React", "OpenAI API"],
    image: "/images/projects/portfolio.png",
    githubUrl: "https://github.com/Rokibul-Islam-Robi/Your-Personal-ChatGpt",
    liveUrl: "",
    stats: {
      stars: 0,
      forks: 0,
      views: 0,
    }
  },
  {
    id: 7,
    title: "My Portfolio Website",
    description: "A modern, responsive portfolio website showcasing my projects, skills, and experience. Built with React, TypeScript, and modern web technologies.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
    image: "/images/projects/portfolio.png",
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
