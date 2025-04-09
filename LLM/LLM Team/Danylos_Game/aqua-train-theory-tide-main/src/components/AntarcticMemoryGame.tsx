
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, Trophy, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Card {
  id: number;
  type: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface AntarcticMemoryGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const AntarcticMemoryGame: React.FC<AntarcticMemoryGameProps> = ({ onComplete, onExit }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Card pairs data - Antarctic themed
  const cardPairs = [
    { type: "animal", value: "Penguin" },
    { type: "animal", value: "Seal" },
    { type: "animal", value: "Whale" },
    { type: "phenomenon", value: "Aurora" },
    { type: "phenomenon", value: "Midnight Sun" },
    { type: "research", value: "Ice Core" },
    { type: "research", value: "Temperature" },
    { type: "geography", value: "Ice Shelf" }
  ];

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards
    const newCards: Card[] = [];
    
    cardPairs.forEach((pair, index) => {
      // Each pair has two identical cards
      newCards.push({
        id: index * 2,
        type: pair.type,
        value: pair.value,
        isFlipped: false,
        isMatched: false
      });
      
      newCards.push({
        id: index * 2 + 1,
        type: pair.type,
        value: pair.value,
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
  };

  // Start the game
  const handleStartGame = () => {
    initializeGame();
    setGameStarted(true);
    setGameCompleted(false);
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
      
      if (firstCard.value === secondCard.value && firstCard.type === secondCard.type) {
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
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Check if game is completed
  useEffect(() => {
    if (matchedPairs === cardPairs.length && matchedPairs > 0) {
      setGameCompleted(true);
      // Calculate score: 100 - (attempts - cardPairs.length) * 5, minimum 10
      const score = Math.max(10, 100 - (attempts - cardPairs.length) * 5);
      setTimeout(() => {
        onComplete(score);
      }, 1000);
    }
  }, [matchedPairs, cardPairs.length, attempts, onComplete]);

  // Card color by type
  const getCardColor = (type: string) => {
    switch(type) {
      case "animal": return "bg-blue-500 border-blue-700";
      case "phenomenon": return "bg-purple-500 border-purple-700";
      case "research": return "bg-cyan-500 border-cyan-700";
      case "geography": return "bg-indigo-500 border-indigo-700";
      default: return "bg-gray-500 border-gray-700";
    }
  };

  // Instructions screen
  if (!gameStarted) {
    return (
      <div className="bg-[#33C3F0] bg-opacity-80 text-white p-8 rounded-lg max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center">
            <Puzzle size={36} className="text-blue-800" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Antarctic Memory Match</h2>
        
        <div className="bg-blue-600 bg-opacity-40 p-4 rounded-lg mb-6">
          <p className="mb-4">
            Test your memory by finding matching pairs of Antarctic-themed cards. 
            Flip two cards at a time - if they match, they'll stay face up. 
            Complete the game by finding all pairs!
          </p>
          
          <p className="text-sm opacity-80 mb-2">
            Scoring: The fewer attempts you make, the higher your score.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleStartGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Game
          </Button>
        </div>
      </div>
    );
  }

  // Game completion screen
  if (gameCompleted) {
    const score = Math.max(10, 100 - (attempts - cardPairs.length) * 5);
    
    return (
      <div className="bg-[#33C3F0] bg-opacity-80 text-white p-8 rounded-lg max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center">
            <Trophy size={42} className="text-blue-800" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Victory!</h2>
        <p className="text-center mb-6">You've completed the Antarctic Memory Challenge!</p>
        
        <div className="bg-blue-600 bg-opacity-40 p-6 rounded-lg mb-6">
          <div className="text-center mb-4">
            <p className="text-lg mb-1">Your Score:</p>
            <p className="text-4xl font-bold">{score}</p>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span>Total Pairs:</span>
            <span className="font-bold">{cardPairs.length}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Attempts:</span>
            <span className="font-bold">{attempts}</span>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleStartGame}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Play Again
          </Button>
          
          <Button 
            onClick={() => onExit()}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Exit
          </Button>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="bg-[#33C3F0] bg-opacity-80 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Antarctic Memory Match</h2>
        
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 bg-opacity-40 px-3 py-2 rounded-lg">
            <p className="text-xs opacity-80">Pairs Found</p>
            <p className="text-lg font-bold">{matchedPairs}/{cardPairs.length}</p>
          </div>
          
          <div className="bg-blue-600 bg-opacity-40 px-3 py-2 rounded-lg">
            <p className="text-xs opacity-80">Attempts</p>
            <p className="text-lg font-bold">{attempts}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map(card => (
          <div 
            key={card.id} 
            className={cn(
              "aspect-square rounded-lg cursor-pointer transition-all duration-300 transform",
              card.isFlipped || card.isMatched ? getCardColor(card.type) : "bg-blue-900 hover:bg-blue-800",
              card.isMatched && "opacity-70"
            )}
            onClick={() => handleCardClick(card)}
          >
            {(card.isFlipped || card.isMatched) ? (
              <div className="h-full w-full flex items-center justify-center p-2">
                <span className="text-white font-medium text-center">{card.value}</span>
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-4xl text-white">?</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onExit}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Exit Game
        </Button>
      </div>
    </div>
  );
};

export default AntarcticMemoryGame;
