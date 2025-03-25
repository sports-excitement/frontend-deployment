"use client";

import React from 'react';
import Hero from '@/components/homepage/Hero';
import SportsAndCategory from '@/components/homepage/SportsAndCategory';
import DiscoverAndTrain from '@/components/homepage/DiscoverAndTrain';
import SportsFeatures from '@/components/homepage/SportsFeatures';
import HowItWorks from '@/components/homepage/HowItWorks';
import IgniteAndNurture from '@/components/homepage/IgniteAndNurture';
import Reviews from '@/components/homepage/Reviews';
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
        <SportsAndCategory />

        {/* Sports Features */}
        <SportsFeatures />

        {/* How It Works */}
        <HowItWorks />

        {/* Discover and Train */}
        <DiscoverAndTrain />

        {/* Reviews */}
        <Reviews />

        {/* Ignite and Nurture */}
        <IgniteAndNurture />
      </main>
      <Footer />
    </>
  );
}
