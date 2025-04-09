
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, Trophy, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

// Define card pairs data structure
interface CardPair {
  term: string;
  description: string;
}

// Card type for the game
interface Card {
  id: number;
  type: 'term' | 'description';
  value: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface DesertMemoryGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const DesertMemoryGame: React.FC<DesertMemoryGameProps> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [usedPairIds, setUsedPairIds] = useState<number[]>([]);

  // Card pairs data - Prompting principles themed
  const allCardPairs: CardPair[] = [
    { term: "Role", description: "Specify the AI's role (e.g., \"Documentation Specialist\")" },
    { term: "Context", description: "Provide relevant background information and specific requirements" },
    { term: "Task", description: "Clearly state what needs to be done and in what format" },
    { term: "Precision", description: "Be specific in your requests (e.g., \"in 5 bullet points\")" },
    { term: "Context relevance", description: "Include relevant background information for the task" },
    { term: "Task breakdown", description: "Split complex requests into smaller steps" },
    { term: "Iteration", description: "Refine prompts based on results" },
    { term: "Clear formatting", description: "Define how you want the information presented" },
    { term: "Documentation Specialist", description: "AI role: analyze transcripts, extract key info" },
    { term: "Key decisions", description: "Extracted info: project timeline, budget allocation" },
    { term: "Action items", description: "Extracted info: next steps, assigned tasks" },
    { term: "Research Assistant", description: "AI role: find relevant industry statistics" },
    { term: "Industry statistics", description: "Focus: market growth and trends (e.g., Market Size, User Base)" },
    { term: "Structured output", description: "Organized information delivery (e.g., bulleted list, table)" },
    { term: "Maximize AI effectiveness", description: "Goal of using the RCT Framework and key principles" }
  ];

  // Get number of pairs for current level
  const getPairsForLevel = (lvl: number): number => {
    switch(lvl) {
      case 1: return 4;  // 8 cards
      case 2: return 5;  // 10 cards
      case 3: return 6;  // 12 cards
      default: return 4;
    }
  };

