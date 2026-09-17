import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Scale, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Clock, 
  Plus, 
  Minus,
  MessageSquare,
  Share2,
  ThumbsUp
} from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';
import { Product, ProductVariant } from '../types';
import { ProductCard } from './ProductCard';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetails,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    reviews,
    addReview,
    products,
    user
  } = useStore();

  if (!selectedProduct) return null;

  const [activeImage, setActiveImage] = useState(selectedProduct.imageUrl);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    selectedProduct.variants.length > 0 ? selectedProduct.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews' | 'shipping'>('specs');

  // Review Form State
  const [reviewName, setReviewName] = useState(user?.displayName || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isLiked = isInWishlist(selectedProduct.id);
  const isCompared = isInCompare(selectedProduct.id);

  // Relevant reviews for this product
  const productReviews = reviews.filter(r => r.productId === selectedProduct.id);

  // Related products from same category or brand
  const relatedProducts = products
    .filter(p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.brand === selectedProduct.brand))
    .slice(0, 4);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReview({
      productId: selectedProduct.id,
      userName: reviewName.trim() || 'Tech Enthusiast',
      rating: reviewRating,
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Check out ${selectedProduct.name} on GadgetHub Bangladesh!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {selectedProduct.brand}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {selectedProduct.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share gadget"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="btn-close-product-detail"
              onClick={closeProductDetails}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Main Product Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Section */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img
                  src={activeImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {selectedProduct.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-black tracking-wider uppercase shadow-md">
                    {selectedProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {selectedProduct.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === imgUrl 
                        ? 'border-blue-600 shadow-md scale-105' 
                        : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Meta & Purchase Panel */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedProduct.name}
                </h1>

                {/* Rating & Reviews row */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(selectedProduct.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-slate-300">•</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    {selectedProduct.reviewCount} verified reviews
                  </button>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-medium">SKU: {selectedProduct.id}</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {formatBDT(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <>
                    <span className="text-base text-slate-400 line-through">
                      {formatBDT(selectedProduct.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                      Save {formatBDT(selectedProduct.originalPrice - selectedProduct.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Variants Selector */}
              {selectedProduct.variants.length > 0 && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    <span>Color / Variant:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold">{selectedVariant?.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.variants.map(variant => (
                      <button
                        key={variant.id}
                        disabled={!variant.inStock}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                          selectedVariant?.id === variant.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        } ${!variant.inStock ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                      >
                        {variant.colorHex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        )}
                        <span>{variant.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status & Quantity Selector */}
              <div className="flex items-center gap-6 pt-1">
                <div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                      className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      disabled={quantity >= selectedProduct.stock}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                    Availability:
                  </span>
                  {selectedProduct.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <Check className="w-3.5 h-3.5" /> {selectedProduct.stock} units in stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  id="detail-add-to-cart"
                  disabled={selectedProduct.stock <= 0}
                  onClick={() => addToCart(selectedProduct, quantity, selectedVariant)}
                  className="w-full py-3 px-4 rounded-2xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  id="detail-buy-now"
                  disabled={selectedProduct.stock <= 0}
                  onClick={() => {
                    buyNow(selectedProduct, quantity, selectedVariant);
                    closeProductDetails();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Wishlist & Compare utility triggers */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${
                    isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => toggleCompare(selectedProduct.id)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${
                    isCompared ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'Comparing' : 'Compare Specifications'}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Delivery: <strong>Inside Dhaka 24-48h (৳60)</strong> • Outside Dhaka (৳120)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{selectedProduct.warranty} guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>7-Day Replacement policy for manufacturer defects</span>
                </div>
              </div>

            </div>

          </div>

          {/* Tabbed Detail Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px overflow-x-auto">
              {[
                { id: 'specs', label: 'Technical Specifications' },
                { id: 'features', label: 'Key Features' },
                { id: 'shipping', label: 'Shipping & Warranty' },
                { id: 'reviews', label: `Reviews (${productReviews.length})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-6">
              {/* Specs Table */}
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {Object.entries(selectedProduct.specs).map(([key, value], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-850' : 'bg-white dark:bg-slate-800'}>
                            <td className="py-3 px-4 font-bold text-slate-600 dark:text-slate-300 w-1/3">
                              {key}
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Key Features */}
              {activeTab === 'features' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Why choose {selectedProduct.name}:
                  </h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shipping & Warranty */}
              {activeTab === 'shipping' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Bangladesh Delivery Policy</span>
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                      <li>• <strong>Inside Dhaka:</strong> Delivery within 24 to 48 hours for ৳60.</li>
                      <li>• <strong>Outside Dhaka:</strong> Delivery across all 64 districts in 2 to 4 days for ৳120.</li>
                      <li>• <strong>Free Delivery:</strong> Orders exceeding ৳5,000 qualify for completely free delivery!</li>
                      <li>• <strong>Courier Partners:</strong> Pathao Courier, RedX, Steadfast, and eCourier.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Official Warranty & Returns</span>
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                      <li>• <strong>Warranty:</strong> {selectedProduct.warranty} with official service center coverage.</li>
                      <li>• <strong>7-Day Replacement:</strong> Instant replacement if physical or hardware defect is detected.</li>
                      <li>• <strong>100% Genuine:</strong> All serial numbers can be verified directly on the official brand website.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Customer Reviews & Submission */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {productReviews.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No reviews submitted yet. Be the first to review this gadget!</p>
                    ) : (
                      productReviews.map(rev => (
                        <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.userName}</span>
                              {rev.verifiedPurchase && (
                                <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full font-semibold">
                                  Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">{rev.date}</span>
                          </div>

                          <div className="flex items-center text-amber-400 mb-2">
                            {[1, 2, 3, 4, 5].map(st => (
                              <Star key={st} className={`w-3 h-3 ${st <= rev.rating ? 'fill-current' : 'text-slate-300'}`} />
                            ))}
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300">{rev.comment}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Review Form */}
                  <div className="p-5 rounded-2xl border border-blue-100 dark:border-slate-700 bg-blue-50/40 dark:bg-slate-850">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>Write a Customer Review</span>
                    </h4>

                    {reviewSubmitted ? (
                      <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center">
                        Thank you! Your verified review was added.
                      </div>
                    ) : (
                      <form onSubmit={handleReviewSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-500 block mb-1">Your Name</label>
                            <input
                              type="text"
                              required
                              value={reviewName}
                              onChange={(e) => setReviewName(e.target.value)}
                              placeholder="e.g., Ahsan Habib"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-500 block mb-1">Rating</label>
                            <select
                              value={reviewRating}
                              onChange={(e) => setReviewRating(Number(e.target.value))}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                              <option value="5" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">★★★★★ (5 - Outstanding)</option>
                              <option value="4" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">★★★★☆ (4 - Very Good)</option>
                              <option value="3" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">★★★☆☆ (3 - Average)</option>
                              <option value="2" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">★★☆☆☆ (2 - Below Average)</option>
                              <option value="1" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">★☆☆☆☆ (1 - Poor)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 block mb-1">Review Comments</label>
                          <textarea
                            rows={3}
                            required
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Share details about performance, build quality, battery life, packaging in Bangladesh..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">
                You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map(rel => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
