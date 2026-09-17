import React, { useState } from 'react';
import { X, Star, ShoppingCart, Zap, Check, ArrowRight } from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';
import { ProductVariant } from '../types';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    buyNow, 
    openProductDetails 
  } = useStore();

  if (!quickViewProduct) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    quickViewProduct.variants.length > 0 ? quickViewProduct.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12">
          
          {/* Product Image */}
          <div className="sm:col-span-5 bg-slate-50 dark:bg-slate-850 p-6 flex items-center justify-center relative">
            <img
              src={quickViewProduct.imageUrl}
              alt={quickViewProduct.name}
              className="w-full max-h-64 object-contain rounded-xl"
            />
            {quickViewProduct.discountPercent > 0 && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                {quickViewProduct.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Details */}
          <div className="sm:col-span-7 p-6 space-y-3.5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {quickViewProduct.brand} • {quickViewProduct.category}
              </span>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{quickViewProduct.rating}</span>
                <span className="text-slate-400 text-xs">({quickViewProduct.reviewCount} reviews)</span>
                <span className="text-emerald-600 text-xs font-semibold flex items-center gap-0.5 ml-auto">
                  <Check className="w-3 h-3" /> In Stock ({quickViewProduct.stock})
                </span>
              </div>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {formatBDT(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatBDT(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Variants */}
              {quickViewProduct.variants.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                    Select Variant:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.variants.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${
                          selectedVariant?.id === v.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, quantity, selectedVariant);
                    closeQuickView();
                  }}
                  className="py-2.5 px-3 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    buyNow(quickViewProduct, quantity, selectedVariant);
                    closeQuickView();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                onClick={() => {
                  closeQuickView();
                  openProductDetails(quickViewProduct);
                }}
                className="w-full text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1 flex items-center justify-center gap-1"
              >
                <span>View full specifications & warranty</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
