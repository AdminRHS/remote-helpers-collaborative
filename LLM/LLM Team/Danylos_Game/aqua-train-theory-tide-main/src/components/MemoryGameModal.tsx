
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MemoryGame from './MemoryGame';
import { useExperience } from '@/context/ExperienceContext';

interface MemoryGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MemoryGameModal: React.FC<MemoryGameModalProps> = ({ open, onOpenChange }) => {
  const { addExperience } = useExperience();
  const [hasCompletedBefore, setHasCompletedBefore] = React.useState(() => {
    return localStorage.getItem('memoryGameCompleted') === 'true';
  });

  const handleComplete = (attempts: number) => {
    if (!hasCompletedBefore) {
      // Award XP only on first completion
      addExperience(100);
      localStorage.setItem('memoryGameCompleted', 'true');
      setHasCompletedBefore(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-800 border-gray-700 text-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Memory Match: Prompting Principles</DialogTitle>
        </DialogHeader>
        <MemoryGame 
          onComplete={handleComplete}
          onExit={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MemoryGameModal;
