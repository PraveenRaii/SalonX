import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import RatingStars from '../common/RatingStars';
import Badge from '../common/Badge';
import { Heart, MapPin, Clock, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function SalonCard({ salon, viewMode = 'grid' }) {
  const { isFavourite, toggleFavourite, initDraft } = useBooking();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const isFav = isFavourite(salon.id);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(salon.id);
    addToast({
      title: isFav ? 'Removed from Favourites' : 'Added to Favourites',
      message: `${salon.name} has been ${isFav ? 'removed from' : 'saved to'} your curated salons.`,
      type: isFav ? 'default' : 'success'
    });
  };

  const handleQuickBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    initDraft(salon);
    navigate(`/salon/${salon.id}?book=true`);
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-ivory-light dark:bg-charcoal-card rounded-2xl border border-sand/30 dark:border-charcoal-border hover:border-orange/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col md:flex-row">
        {/* Cover Image */}
        <div className="relative md:w-72 h-56 md:h-auto shrink-0 overflow-hidden">
          <img
            src={salon.coverImage}
            alt={salon.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          
          {/* Favourite button */}
          <button
            onClick={handleFavouriteClick}
            aria-label="Save Salon"
            className="absolute top-3 right-3 p-2 rounded-full bg-charcoal/50 backdrop-blur-md text-ivory hover:text-orange transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-orange text-orange' : ''}`} />
          </button>

          {/* Badge */}
          {salon.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-orange text-white text-[11px] font-heading font-semibold tracking-wide uppercase shadow-sm">
                {salon.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sand/20 dark:bg-charcoal-border text-charcoal/80 dark:text-ivory/80">
                  {salon.gender}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${salon.isOpenNow ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${salon.isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {salon.isOpenNow ? 'Open Now' : 'Closed'}
                </span>
              </div>
              <RatingStars rating={salon.rating} count={salon.reviewCount} />
            </div>

            <Link to={`/salon/${salon.id}`} className="group-hover:text-orange transition-colors">
              <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory flex items-center gap-1.5">
                {salon.name}
                {salon.verified && <CheckCircle2 className="w-4 h-4 text-orange fill-orange/10" />}
              </h3>
            </Link>

            <p className="text-xs text-sand-dark dark:text-sand flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-orange shrink-0" />
              <span>{salon.address} • <strong className="font-semibold text-charcoal dark:text-ivory">{salon.distanceKm} km away</strong></span>
            </p>

            <p className="text-xs text-charcoal/70 dark:text-ivory/70 line-clamp-2 mt-2 leading-relaxed">
              {salon.description}
            </p>

            {/* Popular service chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {salon.services.slice(0, 3).map((srv) => (
                <span
                  key={srv.id}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-ivory dark:bg-charcoal-border/70 border border-sand/30 dark:border-charcoal-border text-charcoal/80 dark:text-ivory/80"
                >
                  {srv.name} (₹{srv.price})
                </span>
              ))}
              {salon.services.length > 3 && (
                <span className="text-[11px] px-1.5 py-0.5 text-sand">
                  +{salon.services.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-sand/20 dark:border-charcoal-border flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-sand">Starting from</p>
              <p className="font-heading font-extrabold text-lg text-charcoal dark:text-ivory">
                ₹{salon.startingPrice}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/salon/${salon.id}`}
                className="px-4 py-2 rounded-xl text-xs font-heading font-semibold border border-sand/40 dark:border-charcoal-border hover:bg-sand/10 text-charcoal dark:text-ivory transition-colors"
              >
                View Details
              </Link>
              <button
                onClick={handleQuickBook}
                className="px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-orange hover:bg-orange-hover text-white shadow-md shadow-orange/20 transition-all cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Card
  return (
    <div className="group luxury-card bg-ivory-light dark:bg-charcoal-card rounded-2xl border border-sand/30 dark:border-charcoal-border hover:border-orange/50 transition-all duration-300 overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        {/* Cover Image Container */}
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={salon.coverImage}
            alt={salon.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

          {/* Badge */}
          {salon.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-orange text-white text-[11px] font-heading font-semibold tracking-wide uppercase shadow-sm">
                {salon.badge}
              </span>
            </div>
          )}

          {/* Favourite button */}
          <button
            onClick={handleFavouriteClick}
            aria-label="Save Salon"
            className="absolute top-3 right-3 p-2 rounded-full bg-charcoal/60 backdrop-blur-md text-ivory hover:text-orange transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-orange text-orange' : ''}`} />
          </button>

          {/* Distance & Gender Floating Tag */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-ivory">
            <span className="font-heading font-medium flex items-center gap-1 drop-shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-orange" />
              {salon.distanceKm} km • {salon.city}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-medium border border-white/10">
              {salon.gender}
            </span>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <RatingStars rating={salon.rating} count={salon.reviewCount} />
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${salon.isOpenNow ? 'text-emerald-600 dark:text-emerald-400' : 'text-sand'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${salon.isOpenNow ? 'bg-emerald-500' : 'bg-sand'}`} />
              {salon.isOpenNow ? 'Open Now' : 'Closed'}
            </span>
          </div>

          <Link to={`/salon/${salon.id}`} className="group-hover:text-orange transition-colors block">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory leading-tight truncate">
              {salon.name}
            </h3>
          </Link>

          <p className="text-xs text-sand-dark dark:text-sand line-clamp-1 mt-0.5">
            {salon.tagline || salon.address}
          </p>

          {/* Services mini-pills */}
          <div className="flex flex-wrap gap-1 mt-3">
            {salon.services.slice(0, 2).map((srv) => (
              <span
                key={srv.id}
                className="text-[10px] px-2 py-0.5 rounded-md bg-ivory dark:bg-charcoal-border/80 border border-sand/30 dark:border-charcoal-border text-charcoal/80 dark:text-ivory/80 truncate max-w-[140px]"
              >
                {srv.name}
              </span>
            ))}
            {salon.services.length > 2 && (
              <span className="text-[10px] px-1 py-0.5 text-sand font-medium">
                +{salon.services.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-sand/20 dark:border-charcoal-border/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Starts at</span>
          <p className="font-heading font-extrabold text-base text-charcoal dark:text-ivory leading-none">
            ₹{salon.startingPrice}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/salon/${salon.id}`}
            className="p-2 rounded-xl border border-sand/30 dark:border-charcoal-border hover:bg-sand/15 text-charcoal dark:text-ivory transition-colors"
            title="View Salon Details"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleQuickBook}
            className="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold bg-orange hover:bg-orange-hover text-white shadow-sm shadow-orange/20 transition-all cursor-pointer"
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
}
