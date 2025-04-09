
import React from 'react';
import { CarFront } from 'lucide-react';

interface DesertCarProps {
  className?: string;
}

const DesertCar: React.FC<DesertCarProps> = ({ className }) => {
  return (
    <div className={`relative ${className || ''}`}>
      {/* Car body */}
      <div className="relative w-[100px] h-[40px] bg-red-600 rounded-lg shadow-lg">
        {/* Car roof */}
        <div className="absolute top-[-15px] left-[25px] w-[50px] h-[15px] bg-red-700 rounded-t-lg"></div>
        
        {/* Windows */}
        <div className="absolute top-[-12px] left-[30px] w-[40px] h-[12px] bg-blue-300 opacity-70 rounded-t"></div>
        
        {/* Headlights */}
        <div className="absolute top-[10px] left-[0px] w-[5px] h-[8px] bg-yellow-300 rounded-l"></div>
        <div className="absolute top-[10px] right-[0px] w-[5px] h-[8px] bg-red-300 rounded-r"></div>
        
        {/* Wheels */}
        <div className="absolute bottom-[-8px] left-[15px] w-[16px] h-[16px] bg-gray-800 rounded-full border-2 border-gray-300"></div>
        <div className="absolute bottom-[-8px] right-[15px] w-[16px] h-[16px] bg-gray-800 rounded-full border-2 border-gray-300"></div>
        
        {/* Racing stripes */}
        <div className="absolute top-[5px] left-[30px] w-[40px] h-[3px] bg-white"></div>
        <div className="absolute top-[15px] left-[30px] w-[40px] h-[3px] bg-white"></div>
        
        {/* Spoiler */}
        <div className="absolute top-[-5px] right-[10px] w-[15px] h-[8px] bg-red-800 rounded-t"></div>
        
        {/* Desert dust effect */}
        <div className="absolute bottom-[-5px] left-[-10px] w-[20px] h-[5px] bg-amber-200 opacity-70 rounded-full"></div>
      </div>
    </div>
  );
};

export default DesertCar;
