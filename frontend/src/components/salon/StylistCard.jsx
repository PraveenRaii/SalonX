import React from 'react';
import { useBooking } from '../../context/BookingContext';
import RatingStars from '../common/RatingStars';
import { Check, Scissors } from 'lucide-react';

export default function StylistCard({ stylist, onSelect }) {
  const { draft, setStylist } = useBooking();
  const isSelected = draft.stylist?.id === stylist.id;

  const handleSelect = () => {
    setStylist(stylist);
    if (onSelect) onSelect(stylist);
  };

  return (
    <div
      onClick={handleSelect}
      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-orange/10 dark:bg-orange/15 border-orange shadow-md ring-2 ring-orange/30'
          : 'bg-ivory-light dark:bg-charcoal-card border-sand/30 dark:border-charcoal-border hover:border-sand'
      }`}
    >
      <div>
        <div className="flex items-center gap-3.5 mb-3">
          <img
            src={stylist.avatar}
            alt={stylist.name}
            className="w-14 h-14 rounded-2xl object-cover border border-sand/30 dark:border-charcoal-border"
          />
          <div>
            <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory leading-tight">
              {stylist.name}
            </h4>
            <p className="text-xs text-orange font-medium mt-0.5">
              {stylist.title}
            </p>
            <p className="text-[11px] text-sand">
              {stylist.experience} Experience
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-ivory dark:bg-charcoal border border-sand/20 dark:border-charcoal-border text-xs mb-3">
          <span className="text-sand block text-[10px] uppercase font-bold tracking-wider">Expertise</span>
          <span className="font-medium text-charcoal dark:text-ivory">{stylist.speciality}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-sand/20 dark:border-charcoal-border flex items-center justify-between">
        <RatingStars rating={stylist.rating} count={stylist.reviewCount} />
        <button
          type="button"
          className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold flex items-center gap-1 transition-all ${
            isSelected
              ? 'bg-orange text-white'
              : 'border border-sand/40 dark:border-charcoal-border text-charcoal dark:text-ivory hover:border-orange'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Selected</span>
            </>
          ) : (
            <span>Select</span>
          )}
        </button>
      </div>
    </div>
  );
}
