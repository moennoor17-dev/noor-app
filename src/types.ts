export type CategoryType = 
  | 'All'
  | 'Smartphones'
  | 'Laptops'
  | 'Audio'
  | 'Wearables'
  | 'Gaming'
  | 'Keyboards & Mice'
  | 'Power & Charging'
  | 'Smart Home';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
}

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  price: number; // in BDT (৳)
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  features: string[];
  specs: ProductSpecs;
  imageUrl: string;
  gallery: string[];
  variants: ProductVariant[];
  warranty: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSpecialOffer?: boolean;
  offerEnds?: string; // ISO date string
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g., 10 for 10% or 500 for ৳500
  minOrderAmount: number;
  description: string;
  expiryDate: string;
}

export type DeliveryMethodType = 'standard' | 'express' | 'hub_pickup';
export type PaymentMethodType = 'cod' | 'bkash' | 'nagad' | 'rocket' | 'card';
export type OrderStatusType = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  quantity: number;
  selectedVariantName?: string;
  imageUrl: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  district: string;
  thana: string;
  address: string;
  postalCode?: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string;
  userId?: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  couponCode?: string;
  total: number;
  deliveryMethod: DeliveryMethodType;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Pending' | 'Paid';
  orderStatus: OrderStatusType;
  trackingNumber: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: 'customer' | 'admin';
  savedAddresses: ShippingAddress[];
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: CategoryType;
  selectedBrands: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
