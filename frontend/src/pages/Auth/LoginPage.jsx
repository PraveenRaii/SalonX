import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Scissors, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, switchRole } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('priya@example.com');
  const [password, setPassword] = useState('salonx123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(email, password);
      setLoading(false);
      addToast({
        title: 'Welcome Back!',
        message: `Logged in successfully as ${res.user.name}.`,
        type: 'success'
      });

      const from = location.state?.from?.pathname || '/customer/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      addToast({
        title: 'Login Error',
        message: 'Invalid email or password.',
        type: 'error'
      });
    }
  };

  const handleQuickDemoLogin = (roleId) => {
    switchRole(roleId);
    addToast({
      title: 'Demo Mode Activated',
      message: `Signed in with demo role: ${roleId}`,
      type: 'success'
    });
    if (roleId === 'SALON_OWNER' || roleId === 'STAFF') {
      navigate('/owner/dashboard');
    } else if (roleId === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-16 flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-charcoal dark:bg-ivory text-orange flex items-center justify-center shadow-md">
              <Scissors className="w-6 h-6 stroke-[2.2] transform -rotate-45" />
            </div>
            <span className="font-heading font-extrabold text-3xl tracking-tight text-charcoal dark:text-ivory">
              Salon<span className="text-orange">X</span>
            </span>
          </Link>
          <h2 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
            Welcome to SalonX
          </h2>
          <p className="text-xs text-sand mt-1">
            Access your appointments, saved salons, and loyalty rewards.
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider">
                  Password
                </label>
                <Link to="/auth/forgot-password" className="text-xs text-orange hover:underline font-medium">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-md shadow-orange/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins for Reviewers */}
          <div className="pt-4 border-t border-sand/20 dark:border-charcoal-border">
            <span className="text-[10px] uppercase font-bold text-sand tracking-widest block text-center mb-3">
              1-Click Demo Profiles
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('CUSTOMER')}
                className="py-2 px-2.5 rounded-xl border border-sand/30 dark:border-charcoal-border text-[11px] font-semibold text-charcoal dark:text-ivory hover:border-orange hover:bg-orange/10 transition-colors text-center cursor-pointer"
              >
                👤 Customer Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('SALON_OWNER')}
                className="py-2 px-2.5 rounded-xl border border-sand/30 dark:border-charcoal-border text-[11px] font-semibold text-charcoal dark:text-ivory hover:border-orange hover:bg-orange/10 transition-colors text-center cursor-pointer"
              >
                ✂️ Salon Owner
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('STAFF')}
                className="py-2 px-2.5 rounded-xl border border-sand/30 dark:border-charcoal-border text-[11px] font-semibold text-charcoal dark:text-ivory hover:border-orange hover:bg-orange/10 transition-colors text-center cursor-pointer"
              >
                🎨 Stylist / Staff
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('ADMIN')}
                className="py-2 px-2.5 rounded-xl border border-sand/30 dark:border-charcoal-border text-[11px] font-semibold text-charcoal dark:text-ivory hover:border-orange hover:bg-orange/10 transition-colors text-center cursor-pointer"
              >
                ⚡ Super Admin
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-sand">
              Don’t have an account yet?{' '}
              <Link to="/auth/register" className="font-bold text-orange hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
