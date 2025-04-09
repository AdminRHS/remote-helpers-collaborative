import React, { useEffect, useState, useRef } from "react";
import TheoryBlock from "./TheoryBlock";
import QuizBubble from "./QuizBubble";
import Fish from "./Fish";
import GameControls from "./GameControls";
import CompletionMessage from "./CompletionMessage";
import StoreModal from "./StoreModal";
import SideQuestModal from "./SideQuestModal";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { useExperience } from "@/context/ExperienceContext";
import AntarcticSnowmobile from "./AntarcticSnowmobile";

interface AquaGameProps {
  skipIntro?: boolean;
  vehicleType?: "submarine" | "sportsCar" | "desertRacer" | "snowRacer" | "fireRacer" | "spaceRacer";
  className?: string;
  style?: React.CSSProperties;
}

const gameContent = {
  theoryBlocks: [
    {
      id: 1,
      title: "Developing Practical AI Skills",
      content: "In today's digital world, practical AI skills are essential for tech professionals. This training focuses on developing AI competencies through hands-on experience:\n\nAI Fluency: Master tools like ChatGPT, Claude, and Perplexity AI for solving real business problems. Focus on strategic implementation rather than basic prompting.\n\nCritical Analysis: Apply critical thinking for decision-making and problem-solving with AI tools.\n\nRole-Context-Query Method: Learn precise formulation and task decomposition for effective AI interaction.\n\nPractical Exercise: Create an AI-assisted workflow optimization plan with clear metrics and validation steps."
    },
    {
      id: 2,
      title: "Proactive AI Implementation & Personal Development",
      content: "Success in AI adoption requires strategic planning:\n\nRapid Testing: Launch small pilots quickly, learn from results, and scale successful approaches.\n\nChange Management: Drive adoption through clear communication and demonstrable benefits.\n\nTool Selection: Choose appropriate AI tools based on specific professional roles and needs.\n\nSkills Assessment: Identify areas for improvement in AI tool usage and implementation.\n\nProject Focus: Apply learning to real projects aligned with course objectives.\n\nContinuous Learning: Practice AI skills through hands-on projects and exercises.\n\nExample: Develop practical solutions using Claude AI for documents and Perplexity AI for information verification. Planning: Create detailed project plans with measurable outcomes."
    },
    {
      id: 3,
      title: "Final Project",
      content: "Implement an AI solution for business process improvement: Task: Develop and present an AI-driven solution for a specific business challenge. Steps:\n\nAnalysis: Identify opportunities for AI implementation.\n\nTools: Select and implement appropriate AI solutions.\n\nExecute: Build and test solutions with stakeholder feedback.\n\nPresent: Demonstrate results and future development plans.\n\nExample: Workflow optimization using AI tools covered in the course."
    },
    {
      id: 4,
      title: "Key Focus Areas",
      content: "Practical Skills: Hands-on experience with AI tools and applications.\n\nImplementation: Strategic approach to AI solution deployment.\n\nResults: Measurable improvements in workflow efficiency.\n\nSuccess requires practical expertise, strategic thinking, and effective implementation of AI technologies."
    }
  ],
  quizzes: [
    {
      id: 1,
      questions: [
        {
          question: "Match each training component with its corresponding description:",
          options: [
            "AI Fluency → Master tools like ChatGPT, Claude, and Perplexity AI to solve real business problems with a focus on strategic implementation.",
            "Critical Analysis → Apply critical thinking for decision-making and problem-solving with AI tools.",
            "Role-Context-Query Method �� Learn precise formulation and task decomposition for effective AI interaction.",
            "Practical Exercise → Create an AI-assisted workflow optimization plan with clear metrics and validation steps."
          ],
          correctAnswer: 0,
          type: "matching"
        },
        {
          question: "Arrange the following training components in the exact order as described in the material:",
          options: [
            "AI Fluency",
            "Critical Analysis",
            "Role-Context-Query Method",
            "Practical Exercise"
          ],
          correctAnswer: 0,
          type: "sequencing"
        },
        {
          question: "For each statement below, select the correct training component:",
          options: [
            "This component focuses on mastering AI tools like ChatGPT, Claude, and Perplexity AI to address real business challenges. (AI Fluency)",
            "This section encourages the use of critical thinking for effective decision-making and problem-solving with AI. (Critical Analysis)",
            "In this part, learners practice creating an AI-assisted workflow optimization plan complete with metrics and validation. (Practical Exercise)",
            "This method teaches how to precisely formulate tasks and decompose them for more effective AI interactions. (Role-Context-Query Method)"
          ],
          correctAnswer: 0,
          type: "labeling"
        }
      ]
    },
    {
      id: 2,
      questions: [
        {
          question: "Drag each of the following items into one of three categories based on its role in strategic planning:",
          options: [
            "Implementation Strategies → Rapid Testing, Change Management, Tool Selection, Planning",
            "Personal Development Strategies → Skills Assessment, Project Focus, Continuous Learning",
            "Illustration → Example"
          ],
          correctAnswer: 0,
          type: "classification"
        },
        {
          question: "Reorder the following strategic planning components to reflect the exact sequence in which they appear in the text:",
          options: [
            "Rapid Testing",
            "Change Management",
            "Tool Selection",
            "Skills Assessment",
            "Project Focus",
            "Continuous Learning",
            "Example",
            "Planning"
          ],
          correctAnswer: 0,
          type: "sequencing"
        },
        {
          question: "Match each description with the correct strategic planning component:",
          options: [
            "Rapid Testing → Launch small pilots quickly, learn from results, and scale successful approaches.",
            "Change Management → Drive adoption through clear communication and demonstrable benefits.",
            "Tool Selection → Choose appropriate AI tools based on specific professional roles and needs.",
            "Continuous Learning → Practice AI skills through hands-on projects and exercises."
          ],
          correctAnswer: 0,
          type: "matching"
        }
      ]
    }
  ]
};

