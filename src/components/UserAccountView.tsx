import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  ExternalLink, 
  Trash2, 
  ShoppingCart, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';
import { OrderStatusType } from '../types';

export const UserAccountView: React.FC = () => {
  const { 
    user, 
    orders, 
    wishlist, 
    products, 
    addToCart, 
    toggleWishlist, 
    openProductDetails,
    setCurrentView 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses'>('orders');

  // Filter orders for this user or show all recent for demo
  const userOrders = user 
    ? orders.filter(o => o.userId === user.uid || !o.userId)
    : orders;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case 'Delivered':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">Delivered</span>;
      case 'Shipped':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold">Shipped / In Transit</span>;
      case 'Confirmed':
        return <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold">Confirmed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-bold">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold">Pending Dispatch</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Account Profile Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-black text-2xl uppercase shadow-inner">
            {user?.displayName ? user.displayName.charAt(0) : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{user?.displayName || 'Valued Customer'}</h1>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                {user?.role || 'Member'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200">{user?.email || 'customer@gadgethub.bd'}</p>
            <p className="text-xs text-blue-200 mt-1">
              Bangladesh Premier Club Member • Active Since 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('catalog')}
            className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm"
          >
            Browse Gadgets
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        {[
          { id: 'orders', label: `My Orders (${userOrders.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'wishlist', label: `Wishlist (${wishlistProducts.length})`, icon: <Heart className="w-4 h-4" /> },
          { id: 'addresses', label: 'Saved Address', icon: <MapPin className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 space-y-3">
              <Package className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No orders placed yet</h3>
              <p className="text-xs text-slate-400">Your recent purchases across Bangladesh will appear here.</p>
              <button
                onClick={() => setCurrentView('catalog')}
                className="mt-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            userOrders.map(order => (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {order.id}
                    </span>
                    <span className="text-slate-300 mx-2">•</span>
                    <span className="text-xs text-slate-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.orderStatus)}
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {formatBDT(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-xl flex-shrink-0 border border-slate-200 dark:border-slate-700" />
                        <div className="truncate">
                          <p className="font-bold text-slate-900 dark:text-white truncate">{item.productName}</p>
                          <span className="text-slate-400">
                            {item.brand} • Qty: {item.quantity} {item.selectedVariantName ? `• ${item.selectedVariantName}` : ''}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {formatBDT(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Courier details */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>
                      Courier: <strong>Pathao / RedX ({order.trackingNumber})</strong> • Delivering to: <strong>{order.shippingAddress.district}</strong>
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    Payment: <strong className="uppercase">{order.paymentMethod}</strong> ({order.paymentStatus})
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 space-y-3">
              <Heart className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Your wishlist is empty</h3>
              <p className="text-xs text-slate-400">Tap the heart icon on any gadget to save it here for later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistProducts.map(p => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3 relative group"
                >
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-36 object-cover rounded-xl cursor-pointer"
                    onClick={() => openProductDetails(p)}
                  />

                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-600">{p.brand}</span>
                    <h4 
                      onClick={() => openProductDetails(p)}
                      className="text-xs font-bold text-slate-900 dark:text-white truncate hover:text-blue-600 cursor-pointer"
                    >
                      {p.name}
                    </h4>
                    <p className="font-black text-sm text-slate-900 dark:text-white mt-1">{formatBDT(p.price)}</p>
                  </div>

                  <button
                    onClick={() => addToCart(p)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Default Shipping Address</h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-xs font-bold">
              Primary
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <p className="font-bold text-slate-900 dark:text-white text-sm">{user?.displayName || 'Customer'}</p>
            <p>House 24, Road 11, Gulshan-1, Dhaka - 1212</p>
            <p>Division: Dhaka Division, Bangladesh</p>
            <p>Phone: {user?.phone || '+880 1712-345678'}</p>
          </div>
        </div>
      )}

    </div>
  );
};
