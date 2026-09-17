import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  X, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import { useStore, formatBDT } from '../context/StoreContext';
import { Product, OrderStatusType, CategoryType } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    setCurrentView
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [productSearch, setProductSearch] = useState('');
  
  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form Fields
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('Smartphones');
  const [formPrice, setFormPrice] = useState(25000);
  const [formOrigPrice, setFormOrigPrice] = useState(28000);
  const [formStock, setFormStock] = useState(15);
  const [formImageUrl, setFormImageUrl] = useState('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600');
  const [formDescription, setFormDescription] = useState('High performance flagship gadget with official warranty.');

  // Sales Statistics Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  // Chart Data for 7-Day Revenue & Orders
  const salesData = [
    { day: 'Sat', revenue: 145000, orders: 4 },
    { day: 'Sun', revenue: 210000, orders: 6 },
    { day: 'Mon', revenue: 195000, orders: 5 },
    { day: 'Tue', revenue: 380000, orders: 8 },
    { day: 'Wed', revenue: 290000, orders: 7 },
    { day: 'Thu', revenue: 450000, orders: 12 },
    { day: 'Fri', revenue: 520000, orders: 14 },
  ];

  const categoryShareData = [
    { name: 'Phones', count: products.filter(p => p.category === 'Smartphones').length },
    { name: 'Laptops', count: products.filter(p => p.category === 'Laptops').length },
    { name: 'Audio', count: products.filter(p => p.category === 'Audio').length },
    { name: 'Wearables', count: products.filter(p => p.category === 'Wearables').length },
    { name: 'Gaming', count: products.filter(p => p.category === 'Gaming').length },
    { name: 'Power', count: products.filter(p => p.category === 'Power & Charging').length },
  ];

  const handleOpenAddModal = () => {
    setFormName('');
    setFormBrand('');
    setFormCategory('Smartphones');
    setFormPrice(25000);
    setFormOrigPrice(28000);
    setFormStock(15);
    setFormImageUrl('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600');
    setFormDescription('High performance flagship gadget with official warranty.');
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOrigPrice(p.originalPrice);
    setFormStock(p.stock);
    setFormImageUrl(p.imageUrl);
    setFormDescription(p.description);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = formOrigPrice > formPrice 
      ? Math.round(((formOrigPrice - formPrice) / formOrigPrice) * 100) 
      : 0;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOrigPrice),
        discountPercent: discount,
        stock: Number(formStock),
        imageUrl: formImageUrl,
        description: formDescription
      });
    } else {
      addProduct({
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOrigPrice),
        discountPercent: discount,
        stock: Number(formStock),
        rating: 4.8,
        reviewCount: 1,
        imageUrl: formImageUrl,
        gallery: [formImageUrl],
        description: formDescription,
        specs: {
          'Warranty': '1 Year Official Warranty',
          'Origin': 'Official Bangladesh Distributor'
        },
        features: ['Official brand product', 'Tested & Verified'],
        variants: [
          { id: 'var-1', name: 'Standard Edition', inStock: true }
        ],
        warranty: '1-Year Official Warranty',
        isFeatured: true
      });
    }

    setIsAddModalOpen(false);
  };

  const filteredAdminProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-black uppercase tracking-wider">
              Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              GadgetHub Management Console
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time Bangladesh inventory control, customer order fulfillment, and revenue metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('store')}
            className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
          >
            ← View Customer Storefront
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Gadget</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        {[
          { id: 'overview', label: 'Sales & Inventory Overview', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'products', label: `Inventory Management (${products.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'orders', label: `Customer Orders (${orders.length})`, icon: <ShoppingCart className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeAdminTab === tab.id
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab: Revenue, Order Stats, Charts */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Sales BDT</span>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{formatBDT(totalRevenue)}</p>
              <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +18.4% vs last week
              </span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Orders Processed</span>
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600">
                  <ShoppingCart className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{totalOrdersCount}</p>
              <span className="text-[11px] font-semibold text-blue-600 mt-1 inline-block">
                All 64 BD Districts
              </span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Active Catalog</span>
                <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{totalProductsCount}</p>
              <span className="text-[11px] font-semibold text-purple-600 mt-1 inline-block">
                8 Major Categories
              </span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Low Stock Warnings</span>
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{lowStockProducts.length}</p>
              <span className="text-[11px] font-semibold text-amber-600 mt-1 inline-block">
                Action recommended
              </span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Weekly Revenue Trend Area Chart */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Weekly Revenue Velocity</h3>
                  <p className="text-xs text-slate-400">Total BDT sales volume recorded over the past 7 days</p>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 text-xs font-bold rounded-lg">
                  Past 7 Days
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `৳${v / 1000}k`} />
                    <Tooltip 
                      formatter={(val: any) => [formatBDT(Number(val)), 'Revenue']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Stock Distribution Bar Chart */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
              <div className="mb-6">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Category Item Count</h3>
                <p className="text-xs text-slate-400">Inventory spread across departments</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryShareData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Low Stock Alerts Section */}
          {lowStockProducts.length > 0 && (
            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-3xl p-6">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300 font-bold text-sm mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Urgent: Low Stock Inventory in Dhaka Warehouse</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {lowStockProducts.map(p => (
                  <div key={p.id} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{p.name}</p>
                      <span className="text-slate-400">{p.brand}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 font-black whitespace-nowrap">
                      {p.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Products Tab: CRUD */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Filter gadgets by name or brand..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredAdminProducts.length} of {products.length} gadgets
            </span>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price (BDT)</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filteredAdminProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-750 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700 flex-shrink-0" />
                        <div className="truncate max-w-[200px]">
                          <p className="font-bold text-slate-900 dark:text-white truncate">{p.name}</p>
                          <span className="text-slate-400">{p.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">{p.category}</td>
                    <td className="py-3 px-4 font-black text-slate-900 dark:text-white">{formatBDT(p.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        p.stock <= 5 
                          ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600' 
                          : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">★ {p.rating}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-100"
                          title="Edit Gadget"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 hover:bg-rose-100"
                          title="Delete Gadget"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab: Order Fulfillment Status */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">Order ID & Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Destination District</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment Status</th>
                  <th className="py-3 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-750 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-mono font-bold text-blue-600 dark:text-blue-400">{order.id}</p>
                      <span className="text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-white">{order.shippingAddress.fullName}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{order.shippingAddress.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {order.shippingAddress.district}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">
                      {formatBDT(order.total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {order.paymentMethod} • {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        order.orderStatus === 'Delivered' 
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600'
                          : order.orderStatus === 'Shipped'
                            ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-600'
                            : 'bg-amber-100 dark:bg-amber-950/40 text-amber-600'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatusType)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                      >
                        <option value="Pending" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Pending</option>
                        <option value="Confirmed" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Confirmed</option>
                        <option value="Shipped" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Shipped</option>
                        <option value="Delivered" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Delivered</option>
                        <option value="Cancelled" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Gadget Specs' : 'Add New Gadget to Catalog'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Sony WH-1000XM5 Wireless Headphones"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="Apple, Sony, Samsung, etc."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Smartphones" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Smartphones</option>
                    <option value="Laptops" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Laptops</option>
                    <option value="Audio" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Audio</option>
                    <option value="Wearables" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Wearables</option>
                    <option value="Gaming" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Gaming</option>
                    <option value="Keyboards & Mice" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Keyboards & Mice</option>
                    <option value="Power & Charging" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Power & Charging</option>
                    <option value="Smart Home" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Smart Home</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Price (৳ BDT)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Original Price (৳)</label>
                  <input
                    type="number"
                    value={formOrigPrice}
                    onChange={(e) => setFormOrigPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm"
                >
                  {editingProduct ? 'Update Gadget' : 'Add to Inventory'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
