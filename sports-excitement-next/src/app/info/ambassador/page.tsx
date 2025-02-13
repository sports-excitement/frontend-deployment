import React from 'react';
import { UserGroupIcon, TrophyIcon, HeartIcon } from '@heroicons/react/24/outline';

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: 'Community',
    description: 'Connect with fellow sports enthusiasts and share your passion for the game'
  },
  {
    icon: <TrophyIcon className="h-6 w-6" />,
    title: 'Rewards',
    description: 'Earn exclusive rewards, discounts, and special access to new products'
  },
  {
    icon: <HeartIcon className="h-6 w-6" />,
    title: 'Impact',
    description: 'Make a difference in the sports community and inspire others'
  }
];

const AmbassadorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Sports Excitement Ambassador Program
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Join our community of passionate sports enthusiasts and help spread the excitement
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white mb-4">
                  {benefit.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h2>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• Early access to new products</li>
                <li>• Exclusive ambassador discounts</li>
                <li>• Commission on referral sales</li>
                <li>• Monthly ambassador challenges</li>
                <li>• Special event invitations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• Active social media presence</li>
                <li>• Passion for sports</li>
                <li>• Regular engagement with our brand</li>
                <li>• Content creation abilities</li>
                <li>• Positive community influence</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Apply now to become a Sports Excitement Ambassador and start your journey with us
          </p>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorPage;
