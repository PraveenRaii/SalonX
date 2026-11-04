import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BOOKINGS, MOCK_SALONS, MOCK_COUPONS } from '../services/mockData';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const { user } = useAuth();

  // Bookings list
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('salonx_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  // Favourites list
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('salonx_favourites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse favourites', e);
      }
    }
    return ['salon-1', 'salon-3'];
  });

  // Draft booking flow state
  const [draft, setDraft] = useState({
    salon: null,
    services: [],
    stylist: { id: 'any', name: 'Any Available Stylist', title: 'Smart Match' },
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM',
    coupon: null,
    paymentMethod: 'ONLINE_RAZORPAY',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('salonx_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('salonx_favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (salonId) => {
    setFavourites(prev =>
      prev.includes(salonId) ? prev.filter(id => id !== salonId) : [...prev, salonId]
    );
  };

  const isFavourite = (salonId) => favourites.includes(salonId);

  const initDraft = (salon) => {
    setDraft({
      salon,
      services: [],
      stylist: { id: 'any', name: 'Any Available Stylist', title: 'Top Rated Stylist Match' },
      date: new Date().toISOString().split('T')[0],
      timeSlot: '11:30 AM',
      coupon: null,
      paymentMethod: 'ONLINE_RAZORPAY',
      notes: ''
    });
  };

  const toggleService = (service) => {
    setDraft(prev => {
      const exists = prev.services.some(s => s.id === service.id);
      const updatedServices = exists
        ? prev.services.filter(s => s.id !== service.id)
        : [...prev.services, service];
      return { ...prev, services: updatedServices };
    });
  };

  const setStylist = (stylist) => {
    setDraft(prev => ({ ...prev, stylist }));
  };

  const setDate = (date) => {
    setDraft(prev => ({ ...prev, date }));
  };

  const setTimeSlot = (timeSlot) => {
    setDraft(prev => ({ ...prev, timeSlot }));
  };

  const setPaymentMethod = (paymentMethod) => {
    setDraft(prev => ({ ...prev, paymentMethod }));
  };

  const setNotes = (notes) => {
    setDraft(prev => ({ ...prev, notes }));
  };

  const applyCoupon = (couponCode) => {
    const cleanCode = couponCode.trim().toUpperCase();
    const found = MOCK_COUPONS.find(c => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    const subtotal = draft.services.reduce((acc, s) => acc + s.price, 0);
    if (subtotal < (found.minBookingAmount || 0)) {
      return {
        success: false,
        message: `Coupon requires a minimum booking value of ₹${found.minBookingAmount}.`
      };
    }

    setDraft(prev => ({ ...prev, coupon: found }));
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setDraft(prev => ({ ...prev, coupon: null }));
  };

  // Pricing calculations
  const calculateTotals = () => {
    const subtotal = draft.services.reduce((sum, s) => sum + s.price, 0);
    const totalDuration = draft.services.reduce((sum, s) => sum + s.durationMinutes, 0);

    let discount = 0;
    if (draft.coupon) {
      if (draft.coupon.discountPercent) {
        discount = (subtotal * draft.coupon.discountPercent) / 100;
        if (draft.coupon.maxDiscount) {
          discount = Math.min(discount, draft.coupon.maxDiscount);
        }
      } else if (draft.coupon.discountAmount) {
        discount = draft.coupon.discountAmount;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const taxes = Math.round(discountedSubtotal * 0.05); // 5% GST
    const convenienceFee = subtotal > 0 ? 30 : 0;
    const finalTotal = discountedSubtotal + taxes + convenienceFee;

    return {
      subtotal,
      totalDuration,
      discount: Math.round(discount),
      taxes,
      convenienceFee,
      finalTotal
    };
  };

  const confirmBooking = async () => {
    if (!draft.salon || draft.services.length === 0) {
      throw new Error('Please select at least one service.');
    }

    // Backend availability validation simulation: check double booking
    const isDoubleBooked = bookings.some(
      b =>
        b.salonId === draft.salon.id &&
        b.rawDate === draft.date &&
        b.rawTime === draft.timeSlot &&
        b.stylistId === draft.stylist?.id &&
        b.status === 'CONFIRMED'
    );

    if (isDoubleBooked) {
      throw new Error('This time slot was just booked by another customer. Please choose another slot.');
    }

    const totals = calculateTotals();
    const newBookingId = `SX-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking = {
      id: newBookingId,
      salonId: draft.salon.id,
      salonName: draft.salon.name,
      salonAddress: draft.salon.address,
      salonCover: draft.salon.coverImage,
      customerId: user?.id || 'usr-guest',
      customerName: user?.name || 'Guest Customer',
      customerPhone: user?.phone || '+91 98765 43210',
      services: draft.services,
      stylistId: draft.stylist.id,
      stylistName: draft.stylist.name,
      stylistAvatar: draft.stylist.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      date: `${draft.date}, ${draft.timeSlot}`,
      rawDate: draft.date,
      rawTime: draft.timeSlot,
      totalDuration: totals.totalDuration,
      subtotal: totals.subtotal,
      discount: totals.discount,
      taxes: totals.taxes,
      convenienceFee: totals.convenienceFee,
      totalAmount: totals.finalTotal,
      paymentMethod: draft.paymentMethod,
      paymentStatus: draft.paymentMethod === 'ONLINE_RAZORPAY' ? 'PAID' : 'PENDING_SALON',
      status: 'CONFIRMED',
      notes: draft.notes,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId, reason = 'Customer request') => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'CANCELLED', cancellationReason: reason } : b))
    );
  };

  const rescheduleBooking = (bookingId, newDate, newTime) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              date: `${newDate}, ${newTime}`,
              rawDate: newDate,
              rawTime: newTime,
              rescheduledAt: new Date().toISOString()
            }
          : b
      )
    );
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        favourites,
        draft,
        isFavourite,
        toggleFavourite,
        initDraft,
        toggleService,
        setStylist,
        setDate,
        setTimeSlot,
        setPaymentMethod,
        setNotes,
        applyCoupon,
        removeCoupon,
        calculateTotals,
        confirmBooking,
        cancelBooking,
        rescheduleBooking,
        updateBookingStatus
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};
