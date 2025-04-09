
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AntarcticMemoryGame from './AntarcticMemoryGame';
import { useExperience } from '@/context/ExperienceContext';

interface AntarcticMemoryGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AntarcticMemoryGameModal: React.FC<AntarcticMemoryGameModalProps> = ({ open, onOpenChange }) => {
  const { addExperience } = useExperience();
  const [hasCompletedBefore, setHasCompletedBefore] = React.useState(() => {
    return localStorage.getItem('antarcticMemoryGameCompleted') === 'true';
  });

  const handleComplete = (score: number) => {
    if (!hasCompletedBefore) {
      // Award XP only on first completion
      addExperience(score);
      localStorage.setItem('antarcticMemoryGameCompleted', 'true');
      setHasCompletedBefore(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#1EAEDB] border-blue-700 text-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Antarctic Memory Match</DialogTitle>
        </DialogHeader>
        <AntarcticMemoryGame 
          onComplete={handleComplete}
          onExit={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AntarcticMemoryGameModal;
