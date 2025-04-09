
import React from "react";
import { Star } from "lucide-react";

interface AntarcticCompletionMessageProps {
  onClose: () => void;
  onProceed: () => void;
}

const AntarcticCompletionMessage: React.FC<AntarcticCompletionMessageProps> = ({ onClose, onProceed }) => {
  return (
    <div className="bg-gradient-to-br from-[#4299E1] to-[#2C5282] text-white rounded-lg shadow-xl p-8 max-w-xl w-full animate-scale-in relative">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Star key={i} size={40} className="text-yellow-300 fill-yellow-300 animate-float" style={{animationDelay: `${i * 0.2}s`}} />
          ))}
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-4">Congratulations!</h2>
      <p className="text-xl text-center mb-8">
        You have completed the topic: "AI Tools in Remote Helpers Overview"
      </p>
      
      <div className="flex justify-center mt-8 gap-4">
        <button 
          onClick={onProceed}
          className="bg-[#F56565] hover:bg-[#E53E3E] text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105"
        >
          Proceed to Fourth Topic
        </button>
      </div>
    </div>
  );
};

export default AntarcticCompletionMessage;
