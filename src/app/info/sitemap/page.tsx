"use client";

import React from 'react';
import { HomeIcon, UserIcon, InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const siteStructure = [
  {
    title: 'Main Pages',
    icon: <HomeIcon className="w-6 h-6 text-orange-500" />,
    links: [
      { name: 'Home', url: '/' },
      { name: 'Login', url: '/login' },
      { name: 'Register', url: '/register' },
      { name: 'Dashboard', url: '/dashboard' }
    ]
  },
  {
    title: 'Sports',
    icon: <SparklesIcon className="w-6 h-6 text-orange-500" />,
    links: [
      { name: 'Find Sports', url: '/sports' },
      { name: 'Create Game', url: '/sports/create' },
      { name: 'Join Game', url: '/sports/join' },
      { name: 'Sports Categories', url: '/sports/categories' }
    ]
  },
  {
    title: 'Account',
    icon: <UserIcon className="w-6 h-6 text-orange-500" />,
    links: [
      { name: 'Profile', url: '/account/profile' },
      { name: 'Settings', url: '/account/settings' },
      { name: 'My Games', url: '/account/games' },
      { name: 'Notifications', url: '/account/notifications' }
    ]
  },
  {
    title: 'Information',
    icon: <InformationCircleIcon className="w-6 h-6 text-orange-500" />,
    links: [
      { name: 'About Us', url: '/info/about' },
      { name: 'FAQ', url: '/info/faq' },
      { name: 'Contact', url: '/info/contact' },
      { name: 'Terms & Conditions', url: '/info/terms' },
      { name: 'Privacy Policy', url: '/info/privacy' },
      { name: 'Shipping', url: '/info/shipping' },
      { name: 'Ambassador Program', url: '/info/ambassador' },
      { name: 'Wholesale', url: '/info/wholesale' }
    ]
  }
];

export default function SitemapPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 text-center mb-6">
        Sitemap
      </h1>

      <p className="text-gray-600 mb-16 text-center max-w-2xl mx-auto">
        Find everything you need on Sports Excitement with our comprehensive sitemap.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteStructure.map((section, index) => (
          <div
            key={index}
            className="p-8 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center mb-6">
              {section.icon}
              <h2 className="text-2xl font-semibold text-gray-900 ml-3">
                {section.title}
              </h2>
            </div>

            <div className="flex flex-col space-y-4">
              {section.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  className="text-gray-600 hover:text-orange-500 hover:underline transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
