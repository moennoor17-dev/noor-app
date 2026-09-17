/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FlashDeals } from './components/FlashDeals';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { CheckoutModal } from './components/CheckoutModal';
import { UserAccountView } from './components/UserAccountView';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { currentView } = useStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors">
      
      {/* Sticky Top Header */}
      <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'store' && (
          <div className="space-y-4">
            <HeroSlider />
            <CategoryShowcase />
            <FlashDeals />
            <ProductGrid 
              sectionType="featured" 
              title="Featured Flagship Gadgets" 
              subtitle="Hand-picked premium tech with official manufacturer warranty" 
            />
            <ProductGrid 
              sectionType="bestsellers" 
              title="Best-Selling in Bangladesh" 
              subtitle="Most popular smartphones, headphones, and gaming gear" 
            />
            <ProductGrid 
              sectionType="newarrivals" 
              title="New Launches 2026" 
              subtitle="The newest releases just arrived in Bangladesh" 
            />
          </div>
        )}

        {currentView === 'catalog' && (
          <ProductGrid sectionType="catalog" />
        )}

        {currentView === 'compare' && (
          <ComparisonModal />
        )}

        {currentView === 'checkout' && (
          <CheckoutModal />
        )}

        {(currentView === 'account' || currentView === 'wishlist') && (
          <UserAccountView />
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Persistent Global Modals and Drawers */}
      <ProductDetailModal />
      <QuickViewModal />
      <CartDrawer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
