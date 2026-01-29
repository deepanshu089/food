
'use client';
import { MenuItem } from '@/lib/store';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <div>
                 <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full mb-2 inline-block">
                    {item.category}
                </span>
                <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
            </div>
            <span className="font-bold text-lg text-gray-900">${item.price}</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{item.description}</p>
        
        <button 
          onClick={() => addToCart(item)}
          className="w-full bg-gray-900 text-white py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 active:scale-95 duration-200"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
