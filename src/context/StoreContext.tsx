import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Review, 
  Coupon, 
  UserProfile, 
  FilterState, 
  ProductVariant, 
  CategoryType,
  OrderStatusType
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_COUPONS } from '../data/products';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  recentlyViewed: string[];
  orders: Order[];
  reviews: Review[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  theme: 'light' | 'dark';
  user: UserProfile | null;
  authLoading: boolean;
  currentView: 'store' | 'catalog' | 'product-details' | 'wishlist' | 'cart' | 'checkout' | 'account' | 'admin' | 'compare';
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  isCartDrawerOpen: boolean;
  filter: FilterState;
  
  // Actions
  toggleTheme: () => void;
  setCurrentView: (view: 'store' | 'catalog' | 'product-details' | 'wishlist' | 'cart' | 'checkout' | 'account' | 'admin' | 'compare') => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  openProductDetails: (product: Product) => void;
  closeProductDetails: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  // Cart
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  buyNow: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Compare
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  
  // Coupon
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  
  // Filter
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  setCategory: (category: CategoryType) => void;
  setSearchQuery: (query: string) => void;
  
  // Orders & Reviews
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  
  // Admin Operations
  addProduct: (newProduct: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatusType) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Auth
  signInGoogle: () => Promise<void>;
  signInDemo: (role: 'customer' | 'admin') => void;
  signOutApp: () => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const defaultFilter: FilterState = {
  searchQuery: '',
  selectedCategory: 'All',
  selectedBrands: [],
  priceRange: [0, 450000],
  minRating: 0,
  inStockOnly: false,
  sortBy: 'popularity'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('gh_theme') as 'light' | 'dark') || 'light';
  });

  // Data states with persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gh_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gh_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('gh_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['gh-phone-01', 'gh-audio-01'];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('gh_compare');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('gh_recent');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['gh-phone-01', 'gh-laptop-01'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gh_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Demo initial order
    return [
      {
        id: 'GH-2026-8941',
        shippingAddress: {
          fullName: 'Tanvir Ahmed',
          phone: '+8801712345678',
          email: 'tanvir.ahmed@example.com',
          district: 'Dhaka',
          thana: 'Dhanmondi',
          address: 'Road 7/A, House 24, Flat 4B',
          postalCode: '1209'
        },
        items: [
          {
            productId: 'gh-audio-01',
            productName: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
            brand: 'Sony',
            price: 36500,
            quantity: 1,
            selectedVariantName: 'Matte Black',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
          }
        ],
        subtotal: 36500,
        deliveryCharge: 0,
        discount: 3650,
        couponCode: 'GADGET10',
        total: 32850,
        deliveryMethod: 'standard',
        paymentMethod: 'bkash',
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        trackingNumber: 'REDX-DH-894192',
        createdAt: '2026-09-12T10:30:00Z',
        estimatedDelivery: '2026-09-14'
      }
    ];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('gh_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_REVIEWS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('gh_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // UI state
  const [currentView, setCurrentView] = useState<'store' | 'catalog' | 'product-details' | 'wishlist' | 'cart' | 'checkout' | 'account' | 'admin' | 'compare'>('store');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  // User auth state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gh_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      uid: 'demo-user-1',
      displayName: 'Moen Noor',
      email: 'moennoor17@gmail.com',
      phone: '+8801812345678',
      role: 'customer',
      savedAddresses: [
        {
          fullName: 'Moen Noor',
          phone: '+8801812345678',
          email: 'moennoor17@gmail.com',
          district: 'Dhaka',
          thana: 'Gulshan-2',
          address: 'Avenue 4, Road 113, House 12',
          postalCode: '1212'
        }
      ]
    };
  });
  const [authLoading, setAuthLoading] = useState(true);

  // Sync theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gh_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('gh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gh_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('gh_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('gh_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('gh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gh_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gh_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('gh_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gh_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gh_user');
    }
  }, [user]);

  // Firebase auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser(prev => ({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Gadget Lover',
          phone: firebaseUser.phoneNumber || prev?.phone || '+8801700000000',
          role: prev?.role || 'customer',
          savedAddresses: prev?.savedAddresses || [
            {
              fullName: firebaseUser.displayName || 'Customer',
              phone: '+8801700000000',
              email: firebaseUser.email || '',
              district: 'Dhaka',
              thana: 'Mirpur',
              address: 'Section 10, Block C',
              postalCode: '1216'
            }
          ]
        }));
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
      // Cap at ৳5,000 for realistic safety
      if (discountAmount > 5000) discountAmount = 5000;
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const addToCart = (product: Product, quantity: number = 1, variant?: ProductVariant) => {
    setCart(prev => {
      const targetVariant = variant || (product.variants.length > 0 ? product.variants[0] : undefined);
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedVariant?.id === targetVariant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stock)
        };
        return updated;
      } else {
        return [...prev, {
          product,
          quantity: Math.min(quantity, product.stock),
          selectedVariant: targetVariant
        }];
      }
    });

    addRecentlyViewed(product.id);
  };

  const buyNow = (product: Product, quantity: number = 1, variant?: ProductVariant) => {
    addToCart(product, quantity, variant);
    setCurrentView('checkout');
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => {
      if (item.product.id !== productId) return true;
      if (variantId && item.selectedVariant?.id !== variantId) return true;
      return false;
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId)) {
        return {
          ...item,
          quantity: Math.min(quantity, item.product.stock)
        };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare
  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  // Coupon
  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < found.minOrderAmount) {
      return { 
        success: false, 
        message: `Minimum order amount of ৳${found.minOrderAmount.toLocaleString()} required for this coupon.` 
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  // Recently Viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    addRecentlyViewed(product.id);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    setCurrentView('store');
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    addRecentlyViewed(product.id);
  };

  const closeQuickView = () => setQuickViewProduct(null);

  // Filters
  const resetFilters = () => setFilter(defaultFilter);

  const setCategory = (category: CategoryType) => {
    setFilter(prev => ({ ...prev, selectedCategory: category }));
    if (currentView !== 'catalog' && currentView !== 'store') {
      setCurrentView('catalog');
    }
  };

  const setSearchQuery = (query: string) => {
    setFilter(prev => ({ ...prev, searchQuery: query }));
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'estimatedDelivery'>) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `BDX-${orderData.shippingAddress.district.slice(0, 3).toUpperCase()}-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: `GH-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      trackingNumber: trackingCode,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Decrement product stock in local inventory
    setProducts(prev => prev.map(p => {
      const itemInOrder = orderData.items.find(item => item.productId === p.id);
      if (itemInOrder) {
        return { ...p, stock: Math.max(0, p.stock - itemInOrder.quantity) };
      }
      return p;
    }));

    clearCart();
    return newOrder;
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [newReview, ...prev]);

    // Recalculate rating on product
    setProducts(prev => prev.map(p => {
      if (p.id === reviewData.productId) {
        const productReviews = reviews.filter(r => r.productId === p.id);
        const newCount = productReviews.length + 1;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, reviewData.rating);
        const newRating = Number((sum / newCount).toFixed(1));
        return {
          ...p,
          rating: newRating,
          reviewCount: newCount
        };
      }
      return p;
    }));
  };

  // Admin Product CRUD
  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatusType) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  // Auth methods
  const signInGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        setUser({
          uid: res.user.uid,
          email: res.user.email || '',
          displayName: res.user.displayName || 'Google User',
          phone: res.user.phoneNumber || '+8801700000000',
          role: 'customer',
          savedAddresses: [
            {
              fullName: res.user.displayName || 'Customer',
              phone: '+8801700000000',
              email: res.user.email || '',
              district: 'Dhaka',
              thana: 'Gulshan',
              address: 'House 14, Road 28',
              postalCode: '1212'
            }
          ]
        });
      }
    } catch (err) {
      console.warn('Google Popup sign in notice:', err);
      // Fallback to seamless demo auth if popups are blocked in iframe
      signInDemo('customer');
    }
  };

  const signInDemo = (role: 'customer' | 'admin') => {
    setUser({
      uid: role === 'admin' ? 'admin-gadgethub-01' : 'demo-customer-01',
      displayName: role === 'admin' ? 'Admin Manager' : 'Moen Noor',
      email: role === 'admin' ? 'admin@gadgethub.com.bd' : 'moennoor17@gmail.com',
      phone: '+8801812345678',
      role,
      savedAddresses: [
        {
          fullName: role === 'admin' ? 'Admin Manager' : 'Moen Noor',
          phone: '+8801812345678',
          email: role === 'admin' ? 'admin@gadgethub.com.bd' : 'moennoor17@gmail.com',
          district: 'Dhaka',
          thana: 'Gulshan-2',
          address: 'Avenue 4, Road 113, House 12',
          postalCode: '1212'
        }
      ]
    });
  };

  const signOutApp = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    setUser(null);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...profile } : null);
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      wishlist,
      compareList,
      recentlyViewed,
      orders,
      reviews,
      coupons,
      appliedCoupon,
      theme,
      user,
      authLoading,
      currentView,
      selectedProduct,
      quickViewProduct,
      isCartDrawerOpen,
      filter,
      toggleTheme,
      setCurrentView,
      setIsCartDrawerOpen,
      openProductDetails,
      closeProductDetails,
      openQuickView,
      closeQuickView,
      addToCart,
      buyNow,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartSubtotal,
      cartCount,
      toggleWishlist,
      isInWishlist,
      toggleCompare,
      isInCompare,
      removeFromCompare,
      clearCompare,
      applyCoupon,
      removeCoupon,
      discountAmount,
      setFilter,
      resetFilters,
      setCategory,
      setSearchQuery,
      placeOrder,
      addReview,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      addCoupon,
      deleteCoupon,
      signInGoogle,
      signInDemo,
      signOutApp,
      updateUserProfile
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Bangladeshi Taka currency formatter helper
export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-IN')}`;
}
