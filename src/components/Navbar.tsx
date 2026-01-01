import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500 tracking-tighter hover:text-blue-400 transition">
          Digital Coshk
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="#products" className="hover:text-blue-400 transition">Products</Link>
          <Link href="#contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
