import React, { useState, useEffect, use } from 'react';
import { Calendar, Clock, DollarSign, User, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const { user } = useAuth();
  useEffect(() => {
    fetchBookings();
  }, [user]);

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

const fetchBookings = async () => {
  if (!user) return;

  try {
    const response = await api.get(`/bookings/my-bookings?userId=${user.userId}`);
    console.log('Raw bookings:', response.data);

    const formattedBookings = response.data.map((b) => {
      const bookingDate = new Date(b.bookingTime); // bookingTime from backend
      const formattedDate = bookingDate.toLocaleDateString();
      const formattedStartTime = bookingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const providerName = b.provider.user.userName;
      const category = categories.find(c => c.id === b.provider.categoryId)?.name || 'Other';

      return {
        id: b.id,
        providerName: providerName,
        category: category,
        date: formattedDate,
        startTime: formattedStartTime,
        status: b.status,
        totalAmount: b.price,
        description: b.description
      };
    });

    setBookings(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};


  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };
    const filteredBookings = filter === 'All' 
        ? bookings 
        : bookings.filter(b => b.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your service bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap border-b border-gray-200">
          {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 text-sm font-medium transition ${
                filter === status
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">You don't have any {filter.toLowerCase()} bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {booking.providerName}
                    </h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{booking.category}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="font-semibold text-green-600">${booking.totalAmount}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-700">
                    <strong>Service:</strong> {booking.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {booking.status === 'PENDING' && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      Cancel
                    </button>
                  )}
                  {booking.status === 'CONFIRMED' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View Details
                    </button>
                  )}
                  {booking.status === 'COMPLETED' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;