import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import RoleSwitcher from './RoleSwitcher';
import {
  Scissors,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Heart,
  Calendar,
  LogOut,
  Sparkles,
  LayoutDashboard,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout, role } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { favourites } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Explore Salons', path: '/explore' },
    { label: 'Services', path: '/explore?tab=services' },
    { label: 'Offers', path: '/offers' },
    { label: 'Become a Partner', path: '/become-partner' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-ivory/90 dark:bg-charcoal/90 border-b border-sand/30 dark:border-charcoal-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-charcoal dark:bg-ivory flex items-center justify-center text-orange group-hover:scale-105 transition-all shadow-md">
              <Scissors className="w-6 h-6 stroke-[2.2] transform -rotate-45" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-charcoal dark:text-ivory">
                Salon<span className="text-orange">X</span>
              </span>
              <p className="text-[10px] tracking-widest font-heading uppercase text-sand-dark dark:text-sand font-medium -mt-1 hidden sm:block">
                Luxury Beauty Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-heading font-medium tracking-wide transition-colors hover:text-orange ${
                    isActive
                      ? 'text-orange font-semibold'
                      : 'text-charcoal/80 dark:text-ivory/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Demo Role Switcher */}
            <RoleSwitcher />

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-sand/15 dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border text-charcoal dark:text-ivory hover:text-orange dark:hover:text-orange transition-all cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-charcoal" />}
            </button>

            {/* Favourites shortcut */}
            <Link
              to="/customer/dashboard?tab=favourites"
              className="relative p-2.5 rounded-xl bg-sand/15 dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border text-charcoal dark:text-ivory hover:text-orange dark:hover:text-orange transition-all"
              title="Saved Salons"
            >
              <Heart className="w-4 h-4" />
              {favourites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {favourites.length}
                </span>
              )}
            </Link>

            {/* User Account / Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-sand/20 dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border hover:border-orange/50 transition-all cursor-pointer"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border border-orange/40"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-heading font-semibold text-charcoal dark:text-ivory leading-tight truncate max-w-[100px]">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-orange uppercase font-bold tracking-wider">
                      {role.replace('_', ' ')}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-sand" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-ivory dark:bg-charcoal-card rounded-2xl shadow-2xl border border-sand/30 dark:border-charcoal-border p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-sand/20 dark:border-charcoal-border/50 mb-1">
                      <p className="text-xs font-bold text-charcoal dark:text-ivory truncate">{user?.name}</p>
                      <p className="text-[11px] text-charcoal/60 dark:text-ivory/60 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/customer/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-charcoal dark:text-ivory hover:bg-orange/10 hover:text-orange transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-orange" />
                      <span>My Appointments</span>
                    </Link>

                    {(role === 'SALON_OWNER' || role === 'STAFF') && (
                      <Link
                        to="/owner/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-charcoal dark:text-ivory hover:bg-orange/10 hover:text-orange transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-orange" />
                        <span>Salon Owner Portal</span>
                      </Link>
                    )}

                    {role === 'ADMIN' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-charcoal dark:text-ivory hover:bg-orange/10 hover:text-orange transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-orange" />
                        <span>Super Admin Console</span>
                      </Link>
                    )}

                    <div className="my-1 border-t border-sand/20 dark:border-charcoal-border/50" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth/login"
                  className="text-xs font-heading font-semibold text-charcoal dark:text-ivory hover:text-orange px-3 py-2 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/auth/register"
                  className="text-xs font-heading font-semibold bg-orange hover:bg-orange-hover text-white px-4 py-2.5 rounded-xl shadow-md shadow-orange/20 transition-all hover:scale-[1.02]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <RoleSwitcher />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-sand/15 dark:bg-charcoal-card text-charcoal dark:text-ivory"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-sand/20 dark:bg-charcoal-card text-charcoal dark:text-ivory"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory dark:bg-charcoal border-b border-sand/30 dark:border-charcoal-border px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-heading font-medium text-charcoal dark:text-ivory hover:bg-orange/10 hover:text-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-sand/20 dark:border-charcoal-border/50 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/customer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-charcoal dark:text-ivory hover:bg-orange/10"
                >
                  <Calendar className="w-4 h-4 text-orange" />
                  My Customer Dashboard
                </Link>
                {(role === 'SALON_OWNER' || role === 'STAFF') && (
                  <Link
                    to="/owner/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-charcoal dark:text-ivory hover:bg-orange/10"
                  >
                    <LayoutDashboard className="w-4 h-4 text-orange" />
                    Salon Owner Dashboard
                  </Link>
                )}
                {role === 'ADMIN' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-charcoal dark:text-ivory hover:bg-orange/10"
                  >
                    <ShieldAlert className="w-4 h-4 text-orange" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl border border-sand/30 text-sm font-semibold text-charcoal dark:text-ivory"
                >
                  Log In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-orange text-white text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
