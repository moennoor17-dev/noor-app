import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, ArrowRight, Sparkles, Award } from 'lucide-react';
import { useStore, formatBDT } from '../context/StoreContext';

interface Slide {
  id: number;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  priceNote: string;
  productId: string;
  ctaText: string;
  imageUrl: string;
  bgGradient: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: 'Flagship Tech 2026',
    badge: 'Titanium Revolution',
    title: 'Apple iPhone 16 Pro Max',
    subtitle: 'A18 Pro Silicon • 48MP Fusion Camera • Grade 5 Titanium',
    priceNote: 'Starting from ৳1,84,999 with 1-Year Official Warranty',
    productId: 'gh-phone-01',
    ctaText: 'Shop iPhone 16 Pro Max',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80',
    bgGradient: 'from-slate-900 via-indigo-950 to-blue-950'
  },
  {
    id: 2,
    tag: 'Pro Creative Beast',
    badge: 'M3 Max Power',
    title: 'MacBook Pro 16" Space Black',
    subtitle: '36GB Unified RAM • Liquid Retina XDR • Up to 22h Battery',
    priceNote: 'Exclusive Special Pricing ৳3,89,000 with Free Delivery in BD',
    productId: 'gh-laptop-01',
    ctaText: 'Discover MacBook Pro',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
    bgGradient: 'from-slate-950 via-purple-950 to-slate-900'
  },
  {
    id: 3,
    tag: 'World-Class Silence',
    badge: 'Industry Leading ANC',
    title: 'Sony WH-1000XM5 Noise Cancelling',
    subtitle: 'Auto NC Optimizer • 30h Playtime • 3-Min Fast Quick Charge',
    priceNote: 'Flash Sale: ৳36,500 (Save ৳5,500 today)',
    productId: 'gh-audio-01',
    ctaText: 'Claim Flash Deal',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80',
    bgGradient: 'from-blue-950 via-slate-900 to-indigo-950'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products, openProductDetails, setCurrentView } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);

  const activeSlide = SLIDES[currentSlide];

  const handleSlideAction = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      openProductDetails(product);
    } else {
      setCurrentView('catalog');
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${activeSlide.bgGradient} text-white shadow-2xl transition-all duration-700 min-h-[440px] md:min-h-[480px] flex items-center`}>
        
        {/* Ambient glow backgrounds */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase text-white inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {activeSlide.tag}
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-slate-200">
                {activeSlide.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {activeSlide.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              {activeSlide.subtitle}
            </p>

            <div className="pt-2">
              <p className="text-amber-300 font-bold text-sm sm:text-base">
                {activeSlide.priceNote}
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                id="hero-cta-btn"
                onClick={() => handleSlideAction(activeSlide.productId)}
                className="px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('catalog')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full font-semibold text-sm text-white transition-colors"
              >
                View All Gadgets
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer" onClick={() => handleSlideAction(activeSlide.productId)}>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <img
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                className="relative w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-2xl border-2 border-white/20 shadow-2xl group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-xl text-center text-xs font-semibold text-slate-200">
                Click to explore full specifications & gallery
              </div>
            </div>
          </div>

        </div>

        {/* Carousel controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-colors z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-colors z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Genuine</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Official Brand Warranty</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fast Courier BD</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">24-48 Hours in Dhaka</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">7 Days Return</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Hassle-free replacement</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0 font-bold text-sm">
            ৳
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">bKash & COD</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Pay cash or mobile banking</p>
          </div>
        </div>
      </div>
    </div>
  );
};
