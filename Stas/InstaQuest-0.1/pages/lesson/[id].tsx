import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSwipeable } from 'react-swipeable';
import { prisma } from '../../lib/prisma';
import Screen from '../../components/Screen';
import ProgressBar from '../../components/ProgressBar';
import confetti from 'canvas-confetti';

interface Lesson {
  id: string;
  title: string;
  screens: string; // JSON string
  progress?: {
    completedScreens: string; // JSON string
    quizStats: string; // JSON string
    createdAt: string; // ISO string
  } | null;
}

interface LessonPageProps {
  lesson: Lesson;
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.id },
    include: {
      progress: {
        where: {
          userId: '1', // Hardcoded for MVP
        },
      },
    },
  });

  if (!lesson) {
    return {
      notFound: true,
    };
  }

  // Создаем новый объект без progress, если его нет
  const lessonData = {
    id: lesson.id,
    title: lesson.title,
    screens: lesson.screens,
    progress: lesson.progress[0] ? {
      completedScreens: lesson.progress[0].completedScreens,
      quizStats: lesson.progress[0].quizStats,
      createdAt: lesson.progress[0].createdAt.toISOString(),
    } : null,
  };

  return {
    props: {
      lesson: lessonData,
    },
  };
}

const LessonPage: React.FC<LessonPageProps> = ({ lesson }) => {
  const router = useRouter();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [screens, setScreens] = useState<any[]>([]);
  const [completedScreens, setCompletedScreens] = useState<number[]>([]);

  useEffect(() => {
    setScreens(JSON.parse(lesson.screens));
    if (lesson.progress?.completedScreens) {
      setCompletedScreens(JSON.parse(lesson.progress.completedScreens));
    }
  }, [lesson]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        handleSwipe(event.key === 'ArrowUp' ? 'up' : 'down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreenIndex, screens.length, completedScreens]);

  const handleSwipe = (direction: string) => {
    if (direction === 'up' && currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
      if (!completedScreens.includes(currentScreenIndex)) {
        setCompletedScreens([...completedScreens, currentScreenIndex]);
        updateProgress([...completedScreens, currentScreenIndex]);
      }
    } else if (direction === 'down' && currentScreenIndex > 0) {
      setCurrentScreenIndex(currentScreenIndex - 1);
    }
  };

  const updateProgress = async (newCompletedScreens: number[]) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          completedScreens: JSON.stringify(newCompletedScreens),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      // Если это последний экран, запускаем конфетти
      if (currentScreenIndex === screens.length - 1) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    trackMouse: true,
    delta: 50,
  });

  if (!screens.length) {
    return <div>Loading...</div>;
  }

  const currentScreen = screens[currentScreenIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      <ProgressBar current={currentScreenIndex} total={screens.length} />
      <div 
        {...handlers}
        className="h-[calc(100vh-4rem)] touch-none"
        style={{ touchAction: 'none' }}
      >
        <Screen
          type={currentScreen.type}
          content={currentScreen.content}
          onComplete={() => {
            if (!completedScreens.includes(currentScreenIndex)) {
              setCompletedScreens([...completedScreens, currentScreenIndex]);
              updateProgress([...completedScreens, currentScreenIndex]);
            }
          }}
          title={lesson.title}
        />
      </div>
    </div>
  );
};

export default LessonPage; 