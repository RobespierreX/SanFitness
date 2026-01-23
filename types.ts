
export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  sex?: string;
  age?: number;
  weight?: number;
  height?: number;
  district?: string;
}

export interface MetabolicData {
  score: number;
  glucose: number;
  sleep: string;
  hrv: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  parts?: any[];
}

export interface GroundingSource {
  title: string;
  uri: string;
}
