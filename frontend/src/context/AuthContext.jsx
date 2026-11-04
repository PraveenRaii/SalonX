import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../services/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('salonx_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    // Default to Customer for seamless out-of-the-box walkthrough
    return DEMO_USERS.customer;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('salonx_token') || 'mock-jwt-token-salonx-2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('salonx_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('salonx_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('salonx_token', token);
    } else {
      localStorage.removeItem('salonx_token');
    }
  }, [token]);

  const login = async (email, password) => {
    // Check if matching any demo user or standard credential
    if (email.includes('owner')) {
      setUser(DEMO_USERS.salonOwner);
      setToken('mock-jwt-owner-token');
      return { success: true, user: DEMO_USERS.salonOwner };
    }
    if (email.includes('admin')) {
      setUser(DEMO_USERS.admin);
      setToken('mock-jwt-admin-token');
      return { success: true, user: DEMO_USERS.admin };
    }
    if (email.includes('staff') || email.includes('rajesh')) {
      setUser(DEMO_USERS.staff);
      setToken('mock-jwt-staff-token');
      return { success: true, user: DEMO_USERS.staff };
    }

    // Default customer user
    const loggedUser = {
      ...DEMO_USERS.customer,
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase())
    };
    setUser(loggedUser);
    setToken('mock-jwt-customer-token');
    return { success: true, user: loggedUser };
  };

  const register = async (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'SalonX Guest',
      email: userData.email,
      phone: userData.phone || '+91 98000 00000',
      role: userData.role || 'CUSTOMER',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      loyaltyPoints: 100,
      savedAddresses: []
    };
    setUser(newUser);
    setToken(`mock-jwt-token-${newUser.id}`);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const switchRole = (role) => {
    switch (role) {
      case 'SALON_OWNER':
        setUser(DEMO_USERS.salonOwner);
        setToken('mock-jwt-owner-token');
        break;
      case 'STAFF':
        setUser(DEMO_USERS.staff);
        setToken('mock-jwt-staff-token');
        break;
      case 'ADMIN':
        setUser(DEMO_USERS.admin);
        setToken('mock-jwt-admin-token');
        break;
      case 'CUSTOMER':
      default:
        setUser(DEMO_USERS.customer);
        setToken('mock-jwt-customer-token');
        break;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        role: user?.role || 'GUEST',
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
