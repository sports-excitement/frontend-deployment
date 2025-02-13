"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
  UserCircleIcon,
  TrophyIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import PageLayout from '@/components/layouts/PageLayout';

interface AccordionItemProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  icon,
  title,
  description,
  content,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="
      border border-gray-200 rounded-lg overflow-hidden
      transition-shadow duration-300
      hover:shadow-md
    ">
      <button
        onClick={() => onToggle(id)}
        className="
          w-full px-6 py-4
          flex items-start gap-4
          text-left
          hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-orange-200
          transition-colors duration-200
        "
        aria-expanded={isExpanded}
      >
        <div className="mt-1 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <ChevronDownIcon 
          className={`
            w-5 h-5 text-gray-400
            transform transition-transform duration-300
            flex-shrink-0 mt-1
            ${isExpanded ? 'rotate-180' : ''}
          `}
          aria-hidden="true"
        />
      </button>
      
      <div 
        className={`
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden
        `}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
      >
        <div className="p-6 bg-gray-50">
          {content}
        </div>
      </div>
    </div>
  );
};

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
}

const HowItWorks: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const accordionItems: AccordionItem[] = [
    {
      id: 'panel1',
      icon: <UserCircleIcon className="w-6 h-6 text-[#FF4500]" />,
      title: 'Sign Up For An Account',
      description: 'Create your profile and get started in minutes',
      content: (
        <div className="flex flex-col items-start gap-4">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6VarbUY0iZ3ZtLuTg9Q74s0yrBNhYO.png"
              alt="Multiple screens showing the sign up process"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Quick and easy registration process</li>
            <li>Secure authentication options</li>
            <li>Customizable athlete profile</li>
          </ul>
        </div>
      )
    },
    {
      id: 'panel2',
      icon: <TrophyIcon className="w-6 h-6 text-[#FF4500]" />,
      title: 'Join Or Create A Match',
      description: 'Find the perfect game or start your own',
      content: (
        <div className="flex flex-col gap-4">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Browse available matches in your area</li>
            <li>Filter by sport, skill level, and location</li>
            <li>Create and manage your own games</li>
            <li>Invite players and track RSVPs</li>
          </ul>
        </div>
      )
    },
    {
      id: 'panel3',
      icon: <UserIcon className="w-6 h-6 text-[#FF4500]" />,
      title: 'Find A Coach',
      description: 'Connect with experienced mentors',
      content: (
        <div className="flex flex-col gap-4">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Browse detailed coach profiles</li>
            <li>Read reviews from other athletes</li>
            <li>Schedule trial sessions</li>
            <li>Track your progress together</li>
          </ul>
        </div>
      )
    },
    {
      id: 'panel4',
      icon: <MapPinIcon className="w-6 h-6 text-[#FF4500]" />,
      title: 'Find Games & Training Near You',
      description: 'Discover local sports activities',
      content: (
        <div className="flex flex-col gap-4">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Location-based search</li>
            <li>Real-time availability updates</li>
            <li>Facility information and amenities</li>
            <li>Weather-aware scheduling</li>
          </ul>
        </div>
      )
    },
    {
      id: 'panel5',
      icon: <CalendarIcon className="w-6 h-6 text-[#FF4500]" />,
      title: 'Schedule Training',
      description: 'Book sessions that fit your schedule',
      content: (
        <div className="flex flex-col gap-4">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Flexible scheduling options</li>
            <li>Calendar integration</li>
            <li>Automatic reminders</li>
            <li>Easy rescheduling</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <PageLayout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="
              text-4xl md:text-5xl font-bold
              bg-gradient-to-r from-[#20B486] to-[#0D8ECF] 
              bg-clip-text text-transparent
              leading-tight mb-4
            ">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Get started with Sports Excitement in a few simple steps
            </p>
            <div className="w-16 h-1 bg-[#20B486] mx-auto mt-6" />
          </div>

          <div className="flex flex-col gap-4">
            {accordionItems.map((item) => (
              <AccordionItem
                key={item.id}
                {...item}
                isExpanded={expanded === item.id}
                onToggle={handleChange}
              />
            ))}
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default HowItWorks;
