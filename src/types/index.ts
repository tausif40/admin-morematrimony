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
  _id: string;
  name: string;
  price: number;
  image: string;
  userDescription: string;
  adminDescription: string;
  duration: string;
  profileLimit: number;
  isActive: boolean;
  Popular: boolean;
  createdAt: string;
  updatedAt: string;
}