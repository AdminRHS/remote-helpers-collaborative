
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HangmanGame from './HangmanGame';
import { useExperience } from '@/context/ExperienceContext';

interface HangmanGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HangmanGameModal: React.FC<HangmanGameModalProps> = ({ open, onOpenChange }) => {
  const { addExperience } = useExperience();
  const [hasCompletedBefore, setHasCompletedBefore] = React.useState(() => {
    return localStorage.getItem('antarcticHangmanGameCompleted') === 'true';
  });

  const handleComplete = (score: number) => {
    if (!hasCompletedBefore) {
      // Award XP based on score
      addExperience(score);
      localStorage.setItem('antarcticHangmanGameCompleted', 'true');
      setHasCompletedBefore(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#1EAEDB] border-blue-700 text-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Hangman Game</DialogTitle>
        </DialogHeader>
        <HangmanGame 
          onExit={handleComplete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default HangmanGameModal;
