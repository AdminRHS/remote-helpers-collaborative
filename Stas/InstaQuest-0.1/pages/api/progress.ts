import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const progress = await prisma.userProgress.findMany({
        where: {
          userId: '1', // Hardcoded for MVP
        },
        include: {
          lesson: true,
        },
      });

      // Преобразуем JSON строки обратно в массивы/объекты
      const formattedProgress = progress.map(p => ({
        ...p,
        completedScreens: JSON.parse(p.completedScreens),
        quizStats: JSON.parse(p.quizStats)
      }));

      res.status(200).json(formattedProgress);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении прогресса' });
    }
  } else if (req.method === 'POST') {
    try {
      const { lessonId, completedScreens } = req.body;

      const progress = await prisma.userProgress.upsert({
        where: {
          userId_lessonId: {
            userId: '1', // Hardcoded for MVP
            lessonId,
          },
        },
        update: {
          completedScreens: JSON.stringify(completedScreens),
        },
        create: {
          userId: '1', // Hardcoded for MVP
          lessonId,
          completedScreens: JSON.stringify(completedScreens),
          quizStats: JSON.stringify({
            correct: 0,
            total: 0,
          }),
        },
      });

      // Преобразуем JSON строки обратно в массивы/объекты
      const formattedProgress = {
        ...progress,
        completedScreens: JSON.parse(progress.completedScreens),
        quizStats: JSON.parse(progress.quizStats)
      };

      res.status(200).json(formattedProgress);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при сохранении прогресса' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 