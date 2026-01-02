export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  currency: string;
  category: 'Gaming' | 'Streaming' | 'Software' | 'VPN';
  description: string; // Short description for card
  descriptionAr?: string;
  longDescription: string; // Detailed description for page
  longDescriptionAr?: string;
  details: string[]; // Key features/instructions
  detailsAr?: string[];
  imageUrl: string;
  reviews: Review[];
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
    longDescription: 'Steam Gift Cards and Wallet Codes are an easy way to put money into your own Steam Wallet or give the perfect gift of games to your friend or family member.',
    longDescriptionAr: 'بطاقات هدايا ستيم وأكواد المحفظة هي طريقة سهلة لإضافة رصيد لمحفظة ستيم الخاصة بك أو تقديم هدية مثالية من الألعاب لأصدقائك أو عائلتك.',
    details: [
      'Valid for US Steam accounts.',
      'Instant digital delivery via chat.',
      'No expiration date.',
      'Redeemable on PC, Mac, and Linux.'
    ],
    detailsAr: [
      'صالح لحسابات ستيم الأمريكية.',
      'تسليم رقمي فوري عبر الشات.',
      'بدون تاريخ انتهاء صلاحية.',
      'قابل للاسترداد على الكمبيوتر، ماك، ولينكس.'
    ],
    imageUrl: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Steam+Wallet',
    reviews: [
      { id: 'r1', user: 'Ahmed Ali', rating: 5, comment: 'Fast delivery, worked perfectly!', date: '2025-12-10' },
      { id: 'r2', user: 'Gamer123', rating: 5, comment: 'Trusted seller.', date: '2025-12-12' }
    ]
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
    longDescription: 'The PlayStation Store Card allows you to download the latest games, DLC, movies, and more from the PlayStation Network.',
    longDescriptionAr: 'بطاقة متجر بلاي ستيشن تسمح لك بتحميل أحدث الألعاب، الإضافات، الأفلام، والمزيد من شبكة بلاي ستيشن.',
    details: [
      'Region: USA accounts only.',
      'Compatible with PS4 and PS5.',
      'Code delivered instantly.'
    ],
    detailsAr: [
      'المنطقة: حسابات أمريكية فقط.',
      'متوافق مع PS4 و PS5.',
      'يتم تسليم الكود فوراً.'
    ],
    imageUrl: 'https://placehold.co/400x300/003087/ffffff?text=PSN+Card',
    reviews: [
      { id: 'r1', user: 'Sarah M.', rating: 4, comment: 'Good price.', date: '2025-11-05' }
    ]
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
    longDescription: 'Enjoy unlimited movies, TV shows, and mobile games. Watch anywhere, anytime, in 4K UHD quality.',
    longDescriptionAr: 'استمتع بأفلام، وعروض تلفزيونية، وألعاب موبايل غير محدودة. شاهد في أي وقت وأي مكان بجودة 4K UHD.',
    details: [
      'Private profile.',
      '4K UHD Quality.',
      'Works on all devices.',
      '30 days warranty.'
    ],
    detailsAr: [
      'بروفايل خاص.',
      'جودة 4K UHD.',
      'يعمل على جميع الأجهزة.',
      'ضمان 30 يوم.'
    ],
    imageUrl: 'https://placehold.co/400x300/e50914/ffffff?text=Netflix',
    reviews: [
      { id: 'r1', user: 'MovieBuff', rating: 5, comment: 'No interruptions, amazing quality.', date: '2025-10-20' }
    ]
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
    longDescription: 'Listen to your favorite music without ads. Download songs for offline listening and enjoy high-quality audio.',
    longDescriptionAr: 'اسمع أغانيك المفضلة من غير إعلانات. نزل الأغاني واسمعها أوفلاين واستمتع بصوت عالي الجودة.',
    details: [
      'Individual plan upgrade.',
      'No ads.',
      'Offline listening.',
      'Works on your existing account.'
    ],
    detailsAr: [
      'ترقية لخطة فردية.',
      'بدون إعلانات.',
      'استماع أوفلاين.',
      'يعمل على حسابك الحالي.'
    ],
    imageUrl: 'https://placehold.co/400x300/1db954/ffffff?text=Spotify',
    reviews: []
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
    longDescription: 'Protect your online privacy and security with NordVPN. Access global content and browse safely on public Wi-Fi.',
    longDescriptionAr: 'احمي خصوصيتك وأمانك اونلاين مع NordVPN. ادخل على محتوى عالمي وتصفح بأمان على الواي فاي العام.',
    details: [
      'Connect up to 6 devices.',
      'Fastest VPN experience.',
      'No-logs policy.',
      'Global server access.'
    ],
    detailsAr: [
      'اتصل بـ 6 أجهزة في نفس الوقت.',
      'أسرع تجربة VPN.',
      'سياسة عدم الاحتفاظ بالسجلات.',
      'وصول لسيرفرات عالمية.'
    ],
    imageUrl: 'https://placehold.co/400x300/4687ff/ffffff?text=NordVPN',
    reviews: [
        { id: 'r1', user: 'TechGuy', rating: 5, comment: 'Essential for privacy.', date: '2025-11-15' }
    ]
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
    longDescription: 'Genuine retail key for Windows 11 Professional. Unlocks all features including BitLocker, Remote Desktop, and more.',
    longDescriptionAr: 'مفتاح ريتيل أصلي لويندوز 11 بروفيشنال. بيفتح كل المميزات بما فيها BitLocker وسطح المكتب البعيد وغيرها.',
    details: [
      'Lifetime activation.',
      'Global key.',
      'Supports all languages.',
      'Online activation.'
    ],
    detailsAr: [
      'تفعيل مدى الحياة.',
      'مفتاح عالمي.',
      'يدعم جميع اللغات.',
      'تفعيل أونلاين.'
    ],
    imageUrl: 'https://placehold.co/400x300/0078d4/ffffff?text=Win+11+Pro',
    reviews: [
         { id: 'r1', user: 'PCBuilder', rating: 5, comment: 'Worked instantly.', date: '2025-12-01' },
         { id: 'r2', user: 'User99', rating: 4, comment: 'Good support.', date: '2025-12-02' }
    ]
  },
];