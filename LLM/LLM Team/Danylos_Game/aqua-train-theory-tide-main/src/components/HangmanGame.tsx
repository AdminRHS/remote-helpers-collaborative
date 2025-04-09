
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

// List of words for the game
const WORD_LIST = [
  "Text", "Generation", "Analysis", "Claude", "reports", "accuracy", 
  "Perplexity", "research", "Grok", "workflow", "Content", "Design", 
  "ChatGPT", "Gemini", "technology", "Development", "Automation", 
  "Communication", "Task", "Management", "tracking", "Process"
];

interface HangmanGameProps {
  onExit: (score: number) => void;
}

const HangmanGame: React.FC<HangmanGameProps> = ({ onExit }) => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [availableLetters, setAvailableLetters] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
  
  // Initialize the game with a random word
  useEffect(() => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
    setWord(randomWord);
  }, []);
  
  // Check if the player won or lost
  useEffect(() => {
    if (wrongGuesses >= 5) {
      setGameOver(true);
      setWon(false);
    } else if (word && word.split("").every(letter => guessedLetters.includes(letter))) {
      setGameOver(true);
      setWon(true);
    }
  }, [guessedLetters, wrongGuesses, word]);
  
  const handleGuess = (letter: string) => {
    if (gameOver) return;
    
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    setAvailableLetters(availableLetters.filter(l => l !== letter));
    
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };
  
  const displayWord = () => {
    return word.split("").map((letter, index) => (
      <span key={index} className="text-3xl mx-1 font-bold">
        {guessedLetters.includes(letter) ? letter : "_"}
      </span>
    ));
  };
  
  const renderHangman = () => {
    return (
      <div className="w-32 h-40 relative mx-auto">
        {/* Base */}
        <div className="absolute bottom-0 left-0 w-24 h-2 bg-white"></div>
        
        {/* Pole */}
        <div className="absolute bottom-0 left-12 w-2 h-32 bg-white"></div>
        
        {/* Top */}
        <div className="absolute top-0 left-12 w-16 h-2 bg-white"></div>
        
        {/* Rope */}
        <div className="absolute top-0 right-0 w-2 h-6 bg-white"></div>
        
        {/* Head */}
        {wrongGuesses >= 1 && (
          <div className="absolute top-6 right-[-6px] w-6 h-6 rounded-full border-2 border-white"></div>
        )}
        
        {/* Body */}
        {wrongGuesses >= 2 && (
          <div className="absolute top-12 right-0 w-2 h-12 bg-white"></div>
        )}
        
        {/* Left arm */}
        {wrongGuesses >= 3 && (
          <div className="absolute top-14 right-2 w-8 h-2 bg-white transform rotate-45"></div>
        )}
        
        {/* Right arm */}
        {wrongGuesses >= 4 && (
          <div className="absolute top-14 right-[-8px] w-8 h-2 bg-white transform -rotate-45"></div>
        )}
        
        {/* Legs */}
        {wrongGuesses >= 5 && (
          <>
            <div className="absolute top-24 right-2 w-8 h-2 bg-white transform rotate-45"></div>
            <div className="absolute top-24 right-[-8px] w-8 h-2 bg-white transform -rotate-45"></div>
          </>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col items-center text-white bg-gray-900 p-6 rounded-lg w-full">
      <div className="mb-8">
        {renderHangman()}
      </div>
      
      <div className="mb-8 flex justify-center">
        {displayWord()}
      </div>
      
      {gameOver ? (
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-4">
            {won ? "Congratulations! You won!" : "Game Over!"}
          </div>
          {!won && (
            <div className="mb-4">
              The word was: <span className="font-bold">{word}</span>
            </div>
          )}
          <Button 
            onClick={() => onExit(won ? 100 : 0)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Exit
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2 mb-6">
          {availableLetters.map(letter => (
            <Button
              key={letter}
              onClick={() => handleGuess(letter)}
              className="w-10 h-10 p-0 bg-gray-700 hover:bg-gray-600"
            >
              {letter}
            </Button>
          ))}
        </div>
      )}
      
      <div className="flex justify-between w-full">
        <div className="text-sm">
          Mistakes: {wrongGuesses}/5
        </div>
        <Button 
          onClick={() => onExit(0)} 
          variant="outline" 
          className="text-sm"
        >
          Give Up
        </Button>
      </div>
    </div>
  );
};

export default HangmanGame;
