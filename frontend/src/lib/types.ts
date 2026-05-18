export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  old?: number;
  cat: string;
  colorways: string[];
  tag?: string;
  story: string;
  specs: string[];
  images?: string[];
}

export interface Kit {
  id: string;
  name: string;
  items: string[];
  price: number;
  old: number;
  desc: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  desc: string;
}

export interface Review {
  who: string;
  city: string;
  text: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}
