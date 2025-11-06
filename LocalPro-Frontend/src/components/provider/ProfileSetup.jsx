import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, DollarSign, Briefcase, FileText } from 'lucide-react';
import api from '../../services/api';

const ProfileSetup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryId: '',       // ✅ numeric ID
    bio: '',
    hourlyRate: '',
    experienceYears: '',
    availableDays: [],
    profileImageUrl: '',
  });

  // Categories with IDs
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDayChange = (day, checked) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: checked
        ? [...prev.availableDays, day]
        : prev.availableDays.filter((d) => d !== day),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await api.post(
        '/providers/setup', // make sure this matches backend
        {
          user: user,
          bio: formData.bio,
          hourlyRate: parseFloat(formData.hourlyRate),
          experienceYears: parseInt(formData.experienceYears),
          profileImageUrl: formData.profileImageUrl,
          isVerified: false,
          averageRating: 0,
          totalReviews: 0,
          availableDays: formData.availableDays.join(','),
          categoryId: parseInt(formData.categoryId), // ✅ numeric ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Provider profile created:', response.data);
      alert('Profile created successfully!');
      navigate('/provider/dashboard');
    } catch (error) {
      console.error('Error creating provider profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Your Provider Profile
        </h1>
        <p className="text-gray-600">
          Set up your profile to start receiving booking requests
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Upload Photo
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              JPG, PNG or GIF. Max size 5MB.
            </p>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Service Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Professional Bio *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                id="bio"
                name="bio"
                required
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Describe your experience, expertise, and what makes you stand out..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Hourly Rate */}
          <div>
            <label
              htmlFor="hourlyRate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Hourly Rate (USD) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                required
                min="10"
                max="500"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="50"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Experience Years */}
          <div>
            <label
              htmlFor="experienceYears"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Years of Experience *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="experienceYears"
                name="experienceYears"
                type="number"
                required
                min="0"
                max="50"
                value={formData.experienceYears}
                onChange={handleChange}
                placeholder="5"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              General Availability
            </label>
            <div className="space-y-2">
              {[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ].map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availableDays.includes(day)}
                    onChange={(e) => handleDayChange(day, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
