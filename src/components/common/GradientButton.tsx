import React from 'react';
import './common.css';

interface GradientButtonProps {
  text: string;
  cb: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ text, cb }) => {
  return (
    <button type="button" className="gradient-border-btn" onClick={cb}>
      {text}
    </button>
  );
};

export default GradientButton;
