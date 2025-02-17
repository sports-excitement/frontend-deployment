"use client";

import React from 'react';
import { 
  ChartBarIcon, 
  CheckCircleIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import PrimaryButton from '@/components/common/PrimaryButton';

interface StatCardProps {
  percentage: number;
  label: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ percentage, label, icon }) => {
  return (
    <div className="
      p-6 h-32 bg-gray-50 rounded-lg
      flex flex-col justify-between
      transition-all duration-200 ease-in-out
      hover:bg-gray-100 hover:-translate-y-1
      shadow-sm hover:shadow-md
    ">
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold">{percentage}%</span>
        {icon || <ChartBarIcon className="w-6 h-6 text-[#FF4500]" />}
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">
        {label}
      </p>
    </div>
  );
};

const DiscoverAndTrain: React.FC = () => {
  const features = [
    'Customized training sessions, with coaches specializing in various sports and disciplines.',
    'Choose from in-person, online, or hybrid training options to fit your schedule.',
    'Connect with like-minded athletes and coaches in a supportive and inspiring environment.'
  ];

  const stats = [
    {
      percentage: 29,
      label: 'Strength & Power performance increased',
      icon: <ChartBarIcon className="w-6 h-6 text-[#FF4500]" />
    },
    {
      percentage: 85,
      label: 'Athletes achieved their fitness goals',
      icon: <CheckCircleIcon className="w-6 h-6 text-[#20B486]" />
    },
    {
      percentage: 92,
      label: 'Training sessions completed on schedule',
      icon: <ClockIcon className="w-6 h-6 text-[#FF4500]" />
    },
    {
      percentage: 23,
      label: 'Endurance & Resistance improved',
      icon: <ChartBarIcon className="w-6 h-6 text-[#20B486]" />
    }
  ];

  return (
    <div className="container-default py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover & Train with Expert Coaches
            </h2>
            <p className="text-gray-600 mb-6">
              Take your athletic journey to the next level with personalized training from experienced coaches.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-[#20B486] flex-shrink-0 mt-1" />
                <p className="text-gray-600">{feature}</p>
              </div>
            ))}
          </div>

          <PrimaryButton text="Start Training Now" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverAndTrain;
