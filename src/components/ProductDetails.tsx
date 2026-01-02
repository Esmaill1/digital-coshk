'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Check, Star, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProductDetails({ id }: { id: string }) {
  const { addToCart } = useCart();
  const { language, t, direction } = useLanguage();
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (!found) {
      notFound();
    }
    setProduct(found);
  }, [id]);

  if (!product) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const name = language === 'ar' ? product.nameAr || product.name : product.name;
  const description = language === 'ar' ? product.longDescriptionAr || product.description : product.longDescription;
  const details = language === 'ar' ? product.detailsAr || product.details : product.details;
  
  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-10 md:py-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
        >
          <BackIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform rtl:group-hover:translate-x-1" />
          {t('nav.home')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <Image 
              src={product.imageUrl} 
              alt={name}
              fill
              className="object-cover"
              priority
            />
             <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-sm font-bold px-3 py-1.5 rounded-full border border-white/10">
              {product.category}
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex flex-col"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
               <div className="flex text-yellow-500">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'text-gray-600'}`} />
                 ))}
               </div>
               <span className="text-gray-400 text-sm">({product.reviews.length} {t('product.reviews')})</span>
            </div>

            <p className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              <span className="text-3xl">{product.currency} {product.price.toFixed(2)}</span>
            </p>

            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              {description}
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl mb-10 ${
                isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-6 h-6" /> {t('product.added')}
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> {t('product.add')}
                </>
              )}
            </motion.button>

            <div className="bg-blue-900/10 border border-blue-900/30 rounded-xl p-6 mb-8">
               <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                 <Info className="w-5 h-5" />
                 {t('product.important')}
               </h3>
               <ul className="space-y-3">
                 {details && details.map((detail, index) => (
                   <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                     <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                     {detail}
                   </li>
                 ))}
               </ul>
            </div>
          </motion.div>
        </div>

        <section className="mt-20 border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-8">{t('product.reviews')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-white">{review.user}</h4>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm italic">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">{t('product.noreviews')}</p>
            )}
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
