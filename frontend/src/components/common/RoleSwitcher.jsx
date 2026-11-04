import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserCheck, Shield, Scissors, Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RoleSwitcher() {
  const { user, role, switchRole } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles = [
    {
      id: 'CUSTOMER',
      label: 'Customer Demo',
      name: 'Priya Sharma',
      desc: 'Discover salons, select services, book appointments',
      icon: Sparkles,
      targetPath: '/customer/dashboard'
    },
    {
      id: 'SALON_OWNER',
      label: 'Salon Owner',
      name: 'Alexander Wright',
      desc: 'Manage bookings, stylists, services & revenue',
      icon: Scissors,
      targetPath: '/owner/dashboard'
    },
    {
      id: 'STAFF',
      label: 'Stylist / Staff',
      name: 'Rajesh Varma',
      desc: 'View personal schedule & assigned appointments',
      icon: UserCheck,
      targetPath: '/owner/dashboard'
    },
    {
      id: 'ADMIN',
      label: 'Super Admin',
      name: 'Victoria Vance',
      desc: 'Platform governance, verify salons & analytics',
      icon: Shield,
      targetPath: '/admin/dashboard'
    }
  ];

  const handleSelect = (r) => {
    switchRole(r.id);
    setIsOpen(false);
    addToast({
      title: `Switched Role to ${r.label}`,
      message: `Signed in as ${r.name} (${r.id}).`,
      type: 'success'
    });
    navigate(r.targetPath);
  };

  const currentRoleObj = roles.find(r => r.id === role) || roles[0];
  const CurrentIcon = currentRoleObj.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-heading font-medium bg-sand/15 dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border hover:border-orange/50 text-charcoal dark:text-ivory transition-all cursor-pointer shadow-sm"
        title="Quick Role Demo Switcher"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <CurrentIcon className="w-3.5 h-3.5 text-orange" />
        <span className="hidden sm:inline font-semibold">{currentRoleObj.label}</span>
        <ChevronDown className="w-3 h-3 text-sand" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-ivory dark:bg-charcoal-card rounded-2xl shadow-2xl border border-sand/30 dark:border-charcoal-border p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-sand/20 dark:border-charcoal-border/50 mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sand">Instant Demo Mode</p>
            <p className="text-xs text-charcoal/70 dark:text-ivory/70">Test SalonX from different user perspectives</p>
          </div>
          <div className="space-y-1">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r)}
                  className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-orange/15 text-orange border border-orange/30'
                      : 'hover:bg-sand/10 dark:hover:bg-charcoal-muted text-charcoal dark:text-ivory'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? 'bg-orange text-white' : 'bg-sand/20 dark:bg-charcoal-border text-sand'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs">{r.label}</span>
                      {isSelected && <span className="text-[10px] font-bold text-orange">ACTIVE</span>}
                    </div>
                    <p className="text-xs font-medium text-charcoal/80 dark:text-ivory/80 truncate">{r.name}</p>
                    <p className="text-[11px] text-charcoal/60 dark:text-ivory/60 line-clamp-1">{r.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
