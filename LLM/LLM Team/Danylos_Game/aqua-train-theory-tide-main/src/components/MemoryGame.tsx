
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Card data interface
interface CardData {
  id: number;
  term: string;
  description: string;
  type: 'term' | 'description';
  matchId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onComplete: (attempts: number) => void;
  onExit: () => void;
}

// All card content pairs
const cardPairs = [
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
  { term: "Maximize AI effectiveness", description: "Goal of using the RCT Framework and key principles" },
];

// Colors to mark matched pairs
const pairColors = [
  "border-green-500",
  "border-blue-500",
  "border-purple-500",
  "border-pink-500",
  "border-yellow-500",
  "border-red-500",
  "border-indigo-500",
  "border-teal-500",
  "border-orange-500",
  "border-cyan-500",
  "border-lime-500",
  "border-amber-500",
  "border-violet-500",
  "border-fuchsia-500",
  "border-rose-500",
];

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete, onExit }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardData[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [disableFlip, setDisableFlip] = useState(false);
  const [usedPairIndices, setUsedPairIndices] = useState<number[]>([]);

  // Initialize game
  const startGame = () => {
    setGameStarted(true);
    setCurrentLevel(1);
    setMatchedPairs([]);
    setTotalAttempts(0);
    setGameCompleted(false);
    setUsedPairIndices([]);
    initializeLevel(1);
  };

  // Initialize a level
  const initializeLevel = (level: number) => {
    const cardsPerLevel = level === 1 ? 4 : level === 2 ? 5 : 6;
    setAttempts(0);
    setFlippedCards([]);
    
    // Select random pairs for this level, but don't reuse pairs from previous levels
    let availablePairIndices = [...Array(cardPairs.length).keys()]
      .filter(index => !usedPairIndices.includes(index));
    
    // If we don't have enough new pairs, reset the used pairs
    if (availablePairIndices.length < cardsPerLevel) {
      availablePairIndices = [...Array(cardPairs.length).keys()];
      setUsedPairIndices([]);
    }
    
    // Randomly select pairs for this level
    const selectedPairIndices = [];
    for (let i = 0; i < cardsPerLevel; i++) {
      const randomIndex = Math.floor(Math.random() * availablePairIndices.length);
      selectedPairIndices.push(availablePairIndices[randomIndex]);
      availablePairIndices.splice(randomIndex, 1);
    }
    
    // Mark these pairs as used
    setUsedPairIndices(prev => [...prev, ...selectedPairIndices]);
    
    // Create cards for the selected pairs
    const newCards: CardData[] = [];
    selectedPairIndices.forEach((pairIndex, index) => {
      const pair = cardPairs[pairIndex];
      
      // Create term card
      newCards.push({
        id: index * 2,
        term: pair.term,
        description: pair.description,
        type: 'term',
        matchId: pairIndex,
        isFlipped: false,
        isMatched: false,
      });
      
      // Create description card
      newCards.push({
        id: index * 2 + 1,
        term: pair.term,
        description: pair.description,
        type: 'description',
        matchId: pairIndex,
        isFlipped: false,
        isMatched: false,
      });
    });
    
    // Shuffle cards
    const shuffledCards = [...newCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  // Handle card click
  const handleCardClick = (clickedCard: CardData) => {
    if (disableFlip || clickedCard.isFlipped || clickedCard.isMatched) return;
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    
    // Add to flippedCards
    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    
    // If we have 2 flipped cards, check for a match
    if (newFlippedCards.length === 2) {
      setAttempts(prev => prev + 1);
      setTotalAttempts(prev => prev + 1);
      
      // Check if there's a match
      const [firstCard, secondCard] = newFlippedCards;
      const isMatch = firstCard.matchId === secondCard.matchId && 
                     firstCard.type !== secondCard.type;
      
      setDisableFlip(true);
      
      setTimeout(() => {
        if (isMatch) {
          // Mark cards as matched
          const updatedCards = cards.map(card => 
            (card.id === firstCard.id || card.id === secondCard.id) 
              ? { ...card, isMatched: true }
              : card
          );
          setCards(updatedCards);
          setMatchedPairs(prev => [...prev, firstCard.matchId]);
        } else {
          // Flip cards back
          const updatedCards = cards.map(card => 
            (card.id === firstCard.id || card.id === secondCard.id) 
              ? { ...card, isFlipped: false } 
              : card
          );
          setCards(updatedCards);
        }
        
        setFlippedCards([]);
        setDisableFlip(false);
      }, 1500);
    }
  };

  // Check if level is completed and advance to next level
  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const pairsNeededForLevel = currentLevel === 1 ? 4 : currentLevel === 2 ? 5 : 6;
      
      if (matchedPairs.length === pairsNeededForLevel) {
        if (currentLevel < 3) {
          // Advance to next level
          setTimeout(() => {
            const nextLevel = currentLevel + 1;
            setCurrentLevel(nextLevel);
            initializeLevel(nextLevel);
          }, 1000);
        } else {
          // Game completed
          setTimeout(() => {
            setGameCompleted(true);
            onComplete(totalAttempts);
          }, 1000);
        }
      }
    }
  }, [matchedPairs, currentLevel, gameStarted, gameCompleted, totalAttempts, onComplete]);

  // Play again after completion
  const handlePlayAgain = () => {
    setGameStarted(true);
    setCurrentLevel(1);
    setMatchedPairs([]);
    setTotalAttempts(0);
    setGameCompleted(false);
    setUsedPairIndices([]);
    initializeLevel(1);
  };

  // Render card
  const renderCard = (card: CardData) => {
    const cardContent = card.type === 'term' ? card.term : card.description;
    const isActive = card.isFlipped || card.isMatched;
    let matchColorClass = '';
    
    if (card.isMatched) {
      const colorIndex = matchedPairs.findIndex(id => id === card.matchId);
      matchColorClass = pairColors[colorIndex % pairColors.length];
    }
    
    return (
      <div 
        key={card.id}
        className={cn(
          "aspect-[3/4] bg-gray-700 rounded-xl shadow-md cursor-pointer transition-all duration-300 flex items-center justify-center p-2",
          isActive ? "rotate-y-180 border-2" : "hover:bg-gray-600",
          card.isMatched ? `${matchColorClass} border-2` : ""
        )}
        onClick={() => handleCardClick(card)}
      >
        {isActive ? (
          <div className="text-center text-white text-sm p-1">
            {cardContent}
          </div>
        ) : (
          <div className="w-full h-full bg-[#D4AF37] rounded-lg flex items-center justify-center">
            <span className="text-4xl text-white">?</span>
          </div>
        )}
      </div>
    );
  };

  // Instructions screen
  if (!gameStarted) {
    return (
      <div className="bg-[#E1C16E] p-8 text-white max-w-2xl mx-auto rounded-xl shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <AlertCircle size={36} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Side Quest</h2>
        
        <div className="bg-[#C1A55E] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-center">Memory Match: Prompting Principles</h3>
          
          <p className="mb-4">
            Test your knowledge of effective prompt creation! Flip cards two at a time. 
            If a term and its matching description are found – they'll stay revealed. 
            Your goal is to find all pairs in each level. Good luck!
          </p>
          
          <div className="mt-6 bg-[#AD8C3E] p-4 rounded-lg">
            <h4 className="font-bold mb-2">Game Levels:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Level 1: 8 cards (4 pairs)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Level 2: 10 cards (5 pairs)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Level 3: 12 cards (6 pairs)
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={startGame}
            className="bg-[#D4AF37] hover:bg-[#B8962E] text-white px-8 py-3 text-lg rounded-full"
          >
            Start Playing
          </Button>
        </div>
      </div>
    );
  }

  // Game completion screen
  if (gameCompleted) {
    return (
      <div className="bg-[#E1C16E] p-8 text-white max-w-2xl mx-auto rounded-xl shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold">🏆</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Victory!</h2>
        <p className="text-xl text-center mb-6">Side Quest Completed!</p>
        
        <div className="bg-[#C1A55E] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-center">Your Results</h3>
          
          <div className="flex justify-center mb-6">
            <div className="bg-[#AD8C3E] px-6 py-3 rounded-lg text-center">
              <p className="text-lg font-medium">Total Attempts:</p>
              <p className="text-4xl font-bold">{totalAttempts}</p>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-lg">You've earned:</p>
            <p className="text-3xl font-bold text-yellow-300 mb-2">+100 XP</p>
            <p className="text-sm opacity-80">(XP is only awarded on first completion)</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handlePlayAgain}
            className="bg-[#D4AF37] hover:bg-[#B8962E] text-white px-6 py-2"
          >
            Play Again
          </Button>
          
          <Button 
            onClick={onExit}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2"
          >
            Exit
          </Button>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="bg-[#E1C16E] p-6 text-white max-w-4xl mx-auto rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Memory Match</h2>
          <p className="text-sm">Find all matching pairs</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-[#C1A55E] px-4 py-2 rounded-lg">
            <p className="text-sm">Level</p>
            <p className="text-lg font-bold">{currentLevel}/3</p>
          </div>
          
          <div className="bg-[#C1A55E] px-4 py-2 rounded-lg">
            <p className="text-sm">Attempts</p>
            <p className="text-lg font-bold">{attempts}</p>
          </div>
          
          <Button 
            onClick={onExit}
            variant="outline"
            className="border-white text-white hover:bg-white/20"
          >
            Exit
          </Button>
        </div>
      </div>
      
      <div className={cn(
        "grid gap-4 mx-auto",
        currentLevel === 1 ? "grid-cols-4" : 
        currentLevel === 2 ? "grid-cols-5" : 
        "grid-cols-4 md:grid-cols-6"
      )}>
        {cards.map(card => renderCard(card))}
      </div>
      
      <div className="mt-6 text-center text-sm opacity-70">
        <p>Pairs matched: {matchedPairs.length} / {currentLevel === 1 ? 4 : currentLevel === 2 ? 5 : 6}</p>
      </div>
    </div>
  );
};

export default MemoryGame;
