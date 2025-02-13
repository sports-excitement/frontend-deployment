"use client";

import React from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center justify-between lg:space-x-8 w-full max-w-[835px] h-14 text-gray-600">
      {/* Search bar section */}
      <div className="relative flex-1 max-w-xs">
        <div className="flex items-center w-full rounded-full px-4 py-2 border border-gray-300 hover:border-gray-400 transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
          <MagnifyingGlassIcon className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search here..."
            className="ml-2 w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Navigation links */}
      <div className="hidden lg:flex items-center space-x-8">
        <div className="group relative">
          <Link href="/info/about" className="flex items-center space-x-1 py-2 text-sm font-medium hover:text-gray-900 transition-colors">
            <span>About</span>
          </Link>
        </div>

        <div className="group relative">
          <Link href="/info/faq" className="flex items-center space-x-1 py-2 text-sm font-medium hover:text-gray-900 transition-colors">
            <span>FAQ</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </Link>
        </div>

        <div className="group relative">
          <Link href="/info/contact" className="flex items-center space-x-1 py-2 text-sm font-medium hover:text-gray-900 transition-colors">
            <span>Contact</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Mobile menu button */}
      <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
        <span className="sr-only">Open menu</span>
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default Navigation;
