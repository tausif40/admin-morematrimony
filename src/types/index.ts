export interface User {
  id: string;
  name: string;
  email: string;
  membershipType: 'free' | 'premium';
  status: 'active' | 'blocked';
  lastLogin: string;
  joinedDate: string;
  profileComplete: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  isPopular: boolean;
}