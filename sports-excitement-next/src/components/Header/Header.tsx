"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '@/assets/Logo.png';

interface NavItem {
  name: string;
  path: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, mobile = false, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        ${mobile ? 'block w-full px-4 py-2' : 'inline-flex items-center px-3 py-2'}
        ${isActive ? 'text-[#FF4500]' : 'text-gray-700'}
        text-sm font-medium rounded-md
        transition-colors duration-200
        hover:text-[#FF4500] hover:bg-orange-50
      `}
    >
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pages: NavItem[] = [
    { name: 'Home', path: '/home' },
    { name: 'Info', path: '/info' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={Logo}
              alt="Sports Excitement"
              className="h-8 md:h-10 w-auto"
              width={238}
              height={86}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {pages.map((page) => (
              <NavLink key={page.name} href={page.path}>
                {page.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              type="button"
              className="
                inline-flex items-center px-4 py-2
                text-sm font-medium text-gray-700
                border border-gray-300 rounded-full
                hover:text-[#FF4500] hover:border-[#FF4500]
                focus:outline-none focus:ring-2 focus:ring-orange-200
                transition-colors duration-200
              "
            >
              Sign In
            </button>
            <button
              type="button"
              className="
                inline-flex items-center px-4 py-2
                text-sm font-medium text-white
                bg-[#FF4500] rounded-full
                hover:bg-[#ff5719]
                focus:outline-none focus:ring-2 focus:ring-orange-400
                transition-colors duration-200
              "
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="
                inline-flex items-center justify-center p-2
                text-gray-700 rounded-md
                hover:text-[#FF4500] hover:bg-orange-50
                focus:outline-none focus:ring-2 focus:ring-orange-200
              "
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`
          fixed inset-y-0 right-0 w-full max-w-sm bg-white
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              type="button"
              className="
                p-2 text-gray-700 rounded-md
                hover:text-[#FF4500] hover:bg-orange-50
                focus:outline-none focus:ring-2 focus:ring-orange-200
              "
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1">
              {pages.map((page) => (
                <NavLink
                  key={page.name}
                  href={page.path}
                  mobile
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {page.name}
                </NavLink>
              ))}
            </div>
            <div className="mt-6 px-4 space-y-4">
              <button
                type="button"
                className="
                  w-full px-4 py-2
                  text-sm font-medium text-gray-700
                  border border-gray-300 rounded-full
                  hover:text-[#FF4500] hover:border-[#FF4500]
                  focus:outline-none focus:ring-2 focus:ring-orange-200
                  transition-colors duration-200
                "
              >
                Sign In
              </button>
              <button
                type="button"
                className="
                  w-full px-4 py-2
                  text-sm font-medium text-white
                  bg-[#FF4500] rounded-full
                  hover:bg-[#ff5719]
                  focus:outline-none focus:ring-2 focus:ring-orange-400
                  transition-colors duration-200
                "
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
