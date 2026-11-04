import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, ArrowRight, ShieldCheck, Sparkles, MapPin, Phone, Mail, Globe, Share2, MessageCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast({
      title: 'Subscribed to SalonX Privé',
      message: 'You have been added to our exclusive editorial newsletter & private salon invitations.',
      type: 'success'
    });
    setEmail('');
  };

  return (
    <footer className="bg-charcoal text-ivory border-t border-charcoal-border pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Editorial banner */}
        <div className="rounded-3xl bg-charcoal-card border border-charcoal-border p-8 lg:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/15 text-orange text-xs font-heading font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                SalonX Editorial &amp; VIP Perks
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-ivory">
                The Beauty Index, Curated in Your Inbox.
              </h3>
              <p className="text-sand text-sm mt-2 max-w-xl">
                Seasonal trend reports, invitation-only salon masterclasses, and priority access to celebrity stylist slots.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-charcoal border border-charcoal-border px-4 py-3.5 rounded-xl text-sm text-ivory placeholder-sand/60 focus:outline-none focus:border-orange transition-colors"
                />
                <button
                  type="submit"
                  className="bg-orange hover:bg-orange-hover text-white px-6 py-3.5 rounded-xl font-heading font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange/20"
                >
                  <span>Join Privé</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-ivory text-orange flex items-center justify-center shadow-md">
                <Scissors className="w-5 h-5 stroke-[2.2] transform -rotate-45" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-ivory">
                Salon<span className="text-orange">X</span>
              </span>
            </Link>
            <p className="font-heading text-sm text-orange font-medium">
              Your Style. Your Salon. Your Time.
            </p>
            <p className="text-sm text-sand/80 max-w-sm leading-relaxed">
              India’s premier salon booking platform. Seamlessly discovering verified luxury ateliers, precision barbershops, and holistic spas with real-time slot reservation.
            </p>
            <div className="flex items-center gap-3 pt-2 text-sand">
              <a href="#" aria-label="Website" className="p-2.5 rounded-xl bg-charcoal-card border border-charcoal-border hover:text-orange hover:border-orange/40 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Social Network" className="p-2.5 rounded-xl bg-charcoal-card border border-charcoal-border hover:text-orange hover:border-orange/40 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Chat" className="p-2.5 rounded-xl bg-charcoal-card border border-charcoal-border hover:text-orange hover:border-orange/40 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wide text-ivory uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-sand/80">
              <li><Link to="/explore" className="hover:text-orange transition-colors">Find Salons Near You</Link></li>
              <li><Link to="/explore?category=haircut" className="hover:text-orange transition-colors">Precision Haircuts</Link></li>
              <li><Link to="/explore?category=haircolour" className="hover:text-orange transition-colors">French Balayage</Link></li>
              <li><Link to="/explore?category=facial" className="hover:text-orange transition-colors">Hydra Facials</Link></li>
              <li><Link to="/explore?category=beard" className="hover:text-orange transition-colors">Gentlemen’s Grooming</Link></li>
              <li><Link to="/explore?category=nails" className="hover:text-orange transition-colors">Nail Architecture</Link></li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wide text-ivory uppercase mb-4">
              For Salon Owners
            </h4>
            <ul className="space-y-2.5 text-sm text-sand/80">
              <li><Link to="/become-partner" className="hover:text-orange transition-colors">Partner with SalonX</Link></li>
              <li><Link to="/owner/dashboard" className="hover:text-orange transition-colors">Salon Partner OS</Link></li>
              <li><a href="#" className="hover:text-orange transition-colors">Staff Scheduling Tools</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Verified Badge Criteria</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Smart Inventory Sync</a></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wide text-ivory uppercase mb-4">
              Trust &amp; Security
            </h4>
            <ul className="space-y-2.5 text-sm text-sand/80">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Verified Salons</span>
              </li>
              <li><a href="#" className="hover:text-orange transition-colors">Hygiene Standards</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Cancellation &amp; Refunds</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/60">
          <p>© {new Date().getFullYear()} SalonX Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All Systems Operational
            </span>
            <span>Made with precision for modern grooming.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
