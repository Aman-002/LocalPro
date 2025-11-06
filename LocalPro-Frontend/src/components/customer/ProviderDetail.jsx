import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Star, DollarSign, Calendar, MapPin, Award, Clock, Mail, Phone } from 'lucide-react';
import api from '../../services/api';

const ProviderDetail = () => {
  const { id } = useParams();
  console.log('Provider ID from params:', id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    description: '',
  });

  useEffect(() => {
    fetchProviderDetails();
  }, [id]);
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

  const fetchProviderDetails = async () => {
    try {
      // Mock data - replace with actual API call
      setLoading(true);
      const response = await api.get(`/providers/${id}`);
      const providerData = response.data;
      console.log('Fetched provider data:', providerData);
      const category = categories.find(cat => cat.id === providerData.categoryId)?.name || 'Other';
      const fetchedData = {
        id: providerData.id,
        fullName: providerData.user.userName,
        category: category,
        hourlyRate: providerData.hourlyRate,
        averageRating: providerData.averageRating,
        totalReviews: providerData.totalReviews,
        bio: providerData.bio,
        profileImageUrl: providerData.profileImageUrl || `https://ui-avatars.com/api/?name=${providerData.user.userName}&size=200`,
        experienceYears: providerData.experienceYears,
        isVerified: providerData.isVerified,
        availableDays: providerData.availableDays ? providerData.availableDays.split(',') : [],
        email: providerData.user.userEmail,
        phone: providerData.user.userPhone,
      }
      
      const mockReviews = [
        {
          id: 1,
          customerName: 'Alice Brown',
          rating: 5,
          comment: 'Excellent service! Very professional and fixed the issue quickly.',
          createdAt: '2024-10-15',
        },
        {
          id: 2,
          customerName: 'Bob Wilson',
          rating: 4,
          comment: 'Good work, arrived on time and was very knowledgeable.',
          createdAt: '2024-10-10',
        },
        {
          id: 3,
          customerName: 'Carol White',
          rating: 5,
          comment: 'Highly recommend! Fair pricing and quality work.',
          createdAt: '2024-10-05',
        },
      ];

      setProvider(fetchedData);
      setReviews(mockReviews);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching provider:', error);
      setLoading(false);
    }
  };


const handleBookingSubmit = async (e) => {
  e.preventDefault();
  console.log(user);
  if (!user) {
    navigate('/login');
    return;
  }

  if (user.userType !== 'CUSTOMER') {
    alert('Only customers can book services');
    return;
  }

  const start = new Date(`${bookingData.date}T${bookingData.startTime}`);

  const bookingPayload = {
    user: { id: user.userId },
    provider: { id: provider.id },
    bookingDate: bookingData.date,
    expectedTime: bookingData.startTime,
    price: provider.hourlyRate,
    status: "PENDING",
    description: bookingData.description
  };
  console.log('Booking payload:', bookingPayload);
  try {
    const response = await api.post('/bookings/create', bookingPayload);
    console.log('Booking response:', response.data);
    alert(`Booking confirmed! Booking ID: ${response.data.id}`);
    setShowBookingModal(false);
  } catch (error) {
    console.error('Error creating booking:', error);
    alert('Failed to create booking');
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading provider details...</div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Provider not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provider Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={provider.profileImageUrl}
                alt={provider.fullName}
                className="w-32 h-32 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{provider.fullName}</h1>
                  {provider.isVerified && (
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-xl text-gray-600 mb-4">{provider.category}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-gray-900 font-semibold">
                      {provider.averageRating.toFixed(1)}
                    </span>
                    <span className="ml-1 text-gray-500">({provider.totalReviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>{provider.experienceYears} years experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{provider.bio}</p>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Reviews ({reviews.length})
            </h2>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">{review.customerName}</div>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-1">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-green-600 mb-1">
                ${provider.hourlyRate}
              </div>
              <div className="text-gray-600">per hour</div>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
            >
              Book Now
            </button>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <span>{provider.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2" />
                <span>{provider.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Service</h2>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Arrival Time</label>
                  <input
                    type="time"
                    required
                    value={bookingData.startTime}
                    onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Description
                </label>
                <textarea
                  required
                  rows="3"
                  value={bookingData.description}
                  onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                  placeholder="Describe what you need help with..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDetail;