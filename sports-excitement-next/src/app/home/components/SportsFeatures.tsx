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
import PageLayout from '@/components/layouts/PageLayout';

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
      icon: <CalendarIcon className="w-8 h-8" />,
      title: "Personalized Training Plans",
      description: "Custom training schedules tailored to your needs",
      link: "/training-plans",
      color: '#FF4500'
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
    <section className="py-16 bg-gray-50">
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="
              text-3xl md:text-4xl font-bold text-gray-900
              inline-block relative
              after:content-['']
              after:absolute after:-bottom-4 after:right-0
              after:w-24 after:h-1 after:bg-[#20B486]
              after:transform after:-rotate-2
            ">
              What Sports Excitement Offers
            </h2>
          </div>

          <div className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-8
          ">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
              />
            ))}
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default SportsFeatures;
