'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  descriptionAr: string;
  imageUrl: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    const method = isEditing === 'new' ? 'POST' : 'PUT';
    const url = isEditing === 'new' ? '/api/products' : `/api/products/${isEditing}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          // Hardcoding defaults for new fields for now to keep UI simple
          longDescription: formData.description,
          longDescriptionAr: formData.descriptionAr,
          details: [],
          detailsAr: []
        })
      });

      if (res.ok) {
        setIsEditing(null);
        setFormData({});
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={() => {
              setIsEditing('new');
              setFormData({ currency: 'USD', category: 'Gaming' });
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {isEditing && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-900 p-6 rounded-xl border border-blue-500/30 mb-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      placeholder="Name (EN)" 
                      className="bg-gray-800 border border-gray-700 p-2 rounded w-full"
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                      placeholder="Name (AR)" 
                      className="bg-gray-800 border border-gray-700 p-2 rounded w-full"
                      value={formData.nameAr || ''}
                      onChange={e => setFormData({...formData, nameAr: e.target.value})}
                    />
                    <input 
                      placeholder="Price" 
                      type="number"
                      className="bg-gray-800 border border-gray-700 p-2 rounded w-full"
                      value={formData.price || ''}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    />
                    <select 
                      className="bg-gray-800 border border-gray-700 p-2 rounded w-full"
                      value={formData.category || ''}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Gaming">Gaming</option>
                      <option value="Streaming">Streaming</option>
                      <option value="Software">Software</option>
                      <option value="VPN">VPN</option>
                    </select>
                    <textarea 
                      placeholder="Description (EN)" 
                      className="bg-gray-800 border border-gray-700 p-2 rounded w-full md:col-span-2"
                      value={formData.description || ''}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                    <textarea 
                      placeholder="Description (AR)" 
                      className="bg-gray-800 border border-gray-700 p-2 rounded w-full md:col-span-2"
                      value={formData.descriptionAr || ''}
                      onChange={e => setFormData({...formData, descriptionAr: e.target.value})}
                    />
                    <input 
                      placeholder="Image URL" 
                      className="bg-gray-800 border border-gray-700 p-2 rounded w-full md:col-span-2"
                      value={formData.imageUrl || ''}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                      <Save className="w-5 h-5" /> Save
                    </button>
                    <button onClick={() => setIsEditing(null)} className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                      <X className="w-5 h-5" /> Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
              <table className="w-full text-left">
                <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center overflow-hidden">
                          {p.imageUrl ? <img src={p.imageUrl} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-gray-600" />}
                        </div>
                        <div>
                          <p className="font-bold text-white">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.nameAr}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-blue-400 font-bold">${p.price.toFixed(2)}</td>
                      <td className="px-6 py-4"><span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">{p.category}</span></td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => {
                            setIsEditing(p.id);
                            setFormData(p);
                          }}
                          className="p-2 hover:text-blue-500 transition"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-2 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
