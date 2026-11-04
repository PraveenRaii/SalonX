import axios from 'axios';
import { MOCK_SALONS, INITIAL_BOOKINGS, DEMO_USERS, MOCK_COUPONS } from './mockData';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('salonx_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const salonService = {
  async getSalons(params = {}) {
    try {
      const response = await apiClient.get('/salons', { params });
      return response.data;
    } catch {
      // Fallback to rich mock data
      let salons = [...MOCK_SALONS];

      if (params.category && params.category !== 'all') {
        salons = salons.filter(s =>
          s.services.some(srv => srv.category.toLowerCase() === params.category.toLowerCase())
        );
      }

      if (params.search) {
        const query = params.search.toLowerCase();
        salons = salons.filter(
          s =>
            s.name.toLowerCase().includes(query) ||
            s.address.toLowerCase().includes(query) ||
            s.city.toLowerCase().includes(query) ||
            s.services.some(srv => srv.name.toLowerCase().includes(query))
        );
      }

      if (params.gender && params.gender !== 'All') {
        salons = salons.filter(s => s.gender === 'Unisex' || s.gender === params.gender);
      }

      if (params.minRating) {
        salons = salons.filter(s => s.rating >= parseFloat(params.minRating));
      }

      if (params.openNow) {
        salons = salons.filter(s => s.isOpenNow);
      }

      if (params.sortBy) {
        if (params.sortBy === 'rating') {
          salons.sort((a, b) => b.rating - a.rating);
        } else if (params.sortBy === 'distance') {
          salons.sort((a, b) => a.distanceKm - b.distanceKm);
        } else if (params.sortBy === 'price_low') {
          salons.sort((a, b) => a.startingPrice - b.startingPrice);
        } else if (params.sortBy === 'popularity') {
          salons.sort((a, b) => b.reviewCount - a.reviewCount);
        }
      }

      return salons;
    }
  },

  async getSalonById(id) {
    try {
      const response = await apiClient.get(`/salons/${id}`);
      return response.data;
    } catch {
      const salon = MOCK_SALONS.find(s => s.id === id);
      return salon || MOCK_SALONS[0];
    }
  }
};

export const bookingService = {
  async createBooking(bookingData) {
    try {
      const response = await apiClient.post('/bookings', bookingData);
      return response.data;
    } catch {
      // Simulated response
      return {
        ...bookingData,
        id: `SX-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      };
    }
  },

  async getBookings() {
    try {
      const response = await apiClient.get('/bookings');
      return response.data;
    } catch {
      return INITIAL_BOOKINGS;
    }
  }
};

export default apiClient;
