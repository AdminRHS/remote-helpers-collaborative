import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import GameControls from "@/components/GameControls";
import LavaTheoryBlock from "@/components/LavaTheoryBlock";
import LavaCompletionMessage from "@/components/LavaCompletionMessage";
import QuizBubble from "@/components/QuizBubble";
import StoreModal from "@/components/StoreModal";
import { useExperience } from "@/context/ExperienceContext";
import LavaAirplane from "@/components/LavaAirplane";
import SnakeGameModal from "@/components/SnakeGameModal";

const lavaContent = {
  theoryBlocks: [
    {
      id: 1,
      title: "Core Components of AI Project Development",
      content: "Strategic planning, tool selection, workflow development, and testing are essential components of an AI project in our onboarding program. This lesson covers practical AI project development techniques. Key phases include:\n\nProblem Formulation: Define business problem, set measurable KPIs, and align with stakeholders.\n\nTool Selection: Choose AI tools based on task requirements, data needs, and team expertise.\n\nWorkflow Development: Create project lifecycle plan, define roles, and establish feedback loops.\n\nTesting & Optimization: Implement testing protocols and use feedback for improvements."
    },
    {
      id: 2,
      title: "Implementation Workflow & Optimization",
      content: "Essential AI Tools\nClaude AI: Document processing and analysis\nPerplexity AI: Information search and verification\nGrok: Workflow automation\n\nImplementation Structure\nData Collection: Use Perplexity AI for research\nAnalysis: Apply Claude AI for processing\nContent Generation: Create outputs with AI assistance\nIteration: Refine based on feedback\n\nTesting & Optimization\nValidation: Test functionality and performance\nMonitoring: Track key metrics\nOptimization: Improve processes\nFeedback: Incorporate user input"
    },
    {
      id: 3,
      title: "Implementation Workflow Quiz",
      isQuiz: true,
      quiz: [
        {
          question: "Match each Essential AI Tool with its corresponding function.",
          options: ["Claude AI → Document processing and analysis", "Perplexity AI → Information search and verification", "Grok → Workflow automation"],
          correctAnswer: 0,
          type: "matching"
        },
        {
          question: "Arrange the following steps of the Implementation Structure in the exact order as described in the material.",
          options: ["Data Collection: Use Perplexity AI for research", "Analysis: Apply Claude AI for processing", "Content Generation: Create outputs with AI assistance", "Iteration: Refine based on feedback"],
          correctAnswer: 0,
          type: "sequencing"
        },
        {
          question: "For each description in the Testing & Optimization section, select the correct step from the list provided.",
          options: ["Validation → Test functionality and performance", "Monitoring → Track key metrics", "Optimization → Improve processes", "Feedback → Incorporate user input"],
          correctAnswer: 0,
          type: "labeling"
        }
      ]
    },
    {
      id: 4,
      title: "Task – Build a Working Prototype",
      content: "Example: Process optimization project Objective: Create an automated workflow\nDefine clear goals\nEstablish success metrics\n\nTools:\nClaude AI: Document processing\nPerplexity AI: Information verification\n\nSteps:\nDefine workflow requirements\nImplement AI tools\nTest and validate results\n\nOptimization:\nMonitor performance metrics\nGather user feedback"
    },
    {
      id: 5,
      title: "Task Quiz",
      isQuiz: true,
      quiz: [
        {
          question: "Match each AI tool with its corresponding function.",
          options: ["Claude AI → Document processing", "Perplexity AI → Information verification"],
          correctAnswer: 0,
          type: "matching"
        },
        {
          question: "Arrange the following implementation steps in the correct order as described in the task.",
          options: ["Define workflow requirements", "Implement AI tools", "Test and validate results"],
          correctAnswer: 0,
          type: "sequencing"
        },
        {
          question: "For each description below, assign the correct project phase label from the list provided.",
          options: ["Objective → Create an automated workflow, define clear goals, and establish success metrics", 
                   "Tools → Use Claude AI for document processing and Perplexity AI for information verification", 
                   "Steps → Outline what the workflow should achieve, deploy the selected AI tools, and verify the outcome", 
                   "Optimization → Monitor performance metrics and gather user feedback to refine the process"],
          correctAnswer: 0,
          type: "labeling"
        }
      ]
    },
    {
      id: 6,
      title: "Tools Overview",
      content: "Tool\tPurpose\tUsage\nClaude AI\tText generation\tWorkflow automation\nPerplexity\tResearch\tData verification\nGrok\tText processing\tDocumentation\nNotebook LM\tAnalysis\tData handling\nMidjourney\tImages\tVisual content\nChatGPT\tContent\tCommunications\nGemini\tMultimedia\tComplex projects\nCursor Pro\tCoding\tDevelopment"
    },
    {
      id: 7,
      title: "Practical Tips",
      content: "Start Small: Begin with MVPs to validate concepts.\n\nCollaborate: Maintain stakeholder engagement.\n\nMonitor: Track metrics and optimize performance.\n\nThese practices ensure efficient AI project development while maintaining quality and innovation."
    }
  ]
};

