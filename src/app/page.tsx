import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Instant Digital <span className="text-blue-500">Codes</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Securely purchase gift cards, software keys, and subscriptions. 
              Delivered directly to your chat.
            </p>
            <a 
              href="#products" 
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Browse Catalog
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 px-4 container mx-auto">
          <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-4">
            <h2 className="text-3xl font-bold text-white">Latest Products</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}