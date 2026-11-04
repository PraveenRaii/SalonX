import React from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Download,
  Share2,
  ArrowRight,
  ShieldCheck,
  Scissors
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ConfirmationPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const { addToast } = useToast();

  const booking = location.state?.booking || bookings.find(b => b.id === id) || bookings[0];

  const handleDownloadPass = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    addToast({
      title: 'Synced with Calendar',
      message: `Appointment on ${booking.date} added to your digital schedule.`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-12 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Banner */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-heading font-bold uppercase tracking-wider inline-block mb-2">
            Reservation Confirmed
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-ivory">
            You’re All Booked In!
          </h1>
          <p className="text-sm text-sand mt-1">
            An SMS and email confirmation with your VIP check-in pass has been dispatched.
          </p>
        </div>

        {/* Boarding Pass Style Luxury Appointment Ticket */}
        <div className="rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border shadow-2xl overflow-hidden relative print:border-black">
          
          {/* Ticket Header */}
          <div className="bg-charcoal text-ivory p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange flex items-center justify-center text-white shadow-md">
                <Scissors className="w-6 h-6 transform -rotate-45" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-orange block">
                  Official SalonX Pass
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {booking.salonName}
                </h3>
                <p className="text-xs text-sand flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-orange" />
                  <span>{booking.salonAddress}</span>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right bg-charcoal-card p-3 rounded-2xl border border-charcoal-border sm:border-0 sm:bg-transparent sm:p-0">
              <span className="text-[10px] uppercase font-bold text-sand tracking-widest block">Booking Reference</span>
              <p className="font-mono font-bold text-xl text-orange">#{booking.id}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                {booking.paymentStatus === 'PAID' ? 'PREPAID ONLINE' : 'PAY AT COUNTER'}
              </span>
            </div>
          </div>

          {/* Ticket Perforation Graphic */}
          <div className="relative py-2 bg-sand/15 dark:bg-charcoal flex items-center justify-between px-4">
            <div className="w-5 h-5 rounded-full bg-ivory dark:bg-charcoal -ml-6 border-r border-sand/30" />
            <div className="flex-1 border-t-2 border-dashed border-sand/40 dark:border-charcoal-border mx-3" />
            <div className="w-5 h-5 rounded-full bg-ivory dark:bg-charcoal -mr-6 border-l border-sand/30" />
          </div>

          {/* Ticket Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block mb-1">Appointment Slot</span>
                <p className="font-heading font-extrabold text-base text-charcoal dark:text-ivory">{booking.date}</p>
                <p className="text-xs text-sand flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-orange" />
                  {booking.totalDuration} minutes duration
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block mb-1">Master Stylist</span>
                <p className="font-heading font-extrabold text-base text-charcoal dark:text-ivory truncate">{booking.stylistName}</p>
                <p className="text-xs text-orange font-medium mt-0.5">Assigned Specialist</p>
              </div>

              <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block mb-1">Total Bill Paid</span>
                <p className="font-heading font-extrabold text-xl text-orange">₹{booking.totalAmount}</p>
                <p className="text-[11px] text-sand mt-0.5">Incl. 5% GST &amp; Fees</p>
              </div>
            </div>

            {/* Selected Services Breakdown */}
            <div className="border border-sand/20 dark:border-charcoal-border rounded-2xl p-4 bg-ivory/50 dark:bg-charcoal/50">
              <span className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-3">
                Selected Treatment Services
              </span>
              <div className="space-y-2">
                {booking.services.map((srv, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-charcoal dark:text-ivory">{srv.name}</span>
                    <span className="font-heading font-bold text-charcoal dark:text-ivory">₹{srv.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Check-in QR Code pass */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-sand/15 dark:bg-charcoal border border-sand/30 dark:border-charcoal-border">
              <div className="w-24 h-24 bg-white p-2 rounded-xl border border-sand/30 flex items-center justify-center shrink-0">
                <QrCode className="w-18 h-18 text-charcoal" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h5 className="font-heading font-bold text-sm text-charcoal dark:text-ivory">
                  Front Desk Contactless Check-In
                </h5>
                <p className="text-xs text-sand mt-1 leading-relaxed">
                  Present this QR code or mention reference <strong className="text-orange font-mono">#{booking.id}</strong> when you arrive at {booking.salonName}. Your chair will be pre-allocated.
                </p>
              </div>
            </div>

          </div>

          {/* Ticket Footer Actions */}
          <div className="bg-sand/10 dark:bg-charcoal-border/30 p-6 border-t border-sand/20 dark:border-charcoal-border flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPass}
                className="px-4 py-2 rounded-xl border border-sand/30 dark:border-charcoal-border hover:bg-sand/10 text-xs font-heading font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save Pass</span>
              </button>
              <button
                onClick={handleAddToCalendar}
                className="px-4 py-2 rounded-xl border border-sand/30 dark:border-charcoal-border hover:bg-sand/10 text-xs font-heading font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-orange" />
                <span>Add to Calendar</span>
              </button>
            </div>

            <Link
              to="/customer/dashboard"
              className="px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-white text-xs font-heading font-bold shadow-md shadow-orange/20 flex items-center gap-2 transition-all"
            >
              <span>View in Customer Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
