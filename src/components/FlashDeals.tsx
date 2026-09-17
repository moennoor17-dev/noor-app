import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const FlashDeals: React.FC = () => {
  const { products, setCurrentView } = useStore();

  // Simulated countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.isSpecialOffer || p.discountPercent >= 12).slice(0, 4);

  if (dealProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-blue-500/10 dark:from-rose-950/30 dark:via-purple-950/20 dark:to-blue-950/30 rounded-3xl p-6 sm:p-8 border border-rose-200/50 dark:border-rose-900/30">
        
        {/* Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase text-rose-600 dark:text-rose-400">
                  Limited Time Offers
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
                  SAVE UP TO 20%
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Flash Mega Deals
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-850/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 self-start md:self-auto">
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 text-xs font-semibold">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>Ends in:</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-sm font-black text-slate-900 dark:text-white">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-750 rounded-lg">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-750 rounded-lg">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="px-2 py-1 bg-rose-600 text-white rounded-lg animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dealProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentView('catalog')}
            className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
          >
            <span>Explore all discount promotions in Bangladesh</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