const Lava = () => {
  const navigate = useNavigate();
  const [showStore, setShowStore] = useState(false);
  const [activeTheoryId, setActiveTheoryId] = useState<number | null>(null);
  const [trainPosition, setTrainPosition] = useState(50);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [gameElements, setGameElements] = useState<Array<{id: number; position: number; passed: boolean; isQuiz?: boolean}>>([]);
  const [finishLinePosition, setFinishLinePosition] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [showSnakeGameModal, setShowSnakeGameModal] = useState(false);
  const [sideQuestPosition, setSideQuestPosition] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const { experience, addExperience } = useExperience();
  
  useEffect(() => {
    const elements: Array<{id: number; position: number; passed: boolean; isQuiz?: boolean}> = [];
    
    lavaContent.theoryBlocks.forEach((block, index) => {
      elements.push({
        id: block.id,
        position: 300 + index * 500,
        passed: false,
        isQuiz: block.isQuiz || false
      });
    });
    
    const lastTheoryPosition = 300 + (lavaContent.theoryBlocks.length - 1) * 500;
    const finishPos = lastTheoryPosition + 700;
    setFinishLinePosition(finishPos);
    
    const toolsOverviewElement = elements.find(el => el.id === 6);
    const practicalTipsElement = elements.find(el => el.id === 7);
    
    if (toolsOverviewElement && practicalTipsElement) {
      const sideQuestPos = (toolsOverviewElement.position + practicalTipsElement.position) / 2;
      setSideQuestPosition(sideQuestPos);
    }
    
    setGameElements(elements);
  }, []);

  useEffect(() => {
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
  }, [trainPosition, backgroundPosition, finishLinePosition]);

  const handleBackToAntarctic = () => {
    navigate('/antarctic');
  };

  const toggleStore = () => {
    setShowStore(!showStore);
  };

  const handleElementClick = (id: number) => {
    const element = gameElements.find(elem => elem.id === id);
    
    if (element?.isQuiz) {
      const quizBlock = lavaContent.theoryBlocks.find(block => block.id === id);
      if (quizBlock && quizBlock.quiz) {
        setActiveQuiz(quizBlock.quiz);
        setShowQuiz(true);
      }
    } else {
      setActiveTheoryId(id);
    }
    
    setGameElements(prev => 
      prev.map(elem => {
        if (elem.id === id && !elem.passed) {
          addExperience(10);
          return { ...elem, passed: true };
        }
        return elem;
      })
    );
  };

  const handleCloseTheory = () => {
    const theory = lavaContent.theoryBlocks.find(block => block.id === activeTheoryId);
    if (theory?.quiz) {
      setActiveQuiz(theory.quiz);
      setShowQuiz(true);
    }
    setActiveTheoryId(null);
  };
  
  const handleQuizComplete = (correctAnswers: number, totalQuestions: number) => {
    setShowQuiz(false);
    const earnedXP = Math.round((correctAnswers / totalQuestions) * 20);
    addExperience(earnedXP);
  };

  const handleProceedToNextWorld = () => {
    navigate('/space');
  };

  const activeTheory = activeTheoryId 
    ? lavaContent.theoryBlocks.find(block => block.id === activeTheoryId) 
    : null;

  return (
    <div className="w-full min-h-screen bg-[#2D1B1B] flex flex-col items-center justify-center p-4">
      <div ref={gameAreaRef} className="w-full max-w-[1200px] h-[800px] bg-[#2D1B1B] relative overflow-hidden border-b-8 border-[#4B2C2C] rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B2500] via-[#551C1C] to-[#2D1B1B]"></div>
        
        <div className="absolute bottom-40 left-[10%] w-80 h-120 bg-gradient-to-t from-[#4B2C2C] to-[#8B4513] clip-path-triangle"></div>
        <div className="absolute bottom-60 left-[30%] w-100 h-140 bg-gradient-to-t from-[#4B2C2C] to-[#8B4513] clip-path-triangle"></div>
        <div className="absolute bottom-50 left-[60%] w-120 h-160 bg-gradient-to-t from-[#4B2C2C] to-[#8B4513] clip-path-triangle"></div>
        <div className="absolute bottom-40 left-[80%] w-60 h-100 bg-gradient-to-t from-[#4B2C2C] to-[#8B4513] clip-path-triangle"></div>
        
        <div className="absolute bottom-[160px] left-[12%] w-10 h-30 bg-[#FF4500] animate-pulse shadow-lg shadow-orange-500/50"></div>
        <div className="absolute bottom-[180px] left-[32%] w-12 h-40 bg-[#FF6347] animate-pulse shadow-lg shadow-orange-500/50"></div>
        <div className="absolute bottom-[200px] left-[62%] w-15 h-50 bg-[#FF4500] animate-pulse shadow-lg shadow-orange-500/50"></div>
        <div className="absolute bottom-[160px] left-[82%] w-8 h-20 bg-[#FF6347] animate-pulse shadow-lg shadow-orange-500/50"></div>
        
        <div className="absolute bottom-[220px] left-[15%] w-2 h-2 bg-[#FFA500] animate-float rounded-full shadow-lg shadow-orange-500/50"></div>
        <div className="absolute bottom-[240px] left-[35%] w-3 h-3 bg-[#FF8C00] animate-float rounded-full shadow-lg shadow-orange-500/50" style={{animationDelay: "0.5s"}}></div>
        <div className="absolute bottom-[260px] left-[65%] w-2 h-2 bg-[#FFA500] animate-float rounded-full shadow-lg shadow-orange-500/50" style={{animationDelay: "1s"}}></div>
        <div className="absolute bottom-[230px] left-[85%] w-3 h-3 bg-[#FF8C00] animate-float rounded-full shadow-lg shadow-orange-500/50" style={{animationDelay: "1.5s"}}></div>
        
        <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
          <div className="bg-[#4B2C2C]/80 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-orange-500 font-bold">XP:</span>
            <span className="text-white font-bold">{experience}</span>
          </div>
          <button 
            onClick={toggleStore}
            className="bg-[#FF4500] hover:bg-[#FF6347] p-2 rounded-lg flex items-center gap-1"
          >
            <ShoppingBag size={20} className="text-white" />
            <span className="text-white font-bold">Store</span>
          </button>
        </div>
        
        <div 
          className="absolute bottom-20 h-[120px] w-[10px] bg-gradient-to-b from-[#FF6347] to-[#FF4500]"
          style={{ left: finishLinePosition + backgroundPosition }}
        >
          <div className="absolute top-[-40px] left-[-45px] bg-[#FF4500] p-2 rounded-full">
            <span className="text-white font-bold">FINISH</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full h-20 bg-[#4B2C2C] flex items-center">
          <div className="w-full h-8 flex">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={cn(
                "h-full flex-1",
                i % 2 === 0 ? "bg-[#4B2C2C]" : "bg-[#661C1C]"
              )}></div>
            ))}
          </div>
        </div>
        
        <div 
          ref={trainRef}
          className="absolute bottom-20 w-[100px] h-[80px] transition-all duration-300"
          style={{ left: `${trainPosition}%`, transform: 'translateX(-50%)' }}
        >
          <LavaAirplane />
        </div>
        
        {gameElements.map((element) => {
          const theory = lavaContent.theoryBlocks.find(t => t.id === element.id);
          if (!theory) return null;
          
          if (element.isQuiz) {
            return (
              <div 
                key={`quiz-${element.id}`}
                className={cn(
                  "absolute bottom-24 text-white rounded-full shadow-lg w-[80px] h-[80px] flex items-center justify-center text-4xl cursor-pointer transition-colors",
                  element.passed 
                    ? "bg-[#8B4513] hover:bg-[#7B3503]" 
                    : "bg-[#E53935] hover:bg-[#D32F2F]"
                )}
                style={{ left: element.position + backgroundPosition }}
                onClick={() => handleElementClick(element.id)}
              >
                ?
              </div>
            );
          }
          
          return (
            <div 
              key={`theory-${element.id}`}
              className={cn(
                "absolute bottom-24 p-4 rounded-lg shadow-lg w-[200px] h-[100px] flex items-center justify-center text-center cursor-pointer transition-colors",
                element.passed 
                  ? "bg-[#8B4513] text-white hover:bg-[#7B3503]" 
                  : "bg-[#A0522D] text-white hover:bg-[#8B4513]"
              )}
              style={{ left: element.position + backgroundPosition }}
              onClick={() => handleElementClick(element.id)}
            >
              <p className="font-bold">{theory.title}</p>
            </div>
          );
        })}
        
        <button 
          onClick={handleBackToAntarctic}
          className="absolute bottom-8 left-8 bg-[#FF4500] hover:bg-[#FF6347] text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 z-10"
        >
          Back to Antarctic
        </button>
        
        {showStore && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <StoreModal onClose={toggleStore} />
          </div>
        )}
        
        {activeTheory && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <LavaTheoryBlock 
              title={activeTheory.title}
              content={activeTheory.content}
              onClose={handleCloseTheory}
            />
          </div>
        )}
        
        {showQuiz && activeQuiz && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <QuizBubble 
              questions={activeQuiz}
              onClose={() => setShowQuiz(false)}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
        
        {showCompletion && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <LavaCompletionMessage 
              onClose={() => setShowCompletion(false)}
              onProceed={handleProceedToNextWorld}
            />
          </div>
        )}
        
        <div 
          className="absolute bottom-40 z-10 cursor-pointer"
          style={{ left: sideQuestPosition + backgroundPosition }}
          onClick={() => setShowSnakeGameModal(true)}
        >
          <div className="relative animate-bounce">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-gray-900 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap shadow-md">
              Side Quest
            </div>
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-500">
              <AlertCircle size={32} className="text-gray-800" />
            </div>
          </div>
        </div>
        
        {showSnakeGameModal && (
          <SnakeGameModal
            open={showSnakeGameModal}
            onOpenChange={setShowSnakeGameModal}
          />
        )}
      </div>
    </div>
  );
};

export default Lava;
