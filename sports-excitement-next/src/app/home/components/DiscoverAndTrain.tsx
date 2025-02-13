"use client";

import React from 'react';
import { 
  ChartBarIcon, 
  CheckCircleIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import PrimaryButton from '@/components/common/PrimaryButton';
import PageLayout from '@/components/layouts/PageLayout';

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

interface DiscoverAndTrainProps {}

const DiscoverAndTrain: React.FC<DiscoverAndTrainProps> = () => {
  const features = [
    'Customized training sessions, with coaches specializing in various sports and disciplines.',
    'Choose from in-person, online, or hybrid training options to fit your schedule.',
    'Connect with like-minded athletes and coaches in a supportive and inspiring environment.'
  ];

  const stats = [
    {
      percentage: 29,
      label: 'Strength & Power performance increased'
    },
    {
      percentage: 23,
      label: 'Endurance & Resistance increased'
    },
    {
      percentage: 19,
      label: 'Improved technique within few months'
    },
    {
      percentage: 33,
      label: 'Recovery time decreased',
      icon: <ClockIcon className="w-6 h-6 text-[#FF4500]" />
    }
  ];

  return (
    <div className="py-6">
      <PageLayout>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <div className="mb-8 text-center md:text-left max-w-[500px] md:max-w-none">
              <h2 className="text-2xl font-bold mb-6">
                Discover & Train With Our Top Tier Coaches
              </h2>

              <div className="flex flex-col gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 justify-center md:justify-start"
                  >
                    <CheckCircleIcon className="w-5 h-5 text-[#20B486] mt-1" />
                    <p className="text-gray-600 text-center md:text-left">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <PrimaryButton 
              text="Start Today" 
              className="w-full md:w-auto py-2 mb-8 md:mb-0"
            />
          </div>

          {/* Stats Section */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className={`min-h-[100px] ${index % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <StatCard {...stat} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default DiscoverAndTrain;
