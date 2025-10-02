export interface City {
  id: string;
  rank: number;
  name: string;
  nameEn: string;
  slug: string;
  image: string;
  rating: number;
  lovePercentage: number;
  activeNomads: number;
  ratings: {
    cafe: number;
    housing: number;
    transportation: number;
    food: number;
    nature: number;
  };
  costOfLiving: {
    min: number;
    max: number;
  };
  internetSpeed: number;
  cafes24h: number;
  weather: {
    temp: number;
    condition: string;
  };
}

export interface Review {
  id: string;
  cityId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  stayDuration: string;
  content: string;
  createdAt: Date;
  helpful: number;
}

export interface Event {
  id: string;
  title: string;
  cityId: string;
  cityName: string;
  date: Date;
  participants: number;
  maxParticipants: number;
  type: 'meetup' | 'workshop' | 'networking';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  currentCity: string;
  joinedDate: Date;
}
