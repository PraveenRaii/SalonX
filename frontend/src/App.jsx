import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/Home/HomePage';
import ExplorePage from './pages/Explore/ExplorePage';
import SalonDetailsPage from './pages/SalonDetails/SalonDetailsPage';
import BookingPage from './pages/Booking/BookingPage';
import ConfirmationPage from './pages/Booking/ConfirmationPage';
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import OwnerDashboard from './pages/Owner/OwnerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import OffersPage from './pages/Offers/OffersPage';
import BecomePartnerPage from './pages/Partner/BecomePartnerPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Main Customer & General Flow */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/salon/:id" element={<SalonDetailsPage />} />
                  <Route path="/booking/:salonId" element={<BookingPage />} />
                  <Route path="/booking/confirmed/:id" element={<ConfirmationPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/become-partner" element={<BecomePartnerPage />} />
                  <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                  <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  
                  {/* Auth */}
                  <Route path="/auth/login" element={<LoginPage />} />
                  <Route path="/auth/register" element={<RegisterPage />} />
                  <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                  
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
