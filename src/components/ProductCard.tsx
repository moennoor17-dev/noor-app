import React from 'react';
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Eye, 
  Scale, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { Product } from '../types';
import { useStore, formatBDT } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openProductDetails,
    openQuickView
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-slate-950/50 transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      {/* Top badges bar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Quick Action Floating Icons */}
        <div className="flex flex-col gap-1.5 pointer-events-auto">
          {/* Wishlist Button */}
          <button
            id={`btn-wishlist-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-transform active:scale-90 ${
              isLiked 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-500 hover:text-rose-500 hover:bg-white'
            }`}
            title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            id={`btn-quickview-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-500 hover:text-blue-600 hover:bg-white backdrop-blur-md shadow-sm transition-transform active:scale-90 opacity-0 group-hover:opacity-100 duration-200"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Compare Button */}
          <button
            id={`btn-compare-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-transform active:scale-90 opacity-0 group-hover:opacity-100 duration-200 ${
              isCompared 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-500 hover:text-purple-600'
            }`}
            title={isCompared ? 'Comparing' : 'Compare with other gadgets'}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Image Stage */}
      <div 
        onClick={() => openProductDetails(product)}
        className="relative pt-[75%] w-full bg-slate-50 dark:bg-slate-850 cursor-pointer overflow-hidden"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Stock Pill */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {product.brand}
            </span>
            
            {isOutOfStock ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600">
                Only {product.stock} left!
              </span>
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" /> In Stock
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => openProductDetails(product)}
            className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {product.rating}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div className="flex items-baseline gap-2 mb-3.5">
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {formatBDT(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatBDT(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-add-cart-${product.id}`}
              disabled={isOutOfStock}
              onClick={() => addToCart(product)}
              className="w-full py-2 px-2.5 rounded-xl border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              id={`btn-buy-now-${product.id}`}
              disabled={isOutOfStock}
              onClick={() => buyNow(product)}
              className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
