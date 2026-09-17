import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Gamepad2, 
  Keyboard, 
  BatteryCharging, 
  Home 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryType } from '../types';

interface CategoryCardItem {
  name: CategoryType;
  icon: React.ReactNode;
  description: string;
  image: string;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    name: 'Smartphones',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'iPhones, Galaxy, Pixels',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Laptops',
    icon: <Laptop className="w-5 h-5" />,
    description: 'MacBooks, ROG, XPS',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Audio',
    icon: <Headphones className="w-5 h-5" />,
    description: 'Sony, Bose, AirPods',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Wearables',
    icon: <Watch className="w-5 h-5" />,
    description: 'Apple Watch, Galaxy, Garmin',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Gaming',
    icon: <Gamepad2 className="w-5 h-5" />,
    description: 'Controllers, Mice, Gear',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Keyboards & Mice',
    icon: <Keyboard className="w-5 h-5" />,
    description: 'MX Master, Keychron Q1',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Power & Charging',
    icon: <BatteryCharging className="w-5 h-5" />,
    description: 'Anker GaN, Baseus, PD',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Smart Home',
    icon: <Home className="w-5 h-5" />,
    description: 'Air Purifiers, IoT Gadgets',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=80'
  }
];

export const CategoryShowcase: React.FC = () => {
  const { products, setFilter, setCurrentView } = useStore();

  const handleSelectCategory = (catName: CategoryType) => {
    setFilter(prev => ({ ...prev, selectedCategory: catName }));
    setCurrentView('catalog');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Top Departments
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Categories
          </h2>
        </div>
        <button
          onClick={() => {
            setFilter(prev => ({ ...prev, selectedCategory: 'All' }));
            setCurrentView('catalog');
          }}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          View All Products →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const count = products.filter(p => p.category === cat.name).length;
          return (
            <div
              key={cat.name}
              onClick={() => handleSelectCategory(cat.name)}
              className="group cursor-pointer rounded-2xl p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500/50 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-2.5 relative border border-slate-100 dark:border-slate-700">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors"></div>
              </div>

              <div className="flex items-center gap-1 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                <span className="text-xs font-bold leading-tight truncate">{cat.name}</span>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
