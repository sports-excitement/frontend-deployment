"use client"

import React, { useState } from 'react';
import SportsCard from '@/components/common/SportsCard';
import Toggle from '@/components/common/Toggle';
import PrimaryButton from '@/components/common/PrimaryButton';

interface SportCardData {
  title: string;
  ageGroup: string;
  expertise: string;
  imageUrl: string;
}

type Category = 'Youth' | 'Adults';

const SportsAndCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Youth');

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const youthData: SportCardData[] = [
    {
      title: "Soccer",
      ageGroup: "U4-U19 Age Groups",
      expertise: "Beginner - Advanced",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2Fteenager-in-soccer-match.png?alt=media&token=7a1a4a97-ce10-436f-8570-e7591c347d47",
    },
    {
      title: "Basketball",
      ageGroup: "U6-U18 Age Groups",
      expertise: "Intermediate",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2Fdiverse-teenagers-practicing-health-wellness-activities-themselves-their-community%203.png?alt=media&token=1e622cf2-a23c-4de6-8bc2-ac89f59814a1",
    },
    {
      title: "Baseball",
      ageGroup: "U6-U18 Age Groups",
      expertise: "Intermediate",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FDreaming%20Rookie%20at%20Sunset%201.png?alt=media&token=df3f11b0-7d3d-4020-9afc-c35f7fb2570e",
    },
    {
      title: "Football",
      ageGroup: "U6-U18 Age Groups",
      expertise: "Intermediate",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FContemplative%20Athlete%20at%20Twilight%201.png?alt=media&token=c93e91a4-d3c4-45b6-9039-1a7b9e14a254",
    },
  ];
  
  const adultData: SportCardData[] = [
    {
      title: "Wall Climbing",
      ageGroup: "Customized to your age",
      expertise: "Beginner - Advanced",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FPicture%20Container%20(2).svg?alt=media&token=e3acfb70-5e51-4d07-8a43-2e9a5ed40ddf",
    },
    {
      title: "Outdoor Fitness",
      ageGroup: "Customized to your age",
      expertise: "Beginner - Advanced",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FPicture%20Container%20(3).svg?alt=media&token=b0a9fa72-e9ef-4cd4-86f4-858a92f9b797",
    },
    {
      title: "Martial Arts",
      ageGroup: "Customized to your age",
      expertise: "Beginner - Advanced",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FPicture%20Container%20(4).svg?alt=media&token=686839d9-609a-494c-a132-14b1078b4ddc",
    },
    {
      title: "Baseball",
      ageGroup: "Customized to your age",
      expertise: "Beginner - Advanced",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/sportsexcitement-assets/o/Images%2FLanding%20Page%2FPicture%20Container%20(5).svg?alt=media&token=04f07f67-0763-4000-a179-1732c10855e4",
    },
  ];

  return (
    <div className="container-default py-6">
      <div className="text-center mb-6">
        <h2 className="font-bold text-4xl text-black mb-2">
          Our Most Popular Sports & Categories
        </h2>
        <p className="text-gray-500 font-light">
          Get ready to discover and dive into your favorite sports, discover a world of athletic possibilities tailored to your interests.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-center mb-6">
          <Toggle<Category>
            options={['Youth', 'Adults']}
            onToggle={handleCategoryChange}
          />
        </div>

        {/* Scrollable Cards Container */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#20B486] hover:scrollbar-thumb-[#1A9370] scrollbar-thumb-rounded scrollbar-track-rounded">
              <div className="flex gap-3 py-2 w-max">
                {(selectedCategory === "Youth" ? youthData : adultData).map((card, index) => (
                  <div key={index} className="w-[300px] flex-shrink-0">
                    <SportsCard
                      title={card.title}
                      ageGroup={card.ageGroup}
                      expertise={card.expertise}
                      imageUrl={card.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <PrimaryButton text="Explore all" />
        </div>
      </div>
    </div>
  );
};

export default SportsAndCategory;
