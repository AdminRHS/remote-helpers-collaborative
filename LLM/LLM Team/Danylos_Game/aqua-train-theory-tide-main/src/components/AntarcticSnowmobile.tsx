
import React from 'react';

interface AntarcticSnowmobileProps {
  className?: string;
}

const AntarcticSnowmobile: React.FC<AntarcticSnowmobileProps> = ({ className }) => {
  return (
    <div className={`relative ${className || ''}`}>
      {/* Снегоход - основное тело (трак) */}
      <div className="relative w-[140px] h-[30px] bg-white rounded-full shadow-lg border border-gray-300">
        {/* Кабина двигателя */}
        <div className="absolute top-[-20px] left-[45px] w-[50px] h-[25px] bg-slate-700 rounded-t-full"></div>
        {/* Дизайнерская полоса */}
        <div className="absolute top-[10px] left-[10px] w-[120px] h-[4px] bg-blue-400"></div>
        {/* Деталь трека */}
        <div className="absolute bottom-[-6px] left-0 w-full h-[6px] bg-gray-500 rounded-b-full"></div>
      </div>
      
      {/* Передние лыжи */}
      <div className="absolute top-[30px] left-[20px] w-[10px] h-[40px] bg-gray-600 rounded-full"></div>
      <div className="absolute top-[30px] left-[40px] w-[10px] h-[40px] bg-gray-600 rounded-full"></div>
      
      {/* Эффект антарктической пыли (снег) */}
      <div className="absolute top-[-10px] right-[-10px] w-[20px] h-[20px] bg-amber-200 opacity-70 rounded-full"></div>
    </div>
  );
};

export default AntarcticSnowmobile;
