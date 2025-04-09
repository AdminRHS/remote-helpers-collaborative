
import React from "react";
import { X } from "lucide-react";

interface LavaTheoryBlockProps {
  title: string;
  content: string;
  onClose: () => void;
}

const LavaTheoryBlock: React.FC<LavaTheoryBlockProps> = ({ title, content, onClose }) => {
  // Split content by new lines to render paragraphs
  const paragraphs = content.split('\n\n');

  // Check if content might be a table
  const hasTable = content.includes('\t');

  const renderContent = () => {
    if (hasTable) {
      // Convert tab-separated values to table
      const rows = content.split('\n');
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#661C1C]/60 rounded-lg">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex === 0 ? "font-bold" : ""}>
                  {row.split('\t').map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border-[#FF4500]/20 border">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">{paragraph}</p>
      ));
    }
  };

  return (
    <div className="bg-[#661C1C] text-white rounded-lg shadow-xl p-6 max-w-2xl w-full animate-fade-in relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
      >
        <X size={24} />
      </button>
      
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      
      <div className="text-lg space-y-2 max-h-[60vh] overflow-y-auto pr-2">
        {renderContent()}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={onClose}
          className="bg-[#FF4500] text-white px-4 py-2 rounded-md font-bold hover:bg-opacity-90 transition-all"
        >
          Continue Journey
        </button>
      </div>
    </div>
  );
};

export default LavaTheoryBlock;
