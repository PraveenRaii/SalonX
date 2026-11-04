import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { MOCK_SALONS, MOCK_COUPONS } from '../../services/mockData';
import SalonCard from '../../components/salon/SalonCard';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Gift,
  Bell,
  MessageSquare,
  Scissors,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Phone,
  User,
  CreditCard,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function CustomerDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { bookings, favourites, cancelBooking, rescheduleBooking } = useBooking();
  const { addToast } = useToast();

  const activeTab = searchParams.get('tab') || 'upcoming';

  // Modal states for cancelling / rescheduling
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('Change of plans');
  const [rescheduleModalBooking, setRescheduleModalBooking] = useState(null);
  const [newDate, setNewDate] = useState('2026-11-06');
  const [newTime, setNewTime] = useState('03:30 PM');

  // Filter bookings by status
  const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED');
  const pastBookings = bookings.filter(b => b.status === 'COMPLETED');
  const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED');
  const favSalons = MOCK_SALONS.filter(s => favourites.includes(s.id));

  const handleConfirmCancel = () => {
    if (!cancelModalBooking) return;
    cancelBooking(cancelModalBooking.id, cancelReason);
    addToast({
      title: 'Appointment Cancelled',
      message: `Booking #${cancelModalBooking.id} has been cancelled.`,
      type: 'default'
    });
    setCancelModalBooking(null);
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleModalBooking) return;
    rescheduleBooking(rescheduleModalBooking.id, newDate, newTime);
    addToast({
      title: 'Appointment Rescheduled',
      message: `Booking #${rescheduleModalBooking.id} moved to ${newDate} at ${newTime}.`,
      type: 'success'
    });
    setRescheduleModalBooking(null);
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: upcomingBookings.length, icon: Calendar },
    { id: 'history', label: 'Past Bookings', count: pastBookings.length, icon: Clock },
    { id: 'cancelled', label: 'Cancelled', count: cancelledBookings.length, icon: XCircle },
    { id: 'favourites', label: 'Saved Salons', count: favSalons.length, icon: Heart },
    { id: 'rewards', label: 'Rewards & Coupons', count: MOCK_COUPONS.length, icon: Gift },
    { id: 'support', label: 'Help & Concierge', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Overview Header Card */}
        <div className="rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/40 dark:border-charcoal-border p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
                  alt={user?.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-orange/40 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                  ★
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-ivory">
                    {user?.name || 'Priya Sharma'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange/20 text-orange text-xs font-heading font-bold uppercase tracking-wider">
                    SalonX Privé Member
                  </span>
                </div>
                <p className="text-xs text-sand mt-1">
                  {user?.email} • {user?.phone || '+91 98765 43210'}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1.5 text-charcoal/80 dark:text-ivory/80 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-orange" />
                    <strong>{user?.loyaltyPoints || 480}</strong> Glow Reward Points
                  </span>
                  <span className="text-sand">•</span>
                  <span className="text-charcoal/80 dark:text-ivory/80 font-medium">
                    <strong>{bookings.length}</strong> Total Bookings
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/explore"
                className="px-5 py-3 rounded-2xl bg-orange hover:bg-orange-hover text-white text-xs font-heading font-bold shadow-md shadow-orange/25 transition-all flex items-center gap-2"
              >
                <Scissors className="w-4 h-4" />
                <span>Book New Salon</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-sand/30 dark:border-charcoal-border mb-8 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-heading font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal shadow-sm'
                    : 'text-charcoal/70 dark:text-ivory/70 hover:bg-sand/15 dark:hover:bg-charcoal-border'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange' : 'text-sand'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-orange text-white' : 'bg-sand/20 text-charcoal/80 dark:text-ivory/80'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: UPCOMING APPOINTMENTS */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-16 bg-ivory-light dark:bg-charcoal-card rounded-3xl border border-sand/30 dark:border-charcoal-border">
                <Calendar className="w-12 h-12 text-sand mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">No Upcoming Bookings</h3>
                <p className="text-xs text-sand mt-1">Ready for your next hair or skin refresh?</p>
                <Link
                  to="/explore"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange text-white text-xs font-heading font-semibold"
                >
                  Explore Salons
                </Link>
              </div>
            ) : (
              upcomingBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <img
                      src={b.salonCover || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80'}
                      alt={b.salonName}
                      className="w-full sm:w-36 h-36 rounded-2xl object-cover shrink-0"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-orange">#{b.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                          CONFIRMED
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-xl text-charcoal dark:text-ivory">
                        {b.salonName}
                      </h3>

                      <p className="text-xs text-sand flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange" />
                        <span>{b.salonAddress}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                        <span className="font-semibold text-charcoal dark:text-ivory flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-orange" />
                          {b.date}
                        </span>
                        <span className="text-sand">•</span>
                        <span className="text-charcoal/80 dark:text-ivory/80">
                          Stylist: <strong>{b.stylistName}</strong>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {b.services.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-0.5 rounded-md bg-ivory dark:bg-charcoal border border-sand/30 dark:border-charcoal-border"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex sm:flex-col justify-between sm:justify-center items-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-sand/20 dark:border-charcoal-border">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-sand block">Total Bill</span>
                      <span className="font-heading font-black text-xl text-charcoal dark:text-ivory">
                        ₹{b.totalAmount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRescheduleModalBooking(b)}
                        className="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold border border-sand/40 dark:border-charcoal-border hover:bg-sand/15 transition-colors cursor-pointer"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => setCancelModalBooking(b)}
                        className="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <Link
                        to={`/booking/confirmed/${b.id}`}
                        className="p-2 rounded-xl bg-orange text-white hover:bg-orange-hover transition-colors"
                        title="View VIP Check-in Pass"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: PAST BOOKINGS */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {pastBookings.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-sand">#{b.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-sand/20 text-sand text-[10px] font-bold">
                      COMPLETED
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">{b.salonName}</h4>
                  <p className="text-xs text-sand">{b.date} • Stylist: {b.stylistName}</p>
                  <p className="text-xs text-charcoal/80 dark:text-ivory/80 mt-1">
                    {b.services.map(s => s.name).join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading font-extrabold text-lg text-charcoal dark:text-ivory">
                    ₹{b.totalAmount}
                  </span>
                  <Link
                    to={`/salon/${b.salonId}?book=true`}
                    className="px-4 py-2 rounded-xl bg-orange text-white text-xs font-heading font-semibold hover:bg-orange-hover"
                  >
                    Re-Book Salon
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: CANCELLED */}
        {activeTab === 'cancelled' && (
          <div className="space-y-4">
            {cancelledBookings.length === 0 ? (
              <p className="text-sm text-sand text-center py-12">No cancelled appointments.</p>
            ) : (
              cancelledBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border opacity-75"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-red-500 font-semibold uppercase">Cancelled</span>
                      <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory mt-0.5">{b.salonName}</h4>
                      <p className="text-xs text-sand">{b.date} • #{b.id}</p>
                      {b.cancellationReason && (
                        <p className="text-[11px] text-sand mt-1">Reason: {b.cancellationReason}</p>
                      )}
                    </div>
                    <Link
                      to={`/salon/${b.salonId}?book=true`}
                      className="px-3.5 py-1.5 rounded-xl border border-sand/40 text-xs font-heading font-semibold"
                    >
                      Book Again
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: FAVOURITES */}
        {activeTab === 'favourites' && (
          <div>
            {favSalons.length === 0 ? (
              <div className="text-center py-16 bg-ivory-light dark:bg-charcoal-card rounded-3xl border border-sand/30 dark:border-charcoal-border">
                <Heart className="w-12 h-12 text-sand mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">No Saved Salons Yet</h3>
                <p className="text-xs text-sand mt-1">Click the heart icon on any salon to save it to your wishlist.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favSalons.map((s) => (
                  <SalonCard key={s.id} salon={s} viewMode="grid" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: REWARDS & COUPONS */}
        {activeTab === 'rewards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_COUPONS.map((cpn) => (
              <div
                key={cpn.code}
                className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-orange text-white text-xs font-mono font-bold">
                    {cpn.code}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
                </div>
                <h4 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">
                  {cpn.description}
                </h4>
                <p className="text-xs text-sand">Min booking: ₹{cpn.minBookingAmount}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(cpn.code);
                    addToast({ title: 'Code Copied', message: `${cpn.code} copied to clipboard!`, type: 'success' });
                  }}
                  className="w-full py-2 rounded-xl border border-sand/40 dark:border-charcoal-border hover:bg-orange hover:text-white hover:border-orange text-xs font-heading font-semibold transition-colors cursor-pointer"
                >
                  Copy Code
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: HELP & CONCIERGE */}
        {activeTab === 'support' && (
          <div className="p-8 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border max-w-2xl mx-auto space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange/15 text-orange flex items-center justify-center mx-auto">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory">
              SalonX VIP Concierge
            </h3>
            <p className="text-sm text-sand leading-relaxed">
              Need assistance with an appointment, refunds, or bespoke wedding packages? Our dedicated beauty coordinators are available daily from 8 AM to 10 PM.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+91800725669"
                className="px-6 py-3 rounded-2xl bg-orange text-white text-xs font-heading font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Concierge: 1800-SALONX</span>
              </a>
              <button
                onClick={() => addToast({ title: 'Live Chat Initiated', message: 'Connecting you with an agent...', type: 'default' })}
                className="px-6 py-3 rounded-2xl border border-sand/40 text-xs font-heading font-semibold"
              >
                Start Live Chat
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-ivory dark:bg-charcoal rounded-3xl border border-sand/40 dark:border-charcoal-border p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">
              Cancel Appointment #{cancelModalBooking.id}?
            </h3>
            <p className="text-xs text-sand">
              Are you sure you want to cancel your session at {cancelModalBooking.salonName}? Any online prepayment will be credited back instantly.
            </p>
            <div>
              <label className="text-xs font-semibold text-sand block mb-1">Reason for cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
              >
                <option value="Change of plans">Change of plans</option>
                <option value="Schedule clash">Schedule clash</option>
                <option value="Want different salon">Want different salon</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-sand/30"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-ivory dark:bg-charcoal rounded-3xl border border-sand/40 dark:border-charcoal-border p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">
              Reschedule #{rescheduleModalBooking.id}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-sand block mb-1">Select New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-sand block mb-1">Select New Time Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
                >
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setRescheduleModalBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-sand/30"
              >
                Close
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-4 py-2 rounded-xl bg-orange text-white text-xs font-semibold"
              >
                Save New Time
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
