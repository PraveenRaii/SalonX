import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { Clock, Plus, Check, Sparkles } from 'lucide-react';

export default function ServiceItem({ service, onBookClick }) {
  const { draft, toggleService } = useBooking();
  const { addToast } = useToast();

  const isSelected = draft.services.some(s => s.id === service.id);

  const handleToggle = () => {
    toggleService(service);
    if (!isSelected) {
      addToast({
        title: 'Service Added',
        message: `${service.name} (₹${service.price}) added to your appointment bag.`,
        type: 'success'
      });
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isSelected
          ? 'bg-orange/10 dark:bg-orange/15 border-orange shadow-md'
          : 'bg-ivory-light dark:bg-charcoal-card border-sand/30 dark:border-charcoal-border hover:border-sand'
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {service.popular && (
            <span className="px-2 py-0.5 rounded-full bg-orange/20 text-orange text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          )}
          <span className="text-[11px] font-medium text-sand uppercase tracking-wider">
            {service.category} • {service.gender}
          </span>
        </div>

        <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory">
          {service.name}
        </h4>

        {service.description && (
          <p className="text-xs text-charcoal/70 dark:text-ivory/70 mt-1 leading-relaxed max-w-xl">
            {service.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-2 text-xs text-sand">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange" />
            {service.durationMinutes} minutes
          </span>
          {service.originalPrice && (
            <span className="text-sand/70 line-through">
              ₹{service.originalPrice}
            </span>
          )}
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-sand/20 dark:border-charcoal-border">
        <div className="text-left sm:text-right">
          <span className="font-heading font-extrabold text-xl text-charcoal dark:text-ivory">
            ₹{service.price}
          </span>
        </div>

        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isSelected
              ? 'bg-orange text-white shadow-sm ring-2 ring-orange/30'
              : 'border border-orange text-orange hover:bg-orange hover:text-white'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
