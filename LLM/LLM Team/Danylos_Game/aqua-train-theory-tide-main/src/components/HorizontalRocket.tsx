
import React from 'react';

interface HorizontalRocketProps {
  className?: string;
}

const HorizontalRocket: React.FC<HorizontalRocketProps> = ({ className }) => {
  return (
    <div className={`relative flex items-center ${className || ''}`}>
      {/* Эффект выхлопа (огонь) слева, так как ракета летит вправо */}
      <div className="absolute left-[-40px] top-[8px] w-[30px] h-[10px] bg-yellow-500 rounded-full animate-pulse"></div>
      
      {/* Тело ракеты */}
      <div className="relative w-[140px] h-[30px] bg-gray-800 rounded-l-full shadow-lg flex items-center">
        {/* Окно или декоративный элемент */}
        <div className="ml-5 w-[15px] h-[15px] bg-blue-400 rounded-full"></div>
        
        {/* Конус (нос) ракеты, указывающий вправо */}
        <div className="absolute top-0 right-[-20px] w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[20px] border-l-gray-800"></div>
      </div>
    </div>
  );
};

export default HorizontalRocket;
