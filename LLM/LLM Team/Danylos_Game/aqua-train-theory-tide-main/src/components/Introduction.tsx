
import React from "react";
import { useNavigate } from "react-router-dom";

const Introduction: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/underwater');
  };

  return (
    <div className="w-full min-h-screen bg-[#0D4B76] flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="text-center p-8 bg-[#1A6EA0]/80 rounded-xl shadow-lg backdrop-blur-sm max-w-2xl">
        <h1 className="text-4xl font-bold mb-2 text-white">Introduction</h1>
        <h2 className="text-2xl font-semibold mb-4 text-blue-200">Course Overview</h2>
        <p className="text-lg mb-6 text-blue-100">
          This course is dedicated to the AI tools used by our company. Throughout your learning journey, 
          you will encounter tests with a few questions to reinforce the material. These tests are mandatory 
          and should not be skipped. There will also be practical assignments.
        </p>
        <button 
          onClick={handleStartGame}
          className="px-8 py-3 bg-[#FF719A] hover:bg-[#FF5A8A] text-white font-bold rounded-full transition-all transform hover:scale-105"
        >
          Start Journey
        </button>
      </div>
    </div>
  );
};

export default Introduction;
