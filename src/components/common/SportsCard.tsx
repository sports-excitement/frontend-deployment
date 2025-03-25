import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

interface SportsCardProps {
  title: string;
  ageGroup: string;
  expertise: string;
  imageUrl: string;
}

const SportsCard: React.FC<SportsCardProps> = ({ title, ageGroup, expertise, imageUrl }) => {
  return (
    <div className="flex flex-col w-64 h-96 bg-white rounded-xl shadow-md overflow-hidden border border-gray-500 justify-center p-4 pb-6">
      <div className="relative flex justify-center">
        <img 
          src={imageUrl} 
          alt={`${title} activity`} 
          className="h-56 w-56 border-none rounded-md object-cover"
        />
      </div>
      <div className="pt-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 flex items-center mb-2">
          <UserIcon className="w-5 h-5 text-orange-400 mr-1" />
          {ageGroup}
        </p>
        <div className="flex-col text-start bg-gray-100 rounded-lg p-2">
          <span className="text-xs text-gray-500">Expertise</span>
          <p className="font-semibold text-gray-700">{expertise}</p>
        </div>
      </div>
    </div>
  );
};

export default SportsCard;
