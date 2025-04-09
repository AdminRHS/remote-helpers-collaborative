import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Очищаем существующие данные
  await prisma.userProgress.deleteMany();
  await prisma.lesson.deleteMany();

  // Создаем первый урок
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Основы',
      screens: JSON.stringify([
        {
          type: 'learning',
          content: 'Добро пожаловать в основы!',
          slides: ['Слайд 1', 'Слайд 2']
        },
        {
          type: 'fact',
          content: 'Обучение - это весело!'
        },
        {
          type: 'image',
          content: 'example.jpg',
          caption: 'Посмотрите на это!'
        },
        {
          type: 'video',
          content: 'video.mp4'
        },
        {
          type: 'case',
          content: 'Клиент просит о помощи?',
          options: ['Да', 'Нет', 'Возможно'],
          correct: 0
        },
        {
          type: 'audio',
          content: 'audio.mp3'
        },
        {
          type: 'quiz',
          content: 'Какой первый шаг?',
          options: ['Начать', 'Подождать', 'Спросить'],
          correct: 0
        },
        {
          type: 'extra',
          content: 'Начать означает действовать!'
        }
      ])
    }
  });

  // Создаем второй урок
  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Следующие шаги',
      screens: JSON.stringify([
        {
          type: 'learning',
          content: 'Продолжаем обучение!',
          slides: ['Слайд 1']
        },
        {
          type: 'fact',
          content: 'Практика делает совершенным!'
        },
        {
          type: 'quiz',
          content: 'Что самое важное?',
          options: ['Знания', 'Опыт', 'Уверенность'],
          correct: 0
        },
        {
          type: 'image',
          content: 'example2.jpg',
          caption: 'Пример из практики'
        },
        {
          type: 'audio',
          content: 'audio2.mp3'
        }
      ])
    }
  });

  console.log('База данных успешно инициализирована');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 