import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';
import StyledCard from './StyledCard';

interface ScreenProps {
  type: 'text' | 'image' | 'video' | 'audio' | 'quiz' | 'learning' | 'fact' | 'case';
  content: any;
  onComplete: () => void;
  title: string;
}

const Screen: React.FC<ScreenProps> = ({ type, content, onComplete, title }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [quizState, setQuizState] = useState<{
    selectedAnswer?: number;
    isCorrect?: boolean;
    isWrong?: boolean;
  }>({});

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (type === 'text' && Array.isArray(content)) {
        if (currentSlide < content.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          onComplete();
        }
      } else {
        onComplete();
      }
    },
    onSwipedRight: () => {
      if (type === 'text' && Array.isArray(content)) {
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        }
      }
    },
    trackMouse: true,
    delta: 50,
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (type === 'text' && Array.isArray(content)) {
          if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
          }
        }
      } else if (e.key === 'ArrowRight') {
        if (type === 'text' && Array.isArray(content)) {
          if (currentSlide < content.length - 1) {
            setCurrentSlide(prev => prev + 1);
          } else {
            onComplete();
          }
        } else {
          onComplete();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, content, type, onComplete]);

  const handleQuizAnswer = (selectedIndex: number) => {
    if (selectedIndex === content.correctAnswer) {
      setQuizState({ selectedAnswer: selectedIndex, isCorrect: true });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => onComplete(), 1500);
    } else {
      setQuizState({ selectedAnswer: selectedIndex, isWrong: true });
      document.body.style.backgroundColor = '#FFE5E5';
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 1000);
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'text':
        if (Array.isArray(content)) {
          return (
            <StyledCard variant="primary" size="large">
              <div className="text-center">
                <div className="text-2xl mb-4">{content[currentSlide].text}</div>
                {content[currentSlide].style && (
                  <div style={content[currentSlide].style}>
                    {content[currentSlide].icon && (
                      <span className="text-4xl mb-4 block">{content[currentSlide].icon}</span>
                    )}
                  </div>
                )}
                <div className="mt-4 text-sm text-gray-300">
                  Слайд {currentSlide + 1} из {content.length}
                </div>
              </div>
            </StyledCard>
          );
        }
        return (
          <StyledCard variant="primary" size="large">
            <div className="text-center">
              <div className="text-2xl">{content.text}</div>
              {content.style && (
                <div style={content.style}>
                  {content.icon && (
                    <span className="text-4xl mb-4 block">{content.icon}</span>
                  )}
                </div>
              )}
            </div>
          </StyledCard>
        );

      case 'image':
        return (
          <StyledCard variant="primary" size="large" hasImage>
            <div className="text-center">
              <img
                src={content.url}
                alt={content.caption || 'Изображение'}
                className="max-w-full h-auto mx-auto rounded-xl shadow-lg"
                onError={() => {
                  console.error('Ошибка загрузки изображения:', content.url);
                  setImageError(true);
                }}
              />
              {content.caption && (
                <p className="mt-4 text-gray-200">{content.caption}</p>
              )}
              {imageError && (
                <p className="text-red-400 mt-2">Ошибка загрузки изображения</p>
              )}
            </div>
          </StyledCard>
        );

      case 'video':
        return (
          <StyledCard variant="primary" size="large" hasImage>
            <div className="text-center">
              <video
                src={content.url}
                controls
                className="max-w-full h-auto mx-auto rounded-xl shadow-lg"
                onError={() => {
                  console.error('Ошибка загрузки видео:', content.url);
                  setVideoError(true);
                }}
              />
              {content.caption && (
                <p className="mt-4 text-gray-200">{content.caption}</p>
              )}
              {videoError && (
                <p className="text-red-400 mt-2">Ошибка загрузки видео</p>
              )}
            </div>
          </StyledCard>
        );

      case 'audio':
        return (
          <StyledCard variant="accent" size="medium">
            <div className="text-center">
              <audio
                src={content.url}
                controls
                className="w-full mx-auto"
                onError={() => {
                  console.error('Ошибка загрузки аудио:', content.url);
                  setAudioError(true);
                }}
              />
              {content.caption && (
                <p className="mt-4 text-gray-200">{content.caption}</p>
              )}
              {audioError && (
                <p className="text-red-400 mt-2">Ошибка загрузки аудио</p>
              )}
            </div>
          </StyledCard>
        );

      case 'quiz':
        return (
          <StyledCard variant="accent" size="large">
            <div className="text-center">
              <h3 className="text-xl mb-6">{content.question}</h3>
              <div className="space-y-3">
                {content.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={quizState.selectedAnswer !== undefined}
                    className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-105
                      ${quizState.selectedAnswer === index 
                        ? quizState.isCorrect 
                          ? 'bg-green-500 text-white animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.5)]' 
                          : 'bg-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                        : 'bg-white/10 hover:bg-white/20'
                      }
                      ${quizState.isWrong && quizState.selectedAnswer === index ? 'animate-shake' : ''}
                      disabled:opacity-75 disabled:cursor-not-allowed
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </StyledCard>
        );

      case 'learning':
        return (
          <div className="relative">
            <div className="absolute -top-4 -left-4 z-10 w-48">
              <StyledCard variant="primary" size="small">
                <div className="text-left">
                  <span className="text-3xl font-bold text-[#FF6B48]">Learn!</span>
                </div>
              </StyledCard>
            </div>
            <StyledCard variant="primary" size="large" className="mt-8">
              <div className="text-center">
                <div className="text-2xl">{content}</div>
              </div>
            </StyledCard>
          </div>
        );

      case 'fact':
        return (
          <div className="relative">
            <div className="absolute -top-4 -left-4 z-10 w-48">
              <StyledCard variant="primary" size="small">
                <div className="text-left">
                  <span className="text-4xl mb-2 block">❗</span>
                  <span className="text-2xl font-bold text-[#FF6B48]">Interesting<br />fact</span>
                </div>
              </StyledCard>
            </div>
            <StyledCard variant="primary" size="large" className="mt-8">
              <div className="text-center">
                <div className="text-2xl">{content}</div>
              </div>
            </StyledCard>
          </div>
        );

      case 'case':
        return (
          <StyledCard variant="primary" size="large">
            <div className="text-center">
              <div className="text-2xl">{content}</div>
            </div>
          </StyledCard>
        );

      default:
        return (
          <StyledCard variant="primary" size="medium">
            <div>Неизвестный тип контента</div>
          </StyledCard>
        );
    }
  };

  return (
    <div
      {...handlers}
      className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="text-3xl flex-1 text-center">
          <span 
            className="font-bold cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >
            <span className="text-[#FF6B48]">Insta</span>
            <span className="text-white">Quest</span>
          </span>
          <span className="ml-2 font-normal text-xl text-gray-300">: {title}</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Screen; 