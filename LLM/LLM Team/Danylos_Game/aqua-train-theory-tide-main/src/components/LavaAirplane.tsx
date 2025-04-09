
import React from 'react';

interface LavaAirplaneProps {
  className?: string;
}

const LavaAirplane: React.FC<LavaAirplaneProps> = ({ className }) => {
  return (
    <div className={`relative ${className || ''}`}>
      {/* Левитирующий теплый самолет */}
      <div className="relative w-[160px] h-[50px] bg-orange-600 rounded-lg shadow-xl">
        {/* Кабина */}
        <div className="absolute top-[-20px] left-[60px] w-[40px] h-[25px] bg-yellow-400 rounded-t-lg"></div>
        {/* Крылья */}
        <div className="absolute top-[15px] left-[-40px] w-[60px] h-[10px] bg-red-500 rounded-full"></div>
        <div className="absolute top-[15px] right-[-40px] w-[60px] h-[10px] bg-red-500 rounded-full"></div>
        {/* Двигатели с пламенем для теплого эффекта */}
        <div className="absolute bottom-[-15px] left-[70px] w-[20px] h-[15px] bg-red-300 rounded-b-lg"></div>
        {/* Эффект левитации */}
        <div className="absolute top-[60px] left-[70px] w-[20px] h-[5px] bg-yellow-300 opacity-80 rounded-full animate-pulse"></div>
      </div>
      
      {/* Лава - поверхность под транспортом */}
      <div className="absolute bottom-[-30px] left-0 w-full h-[30px] bg-red-800"></div>
    </div>
  );
};

export default LavaAirplane;
