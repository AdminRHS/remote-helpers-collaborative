import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, AlertCircle } from "lucide-react";
import AntarcticTheoryBlock from "@/components/AntarcticTheoryBlock";
import AntarcticCompletionMessage from "@/components/AntarcticCompletionMessage";
import GameControls from "@/components/GameControls";
import { useExperience } from '@/context/ExperienceContext';
import HangmanGameModal from "@/components/HangmanGameModal";
import { cn } from "@/lib/utils";
import QuizBubble from "@/components/QuizBubble";
import AntarcticSnowmobile from "@/components/AntarcticSnowmobile";

const antarcticContent = {
  theoryBlocks: [
    {
      id: 1,
      title: "RH AI Tools",
      content: "Text Generation & Analysis\nClaude AI: Creates and analyzes documents, reports, and administrative content with high accuracy.\nPerplexity AI: Delivers verified research results and fact-checking with cited sources.\nGrok: Processes bulk text and learns from interactions to improve workflow efficiency.\nContent Creation & Design\nChatGPT: Creates content and assists with creative ideation.\nGemini: Handles both text and image tasks with Google's latest AI technology.\nDevelopment & Automation\nMake.com: Automates workflows across platforms, reducing manual tasks."
    },
    {
      id: 2,
      title: "Key Applications",
      content: "Communication: Real-time transcription and automated summaries.\nTask Management: AI-driven prioritization and deadline tracking.\nProcess Automation: Streamlined scheduling, data entry, and analysis.\nThese tools enable Remote Helpers to deliver faster, more accurate results while reducing operational overhead and improving team efficiency."
    }
  ],
  quizzes: [
    {
      id: 1,
      questions: [
        {
          question: "For each statement below, select the appropriate RH AI Tool from the list provided:",
          options: [
            "\"This tool creates and analyzes documents, reports, and administrative content with high accuracy.\" (Claude AI)",
            "\"This tool delivers verified research results and fact-checking with cited sources.\" (Perplexity AI)",
            "\"This tool processes bulk text and learns from interactions to improve workflow efficiency.\" (Grok)",
            "\"This tool creates content and assists with creative ideation.\" (ChatGPT)",
            "\"This tool handles both text and image tasks with Google's latest AI technology.\" (Gemini)",
            "\"This tool automates workflows across platforms, reducing manual tasks.\" (Make.com)"
          ],
          correctAnswer: 0,
          type: "labeling"
        },
        {
          question: "Drag and drop each tool into the correct category based on its focus area:",
          options: [
            "Text Generation & Analysis → Claude AI, Perplexity AI, Grok",
            "Content Creation & Design → ChatGPT, Gemini",
            "Development & Automation → Make.com"
          ],
          correctAnswer: 0,
          type: "classification"
        },
        {
          question: "Arrange the following AI tools in the order they are listed under the \"Text Generation & Analysis\" category in the provided material:",
          options: [
            "Claude AI",
            "Perplexity AI",
            "Grok"
          ],
          correctAnswer: 0,
          type: "sequencing"
        }
      ]
    }
  ]
};

