import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_SALONS, TIME_SLOTS } from '../../services/mockData';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import BookingStepIndicator from '../../components/booking/BookingStepIndicator';
import PriceBreakdown from '../../components/booking/PriceBreakdown';
import PaymentModal from '../../components/booking/PaymentModal';
import ServiceItem from '../../components/salon/ServiceItem';
import StylistCard from '../../components/salon/StylistCard';
import {
  Calendar,
  Clock,
  UserCheck,
  Scissors,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function BookingPage() {
  const { salonId } = useParams();
  const navigate = useNavigate();
  const { draft, initDraft, setDate, setTimeSlot, setStylist, setNotes } = useBooking();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const salon = MOCK_SALONS.find(s => s.id === salonId) || MOCK_SALONS[0];

  useEffect(() => {
    if (!draft.salon || draft.salon.id !== salon.id) {
      initDraft(salon);
    }
  }, [salon.id]);

  // Steps definition
  const steps = [
    { id: 'services', title: 'Services' },
    { id: 'stylist', title: 'Stylist' },
    { id: 'date', title: 'Date' },
    { id: 'slot', title: 'Time Slot' },
    { id: 'review', title: 'Review' },
    { id: 'payment', title: 'Payment' }
  ];

  // Dynamic next 7 days for date selection
  const upcomingDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = d.toISOString().split('T')[0];
    const displayDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return { dayName, formattedDate, displayDate };
  });

  const handleNextStep = () => {
    if (currentStep === 1 && draft.services.length === 0) {
      addToast({
        title: 'Select at least one service',
        message: 'Please pick the services you would like to receive before proceeding.',
        type: 'error'
      });
      return;
    }

    if (currentStep === 6) {
      setShowPaymentModal(true);
      return;
    }

    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePaymentSuccess = (newBooking) => {
    setShowPaymentModal(false);
    navigate(`/booking/confirmed/${newBooking.id}`, { state: { booking: newBooking } });
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-sand uppercase font-bold tracking-wider mb-1">
              <Link to={`/salon/${salon.id}`} className="hover:text-orange">{salon.name}</Link>
              <span>/</span>
              <span className="text-orange">Guided Reservation</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-ivory">
              Book Your Appointment
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-sand block">Selected Salon</span>
            <span className="font-heading font-bold text-sm text-charcoal dark:text-ivory">{salon.name}</span>
          </div>
        </div>

        {/* Multi-Step Indicator Bar */}
        <BookingStepIndicator
          currentStep={currentStep}
          steps={steps}
          onStepClick={(stepNum) => setCurrentStep(stepNum)}
        />

        {/* Step Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* Main Step Interaction Column */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-md">
            
            {/* STEP 1: SELECT SERVICES */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-sand/20 dark:border-charcoal-border pb-4">
                  <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">
                    Step 1: Choose Your Services
                  </h3>
                  <p className="text-xs text-sand mt-0.5">
                    Pick single or multiple services. We calculate your total duration automatically.
                  </p>
                </div>

                <div className="space-y-3">
                  {salon.services.map((srv) => (
                    <ServiceItem key={srv.id} service={srv} />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SELECT STYLIST */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-sand/20 dark:border-charcoal-border pb-4">
                  <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">
                    Step 2: Choose Your Stylist
                  </h3>
                  <p className="text-xs text-sand mt-0.5">
                    Select a dedicated artist or choose smart auto-assignment for the fastest available chair.
                  </p>
                </div>

                {/* "Any Available Stylist" Option */}
                <div
                  onClick={() =>
                    setStylist({
                      id: 'any',
                      name: 'Any Available Stylist',
                      title: 'Top Rated Stylist Match',
                      experience: 'Certified Professional',
                      speciality: 'Immediate Chair Allocation',
                      rating: 4.9,
                      reviewCount: 300,
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                    })
                  }
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    draft.stylist?.id === 'any'
                      ? 'bg-orange/15 border-orange shadow-md ring-2 ring-orange/30'
                      : 'bg-ivory dark:bg-charcoal border-sand/30 dark:border-charcoal-border hover:border-sand'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-orange text-white flex items-center justify-center font-bold shadow-md">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory">
                        Any Available Master Stylist
                      </h4>
                      <p className="text-xs text-orange font-medium">Recommended for fastest booking</p>
                      <p className="text-[11px] text-sand">SalonX automatically assigns the highest rated artist for your time.</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold ${
                    draft.stylist?.id === 'any' ? 'bg-orange text-white' : 'border border-sand/40 text-sand'
                  }`}>
                    {draft.stylist?.id === 'any' ? 'Selected' : 'Choose'}
                  </span>
                </div>

                {/* Individual Stylists Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {salon.stylists.map((sty) => (
                    <StylistCard key={sty.id} stylist={sty} />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: SELECT DATE */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-sand/20 dark:border-charcoal-border pb-4">
                  <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">
                    Step 3: Select Date
                  </h3>
                  <p className="text-xs text-sand mt-0.5">
                    Appointments can be scheduled up to 7 days in advance.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {upcomingDates.map((d) => {
                    const isSelected = draft.date === d.formattedDate;
                    return (
                      <button
                        key={d.formattedDate}
                        type="button"
                        onClick={() => setDate(d.formattedDate)}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-orange text-white border-orange shadow-lg scale-102 font-bold ring-2 ring-orange/30'
                            : 'bg-ivory dark:bg-charcoal border-sand/30 dark:border-charcoal-border hover:border-orange text-charcoal dark:text-ivory'
                        }`}
                      >
                        <span className="text-xs uppercase font-medium block opacity-80">{d.dayName}</span>
                        <span className="font-heading font-extrabold text-lg block my-0.5">{d.displayDate}</span>
                        <span className="text-[10px] block opacity-75">{d.formattedDate}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: TIME SLOTS */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-sand/20 dark:border-charcoal-border pb-4">
                  <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">
                    Step 4: Choose Real-time Available Slot
                  </h3>
                  <p className="text-xs text-sand mt-0.5">
                    Real-time chair synchronization. Green indicates instant confirmed availability.
                  </p>
                </div>

                {['Morning', 'Afternoon', 'Evening'].map((period) => {
                  const slots = TIME_SLOTS.filter(s => s.period === period);
                  return (
                    <div key={period} className="space-y-2">
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-sand block">
                        {period} Slots
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {slots.map((s) => {
                          const isSelected = draft.timeSlot === s.time;
                          return (
                            <button
                              key={s.time}
                              type="button"
                              disabled={!s.available}
                              onClick={() => setTimeSlot(s.time)}
                              className={`py-3 px-3 rounded-xl border text-xs font-heading font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                !s.available
                                  ? 'opacity-40 bg-sand/10 border-sand/20 cursor-not-allowed line-through text-sand'
                                  : isSelected
                                  ? 'bg-orange text-white border-orange shadow-md scale-102 ring-2 ring-orange/30'
                                  : 'bg-ivory dark:bg-charcoal border-sand/30 dark:border-charcoal-border hover:border-orange text-charcoal dark:text-ivory'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>{s.time}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* STEP 5: REVIEW DETAILS */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-sand/20 dark:border-charcoal-border pb-4">
                  <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">
                    Step 5: Review Appointment Details
                  </h3>
                  <p className="text-xs text-sand mt-0.5">
                    Double check your salon, stylist, schedule and special instructions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
                    <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Salon &amp; Address</span>
                    <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory mt-1">{salon.name}</h4>
                    <p className="text-xs text-sand mt-0.5">{salon.address}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
                    <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Assigned Stylist</span>
                    <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory mt-1">{draft.stylist?.name}</h4>
                    <p className="text-xs text-orange font-medium">{draft.stylist?.title}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
                    <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Scheduled Date</span>
                    <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory mt-1">{draft.date}</h4>
                    <p className="text-xs text-sand mt-0.5">Arrival 5 mins prior recommended</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
                    <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Time Slot</span>
                    <h4 className="font-heading font-bold text-base text-orange mt-1">{draft.timeSlot}</h4>
                    <p className="text-xs text-sand mt-0.5">Guaranteed immediate chair</p>
                  </div>
                </div>

                {/* Special Request Notes */}
                <div>
                  <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-1.5">
                    Special Instructions / Notes for Stylist
                  </label>
                  <textarea
                    rows="3"
                    value={draft.notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., sensitive scalp, prefer quiet session, organic shampoo only..."
                    className="w-full bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border p-3.5 rounded-xl text-xs text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: PAYMENT SELECTION */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-sand/20 dark:border-charcoal-border pb-4">
                  <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">
                    Step 6: Confirm &amp; Finalize Payment
                  </h3>
                  <p className="text-xs text-sand mt-0.5">
                    Choose Razorpay for instant UPI/Cards confirmation or select Pay at Salon.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => draft.paymentMethod !== 'ONLINE_RAZORPAY' && useBooking().setPaymentMethod('ONLINE_RAZORPAY')}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      draft.paymentMethod === 'ONLINE_RAZORPAY'
                        ? 'bg-orange/15 border-orange ring-2 ring-orange/30 shadow-md'
                        : 'bg-ivory dark:bg-charcoal border-sand/30 dark:border-charcoal-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-bold text-charcoal dark:text-ivory">Razorpay Online</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">Fastest</span>
                    </div>
                    <p className="text-xs text-sand leading-relaxed">
                      Instant confirmation via UPI (GPay/PhonePe), Credit &amp; Debit Cards, or Netbanking.
                    </p>
                  </div>

                  <div
                    onClick={() => useBooking().setPaymentMethod('PAY_AT_SALON')}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      draft.paymentMethod === 'PAY_AT_SALON'
                        ? 'bg-orange/15 border-orange ring-2 ring-orange/30 shadow-md'
                        : 'bg-ivory dark:bg-charcoal border-sand/30 dark:border-charcoal-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-bold text-charcoal dark:text-ivory">Pay at Salon</span>
                      <span className="px-2 py-0.5 rounded-full bg-sand/20 text-sand text-[10px] font-bold">In Person</span>
                    </div>
                    <p className="text-xs text-sand leading-relaxed">
                      Pay at the salon counter after your service finishes using cash, card or UPI.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Double booking protection active. Your slot is held exclusively for you.</span>
                </div>
              </div>
            )}

            {/* Step Navigation Buttons */}
            <div className="pt-6 mt-8 border-t border-sand/20 dark:border-charcoal-border flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-xl border border-sand/30 dark:border-charcoal-border text-xs font-heading font-semibold text-charcoal dark:text-ivory hover:bg-sand/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-7 py-3 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs sm:text-sm font-heading font-bold shadow-lg shadow-orange/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{currentStep === 6 ? 'Confirm & Pay' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic Price Summary Bar */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <PriceBreakdown />
          </div>

        </div>

      </div>

      {/* Razorpay Interactive Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />

    </div>
  );
}
