"use client";

import React from 'react';
import ReviewCard from '@/components/common/ReviewCard';

interface Review {
  avatar: string;
  name: string;
  handle: string;
  rating: number;
  title: string;
  reviewText: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      avatar: 'https://i.pravatar.cc/300?img=9',
      name: 'Emily',
      handle: 'Emilunar',
      rating: 5,
      title: 'Finding my perfect yoga teacher was a dream come true!',
      reviewText: "I spent countless hours searching for a yoga teacher who aligned with my practice. This platform made the process incredibly easy and enjoyable. The search filters are amazing! I was able to narrow down my options based on style, experience, and even teacher personality. I'm so grateful to have found an instructor who's helped me deepen my practice in ways I never thought possible. This website is a yogi's best friend!"
    },
    {
      avatar: 'https://i.pravatar.cc/150?img=3',
      name: 'James',
      handle: 'jmcoach',
      rating: 5,
      title: 'This platform is a game-changer for coaches!',
      reviewText: "As a seasoned football coach, finding quality athletes can be a real challenge. This website has completely changed the game for me. The platform is incredibly user-friendly, making it a breeze to post my coaching profile and connect with potential players. I've been able to expand my roster with talented athletes from all over. It's like having a recruiting team at my fingertips!"
    },
    {
      avatar: 'https://i.pravatar.cc/300?img=5',
      name: 'Ana',
      handle: 'Anmuller',
      rating: 5,
      title: 'The perfect match for my training needs!',
      reviewText: "Finding the right coach who understands your goals and matches your training style is crucial. This platform made it so simple! The detailed profiles and review system helped me make an informed decision. My coach has been instrumental in improving my technique and pushing me to new heights. Highly recommend this platform to any athlete looking to level up their game!"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Because We Share Your Passion For Sports
          </h2>
          <p className="text-lg text-gray-600">
            Our Athletes Love Us
          </p>
        </div>

        <div className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-8 justify-items-center
          max-w-screen-xl mx-auto
        ">
          {reviews.map((review, index) => (
            <div
              key={`${review.handle}-${index}`}
              className="
                w-full max-w-sm
                transform transition-transform duration-300
                hover:-translate-y-2
              "
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
