
import React from "react";
import { useExperience } from "@/context/ExperienceContext";
import { toast } from "sonner";

interface StoreModalProps {
  onClose: () => void;
}

const StoreModal: React.FC<StoreModalProps> = ({ onClose }) => {
  const { experience, addExperience } = useExperience();
  
  const handlePurchase = (itemName: string, cost: number) => {
    if (experience >= cost) {
      // Deduct the cost from experience (negative amount)
      addExperience(-cost);
      toast.success(`You purchased ${itemName}!`);
    } else {
      toast.error("Not enough XP to purchase this item!");
    }
  };
  
  return (
    <div className="bg-gray-900/95 shadow-xl border border-gray-800 text-white rounded-lg p-6 max-w-lg w-full backdrop-blur-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Item Store</h2>
      
      <div className="mb-6 flex justify-between items-center">
        <span className="font-semibold text-lg">Your XP:</span>
        <span className="bg-yellow-500/20 px-4 py-1 rounded-full text-yellow-300 font-bold">{experience}</span>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-blue-400">Speed Boost</h3>
            <p className="text-sm text-gray-400">Move 20% faster</p>
          </div>
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={experience < 50}
            onClick={() => handlePurchase("Speed Boost", 50)}
          >
            50 XP
          </button>
        </div>
        
        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-purple-400">Custom Vehicle</h3>
            <p className="text-sm text-gray-400">Change your vehicle appearance</p>
          </div>
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={experience < 75}
            onClick={() => handlePurchase("Custom Vehicle", 75)}
          >
            75 XP
          </button>
        </div>
        
        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-green-400">XP Booster</h3>
            <p className="text-sm text-gray-400">Earn 25% more XP</p>
          </div>
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={experience < 100}
            onClick={() => handlePurchase("XP Booster", 100)}
          >
            100 XP
          </button>
        </div>
      </div>
      
      <div className="text-center text-gray-400 mb-6">
        <p>More items coming soon!</p>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoreModal;
