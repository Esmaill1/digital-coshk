import Image from 'next/image';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const message = `Hello, I would like to purchase ${product.name} for ${product.price} ${product.currency}.`;
  
  // Replace these with your actual usernames
  const facebookPageId = "esmaill1"; // Example: Your page or username
  const redditUsername = "esmaill1"; 

  const redditLink = `https://www.reddit.com/message/compose?to=${redditUsername}&subject=Purchase%20Inquiry&message=${encodeURIComponent(message)}`;
  const facebookLink = `https://m.me/${facebookPageId}`; // Note: pre-fill is tricky on simple m.me links

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-700 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {product.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
        
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-400">
            {product.currency} {product.price.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2">
          <a 
            href={facebookLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Buy via Facebook
          </a>
          <a 
            href={redditLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Buy via Reddit
          </a>
        </div>
      </div>
    </div>
  );
}
