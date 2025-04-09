
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MazeGame from './MazeGame';
import { useExperience } from '@/context/ExperienceContext';

interface MazeGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MazeGameModal: React.FC<MazeGameModalProps> = ({ open, onOpenChange }) => {
  const { addExperience } = useExperience();
  const [hasCompletedBefore, setHasCompletedBefore] = React.useState(() => {
    return localStorage.getItem('spaceMazeGameCompleted') === 'true';
  });

  const handleComplete = (score: number) => {
    if (!hasCompletedBefore && score === 100) {
      // Award XP for completing all levels
      addExperience(100);
      localStorage.setItem('spaceMazeGameCompleted', 'true');
      setHasCompletedBefore(true);
    } else if (score > 0) {
      // Award partial XP for incomplete attempts
      addExperience(score);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[#0D0221] border-[#2E1052] text-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Space Maze Game</DialogTitle>
        </DialogHeader>
        <MazeGame 
          onExit={handleComplete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MazeGameModal;
