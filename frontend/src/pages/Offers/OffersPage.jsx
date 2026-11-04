import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_COUPONS, MOCK_SALONS } from '../../services/mockData';
import { useToast } from '../../context/ToastContext';
import { Percent, Sparkles, Tag, ArrowRight, Copy, Check } from 'lucide-react';

export default function OffersPage() {
  const { addToast } = useToast();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    addToast({
      title: 'Coupon Copied!',
      message: `Code ${code} copied to clipboard. Apply at booking checkout.`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-orange block mb-1">
            Exclusive Deals
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-ivory">
            SalonX Privileges &amp; Promotions
          </h1>
          <p className="text-sm text-sand mt-2">
            Enjoy curated seasonal discounts on haircuts, luxury balayage, hydra-facials, and gentlemen’s grooming packages.
          </p>
        </div>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {MOCK_COUPONS.map((cpn) => (
            <div
              key={cpn.code}
              className="p-8 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-orange/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange/15 text-orange text-xs font-mono font-bold tracking-wider">
                    {cpn.code}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Verified Promo
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
                  {cpn.discountPercent ? `${cpn.discountPercent}% OFF` : `₹${cpn.discountAmount} FLAT OFF`}
                </h3>

                <p className="text-xs text-charcoal/70 dark:text-ivory/70 mt-2 leading-relaxed">
                  {cpn.description}
                </p>

                <p className="text-[11px] text-sand mt-2 font-medium">
                  Valid on bookings above ₹{cpn.minBookingAmount}
                </p>
              </div>

              <div className="pt-4 border-t border-sand/20 dark:border-charcoal-border flex items-center gap-3">
                <button
                  onClick={() => handleCopy(cpn.code)}
                  className="flex-1 py-2.5 rounded-xl border border-sand/40 dark:border-charcoal-border hover:border-orange text-xs font-heading font-semibold text-charcoal dark:text-ivory flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </button>
                <Link
                  to="/explore"
                  className="flex-1 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-heading font-semibold text-center shadow-md shadow-orange/20 transition-all"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Salons Offering Special Discounts */}
        <div className="border-t border-sand/30 dark:border-charcoal-border pt-12">
          <h3 className="font-heading font-bold text-2xl text-charcoal dark:text-ivory mb-6">
            Salons Participating in This Week’s Privileges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SALONS.slice(0, 3).map((s) => (
              <div key={s.id} className="p-5 rounded-2xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border flex items-center gap-4">
                <img src={s.coverImage} alt={s.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-sm text-charcoal dark:text-ivory truncate">{s.name}</h4>
                  <p className="text-xs text-orange font-semibold">Accepts all SalonX coupons</p>
                  <p className="text-[11px] text-sand">{s.address}</p>
                </div>
                <Link to={`/salon/${s.id}`} className="text-orange hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
