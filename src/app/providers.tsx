'use client';

import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import CartSidebar from '@/components/CartSidebar';
import BottomNav from '@/components/BottomNav';
import WhatsAppButton from '@/components/WhatsAppButton';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
        <CartSidebar />
        <WhatsAppButton />
        <BottomNav />
      </CartProvider>
    </LanguageProvider>
  );
}