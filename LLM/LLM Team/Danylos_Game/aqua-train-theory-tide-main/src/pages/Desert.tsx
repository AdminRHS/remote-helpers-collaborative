
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, AlertCircle } from "lucide-react";
import DesertTheoryBlock from "@/components/DesertTheoryBlock";
import DesertCompletionMessage from "@/components/DesertCompletionMessage";
import { cn } from "@/lib/utils";
import GameControls from "@/components/GameControls";
import { useExperience } from '@/context/ExperienceContext';
import DesertCar from '@/components/DesertCar';
import DesertMemoryGameModal from "@/components/DesertMemoryGameModal";

const desertContent = {
  theoryBlocks: [
    {
      id: 1,
      title: "RCT Framework Basics",
      content: "The framework consists of three key elements:\n\nRole: Specify the AI's role (e.g., \"Documentation Specialist\" when working with documents)\n\nContext: Provide relevant background information and specific requirements\n\nTask: Clearly state what needs to be done and in what format"
    },
    {
      id: 2,
      title: "Effective Prompting Principles",
      content: "Key principles:\n\nPrecision: Be specific in your requests (e.g., \"Create a summary of the meeting minutes in 5 bullet points\")\n\nContext relevance: Include relevant background information\n\nTask breakdown: Split complex requests into smaller steps\n\nIteration: Refine prompts based on results\n\nClear formatting: Define how you want the information presented"
    },
    {
      id: 3,
      title: "Document Processing",
      content: "prompt:\n\"As a Documentation Specialist, analyze this meeting transcript. Extract key decisions and action items. Format as a bulleted list.\"\n\nResult:\n• Project timeline: Approved Q2 start date\n• Budget allocation: Resources confirmed\n• Team structure: Roles defined\n• Next steps: Weekly progress reviews\n• Tools: Selected collaboration platform"
    },
    {
      id: 4,
      title: "Information Search",
      content: "prompt:\n\"As a Research Assistant, find relevant industry statistics for our quarterly report. Focus on market growth and trends.\"\n\nTable:\nCategory\tCurrent Value\tGrowth Rate\tSource\nMarket Size\t$5.2B\t12%\tIndustry Report\nUser Base\t2.5M\t15%\tAnalytics\nROI\t185%\t8%\tCustomer Data"
    },
    {
      id: 5,
      title: "Why This Works",
      content: "Clear roles: Specific AI expertise assignment\n\nDetailed context: Well-defined parameters\n\nStructured output: Organized information delivery\n\nThe RCT Framework helps employees maximize AI tool effectiveness across various work tasks."
    }
  ]
};

