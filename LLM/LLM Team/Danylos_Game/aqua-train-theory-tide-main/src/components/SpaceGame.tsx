import React, { useEffect, useState, useRef } from "react";
import SpaceTheoryBlock from "./SpaceTheoryBlock";
import QuizBubble from "./QuizBubble";
import GameControls from "./GameControls";
import SpaceCompletionMessage from "./SpaceCompletionMessage";
import StoreModal from "./StoreModal";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { useExperience } from "@/context/ExperienceContext";
import HorizontalRocket from "./HorizontalRocket";

const gameContent = {
  theoryBlocks: [
    {
      id: 1,
      title: "Problem Description",
      content: "Describe the specific workplace process or challenge your AI solution aims to improve. Focus on how AI tools can enhance productivity, automate routine tasks, or improve decision-making in your role. Include specific examples from your daily work that show the need for AI assistance."
    },
    {
      id: 2,
      title: "Project Implementation, Results, and Future Plans",
      content: "AI Tools and Implementation\nSelected AI tools (Claude AI, Perplexity AI, or Grok)\n- Specific use cases for each tool - Integration into your workflow\nKey features utilized\nImplementation process and timeline\nResults and Impact\nTime saved on tasks\nQuality improvements in output\nWorkflow efficiency gains\nTeam feedback and adoption\nFuture Development\nShort-term: Expand use cases and team training\nMid-term: Integration with more work processes\nLong-term: Department-wide AI adoption strategy"
    },
    {
      id: 3,
      title: "Presentation Guidelines",
      content: "Key elements to include:\nShow practical examples of AI tools in use\nDemonstrate actual workflow improvements\nShare lessons learned and best practices\nProvide recommendations for others"
    }
  ],
  quizzes: [
    {
      id: 1,
      questions: [
        {
          question: "Match each project section with its corresponding details:",
          options: [
            "AI Tools and Implementation → Selected AI tools (Claude AI, Perplexity AI, or Grok), specific use cases, key features utilized, implementation process, and timeline.",
            "Results and Impact → Time saved on tasks, quality improvements in output, workflow efficiency gains, team feedback, and adoption.",
            "Future Development → Long-term: Department-wide AI adoption strategy, Short-term: Expand use cases and team training, Mid-term: Integration with more work processes."
          ],
          correctAnswer: 0,
          type: "matching"
        },
        {
          question: "Arrange the Future Development steps in the correct order as described in the material:",
          options: [
            "Long-term: Department-wide AI adoption strategy",
            "Short-term: Expand use cases and team training",
            "Mid-term: Integration with more work processes"
          ],
          correctAnswer: 0,
          type: "sequencing"
        },
        {
          question: "For each description below, select the correct project section label:",
          options: [
            "\"This section covers the selection and integration of AI tools, including options like Claude AI, Perplexity AI, or Grok, along with details about their specific use cases and key features.\" (AI Tools and Implementation)",
            "\"This part describes measurable outcomes such as time savings, quality improvements in outputs, workflow efficiency gains, and feedback from team adoption.\" (Results and Impact)",
            "\"This area outlines plans for the future, including expanding use cases and training in the short term, further integration in the mid-term, and a comprehensive adoption strategy across the department in the long term.\" (Future Development)"
          ],
          correctAnswer: 0,
          type: "standard"
        }
      ]
    }
  ]
};

interface SpaceGameProps {
  showMazeGame: boolean;
  setShowMazeGame: (show: boolean) => void;
}

