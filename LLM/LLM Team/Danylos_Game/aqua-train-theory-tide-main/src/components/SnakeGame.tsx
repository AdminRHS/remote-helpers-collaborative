
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

interface SnakeGameProps {
  onExit: (score: number) => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

// Direction types
type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

// Cell type
interface Cell {
  x: number;
  y: number;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onExit }) => {
  // Game state
  const [snake, setSnake] = useState<Cell[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Cell>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  
  // Refs
  const gameLoopRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize the game
  const startGame = () => {
    setIsStarted(true);
    setGameOver(false);
    setSnake([{ x: 5, y: 5 }]);
    setDirection('RIGHT');
    setScore(0);
    setSpeed(INITIAL_SPEED);
    generateFood();
  };
  
  // Generate random food position
  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  };
  
  // Check if two cells are the same position
  const equalPositions = (cell1: Cell, cell2: Cell): boolean => {
    return cell1.x === cell2.x && cell1.y === cell2.y;
  };
  
  // Check if cell is on snake body
  const onSnake = (cell: Cell): boolean => {
    return snake.some(segment => equalPositions(segment, cell));
  };
  
  // Game loop
  useEffect(() => {
    if (!isStarted || isPaused || gameOver) return;
    
    const gameLoop = () => {
      gameLoopRef.current = window.setTimeout(() => {
        moveSnake();
        gameLoopRef.current = window.requestAnimationFrame(gameLoop);
      }, speed);
    };
    
    gameLoopRef.current = window.requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        window.clearTimeout(gameLoopRef.current);
        window.cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isStarted, isPaused, gameOver, snake, direction, speed]);
  
  // Move the snake
  const moveSnake = () => {
    const head = { ...snake[0] };
    
    // Calculate new head position
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
    }
    
    // Check for collisions
    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      snake.slice(1).some(segment => equalPositions(segment, head))
    ) {
      setGameOver(true);
      return;
    }
    
    const newSnake = [head, ...snake];
    
    // Check if snake ate food
    if (equalPositions(head, food)) {
      setScore(prev => prev + 10);
      generateFood();
      // Increase speed slightly
      setSpeed(prev => Math.max(prev - 5, 50));
    } else {
      // Remove tail if no food eaten
      newSnake.pop();
    }
    
    setSnake(newSnake);
  };
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowRight':
        case 'd':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case 'ArrowDown':
        case 's':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'p':
          setIsPaused(prev => !prev);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, gameOver, direction]);
  
  // Draw game on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#FF4500';
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head with different color
        ctx.fillStyle = '#FFA500';
      } else {
        ctx.fillStyle = '#FF6347';
      }
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      );
    });
    
    // Draw food
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE - 1,
      CELL_SIZE - 1
    );
    
  }, [snake, food, gameOver]);
  
  const handleExitGame = () => {
    onExit(score);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Snake Game</h2>
      
      {!isStarted ? (
        <div className="space-y-6 text-center text-white">
          <p className="text-lg">Use arrow keys to control the snake:</p>
          <ul className="space-y-2 text-left mx-auto w-fit">
            <li>↑ or W: Move Up</li>
            <li>→ or D: Move Right</li>
            <li>↓ or S: Move Down</li>
            <li>← or A: Move Left</li>
            <li>P: Pause/Resume</li>
          </ul>
          <p>Eat green food to grow and earn points!</p>
          <Button 
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-2"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between w-full">
            <div className="text-white">Score: {score}</div>
            <Button 
              onClick={() => setIsPaused(!isPaused)}
              variant="outline"
              className="text-white"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
          
          <div className="relative border-2 border-gray-600">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
            />
            
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold text-white mb-4">Game Over!</h3>
                <p className="text-white mb-6">Your score: {score}</p>
                <div className="space-x-4">
                  <Button 
                    onClick={startGame}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Play Again
                  </Button>
                  <Button 
                    onClick={handleExitGame}
                    variant="outline"
                    className="text-white"
                  >
                    Exit
                  </Button>
                </div>
              </div>
            )}
            
            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Paused</h3>
              </div>
            )}
          </div>
          
          <div className="mt-4 w-full flex justify-end">
            <Button 
              onClick={handleExitGame}
              variant="outline"
              className="text-white"
            >
              Exit Game
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SnakeGame;
