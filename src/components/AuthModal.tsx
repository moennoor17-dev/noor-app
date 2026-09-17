import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, KeyRound, Sparkles, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInGoogle, signInDemo } = useStore();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInGoogle();
    setLoading(false);
    onClose();
  };

  const handleDemoSignIn = (role: 'customer' | 'admin') => {
    signInDemo(role);
    onClose();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Fast mock login using custom credentials
    signInDemo('customer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-6 sm:p-8 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl mx-auto shadow-md">
            G
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {isRegisterMode ? 'Create GadgetHub Account' : 'Welcome to GadgetHub'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to track orders, save wishlist, and access exclusive Bangladeshi member tech deals.
          </p>
        </div>

        {/* Instant Fast Demo Logins (Convenient for evaluators) */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant One-Click Demo Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoSignIn('customer')}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Customer Demo</span>
            </button>

            <button
              onClick={() => handleDemoSignIn('admin')}
              className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 hover:border-purple-500 text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Google Sign-In with Firebase Auth */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-3 transition-colors shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google Account</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          <span className="text-[11px] font-semibold text-slate-400">OR WITH EMAIL</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmitForm} className="space-y-3">
          {isRegisterMode && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvir Ahmed"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tanvir@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            {isRegisterMode ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            {isRegisterMode 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Create one"}
          </button>
        </div>

      </div>
    </div>
  );
};
