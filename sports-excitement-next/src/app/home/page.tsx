import React from 'react';
import Hero from '@/components/home/Hero';
import SportsAndCategory from '@/app/home/components/SportsAndCategory';
import DiscoverAndTrain from '@/app/home/components/DiscoverAndTrain';
import SportsFeatures from '@/app/home/components/SportsFeatures';
import HowItWorks from '@/app/home/components/HowItWorks';
import IgniteAndNurture from '@/app/home/components/IgniteAndNurture';
import Reviews from '@/app/home/components/Reviews';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />

        {/* Sports and Categories */}
        <div className="relative z-10 -mt-16">
          <SportsAndCategory />
        </div>

        {/* Sports Features */}
        <SportsFeatures />

        {/* How It Works */}
        <div className="bg-gray-50">
          <HowItWorks />
        </div>

        {/* Discover and Train */}
        <DiscoverAndTrain />

        {/* Reviews */}
        <Reviews />

        {/* Ignite and Nurture */}
        <div className="bg-gray-50">
          <IgniteAndNurture />
        </div>
      </main>
      <Footer />
    </>
  );
}
