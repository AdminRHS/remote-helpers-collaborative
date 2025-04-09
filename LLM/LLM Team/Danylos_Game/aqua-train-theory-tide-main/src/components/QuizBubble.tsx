
import React, { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  type: string;
}

interface QuizBubbleProps {
  questions: QuizQuestion[];
  onClose: () => void;
  onComplete?: (correctAnswers: number, totalQuestions: number) => void;
}

const QuizBubble: React.FC<QuizBubbleProps> = ({ questions, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [currentOrder, setCurrentOrder] = useState<string[]>([]);
  const [matches, setMatches] = useState<{[key: number]: number | null}>({});
  const [categories, setCategories] = useState<{[key: string]: string[]}>({});
  const [sequence, setSequence] = useState<string[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>([]);
  const [classificationItems, setClassificationItems] = useState<string[]>([]);
  const [itemCategories, setItemCategories] = useState<{[key: string]: string | null}>({});
  const [labelSelections, setLabelSelections] = useState<{[key: string]: string | null}>({});
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    resetQuestionState();
  }, [currentQuestionIndex]);

  useEffect(() => {
    setCompletedQuestions(Array(questions.length).fill(false));
  }, [questions]);
  
  const resetQuestionState = () => {
    const options = currentQuestion?.options || [];
    setSelectedOption(null);
    setIsAnswered(false);
    setDraggedItem(null);
    
    if (currentQuestion?.type === "matching") {
      const initialMatches: {[key: number]: number | null} = {};
      options.forEach((_, index) => {
        initialMatches[index] = null;
      });
      setMatches(initialMatches);
    } else if (currentQuestion?.type === "classification") {
      const parsedCategories: {[key: string]: string[]} = {};
      const allItems: string[] = [];
      const initialItemCategories: {[key: string]: string | null} = {};
      
      options.forEach(option => {
        const [category, itemsStr] = option.split(" → ");
        const items = itemsStr.split(", ");
        parsedCategories[category] = [];
        
        items.forEach(item => {
          allItems.push(item);
          initialItemCategories[item] = null;
        });
      });
      
      const shuffledItems = [...allItems].sort(() => Math.random() - 0.5);
      
      setCategories(parsedCategories);
      setClassificationItems(shuffledItems);
      setItemCategories(initialItemCategories);
    } else if (currentQuestion?.type === "labeling") {
      // Extract statements and components from the options
      const statements: string[] = [];
      const components: string[] = [];
      
      options.forEach(option => {
        const parts = option.split(" (");
        if (parts.length === 2) {
          const statement = parts[0];
          const component = parts[1].replace(")", "");
          
          statements.push(statement);
          if (!components.includes(component)) {
            components.push(component);
          }
        }
      });
      
      // Initialize label selections with null values
      const initialSelections: {[key: string]: string | null} = {};
      statements.forEach(statement => {
        initialSelections[statement] = null;
      });
      
      setLabelSelections(initialSelections);
      setAvailableLabels(components);
    } else if (currentQuestion?.type === "sequencing" || currentQuestion?.type === "ranking") {
      if (currentQuestion?.type === "sequencing") {
        setSequence([...options].sort(() => Math.random() - 0.5));
      } 
      if (currentQuestion?.type === "ranking") {
        setCurrentOrder([...options]);
      }
    }
  };
  
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null && currentQuestion?.type === "standard") return;
    if (currentQuestion?.type === "matching" && Object.values(matches).some(m => m === null)) return;
    if (currentQuestion?.type === "classification" && 
        Object.values(itemCategories).some(category => category === null)) return;
    if (currentQuestion?.type === "labeling" && 
        Object.values(labelSelections).some(label => label === null)) return;
    
    setIsAnswered(true);
    
    const wasCorrect = isCorrect();
    if (wasCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    
    const updatedCompleted = [...completedQuestions];
    updatedCompleted[currentQuestionIndex] = true;
    setCompletedQuestions(updatedCompleted);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (onComplete) {
        onComplete(correctAnswersCount, questions.length);
      }
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleDragStart = (e: React.DragEvent, item: string | number) => {
    setDraggedItem(typeof item === 'number' ? item : null);
    if (typeof item === 'string') {
      e.dataTransfer.setData('text/plain', item);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, dropIndex: number | string) => {
    e.preventDefault();
    
    if (currentQuestion?.type === "ranking" || currentQuestion?.type === "sequencing") {
      if (draggedItem === null || isAnswered) return;
      
      const items = currentQuestion.type === "ranking" ? [...currentOrder] : [...sequence];
      const draggedOption = items[draggedItem];
      
      items.splice(draggedItem, 1);
      items.splice(typeof dropIndex === 'number' ? dropIndex : 0, 0, draggedOption);
      
      if (currentQuestion?.type === "ranking") {
        setCurrentOrder(items);
      } else {
        setSequence(items);
      }
      setDraggedItem(null);
    } else if (currentQuestion?.type === "matching") {
      if (draggedItem === null || isAnswered || typeof dropIndex !== 'number') return;
      
      setMatches(prev => ({
        ...prev,
        [draggedItem]: dropIndex
      }));
      setDraggedItem(null);
    } else if (currentQuestion?.type === "classification") {
      const itemName = e.dataTransfer.getData('text/plain');
      if (!itemName || isAnswered || typeof dropIndex !== 'string') return;
      
      setItemCategories(prev => ({
        ...prev,
        [itemName]: dropIndex
      }));
    }
  };

  const handleLabelSelect = (statement: string, component: string) => {
    if (isAnswered) return;
    
    setLabelSelections(prev => ({
      ...prev,
      [statement]: component
    }));
  };
  
  const isRankingCorrect = () => {
    if (currentQuestion.type === "sequencing") {
      return true;
    }
    return JSON.stringify(currentOrder) === JSON.stringify(currentQuestion?.options[currentQuestion?.correctAnswer].split(", "));
  };
  
  const isMatchingCorrect = () => {
    return Object.entries(matches).every(([key, value]) => Number(key) === Number(value));
  };

  const isSequencingCorrect = () => {
    if (currentQuestion.correctAnswer >= currentQuestion.options.length) {
      return false;
    }
    const correctOrderString = currentQuestion.options[currentQuestion.correctAnswer];
    const correctOrder = correctOrderString.split(", ");
    return JSON.stringify(sequence) === JSON.stringify(correctOrder);
  };
  
  const isClassificationCorrect = () => {
    for (const option of currentQuestion.options) {
      const [category, itemsStr] = option.split(" → ");
      const expectedItems = itemsStr.split(", ");
      
      for (const item of expectedItems) {
        if (itemCategories[item] !== category) {
          return false;
        }
      }
    }
    return true;
  };

  const isLabelingCorrect = () => {
    // Extract the correct pairings from the options
    const correctPairs: {[key: string]: string} = {};
    
    currentQuestion.options.forEach(option => {
      const parts = option.split(" (");
      if (parts.length === 2) {
        const statement = parts[0];
        const component = parts[1].replace(")", "");
        correctPairs[statement] = component;
      }
    });
    
    // Check if all selections match the correct pairings
    for (const [statement, selectedComponent] of Object.entries(labelSelections)) {
      if (selectedComponent !== correctPairs[statement]) {
        return false;
      }
    }
    
    return true;
  };
  
  const renderStandardQuiz = () => {
    return (
      <div className="space-y-3 mb-6 max-h-[50vh] overflow-y-auto pr-2">
        {currentQuestion?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectOption(index)}
            disabled={isAnswered}
            className={`w-full p-3 rounded-md border-2 text-left transition-colors ${getOptionClassName(index)}`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };
  
  const renderRankingQuiz = () => {
    return (
      <div className="space-y-3 mb-6 max-h-[50vh] overflow-y-auto pr-2">
        <p className="text-white/80 mb-2">Drag and drop items to rank them in the correct order:</p>
        {currentOrder.map((option, index) => (
          <div
            key={index}
            draggable={!isAnswered}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`w-full p-3 rounded-md border-2 bg-white text-gray-800 flex items-center cursor-move ${isAnswered ? 
              (isRankingCorrect() ? "border-green-500" : "border-red-500") : 
              "border-gray-300 hover:border-[#FF719A]"}`}
          >
            <div className="mr-2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
              {index + 1}
            </div>
            {option}
          </div>
        ))}
      </div>
    );
  };
  
  const renderMatchingQuiz = () => {
    return (
      <div className="space-y-6 mb-6 max-h-[50vh] overflow-y-auto pr-2">
        <p className="text-white/80 mb-2">Drag items from left to right to match them correctly:</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const itemName = option.split(" →")[0];
              return (
                <div
                  key={`source-${index}`}
                  draggable={!isAnswered && !Object.values(matches).includes(index)}
                  onDragStart={(e) => handleDragStart(e, index)}
                  className={`p-3 rounded-md border-2 bg-white text-gray-800 cursor-move ${
                    isAnswered ? 
                    (isMatchingCorrect() ? "border-green-500" : "border-red-500") : 
                    Object.values(matches).includes(index) ? "opacity-50 cursor-not-allowed" : "border-gray-300 hover:border-[#FF719A]"
                  }`}
                >
                  {itemName}
                </div>
              );
            })}
          </div>
          
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const description = option.split(" → ")[1] || option;
              const matchedItemIndex = Object.entries(matches).find(([_, val]) => val === index)?.[0];
              const matchedItem = matchedItemIndex !== undefined ? currentQuestion.options[parseInt(matchedItemIndex)].split(" →")[0] : null;
              
              return (
                <div
                  key={`target-${index}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`p-3 rounded-md border-2 border-dashed min-h-[60px] ${
                    isAnswered ? 
                    (isMatchingCorrect() ? "border-green-500 bg-green-100/20" : "border-red-500 bg-red-100/20") : 
                    matchedItem ? "border-[#FF719A] bg-[#FF719A]/10" : "border-gray-300 bg-gray-100/20"
                  }`}
                >
                  <p className="text-sm text-gray-200">{description}</p>
                  {matchedItem && (
                    <div className="mt-2 p-2 bg-white text-gray-800 rounded border border-gray-300">
                      {matchedItem}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderLabelingQuiz = () => {
    // Extract statements from the options
    const statements: string[] = [];
    
    currentQuestion?.options.forEach(option => {
      const parts = option.split(" (");
      if (parts.length === 2) {
        statements.push(parts[0]);
      }
    });

    return (
      <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-2">
        <p className="text-white/80 mb-2">For each statement, select the correct training component:</p>
        
        {statements.map((statement, index) => (
          <div 
            key={`labeling-${index}`}
            className={`p-3 rounded-md border-2 ${
              isAnswered ? (
                labelSelections[statement] === null ? "border-gray-300 bg-white" :
                isLabelingCorrect() ? "border-green-500 bg-green-100/20" : "border-red-500 bg-red-100/20"
              ) : "border-gray-300 bg-white"
            }`}
          >
            <p className="mb-2 text-gray-800">{statement}</p>
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-gray-800">Component:</span>
              <div className="flex gap-2 flex-wrap">
                {availableLabels.map((component, compIndex) => (
                  <button
                    key={`component-${compIndex}`}
                    onClick={() => handleLabelSelect(statement, component)}
                    disabled={isAnswered}
                    className={`px-3 py-1 text-sm rounded-full ${
                      isAnswered ? (
                        labelSelections[statement] === component ? (
                          isLabelingCorrect() ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        ) : "bg-gray-300 text-gray-700"
                      ) : (
                        labelSelections[statement] === component ? 
                        "bg-[#FF719A] text-white" : 
                        "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      )
                    }`}
                  >
                    {component}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderClassificationQuiz = () => {
    const categoryNames = Object.keys(categories);
    
    return (
      <div className="space-y-6 mb-6 max-h-[60vh] overflow-y-auto pr-2">
        <p className="text-white/80 mb-2">Drag each item to its correct category:</p>
        
        <div className="grid grid-cols-3 gap-4">
          {categoryNames.map((category, categoryIndex) => (
            <div key={`category-${categoryIndex}`} className="bg-white/10 rounded-md p-4">
              <h3 className="font-bold text-center mb-3 text-white">{category}</h3>
              <div 
                className="min-h-[200px] border-2 border-dashed border-gray-400 rounded-md p-2 flex flex-col gap-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category)}
              >
                {Object.entries(itemCategories)
                  .filter(([_, assignedCategory]) => assignedCategory === category)
                  .map(([item, _]) => (
                    <div 
                      key={`categorized-${item}`}
                      className={`p-2 bg-white text-gray-800 rounded border ${
                        isAnswered ? (
                          isClassificationCorrect() ? "border-green-500" : "border-red-500"
                        ) : "border-gray-300"
                      } cursor-move`}
                      draggable={!isAnswered}
                      onDragStart={(e) => handleDragStart(e, item)}
                    >
                      {item}
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/20 p-4 rounded-md">
          <h3 className="font-bold mb-3 text-center text-white">Items to Classify</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {classificationItems.map((item, index) => {
              if (itemCategories[item] === null) {
                return (
                  <div 
                    key={`item-${index}`}
                    className="p-2 bg-white text-gray-800 rounded border border-gray-300 cursor-move"
                    draggable={!isAnswered}
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    {item}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderSequencingQuiz = () => {
    return (
      <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto pr-2">
        <p className="text-white/80 mb-2">Drag and drop items to create the correct sequence:</p>
        {sequence.map((item, index) => (
          <div
            key={index}
            draggable={!isAnswered}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`w-full p-3 rounded-md border-2 bg-white text-gray-800 flex items-center cursor-move ${isAnswered ? 
              (isSequencingCorrect() ? "border-green-500" : "border-red-500") : 
              "border-gray-300 hover:border-[#FF719A]"}`}
          >
            <div className="mr-2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
              {index + 1}
            </div>
            {item}
          </div>
        ))}
      </div>
    );
  };
  
  const getOptionClassName = (index: number) => {
    if (!isAnswered) {
      return selectedOption === index 
        ? "bg-[#FF719A] border-[#FF719A] text-white" 
        : "bg-white border-gray-300 text-gray-800 hover:border-[#FF719A]";
    } else {
      if (index === currentQuestion?.correctAnswer) {
        return "bg-green-500 border-green-500 text-white";
      } else if (index === selectedOption) {
        return "bg-red-500 border-red-500 text-white";
      } else {
        return "bg-white border-gray-300 text-gray-400";
      }
    }
  };

  const renderQuizType = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case "standard":
        return renderStandardQuiz();
      case "ranking":
        return renderRankingQuiz();
      case "matching":
        return renderMatchingQuiz();
      case "classification":
        return renderClassificationQuiz();
      case "sequencing":
        return renderSequencingQuiz();
      case "labeling":
        return renderLabelingQuiz();
      default:
        return renderStandardQuiz();
    }
  };
  
  const isCorrect = () => {
    if (!currentQuestion) return false;
    
    switch (currentQuestion.type) {
      case "standard":
        return selectedOption === currentQuestion.correctAnswer;
      case "ranking":
        return isRankingCorrect();
      case "matching":
        return isMatchingCorrect();
      case "sequencing":
        return isSequencingCorrect();
      case "classification":
        return isClassificationCorrect();
      case "labeling":
        return isLabelingCorrect();
      default:
        return false;
    }
  };

  const renderProgressIndicators = () => {
    return (
      <div className="flex justify-center mb-4 gap-2">
        {questions.map((_, index) => (
          <button 
            key={`progress-${index}`}
            onClick={() => !isAnswered && setCurrentQuestionIndex(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${currentQuestionIndex === index ? 'bg-[#FF719A] text-white' : 
                completedQuestions[index] ? 'bg-green-500 text-white' : 'bg-white/20 text-white'}`}
            disabled={isAnswered}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-[#E53935] text-white rounded-lg shadow-xl p-6 max-w-4xl w-full animate-fade-in relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
      >
        <X size={24} />
      </button>
      
      <h3 className="text-2xl font-bold mb-4">Quiz</h3>
      
      {renderProgressIndicators()}
      
      <p className="text-lg mb-6">{currentQuestion?.question}</p>
      
      {renderQuizType()}
      
      {isAnswered ? (
        <div className="mt-4">
          <p className={`text-lg font-bold ${isCorrect() ? "text-green-300" : "text-red-300"}`}>
            {isCorrect() ? "Correct! Well done." : "Incorrect. Try again!"}
          </p>
          <div className="mt-4 flex justify-between">
            {currentQuestionIndex > 0 && (
              <button 
                onClick={handlePrevious}
                className="bg-white/20 text-white px-4 py-2 rounded-md font-bold hover:bg-white/30 transition-all flex items-center"
              >
                <ArrowLeft size={16} className="mr-1" />
                Previous
              </button>
            )}
            <div className="flex-1"></div>
            <button 
              onClick={handleNext}
              className="bg-white text-[#E53935] px-4 py-2 rounded-md font-bold hover:bg-opacity-90 transition-all flex items-center"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next
                  <ArrowRight size={16} className="ml-1" />
                </>
              ) : (
                "Complete Quiz"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <button 
            onClick={handleSubmit}
            disabled={(currentQuestion?.type === "standard" && selectedOption === null) || 
                     (currentQuestion?.type === "matching" && Object.values(matches).some(m => m === null)) ||
                     (currentQuestion?.type === "classification" && Object.values(itemCategories).some(c => c === null)) ||
                     (currentQuestion?.type === "labeling" && Object.values(labelSelections).some(l => l === null))}
            className={`px-4 py-2 rounded-md font-bold transition-all ${
              ((currentQuestion?.type === "standard" && selectedOption === null) || 
               (currentQuestion?.type === "matching" && Object.values(matches).some(m => m === null)) ||
               (currentQuestion?.type === "classification" && Object.values(itemCategories).some(c => c === null)) ||
               (currentQuestion?.type === "labeling" && Object.values(labelSelections).some(l => l === null)))
                ? "bg-gray-400 text-white/70 cursor-not-allowed" 
                : "bg-white text-[#E53935] hover:bg-opacity-90"
            }`}
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizBubble;