const Desert = () => {
  const navigate = useNavigate();
  const [showStore, setShowStore] = useState(false);
  const [activeTheoryId, setActiveTheoryId] = useState<number | null>(null);
  const [trainPosition, setTrainPosition] = useState(50);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [gameElements, setGameElements] = useState<Array<{id: number; position: number; passed: boolean}>>([]);
  const [finishLinePosition, setFinishLinePosition] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const { experience, addExperience } = useExperience();
  const [showMemoryGameModal, setShowMemoryGameModal] = useState(false);
  const [sideQuestPosition, setSideQuestPosition] = useState(0);
  
  useEffect(() => {
    const elements: Array<{id: number; position: number; passed: boolean}> = [];
    
    desertContent.theoryBlocks.forEach((block, index) => {
      elements.push({
        id: block.id,
        position: 300 + index * 500,
        passed: false
      });
    });
    
    const lastTheoryPosition = 300 + (desertContent.theoryBlocks.length - 1) * 500;
    const finishPos = lastTheoryPosition + 700;
    setFinishLinePosition(finishPos);
    
    // Calculate side quest position - halfway between the last theory and finish line
    const fifthTheoryPosition = elements.find(el => el.id === 5)?.position || lastTheoryPosition;
    const sideQuestPos = fifthTheoryPosition + (finishPos - fifthTheoryPosition) / 2;
    setSideQuestPosition(sideQuestPos);
    
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

  const handleBackToWater = () => {
    navigate('/underwater');
  };

  const toggleStore = () => {
    setShowStore(!showStore);
  };

  const handleElementClick = (id: number) => {
    setActiveTheoryId(id);
    
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
    setActiveTheoryId(null);
  };

  const handleProceedToAntarctic = () => {
    navigate('/antarctic');
  };

  const activeTheory = activeTheoryId 
    ? desertContent.theoryBlocks.find(block => block.id === activeTheoryId) 
    : null;

  return (
    <div className="w-full min-h-screen bg-[#E1C16E] flex flex-col items-center justify-center p-4">
      <div ref={gameAreaRef} className="w-full max-w-[1200px] h-[800px] bg-[#E1C16E] relative overflow-hidden border-b-8 border-[#C1A55E] rounded-lg">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#E1C16E]"
          style={{ backgroundPosition: `${backgroundPosition}px 0` }}
        ></div>
        
        <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
          <div className="bg-[#C1A55E]/80 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-yellow-300 font-bold">XP:</span>
            <span className="text-white font-bold">{experience}</span>
          </div>
          <button 
            onClick={toggleStore}
            className="bg-[#D4AF37] hover:bg-[#C1A55E] p-2 rounded-lg flex items-center gap-1"
          >
            <ShoppingBag size={20} className="text-white" />
            <span className="text-white font-bold">Store</span>
          </button>
        </div>
        
        <div className="absolute bottom-40 left-[20%] w-80 h-80 bg-[#D4AF37] clip-path-triangle"></div>
        <div className="absolute bottom-60 left-[40%] w-100 h-100 bg-[#D4AF37] clip-path-triangle"></div>
        <div className="absolute bottom-50 left-[60%] w-60 h-60 bg-[#D4AF37] clip-path-triangle"></div>
        <div className="absolute bottom-40 left-[80%] w-70 h-70 bg-[#D4AF37] clip-path-triangle"></div>
        
        <div className="absolute bottom-20 left-[70%] w-120 h-40 bg-[#D4AF37]"></div>
        
        <div className="absolute bottom-0 w-full h-40 bg-[#E1C16E] rounded-t-full"></div>
        
        <div 
          className="absolute bottom-40 z-10 cursor-pointer"
          style={{ left: sideQuestPosition + backgroundPosition }}
          onClick={() => setShowMemoryGameModal(true)}
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
        
        <div 
          className="absolute bottom-20 h-[120px] w-[10px] bg-gradient-to-b from-[#FFD700] to-[#FFA500]"
          style={{ left: finishLinePosition + backgroundPosition }}
        >
          <div className="absolute top-[-40px] left-[-45px] bg-[#FFD700] p-2 rounded-full">
            <span className="text-[#D4AF37] font-bold">FINISH</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full h-20 bg-[#C1A55E] flex items-center">
          <div className="w-full h-8 flex">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={cn(
                "h-full flex-1",
                i % 2 === 0 ? "bg-[#C1A55E]" : "bg-[#AD8C3E]"
              )}></div>
            ))}
          </div>
        </div>
        
        <div 
          ref={trainRef}
          className="absolute bottom-20 transition-all duration-300"
          style={{ left: `${trainPosition}%`, transform: 'translateX(-50%)' }}
        >
          <DesertCar />
        </div>
        
        {gameElements.map((element) => {
          const theory = desertContent.theoryBlocks.find(t => t.id === element.id);
          if (!theory) return null;
          
          return (
            <div 
              key={`theory-${element.id}`}
              className={cn(
                "absolute bottom-24 p-4 rounded-lg shadow-lg w-[200px] h-[100px] flex items-center justify-center text-center cursor-pointer transition-colors",
                element.passed 
                  ? "bg-[#B8962E] text-white hover:bg-[#A78420]" 
                  : "bg-[#C1A55E] text-white hover:bg-[#AD8C3E]"
              )}
              style={{ left: element.position + backgroundPosition }}
              onClick={() => handleElementClick(element.id)}
            >
              <p className="font-bold">{theory.title}</p>
            </div>
          );
        })}
        
        <button 
          onClick={handleBackToWater}
          className="absolute bottom-8 left-8 bg-[#D4AF37] hover:bg-[#B8962E] text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 z-10"
        >
          Back to Underwater World
        </button>
        
        <GameControls />
        
        {showStore && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <div className="bg-[#E1C16E] text-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-center mb-6">Store</h3>
              <div className="text-xl text-center mb-6">Under Development</div>
              <div className="flex justify-center">
                <button 
                  onClick={toggleStore}
                  className="bg-[#D4AF37] hover:bg-[#B8962E] text-white px-6 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTheory && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <DesertTheoryBlock 
              title={activeTheory.title}
              content={activeTheory.content}
              onClose={handleCloseTheory}
            />
          </div>
        )}
        
        {showCompletion && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <DesertCompletionMessage 
              onClose={() => setShowCompletion(false)}
              onProceed={handleProceedToAntarctic}
            />
          </div>
        )}
        
        <DesertMemoryGameModal
          open={showMemoryGameModal}
          onOpenChange={setShowMemoryGameModal}
        />
      </div>
    </div>
  );
};

export default Desert;
