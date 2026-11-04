import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { MOCK_SALONS } from '../../services/mockData';
import {
  Scissors,
  DollarSign,
  Users,
  Calendar,
  Clock,
  Plus,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Sparkles,
  MapPin,
  Settings,
  Star,
  Check,
  Edit2,
  Trash2,
  Eye,
  Percent,
  AlertCircle
} from 'lucide-react';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useBooking();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // overview, appointments, services, staff, earnings
  const [salon, setSalon] = useState(MOCK_SALONS[0]);

  // Modals
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('haircut');
  const [newServicePrice, setNewServicePrice] = useState('1500');
  const [newServiceDuration, setNewServiceDuration] = useState('45');

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffTitle, setNewStaffTitle] = useState('Senior Stylist');
  const [newStaffSpeciality, setNewStaffSpeciality] = useState('Precision Haircutting');

  // Salon specific bookings
  const salonBookings = bookings.filter(b => b.salonId === salon.id || b.salonName === salon.name);

  // Stats calculation
  const totalRevenue = salonBookings
    .filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newServiceName) return;

    const newService = {
      id: `srv-${Date.now()}`,
      name: newServiceName,
      category: newServiceCategory,
      price: parseInt(newServicePrice, 10),
      durationMinutes: parseInt(newServiceDuration, 10),
      gender: 'Unisex',
      popular: false
    };

    setSalon(prev => ({
      ...prev,
      services: [newService, ...prev.services]
    }));

    addToast({
      title: 'Service Added',
      message: `${newServiceName} has been published to your salon menu.`,
      type: 'success'
    });

    setShowAddServiceModal(false);
    setNewServiceName('');
  };

  const handleDeleteService = (srvId) => {
    setSalon(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== srvId)
    }));
    addToast({ title: 'Service Removed', message: 'Item deleted from menu.', type: 'default' });
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaffName) return;

    const newStaff = {
      id: `sty-${Date.now()}`,
      name: newStaffName,
      title: newStaffTitle,
      experience: '5+ Years',
      speciality: newStaffSpeciality,
      rating: 5.0,
      reviewCount: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      available: true
    };

    setSalon(prev => ({
      ...prev,
      stylists: [...prev.stylists, newStaff]
    }));

    addToast({
      title: 'Staff Member Added',
      message: `${newStaffName} added to salon roster.`,
      type: 'success'
    });

    setShowAddStaffModal(false);
    setNewStaffName('');
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Salon Owner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-sand mb-1">
              <span>Partner OS</span>
              <span>/</span>
              <span className="text-orange">Salon Manager</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-ivory">
              {salon.name}
            </h1>
            <p className="text-xs text-sand flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-orange" />
              <span>{salon.address}</span>
              <span className="text-emerald-500 font-semibold">• Live Online</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddServiceModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-orange hover:bg-orange-hover text-white text-xs font-heading font-bold shadow-md shadow-orange/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
            <button
              onClick={() => setShowAddStaffModal(true)}
              className="px-4 py-2.5 rounded-2xl border border-sand/40 dark:border-charcoal-border hover:bg-sand/15 text-xs font-heading font-semibold text-charcoal dark:text-ivory flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Add Stylist</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-sand/30 dark:border-charcoal-border mb-8 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: TrendingUp },
            { id: 'appointments', label: 'Appointments & Queue', icon: Calendar, badge: salonBookings.length },
            { id: 'services', label: 'Service Menu', icon: Scissors, badge: salon.services.length },
            { id: 'staff', label: 'Stylists & Roster', icon: Users, badge: salon.stylists.length },
            { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign }
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

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Today’s Bookings</span>
                <p className="font-heading font-black text-3xl text-charcoal dark:text-ivory mt-1">
                  {salonBookings.filter(b => b.status === 'CONFIRMED').length}
                </p>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18% vs yesterday
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Total GMV Revenue</span>
                <p className="font-heading font-black text-3xl text-orange mt-1">
                  ₹{(totalRevenue + 84500).toLocaleString()}
                </p>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Paid directly via Razorpay
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Average Ticket Size</span>
                <p className="font-heading font-black text-3xl text-charcoal dark:text-ivory mt-1">
                  ₹2,450
                </p>
                <span className="text-xs text-sand font-medium mt-1 block">
                  Top service: French Balayage
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">Customer Satisfaction</span>
                <p className="font-heading font-black text-3xl text-charcoal dark:text-ivory mt-1">
                  {salon.rating} ★
                </p>
                <span className="text-xs text-sand font-medium mt-1 block">
                  From {salon.reviewCount} verified client ratings
                </span>
              </div>
            </div>

            {/* Performance Analytics Chart & Live Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Simulated Revenue Bar Graph */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Weekly Revenue Trends</h3>
                    <p className="text-xs text-sand">Daily gross bookings in ₹ INR</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    +24% this week
                  </span>
                </div>

                <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-sand/20 dark:border-charcoal-border pb-2">
                  {[
                    { day: 'Mon', val: 65, amount: '₹14,500' },
                    { day: 'Tue', val: 78, amount: '₹18,200' },
                    { day: 'Wed', val: 50, amount: '₹11,000' },
                    { day: 'Thu', val: 82, amount: '₹21,400' },
                    { day: 'Fri', val: 95, amount: '₹26,800' },
                    { day: 'Sat', val: 100, amount: '₹34,200' },
                    { day: 'Sun', val: 90, amount: '₹29,600' }
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-orange opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {bar.amount}
                      </span>
                      <div
                        style={{ height: `${bar.val}%` }}
                        className="w-full max-w-[42px] rounded-t-xl bg-orange hover:bg-orange-hover transition-all duration-300 shadow-sm"
                      />
                      <span className="text-xs text-sand font-medium">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Salon Highlights */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Chair Utilization</h3>
                <div className="p-4 rounded-2xl bg-orange/10 border border-orange/20 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-charcoal dark:text-ivory">Active Chairs</span>
                    <span className="text-orange">4 of 5 Busy</span>
                  </div>
                  <div className="w-full bg-sand/30 rounded-full h-2">
                    <div className="bg-orange h-2 rounded-full w-[80%]"></div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-heading font-bold uppercase text-sand tracking-wider">Top Performing Stylist</h4>
                  <div className="flex items-center gap-3">
                    <img
                      src={salon.stylists[0].avatar}
                      alt={salon.stylists[0].name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-charcoal dark:text-ivory">{salon.stylists[0].name}</p>
                      <p className="text-[11px] text-orange">{salon.stylists[0].speciality}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Live Appointment Roster</h3>
                <p className="text-xs text-sand">Real-time incoming customer bookings</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sand/20 dark:border-charcoal-border text-sand font-heading uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Booking ID</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Services</th>
                    <th className="py-3 px-3">Stylist</th>
                    <th className="py-3 px-3">Date &amp; Slot</th>
                    <th className="py-3 px-3">Bill</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/15 dark:divide-charcoal-border">
                  {salonBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-sand/10 dark:hover:bg-charcoal/50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-orange">#{b.id}</td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-charcoal dark:text-ivory block">{b.customerName}</span>
                        <span className="text-[10px] text-sand">{b.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-3 max-w-[180px] truncate">
                        {b.services.map(s => s.name).join(', ')}
                      </td>
                      <td className="py-3.5 px-3 font-medium">{b.stylistName}</td>
                      <td className="py-3.5 px-3 font-semibold text-charcoal dark:text-ivory">{b.date}</td>
                      <td className="py-3.5 px-3 font-bold text-orange">₹{b.totalAmount}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'CONFIRMED'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : b.status === 'COMPLETED'
                            ? 'bg-blue-500/15 text-blue-500'
                            : 'bg-red-500/15 text-red-500'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status === 'CONFIRMED' && (
                            <button
                              onClick={() => {
                                updateBookingStatus(b.id, 'COMPLETED');
                                addToast({ title: 'Service Completed', message: `Booking #${b.id} marked as completed.`, type: 'success' });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold cursor-pointer"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => {
                              updateBookingStatus(b.id, 'CANCELLED');
                              addToast({ title: 'Booking Rejected', message: `Booking #${b.id} marked cancelled.`, type: 'default' });
                            }}
                            className="p-1 rounded-lg text-sand hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            title="Cancel / Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Active Service Menu</h3>
                <p className="text-xs text-sand">Manage prices, durations and descriptions</p>
              </div>
              <button
                onClick={() => setShowAddServiceModal(true)}
                className="px-4 py-2 rounded-xl bg-orange text-white text-xs font-heading font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {salon.services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 rounded-2xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sand block">
                      {srv.category}
                    </span>
                    <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory mt-0.5">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-sand mt-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-orange" />
                      <span>{srv.durationMinutes} minutes</span>
                    </p>
                    <p className="font-heading font-extrabold text-lg text-orange mt-2">
                      ₹{srv.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="p-2 text-sand hover:text-red-500 rounded-lg hover:bg-sand/10 transition-colors cursor-pointer"
                    title="Delete service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. STAFF TAB */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Stylists &amp; Staff</h3>
                <p className="text-xs text-sand">Manage team members, ratings and specialties</p>
              </div>
              <button
                onClick={() => setShowAddStaffModal(true)}
                className="px-4 py-2 rounded-xl bg-orange text-white text-xs font-heading font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Stylist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {salon.stylists.map((sty) => (
                <div
                  key={sty.id}
                  className="p-6 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border text-center space-y-3"
                >
                  <img
                    src={sty.avatar}
                    alt={sty.name}
                    className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-orange/40"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-base text-charcoal dark:text-ivory">{sty.name}</h4>
                    <p className="text-xs text-orange font-semibold">{sty.title}</p>
                    <p className="text-xs text-sand mt-1">{sty.speciality}</p>
                  </div>
                  <div className="pt-2 border-t border-sand/20 dark:border-charcoal-border flex items-center justify-between text-xs text-sand">
                    <span>{sty.experience}</span>
                    <span className="font-bold text-charcoal dark:text-ivory">{sty.rating} ★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. EARNINGS TAB */}
        {activeTab === 'earnings' && (
          <div className="p-8 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-sand/20 dark:border-charcoal-border pb-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">Direct Settlement Account</h3>
                <p className="text-xs text-sand">Automated daily NEFT/RTGS bank transfers via Razorpay Route</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                KYC Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/20 dark:border-charcoal-border">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Settled to Bank (Last 30 Days)</span>
                <p className="font-heading font-extrabold text-2xl text-charcoal dark:text-ivory mt-1">₹1,42,850</p>
              </div>
              <div className="p-4 rounded-2xl bg-ivory dark:bg-charcoal border border-sand/20 dark:border-charcoal-border">
                <span className="text-[10px] uppercase font-bold text-sand tracking-wider">Upcoming Settlement (Tomorrow)</span>
                <p className="font-heading font-extrabold text-2xl text-orange mt-1">₹8,420</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sand/15 dark:bg-charcoal/50 text-xs text-sand space-y-1">
              <p className="font-bold text-charcoal dark:text-ivory">Bank Details on Record:</p>
              <p>HDFC Bank • A/C No: ••••••••8491 • IFSC: HDFC0001042</p>
            </div>
          </div>
        )}

      </div>

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleAddService} className="w-full max-w-md bg-ivory dark:bg-charcoal rounded-3xl border border-sand/40 dark:border-charcoal-border p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Add New Service</h3>
            <div>
              <label className="text-xs font-semibold text-sand block mb-1">Service Name</label>
              <input
                type="text"
                required
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                placeholder="E.g. Japanese Silk Keratin"
                className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-sand block mb-1">Category</label>
              <select
                value={newServiceCategory}
                onChange={(e) => setNewServiceCategory(e.target.value)}
                className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
              >
                <option value="haircut">Haircut</option>
                <option value="hairstyling">Hair Styling</option>
                <option value="haircolour">Hair Colour</option>
                <option value="facial">Facial</option>
                <option value="beard">Beard</option>
                <option value="nails">Nails</option>
                <option value="spa">Spa</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-sand block mb-1">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-sand block mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  required
                  value={newServiceDuration}
                  onChange={(e) => setNewServiceDuration(e.target.value)}
                  className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddServiceModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-sand/30"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-orange text-white text-xs font-semibold"
              >
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleAddStaff} className="w-full max-w-md bg-ivory dark:bg-charcoal rounded-3xl border border-sand/40 dark:border-charcoal-border p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-ivory">Add Master Stylist</h3>
            <div>
              <label className="text-xs font-semibold text-sand block mb-1">Stylist Full Name</label>
              <input
                type="text"
                required
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                placeholder="E.g. Simone Rocha"
                className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-sand block mb-1">Professional Title</label>
              <input
                type="text"
                value={newStaffTitle}
                onChange={(e) => setNewStaffTitle(e.target.value)}
                placeholder="E.g. Senior Colorist"
                className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-sand block mb-1">Primary Speciality</label>
              <input
                type="text"
                value={newStaffSpeciality}
                onChange={(e) => setNewStaffSpeciality(e.target.value)}
                placeholder="E.g. French Balayage, Fade Styling"
                className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border p-2.5 rounded-xl text-xs"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddStaffModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-sand/30"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-orange text-white text-xs font-semibold"
              >
                Add to Roster
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
