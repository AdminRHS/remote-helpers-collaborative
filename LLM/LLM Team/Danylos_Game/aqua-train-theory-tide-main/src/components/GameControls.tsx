
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GameControls = () => {
  return (
    <div className="absolute bottom-6 right-6 flex gap-4 flex-col md:flex-row">
      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-md flex items-center gap-2">
        <div className="flex items-center gap-1">
          <ArrowLeft size={20} className="text-white" />
          <ArrowRight size={20} className="text-white" />
        </div>
        <span className="text-white text-sm">Move Train (use keyboard arrows)</span>
      </div>
      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-md flex items-center gap-2">
        <span className="text-white text-sm">Click on blocks to learn and complete quizzes</span>
      </div>
    </div>
  );
};

export default GameControls;
