import React, { useState } from 'react';

interface ToggleProps<T extends string> {
  options: T[];
  onToggle: (option: T) => void;
  width?: string;
  height?: string;
}

function Toggle<T extends string>({ 
  options = [], 
  onToggle, 
  width = '349px', 
  height = '50px' 
}: ToggleProps<T>): React.ReactElement {
  const [selectedOption, setSelectedOption] = useState<T>(options[0]);

  const handleToggle = (newOption: T) => {
    setSelectedOption(newOption);
    if (onToggle) {
      onToggle(newOption);
    }
  };

  return (
    <div 
      className="relative bg-white border border-gray-300 rounded-full"
      style={{ width, height }}
    >
      {/* Moving Background */}
      <div
        className="absolute top-0 left-0 h-full bg-orange-200 rounded-full transition-all duration-300"
        style={{
          width: `${100 / options.length}%`,
          transform: `translateX(${options.indexOf(selectedOption) * 100}%)`
        }}
      />

      {/* Options */}
      <div className="relative flex h-full">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleToggle(option)}
            className={`
              flex-1 h-full
              flex items-center justify-center
              text-sm font-medium
              transition-colors duration-300
              z-10
              ${selectedOption === option ? 'text-white' : 'text-gray-600'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Toggle;
