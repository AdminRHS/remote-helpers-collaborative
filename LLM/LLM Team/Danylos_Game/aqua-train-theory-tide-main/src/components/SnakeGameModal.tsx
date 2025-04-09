
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SnakeGame from './SnakeGame';
import { useExperience } from '@/context/ExperienceContext';

interface SnakeGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SnakeGameModal: React.FC<SnakeGameModalProps> = ({ open, onOpenChange }) => {
  const { addExperience } = useExperience();
  const [hasCompletedBefore, setHasCompletedBefore] = React.useState(() => {
    return localStorage.getItem('lavaSnakeGameCompleted') === 'true';
  });

  const handleComplete = (score: number) => {
    if (!hasCompletedBefore) {
      // Award XP based on score
      addExperience(score);
      localStorage.setItem('lavaSnakeGameCompleted', 'true');
      setHasCompletedBefore(true);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#2D1B1B] border-[#4B2C2C] text-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Snake Game</DialogTitle>
        </DialogHeader>
        <SnakeGame 
          onExit={handleComplete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SnakeGameModal;
