'use client';

// Force redeploy - v1.0.1
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Zap, Shield, Gift } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';

export default function Home() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load products. Please check your database connection.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main>
        {/* ... Hero Section ... */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          {/* Background Gradient Blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="#products" 
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold py-4 px-10 rounded-full transition transform hover:scale-105 shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50"
              >
                {t('hero.cta')}
              </a>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
            >
              {[
                { icon: Zap, title: t('features.instant'), desc: t('features.instant.desc') },
                { icon: Shield, title: t('features.secure'), desc: t('features.secure.desc') },
                { icon: Gift, title: t('features.selection'), desc: t('features.selection.desc') },
              ].map((feature, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:bg-gray-800/80 transition duration-300">
                  <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-400">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 px-4 container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{t('products.latest')}</h2>
              <p className="text-gray-400">{t('products.subtitle')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-20 text-red-400 bg-red-900/10 rounded-xl border border-red-900/20">
                {error}
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                No products found in the database.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}