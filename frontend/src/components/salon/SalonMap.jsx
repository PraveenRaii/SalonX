import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Star, ArrowUpRight, CheckCircle2, Car } from 'lucide-react';
import RatingStars from '../common/RatingStars';

export default function SalonMap({ salons = [] }) {
  const [selectedSalon, setSelectedSalon] = useState(salons[0] || null);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-sand/30 dark:border-charcoal-border bg-[#EFECE6] dark:bg-[#1a1915] min-h-[550px] flex flex-col md:flex-row shadow-lg">
      
      {/* Map Canvas Background (Simulated high-res vector aesthetic map with street grids) */}
      <div className="relative flex-1 min-h-[350px] overflow-hidden">
        {/* Subtle Map SVG Grid Background */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#B9A58C" strokeWidth="0.8" />
                <circle cx="30" cy="30" r="1.5" fill="#B9A58C" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Curving River / Highway paths */}
            <path d="M -50 200 Q 200 150 450 350 T 950 300" fill="none" stroke="#D97736" strokeWidth="4" opacity="0.25" />
            <path d="M 100 -50 Q 250 200 200 550" fill="none" stroke="#B9A58C" strokeWidth="3" opacity="0.4" />
          </svg>
        </div>

        {/* Live User Location Pin */}
        <div className="absolute top-[65%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-ping absolute inset-0 opacity-75"></div>
            <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-charcoal/80 text-white text-[10px] font-semibold backdrop-blur-md">
            You Are Here
          </span>
        </div>

        {/* Dynamic Salon Pins */}
        {salons.map((salon, idx) => {
          // Calculate positions dynamically for realistic layout
          const positions = [
            { top: '30%', left: '35%' },
            { top: '48%', left: '60%' },
            { top: '22%', left: '70%' },
            { top: '70%', left: '50%' },
            { top: '55%', left: '20%' },
            { top: '38%', left: '80%' }
          ];
          const pos = positions[idx % positions.length];
          const isSelected = selectedSalon?.id === salon.id;

          return (
            <div
              key={salon.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              onClick={() => setSelectedSalon(salon)}
            >
              <div
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-orange text-white scale-110 ring-4 ring-orange/30 font-bold'
                    : 'bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory border border-sand/40 hover:scale-105'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-orange'}`} />
                <span className="text-xs font-heading font-semibold whitespace-nowrap">
                  {salon.name.split(' ')[0]}
                </span>
                <span className="text-[10px] opacity-80">
                  ₹{salon.startingPrice}
                </span>
              </div>
            </div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={() => setSelectedSalon(salons[0])}
            className="p-2.5 rounded-xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border text-charcoal dark:text-ivory shadow-md hover:text-orange transition-colors cursor-pointer"
            title="Recenter Map"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>

        {/* Transport Distance Badge */}
        <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-charcoal/85 backdrop-blur-md text-ivory text-xs flex items-center gap-2 border border-charcoal-border">
          <Car className="w-3.5 h-3.5 text-orange" />
          <span>Real-time GPS Distance Matrix Enabled</span>
        </div>
      </div>

      {/* Selected Salon Preview Sidebar */}
      {selectedSalon && (
        <div className="w-full md:w-80 lg:w-96 bg-ivory dark:bg-charcoal-card border-t md:border-t-0 md:border-l border-sand/30 dark:border-charcoal-border p-6 flex flex-col justify-between z-20">
          <div>
            <div className="relative h-44 rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img
                src={selectedSalon.coverImage}
                alt={selectedSalon.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-orange text-white text-[10px] font-heading font-bold uppercase tracking-wide">
                  {selectedSalon.badge || 'Verified Partner'}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-charcoal/70 backdrop-blur-md text-ivory text-xs font-semibold">
                {selectedSalon.distanceKm} km away
              </div>
            </div>

            <div className="flex items-center justify-between mb-1">
              <RatingStars rating={selectedSalon.rating} count={selectedSalon.reviewCount} />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {selectedSalon.isOpenNow ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <h4 className="font-heading font-bold text-xl text-charcoal dark:text-ivory mt-1">
              {selectedSalon.name}
            </h4>
            <p className="text-xs text-sand-dark dark:text-sand mt-0.5">
              {selectedSalon.address}
            </p>

            <p className="text-xs text-charcoal/70 dark:text-ivory/70 line-clamp-2 mt-2 leading-relaxed">
              {selectedSalon.description}
            </p>

            {/* Travel Estimate */}
            <div className="mt-4 p-3 rounded-xl bg-sand/15 dark:bg-charcoal border border-sand/20 dark:border-charcoal-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-orange" />
                <span className="font-medium text-charcoal dark:text-ivory">Estimated Ride Time</span>
              </div>
              <span className="font-bold text-orange">~{Math.round(selectedSalon.distanceKm * 4 + 2)} mins</span>
            </div>
          </div>

          <div className="pt-4 border-t border-sand/20 dark:border-charcoal-border mt-4 flex items-center gap-3">
            <Link
              to={`/salon/${selectedSalon.id}`}
              className="flex-1 text-center py-2.5 rounded-xl border border-sand/30 dark:border-charcoal-border text-xs font-heading font-semibold text-charcoal dark:text-ivory hover:bg-sand/10 transition-colors"
            >
              View Profile
            </Link>
            <Link
              to={`/salon/${selectedSalon.id}?book=true`}
              className="flex-1 text-center py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-heading font-semibold shadow-md shadow-orange/20 transition-all"
            >
              Book Service
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
