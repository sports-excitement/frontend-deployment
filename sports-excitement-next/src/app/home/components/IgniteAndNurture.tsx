"use client";

import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import PrimaryButton from '@/components/common/PrimaryButton';

interface Feature {
  text: string;
}

const FeatureItem: React.FC<Feature> = ({ text }) => (
  <li className="flex items-start gap-2 py-2">
    <CheckBadgeIcon className="w-5 h-5 text-[#20B486] flex-shrink-0 mt-1" />
    <p className="text-gray-600 font-light leading-relaxed">
      {text}
    </p>
  </li>
);

const IgniteAndNurture: React.FC = () => {
  const features: Feature[] = [
    {
      text: 'Provide opportunities for young athletes to compete at various levels and showcase their talents.'
    },
    {
      text: 'Offer specialized training programs designed for young athletes of all ages and skill levels.'
    },
    {
      text: 'Focus on building not only athletic skills but also character, teamwork, and sportsmanship.'
    }
  ];

  return (
    <div className="container-default py-16">
      <div className="flex flex-col sm:flex-row items-center gap-8 px-6 sm:px-8 lg:px-0">
        {/* Left section - Image */}
        <div className="hidden sm:flex sm:w-1/2 justify-center items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FYouth%20%26%20Adults%20Sports%20Image%20%2B%20bg.png?alt=media&token=7ca7ad8d-9226-4a4f-915d-a9a3d4e86fe3"
            alt="Athletes"
            className="w-[400px] h-[400px] rounded-[60%] object-cover"
          />
        </div>

        {/* Right section - Content */}
        <div className="w-full sm:w-1/2 text-center sm:text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            Ignite & Nurture Young Athletes' Passion
          </h2>
          
          <p className="text-gray-500 font-light">
            Teach, Train & Build Them.
          </p>

          <ul className="space-y-4">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </ul>

          <div>
            <PrimaryButton text="Coach Them Today" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IgniteAndNurture;
