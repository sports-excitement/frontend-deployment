import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ImagePlaceholderProps {
  width?: string;
  height?: string;
  text?: string;
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = '100%',
  height = '300px',
  text = 'Image Placeholder',
  className = ''
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        bg-gray-100 border-2 border-dashed border-gray-300
        rounded-lg
        ${className}
      `}
      style={{ width, height }}
      role="img"
      aria-label={text}
    >
      <PhotoIcon className="w-16 h-16 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">
        {text}
      </p>
    </div>
  );
};
