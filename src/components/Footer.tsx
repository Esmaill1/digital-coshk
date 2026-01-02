'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12 border-t border-gray-800" id="contact">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-white text-lg font-bold mb-4">Digital Coshk</h3>
        <p className="mb-4">{t('footer.desc')}</p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="hover:text-blue-500 transition">Facebook</a>
          <a href="#" className="hover:text-orange-500 transition">Reddit</a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Digital Coshk. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}