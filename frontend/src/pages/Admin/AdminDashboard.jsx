import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { MOCK_SALONS } from '../../services/mockData';
import {
  ShieldCheck,
  Building,
  Users,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Sparkles,
  TrendingUp,
  Percent,
  Eye,
  FileCheck2,
  Trash2
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { bookings } = useBooking();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // overview, salons, approvals, users, bookings

  // Pending salon verification applications state
  const [pendingSalons, setPendingSalons] = useState([
    {
      id: 'app-901',
      name: 'Mirasol Hair & Botany Atelier',
      ownerName: 'Devika Singhania',
      city: 'Mumbai',
      address: 'Plot 14, Linking Road, Bandra West',
      phone: '+91 98200 44551',
      licenseNo: 'MH-BOM-883921',
      submittedDate: 'Nov 02, 2026',
      status: 'PENDING'
    },
    {
      id: 'app-902',
      name: 'Vanguard Barber & Co.',
      ownerName: 'Kabir Oberoi',
      city: 'Delhi NCR',
      address: 'M-Block, Greater Kailash II',
      phone: '+91 98100 77889',
      licenseNo: 'DL-SEC-119284',
      submittedDate: 'Nov 01, 2026',
      status: 'PENDING'
    }
  ]);

  const handleApproveSalon = (id, name) => {
    setPendingSalons(prev => prev.filter(p => p.id !== id));
    addToast({
      title: 'Salon Approved & Verified',
      message: `${name} is now approved to accept real-time bookings on SalonX.`,
      type: 'success'
    });
  };

  const handleRejectSalon = (id, name) => {
    setPendingSalons(prev => prev.filter(p => p.id !== id));
    addToast({
      title: 'Application Rejected',
      message: `${name} application has been declined.`,
      type: 'default'
    });
  };

  const totalGMV = 485000;
  const platformCommission = Math.round(totalGMV * 0.12); // 12% take rate

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-sand mb-1">
              <ShieldCheck className="w-4 h-4 text-orange" />
              <span>SalonX Administration Suite</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-ivory">
              Master Admin Control Center
            </h1>
            <p className="text-xs text-sand mt-0.5">
              Platform governance, marketplace compliance, salon approvals &amp; payouts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-orange/15 text-orange text-xs font-heading font-bold flex items-center gap-1.5 border border-orange/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Super Admin Level 1
            </span>
          </div>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-sand/30 dark:border-charcoal-border mb-8 scrollbar-none">
          {[
            { id: 'overview', label: 'Platform Analytics', icon: TrendingUp },
            { id: 'approvals', label: 'Salon Approvals', icon: FileCheck2, badge: pendingSalons.length },
            { id: 'salons', label: 'Active Salons', icon: Building, badge: MOCK_SALONS.length },
            { id: 'bookings', label: 'All Platform Bookings', icon: Calendar, badge: bookings.length },
            { id: 'users', label: 'User Directory', icon: Users, badge: 1420 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-heading font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal shadow-sm'
                    : 'text-charcoal/70 dark:text-ivory/70 hover:bg-sand/15 dark:hover:bg-charcoal-border'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange' : 'text-sand'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-orange text-white' : 'bg-sand/20 text-charcoal/80 dark:text-ivory/80'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Total GMV Bookings</span>
                <p className="font-heading font-black text-3xl text-charcoal dark:text-ivory mt-1">₹{totalGMV.toLocaleString()}</p>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +32% MoM growth
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Platform Commission (12%)</span>
                <p className="font-heading font-black text-3xl text-orange mt-1">₹{platformCommission.toLocaleString()}</p>
                <span className="text-xs text-sand font-medium mt-1 block">Net SalonX Revenue</span>
              </div>

              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Registered Salons</span>
                <p className="font-heading font-black text-3xl text-charcoal dark:text-ivory mt-1">48 Active</p>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">99.8% Chair Uptime</span>
              </div>

              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Total Registered Customers</span>
                <p className="font-heading font-black text-3xl text-charcoal dark:text-ivory mt-1">12,480</p>
                <span className="text-xs text-sand font-medium mt-1 block">Across 4 metro cities</span>
              </div>
            </div>

            {/* Quick Approvals Alert Box if any */}
            {pendingSalons.length > 0 && (
              <div className="p-5 rounded-3xl bg-orange/10 border border-orange/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-orange shrink-0" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-charcoal dark:text-ivory">
                      {pendingSalons.length} New Salon Verification Requests Pending
                    </h4>
                    <p className="text-xs text-sand">Review their trade licenses, salon premises photos and hygiene certifications.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('approvals')}
                  className="px-4 py-2 rounded-xl bg-orange text-white text-xs font-heading font-bold hover:bg-orange-hover shrink-0 cursor-pointer"
                >
                  Review Approvals
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SALON APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory mb-2">
              Pending Salon Partner Applications
            </h3>

            {pendingSalons.length === 0 ? (
              <div className="p-12 text-center bg-ivory-light dark:bg-charcoal-card rounded-3xl border border-sand/30 dark:border-charcoal-border">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-heading font-bold text-base text-charcoal dark:text-ivory">All Caught Up!</p>
                <p className="text-xs text-sand mt-0.5">No pending salon approvals requiring manual review.</p>
              </div>
            ) : (
              pendingSalons.map((app) => (
                <div
                  key={app.id}
                  className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-orange font-bold">#{app.id}</span>
                      <span className="text-xs text-sand font-medium">Submitted {app.submittedDate}</span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">{app.name}</h4>
                    <p className="text-xs text-sand">Owner: <strong>{app.ownerName}</strong> • {app.phone}</p>
                    <p className="text-xs text-sand">{app.address}, {app.city} • License: <span className="font-mono">{app.licenseNo}</span></p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 md:pt-0">
                    <button
                      onClick={() => handleRejectSalon(app.id, app.name)}
                      className="px-4 py-2 rounded-xl border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleApproveSalon(app.id, app.name)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold cursor-pointer"
                    >
                      Approve &amp; Verify
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: SALONS */}
        {activeTab === 'salons' && (
          <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Registered Marketplace Salons</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sand/20 dark:border-charcoal-border text-sand font-heading uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Salon Name</th>
                    <th className="py-3 px-3">City</th>
                    <th className="py-3 px-3">Rating</th>
                    <th className="py-3 px-3">Gender</th>
                    <th className="py-3 px-3">Commission</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/15 dark:divide-charcoal-border">
                  {MOCK_SALONS.map((s) => (
                    <tr key={s.id} className="hover:bg-sand/10 dark:hover:bg-charcoal/50">
                      <td className="py-3.5 px-3 font-bold text-charcoal dark:text-ivory">{s.name}</td>
                      <td className="py-3.5 px-3 text-sand">{s.city}</td>
                      <td className="py-3.5 px-3 font-semibold text-orange">{s.rating} ★ ({s.reviewCount})</td>
                      <td className="py-3.5 px-3">{s.gender}</td>
                      <td className="py-3.5 px-3 font-mono font-semibold">12% Default</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                          VERIFIED
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <Link
                          to={`/salon/${s.id}`}
                          className="px-2.5 py-1 rounded-lg border border-sand/40 hover:bg-orange hover:text-white hover:border-orange transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">All Marketplace Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sand/20 dark:border-charcoal-border text-sand font-heading uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Salon</th>
                    <th className="py-3 px-3">Stylist</th>
                    <th className="py-3 px-3">Slot</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/15 dark:divide-charcoal-border">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-sand/10 dark:hover:bg-charcoal/50">
                      <td className="py-3 px-3 font-mono font-bold text-orange">#{b.id}</td>
                      <td className="py-3 px-3 font-medium">{b.customerName}</td>
                      <td className="py-3 px-3 font-medium text-charcoal dark:text-ivory">{b.salonName}</td>
                      <td className="py-3 px-3 text-sand">{b.stylistName}</td>
                      <td className="py-3 px-3 text-sand">{b.date}</td>
                      <td className="py-3 px-3 font-bold text-charcoal dark:text-ivory">₹{b.totalAmount}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-orange">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: USERS */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Registered User Accounts</h3>
            <div className="space-y-3">
              {[
                { name: 'Priya Sharma', email: 'priya@example.com', role: 'CUSTOMER', city: 'Bengaluru', bookings: 3 },
                { name: 'Alexander Wright', email: 'owner@luxe.com', role: 'SALON_OWNER', salon: 'The Luxe Atelier', bookings: 42 },
                { name: 'Rajesh Varma', email: 'rajesh@luxe.com', role: 'STAFF', speciality: 'Master Colorist', bookings: 28 },
                { name: 'Victoria Vance', email: 'admin@salonx.com', role: 'ADMIN', title: 'Platform Director' }
              ].map((u, i) => (
                <div key={i} className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/20 dark:border-charcoal-border flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-heading font-bold text-sm text-charcoal dark:text-ivory">{u.name}</h5>
                    <p className="text-sand">{u.email} • {u.city || u.salon || u.speciality || u.title}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-orange/15 text-orange font-bold text-[10px]">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