const AquaGame: React.FC<AquaGameProps> = ({ 
  vehicleType = "submarine", 
  className, 
  style 
}) => {
  const [trainPosition, setTrainPosition] = useState(50);
  const [activeElement, setActiveElement] = useState<{ type: string; id: number | null }>({ type: "", id: null });
  const [gameElements, setGameElements] = useState<Array<{type: string; id: number; position: number; passed: boolean}>>([]);
  const [gameStarted, setGameStarted] = useState(true);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showSideQuest, setShowSideQuest] = useState(false);
  const [finishLinePosition, setFinishLinePosition] = useState(0);
  const [sideQuestPosition, setSideQuestPosition] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const trainWidth = 100;
  const { experience, addExperience } = useExperience();

  useEffect(() => {
    if (gameStarted) {
      const elements: Array<{type: string; id: number; position: number; passed: boolean}> = [];
      
      gameContent.theoryBlocks.forEach((block, index) => {
        elements.push({
          type: "theory",
          id: block.id,
          position: 300 + index * 600,
          passed: false
        });
      });
      
      gameContent.quizzes.forEach((quiz, index) => {
        if (index < 2) { 
          elements.push({
            type: "quiz",
            id: quiz.id,
            position: 600 + index * 600,
            passed: false
          });
        }
      });
      
      const firstQuizPosition = elements.find(el => el.type === "quiz" && el.id === 1)?.position || 0;
      setSideQuestPosition(firstQuizPosition + 150);
      
      const lastTheoryPosition = 300 + (gameContent.theoryBlocks.length - 1) * 600;
      const finishPos = lastTheoryPosition + 900;
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
    navigate('/desert');
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

  return (
    <div className={cn("w-full min-h-screen bg-[#0D4B76] flex flex-col items-center justify-center p-4 overflow-hidden", className)} style={style}>
      <div ref={gameAreaRef} className="w-full max-w-[1200px] h-[800px] bg-[#0D4B76] relative overflow-hidden border-b-8 border-[#0A3A5E] rounded-lg">
        <div 
          className="absolute inset-0 bg-[url('/lovable-uploads/71f686bf-d52c-45f6-b597-293f16eb2e7c.png')] bg-repeat-x bg-no-repeat bg-cover opacity-30 transition-all duration-300"
          style={{ backgroundPosition: `${backgroundPosition}px 0` }}
        ></div>
        
        <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
          <div className="bg-[#1A6EA0]/80 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-yellow-300 font-bold">XP:</span>
            <span className="text-white font-bold">{experience}</span>
          </div>
          <button 
            onClick={toggleStore}
            className="bg-[#FF719A] hover:bg-[#FF5A8A] p-2 rounded-lg flex items-center gap-1"
          >
            <ShoppingBag size={20} className="text-white" />
            <span className="text-white font-bold">Store</span>
          </button>
        </div>
        
        <div className="absolute bottom-0 left-[5%] w-16 h-32 bg-[#38DE84] opacity-80 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[15%] w-20 h-48 bg-[#24BB6E] opacity-80 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[85%] w-16 h-36 bg-[#38DE84] opacity-80 rounded-t-full"></div>
        
        <Fish color="#FF4F9A" size={60} speed={1.5} top={20} direction="right" />
        <Fish color="#9158EB" size={40} speed={1} top={120} direction="left" />
        <Fish color="#FF6F9A" size={30} speed={2} top={200} direction="right" />
        <Fish color="#38ABDE" size={50} speed={1.2} top={280} direction="left" />
        <Fish color="#4FC1FF" size={45} speed={1.8} top={350} direction="right" />
        <Fish color="#E1C16E" size={55} speed={1.3} top={450} direction="left" />
        
        <div 
          className="absolute bottom-20 h-[120px] w-[10px] bg-gradient-to-b from-[#FFD700] to-[#FFA500]"
          style={{ left: finishLinePosition + backgroundPosition }}
        >
          <div className="absolute top-[-40px] left-[-45px] bg-[#FFD700] p-2 rounded-full">
            <span className="text-[#0D4B76] font-bold">FINISH</span>
          </div>
        </div>
        
        <div className="absolute bottom-24 cursor-pointer z-10"
          style={{ left: sideQuestPosition + backgroundPosition }}
          onClick={() => setShowSideQuest(true)}
        >
          <div className="relative">
            <div className="animate-float">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-blue-900 px-3 py-1 rounded-full font-bold text-sm whitespace-nowrap">
                Side Quest
              </div>
              <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center">
                <AlertCircle size={32} className="text-blue-900" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full h-20 bg-[#0A3A5E] flex items-center">
          <div className="w-full h-8 flex">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={cn(
                "h-full flex-1",
                i % 2 === 0 ? "bg-[#0A3A5E]" : "bg-[#084266]"
              )}></div>
            ))}
          </div>
        </div>
        
        <div 
          ref={trainRef}
          className="absolute bottom-20 transition-all duration-300"
          style={{ left: `${trainPosition}%`, transform: 'translateX(-50%)' }}
        >
          {vehicleType === "snowRacer" ? (
            <AntarcticSnowmobile />
          ) : (
            <>
              {vehicleType === "submarine" && (
                <>
                  <div className="w-[110px] h-[60px] bg-[#B83E3E] rounded-t-md relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[20px] h-[20px] bg-[#222] rounded-sm"></div>
                    <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-[30px] h-[30px] bg-[#87CEEB] rounded-full border-2 border-[#333]"></div>
                  </div>
                  <div className="flex justify-between px-4">
                    <div className="w-[20px] h-[20px] bg-[#333] rounded-full"></div>
                    <div className="w-[20px] h-[20px] bg-[#333] rounded-full"></div>
                    <div className="w-[20px] h-[20px] bg-[#333] rounded-full"></div>
                  </div>
                </>
              )}
              
              {vehicleType === "sportsCar" && (
                <>
                  <div className="w-[110px] h-[30px] bg-[#FF0000] rounded-t-md rounded-r-[60px] relative">
                    <div className="absolute bottom-0 left-0 w-full h-[30px] bg-[#FF0000] rounded-l-md rounded-r-[50px] rounded-t-[15px]">
                      <div className="absolute top-[2px] left-[10px] w-[70px] h-[15px] bg-[#111111] bg-opacity-70 rounded-[8px]"></div>
                      <div className="absolute top-[-7px] right-[15px] w-[30px] h-[10px] bg-[#FF0000] rounded-t-md transform skew-x-[25deg]"></div>
                      <div className="absolute top-[7px] right-[10px] w-[8px] h-[8px] bg-[#FFFFFF] rounded-full"></div>
                      <div className="absolute top-[7px] left-[12px] w-[8px] h-[8px] bg-[#FFFF00] rounded-full"></div>
                    </div>
                    <div className="absolute top-[-12px] left-[40px] w-[35px] h-[20px] bg-[#111111] bg-opacity-90 rounded-t-[12px]"></div>
                    <div className="absolute top-[-15px] right-[15px] w-[20px] h-[5px] bg-[#111111] rounded-sm"></div>
                  </div>
                  <div className="flex justify-between px-2">
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute top-[5px] left-1/2 transform -translate-x-1/2 w-[10px] h-[20px] bg-[#FFFFFF] opacity-90"></div>
                </>
              )}
              
              {/* Desert Racer - Gold/Sand-colored */}
              {vehicleType === "desertRacer" && (
                <>
                  <div className="w-full h-[30px] bg-[#E1C16E] rounded-t-md rounded-r-[60px] relative">
                    <div className="absolute bottom-0 left-0 w-full h-[30px] bg-[#E1C16E] rounded-l-md rounded-r-[50px] rounded-t-[15px]">
                      <div className="absolute top-[2px] left-[10px] w-[70px] h-[15px] bg-[#111111] bg-opacity-70 rounded-[8px]"></div>
                      <div className="absolute top-[-7px] right-[15px] w-[30px] h-[10px] bg-[#E1C16E] rounded-t-md transform skew-x-[25deg]"></div>
                      <div className="absolute top-[7px] right-[10px] w-[8px] h-[8px] bg-[#FFFFFF] rounded-full"></div>
                      <div className="absolute top-[7px] left-[12px] w-[8px] h-[8px] bg-[#FFFF00] rounded-full"></div>
                    </div>
                    <div className="absolute top-[-12px] left-[40px] w-[35px] h-[20px] bg-[#111111] bg-opacity-90 rounded-t-[12px]"></div>
                    <div className="absolute top-[-15px] right-[15px] w-[20px] h-[5px] bg-[#111111] rounded-sm"></div>
                  </div>
                  <div className="flex justify-between px-2">
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute top-[5px] left-1/2 transform -translate-x-1/2 w-[10px] h-[20px] bg-[#D4AF37] opacity-90"></div>
                </>
              )}
              
              {/* Fire Racer - Orange/Red */}
              {vehicleType === "fireRacer" && (
                <>
                  <div className="w-full h-[30px] bg-[#FF4500] rounded-t-md rounded-r-[60px] relative">
                    <div className="absolute bottom-0 left-0 w-full h-[30px] bg-[#FF4500] rounded-l-md rounded-r-[50px] rounded-t-[15px]">
                      <div className="absolute top-[2px] left-[10px] w-[70px] h-[15px] bg-[#111111] bg-opacity-70 rounded-[8px]"></div>
                      <div className="absolute top-[-7px] right-[15px] w-[30px] h-[10px] bg-[#FF4500] rounded-t-md transform skew-x-[25deg]"></div>
                      <div className="absolute top-[7px] right-[10px] w-[8px] h-[8px] bg-[#FFFFFF] rounded-full"></div>
                      <div className="absolute top-[7px] left-[12px] w-[8px] h-[8px] bg-[#FFFF00] rounded-full"></div>
                    </div>
                    <div className="absolute top-[-12px] left-[40px] w-[35px] h-[20px] bg-[#111111] bg-opacity-90 rounded-t-[12px]"></div>
                    <div className="absolute top-[-15px] right-[15px] w-[20px] h-[5px] bg-[#111111] rounded-sm"></div>
                  </div>
                  <div className="flex justify-between px-2">
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute top-[5px] left-1/2 transform -translate-x-1/2 w-[10px] h-[20px] bg-[#FFCC00] opacity-90"></div>
                </>
              )}
              
              {/* Space Racer - Silver/Metallic */}
              {vehicleType === "spaceRacer" && (
                <>
                  <div className="w-full h-[30px] bg-[#A9A9A9] rounded-t-md rounded-r-[60px] relative">
                    <div className="absolute bottom-0 left-0 w-full h-[30px] bg-[#A9A9A9] rounded-l-md rounded-r-[50px] rounded-t-[15px]">
                      <div className="absolute top-[2px] left-[10px] w-[70px] h-[15px] bg-[#111111] bg-opacity-70 rounded-[8px]"></div>
                      <div className="absolute top-[-7px] right-[15px] w-[30px] h-[10px] bg-[#A9A9A9] rounded-t-md transform skew-x-[25deg]"></div>
                      <div className="absolute top-[7px] right-[10px] w-[8px] h-[8px] bg-[#00FFFF] rounded-full"></div>
                      <div className="absolute top-[7px] left-[12px] w-[8px] h-[8px] bg-[#00FFFF] rounded-full"></div>
                    </div>
                    <div className="absolute top-[-12px] left-[40px] w-[35px] h-[20px] bg-[#111111] bg-opacity-90 rounded-t-[12px]"></div>
                    <div className="absolute top-[-15px] right-[15px] w-[20px] h-[5px] bg-[#111111] rounded-sm"></div>
                  </div>
                  <div className="flex justify-between px-2">
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                    <div className="w-[22px] h-[22px] bg-[#111111] rounded-full border-2 border-[#CCCCCC] relative">
                      <div className="absolute inset-[4px] bg-[#333333] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute top-[5px] left-1/2 transform -translate-x-1/2 w-[10px] h-[20px] bg-[#4682B4] opacity-90"></div>
                </>
              )}
            </>
          )}
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
          }
          return null;
        })}
        
        <GameControls />
        
        {activeTheory && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <TheoryBlock 
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
            <CompletionMessage 
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
        
        <SideQuestModal 
          open={showSideQuest} 
          onOpenChange={setShowSideQuest} 
        />
        
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-[#1A6EA0] hover:bg-[#0A5A8E] text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 z-10"
        >
          Back to Introduction
        </button>
      </div>
    </div>
  );
};

export default AquaGame;
