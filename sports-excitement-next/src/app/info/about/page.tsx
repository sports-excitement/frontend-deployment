import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Sports Excitement
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Your premier destination for sports merchandise and fan gear
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide sports enthusiasts with high-quality merchandise while creating an engaging community of fans.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600">
                Quality, authenticity, and customer satisfaction are at the heart of everything we do.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Promise</h2>
              <p className="text-gray-600">
                We're here to help you succeed in finding the perfect sports merchandise for your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded by passionate sports fans, Sports Excitement has grown from a small online store to a leading destination for sports merchandise.
          </p>
          <p className="text-gray-600">
            We take pride in offering a carefully curated selection of products that represent the spirit and passion of sports fans worldwide.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-600">
            Become part of our growing community of sports enthusiasts and get access to exclusive deals and content.
          </p>
          <button className="mt-8 bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
