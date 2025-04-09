
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DesertMemoryGame from './DesertMemoryGame';
import { useExperience } from '@/context/ExperienceContext';

interface DesertMemoryGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DesertMemoryGameModal: React.FC<DesertMemoryGameModalProps> = ({ open, onOpenChange }) => {
  const { addExperience } = useExperience();
  const [hasCompletedBefore, setHasCompletedBefore] = React.useState(() => {
    return localStorage.getItem('desertMemoryGameCompleted') === 'true';
  });

  const handleComplete = (score: number) => {
    if (!hasCompletedBefore) {
      // Award XP only on first completion
      addExperience(score);
      localStorage.setItem('desertMemoryGameCompleted', 'true');
      setHasCompletedBefore(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#E1C16E] border-[#C1A55E] text-[#8B4513] p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Memory Match: Prompting Principles</DialogTitle>
        </DialogHeader>
        <DesertMemoryGame 
          onComplete={handleComplete}
          onExit={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DesertMemoryGameModal;
