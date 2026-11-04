import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import {
  Scissors,
  TrendingUp,
  ShieldCheck,
  Users,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function BecomePartnerPage() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    salonName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: 'Bengaluru',
    address: '',
    salonType: 'Unisex',
    stylistCount: '4'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      addToast({
        title: 'Partner Application Received!',
        message: `Thank you, ${formData.ownerName}. Our onboarding team will inspect ${formData.salonName} within 24 hours.`,
        type: 'success'
      });
      navigate('/owner/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="rounded-3xl bg-charcoal text-ivory p-8 sm:p-14 mb-16 relative overflow-hidden border border-charcoal-border shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-orange/20 text-orange text-xs font-heading font-bold uppercase tracking-wider inline-block">
              SalonX Partner Network
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              Scale Your Salon Business With India’s Most Coveted Marketplace.
            </h1>
            <p className="text-sand text-sm sm:text-base leading-relaxed">
              Join elite ateliers that eliminate empty salon chairs, increase client frequency, and streamline operations with our salon booking engine.
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange/15 text-orange flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Zero Upfront Setup Fees</h3>
            <p className="text-xs text-charcoal/70 dark:text-ivory/70 leading-relaxed">
              Pay nothing to list your salon. You only pay a modest 12% commission on bookings completed through our platform.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange/15 text-orange flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">End No-Shows Forever</h3>
            <p className="text-xs text-charcoal/70 dark:text-ivory/70 leading-relaxed">
              Prepaid bookings and automated SMS/WhatsApp reminders reduce costly cancellations by over 88%.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange/15 text-orange flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Stylist Roster Management</h3>
            <p className="text-xs text-charcoal/70 dark:text-ivory/70 leading-relaxed">
              Manage your stylists’ working shifts, service menus, commissions and tip tracking all from one sleek tablet dashboard.
            </p>
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border p-8 sm:p-10 shadow-xl">
          <div className="mb-6">
            <h3 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
              Register Your Salon in 2 Minutes
            </h3>
            <p className="text-xs text-sand mt-1">
              Fill in your details below and our city manager will schedule a premise verification visit.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  Salon / Studio Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.salonName}
                  onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                  placeholder="E.g. Velvet &amp; Razor Studio"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>

              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  Owner / Representative Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="E.g. Siddharth Rao"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@salon.com"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>

              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  Direct Contact Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98000 00000"
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  City
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  Salon Type
                </label>
                <select
                  value={formData.salonType}
                  onChange={(e) => setFormData({ ...formData, salonType: e.target.value })}
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory"
                >
                  <option value="Unisex">Unisex Atelier</option>
                  <option value="Women">Women Only Salon</option>
                  <option value="Men">Men’s Barbershop</option>
                  <option value="Spa">Spa &amp; Wellness</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                  Active Chairs / Staff
                </label>
                <select
                  value={formData.stylistCount}
                  onChange={(e) => setFormData({ ...formData, stylistCount: e.target.value })}
                  className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory"
                >
                  <option value="1-3">1 - 3 Stylists</option>
                  <option value="4-8">4 - 8 Stylists</option>
                  <option value="9+">9+ Stylists (Large Atelier)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1">
                Full Street Address
              </label>
              <textarea
                rows="2"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Shop No, Building Name, Street / Locality..."
                className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3 rounded-xl text-xs text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-xl shadow-orange/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{submitting ? 'Submitting Application...' : 'Submit Salon Application'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
