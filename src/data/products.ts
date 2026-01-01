export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: 'Gaming' | 'Streaming' | 'Software' | 'VPN';
  description: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Steam Wallet $20',
    price: 22.00,
    currency: 'USD',
    category: 'Gaming',
    description: 'Add funds to your Steam Wallet. Instant delivery.',
    imageUrl: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Steam+Wallet',
  },
  {
    id: '2',
    name: 'PlayStation Store $25',
    price: 27.50,
    currency: 'USD',
    category: 'Gaming',
    description: 'Buy games, add-ons, and more on PlayStation Store.',
    imageUrl: 'https://placehold.co/400x300/003087/ffffff?text=PSN+Card',
  },
  {
    id: '3',
    name: 'Netflix Premium (1 Month)',
    price: 15.00,
    currency: 'USD',
    category: 'Streaming',
    description: '4K Ultra HD streaming for 1 month.',
    imageUrl: 'https://placehold.co/400x300/e50914/ffffff?text=Netflix',
  },
  {
    id: '4',
    name: 'Spotify Premium (3 Months)',
    price: 30.00,
    currency: 'USD',
    category: 'Streaming',
    description: 'Ad-free music listening for 3 months.',
    imageUrl: 'https://placehold.co/400x300/1db954/ffffff?text=Spotify',
  },
  {
    id: '5',
    name: 'NordVPN (1 Year)',
    price: 60.00,
    currency: 'USD',
    category: 'VPN',
    description: 'Secure internet access for 1 year.',
    imageUrl: 'https://placehold.co/400x300/4687ff/ffffff?text=NordVPN',
  },
  {
    id: '6',
    name: 'Windows 11 Pro Key',
    price: 15.00,
    currency: 'USD',
    category: 'Software',
    description: 'Activation key for Windows 11 Pro.',
    imageUrl: 'https://placehold.co/400x300/0078d4/ffffff?text=Win+11+Pro',
  },
];
