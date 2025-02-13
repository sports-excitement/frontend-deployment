"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/Logo.png';

interface FooterLink {
  name: string;
  path: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.FC<React.ComponentProps<'svg'>>;
  url: string;
  label: string;
}

const socialIcons = {
  Facebook: (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  ),
  Instagram: (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  LinkedIn: (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
};

const FooterLinkSection: React.FC<{
  title: string;
  links: FooterLink[];
}> = ({ title, links }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
    <h3 className="font-bold text-gray-900 mb-6 relative">
      {title}
      <span className="absolute bottom-[-8px] left-0 w-10 h-0.5 bg-[#FF4500] opacity-70" />
    </h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.path}
            className="text-gray-600 hover:text-[#FF4500] transition-colors duration-200"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialButton: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      p-2 text-gray-600 bg-white rounded-full
      shadow-sm hover:text-[#FF4500] hover:-translate-y-1
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-orange-200
    "
    aria-label={label}
  >
    {children}
  </a>
);

const Footer: React.FC = () => {
  const footerLinks: Record<string, FooterSection> = {
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/info/about' },
        { name: 'FAQ', path: '/info/faq' },
        { name: 'Contact', path: '/info/contact' },
        { name: 'Sitemap', path: '/info/sitemap' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/info/help' },
        { name: 'Safety', path: '/info/safety' },
        { name: 'Community', path: '/info/community' },
        { name: 'Wholesale', path: '/info/wholesale' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/info/privacy' },
        { name: 'Terms of Service', path: '/info/terms' },
        { name: 'Shipping', path: '/info/shipping' },
        { name: 'Ambassador Program', path: '/info/ambassador' }
      ]
    }
  };

  const socialLinks: SocialLink[] = [
    { icon: socialIcons.Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: socialIcons.Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: socialIcons.Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: socialIcons.LinkedIn, url: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-50 py-12 md:py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src={Logo}
                alt="Sports Excitement"
                className="h-10 w-auto"
                width={160}
                height={40}
                priority
              />
            </Link>
            <p className="text-gray-600 max-w-sm leading-relaxed">
              Connecting athletes with coaches and creating opportunities for sports enthusiasts to grow and excel.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <SocialButton
                    key={index}
                    href={social.url}
                    label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </SocialButton>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([key, section]) => (
                <FooterLinkSection
                  key={key}
                  title={section.title}
                  links={section.links}
                />
              ))}
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600">
            {new Date().getFullYear()} Sports Excitement. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <Link
              href="/info/privacy"
              className="text-sm text-gray-600 hover:text-[#FF4500] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/info/terms"
              className="text-sm text-gray-600 hover:text-[#FF4500] transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
