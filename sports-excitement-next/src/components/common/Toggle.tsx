import React, { useState } from 'react';

interface ToggleProps {
  options: string[];
  onToggle: (option: string) => void;
  width?: string;
  height?: string;
}

const Toggle: React.FC<ToggleProps> = ({ 
  options = [], 
  onToggle, 
  width = '349px', 
  height = '50px' 
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleToggle = (newOption: string) => {
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
        className="absolute top-[10%] bg-orange-200 rounded-full transition-all duration-300"
        style={{
          width: `calc(${width} / ${options.length} - 10px)`,
          height: '80%',
          left: `${(options.indexOf(selectedOption) / options.length) * 100}%`,
          transform: `translateX(${options.indexOf(selectedOption) === 0 ? '5px' : '0'})`,
        }}
      />
      
      {/* Toggle Options */}
      <div className="flex justify-between w-full h-full relative">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleToggle(option)}
            className={`
              flex-1 flex items-center justify-center rounded-2xl transition-all duration-300
              hover:bg-transparent focus:outline-none
              ${selectedOption === option ? 'text-white' : 'text-gray-500'}
              relative z-10
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
