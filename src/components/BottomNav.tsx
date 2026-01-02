'use client';

import Link from 'next/link';
import { Home, ShoppingBag, ShoppingCart, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomNav() {
  const { toggleCart, items } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 z-40 md:hidden pb-safe">
      <div className="flex justify-around items-center p-3">
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">{t('nav.home')}</span>
        </Link>

        <Link href="#products" className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-[10px] font-medium">{t('nav.products')}</span>
        </Link>

        <button 
          onClick={toggleCart} 
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition relative"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <span className="text-[10px] font-medium">{t('cart.title')}</span>
        </button>

        <button 
          onClick={toggleLanguage} 
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition"
        >
          <Globe className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase">{language}</span>
        </button>
      </div>
    </div>
  );
}