  // Initialize level
  const initializeLevel = (lvl: number) => {
    const pairsNeeded = getPairsForLevel(lvl);
    const newCards: Card[] = [];
    
    // Select random pairs that haven't been used in previous levels
    const availablePairIds = Array.from(
      { length: allCardPairs.length }, 
      (_, i) => i
    ).filter(id => !usedPairIds.includes(id));
    
    // Ensure we have enough pairs
    if (availablePairIds.length < pairsNeeded) {
      // If we don't have enough unique pairs, reset the used pairs
      setUsedPairIds([]);
    }
    
    // Get random pairs
    const selectedPairIds: number[] = [];
    while (selectedPairIds.length < pairsNeeded) {
      const randomIndex = Math.floor(Math.random() * availablePairIds.length);
      const pairId = availablePairIds[randomIndex];
      
      if (!selectedPairIds.includes(pairId) && !usedPairIds.includes(pairId)) {
        selectedPairIds.push(pairId);
      }
    }
    
    // Add these pairs to our tracked used pairs
    setUsedPairIds([...usedPairIds, ...selectedPairIds]);
    
    // Create cards for each selected pair
    selectedPairIds.forEach((pairId, index) => {
      // Term card
      newCards.push({
        id: index * 2,
        type: 'term',
        value: allCardPairs[pairId].term,
        pairId: pairId,
        isFlipped: false,
        isMatched: false
      });
      
      // Description card
      newCards.push({
        id: index * 2 + 1,
        type: 'description',
        value: allCardPairs[pairId].description,
        pairId: pairId,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle cards
    const shuffledCards = [...newCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
    setLevelCompleted(false);
  };

  // Start the game
  const handleStartGame = () => {
    initializeLevel(1);
    setLevel(1);
    setShowInstructions(false);
    setGameStarted(true);
    setGameCompleted(false);
    setTotalAttempts(0);
  };

  // Start next level
  const handleNextLevel = () => {
    const nextLevel = level + 1;
    setTotalAttempts(prev => prev + attempts);
    setLevel(nextLevel);
    initializeLevel(nextLevel);
    setLevelCompleted(false);
  };

  // Handle card click
  const handleCardClick = (clickedCard: Card) => {
    if (isDisabled || clickedCard.isFlipped || clickedCard.isMatched) return;
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    
    // Add to flipped cards
    setFlippedCards([...flippedCards, clickedCard]);
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      setAttempts(prev => prev + 1);
      
      const [firstCard, secondCard] = flippedCards;
      
      if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        // Match found
        setCards(cards.map(card => 
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isMatched: true }
            : card
        ));
        
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        setIsDisabled(false);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          ));
          
          setFlippedCards([]);
          setIsDisabled(false);
        }, 1200);
      }
    }
  }, [flippedCards, cards]);

  // Check if level is completed
  useEffect(() => {
    const pairsNeeded = getPairsForLevel(level);
    if (matchedPairs === pairsNeeded && matchedPairs > 0) {
      setTimeout(() => {
        if (level < 3) {
          setLevelCompleted(true);
        } else {
          // Game completed
          setTotalAttempts(prev => prev + attempts);
          setGameCompleted(true);
          onComplete(100); // Award 100 XP for completion
        }
      }, 1000);
    }
  }, [matchedPairs, level]);

  // Reset game
  const handleRestart = () => {
    setLevel(1);
    setTotalAttempts(0);
    setGameCompleted(false);
    initializeLevel(1);
  };

  // Card color by type
  const getCardColor = (card: Card) => {
    if (!card.isFlipped && !card.isMatched) {
      return "bg-[#D4AF37] border-[#C1A55E] text-[#8B4513]";
    }
    
    // Colors for matched pairs based on pair ID (to give each pair a unique color)
    const colors = [
      "bg-yellow-400 border-yellow-600",
      "bg-orange-400 border-orange-600",
      "bg-amber-400 border-amber-600",
      "bg-lime-400 border-lime-600",
      "bg-emerald-400 border-emerald-600",
      "bg-teal-400 border-teal-600",
      "bg-cyan-400 border-cyan-600",
      "bg-sky-400 border-sky-600",
      "bg-indigo-400 border-indigo-600",
      "bg-violet-400 border-violet-600",
      "bg-fuchsia-400 border-fuchsia-600",
      "bg-rose-400 border-red-600",
      "bg-pink-400 border-pink-600",
      "bg-red-400 border-red-600",
      "bg-green-400 border-green-600"
    ];

    if (card.isMatched) {
      return `${colors[card.pairId % colors.length]} text-black`;
    }
    
    // Different colors for terms and descriptions
    return card.type === 'term' 
      ? "bg-amber-300 border-amber-500 text-black" 
      : "bg-amber-100 border-amber-300 text-black";
  };

  // Instructions screen
  if (showInstructions) {
    return (
      <div className="bg-[#E1C16E] bg-opacity-90 text-white p-8 rounded-lg max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
            <Puzzle size={36} className="text-yellow-800" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4 text-[#8B4513]">Memory Match: Prompting Principles</h2>
        
        <div className="bg-[#D4AF37] bg-opacity-40 p-4 rounded-lg mb-6 text-[#8B4513]">
          <p className="mb-4">
            Test your knowledge of effective prompting! Find matching pairs of prompting terms and their descriptions.
            Flip two cards at a time - if they match, they'll stay face up.
          </p>
          
          <p className="mb-4">
            Complete all three levels to earn your reward:
            <br />• Level 1: 4 pairs
            <br />• Level 2: 5 pairs
            <br />• Level 3: 6 pairs
          </p>
          
          <p className="text-sm opacity-80 mb-2">
            The fewer attempts you make, the better your score!
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleStartGame}
            className="bg-[#D4AF37] hover:bg-[#C1A55E] text-[#8B4513] px-8 py-3 font-bold"
          >
            Start Game
          </Button>
        </div>
      </div>
    );
  }

  // Level completion screen
  if (levelCompleted) {
    return (
      <div className="bg-[#E1C16E] bg-opacity-90 text-white p-8 rounded-lg max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
            <Trophy size={36} className="text-yellow-800" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-[#8B4513]">Level {level} Complete!</h2>
        
        <div className="bg-[#D4AF37] bg-opacity-40 p-4 rounded-lg mb-6 text-[#8B4513]">
          <p className="text-center mb-4">
            You've completed level {level} in {attempts} attempts!
          </p>
          
          <p className="text-center mb-2">
            Get ready for level {level + 1} with {getPairsForLevel(level + 1)} pairs to match.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleNextLevel}
            className="bg-[#D4AF37] hover:bg-[#C1A55E] text-[#8B4513] px-8 py-3 font-bold"
          >
            Start Level {level + 1}
          </Button>
        </div>
      </div>
    );
  }

  // Game completion screen
  if (gameCompleted) {
    const totalScore = 100;
    
    return (
      <div className="bg-[#E1C16E] bg-opacity-90 text-white p-8 rounded-lg max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center">
            <Trophy size={42} className="text-yellow-800" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2 text-[#8B4513]">Victory!</h2>
        <p className="text-center mb-6 text-[#8B4513]">You've completed the Memory Match Challenge!</p>
        
        <div className="bg-[#D4AF37] bg-opacity-40 p-6 rounded-lg mb-6 text-[#8B4513]">
          <div className="text-center mb-4">
            <p className="text-lg mb-1">XP Earned:</p>
            <p className="text-4xl font-bold">{totalScore}</p>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span>Levels Completed:</span>
            <span className="font-bold">3</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Total Attempts:</span>
            <span className="font-bold">{totalAttempts + attempts}</span>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleRestart}
            className="bg-[#D4AF37] hover:bg-[#C1A55E] text-[#8B4513]"
          >
            Play Again
          </Button>
          
          <Button 
            onClick={() => onExit()}
            className="bg-[#C1A55E] hover:bg-[#AD8C3E] text-[#8B4513]"
          >
            Exit
          </Button>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="bg-[#E1C16E] bg-opacity-90 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#8B4513]">Memory Match - Level {level}</h2>
        
        <div className="flex items-center gap-4">
          <div className="bg-[#D4AF37] bg-opacity-40 px-3 py-2 rounded-lg">
            <p className="text-xs opacity-80 text-[#8B4513]">Pairs Found</p>
            <p className="text-lg font-bold text-[#8B4513]">{matchedPairs}/{getPairsForLevel(level)}</p>
          </div>
          
          <div className="bg-[#D4AF37] bg-opacity-40 px-3 py-2 rounded-lg">
            <p className="text-xs opacity-80 text-[#8B4513]">Attempts</p>
            <p className="text-lg font-bold text-[#8B4513]">{attempts}</p>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "grid gap-3 mb-6",
        level === 1 ? "grid-cols-4" : level === 2 ? "grid-cols-5" : "grid-cols-4 md:grid-cols-6"
      )}>
        {cards.map(card => (
          <div 
            key={card.id} 
            className={cn(
              "aspect-square rounded-lg cursor-pointer transition-all duration-300 transform border-2",
              getCardColor(card),
              card.isMatched && "opacity-80"
            )}
            onClick={() => handleCardClick(card)}
          >
            {(card.isFlipped || card.isMatched) ? (
              <div className="h-full w-full flex items-center justify-center p-2">
                <span className="text-center text-sm md:text-base">{card.value}</span>
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-4xl">?</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onExit}
          className="bg-[#C1A55E] hover:bg-[#AD8C3E] text-[#8B4513] font-medium"
        >
          Exit Game
        </Button>
      </div>
    </div>
  );
};

export default DesertMemoryGame;
