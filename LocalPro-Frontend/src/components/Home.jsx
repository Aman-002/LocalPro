import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Clock, Wrench, GraduationCap, Home as HomeIcon, Droplet } from 'lucide-react';

const Home = () => {
  const categories = [
    { name: 'Home Repair', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
    { name: 'Tutoring', icon: GraduationCap, color: 'bg-green-100 text-green-600' },
    { name: 'Cleaning', icon: HomeIcon, color: 'bg-purple-100 text-purple-600' },
    { name: 'Plumbing', icon: Droplet, color: 'bg-red-100 text-red-600' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Easy Discovery',
      description: 'Find trusted local professionals in minutes with our smart search.',
    },
    {
      icon: Star,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from real customers to make informed decisions.',
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Book with confidence using our secure payment and booking system.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose times that work for you with real-time availability.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Local Professionals You Can Trust
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Connect with verified service providers in your area
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/providers"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition"
            >
              Find Services
            </Link>
            <Link
              to="/register"
              className="bg-blue-700 text-white hover:bg-blue-900 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white transition"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Popular Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to="/providers"
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100"
              >
                <div className={`${category.color} p-4 rounded-full mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <span className="text-lg font-semibold text-gray-900">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose LocalPro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers finding the perfect professional for their needs
          </p>
          <Link
            to="/providers"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold inline-block shadow-lg transition"
          >
            Browse Services Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;