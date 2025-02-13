import React from 'react';
import { TruckIcon, ClockIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const shippingMethods = [
  {
    title: 'Standard Shipping',
    delivery: '5-7 Business Days',
    cost: 'Free for orders over $50',
    icon: <TruckIcon className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Express Shipping',
    delivery: '2-3 Business Days',
    cost: '$15.00',
    icon: <ClockIcon className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'International Shipping',
    delivery: '7-14 Business Days',
    cost: 'Calculated at checkout',
    icon: <GlobeAltIcon className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Shipping Protection',
    delivery: 'Optional Insurance',
    cost: '$5.00',
    icon: <ShieldCheckIcon className="w-10 h-10 text-orange-500" />
  }
];

const shippingPolicies = [
  {
    title: 'Order Processing',
    content: `• Orders are processed within 24-48 hours
    • You'll receive a tracking number via email
    • Processing time excludes weekends and holidays
    • Large orders may require additional processing time`
  },
  {
    title: 'Shipping Restrictions',
    content: `• Some items may have shipping restrictions
    • Hazardous materials have special shipping requirements
    • Certain locations may have delivery limitations
    • Additional fees may apply for remote areas`
  },
  {
    title: 'Tracking & Insurance',
    content: `• All orders include tracking information
    • Insurance is available for valuable items
    • Lost packages are covered by our policy
    • Signature confirmation available upon request`
  },
  {
    title: 'Returns & Exchanges',
    content: `• 30-day return window for most items
    • Return shipping is free for defective items
    • Original packaging required for returns
    • Exchanges processed within 5 business days`
  }
];

export default function ShippingPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 text-center mb-4">
        Shipping Information
      </h1>

      <p className="text-gray-600 mb-16 text-center max-w-2xl mx-auto">
        We offer various shipping options to meet your needs. Choose the delivery speed that works best for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {shippingMethods.map((method, index) => (
          <div
            key={index}
            className="p-6 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center text-center"
          >
            <div className="mb-4">
              {method.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {method.title}
            </h3>
            <p className="text-gray-600 mb-2">
              {method.delivery}
            </p>
            <p className="text-orange-500 font-medium">
              {method.cost}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {shippingPolicies.map((policy, index) => (
          <div
            key={index}
            className="p-8 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {policy.title}
            </h3>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {policy.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-orange-50 border border-orange-200 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Need Help?
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          If you have any questions about shipping or delivery, please contact our support team at{' '}
          <a href="mailto:shipping@sportsexcitement.com" className="text-orange-500 hover:text-orange-600">
            shipping@sportsexcitement.com
          </a>
          {' '}or call us at{' '}
          <span className="text-orange-500">1-800-SPORTS-EX</span>
        </p>
      </div>
    </div>
  );
}
