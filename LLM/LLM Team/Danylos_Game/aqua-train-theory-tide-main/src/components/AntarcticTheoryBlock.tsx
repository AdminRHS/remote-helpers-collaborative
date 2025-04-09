
import React from "react";
import { X } from "lucide-react";

interface AntarcticTheoryBlockProps {
  title: string;
  content: string;
  onClose: () => void;
}

const AntarcticTheoryBlock: React.FC<AntarcticTheoryBlockProps> = ({ title, content, onClose }) => {
  // Split content by new lines to render paragraphs
  const paragraphs = content.split('\n\n');

  return (
    <div className="bg-[#4299E1] text-white rounded-lg shadow-xl p-6 max-w-2xl w-full animate-fade-in relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
      >
        <X size={24} />
      </button>
      
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      
      <div className="text-lg space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={onClose}
          className="bg-white text-[#4299E1] px-4 py-2 rounded-md font-bold hover:bg-opacity-90 transition-all"
        >
          Continue Journey
        </button>
      </div>
    </div>
  );
};

export default AntarcticTheoryBlock;
