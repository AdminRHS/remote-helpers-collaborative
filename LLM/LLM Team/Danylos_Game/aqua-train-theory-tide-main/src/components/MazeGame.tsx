import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

interface Cell {
  x: number;
  y: number;
  walls: boolean[];
  visited: boolean;
}

interface MazeGameProps {
  onExit: (score: number) => void;
}

const MazeGame: React.FC<MazeGameProps> = ({ onExit }) => {
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [maze, setMaze] = useState<Cell[][]>([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const [traps, setTraps] = useState<{ x: number; y: number }[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const difficultySettings = [
    { name: "Easy", size: 10, trapCount: 3, points: 20 },
    { name: "Medium", size: 15, trapCount: 5, points: 30 },
    { name: "Hard", size: 20, trapCount: 8, points: 50 }
  ];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!started || gameOver || win) return;
      
      const { x, y } = playerPosition;
      let newX = x;
      let newY = y;
      
      switch (e.key) {
        case "ArrowUp":
          if (!maze[y][x].walls[0]) newY--; // North
          break;
        case "ArrowRight":
          if (!maze[y][x].walls[1]) newX++; // East
          break;
        case "ArrowDown":
          if (!maze[y][x].walls[2]) newY++; // South
          break;
        case "ArrowLeft":
          if (!maze[y][x].walls[3]) newX--; // West
          break;
        default:
          return;
      }
      
      // Check if the new position is valid
      if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length) {
        setPlayerPosition({ x: newX, y: newY });
        
        // Check if player reached the end
        if (newX === endPosition.x && newY === endPosition.y) {
          const levelPoints = difficultySettings[level].points;
          setScore(prevScore => prevScore + levelPoints);
          
          if (level < difficultySettings.length - 1) {
            setLevel(prevLevel => prevLevel + 1);
            generateMaze(difficultySettings[level + 1].size);
          } else {
            setWin(true);
          }
        }
        
        // Check if player hit a trap
        const hitTrap = traps.some(trap => trap.x === newX && trap.y === newY);
        if (hitTrap) {
          setGameOver(true);
          // Создаем <a> элемент
          const link = document.createElement('a');
          link.href = 'https://send.monobank.ua/jar/2JbpBYkhMv';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';

          // Добавляем элемент в DOM, кликаем, затем удаляем
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPosition, maze, started, gameOver, win, level, endPosition, traps]);
  
  useEffect(() => {
    if (started && !showInstructions) {
      generateMaze(difficultySettings[level].size);
    }
  }, [started, level, showInstructions]);
  
  useEffect(() => {
    if (started && maze.length > 0 && !showInstructions) {
      drawMaze();
    }
  }, [maze, playerPosition, traps, started, showInstructions]);
  
  const generateMaze = (size: number) => {
    // Create empty grid
    const newMaze: Cell[][] = Array(size).fill(null).map((_, y) => 
      Array(size).fill(null).map((_, x) => ({
        x,
        y,
        walls: [true, true, true, true], // [N, E, S, W]
        visited: false
      }))
    );
    
    // Generate maze using DFS algorithm
    const stack: { x: number; y: number }[] = [];
    const startX = 0;
    const startY = 0;
    newMaze[startY][startX].visited = true;
    stack.push({ x: startX, y: startY });
    
    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      
      // Find unvisited neighbors
      const neighbors: { x: number; y: number; direction: number }[] = [];
      
      // North
      if (current.y > 0 && !newMaze[current.y - 1][current.x].visited) {
        neighbors.push({ x: current.x, y: current.y - 1, direction: 0 });
      }
      // East
      if (current.x < size - 1 && !newMaze[current.y][current.x + 1].visited) {
        neighbors.push({ x: current.x + 1, y: current.y, direction: 1 });
      }
      // South
      if (current.y < size - 1 && !newMaze[current.y + 1][current.x].visited) {
        neighbors.push({ x: current.x, y: current.y + 1, direction: 2 });
      }
      // West
      if (current.x > 0 && !newMaze[current.y][current.x - 1].visited) {
        neighbors.push({ x: current.x - 1, y: current.y, direction: 3 });
      }
      
      if (neighbors.length > 0) {
        // Choose a random neighbor
        const randomIndex = Math.floor(Math.random() * neighbors.length);
        const next = neighbors[randomIndex];
        
        // Remove wall between current and next
        newMaze[current.y][current.x].walls[next.direction] = false;
        // Remove the opposite wall from the next cell
        newMaze[next.y][next.x].walls[(next.direction + 2) % 4] = false;
        
        // Mark next as visited and push to stack
        newMaze[next.y][next.x].visited = true;
        stack.push({ x: next.x, y: next.y });
      } else {
        // Backtrack
        stack.pop();
      }
    }
    
    // Set player position at the start
    setPlayerPosition({ x: 0, y: 0 });
    
    // Set end position at the bottom right
    setEndPosition({ x: size - 1, y: size - 1 });
    
    // Find a solution path from start to end
    const solutionPath = findPath(newMaze, { x: 0, y: 0 }, { x: size - 1, y: size - 1 });
    
    // Generate traps avoiding the solution path
    const newTraps: { x: number; y: number }[] = [];
    const trapCount = difficultySettings[level].trapCount;
    
    // Keep trying to add traps until we have the desired count
    let attempts = 0;
    while (newTraps.length < trapCount && attempts < 100) {
      attempts++;
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      
      // Skip the start and end positions
      if ((x === 0 && y === 0) || (x === size - 1 && y === size - 1)) {
        continue;
      }
      
      // Skip if this position is on the solution path
      if (solutionPath.some(cell => cell.x === x && cell.y === y)) {
        continue;
      }
      
      // Skip if trap already exists at this position
      if (newTraps.some(trap => trap.x === x && trap.y === y)) {
        continue;
      }
      
      newTraps.push({ x, y });
    }
    
    setTraps(newTraps);
    setMaze(newMaze);
  };
  
  // Find a path from start to end using BFS
  const findPath = (maze: Cell[][], start: { x: number; y: number }, end: { x: number; y: number }) => {
    const size = maze.length;
    const queue: { x: number; y: number; path: { x: number; y: number }[] }[] = [];
    const visited: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
    
    queue.push({ x: start.x, y: start.y, path: [{ x: start.x, y: start.y }] });
    visited[start.y][start.x] = true;
    
    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;
      
      if (x === end.x && y === end.y) {
        return path;
      }
      
      // Check all four directions
      const directions = [
        { dx: 0, dy: -1, wallIdx: 0 }, // North
        { dx: 1, dy: 0, wallIdx: 1 },  // East
        { dx: 0, dy: 1, wallIdx: 2 },  // South
        { dx: -1, dy: 0, wallIdx: 3 }  // West
      ];
      
      for (const { dx, dy, wallIdx } of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        // Check if the position is valid and there's no wall in the way
        if (
          nx >= 0 && nx < size && 
          ny >= 0 && ny < size && 
          !visited[ny][nx] && 
          !maze[y][x].walls[wallIdx]
        ) {
          visited[ny][nx] = true;
          queue.push({ 
            x: nx, 
            y: ny, 
            path: [...path, { x: nx, y: ny }] 
          });
        }
      }
    }
    
    return []; // No path found
  };
  
  const drawMaze = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const size = difficultySettings[level].size;
    const cellSize = Math.min(500 / size, 40); // Adjust cell size based on maze size
    
    // Set canvas dimensions
    canvas.width = cellSize * size;
    canvas.height = cellSize * size;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw maze
    ctx.strokeStyle = "#7E57C2";
    ctx.lineWidth = 2;
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cell = maze[y][x];
        const xPos = x * cellSize;
        const yPos = y * cellSize;
        
        // Draw walls
        if (cell.walls[0]) { // North
          ctx.beginPath();
          ctx.moveTo(xPos, yPos);
          ctx.lineTo(xPos + cellSize, yPos);
          ctx.stroke();
        }
        if (cell.walls[1]) { // East
          ctx.beginPath();
          ctx.moveTo(xPos + cellSize, yPos);
          ctx.lineTo(xPos + cellSize, yPos + cellSize);
          ctx.stroke();
        }
        if (cell.walls[2]) { // South
          ctx.beginPath();
          ctx.moveTo(xPos, yPos + cellSize);
          ctx.lineTo(xPos + cellSize, yPos + cellSize);
          ctx.stroke();
        }
        if (cell.walls[3]) { // West
          ctx.beginPath();
          ctx.moveTo(xPos, yPos);
          ctx.lineTo(xPos, yPos + cellSize);
          ctx.stroke();
        }
      }
    }
    
    // Draw traps
    ctx.fillStyle = "#FF5252";
    traps.forEach(trap => {
      ctx.beginPath();
      ctx.arc(
        trap.x * cellSize + cellSize / 2,
        trap.y * cellSize + cellSize / 2,
        cellSize / 4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
    
    // Draw end position
    ctx.fillStyle = "#4CAF50";
    ctx.beginPath();
    ctx.arc(
      endPosition.x * cellSize + cellSize / 2,
      endPosition.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw player
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(
      playerPosition.x * cellSize + cellSize / 2,
      playerPosition.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };
  
  const handleStartGame = () => {
    setShowInstructions(false);
    setStarted(true);
    setGameOver(false);
    setWin(false);
    setScore(0);
    setLevel(0);
  };
  
  const handleExitGame = () => {
    onExit(win ? 100 : score);
  };
  
  const handleRetry = () => {
    setGameOver(false);
    setWin(false);
    generateMaze(difficultySettings[level].size);
  };
  
  return (
    <div className="bg-[#0D0221] text-white p-6 min-h-[500px] flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Space Maze Challenge</h2>
      
      {showInstructions ? (
        <div className="space-y-4 max-w-lg text-center">
          <p className="text-lg">Navigate through the maze using arrow keys to reach the green exit.</p>
          <p>Avoid the red traps or you'll have to start over.</p>
          <p>Complete all three difficulty levels to earn 100 XP!</p>
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              onClick={handleStartGame} 
              className="bg-[#7E57C2] hover:bg-[#5E35B1] text-white px-8 py-2"
            >
              Start Game
            </Button>
            <Button 
              onClick={handleExitGame} 
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-2"
            >
              Exit
            </Button>
          </div>
        </div>
      ) : (
        <>
          {!gameOver && !win ? (
            <>
              <div className="flex justify-between items-center w-full max-w-lg mb-4">
                <div className="space-y-1">
                  <p>Level: <span className="font-bold">{difficultySettings[level].name}</span></p>
                  <p>Score: <span className="font-bold">{score}</span></p>
                </div>
                <Button 
                  onClick={handleExitGame}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Exit Game
                </Button>
              </div>
              <div className="bg-[#1E0336] p-2 rounded-lg">
                <canvas 
                  ref={canvasRef} 
                  className="border-2 border-[#7E57C2] rounded"
                ></canvas>
              </div>
              <div className="text-center mt-4">
                <p>Use arrow keys to navigate the maze</p>
                <p>Reach the green circle without hitting the red traps</p>
              </div>
            </>
          ) : gameOver ? (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-red-500">Game Over!</h3>
              <p className="text-xl">You hit a trap!</p>
              <p>Your score: {score}</p>
              <div className="flex gap-4 justify-center mt-4">
                <Button 
                  onClick={handleRetry} 
                  className="bg-[#7E57C2] hover:bg-[#5E35B1] text-white px-8 py-2"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={handleExitGame} 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-2"
                >
                  Exit
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-green-500">Congratulations!</h3>
              <p className="text-xl">You completed all levels!</p>
              <p>Total score: 100 XP</p>
              <Button 
                onClick={handleExitGame} 
                className="bg-[#7E57C2] hover:bg-[#5E35B1] text-white px-8 py-2"
              >
                Claim Reward
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MazeGame;
