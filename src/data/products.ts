export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  currency: string;
  category: 'Gaming' | 'Streaming' | 'Software' | 'VPN';
  description: string;
  descriptionAr?: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Steam Wallet $20',
    nameAr: 'محفظة ستيم 20 دولار',
    price: 22.00,
    currency: 'USD',
    category: 'Gaming',
    description: 'Add funds to your Steam Wallet. Instant delivery.',
    descriptionAr: 'اشحن رصيد ستيم بتاعك. بيوصلك حالاً.',
    imageUrl: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Steam+Wallet',
  },
  {
    id: '2',
    name: 'PlayStation Store $25',
    nameAr: 'كارت بلاي ستيشن 25 دولار',
    price: 27.50,
    currency: 'USD',
    category: 'Gaming',
    description: 'Buy games, add-ons, and more on PlayStation Store.',
    descriptionAr: 'اشتري ألعاب وإضافات وحاجات تانية كتير من الستور.',
    imageUrl: 'https://placehold.co/400x300/003087/ffffff?text=PSN+Card',
  },
  {
    id: '3',
    name: 'Netflix Premium (1 Month)',
    nameAr: 'نتفليكس بريميوم (شهر)',
    price: 15.00,
    currency: 'USD',
    category: 'Streaming',
    description: '4K Ultra HD streaming for 1 month.',
    descriptionAr: 'اتفرج براحتك بجودة 4K لمدة شهر كامل.',
    imageUrl: 'https://placehold.co/400x300/e50914/ffffff?text=Netflix',
  },
  {
    id: '4',
    name: 'Spotify Premium (3 Months)',
    nameAr: 'سبوتيفاي بريميوم (3 شهور)',
    price: 30.00,
    currency: 'USD',
    category: 'Streaming',
    description: 'Ad-free music listening for 3 months.',
    descriptionAr: 'اسمع مزيكا من غير إعلانات ومقاطعة لمدة 3 شهور.',
    imageUrl: 'https://placehold.co/400x300/1db954/ffffff?text=Spotify',
  },
  {
    id: '5',
    name: 'NordVPN (1 Year)',
    nameAr: 'نورد في بي إن (سنة)',
    price: 60.00,
    currency: 'USD',
    category: 'VPN',
    description: 'Secure internet access for 1 year.',
    descriptionAr: 'أمن نفسك عالنت وتصفح بخصوصية لمدة سنة.',
    imageUrl: 'https://placehold.co/400x300/4687ff/ffffff?text=NordVPN',
  },
  {
    id: '6',
    name: 'Windows 11 Pro Key',
    nameAr: 'مفتاح ويندوز 11 برو',
    price: 15.00,
    currency: 'USD',
    category: 'Software',
    description: 'Activation key for Windows 11 Pro.',
    descriptionAr: 'سيريال أصلي لتفعيل ويندوز 11 برو.',
    imageUrl: 'https://placehold.co/400x300/0078d4/ffffff?text=Win+11+Pro',
  },
];
