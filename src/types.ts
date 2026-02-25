export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  image: string;
  text: string;
}
