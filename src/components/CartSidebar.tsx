'use client';

import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Trash2, ShoppingBag, MessageCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar() {
  const { items, removeFromCart, cartTotal, isCartOpen, toggleCart } = useCart();
  const { language, t, direction } = useLanguage();

  const facebookPageId = "61585370096616"; 
  const redditUsername = "ManyLatter631"; 

  const generateMessage = () => {
    let message = "Hello, I would like to purchase the following:\n\n";
    items.forEach((item) => {
      const name = language === 'ar' ? item.nameAr || item.name : item.name;
      message += `- ${name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nTotal Price: $${cartTotal.toFixed(2)}`;
    return encodeURIComponent(message);
  };

  const message = generateMessage();
  const facebookLink = `https://m.me/${facebookPageId}`; 
  const redditLink = `https://www.reddit.com/message/compose?to=${redditUsername}&subject=New%20Order&message=${message}`;

  const copyToClipboard = () => {
     const text = decodeURIComponent(message);
     navigator.clipboard.writeText(text);
     alert("Order details copied to clipboard!");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-40"
          />
          
          {/* Sidebar */}
          <motion.div 
            initial={{ x: direction === 'rtl' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: direction === 'rtl' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 h-full w-full md:max-w-md bg-gray-900 border-l border-r border-gray-800 shadow-2xl z-50 flex flex-col ${direction === 'rtl' ? 'left-0' : 'right-0'}`}
          >
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                {t('cart.title')}
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-800 rounded-full transition text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p>{t('cart.empty')}</p>
                  <button onClick={toggleCart} className="text-blue-500 hover:underline">
                    {t('cart.start')}
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700"
                  >
                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 text-start">
                      <h4 className="font-semibold text-gray-200 text-sm">
                        {language === 'ar' ? item.nameAr || item.name : item.name}
                      </h4>
                      <p className="text-blue-400 font-bold text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-gray-900 border-t border-gray-800 space-y-4">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-400">{t('cart.total')}</span>
                  <span className="text-3xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                </div>

                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-sm text-blue-200 mb-4">
                  <p className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t('cart.checkout')}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={facebookLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white py-3 px-4 rounded-lg font-semibold transition transform active:scale-95"
                  >
                     Facebook <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href={redditLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#FF4500] hover:bg-[#e03d00] text-white py-3 px-4 rounded-lg font-semibold transition transform active:scale-95"
                  >
                     Reddit <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="w-full text-xs text-gray-500 hover:text-gray-300 underline text-center"
                >
                  {t('cart.copy')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}