import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MOCK_SALONS,
  SALON_CATEGORIES,
  MOCK_COUPONS
} from '../../services/mockData';
import SalonCard from '../../components/salon/SalonCard';
import RatingStars from '../../components/common/RatingStars';
import {
  Search,
  MapPin,
  Sparkles,
  Scissors,
  ShieldCheck,
  Clock,
  ArrowRight,
  Star,
  CheckCircle2,
  CalendarCheck2,
  ChevronRight,
  TrendingUp,
  Percent,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('Indiranagar, Bengaluru');
  const [searchService, setSearchService] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(searchService)}&location=${encodeURIComponent(searchLocation)}`);
  };

  const featuredSalons = MOCK_SALONS.filter(s => s.featured);
  const topRatedSalons = [...MOCK_SALONS].sort((a, b) => b.rating - a.rating).slice(0, 3);

  // Trending services extracted from mock
  const trendingServices = [
    {
      id: 'srv-101',
      salonId: 'salon-1',
      salonName: 'The Luxe Atelier',
      name: 'Signature Precision Cut & Sculpting',
      category: 'Haircut',
      price: 1250,
      originalPrice: 1500,
      duration: '45 mins',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'srv-102',
      salonId: 'salon-1',
      salonName: 'The Luxe Atelier',
      name: 'French Balayage & Gloss Therapy',
      category: 'Hair Colour',
      price: 4800,
      originalPrice: 5500,
      duration: '120 mins',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'srv-302',
      salonId: 'salon-3',
      salonName: 'Aura Bloom Organic Salon',
      name: 'Rose Quartz Guasha Radiance Facial',
      category: 'Facial & Skin',
      price: 2600,
      originalPrice: 3100,
      duration: '60 mins',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'srv-201',
      salonId: 'salon-2',
      salonName: 'Maison Noir Parlour',
      name: 'The Executive Scissor Cut & Hot Shave',
      category: 'Gentlemen',
      price: 900,
      originalPrice: 1100,
      duration: '40 mins',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory transition-colors">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32">
        {/* Subtle Luxury Gradient Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[550px] h-[550px] bg-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[450px] h-[450px] bg-sand/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Search */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Pill tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/20 dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border text-xs font-heading font-semibold text-charcoal dark:text-ivory shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-orange" />
                <span>The Uber for Premium Salons &amp; Stylists</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-charcoal dark:text-ivory">
                Good Hair. <br />
                Great Skin. <br />
                <span className="text-orange underline decoration-orange/30 decoration-wavy">Better You.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-charcoal/70 dark:text-ivory/70 max-w-xl leading-relaxed">
                Experience instant, guaranteed chair reservations at the city’s most coveted luxury ateliers. Choose your master stylist, compare curated menus, and arrive to zero waiting.
              </p>

              {/* Multi-Input Search Card */}
              <div className="p-3 sm:p-4 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border shadow-xl">
                <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-3">
                  
                  {/* Location field */}
                  <div className="flex-1 w-full relative">
                    <label className="text-[10px] font-heading font-bold text-sand uppercase tracking-wider block mb-0.5 ml-3">
                      Your Location
                    </label>
                    <div className="relative flex items-center">
                      <MapPin className="w-4 h-4 text-orange absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="Location (e.g. Indiranagar)"
                        className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange font-medium"
                      />
                    </div>
                  </div>

                  {/* Service field */}
                  <div className="flex-1 w-full relative">
                    <label className="text-[10px] font-heading font-bold text-sand uppercase tracking-wider block mb-0.5 ml-3">
                      Service or Salon
                    </label>
                    <div className="relative flex items-center">
                      <Scissors className="w-4 h-4 text-orange absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        value={searchService}
                        onChange={(e) => setSearchService(e.target.value)}
                        placeholder="E.g. Balayage, Hydra Facial, Fade"
                        className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange font-medium"
                      />
                    </div>
                  </div>

                  {/* Search CTA */}
                  <div className="w-full sm:w-auto self-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-lg shadow-orange/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>Search Salons</span>
                    </button>
                  </div>

                </form>

                {/* Quick Trending Searches */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sand/20 dark:border-charcoal-border flex-wrap text-xs text-sand">
                  <span className="text-[11px] font-bold">Trending:</span>
                  {['French Balayage', 'Hydra Facial', 'Executive Shave', 'Russian Manicure'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchService(tag);
                        navigate(`/explore?search=${encodeURIComponent(tag)}`);
                      }}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-sand/15 dark:bg-charcoal border border-sand/30 dark:border-charcoal-border text-charcoal/80 dark:text-ivory/80 hover:text-orange hover:border-orange transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Trust Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sand/20 dark:border-charcoal-border">
                <div>
                  <p className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">4.92 ★</p>
                  <p className="text-xs text-sand">Avg Salon Rating</p>
                </div>
                <div>
                  <p className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">12,000+</p>
                  <p className="text-xs text-sand">Happy Clients</p>
                </div>
                <div>
                  <p className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">0 Mins</p>
                  <p className="text-xs text-sand">Guaranteed Chair Wait</p>
                </div>
              </div>

            </motion.div>

            {/* Right Column: Editorial Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Large Editorial Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-sand/30 dark:border-charcoal-border relative h-[480px]">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                    alt="SalonX Editorial Salon"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Floating Salon Card in Photo */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-charcoal/85 backdrop-blur-md border border-white/10 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-orange text-[10px] font-bold uppercase tracking-wider">
                        Featured Atelier
                      </span>
                      <RatingStars rating={4.96} count={348} size="xs" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-white">
                      The Luxe Atelier • Indiranagar
                    </h4>
                    <p className="text-xs text-sand mt-0.5">
                      Tokyo Keratin &amp; Parisian Balayage Masters
                    </p>
                  </div>
                </div>

                {/* Floating Stylist Badge */}
                <div className="absolute -top-4 -left-4 p-3 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-orange">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      alt="Stylist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange tracking-wider block">Master Stylist</span>
                    <p className="text-xs font-bold text-charcoal dark:text-ivory leading-tight">Alexander Wright</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                      Available Today
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 2. POPULAR CATEGORIES */}
      <section className="py-14 bg-ivory-light dark:bg-charcoal-card border-y border-sand/30 dark:border-charcoal-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-orange block mb-1">
                Curated Specialities
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-charcoal dark:text-ivory">
                Discover by Beauty Category
              </h2>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-orange hover:text-orange-hover"
            >
              <span>Explore All Categories</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {SALON_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border hover:border-orange transition-all duration-200 text-center flex flex-col items-center justify-center hover:-translate-y-1 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white transition-all flex items-center justify-center mb-2.5 shadow-sm">
                  <Scissors className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-xs text-charcoal dark:text-ivory group-hover:text-orange transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[10px] text-sand line-clamp-1 mt-0.5">
                  {cat.description || 'Specialist'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* 3. FEATURED LUXE SALONS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-orange block mb-1">
                Handpicked Excellence
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-charcoal dark:text-ivory">
                Featured Premier Salons
              </h2>
              <p className="text-xs sm:text-sm text-sand mt-1">
                Highest rated ateliers vetted for master artistry, hygiene, and hospitality.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-orange hover:text-orange-hover"
            >
              <span>View All Salons</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} viewMode="grid" />
            ))}
          </div>
        </div>
      </section>


      {/* 4. TRENDING SERVICES */}
      <section className="py-20 bg-ivory-light dark:bg-charcoal-card border-y border-sand/30 dark:border-charcoal-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-orange block mb-1">
                Client Favourites
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-charcoal dark:text-ivory">
                Trending Services This Week
              </h2>
              <p className="text-xs sm:text-sm text-sand mt-1">
                Most booked haircuts, hair coloring treatments, and signature skin therapies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingServices.map((srv) => (
              <div
                key={srv.id}
                className="group rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border hover:border-orange transition-all overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-charcoal/80 backdrop-blur-md text-ivory text-[10px] font-heading font-bold uppercase">
                        {srv.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] text-orange font-semibold">{srv.salonName}</p>
                    <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory mt-0.5 leading-snug">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-sand mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange" />
                      {srv.duration}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-sand/70 line-through mr-1.5">₹{srv.originalPrice}</span>
                    <span className="font-heading font-black text-lg text-charcoal dark:text-ivory">
                      ₹{srv.price}
                    </span>
                  </div>
                  <Link
                    to={`/salon/${srv.salonId}?book=true`}
                    className="px-3.5 py-2 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-heading font-semibold shadow-sm transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. SPECIAL OFFERS & COUPONS BANNER */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-charcoal text-ivory p-8 lg:p-12 relative overflow-hidden border border-charcoal-border shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/20 text-orange text-xs font-heading font-bold tracking-wider uppercase">
                  <Percent className="w-3.5 h-3.5" />
                  Limited Time Privileges
                </span>
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white">
                  Get 50% Off Your First SalonX Appointment
                </h3>
                <p className="text-sand text-sm leading-relaxed max-w-lg">
                  Use coupon code <strong className="text-white font-mono bg-charcoal-card px-2 py-0.5 rounded border border-orange/40">SALONX50</strong> at checkout and enjoy up to ₹500 discount on any service across all partner salons.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/explore"
                  className="flex-1 text-center py-4 px-6 rounded-2xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-xl shadow-orange/30 transition-all"
                >
                  Claim 50% Off Now
                </Link>
                <Link
                  to="/offers"
                  className="flex-1 text-center py-4 px-6 rounded-2xl border border-sand/40 hover:bg-white/10 text-white font-heading font-bold text-sm transition-all"
                >
                  View All Coupons
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 6. HOW SALONX WORKS (Uber for Beauty) */}
      <section className="py-20 bg-ivory-light dark:bg-charcoal-card border-t border-sand/30 dark:border-charcoal-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-orange block mb-1">
              Seamless Workflow
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-charcoal dark:text-ivory">
              How SalonX Works
            </h2>
            <p className="text-sm text-sand mt-2">
              The frictionless booking platform designed for modern schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Discover Salons',
                desc: 'Browse verified salons nearby with authentic photos, customer ratings, transparent service menus, and distance matrix.'
              },
              {
                step: '02',
                title: 'Pick Stylist & Slot',
                desc: 'Choose your preferred specialist or let our smart algorithm assign top available talent for your preferred time.'
              },
              {
                step: '03',
                title: 'Frictionless Payment',
                desc: 'Pay seamlessly online with Razorpay (UPI, Credit/Debit cards) or choose Pay at Salon when your service is complete.'
              },
              {
                step: '04',
                title: 'Zero-Wait VIP Chair',
                desc: 'Arrive at your appointment with a pre-assigned stylist chair ready. Zero waiting rooms, total editorial pampering.'
              }
            ].map((st) => (
              <div
                key={st.step}
                className="p-6 rounded-3xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border shadow-sm relative group hover:border-orange transition-all"
              >
                <span className="font-heading font-black text-4xl text-sand/30 dark:text-charcoal-border group-hover:text-orange transition-colors">
                  {st.step}
                </span>
                <h4 className="font-heading font-bold text-lg text-charcoal dark:text-ivory mt-3 mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-charcoal/70 dark:text-ivory/70 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. BECOME A SALON PARTNER CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-orange to-orange-dark text-white p-8 lg:p-14 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-heading font-bold uppercase tracking-wider">
                  Partner with SalonX
                </span>
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                  Are You a Salon Owner or Independent Stylist?
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Transform empty appointment slots into recurring high-ticket bookings. Access our suite of smart scheduling, staff rosters, automated SMS reminders, and zero-risk commission structure.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  to="/become-partner"
                  className="py-4 px-6 rounded-2xl bg-charcoal hover:bg-black text-ivory font-heading font-bold text-sm text-center shadow-lg transition-all"
                >
                  List Your Salon Free
                </Link>
                <Link
                  to="/owner/dashboard"
                  className="py-3 px-6 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-heading font-semibold text-xs text-center transition-all"
                >
                  Explore Salon Owner OS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
