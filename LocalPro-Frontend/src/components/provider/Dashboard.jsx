import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
    totalEarnings: 2450,
    pendingBookings: 3,
    completedBookings: 24,
    averageRating: 4.8,
    });

    const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

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


  const fetchDashboardData = async () => {
    if (!user) return;
    try {
        const response = await api.get(`/bookings/my-requests?userId=${user.userId}`);
        console.log('Raw bookings:', response.data);
        const formattedBookings = response.data.map((b) => {
        const bookingDate = new Date(b.bookingTime);
        const formattedDate = bookingDate.toLocaleDateString();
        const formattedStartTime = bookingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const customerName = b.user.userName;
        const category = categories.find(c => c.id === b.provider.categoryId)?.name || 'Other';

        return {
            id: b.id,
            customerName: customerName,
            category: category,
            date: formattedDate,
            startTime: formattedStartTime,
            status: b.status,
            amount: b.price,
            description: b.description
        };
        });
    setRecentBookings(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
  };

  const handleAcceptBooking = async (bookingId) => {
  try {
    const response = await api.post('/bookings/accept', {
      id: bookingId,
      status: 'Confirmed'
    });
    alert('Booking accepted!');
    
    fetchDashboardData();
  } catch (error) {
    alert('Failed to accept booking');
  }
};

  const handleDeclineBooking = async (bookingId) => {
   try {
    const response = await api.post('/bookings/cancel', {
      id: bookingId,
      status: 'Cancelled'
    });
    alert('Booking Cancelled!');
    
    fetchDashboardData();
  } catch (error) {
    alert('Failed to Cancel booking');
  }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Confirmed: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
        <p className="text-gray-600">Manage your bookings and track your performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Awaiting your response</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">This month: 8 jobs</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-purple-600 fill-current" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Based on 24 reviews</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Booking Requests</h2>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600">New booking requests will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.customerName}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(booking.date).toLocaleDateString()} at {booking.startTime}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="font-semibold text-green-600">${booking.amount}</span>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-700">
                      <strong>Service:</strong> {booking.description}
                    </p>
                  </div>

                  {booking.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeclineBooking(booking.id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleAcceptBooking(booking.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Accept
                      </button>
                    </div>
                  )}

                  {booking.status === 'Confirmed' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;