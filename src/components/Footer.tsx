export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12" id="contact">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-white text-lg font-bold mb-4">Digital Coshk</h3>
        <p className="mb-4">Premium digital codes delivered instantly.</p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="hover:text-blue-500 transition">Facebook</a>
          <a href="#" className="hover:text-orange-500 transition">Reddit</a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Digital Coshk. All rights reserved.</p>
      </div>
    </footer>
  );
}
