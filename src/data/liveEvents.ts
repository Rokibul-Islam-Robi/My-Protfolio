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
    image: '/images/live-events/picture1.jpeg',
    date: '2025',
    location: 'Brain Station 23'
  },
  {
    id: '2',
    title: 'Research Excellence Workshop',
    image: '/images/live-events/picture2.jpeg',
    date: '2024',
    location: 'DIU Research Society'
  },
  {
    id: '3',
    title: 'AWS Machine Learning Event',
    image: '/images/live-events/picture3.jpeg',
    date: '2025',
    location: 'AWS Academy'
  },
  {
    id: '4',
    title: 'WFK Volunteer Meet',
    image: '/images/live-events/picture4.jpeg',
    date: '2025',
    location: 'Work For Kids'
  },
  {
    id: '5',
    title: 'Data Analytics Seminar',
    image: '/images/live-events/picture5.jpeg',
    date: '2024',
    location: 'Microsoft Fabric'
  }
];
