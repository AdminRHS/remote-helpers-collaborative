import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import { useRouter } from 'next/router';
import StyledCard from '../components/StyledCard';

interface UserProgress {
  completedScreens: string;
  quizStats: string;
  createdAt: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  screens: any[];
  progress: UserProgress | null;
  createdAt: string;
}

interface HomeProps {
  lessons: Lesson[];
}

export default function Home({ lessons }: HomeProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="text-3xl flex-1 text-center">
          <span className="font-bold cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push('/')}>
            <span className="text-[#FF6B48]">Insta</span>
            <span className="text-white">Quest</span>
          </span>
        </div>
      </div>
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <StyledCard key={lesson.id} variant="primary" size="medium">
              <div 
                className="cursor-pointer h-full"
                onClick={() => router.push(`/lesson/${lesson.id}`)}
              >
                <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
                <p className="text-gray-300 mb-4">{lesson.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Слайдов: {lesson.screens.length}</span>
                  <span>Прогресс: {lesson.progress?.completedScreens 
                    ? Math.round((JSON.parse(lesson.progress.completedScreens).length / lesson.screens.length) * 100)
                    : 0}%</span>
                </div>
              </div>
            </StyledCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const lessons = await prisma.lesson.findMany({
    include: {
      progress: {
        where: {
          userId: '1', // Hardcoded for MVP
        },
      },
    },
  });

  // Преобразуем данные в сериализуемый формат
  const serializedLessons = lessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    screens: lesson.screens,
    createdAt: lesson.createdAt.toISOString(),
    progress: lesson.progress[0] ? {
      completedScreens: lesson.progress[0].completedScreens,
      quizStats: lesson.progress[0].quizStats,
      createdAt: lesson.progress[0].createdAt.toISOString(),
    } : null,
  }));

  return {
    props: {
      lessons: serializedLessons,
    },
  };
}; 