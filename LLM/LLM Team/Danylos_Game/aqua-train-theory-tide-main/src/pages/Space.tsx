
import React, { useState } from "react";
import SpaceGame from "@/components/SpaceGame";
import AquaGame from "@/components/AquaGame";
import MazeGameModal from "@/components/MazeGameModal";

const Space = () => {
  const [showMazeGame, setShowMazeGame] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes asteroid {
            0% { left: -50px; transform: rotate(0deg); }
            100% { left: 100%; transform: rotate(720deg); }
          }

          @keyframes pulse-badge {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-asteroid {
            animation: asteroid 15s linear infinite;
          }

          .pulse-badge {
            animation: pulse-badge 2s ease-in-out infinite;
          }
        `}
      </style>
      <SpaceGame showMazeGame={showMazeGame} setShowMazeGame={setShowMazeGame} />
      <MazeGameModal open={showMazeGame} onOpenChange={setShowMazeGame} />
      <AquaGame vehicleType="spaceRacer" className="hidden" />
    </>
  );
};

export default Space;
