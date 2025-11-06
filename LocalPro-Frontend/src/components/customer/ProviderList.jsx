import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, DollarSign, MapPin, Filter } from 'lucide-react';
import api from '../../services/api';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minRating: 0,
    maxPrice: 1000,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, providers]);

  const categories = [
    { id: 1, name: 'Plumbing' },
    { id: 2, name: 'Electrical' },
    { id: 3, name: 'Carpentry' },
    { id: 4, name: 'Cleaning' },
    { id: 5, name: 'Tutoring' },
    { id: 6, name: 'Home Repair' },
    { id: 7, name: 'Gardening' },
    { id: 8, name: 'Painting' },
    { id: 9, name: 'Moving' },
    { id: 10, name: 'Pet Care' },
  ];

  const fetchProviders = async () => {
  try {
    setLoading(true);

    const response = await api.get('/providers/all');
    const providersData = response.data;
    // Map categoryId to category name
    const formattedProviders = providersData.map((provider) => {
      const category = categories.find(cat => cat.id === provider.categoryId)?.name || 'Other';
      return {
        id: provider.id,
        fullName: provider.user.userName,
        category: category,
        hourlyRate: provider.hourlyRate,
        averageRating: provider.averageRating,
        totalReviews: provider.totalReviews,
        bio: provider.bio,
        profileImageUrl: provider.profileImageUrl || `https://ui-avatars.com/api/?name=${provider.user.userName}&size=200`,
        experienceYears: provider.experienceYears,
        isVerified: provider.isVerified,
        availableDays: provider.availableDays ? provider.availableDays.split(',') : [],
      };
    });

    setProviders(formattedProviders);
    console.log(formattedProviders);
    setFilteredProviders(formattedProviders);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching providers:', error);
    setLoading(false);
  }
};


  const applyFilters = () => {
    let filtered = [...providers];

    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.category.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.bio.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter((p) => p.averageRating >= filters.minRating);
    }

    if (filters.maxPrice < 1000) {
      filtered = filtered.filter((p) => p.hourlyRate <= filters.maxPrice);
    }

    setFilteredProviders(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading providers...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Local Professionals</h1>
        <p className="text-gray-600">Browse verified service providers in your area</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, category, or service..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Rating: {filters.minRating > 0 ? filters.minRating : 'Any'}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ${filters.maxPrice}/hr
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                step="5"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
      </div>

      {/* Provider Grid */}
      {filteredProviders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600">No providers found matching your criteria</p>
          <button
            onClick={() => setFilters({ search: '', category: '', minRating: 0, maxPrice: 1000 })}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <Link
              key={provider.id}
              to={`/providers/${provider.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={provider.profileImageUrl}
                  alt={provider.fullName}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{provider.fullName}</h3>
                  {provider.isVerified && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-3">{provider.category}</p>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{provider.bio}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-gray-900 font-medium">
                      {provider.averageRating.toFixed(1)}
                    </span>
                    <span className="ml-1 text-gray-500">({provider.totalReviews})</span>
                  </div>

                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4" />
                    <span>{provider.hourlyRate}/hr</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  {provider.experienceYears} years experience
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderList;