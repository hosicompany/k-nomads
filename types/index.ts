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
  title: string;
  stayDuration: string;
  content: string;
  images?: string[];
  createdAt: Date;
  helpful: number;
  helpfulBy: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  cityId: string;
  cityName: string;
  date: Date;
  location: string;
  participants: number;
  maxParticipants: number;
  type: 'meetup' | 'workshop' | 'networking';
  organizer: string;
  organizerId: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  currentCity: string;
  joinedDate: Date;
  reviewCount: number;
  eventCount: number;
}

export interface Comment {
  id: string;
  reviewId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
  parentId?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}
