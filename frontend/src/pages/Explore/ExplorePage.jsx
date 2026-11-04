import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_SALONS } from '../../services/mockData';
import SalonCard from '../../components/salon/SalonCard';
import SalonFilters from '../../components/salon/SalonFilters';
import SalonMap from '../../components/salon/SalonMap';
import { Sparkles, Scissors, RotateCcw } from 'lucide-react';

export default function ExplorePage() {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    gender: 'All',
    minRating: 0,
    maxDistance: 12,
    openNow: false,
    featuredOnly: false,
    sortBy: 'popularity'
  });

  const [viewMode, setViewMode] = useState('grid'); // grid, list, map

  // Filter salons logic
  const filteredSalons = useMemo(() => {
    let list = [...MOCK_SALONS];

    // Search query
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.services.some(srv => srv.name.toLowerCase().includes(q) || srv.category.toLowerCase().includes(q))
      );
    }

    // Category
    if (filters.category && filters.category !== 'all') {
      list = list.filter(s =>
        s.services.some(srv => srv.category.toLowerCase() === filters.category.toLowerCase())
      );
    }

    // Gender
    if (filters.gender && filters.gender !== 'All') {
      list = list.filter(s => s.gender === 'Unisex' || s.gender === filters.gender);
    }

    // Min rating
    if (filters.minRating > 0) {
      list = list.filter(s => s.rating >= filters.minRating);
    }

    // Max distance
    if (filters.maxDistance) {
      list = list.filter(s => s.distanceKm <= filters.maxDistance);
    }

    // Open now
    if (filters.openNow) {
      list = list.filter(s => s.isOpenNow);
    }

    // Featured only
    if (filters.featuredOnly) {
      list = list.filter(s => s.featured);
    }

    // Sorting
    if (filters.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'distance') {
      list.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (filters.sortBy === 'price_low') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [filters]);

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-sand uppercase font-bold tracking-wider mb-2">
            <span>Marketplace</span>
            <span>/</span>
            <span className="text-orange">Salons Directory</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-ivory tracking-tight">
            Discover &amp; Book Nearby Salons
          </h1>
          <p className="text-xs sm:text-sm text-sand mt-1">
            Browse verified luxury ateliers, compare pricing, review stylist credentials, and reserve your chair in seconds.
          </p>
        </div>

        {/* Filter Toolbar */}
        <SalonFilters
          filters={filters}
          setFilters={setFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredSalons.length}
        />

        {/* Results Render: Map View vs Grid/List */}
        {viewMode === 'map' ? (
          <div className="mb-12">
            <SalonMap salons={filteredSalons} />
          </div>
        ) : filteredSalons.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 px-4 rounded-3xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border">
            <div className="w-16 h-16 rounded-2xl bg-orange/15 text-orange flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-charcoal dark:text-ivory">
              No Salons Found
            </h3>
            <p className="text-sm text-sand mt-1 max-w-md mx-auto">
              We couldn’t find any salons matching your exact filters. Try broadening your distance radius or search query.
            </p>
            <button
              onClick={() =>
                setFilters({
                  search: '',
                  category: 'all',
                  gender: 'All',
                  minRating: 0,
                  maxDistance: 15,
                  openNow: false,
                  featuredOnly: false,
                  sortBy: 'popularity'
                })
              }
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange text-white text-xs font-heading font-semibold shadow-md hover:bg-orange-hover transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          /* Grid / List Results */
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'
                : 'space-y-4 mb-16'
            }
          >
            {filteredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} viewMode={viewMode} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
