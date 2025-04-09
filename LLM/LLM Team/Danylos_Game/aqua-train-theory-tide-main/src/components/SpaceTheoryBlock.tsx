
import React from "react";
import { X } from "lucide-react";

interface SpaceTheoryBlockProps {
  title: string;
  content: string;
  onClose: () => void;
}

const SpaceTheoryBlock: React.FC<SpaceTheoryBlockProps> = ({ title, content, onClose }) => {
  // Split content by new lines to render paragraphs
  const paragraphs = content.split('\n');

  return (
    <div className="bg-[#2E1052] text-white rounded-lg shadow-xl p-6 max-w-2xl w-full animate-fade-in relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
      >
        <X size={24} />
      </button>
      
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      
      <div className="text-lg space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="my-2">{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={onClose}
          className="bg-[#7E57C2] hover:bg-[#5E35B1] text-white px-4 py-2 rounded-md font-bold transition-all"
        >
          Continue Journey
        </button>
      </div>
    </div>
  );
};

export default SpaceTheoryBlock;
