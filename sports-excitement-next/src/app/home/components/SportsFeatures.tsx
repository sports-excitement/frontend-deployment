"use client";

import React from 'react';
import Link from 'next/link';
import {
  CalendarIcon,
  ClipboardDocumentIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}

interface FeatureCardProps extends Feature {
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link,
  color,
  className = ''
}) => (
  <Link
    href={link}
    className={`
      block p-6 h-64
      bg-white rounded-2xl
      shadow-sm hover:shadow-lg
      transform transition-all duration-300
      hover:-translate-y-1
      group
      ${className}
    `}
  >
    <div className="h-full flex flex-col items-center text-center gap-4">
      <div className={`
        w-12 h-12
        flex items-center justify-center
        rounded-xl
        ${color === '#FF4500' ? 'text-[#FF4500]' : 'text-[#20B486]'}
        group-hover:scale-110 transition-transform duration-300
      `}>
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </Link>
);

const SportsFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Schedule Training",
      description: "Book sessions with top coaches at your convenience",
      link: "/training",
      color: "#FF4500"
    },
    {
      icon: <ClipboardDocumentIcon className="w-8 h-8" />,
      title: "Convenient Game Scheduling",
      description: "Easy-to-use scheduling system for games and practice",
      link: "/scheduling",
      color: '#20B486'
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Nationwide Network of Coaches",
      description: "Connect with experienced coaches across the country",
      link: "/coaches",
      color: '#FF4500'
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8" />,
      title: "Social Media Forum & Platform",
      description: "Connect and share with other sports enthusiasts",
      link: "/community",
      color: '#20B486'
    },
    {
      icon: <ChatBubbleLeftIcon className="w-8 h-8" />,
      title: "Teams, Parents, Coaches Group Chat",
      description: "Stay connected with your sports community",
      link: "/chat",
      color: '#FF4500'
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Skills Development Resources",
      description: "Access training materials and improvement guides",
      link: "/resources",
      color: '#20B486'
    }
  ];

  return (
    <div className="container-default py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Discover Your Path to Athletic Excellence
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Whether you're just starting out or aiming for the pros, we have the tools and community to help you succeed.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default SportsFeatures;
