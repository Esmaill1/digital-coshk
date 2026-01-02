'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicking button inside link (if nested, but we won't nest)
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const name = language === 'ar' ? product.nameAr || product.name : product.name;
  const description = language === 'ar' ? product.descriptionAr || product.description : product.description;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col h-full group"
    >
      <Link href={`/product/${product.id}`} className="block h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={product.imageUrl} 
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded border border-white/10">
            {product.category}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow relative text-start">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition">{name}</h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">{description}</p>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-auto gap-3">
            <div>
              <span className="text-xs text-gray-500 block">{t('product.price')}</span>
              <span className="text-2xl font-bold text-blue-400">
                {product.currency} {product.price.toFixed(2)}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg z-10 ${
                isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" /> {t('product.added')}
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" /> {t('product.add')}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
