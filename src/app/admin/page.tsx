'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import Image from 'next/image';

// Dynamic import for Quill editor to avoid hydration/SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-40 w-full bg-gray-800 animate-pulse rounded-lg" />
});
import 'react-quill-new/dist/quill.snow.css';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  }), []);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) { // 1MB limit for Base64 storage
      alert("Image is too large. Please keep it under 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
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

    // Clean up data
    const { 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id, 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reviews, 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createdAt, 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updatedAt, 
      ...cleanData 
    } = formData;

    const payload = {
      ...cleanData,
      price: Number(formData.price),
      longDescription: formData.longDescription || formData.description || '',
      longDescriptionAr: formData.longDescriptionAr || formData.descriptionAr || '',
      details: formData.details || [],
      detailsAr: formData.detailsAr || [],
      currency: formData.currency || 'USD',
      imageUrl: formData.imageUrl || ''
    };

    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsEditing(null);
        setFormData({});
        await fetchProducts();
        alert('Product saved successfully!');
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error || 'Failed to save'}`);
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
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
              setFormData({ currency: 'USD', category: 'Gaming', description: '', descriptionAr: '' });
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {isLoading && !isEditing ? (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-400">Product Name (English)</label>
                      <input 
                        placeholder="e.g. Steam Wallet $20" 
                        className="bg-gray-800 border border-gray-700 p-3 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-400">Product Name (Arabic)</label>
                      <input 
                        placeholder="مثال: محفظة ستيم 20 دولار" 
                        className="bg-gray-800 border border-gray-700 p-3 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none text-right"
                        value={formData.nameAr || ''}
                        onChange={e => setFormData({...formData, nameAr: e.target.value})}
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-400">Price</label>
                      <input 
                        placeholder="0.00" 
                        type="number"
                        className="bg-gray-800 border border-gray-700 p-3 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.price || ''}
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-400">Category</label>
                      <select 
                        className="bg-gray-800 border border-gray-700 p-3 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.category || ''}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="Gaming">Gaming</option>
                        <option value="Streaming">Streaming</option>
                        <option value="Software">Software</option>
                        <option value="VPN">VPN</option>
                      </select>
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-sm font-medium text-gray-400">Product Image</label>
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="relative w-32 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
                          {formData.imageUrl ? (
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800/50 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 text-gray-500 mb-2" />
                              <p className="text-sm text-gray-500">Click to upload image</p>
                              <p className="text-xs text-gray-600">PNG, JPG, WebP (Max 1MB)</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                          </label>
                          <input 
                            placeholder="Or paste an image URL..." 
                            className="mt-2 bg-gray-800 border border-gray-700 p-2 rounded w-full text-xs"
                            value={formData.imageUrl || ''}
                            onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description Editors */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-sm font-medium text-gray-400">Long Description (English)</label>
                      <div className="bg-white text-black rounded-lg overflow-hidden">
                        <ReactQuill 
                          theme="snow"
                          value={formData.description || ''}
                          onChange={(val) => setFormData({...formData, description: val})}
                          modules={quillModules}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-sm font-medium text-gray-400">Long Description (Arabic)</label>
                      <div className="bg-white text-black rounded-lg overflow-hidden ql-rtl">
                        <ReactQuill 
                          theme="snow"
                          value={formData.descriptionAr || ''}
                          onChange={(val) => setFormData({...formData, descriptionAr: val})}
                          modules={quillModules}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8 border-t border-gray-800 pt-6">
                    <button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition disabled:opacity-50">
                      {isLoading ? <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <Save className="w-5 h-5" />}
                      Save Product
                    </button>
                    <button onClick={() => setIsEditing(null)} className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition">
                      <X className="w-5 h-5" /> Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
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
                        <div className="relative w-10 h-10 rounded bg-gray-800 flex items-center justify-center overflow-hidden">
                          {p.imageUrl ? (
                            <Image src={p.imageUrl} alt="" fill className="object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-600" />
                          )}
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
      
      {/* Fix for Quill directionality */}
      <style jsx global>{`
        .ql-rtl {
          direction: rtl;
          text-align: right;
        }
        .ql-editor {
          min-height: 150px;
        }
      `}</style>
    </div>
  );
}
