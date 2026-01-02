'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingCart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { toggleCart, items } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-white border-b border-gray-800 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 transition transform group-hover:scale-105">
             <Image 
               src="/logo.png" 
               alt="Digital Coshk Logo" 
               fill
               className="object-contain"
             />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition hidden sm:block">
            Digital Coshk
          </span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition text-sm font-medium">{t('nav.home')}</Link>
            <Link href="#products" className="hover:text-blue-400 transition text-sm font-medium">{t('nav.products')}</Link>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-800 rounded-full transition text-gray-400 hover:text-white flex items-center gap-1"
              title="Switch Language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>

            <button 
              onClick={toggleCart} 
              className="relative p-2 hover:bg-gray-800 rounded-full transition group"
            >
              <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-white" />
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
