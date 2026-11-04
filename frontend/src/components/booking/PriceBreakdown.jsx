import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { Tag, X, ShieldCheck, Clock, Check } from 'lucide-react';

export default function PriceBreakdown({ className = '' }) {
  const { draft, calculateTotals, applyCoupon, removeCoupon } = useBooking();
  const { addToast } = useToast();
  const [couponInput, setCouponInput] = useState('');

  const totals = calculateTotals();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      addToast({ title: 'Coupon Applied!', message: res.message, type: 'success' });
      setCouponInput('');
    } else {
      addToast({ title: 'Coupon Error', message: res.message, type: 'error' });
    }
  };

  const handleQuickApply = (code) => {
    const res = applyCoupon(code);
    if (res.success) {
      addToast({ title: 'Coupon Applied!', message: res.message, type: 'success' });
    } else {
      addToast({ title: 'Coupon Error', message: res.message, type: 'error' });
    }
  };

  return (
    <div className={`p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm space-y-5 ${className}`}>
      
      <div className="flex items-center justify-between border-b border-sand/20 dark:border-charcoal-border pb-3">
        <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory">
          Booking Summary
        </h4>
        <span className="flex items-center gap-1 text-xs text-sand font-medium">
          <Clock className="w-3.5 h-3.5 text-orange" />
          {totals.totalDuration} mins total
        </span>
      </div>

      {/* Selected Items List */}
      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
        {draft.services.length === 0 ? (
          <p className="text-xs text-sand italic py-2">No services selected yet.</p>
        ) : (
          draft.services.map((srv) => (
            <div key={srv.id} className="flex items-start justify-between gap-2 text-xs">
              <div>
                <p className="font-medium text-charcoal dark:text-ivory leading-tight">{srv.name}</p>
                <p className="text-[11px] text-sand">{srv.durationMinutes} mins</p>
              </div>
              <span className="font-heading font-bold text-charcoal dark:text-ivory shrink-0">
                ₹{srv.price}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Promo Code Input & Badges */}
      <div className="pt-3 border-t border-sand/20 dark:border-charcoal-border">
        {draft.coupon ? (
          <div className="p-3 rounded-xl bg-orange/15 border border-orange/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange" />
              <div>
                <span className="text-xs font-heading font-bold text-orange uppercase tracking-wide">
                  {draft.coupon.code}
                </span>
                <p className="text-[10px] text-charcoal/70 dark:text-ivory/70">
                  {draft.coupon.description}
                </p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 text-orange hover:bg-orange/20 rounded-lg transition-colors cursor-pointer"
              title="Remove promo code"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Enter promo coupon code"
                className="flex-1 bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border px-3.5 py-2 rounded-xl text-xs text-charcoal dark:text-ivory uppercase placeholder-sand focus:outline-none focus:border-orange font-heading"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal text-xs font-heading font-bold hover:bg-orange hover:text-white transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-sand">Try:</span>
              <button
                type="button"
                onClick={() => handleQuickApply('SALONX50')}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand/15 text-orange hover:bg-orange/20 transition-colors"
              >
                SALONX50
              </button>
              <button
                type="button"
                onClick={() => handleQuickApply('LUXE20')}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand/15 text-orange hover:bg-orange/20 transition-colors"
              >
                LUXE20
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Numerical Breakdown */}
      <div className="space-y-2 text-xs pt-3 border-t border-sand/20 dark:border-charcoal-border">
        <div className="flex justify-between text-charcoal/70 dark:text-ivory/70">
          <span>Services Subtotal</span>
          <span>₹{totals.subtotal}</span>
        </div>

        {totals.discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Special Promo Discount</span>
            <span>- ₹{totals.discount}</span>
          </div>
        )}

        <div className="flex justify-between text-charcoal/70 dark:text-ivory/70">
          <span>Taxes &amp; GST (5%)</span>
          <span>₹{totals.taxes}</span>
        </div>

        <div className="flex justify-between text-charcoal/70 dark:text-ivory/70">
          <span>SalonX Safety &amp; Tech Fee</span>
          <span>₹{totals.convenienceFee}</span>
        </div>

        <div className="flex justify-between items-baseline pt-3 border-t border-sand/30 dark:border-charcoal-border">
          <span className="font-heading font-extrabold text-sm text-charcoal dark:text-ivory">
            Total Payable
          </span>
          <span className="font-heading font-extrabold text-xl text-orange">
            ₹{totals.finalTotal}
          </span>
        </div>
      </div>

      {/* Safety Guarantee */}
      <div className="p-3 rounded-xl bg-sand/15 dark:bg-charcoal/60 border border-sand/20 dark:border-charcoal-border flex items-center gap-2 text-[11px] text-sand">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Free cancellation up to 2 hours prior to scheduled appointment.</span>
      </div>

    </div>
  );
}
