import React from 'react';

interface IconButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  cb: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, cb }) => {
  return (
    <button 
      type="button"
      className="bg-orange-200 rounded-full w-8 h-8 flex items-center justify-center text-white"
      onClick={cb}
    >
      <Icon className="w-4 h-4 text-white" />
    </button>
  );
};

export default IconButton;
