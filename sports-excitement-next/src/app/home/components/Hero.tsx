"use client";

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <div className="flex items-center gap-1">
    <CheckIcon className="w-5 h-5 text-[#20B486]" />
    <span className="text-[#374151] text-base font-normal">
      {text}
    </span>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-off-white overflow-hidden">
      <div className="container mx-auto max-w-7xl min-h-[calc(100vh-4rem)] flex items-center pt-4 pb-16">
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="hero-content w-full md:w-1/2 z-10 flex flex-col justify-center space-y-6 px-6 md:px-8 lg:px-12">
            <h1 className="text-[2.5rem] md:text-[3.5rem] leading-tight font-semibold text-[#111827] mb-2">
              Unleash & Conquer
              <span className="block">
                Your Inner <span className="text-[#20B486]">Athlete</span>
              </span>
              <span className="block">
                Potential.
              </span>
            </h1>
            <p className="mb-3 text-base leading-relaxed text-[#4B5563] max-w-full sm:max-w-[90%] mx-auto sm:mx-0">
              Find your perfect coach, build your skills, & master your game with the best professionals in their field, or create your own pick-up games.
            </p>
            <div className="hero-features flex flex-wrap gap-4 mb-4">
              <FeatureItem text="Youth Sports" />
              <FeatureItem text="Adult Sports" />
              <FeatureItem text="Coaching" />
            </div>
            <div className="hero-button-container">
              <button className="bg-[#FF4500] hover:bg-[#E03E00] text-white px-6 py-3 rounded-full text-base font-medium transition-colors">
                Start Your Training Today
              </button>
            </div>
          </div>
          <div className="hero-image w-full md:w-1/2 relative hidden md:block">
            <div className="absolute -top-[20%] -right-[20%] w-[140%] h-[140%] bg-gradient-to-br from-[#FFE4E6] to-[#FFF1F2] opacity-70 -z-10 rounded-full" />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FHeroImage.svg?alt=media&token=58ee1d7c-6601-40ad-8755-ca3164b13bd1"
              alt="Sports Training"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
