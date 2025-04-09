
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TetrisGame from './TetrisGame';
import { useExperience } from '@/context/ExperienceContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from './ui/button';
import { HelpCircle, Play } from 'lucide-react';

interface SideQuestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SideQuestModal: React.FC<SideQuestModalProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { addExperience } = useExperience();
  const [showGame, setShowGame] = useState(false);

  const handleComplete = (score: number) => {
    // Award XP based on the score when exiting the game
    addExperience(score);
  };

  const startGame = () => {
    setShowGame(true);
  };

  const handleExit = (score: number) => {
    handleComplete(score);
    setShowGame(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setShowGame(false);
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-3xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-white">Tetris Side Quest</DialogTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Game Rules</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gray-800 text-white border-gray-700">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Tetris Game</h4>
                <p className="text-sm text-gray-300">
                  Welcome to the classic game of Tetris!
                </p>
                <p className="text-sm text-gray-300">
                  Use the arrow keys to move and rotate the falling pieces. Complete rows to score points and level up!
                </p>
                <p className="text-sm text-gray-300">
                  ← → : Move left/right
                </p>
                <p className="text-sm text-gray-300">
                  ↓ : Move down
                </p>
                <p className="text-sm text-gray-300">
                  ↑ : Rotate piece
                </p>
                <p className="text-sm text-gray-300">
                  Space : Drop piece
                </p>
                <p className="text-sm text-gray-300">
                  The higher your score, the more XP you'll earn when you exit!
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </DialogHeader>
        
        {!showGame ? (
          <div className="space-y-6 p-2">
            <div className="space-y-4 text-gray-100">
              <h3 className="text-xl font-bold">Welcome to Tetris!</h3>
              
              <p>Arrange the falling blocks to complete horizontal rows. When a row is filled, it will disappear and you'll earn points!</p>
              
              <p>Use the arrow keys to move and rotate the pieces:</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Left/Right arrows: Move piece horizontally</li>
                <li>Down arrow: Move piece down faster</li>
                <li>Up arrow: Rotate piece</li>
                <li>Space bar: Drop piece instantly</li>
              </ul>
              
              <p>As you score more points, the level increases and pieces fall faster. How high can you score?</p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={startGame}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-2 text-lg flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Start Game
              </Button>
            </div>
          </div>
        ) : (
          <TetrisGame onExit={handleExit} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SideQuestModal;
