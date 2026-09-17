import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Laptop,
  Smartphone,
  Headphones,
  Award
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setFilter } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter & Promo Strip */}
        <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 rounded-3xl p-6 sm:p-8 border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">
              Stay ahead in Tech with GadgetHub Bangladesh
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Subscribe to get instant alerts on flagship launches, flash sales, and exclusive promo coupons.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! You are subscribed to GadgetHub Tech Club.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg">
                G
              </div>
              <span className="text-2xl font-black text-white">
                Gadget<span className="text-blue-500">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              GadgetHub is Bangladesh’s leading destination for authentic tech, flagship smartphones, ultrabooks, audiophile gear, and gaming peripherals. Backed by 100% genuine brand warranties and rapid delivery across all 64 districts.
            </p>
            
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Level 4, Jamuna Future Park & Dhanmondi 27, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Customer Care: +880 9612-423438 (9 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>support@gadgethub.com.bd</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => { setFilter(prev => ({ ...prev, selectedCategory: 'Smartphones' })); setCurrentView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Flagship Smartphones
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilter(prev => ({ ...prev, selectedCategory: 'Laptops' })); setCurrentView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Laptops & MacBooks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilter(prev => ({ ...prev, selectedCategory: 'Audio' })); setCurrentView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  ANC Headphones & TWS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilter(prev => ({ ...prev, selectedCategory: 'Wearables' })); setCurrentView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Smartwatches & Fitness
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilter(prev => ({ ...prev, selectedCategory: 'Gaming' })); setCurrentView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Gaming Gear & Consoles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilter(prev => ({ ...prev, selectedCategory: 'Power & Charging' })); setCurrentView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Fast Chargers & GaN PD
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Customer Help
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#tracking" onClick={(e) => { e.preventDefault(); setCurrentView('account'); }} className="hover:text-white">Track Courier Order</a></li>
              <li><a href="#warranty" onClick={(e) => e.preventDefault()} className="hover:text-white">Official Warranty Policy</a></li>
              <li><a href="#returns" onClick={(e) => e.preventDefault()} className="hover:text-white">7-Day Replacement Policy</a></li>
              <li><a href="#shipping" onClick={(e) => e.preventDefault()} className="hover:text-white">Shipping Across 64 Districts</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Payment & Logistics Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Accepted Payments
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded bg-[#e2136e] text-white">bKash</span>
              <span className="px-2.5 py-1 rounded bg-[#f7931e] text-white">Nagad</span>
              <span className="px-2.5 py-1 rounded bg-[#8b2387] text-white">Rocket</span>
              <span className="px-2.5 py-1 rounded bg-blue-600 text-white">Visa</span>
              <span className="px-2.5 py-1 rounded bg-rose-600 text-white">Mastercard</span>
              <span className="px-2.5 py-1 rounded bg-emerald-700 text-white">COD</span>
            </div>

            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white pt-3">
              Courier Delivery
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Pathao Courier</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">RedX</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Steadfast</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">eCourier</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 GadgetHub Bangladesh. All rights reserved. Trade License: TRAD/DNCC/049182/2026.</p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Powered by React, Tailwind CSS & Firebase</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