const Antarctic = () => {
  const navigate = useNavigate();
  const [showStore, setShowStore] = useState(false);
  const [activeElement, setActiveElement] = useState<{ type: string; id: number | null }>({ type: "", id: null });
  const [vehiclePosition, setVehiclePosition] = useState(50);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [gameElements, setGameElements] = useState<Array<{type: string; id: number; position: number; passed: boolean}>>([]);
  const [finishLinePosition, setFinishLinePosition] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const { experience, addExperience } = useExperience();
  const [showHangmanModal, setShowHangmanModal] = useState(false);
  const [sideQuestPosition, setSideQuestPosition] = useState(0);
  
  useEffect(() => {
    const elements: Array<{type: string; id: number; position: number; passed: boolean}> = [];
    
    antarcticContent.theoryBlocks.forEach((block, index) => {
      elements.push({
        type: "theory",
        id: block.id,
        position: 300 + index * 600,
        passed: false
      });
    });
    
    elements.push({
      type: "quiz",
      id: 1,
      position: 300 + 300,
      passed: false
    });
    
    const lastTheoryPosition = 300 + (antarcticContent.theoryBlocks.length - 1) * 600;
    const finishPos = lastTheoryPosition + 700;
    setFinishLinePosition(finishPos);
    
    const sideQuestPos = lastTheoryPosition + (finishPos - lastTheoryPosition) / 2;
    setSideQuestPosition(sideQuestPos);
    
    elements.sort((a, b) => a.position - b.position);
    setGameElements(elements);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setVehiclePosition((prev) => Math.max(10, prev - 15));
        setBackgroundPosition((prev) => prev + 5);
      } else if (e.key === "ArrowRight") {
        setVehiclePosition((prev) => Math.min(90, prev + 15));
        setBackgroundPosition((prev) => prev - 30);
        
        const vehiclePosX = vehiclePosition / 100 * (gameAreaRef.current?.clientWidth || window.innerWidth);
        const finishPosWithBg = finishLinePosition + backgroundPosition;
        
        if (Math.abs(vehiclePosX - finishPosWithBg) < 150) {
          setShowCompletion(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vehiclePosition, backgroundPosition, finishLinePosition]);

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

  const handleCloseElement = () => {
    setActiveElement({ type: "", id: null });
  };

  const handleProceedToLava = () => {
    navigate('/lava');
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

  const handleBackToDesert = () => {
    navigate('/desert');
  };

  const activeTheory = activeElement.type === "theory" 
    ? antarcticContent.theoryBlocks.find(block => block.id === activeElement.id) 
    : null;
  
  const activeQuiz = activeElement.type === "quiz" 
    ? antarcticContent.quizzes.find(quiz => quiz.id === activeElement.id) 
    : null;

  return (
    <div className="w-full min-h-screen bg-[#F0F8FF] flex flex-col items-center justify-center p-4">
      <div ref={gameAreaRef} className="w-full max-w-[1200px] h-[800px] bg-[#F0F8FF] relative overflow-hidden border-b-8 border-[#ADD8E6] rounded-lg">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#F0F8FF]"
          style={{ backgroundPosition: `${backgroundPosition}px 0` }}
        ></div>
        
        <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
          <div className="bg-[#ADD8E6]/80 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-blue-800 font-bold">XP:</span>
            <span className="text-white font-bold">{experience}</span>
          </div>
          <button 
            onClick={toggleStore}
            className="bg-[#1EAEDB] hover:bg-[#0D8BBA] p-2 rounded-lg flex items-center gap-1"
          >
            <ShoppingBag size={20} className="text-white" />
            <span className="text-white font-bold">Store</span>
          </button>
        </div>
        
        <div className="absolute bottom-40 left-[20%] w-80 h-80 bg-white opacity-80 rounded-full"></div>
        <div className="absolute bottom-60 left-[40%] w-100 h-100 bg-white opacity-60 rounded-full"></div>
        <div className="absolute bottom-50 left-[60%] w-60 h-60 bg-white opacity-70 rounded-full"></div>
        <div className="absolute bottom-40 left-[80%] w-70 h-70 bg-white opacity-80 rounded-full"></div>
        
        <div className="absolute bottom-20 left-[70%] w-120 h-40 bg-[#F0F8FF]"></div>
        
        <div className="absolute bottom-0 w-full h-40 bg-[#F0F8FF] rounded-t-full"></div>
        
        <div 
          className="absolute bottom-40 z-10 cursor-pointer"
          style={{ left: sideQuestPosition + backgroundPosition }}
          onClick={() => setShowHangmanModal(true)}
        >
          <div className="relative animate-bounce">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
              Side Quest
            </div>
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-500">
              <AlertCircle size={32} className="text-white" />
            </div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-20 h-[120px] w-[10px] bg-gradient-to-b from-[#1EAEDB] to-[#0D8BBA]"
          style={{ left: finishLinePosition + backgroundPosition }}
        >
          <div className="absolute top-[-40px] left-[-45px] bg-[#1EAEDB] p-2 rounded-full">
            <span className="text-white font-bold">FINISH</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full h-20 bg-[#ADD8E6] flex items-center">
          <div className="w-full h-8 flex">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={i % 2 === 0 ? "h-full flex-1 bg-[#ADD8E6]" : "h-full flex-1 bg-[#87CEEB]"}></div>
            ))}
          </div>
        </div>
        
        <div 
          ref={vehicleRef}
          className="absolute bottom-20 transition-all duration-300"
          style={{ left: `${vehiclePosition}%`, transform: 'translateX(-50%)' }}
        >
          <AntarcticSnowmobile />
        </div>
        
        {gameElements.map((element) => {
          if (element.type === "theory") {
            const theory = antarcticContent.theoryBlocks.find(t => t.id === element.id);
            if (!theory) return null;
            
            return (
              <div 
                key={`theory-${element.id}`}
                className={cn(
                  "absolute bottom-24 p-4 rounded-lg shadow-lg w-[200px] h-[100px] flex items-center justify-center text-center cursor-pointer transition-colors",
                  element.passed 
                    ? "bg-[#87CEEB] text-white hover:bg-[#77B5FE]" 
                    : "bg-[#ADD8E6] text-white hover:bg-[#B0E2FF]"
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
        
        <button 
          onClick={handleBackToDesert}
          className="absolute bottom-8 left-8 bg-[#1EAEDB] hover:bg-[#0D8BBA] text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 z-10"
        >
          Back to Desert
        </button>
        
        <GameControls />
        
        {showStore && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <div className="bg-[#F0F8FF] text-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-center mb-6">Store</h3>
              <div className="text-xl text-center mb-6">Under Development</div>
              <div className="flex justify-center">
                <button 
                  onClick={toggleStore}
                  className="bg-[#1EAEDB] hover:bg-[#0D8BBA] text-white px-6 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTheory && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <AntarcticTheoryBlock 
              title={activeTheory.title}
              content={activeTheory.content}
              onClose={handleCloseElement}
            />
          </div>
        )}
        
        {activeQuiz && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <QuizBubble 
              questions={activeQuiz.questions}
              onClose={handleCloseElement}
              onComplete={handleQuizCompletion}
            />
          </div>
        )}
        
        {showCompletion && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <AntarcticCompletionMessage 
              onClose={() => setShowCompletion(false)}
              onProceed={handleProceedToLava}
            />
          </div>
        )}
        
        <HangmanGameModal
          open={showHangmanModal}
          onOpenChange={setShowHangmanModal}
        />
      </div>
    </div>
  );
};

export default Antarctic;
