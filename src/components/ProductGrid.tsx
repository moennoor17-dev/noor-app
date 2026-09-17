import React from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Search, 
  ArrowUpDown,
  Sparkles,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryType } from '../types';

interface ProductGridProps {
  sectionType?: 'featured' | 'bestsellers' | 'newarrivals' | 'catalog';
  title?: string;
  subtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  sectionType = 'catalog',
  title,
  subtitle
}) => {
  const { 
    products, 
    filter, 
    setFilter, 
    resetFilters,
    setCurrentView 
  } = useStore();

  // Extract all unique brands for filter sidebar
  const allBrands = (Array.from(new Set(products.map(p => p.brand))) as string[]).sort();

  const categories: CategoryType[] = [
    'All',
    'Smartphones',
    'Laptops',
    'Audio',
    'Wearables',
    'Gaming',
    'Keyboards & Mice',
    'Power & Charging',
    'Smart Home'
  ];

  // Filter products according to active filters
  let filteredProducts = products.filter(product => {
    // Section type specific filtering
    if (sectionType === 'featured' && !product.isFeatured) return false;
    if (sectionType === 'bestsellers' && !product.isBestSeller) return false;
    if (sectionType === 'newarrivals' && !product.isNewArrival) return false;

    // Search query
    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCat) return false;
    }

    // Category
    if (filter.selectedCategory !== 'All' && product.category !== filter.selectedCategory) {
      return false;
    }

    // Brands
    if (filter.selectedBrands.length > 0 && !filter.selectedBrands.includes(product.brand)) {
      return false;
    }

    // Price range
    if (product.price < filter.priceRange[0] || product.price > filter.priceRange[1]) {
      return false;
    }

    // Min rating
    if (filter.minRating > 0 && product.rating < filter.minRating) {
      return false;
    }

    // In-stock
    if (filter.inStockOnly && product.stock <= 0) {
      return false;
    }

    return true;
  });

  // Sort
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (filter.sortBy === 'price-low') return a.price - b.price;
    if (filter.sortBy === 'price-high') return b.price - a.price;
    if (filter.sortBy === 'rating') return b.rating - a.rating;
    if (filter.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    // popularity default
    return b.reviewCount - a.reviewCount;
  });

  const handleBrandToggle = (brand: string) => {
    setFilter(prev => {
      const exists = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: exists 
          ? prev.selectedBrands.filter(b => b !== brand) 
          : [...prev.selectedBrands, brand]
      };
    });
  };

  // If this is a homepage section (e.g. Featured, Best Sellers, New Arrivals)
  if (sectionType !== 'catalog') {
    const displayProducts = filteredProducts.slice(0, 8);

    let defaultTitle = 'Featured Products';
    let icon = <Sparkles className="w-5 h-5 text-blue-600" />;
    if (sectionType === 'bestsellers') {
      defaultTitle = 'Best-Selling Gadgets';
      icon = <TrendingUp className="w-5 h-5 text-emerald-600" />;
    } else if (sectionType === 'newarrivals') {
      defaultTitle = 'New Arrivals & Launches';
      icon = <PackageCheck className="w-5 h-5 text-indigo-600" />;
    }

    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
              {icon}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {title || defaultTitle}
              </h2>
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setCurrentView('catalog')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            View More ({filteredProducts.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  }

  // Otherwise, render the FULL CATALOG VIEW with interactive filters
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {filter.selectedCategory === 'All' ? 'All Gadgets & Electronics' : filter.selectedCategory}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Showing <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> authentic devices available for immediate delivery
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sort by:</span>
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
            >
              <option value="popularity" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Most Popular</option>
              <option value="price-low" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Price: Low to High</option>
              <option value="price-high" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Price: High to Low</option>
              <option value="rating" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Highest Rated</option>
              <option value="newest" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Newest Arrivals</option>
            </select>
          </div>

          {(filter.selectedCategory !== 'All' || filter.selectedBrands.length > 0 || filter.searchQuery || filter.inStockOnly || filter.minRating > 0) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 rounded-xl hover:bg-rose-100 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filters Sidebar */}
        <aside className="lg:col-span-3 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </div>
            <button 
              onClick={resetFilters}
              className="text-[11px] font-semibold text-slate-400 hover:text-blue-600"
            >
              Clear All
            </button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Category
            </h4>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(prev => ({ ...prev, selectedCategory: cat }))}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    filter.selectedCategory === cat 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] text-slate-400">
                    {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Brands
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {allBrands.map(brand => {
                const checked = filter.selectedBrands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2 px-1 py-1 text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="flex-1">{brand}</span>
                    <span className="text-[10px] text-slate-400">
                      {products.filter(p => p.brand === brand).length}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Max Price
              </h4>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {formatBDT(filter.priceRange[1])}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="450000"
              step="5000"
              value={filter.priceRange[1]}
              onChange={(e) => setFilter(prev => ({ ...prev, priceRange: [0, Number(e.target.value)] }))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>৳5,000</span>
              <span>৳4,50,000+</span>
            </div>
          </div>

          {/* Stock Filter */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filter.inStockOnly}
                onChange={(e) => setFilter(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                In-Stock Gadgets Only
              </span>
            </label>
          </div>

          {/* Rating Filter */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Minimum Rating
            </h4>
            <div className="space-y-1">
              {[4.8, 4.5, 4.0, 0].map(rating => (
                <button
                  key={rating}
                  onClick={() => setFilter(prev => ({ ...prev, minRating: rating }))}
                  className={`w-full text-left px-2 py-1 rounded text-xs transition-colors flex items-center justify-between ${
                    filter.minRating === rating 
                      ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{rating === 0 ? 'All Ratings' : `★ ${rating} & above`}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Products Area */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No gadgets found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                No products match your current filter criteria. Try resetting the filters or searching for something else.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
