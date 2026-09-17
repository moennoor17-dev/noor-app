import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Scale, 
  User as UserIcon, 
  Sun, 
  Moon, 
  ShieldCheck, 
  PhoneCall, 
  Truck, 
  ChevronDown, 
  Menu, 
  X,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Gamepad2,
  Keyboard,
  BatteryCharging,
  Home,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';
import { CategoryType } from '../types';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const {
    products,
    cartCount,
    cartSubtotal,
    wishlist,
    compareList,
    theme,
    toggleTheme,
    user,
    signOutApp,
    signInDemo,
    setIsCartDrawerOpen,
    currentView,
    setCurrentView,
    filter,
    setFilter,
    openProductDetails
  } = useStore();

  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for instant search suggestions
  const searchSuggestions = filter.searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(filter.searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const categories: { name: CategoryType; icon: React.ReactNode }[] = [
    { name: 'Smartphones', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Laptops', icon: <Laptop className="w-4 h-4" /> },
    { name: 'Audio', icon: <Headphones className="w-4 h-4" /> },
    { name: 'Wearables', icon: <Watch className="w-4 h-4" /> },
    { name: 'Gaming', icon: <Gamepad2 className="w-4 h-4" /> },
    { name: 'Keyboards & Mice', icon: <Keyboard className="w-4 h-4" /> },
    { name: 'Power & Charging', icon: <BatteryCharging className="w-4 h-4" /> },
    { name: 'Smart Home', icon: <Home className="w-4 h-4" /> },
  ];

  const handleCategorySelect = (category: CategoryType) => {
    setFilter(prev => ({ ...prev, selectedCategory: category }));
    setCurrentView('catalog');
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    setCurrentView('catalog');
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Banner Notice for Bangladesh Customers */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5" />
              <span>Express Delivery across all 64 Districts • Free delivery over ৳5,000</span>
            </span>
            <span className="hidden md:inline-block opacity-60">|</span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% Authentic Brand Warranty Guaranteed</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-200">
            <span className="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-amber-300" />
              <span>Hotline: +880 9612-423438</span>
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide text-white">
              BDT (৳)
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button 
              id="nav-logo"
              onClick={() => {
                setCurrentView('store');
                setFilter(prev => ({ ...prev, searchQuery: '', selectedCategory: 'All' }));
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tight">G</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Gadget<span className="text-slate-900 dark:text-white">Hub</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 dark:text-slate-400 -mt-1">
                  Bangladesh Premier Tech Store
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar with live suggestions */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <input
                  id="nav-search-input"
                  type="text"
                  placeholder="Search laptops, smartphones, earbuds, mechanical keyboards..."
                  value={filter.searchQuery}
                  onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full pl-11 pr-24 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                
                {filter.searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setFilter(prev => ({ ...prev, searchQuery: '' }))}
                    className="absolute right-14 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-sm transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Live Autocomplete suggestions */}
            {searchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-slate-100 dark:border-slate-700/60 text-xs font-medium text-slate-500 dark:text-slate-400 flex justify-between items-center">
                  <span>Product Suggestions</span>
                  <span>{searchSuggestions.length} found</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50 max-h-80 overflow-y-auto">
                  {searchSuggestions.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        openProductDetails(product);
                        setSearchFocused(false);
                      }}
                      className="p-3 hover:bg-blue-50/50 dark:hover:bg-slate-700/60 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-11 h-11 object-cover rounded-lg border border-slate-200 dark:border-slate-700 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase">{product.brand}</div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{formatBDT(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-slate-400 line-through">{formatBDT(product.originalPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div 
                  onClick={handleSearchSubmit}
                  className="p-2.5 text-center bg-slate-50 dark:bg-slate-750 text-xs font-semibold text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                >
                  View all results for &ldquo;{filter.searchQuery}&rdquo; →
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Compare Tool */}
            <button
              id="btn-nav-compare"
              onClick={() => setCurrentView('compare')}
              className={`p-2.5 rounded-full relative text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${currentView === 'compare' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}`}
              title="Compare Gadgets"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              id="btn-nav-wishlist"
              onClick={() => setCurrentView('wishlist')}
              className={`p-2.5 rounded-full relative text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${currentView === 'wishlist' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600' : ''}`}
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="btn-nav-cart"
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors relative"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left text-xs leading-none">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Total</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatBDT(cartSubtotal)}</span>
              </div>
            </button>

            {/* Dark / Light Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            {/* User Account / Menu */}
            <div ref={userRef} className="relative">
              {user ? (
                <button
                  id="btn-user-menu"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.displayName.charAt(0)}
                  </div>
                  <span className="hidden md:inline-block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                    {user.displayName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ) : (
                <button
                  id="btn-nav-login"
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.displayName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-semibold rounded-full uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('account');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    My Account & Orders
                  </button>

                  {/* Admin switch option */}
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Admin Dashboard
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-700/60 my-1"></div>

                  <button
                    onClick={() => {
                      signOutApp();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Quick Admin Portal Button in Nav */}
            <button
              id="btn-quick-admin"
              onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                currentView === 'admin' 
                  ? 'bg-purple-600 text-white border-purple-600' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-400'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{currentView === 'admin' ? 'Exit Admin' : 'Admin Portal'}</span>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search gadgets in Bangladesh..."
              value={filter.searchQuery}
              onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-20 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[11px] font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Categories Navigation Bar */}
        <div className="hidden md:flex items-center justify-between border-t border-slate-100 dark:border-slate-800 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleCategorySelect('All')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                filter.selectedCategory === 'All' && currentView === 'catalog'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filter.selectedCategory === cat.name && currentView === 'catalog'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-4">
            <button
              onClick={() => {
                setFilter(prev => ({ ...prev, selectedCategory: 'All', inStockOnly: false }));
                setCurrentView('catalog');
              }}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline whitespace-nowrap"
            >
              Browse All Deals →
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 text-left"
                >
                  {cat.icon}
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentView('account');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Account & Orders
            </button>
            <button
              onClick={() => {
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
