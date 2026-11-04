import React, { useState } from 'react';
import { SALON_CATEGORIES } from '../../services/mockData';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  Sparkles,
  RotateCcw,
  Star,
  Compass,
  ArrowUpDown
} from 'lucide-react';

export default function SalonFilters({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  totalResults = 0
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleCategorySelect = (catId) => {
    setFilters(prev => ({ ...prev, category: catId }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      gender: 'All',
      minRating: 0,
      maxDistance: 10,
      openNow: false,
      featuredOnly: false,
      sortBy: 'popularity'
    });
  };

  return (
    <div className="space-y-4 mb-8">
      
      {/* Top Search Bar & View Mode Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search input with location icon */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search by salon name, service (e.g. Balayage), or location..."
            className="w-full bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border pl-11 pr-4 py-3 rounded-2xl text-sm text-charcoal dark:text-ivory placeholder-sand focus:outline-none focus:border-orange transition-all shadow-sm"
          />
          {filters.search && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-sand hover:text-orange"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Controls: Sort, Filter toggle, View mode */}
        <div className="flex items-center gap-2">
          
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="appearance-none bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border px-4 py-3 pr-8 rounded-2xl text-xs font-heading font-medium text-charcoal dark:text-ivory focus:outline-none focus:border-orange cursor-pointer shadow-sm"
            >
              <option value="popularity">Sort: Most Popular</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="distance">Sort: Nearest to You</option>
              <option value="price_low">Sort: Price (Low to High)</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-sand absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-heading font-medium border transition-colors cursor-pointer shadow-sm ${
              showAdvanced
                ? 'bg-orange text-white border-orange'
                : 'bg-ivory-light dark:bg-charcoal-card border-sand/30 dark:border-charcoal-border text-charcoal dark:text-ivory hover:border-orange'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          {/* View Mode Buttons (Grid, List, Map) */}
          <div className="flex items-center bg-sand/15 dark:bg-charcoal-card p-1 rounded-2xl border border-sand/30 dark:border-charcoal-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-orange text-white shadow-sm'
                  : 'text-charcoal/60 dark:text-ivory/60 hover:text-orange'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-orange text-white shadow-sm'
                  : 'text-charcoal/60 dark:text-ivory/60 hover:text-orange'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-orange text-white shadow-sm'
                  : 'text-charcoal/60 dark:text-ivory/60 hover:text-orange'
              }`}
              title="Interactive Map View"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {SALON_CATEGORIES.map((cat) => {
          const isSelected = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-heading font-medium tracking-wide transition-all cursor-pointer ${
                isSelected
                  ? 'bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal shadow-md scale-102 font-semibold'
                  : 'bg-ivory-light dark:bg-charcoal-card text-charcoal/80 dark:text-ivory/80 border border-sand/30 dark:border-charcoal-border hover:border-orange'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="p-5 rounded-2xl bg-ivory-light dark:bg-charcoal-card border border-sand/30 dark:border-charcoal-border space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Gender Filter */}
            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-2">
                Salon Preference
              </label>
              <div className="flex rounded-xl bg-ivory dark:bg-charcoal p-1 border border-sand/30 dark:border-charcoal-border">
                {['All', 'Unisex', 'Women', 'Men'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilters(prev => ({ ...prev, gender: g }))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-heading font-medium transition-colors cursor-pointer ${
                      filters.gender === g
                        ? 'bg-orange text-white shadow-sm'
                        : 'text-charcoal/70 dark:text-ivory/70 hover:text-charcoal'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider block mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => setFilters(prev => ({ ...prev, minRating: ratingVal }))}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-heading font-semibold border transition-colors cursor-pointer ${
                      filters.minRating === ratingVal
                        ? 'bg-orange text-white border-orange'
                        : 'bg-ivory dark:bg-charcoal border-sand/30 dark:border-charcoal-border text-charcoal/80 dark:text-ivory/80'
                    }`}
                  >
                    {ratingVal === 0 ? 'Any' : (
                      <>
                        <Star className="w-3 h-3 fill-current" />
                        <span>{ratingVal}+</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-heading font-bold text-sand uppercase tracking-wider">
                  Distance Radius
                </label>
                <span className="text-xs font-bold text-orange">{filters.maxDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={filters.maxDistance}
                onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseFloat(e.target.value) }))}
                className="w-full accent-orange cursor-pointer"
              />
            </div>

            {/* Quick Checkboxes */}
            <div className="flex flex-col justify-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal dark:text-ivory">
                <input
                  type="checkbox"
                  checked={filters.openNow}
                  onChange={(e) => setFilters(prev => ({ ...prev, openNow: e.target.checked }))}
                  className="rounded text-orange focus:ring-orange accent-orange"
                />
                <span>Open Right Now</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal dark:text-ivory">
                <input
                  type="checkbox"
                  checked={filters.featuredOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, featuredOnly: e.target.checked }))}
                  className="rounded text-orange focus:ring-orange accent-orange"
                />
                <span>Premier Luxe Salons Only</span>
              </label>
            </div>

          </div>

          {/* Reset Filters Bar */}
          <div className="pt-3 border-t border-sand/20 dark:border-charcoal-border flex items-center justify-between">
            <span className="text-xs text-sand">
              Showing <strong className="text-charcoal dark:text-ivory font-bold">{totalResults}</strong> salon{totalResults !== 1 ? 's' : ''} matching criteria
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-orange hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