const SpaceGame: React.FC<SpaceGameProps> = ({ showMazeGame, setShowMazeGame }) => {
  const [trainPosition, setTrainPosition] = useState(50);
  const [activeElement, setActiveElement] = useState<{ type: string; id: number | null }>({ type: "", id: null });
  const [gameElements, setGameElements] = useState<Array<{type: string; id: number; position: number; passed: boolean}>>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [finishLinePosition, setFinishLinePosition] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const trainWidth = 100;
  const { experience, addExperience } = useExperience();

  useEffect(() => {
    if (gameStarted) {
      const elements: Array<{type: string; id: number; position: number; passed: boolean}> = [];
      
      elements.push({
        type: "theory",
        id: 1,
        position: 500,
        passed: false
      });
      
      elements.push({
        type: "sideQuest",
        id: 1,
        position: 1000,
        passed: false
      });
      
      elements.push({
        type: "theory",
        id: 2,
        position: 1500,
        passed: false
      });
      
      elements.push({
        type: "quiz",
        id: 1,
        position: 2500,
        passed: false
      });
      
      elements.push({
        type: "theory",
        id: 3,
        position: 3500,
        passed: false
      });
      
      const finishPos = 4500;
      setFinishLinePosition(finishPos);
      
      elements.sort((a, b) => a.position - b.position);
      setGameElements(elements);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setTrainPosition((prev) => Math.max(10, prev - 15));
        setBackgroundPosition((prev) => prev + 5);
      } else if (e.key === "ArrowRight") {
        setTrainPosition((prev) => Math.min(90, prev + 15));
        setBackgroundPosition((prev) => prev - 30);
        
        const trainPosX = trainPosition / 100 * (gameAreaRef.current?.clientWidth || window.innerWidth);
        const finishPosWithBg = finishLinePosition + backgroundPosition;
        
        if (Math.abs(trainPosX - finishPosWithBg) < 150) {
          setShowCompletion(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, trainPosition, backgroundPosition, finishLinePosition]);

  const handleElementClick = (type: string, id: number) => {
    if (type === "sideQuest") {
      setShowMazeGame(true);
      return;
    }
    
    setActiveElement({ type, id });
    
    setGameElements(prev => 
      prev.map(elem => {
        if (elem.type === type && elem.id === id) {
          if (!elem.passed) {
            if (type === "theory") {
              addExperience(10);
            }
          }
          return { ...elem, passed: true };
        }
        return elem;
      })
    );
  };

  const handleCloseActiveElement = () => {
    setActiveElement({ type: "", id: null });
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleProceedToNextTopic = () => {
    navigate('/');
  };

  const handleCloseCompletionMessage = () => {
    setShowCompletion(false);
  };

  const handleQuizCompletion = (correctAnswers: number, totalQuestions: number) => {
    let experienceGained = 0;
    
    if (correctAnswers === totalQuestions) {
      experienceGained = 15;
    } else {
      experienceGained = correctAnswers * 5;
    }
    
    addExperience(experienceGained);
  };

  const toggleStore = () => {
    setShowStore(!showStore);
  };

  const activeTheory = activeElement.type === "theory" 
    ? gameContent.theoryBlocks.find(block => block.id === activeElement.id) 
    : null;
  
  const activeQuiz = activeElement.type === "quiz" 
    ? gameContent.quizzes.find(quiz => quiz.id === activeElement.id) 
    : null;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1;
      stars.push(
        <div 
          key={`star-${i}`}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}
        ></div>
      );
    }
    return stars;
  };

  const renderPlanets = () => {
    const planets = [
      { color: "#FF5733", size: 60, left: "15%", top: "20%" },
      { color: "#6A5ACD", size: 40, left: "70%", top: "15%" },
      { color: "#48D1CC", size: 50, left: "85%", top: "60%" }
    ];
    
    return planets.map((planet, index) => (
      <div 
        key={`planet-${index}`}
        className="absolute rounded-full animate-float"
        style={{
          width: `${planet.size}px`,
          height: `${planet.size}px`,
          left: planet.left,
          top: planet.top,
          background: `radial-gradient(circle at 30% 30%, ${planet.color}, #000 90%)`,
          animationDelay: `${index * 0.5}s`
        }}
      ></div>
    ));
  };

  const renderAsteroids = () => {
    const asteroids = [];
    for (let i = 0; i < 3; i++) {
      const size = Math.random() * 25 + 15;
      asteroids.push(
        <div 
          key={`asteroid-${i}`}
          className="absolute animate-asteroid"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 70 + 10}%`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${Math.random() * 5 + 8}s`
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: "#8B8878",
              borderRadius: "50% 40% 45% 50%",
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          ></div>
        </div>
      );
    }
    return asteroids;
  };

  return (
    <div className="w-full min-h-screen bg-[#0D0221] flex flex-col items-center justify-center p-4 overflow-hidden">
      {!gameStarted ? (
        <div className="text-center p-8 bg-[#1E0336]/80 rounded-xl shadow-lg backdrop-blur-sm max-w-2xl">
          <h1 className="text-4xl font-bold mb-2 text-white">Space Station</h1>
          <h2 className="text-2xl font-semibold mb-4 text-purple-200">Final AI Project</h2>
          <p className="text-lg mb-6 text-blue-100">
            Welcome to the final module of your AI learning journey. Here, you will complete your AI project
            and prepare for its presentation. Your spacecraft will guide you through the cosmos of AI implementation.
          </p>
          <button 
            onClick={handleStartGame}
            className="px-8 py-3 bg-[#7E57C2] hover:bg-[#5E35B1] text-white font-bold rounded-full transition-all transform hover:scale-105"
          >
            Begin Final Mission
          </button>
        </div>
      ) : (
        <div ref={gameAreaRef} className="w-full max-w-[2400px] h-[800px] bg-[#0D0221] relative overflow-hidden rounded-lg">
          {renderStars()}
          
          {renderPlanets()}
          
          {renderAsteroids()}
          
          <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
            <div className="bg-[#2E1052]/80 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="text-yellow-300 font-bold">XP:</span>
              <span className="text-white font-bold">{experience}</span>
            </div>
            <button 
              onClick={toggleStore}
              className="bg-[#7E57C2] hover:bg-[#5E35B1] p-2 rounded-lg flex items-center gap-1"
            >
              <ShoppingBag size={20} className="text-white" />
              <span className="text-white font-bold">Store</span>
            </button>
          </div>
          
          <div 
            className="absolute bottom-20 h-[120px] w-[10px] bg-gradient-to-b from-[#FFD700] to-[#FFA500]"
            style={{ left: finishLinePosition + backgroundPosition }}
          >
            <div className="absolute top-[-40px] left-[-45px] bg-[#FFD700] p-2 rounded-full">
              <span className="text-[#0D0221] font-bold">FINISH</span>
            </div>
          </div>
          
          <div className="absolute bottom-0 w-full h-20 bg-[#2E1052] flex items-center">
            <div className="w-full h-8 flex">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className={cn(
                  "h-full flex-1",
                  i % 2 === 0 ? "bg-[#2E1052]" : "bg-[#3A1466]"
                )}></div>
              ))}
            </div>
          </div>
          
          <div 
            ref={trainRef}
            className="absolute bottom-20 w-[100px] h-[80px] transition-all duration-300"
            style={{ left: `${trainPosition}%`, transform: 'translateX(-50%)' }}
          >
            <HorizontalRocket className="absolute" />
          </div>
          
          {gameElements.map((element) => {
            if (element.type === "theory") {
              const theory = gameContent.theoryBlocks.find(t => t.id === element.id);
              if (!theory) return null;
              
              return (
                <div 
                  key={`theory-${element.id}`}
                  className={cn(
                    "absolute bottom-24 p-4 rounded-lg shadow-lg w-[200px] h-[100px] flex items-center justify-center text-center cursor-pointer transition-colors",
                    element.passed 
                      ? "bg-[#3F51B5] text-white hover:bg-[#303F9F]" 
                      : "bg-[#5E35B1] text-white hover:bg-[#4E2DA1]"
                  )}
                  style={{ left: element.position + backgroundPosition }}
                  onClick={() => handleElementClick("theory", element.id)}
                >
                  <p className="font-bold">{theory.title}</p>
                </div>
              );
            } else if (element.type === "quiz") {
              return (
                <div 
                  key={`quiz-${element.id}`}
                  className={cn(
                    "absolute bottom-24 text-white rounded-full shadow-lg w-[80px] h-[80px] flex items-center justify-center text-4xl cursor-pointer transition-colors",
                    element.passed 
                      ? "bg-[#388E3C] hover:bg-[#2E7D32]" 
                      : "bg-[#E53935] hover:bg-[#D32F2F]"
                  )}
                  style={{ left: element.position + backgroundPosition }}
                  onClick={() => handleElementClick("quiz", element.id)}
                >
                  ?
                </div>
              );
            } else if (element.type === "sideQuest") {
              return (
                <div
                  key={`sideQuest-${element.id}`}
                  className="absolute bottom-24 cursor-pointer"
                  style={{ left: element.position + backgroundPosition }}
                  onClick={() => handleElementClick("sideQuest", element.id)}
                >
                  <div className="relative">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full pulse-badge text-sm font-bold whitespace-nowrap">
                      Side Quest
                    </div>
                    <div className="w-[60px] h-[60px] bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-colors">
                      <AlertCircle size={30} className="text-black" />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
          
          <GameControls />
          
          {activeTheory && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <SpaceTheoryBlock 
                title={activeTheory.title}
                content={activeTheory.content}
                onClose={handleCloseActiveElement}
              />
            </div>
          )}
          
          {activeQuiz && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <QuizBubble 
                questions={activeQuiz.questions}
                onClose={handleCloseActiveElement}
                onComplete={handleQuizCompletion}
              />
            </div>
          )}
          
          {showCompletion && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
              <SpaceCompletionMessage 
                onClose={handleCloseCompletionMessage}
                onProceed={handleProceedToNextTopic}
              />
            </div>
          )}
          
          {showStore && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
              <StoreModal 
                onClose={toggleStore}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpaceGame;
