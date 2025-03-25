import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface ReviewCardProps {
  avatar: string;
  name: string;
  handle: string;
  rating: number;
  title: string;
  reviewText: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatar,
  name,
  handle,
  rating,
  title,
  reviewText
}) => {
  return (
    <div className="
      p-6 bg-white rounded-2xl shadow-lg
      w-80 max-h-fit
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
    ">
      <div className="flex items-center mb-4">
        <div className="relative w-6 md:w-12 h-6 md:h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={avatar}
            alt={`${name}'s avatar`}
            fill
            className="object-cover"
            sizes="(max-width: 48px) 100vw"
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">@{handle}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={rating} />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-700 leading-relaxed line-clamp-6">{reviewText}</p>
    </div>
  );
};

export default ReviewCard;
