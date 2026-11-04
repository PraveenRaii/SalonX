import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  ShieldCheck,
  Lock,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, onSuccess }) {
  const { draft, calculateTotals, setPaymentMethod, confirmBooking } = useBooking();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('upi'); // upi, card, netbanking, salon
  const [upiId, setUpiId] = useState('priya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('834');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const totals = calculateTotals();

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate real-time Razorpay cryptographic verification & backend slot availability check
      await new Promise(resolve => setTimeout(resolve, 1400));

      const newBooking = await confirmBooking();

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      addToast({
        title: 'Booking Confirmed!',
        message: `Appointment #${newBooking.id} has been reserved successfully at ${newBooking.salonName}.`,
        type: 'success'
      });

      setIsProcessing(false);
      onSuccess(newBooking);
    } catch (err) {
      setIsProcessing(false);
      addToast({
        title: 'Booking Failed',
        message: err.message || 'Unable to confirm appointment.',
        type: 'error'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-ivory dark:bg-charcoal rounded-3xl border border-sand/40 dark:border-charcoal-border shadow-2xl overflow-hidden">
        
        {/* Razorpay Luxury Brand Header */}
        <div className="bg-charcoal text-ivory p-6 border-b border-charcoal-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center text-white font-heading font-black text-xl shadow-md">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base tracking-tight text-white">
                  Razorpay <span className="text-orange text-xs uppercase font-medium">Secured</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> 256-bit SSL
                </span>
              </div>
              <p className="text-xs text-sand">Paying SalonX for {draft.salon?.name}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Amount Due</span>
            <p className="font-heading font-black text-2xl text-white">
              ₹{totals.finalTotal}
            </p>
          </div>
        </div>

        {/* Payment Tabs Navigation */}
        <div className="flex border-b border-sand/30 dark:border-charcoal-border bg-sand/10 dark:bg-charcoal-card p-2 gap-1 overflow-x-auto">
          {[
            { id: 'upi', label: 'UPI / QR', icon: QrCode, method: 'ONLINE_RAZORPAY' },
            { id: 'card', label: 'Cards', icon: CreditCard, method: 'ONLINE_RAZORPAY' },
            { id: 'netbanking', label: 'Netbanking', icon: Building2, method: 'ONLINE_RAZORPAY' },
            { id: 'salon', label: 'Pay at Salon', icon: Wallet, method: 'PAY_AT_SALON' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPaymentMethod(tab.method);
                }}
                className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-heading font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange text-white shadow-md'
                    : 'text-charcoal/70 dark:text-ivory/70 hover:bg-sand/20 dark:hover:bg-charcoal-border'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <form onSubmit={handlePay} className="p-6 space-y-5">
          
          {/* UPI TAB */}
          {activeTab === 'upi' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border">
                {/* Simulated dynamic QR code */}
                <div className="w-32 h-32 bg-white p-2 rounded-xl border border-sand/30 flex items-center justify-center shrink-0 shadow-sm">
                  <div className="w-full h-full border-2 border-dashed border-charcoal/40 rounded flex flex-col items-center justify-center text-center p-2">
                    <QrCode className="w-12 h-12 text-charcoal mb-1" />
                    <span className="text-[9px] font-bold text-charcoal">SCAN TO PAY</span>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-heading font-bold text-charcoal dark:text-ivory block">
                    Scan via Google Pay, PhonePe or Paytm
                  </span>
                  <p className="text-xs text-sand mt-0.5">
                    Open any UPI app and point your camera at the QR code to approve payment.
                  </p>
                  <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                    <span className="px-2 py-1 rounded bg-sand/20 text-[10px] font-bold text-charcoal dark:text-ivory">GPay</span>
                    <span className="px-2 py-1 rounded bg-sand/20 text-[10px] font-bold text-charcoal dark:text-ivory">PhonePe</span>
                    <span className="px-2 py-1 rounded bg-sand/20 text-[10px] font-bold text-charcoal dark:text-ivory">Paytm</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-heading font-semibold text-sand block mb-1">
                  Or enter Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@okaxis"
                  required
                  className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border px-4 py-2.5 rounded-xl text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                />
              </div>
            </div>
          )}

          {/* CARD TAB */}
          {activeTab === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-heading font-semibold text-sand block mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border pl-10 pr-4 py-2.5 rounded-xl text-sm font-mono text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-heading font-semibold text-sand block mb-1">
                    Valid Thru
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    required
                    className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border px-4 py-2.5 rounded-xl text-sm font-mono text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-heading font-semibold text-sand block mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    maxLength="4"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    required
                    className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border px-4 py-2.5 rounded-xl text-sm font-mono text-charcoal dark:text-ivory focus:outline-none focus:border-orange"
                  />
                </div>
              </div>
            </div>
          )}

          {/* NETBANKING TAB */}
          {activeTab === 'netbanking' && (
            <div className="space-y-3">
              <label className="text-xs font-heading font-semibold text-sand block">
                Select Your Bank
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'Other Banks'].map((bank) => (
                  <button
                    type="button"
                    key={bank}
                    className="p-3 rounded-xl border border-sand/30 dark:border-charcoal-border hover:border-orange text-xs font-semibold text-charcoal dark:text-ivory text-center hover:bg-orange/10 transition-colors"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PAY AT SALON TAB */}
          {activeTab === 'salon' && (
            <div className="p-4 rounded-2xl bg-orange/10 dark:bg-orange/15 border border-orange/30 space-y-2">
              <div className="flex items-center gap-2 text-orange font-heading font-bold text-sm">
                <Wallet className="w-4 h-4" />
                <span>Pay In Person After Service</span>
              </div>
              <p className="text-xs text-charcoal/80 dark:text-ivory/80 leading-relaxed">
                You can pay using Cash, Cards, or UPI at the front desk when your appointment concludes. Your slot will be reserved immediately.
              </p>
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-4 border-t border-sand/20 dark:border-charcoal-border flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-xl border border-sand/30 dark:border-charcoal-border text-xs font-heading font-semibold text-charcoal dark:text-ivory hover:bg-sand/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-3 px-6 rounded-xl bg-orange hover:bg-orange-hover text-white font-heading font-bold text-sm shadow-lg shadow-orange/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Securing Booking...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    {activeTab === 'salon' ? 'Confirm Reservation' : `Pay ₹${totals.finalTotal} via Razorpay`}
                  </span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
