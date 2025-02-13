import React from 'react';

export interface PrimaryButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  text, 
  className = '', 
  disabled = false,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        bg-primary text-white 
        rounded-full 
        font-medium 
        transition-all duration-200
        hover:bg-primary-dark
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
