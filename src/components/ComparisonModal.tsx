import React from 'react';
import { X, Scale, ShoppingCart, Trash2, Check, ArrowRight } from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';

export const ComparisonModal: React.FC = () => {
  const { 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    products, 
    addToCart, 
    openProductDetails,
    setCurrentView
  } = useStore();

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Compare Gadgets
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Side-by-side specifications and price comparison ({comparedProducts.length} of 4 selected)
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 transition-colors"
            >
              Clear Comparison
            </button>
            <button
              onClick={() => setCurrentView('catalog')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              + Add More Gadgets
            </button>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            No gadgets in comparison table
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Click the compare balance icon on any product card in the catalog to compare up to 4 devices side by side.
          </p>
          <button
            onClick={() => setCurrentView('catalog')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Browse Gadgets to Compare
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-44">
                  Feature / Spec
                </th>
                {comparedProducts.map(product => (
                  <th key={product.id} className="p-4 w-64 min-w-[220px]">
                    <div className="relative space-y-2">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-1 -right-1 p-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-xl border border-slate-200 dark:border-slate-700 mx-auto cursor-pointer"
                        onClick={() => openProductDetails(product)}
                      />

                      <div className="text-center">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">
                          {product.brand}
                        </span>
                        <h4 
                          onClick={() => openProductDetails(product)}
                          className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <div className="mt-1 font-black text-sm text-slate-900 dark:text-white">
                          {formatBDT(product.price)}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-850">Category</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 text-slate-800 dark:text-slate-200 font-medium">
                    {p.category}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-850">Rating & Reviews</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 text-slate-800 dark:text-slate-200 font-medium">
                    ★ {p.rating} ({p.reviewCount} reviews)
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-850">Stock Availability</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4">
                    {p.stock > 0 ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> In Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="text-rose-600 font-bold">Out of Stock</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-850">Official Warranty</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 text-slate-800 dark:text-slate-200">
                    {p.warranty}
                  </td>
                ))}
              </tr>

              {/* Dynamic Specs rows comparison */}
              {['Display', 'Processor', 'Battery', 'Weight'].map(specKey => (
                <tr key={specKey}>
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-850">{specKey}</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-4 text-slate-700 dark:text-slate-300">
                      {p.specs[specKey] || '—'}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50 dark:bg-slate-850">Key Highlight</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 text-slate-600 dark:text-slate-400 italic">
                    {p.features[0] || p.description.slice(0, 70) + '...'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
