
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface SpaceCompletionMessageProps {
  onClose: () => void;
  onProceed: () => void;
}

const SpaceCompletionMessage: React.FC<SpaceCompletionMessageProps> = ({ onClose, onProceed }) => {
  const [fireworks, setFireworks] = useState<{left: string; top: string; animationDelay: string; color: string}[]>([]);

  useEffect(() => {
    // Generate random fireworks
    const colors = ['#FF5252', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
    const newFireworks = [];

    for (let i = 0; i < 15; i++) {
      newFireworks.push({
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 50 + 5}%`,
        animationDelay: `${Math.random() * 2}s`,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    setFireworks(newFireworks);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#2E1052] to-[#4A148C] text-white rounded-lg shadow-xl p-8 max-w-xl w-full animate-scale-in relative">
      {/* Fireworks */}
      {fireworks.map((firework, index) => (
        <div 
          key={index} 
          className="absolute"
          style={{
            left: firework.left,
            top: firework.top,
            animationDelay: firework.animationDelay
          }}
        >
          <div className="relative">
            {[...Array(8)].map((_, i) => (
              <div 
                key={`spark-${i}-${index}`} 
                className="absolute w-1 h-12 origin-bottom animate-pulse"
                style={{
                  background: `linear-gradient(to top, ${firework.color}, transparent)`,
                  transform: `rotate(${i * 45}deg)`,
                  opacity: 0.7,
                  animation: 'pulse 1.5s infinite'
                }}
              />
            ))}
          </div>
        </div>
      ))}
      
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Star key={i} size={40} className="text-yellow-300 fill-yellow-300 animate-float" style={{animationDelay: `${i * 0.2}s`}} />
          ))}
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-4">Congratulations!</h2>
      <p className="text-xl text-center mb-8">
        You have completed the AI learning journey!
      </p>
      
      <div className="flex justify-center mt-8 gap-4">
        <button 
          onClick={onProceed}
          className="bg-[#7E57C2] hover:bg-[#5E35B1] text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105"
        >
          Return to Start
        </button>
      </div>
    </div>
  );
};

export default SpaceCompletionMessage;
