export interface LiveEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  location?: string;
}

export const liveEvents: LiveEvent[] = [
  {
    id: '1',
    title: 'Learnathon 3.0 Event',
    image: '/images/certificates/Learnathon.jpeg',
    date: '2025',
    location: 'Brain Station 23'
  },
  {
    id: '2',
    title: 'Research Excellence Workshop',
    image: '/images/certificates/Research_Workshop.jpeg',
    date: '2024',
    location: 'DIU Research Society'
  },
  {
    id: '3',
    title: 'AWS Machine Learning Event',
    image: '/images/certificates/AWS_ML_Foundations.jpg',
    date: '2025',
    location: 'AWS Academy'
  },
  {
    id: '4',
    title: 'WFK Volunteer Meet',
    image: '/images/certificates/WFK_IT_Volunteer.jpg',
    date: '2025',
    location: 'Work For Kids'
  },
  {
    id: '5',
    title: 'Data Analytics Seminar',
    image: '/images/certificates/Data_Crafters.jpeg',
    date: '2024',
    location: 'Microsoft Fabric'
  }
];
