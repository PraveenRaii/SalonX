import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0, count, showCount = true, size = 'sm', className = '' }) {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-500">
        <Star className={`${iconSizes[size]} fill-amber-400 text-amber-400`} />
      </div>
      <span className="font-heading font-bold text-charcoal dark:text-ivory text-xs sm:text-sm">
        {Number(rating).toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className="text-xs text-charcoal/60 dark:text-ivory/60">
          ({count})
        </span>
      )}
    </div>
  );
}
