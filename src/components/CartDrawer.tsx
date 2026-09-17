import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    setCurrentView,
    openProductDetails
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });

  if (!isCartDrawerOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  // Approximate default delivery fee preview
  const estimatedDelivery = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + estimatedDelivery);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponFeedback({ status: 'success', message: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ status: 'error', message: res.message });
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            id="btn-close-cart"
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-blue-50/70 dark:bg-blue-950/30 px-5 py-3 border-b border-blue-100 dark:border-blue-900/40">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              {amountToFreeShipping === 0 ? (
                <strong className="text-emerald-600 dark:text-emerald-400">You unlocked FREE delivery in BD!</strong>
              ) : (
                <span>Add <strong>{formatBDT(amountToFreeShipping)}</strong> more for FREE shipping</span>
              )}
            </span>
            <span className="text-blue-600 font-bold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-500 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore the latest gadgets, smartphones, wireless earbuds and flagship gaming gear.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('catalog');
                }}
                className="mt-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div 
                  key={`${item.product.id}-${item.selectedVariant?.id || idx}`}
                  className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex gap-3 relative"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      openProductDetails(item.product);
                    }}
                  />

                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">
                      {item.product.brand}
                    </span>
                    <h4 
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        openProductDetails(item.product);
                      }}
                      className="text-xs font-bold text-slate-900 dark:text-white truncate cursor-pointer hover:text-blue-600"
                    >
                      {item.product.name}
                    </h4>

                    {item.selectedVariant && (
                      <span className="inline-block text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded-md mt-0.5 border border-slate-200 dark:border-slate-600">
                        {item.selectedVariant.name}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {formatBDT(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3.5">
            
            {/* Coupon Code Box */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatBDT(discountAmount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-rose-600 font-bold text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g., GADGET10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="w-full pl-8 pr-3 py-2 text-xs uppercase rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponFeedback.status === 'error' && (
                    <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{couponFeedback.message}</span>
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatBDT(cartSubtotal)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount</span>
                  <span className="font-bold">-{formatBDT(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery (Estimated Dhaka)</span>
                <span className="font-semibold">
                  {estimatedDelivery === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    formatBDT(estimatedDelivery)
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-base text-blue-600 dark:text-blue-400">{formatBDT(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="btn-drawer-checkout"
              onClick={handleProceedCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400">
              🔒 Cash on Delivery & bKash / Nagad payment options available at checkout
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
