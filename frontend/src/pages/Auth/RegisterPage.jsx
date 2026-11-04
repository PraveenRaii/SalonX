import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Scissors, Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'CUSTOMER'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      setLoading(false);
      addToast({
        title: 'Account Created',
        message: 'Welcome to SalonX! Enjoy 50% off with coupon SALONX50.',
        type: 'success'
      });
      navigate('/customer/dashboard');
    } catch (err) {
      setLoading(false);
      addToast({
        title: 'Registration Error',
        message: 'Could not create account.',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-16 flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-md">
        
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
            Join the Privé Beauty Circle
          </h2>
          <p className="text-xs text-sand mt-1">
            Unlock priority stylist booking and member-only pricing.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Priya Sharma"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya@domain.com"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-md shadow-orange/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-sand">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-bold text-orange hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
