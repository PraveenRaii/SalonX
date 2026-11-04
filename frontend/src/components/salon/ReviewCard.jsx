import React from 'react';
import RatingStars from '../common/RatingStars';
import { CheckCircle2, ThumbsUp } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="p-5 rounded-2xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover border border-sand/30"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h5 className="font-heading font-bold text-sm text-charcoal dark:text-ivory">
                {review.userName}
              </h5>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            </div>
            <p className="text-[11px] text-sand">{review.date}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} showCount={false} />
      </div>

      {review.serviceName && (
        <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-sand/15 dark:bg-charcoal-border text-sand-dark dark:text-sand mb-2">
          Service: {review.serviceName}
        </span>
      )}

      <p className="text-xs sm:text-sm text-charcoal/80 dark:text-ivory/80 leading-relaxed">
        "{review.comment}"
      </p>

      <div className="mt-3 pt-3 border-t border-sand/20 dark:border-charcoal-border flex items-center justify-between text-[11px] text-sand">
        <span>Helpful review?</span>
        <button className="flex items-center gap-1 text-xs hover:text-orange transition-colors cursor-pointer">
          <ThumbsUp className="w-3 h-3" />
          <span>Helpful (14)</span>
        </button>
      </div>
    </div>
  );
}
