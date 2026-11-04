import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { MOCK_SALONS } from '../../services/mockData';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import RatingStars from '../../components/common/RatingStars';
import ServiceItem from '../../components/salon/ServiceItem';
import StylistCard from '../../components/salon/StylistCard';
import ReviewCard from '../../components/salon/ReviewCard';
import {
  MapPin,
  Clock,
  Heart,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Phone,
  Navigation,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';

export default function SalonDetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite, draft, initDraft, calculateTotals } = useBooking();
  const { addToast } = useToast();

  const salon = MOCK_SALONS.find(s => s.id === id) || MOCK_SALONS[0];
  const [activePhoto, setActivePhoto] = useState(salon.coverImage);
  const [activeCategory, setActiveCategory] = useState('all');

  // If URL has ?book=true or salon changes, initialize draft if needed
  useEffect(() => {
    if (draft.salon?.id !== salon.id) {
      initDraft(salon);
    }
  }, [salon.id]);

  const isFav = isFavourite(salon.id);
  const totals = calculateTotals();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${salon.name} on SalonX`,
        text: `Book an appointment at ${salon.name} on SalonX!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        title: 'Link Copied',
        message: 'Salon link copied to clipboard.',
        type: 'success'
      });
    }
  };

  // Filter salon services
  const displayedServices = activeCategory === 'all'
    ? salon.services
    : salon.services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  // Distinct categories available in this salon
  const salonCategories = ['all', ...new Set(salon.services.map(s => s.category))];

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory pb-28 transition-colors">
      
      {/* 1. Header & Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-sand mb-4">
          <Link to="/" className="hover:text-orange">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-orange">Salons</Link>
          <span>/</span>
          <span className="text-charcoal dark:text-ivory font-semibold truncate">{salon.name}</span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 rounded-3xl overflow-hidden shadow-xl border border-sand/30 dark:border-charcoal-border">
          {/* Main Hero Photo */}
          <div className="lg:col-span-8 h-80 sm:h-96 lg:h-[460px] relative overflow-hidden group">
            <img
              src={activePhoto}
              alt={salon.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Badges in Image */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-orange text-white text-xs font-heading font-bold uppercase tracking-wider shadow-md">
                {salon.badge || 'Verified Partner'}
              </span>
              <span className="px-3 py-1 rounded-full bg-charcoal/80 text-white backdrop-blur-md text-xs font-semibold">
                {salon.gender}
              </span>
            </div>

            {/* Actions top right */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-charcoal/70 backdrop-blur-md text-white hover:text-orange transition-colors cursor-pointer"
                title="Share Salon"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavourite(salon.id)}
                className="p-2.5 rounded-full bg-charcoal/70 backdrop-blur-md text-white hover:text-orange transition-colors cursor-pointer"
                title="Add to Favourites"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-orange text-orange' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnail sidebar */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3 h-auto lg:h-[460px]">
            {salon.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhoto(img)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer h-24 lg:h-auto ${
                  activePhoto === img ? 'border-orange scale-98' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Salon thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

      </div>


      {/* 2. Main Content & Sidebar Booking Sticky Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Details, Menus, Stylists, Reviews */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Salon Header Information */}
            <div className="border-b border-sand/30 dark:border-charcoal-border pb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-ivory">
                    {salon.name}
                  </h1>
                  {salon.verified && (
                    <CheckCircle2 className="w-6 h-6 text-orange fill-orange/10" title="Verified SalonX Partner" />
                  )}
                </div>
                <RatingStars rating={salon.rating} count={salon.reviewCount} size="md" />
              </div>

              <p className="text-sm font-heading font-medium text-orange mb-3">
                {salon.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-sand">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-orange shrink-0" />
                  <span>{salon.address} ({salon.distanceKm} km away)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange shrink-0" />
                  <span>{salon.openingHours}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-charcoal/80 dark:text-ivory/80 leading-relaxed mt-4">
                {salon.description}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mt-5">
                {salon.amenities.map((am) => (
                  <span
                    key={am}
                    className="px-3 py-1 rounded-xl bg-sand/15 dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border text-xs font-medium text-charcoal/80 dark:text-ivory/80 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-orange" />
                    {am}
                  </span>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div id="services-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-orange block">
                    Service Catalog
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
                    Select Your Services
                  </h3>
                </div>

                {/* Category tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {salonCategories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-heading font-semibold capitalize transition-colors cursor-pointer ${
                        activeCategory === c
                          ? 'bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal'
                          : 'bg-sand/15 text-charcoal/70 dark:text-ivory/70 hover:bg-sand/25'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {displayedServices.map((srv) => (
                  <ServiceItem key={srv.id} service={srv} />
                ))}
              </div>
            </div>

            {/* Stylists Section */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-orange block">
                  Artisans &amp; Specialists
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
                  Meet the Master Stylists
                </h3>
                <p className="text-xs text-sand mt-0.5">
                  Select your specialist or opt for our top available artist at booking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {salon.stylists.map((sty) => (
                  <StylistCard key={sty.id} stylist={sty} />
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-orange block">
                    Client Praise
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
                    Verified Customer Reviews
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-heading font-black text-2xl text-orange">{salon.rating} ★</p>
                  <p className="text-xs text-sand">Based on {salon.reviewCount} visits</p>
                </div>
              </div>

              <div className="space-y-4">
                {salon.reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border">
              <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                SalonX Guarantee &amp; Cancellation Policy
              </h4>
              <ul className="text-xs text-charcoal/70 dark:text-ivory/70 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>Free cancellation or rescheduling up to 2 hours prior to your booked slot.</li>
                <li>Zero-wait promise: If your chair is not ready within 10 minutes of arrival, receive a 20% cashback credit.</li>
                <li>Strict medical-grade sterilization protocol for all instruments and scissors.</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Sticky Summary & Guided Booking Launcher */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              <PriceBreakdown />

              {/* Proceed to Guided Booking Flow CTA */}
              <button
                onClick={() => {
                  if (draft.services.length === 0) {
                    addToast({
                      title: 'Select a Service',
                      message: 'Please choose at least one service from the menu above to proceed.',
                      type: 'default'
                    });
                    const el = document.getElementById('services-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate(`/booking/${salon.id}`);
                  }
                }}
                className="w-full py-4 rounded-2xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-xl shadow-orange/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Slot &amp; Stylist</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Assistance Card */}
              <div className="p-4 rounded-2xl bg-sand/15 dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border text-xs text-sand flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <div>
                  <p className="font-semibold text-charcoal dark:text-ivory">Need special bridal or group packages?</p>
                  <p className="text-[11px]">Salon Concierge: +91 800-SALONX</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
