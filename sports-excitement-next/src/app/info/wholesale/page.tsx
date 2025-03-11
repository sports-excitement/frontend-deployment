"use client";

import React from 'react';
import { CubeIcon, TruckIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

const benefits = [
  {
    title: 'Bulk Pricing',
    description: 'Get competitive wholesale prices on our entire product range. The more you order, the more you save.',
    icon: <CubeIcon className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Priority Shipping',
    description: 'Dedicated shipping solutions for wholesale orders with tracking and insurance included.',
    icon: <TruckIcon className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Dedicated Support',
    description: 'Personal account manager and priority customer support for all wholesale partners.',
    icon: <UserIcon className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Special Offers',
    description: 'Access to exclusive deals, seasonal discounts, and early product releases.',
    icon: <TagIcon className="w-10 h-10 text-orange-500" />
  }
];

export default function WholesalePage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 text-center mb-4">
        Wholesale Partnership
      </h1>

      <p className="text-gray-600 mb-16 text-center max-w-2xl mx-auto">
        Join our wholesale program and become a partner in bringing quality sports equipment and experiences to more communities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-8 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center text-center"
          >
            {benefit.icon}
            <h3 className="text-2xl font-semibold text-gray-900 mt-4 mb-4">
              {benefit.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Apply for Wholesale Account
        </h2>

        <form className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="business-name"
                name="business-name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="tax-id" className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID/Business Number
              </label>
              <input
                type="text"
                id="tax-id"
                name="tax-id"
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Business Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={2}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              Tell us about your business
            </label>
            <textarea
              id="about"
              name="about"
              rows={4}
              required
              placeholder="Include information about your current operations, target market, and estimated monthly order volume"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
