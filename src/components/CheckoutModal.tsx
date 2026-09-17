import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Smartphone, 
  MapPin, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Check, 
  Copy, 
  Download,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore, formatBDT } from '../context/StoreContext';
import { BANGLADESH_DISTRICTS, getDeliveryFee } from '../data/bangladeshDistricts';
import { DistrictPicker } from './DistrictPicker';
import { DeliveryMethodType, PaymentMethodType, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    placeOrder,
    setCurrentView,
    user
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form State
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+8801');
  const [district, setDistrict] = useState('Dhaka');
  const [thana, setThana] = useState('Gulshan');
  const [address, setAddress] = useState('House 24, Road 11');
  const [postalCode, setPostalCode] = useState('1212');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Delivery & Payment selection
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodType>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('bkash');

  // Mobile Banking Simulation State
  const [mobileWalletNumber, setMobileWalletNumber] = useState(phone || '+8801');
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobilePin, setMobilePin] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Card Payment simulation state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Calculate delivery fee based on district & cart subtotal
  let baseDeliveryFee = getDeliveryFee(district, cartSubtotal);
  if (deliveryMethod === 'express') baseDeliveryFee += 60;
  if (deliveryMethod === 'hub_pickup') baseDeliveryFee = Math.max(0, baseDeliveryFee - 20);

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + baseDeliveryFee);

  // Fire celebratory confetti on order completion
  useEffect(() => {
    if (step === 6) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [step]);

  // If cart is empty and no order has been completed yet
  if (cart.length === 0 && step !== 6) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 flex items-center justify-center mx-auto">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your cart is empty</h2>
        <p className="text-sm text-slate-500">Add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentView('catalog')}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors"
        >
          Browse Gadgets
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (step === 1) {
      if (!fullName.trim() || !email.trim() || !phone.trim()) {
        alert('Please fill in your name, email, and phone number.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!district || !thana.trim() || !address.trim()) {
        alert('Please complete your shipping address details.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const newOrder = placeOrder({
        userId: user?.uid,
        shippingAddress: {
          fullName,
          email,
          phone,
          district,
          thana,
          address,
          postalCode,
          deliveryNotes
        },
        items: cart.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          brand: i.product.brand,
          price: i.product.price,
          quantity: i.quantity,
          selectedVariantName: i.selectedVariant?.name,
          imageUrl: i.product.imageUrl
        })),
        subtotal: cartSubtotal,
        deliveryCharge: baseDeliveryFee,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        total: grandTotal,
        deliveryMethod,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
        orderStatus: 'Pending'
      });

      setConfirmedOrder(newOrder);
      setStep(6);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Step Indicators */}
      {step < 6 && (
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-bold text-slate-500">
            {[
              { num: 1, label: 'Customer' },
              { num: 2, label: 'Address' },
              { num: 3, label: 'Delivery' },
              { num: 4, label: 'Payment' },
              { num: 5, label: 'Review' }
            ].map(s => (
              <div key={s.num} className="flex flex-col items-center gap-1">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step === s.num
                      ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-500/20'
                      : step > s.num
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`hidden sm:inline ${step === s.num ? 'text-blue-600 font-bold' : ''}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Checkout Box */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
        
        {/* Step 1: Customer Information */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Customer Information</h2>
                <p className="text-xs text-slate-500">Provide your contact info to receive SMS order tracking in Bangladesh.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Ahsan Habib"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number (Bangladeshi Mobile) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+8801XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Used by our delivery courier (Pathao/RedX) to call prior to package drop-off.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setCurrentView('cart')}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Cart</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <span>Continue to Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Shipping Address */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Shipping Address</h2>
                <p className="text-xs text-slate-500">Select your district across Bangladesh for automated delivery rate calculation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>District / Zilla (All 64 Districts) *</span>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                    Click to browse or search your Zilla
                  </span>
                </label>
                <DistrictPicker
                  value={district}
                  onChange={(val) => setDistrict(val)}
                  subtotal={cartSubtotal}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Thana / Upazila / Area *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dhanmondi, Uttara, Panchlaish, Kotwali"
                  value={thana}
                  onChange={(e) => setThana(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Street Address / House / Flat / Road *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., House 18, Road 27, Block A, Flat 3B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Postal Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1209"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Special Delivery Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g., Call before arrival, leave with security guard"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Delivery Method */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Delivery Method</h2>
                <p className="text-xs text-slate-500">Choose courier speed for {district} delivery.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'standard' as DeliveryMethodType,
                  title: `Standard Delivery (${district.toLowerCase() === 'dhaka' ? '24 - 48 Hours' : '2 - 4 Days'})`,
                  desc: 'Handled via Pathao Courier / RedX home delivery with doorstep verification',
                  fee: cartSubtotal >= 5000 ? 0 : (district.toLowerCase() === 'dhaka' ? 60 : 120),
                  badge: cartSubtotal >= 5000 ? 'FREE (Orders ৳5000+)' : undefined
                },
                {
                  id: 'express' as DeliveryMethodType,
                  title: 'Express Priority Rush (Same Day Dhaka / 24h Outside)',
                  desc: 'Immediate dispatch with priority VIP courier slot',
                  fee: (cartSubtotal >= 5000 ? 0 : (district.toLowerCase() === 'dhaka' ? 60 : 120)) + 60,
                  badge: 'FASTEST'
                },
                {
                  id: 'hub_pickup' as DeliveryMethodType,
                  title: 'Courier Hub Self-Pickup (Steadfast / RedX Hub)',
                  desc: 'Pick up package directly at nearest courier branch in your district',
                  fee: Math.max(0, (cartSubtotal >= 5000 ? 0 : (district.toLowerCase() === 'dhaka' ? 60 : 120)) - 20)
                }
              ].map(method => (
                <label
                  key={method.id}
                  onClick={() => setDeliveryMethod(method.id)}
                  className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === method.id
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === method.id}
                      onChange={() => setDeliveryMethod(method.id)}
                      className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {method.title}
                        </span>
                        {method.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-black">
                            {method.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{method.desc}</p>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    {method.fee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatBDT(method.fee)}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Method (with realistic bKash/Nagad/COD/Card UI) */}
        {step === 4 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Payment Method</h2>
                <p className="text-xs text-slate-500">Select payment method. Real transactions simulated safely for demo.</p>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* bKash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'bkash'
                    ? 'border-pink-600 bg-pink-50/50 dark:bg-pink-950/30 ring-2 ring-pink-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-pink-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#e2136e] text-white flex items-center justify-center font-black text-xs">
                  bK
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">bKash Mobile</span>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'nagad'
                    ? 'border-orange-600 bg-orange-50/50 dark:bg-orange-950/30 ring-2 ring-orange-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-orange-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#f7931e] text-white flex items-center justify-center font-black text-xs">
                  Nag
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Nagad Wallet</span>
              </button>

              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                  ৳
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Cash on Delivery</span>
              </button>

              {/* Card / Bank */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Card / Visa / MC</span>
              </button>

            </div>

            {/* Interactive Simulated Gateway Container */}
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
              {paymentMethod === 'bkash' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-pink-200 dark:border-pink-900/50">
                    <div className="flex items-center gap-2 text-pink-600 font-extrabold text-sm">
                      <span className="px-2 py-0.5 bg-pink-600 text-white rounded text-xs">bKash</span>
                      <span>Payment Gateway Demo</span>
                    </div>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{formatBDT(grandTotal)}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Your bKash Account Number
                    </label>
                    <input
                      type="text"
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-300 dark:border-pink-800 bg-white dark:bg-slate-800 font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Mock Verification OTP
                      </label>
                      <input
                        type="text"
                        value={mobileOtp}
                        onChange={(e) => setMobileOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        bKash PIN (Demo)
                      </label>
                      <input
                        type="password"
                        value={mobilePin}
                        onChange={(e) => setMobilePin(e.target.value)}
                        placeholder="•••••"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-pink-700 dark:text-pink-400">
                    ℹ️ Safe demo mode: Enter any mock numbers to test the verified payment flow.
                  </p>
                </div>
              )}

              {paymentMethod === 'nagad' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-orange-200 dark:border-orange-900/50">
                    <div className="flex items-center gap-2 text-orange-600 font-extrabold text-sm">
                      <span className="px-2 py-0.5 bg-orange-600 text-white rounded text-xs">Nagad</span>
                      <span>Direct Payment Demo</span>
                    </div>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{formatBDT(grandTotal)}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Nagad Account Number
                    </label>
                    <input
                      type="text"
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-orange-300 dark:border-orange-800 bg-white dark:bg-slate-800 font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-orange-700 dark:text-orange-400">
                    ℹ️ Instant confirmation via Nagad Post-Paid / Pre-Paid gateway simulation.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cash on Delivery Active</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Pay <strong>{formatBDT(grandTotal)}</strong> in cash to the courier delivery agent upon receiving and unboxing your gadgets. Please keep exact change ready.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Credit / Debit Card (Visa, Mastercard, Amex)</span>
                    <span className="text-xs font-black text-blue-600">{formatBDT(grandTotal)}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">MM/YY</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Order Review */}
        {step === 5 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Review Your Order</h2>
                <p className="text-xs text-slate-500">Confirm all details before final purchase.</p>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700/60 max-h-56 overflow-y-auto">
              {cart.map(item => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={item.product.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{item.product.name}</p>
                      <span className="text-slate-400">Qty: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant.name}` : ''}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {formatBDT(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping & Payment Summary Recap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-bold text-slate-400 block mb-1">Delivering To:</span>
                <p className="font-bold text-slate-900 dark:text-white">{fullName} ({phone})</p>
                <p>{address}, {thana}, {district}</p>
              </div>
              <div>
                <span className="font-bold text-slate-400 block mb-1">Payment & Courier:</span>
                <p className="font-bold text-slate-900 dark:text-white uppercase">{paymentMethod} Payment</p>
                <p className="capitalize">{deliveryMethod} Delivery ({baseDeliveryFee === 0 ? 'Free' : formatBDT(baseDeliveryFee)})</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatBDT(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{formatBDT(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Charge ({district})</span>
                <span>{baseDeliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatBDT(baseDeliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Grand Total</span>
                <span className="text-blue-600 dark:text-blue-400">{formatBDT(grandTotal)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                id="btn-confirm-place-order"
                disabled={isProcessingPayment}
                onClick={handlePlaceOrder}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-transform active:scale-95 disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Place Order ({formatBDT(grandTotal)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Order Confirmation & Invoice */}
        {step === 6 && confirmedOrder && (
          <div className="p-6 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                Order Placed Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                Thank You, {confirmedOrder.shippingAddress.fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Your order is confirmed and will be dispatched via express courier to <strong>{confirmedOrder.shippingAddress.district}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-left space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">Courier Tracking Code:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">Payment Status:</span>
                <span className="font-bold text-emerald-600 uppercase">{confirmedOrder.paymentMethod} • {confirmedOrder.paymentStatus}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">Estimated Delivery:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black pt-1">
                <span className="text-slate-900 dark:text-white">Amount Billed:</span>
                <span className="text-blue-600">{formatBDT(confirmedOrder.total)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('account')}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Track in My Account
              </button>

              <button
                onClick={() => setCurrentView('store')}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
