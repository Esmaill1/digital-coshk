export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  currency: string;
  category: "Gaming" | "Streaming" | "Software" | "VPN" | string;
  description: string;
  descriptionAr?: string;
  longDescription: string;
  longDescriptionAr?: string;
  details: string[];
  detailsAr: string[];
  imageUrl: string;
  reviews: Review[];
  createdAt?: string;
  updatedAt?: string;
}
