import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200">
      <div
        className="h-full bg-[#ff6699] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
      <div className="absolute top-2 right-2 text-sm text-gray-600">
        {current}/{total}
      </div>
    </div>
  );
};

export default ProgressBar; 