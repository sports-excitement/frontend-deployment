import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const contactMethods = [
  {
    title: 'Email Us',
    description: 'Our team will respond within 24 hours',
    icon: <EnvelopeIcon className="w-6 h-6 text-orange-500" />,
    detail: 'support@sportsexcitement.com'
  },
  {
    title: 'Call Us',
    description: 'Mon-Fri from 9am to 6pm EST',
    icon: <PhoneIcon className="w-6 h-6 text-orange-500" />,
    detail: '1-800-SPORTS-EX'
  },
  {
    title: 'Visit Us',
    description: 'Come say hello at our office',
    icon: <MapPinIcon className="w-6 h-6 text-orange-500" />,
    detail: '123 Sports Street, New York, NY 10001'
  }
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 text-center mb-4">
          Contact Us
        </h1>
        
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help! Choose your preferred method of contact below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
                {method.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {method.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {method.description}
              </p>
              <p className="text-orange-500 font-medium">
                {method.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Send us a Message
          </h2>
          
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
