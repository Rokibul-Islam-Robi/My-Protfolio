export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description: string;
  image: string;
  date: string;
  credential: string;
  linkedinUrl: string;
  category: 'certificate' | 'workshop';
}

export const certificates: Certificate[] = [
  {
    id: '1',
    name: 'Learnathon 3.0 Participation',
    issuer: 'Geeky Solutions',
    description: "Successfully completed Learnathon 3.0 organized by Geeky Solutions and sponsored by Brain Station 23. As part of Team pipinstallc, we built EduSphere: a personalized learning and academic collaboration platform for university students. The platform addresses centralized study resources, fosters collaboration, and builds strong communities. Key features include student-powered resource sharing, community-centric learning, personalized learning paths, and a centralized academic hub. Tech stack: React.js frontend, Django backend with REST API. This experience strengthened real-world development skills and pushed us beyond comfort zones.",
    image: '/certificates/learnathon-3.0-certificate.jpg',
    date: 'January 2025 - April 2025',
    credential: 'N/A',
    linkedinUrl: 'https://Inkd.in/gAr6RKrt',
    category: 'certificate'
  },
  {
    id: '2',
    name: 'Introduction to Critical Infrastructure Protection (ICIP)',
    issuer: 'OPSWAT Academy',
    description: "Successfully completed Cybersecurity training in critical infrastructure protection (ICIP) from OPSWAT Academy and earned a Certificate of Excellence. Gained valuable insights into Cybersecurity processes and critical infrastructure protection methodologies. This training enhanced understanding of security frameworks and protection strategies for critical systems.",
    image: '/certificates/icip-opswat-certificate.jpg',
    date: '11/10/2024',
    credential: '2_RfUNXKrw',
    linkedinUrl: 'https://learn.opswatacademy.com/certificate/2_RfUNXKrw',
    category: 'certificate'
  },
  {
    id: '3',
    name: 'Academic Writing for Research Excellence Workshop',
    issuer: 'Daffodil International University Research Society',
    description: "Attended 'Lecture Series-5: Academic Writing for Research Excellence' workshop hosted by Daffodil International University Research Society (DIURS). Key topics covered: Effective Paper Development, Qsquare Approach, Observation Researching in Bangladesh, and Critical Thinking in Research. This workshop enhanced academic writing skills and research methodology understanding, emphasizing the importance of critical thinking in academic pursuits.",
    image: '/placeholder.svg',
    date: '2024',
    credential: 'N/A',
    linkedinUrl: 'https://www.linkedin.com/posts/rokibul-islam-robi_academic-writing-workshop-activity-123456789',
    category: 'workshop'
  },
  {
    id: '4',
    name: 'Microsoft Fabric Data Analytics Engineering Training',
    issuer: 'Data Crafters & Microsoft',
    description: "Successfully completed Data Analytics Engineering Training in Microsoft Fabric, an end-to-end cloud-based SaaS solution for data and analytics. Gained hands-on experience with Microsoft Fabric Core Components including Data Pipelines, Dataflow Gen 2, Fabric Notebooks, and shortcuts. Mastered data transformation tools using T-SQL, PySpark, and Lakehouse & Warehouse architecture. Advanced Power BI topics covered DirectLake, Dual Mode, Power Query transformations, and DAX. Implemented Medallion Architecture and security features including Row-Level Security (RLS) and Object-Level Security (OLS).",
    image: '/certificates/microsoft-fabric-certificate.jpg',
    date: 'Sep 7, 2024',
    credential: 'N/A',
    linkedinUrl: 'https://www.linkedin.com/posts/rokibul-islam-robi_microsoft-fabric-training-activity-123456789',
    category: 'certificate'
  },
  {
    id: '5',
    name: 'Introduction to Microsoft 365 Copilot',
    issuer: 'Microsoft & NetCom Learning Bangladesh',
    description: "Successfully completed Microsoft 365 Copilot training series offered by Microsoft in collaboration with NetCom Learning Bangladesh. Explored AI-powered productivity tools across Word, Excel, PowerPoint, Teams, and Outlook. Completed learning paths covering Copilot introduction, exploring possibilities, optimization, content creation, editing, and analysis. Gained insights into responsible AI use, including output validation, thoughtful prompting, and privacy considerations. This training enhanced understanding of AI-powered productivity for both professional and academic tasks.",
    image: '/certificates/microsoft-copilot-certificate.jpg',
    date: 'June 22, 2025',
    credential: 'N/A',
    linkedinUrl: 'https://www.linkedin.com/posts/rokibul-islam-robi_microsoft-copilot-training-activity-123456789',
    category: 'certificate'
  }
];

export const getCertificates = () => certificates.filter(item => item.category === 'certificate');
export const getWorkshops = () => certificates.filter(item => item.category === 'workshop');
export const getCertificateById = (id: string) => certificates.find(cert => cert.id === id); 