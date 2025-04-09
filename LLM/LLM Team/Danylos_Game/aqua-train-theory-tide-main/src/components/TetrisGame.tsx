
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowLeft, ArrowRight, RotateCw, X } from "lucide-react";

// Tetris block shapes
const SHAPES = [
  // I piece
  { shape: [[1, 1, 1, 1]], color: '#00f0f0' },
  // O piece
  { shape: [[1, 1], [1, 1]], color: '#f0f000' },
  // T piece
  { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
  // L piece
  { shape: [[1, 0, 0], [1, 1, 1]], color: '#f0a000' },
  // J piece
  { shape: [[0, 0, 1], [1, 1, 1]], color: '#0000f0' },
  // Z piece
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
  // S piece
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' }
];

// Game board dimensions
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 28;

interface TetrisGameProps {
  onExit: (score: number) => void;
}

const createEmptyBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () => 
    Array(BOARD_WIDTH).fill(0)
  );
};

const TetrisGame: React.FC<TetrisGameProps> = ({ onExit }) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    color: string;
    position: { x: number; y: number };
  } | null>(null);
  const [nextPiece, setNextPiece] = useState<{
    shape: number[][];
    color: string;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(800);

  // Generate a random piece
  const getRandomPiece = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    const piece = SHAPES[randomIndex];
    return {
      shape: piece.shape,
      color: piece.color,
      position: { x: Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2), y: 0 }
    };
  }, []);

  // Initialize the game
  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setLevel(1);
    setSpeed(800);
    
    const first = getRandomPiece();
    const second = getRandomPiece();
    setCurrentPiece(first);
    setNextPiece(second);
  }, [getRandomPiece]);

  // Check for collisions
  const checkCollision = useCallback((piece: any, pos = { x: 0, y: 0 }) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        // Skip empty cells
        if (piece.shape[y][x] === 0) continue;
        
        // Calculate position on board
        const boardX = piece.position.x + x + pos.x;
        const boardY = piece.position.y + y + pos.y;
        
        // Check for collisions with board boundaries
        if (
          boardX < 0 || 
          boardX >= BOARD_WIDTH || 
          boardY >= BOARD_HEIGHT
        ) {
          return true;
        }
        
        // Check collision with settled blocks
        if (boardY >= 0 && board[boardY][boardX] !== 0) {
          return true;
        }
      }
    }
    return false;
  }, [board]);

  // Move the piece
  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver) return;
    
    if (!checkCollision(currentPiece, { x: dx, y: dy })) {
      setCurrentPiece(prev => {
        if (!prev) return null;
        return {
          ...prev,
          position: {
            x: prev.position.x + dx,
            y: prev.position.y + dy
          }
        };
      });
    } else if (dy > 0) {
      // The piece has reached the bottom or collided
      // Lock it in place and generate a new piece
      lockPiece();
    }
  }, [currentPiece, checkCollision, gameOver]);

  // Rotate the piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver) return;
    
    // Create a rotated version of the shape
    const rotatedShape = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );
    
    const rotatedPiece = {
      ...currentPiece,
      shape: rotatedShape
    };
    
    // Check if the rotated piece would collide
    if (!checkCollision(rotatedPiece)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, checkCollision, gameOver]);

  // Lock the piece in place and check for completed rows
  const lockPiece = useCallback(() => {
    if (!currentPiece || !nextPiece) return;
    
    // Add the current piece to the board
    const newBoard = [...board];
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          const boardY = y + currentPiece.position.y;
          const boardX = x + currentPiece.position.x;
          
          if (boardY < 0) {
            // Game over if piece locks above the board
            setGameOver(true);
            return;
          }
          
          newBoard[boardY][boardX] = currentPiece.color;
        }
      }
    }
    
    // Check for completed rows
    let clearedRows = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== 0)) {
        // Remove the completed row
        newBoard.splice(y, 1);
        // Add a new empty row at the top
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
        clearedRows++;
        y++; // Recheck the same index
      }
    }
    
    // Update score based on cleared rows
    if (clearedRows > 0) {
      const points = [0, 40, 100, 300, 1200][clearedRows] * level;
      const newScore = score + points;
      setScore(newScore);
      
      // Level up after every 10 cleared rows
      const newLevel = Math.floor(newScore / 1000) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        setSpeed(prev => Math.max(100, prev - 100)); // Increase speed with level
      }
    }
    
    setBoard(newBoard);
    
    // Check if any filled cells are at the top row - game over condition
    if (newBoard[0].some(cell => cell !== 0)) {
      setGameOver(true);
      return;
    }
    
    // Set next piece as current and generate a new next piece
    setCurrentPiece({
      ...nextPiece,
      position: { x: Math.floor((BOARD_WIDTH - nextPiece.shape[0].length) / 2), y: 0 }
    });
    setNextPiece(getRandomPiece());
  }, [board, currentPiece, nextPiece, score, level, getRandomPiece]);

  // Drop piece to the bottom
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver) return;
    
    let dropDistance = 0;
    while (!checkCollision(currentPiece, { x: 0, y: dropDistance + 1 })) {
      dropDistance++;
    }
    
    if (dropDistance > 0) {
      setCurrentPiece(prev => {
        if (!prev) return null;
        return {
          ...prev,
          position: {
            x: prev.position.x,
            y: prev.position.y + dropDistance
          }
        };
      });
    }
    
    // Lock the piece after dropping
    setTimeout(lockPiece, 10);
  }, [currentPiece, checkCollision, lockPiece, gameOver]);

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case ' ':
          dropPiece();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, movePiece, rotatePiece, dropPiece]);

  // Game tick - move the piece down
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      movePiece(0, 1);
    }, speed);
    
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, movePiece, speed]);

  // Handle exiting the game
  const handleExit = () => {
    onExit(score);
  };

  // Render the board
  const renderBoard = () => {
    const boardCopy = board.map(row => [...row]);
    
    // Add the current piece to the board copy for rendering
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardY = y + currentPiece.position.y;
            const boardX = x + currentPiece.position.x;
            
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              boardCopy[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }
    
    return (
      <div className="border-4 border-gray-700 bg-black">
        {boardCopy.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, cellIndex) => (
              <div 
                key={cellIndex} 
                style={{ 
                  width: BLOCK_SIZE, 
                  height: BLOCK_SIZE, 
                  backgroundColor: cell || 'transparent',
                  borderWidth: cell ? '1px' : '0px',
                  borderStyle: 'solid',
                  borderColor: cell ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
                  boxShadow: cell ? 'inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.5)' : 'none',
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Render the next piece preview
  const renderNextPiece = () => {
    if (!nextPiece) return null;
    
    const shape = nextPiece.shape;
    const color = nextPiece.color;
    
    return (
      <div className="border-2 border-gray-700 bg-gray-900 p-2">
        {shape.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.map((cell, cellIndex) => (
              <div 
                key={cellIndex} 
                style={{ 
                  width: BLOCK_SIZE - 8, 
                  height: BLOCK_SIZE - 8, 
                  backgroundColor: cell ? color : 'transparent',
                  borderWidth: cell ? '1px' : '0px',
                  borderStyle: 'solid',
                  borderColor: cell ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {!gameStarted ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Tetris Side Quest</h2>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold text-white mb-2">How to Play:</h3>
            <ul className="text-left text-gray-200 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowLeft /> Move left
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight /> Move right
              </li>
              <li className="flex items-center gap-2">
                <ArrowDown /> Move down
              </li>
              <li className="flex items-center gap-2">
                <RotateCw /> Rotate piece (Up Arrow)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-white text-center">↓↓</span> Drop piece (Space)
              </li>
            </ul>
          </div>
          <p className="text-white mb-4">Play as long as you want! The higher your score, the more XP you'll earn when you exit.</p>
          <Button 
            onClick={startGame} 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 text-lg"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <div>
            {renderBoard()}
          </div>
          <div className="w-32 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Score</h3>
              <div className="bg-gray-900 p-2 rounded text-white text-xl font-bold">
                {score}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Level</h3>
              <div className="bg-gray-900 p-2 rounded text-white text-xl font-bold">
                {level}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Next</h3>
              {renderNextPiece()}
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleExit} 
                className="bg-red-600 hover:bg-red-700 flex items-center gap-1" 
                size="sm"
              >
                <X size={16} /> Exit
              </Button>
            </div>
            
            {gameOver && (
              <div className="mt-4 p-2 bg-gray-900 rounded text-center">
                <p className="text-white font-bold">Game Over</p>
                <p className="text-sm text-gray-300">Final Score: {score}</p>
                <Button 
                  onClick={startGame} 
                  className="mt-2 text-sm py-1" 
                  size="sm"
                >
                  Play Again
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
