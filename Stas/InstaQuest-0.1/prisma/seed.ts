import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Очищаем существующие данные
    await prisma.userProgress.deleteMany()
    await prisma.lesson.deleteMany()

    // Создаем уроки
    const lesson1 = await prisma.lesson.create({
      data: {
        title: 'Основы',
        description: 'Изучите основы работы с Instagram',
        screens: JSON.stringify([
          {
            type: 'learning',
            content: 'Добро пожаловать в InstaQuest! Давайте начнем с основ.',
          },
          {
            type: 'fact',
            content: 'Instagram был создан в 2010 году Кевином Систромом и Майком Кригером.',
          },
          {
            type: 'image',
            content: 'https://example.com/instagram-history.jpg',
          },
          {
            type: 'video',
            content: 'https://example.com/instagram-tutorial.mp4',
          },
          {
            type: 'case',
            content: 'Как бы вы поступили в ситуации, когда клиент просит опубликовать контент, который нарушает правила Instagram?',
          },
          {
            type: 'audio',
            content: 'https://example.com/instagram-tips.mp3',
          },
          {
            type: 'quiz',
            content: {
              question: 'Какая максимальная длительность видео в Instagram Stories?',
              options: ['15 секунд', '30 секунд', '60 секунд', '90 секунд'],
              correctAnswer: 0,
            },
          },
        ]),
      },
    })

    const lesson2 = await prisma.lesson.create({
      data: {
        title: 'Следующие шаги',
        description: 'Продвинутые техники для Instagram',
        screens: JSON.stringify([
          {
            type: 'learning',
            content: 'Теперь, когда вы освоили основы, давайте углубимся в детали.',
          },
          {
            type: 'fact',
            content: 'Instagram Stories просматриваются более 500 миллионов раз в день.',
          },
          {
            type: 'image',
            content: 'https://example.com/instagram-stats.jpg',
          },
          {
            type: 'video',
            content: 'https://example.com/instagram-advanced.mp4',
          },
          {
            type: 'case',
            content: 'Разработайте стратегию для увеличения вовлеченности в Instagram Stories.',
          },
          {
            type: 'audio',
            content: 'https://example.com/instagram-strategy.mp3',
          },
          {
            type: 'quiz',
            content: {
              question: 'Сколько хэштегов можно использовать в одном посте Instagram?',
              options: ['10', '20', '30', '40'],
              correctAnswer: 2,
            },
          },
        ]),
      },
    })

    const lesson3 = await prisma.lesson.create({
      data: {
        title: 'Искусство промптов',
        screens: JSON.stringify([
          // Экран 1: Обучающий пост (карусель)
          {
            type: 'text',
            content: {
              text: 'ИИ — это технология, которая учится на данных и выполняет задачи, требующие человеческого мышления: отвечает на вопросы, генерирует тексты и не только.',
              style: {
                background: 'linear-gradient(to bottom, #f5e1ff, #d9c2ff)',
                fontSize: '1.5rem',
                icon: '/uploads/robot-icon.png'
              }
            }
          },
          {
            type: 'learning',
            content: 'Чтобы общаться с ИИ, мы используем промты — запросы или инструкции, которые задаём ему.',
          },
          {
            type: 'text',
            content: {
              text: 'Качество промта определяет качество ответа. Давай разберёмся, как делать их правильно!',
              style: {
                background: 'linear-gradient(to bottom, #f5e1ff, #d9c2ff)',
                fontSize: '1.5rem',
                icon: '/uploads/robot-icon.png'
              }
            }
          },
          // Экран 2: Интересный факт
          {
            type: 'fact',
            content: 'ИИ обрабатывает информацию в тысячи раз быстрее человека, но без чётких указаний он может выдать что-то странное. Всё зависит от вас!',
          },
          // Экран 3: Картинка с примером
          {
            type: 'image',
            content: {
              url: '/uploads/ai-chat-example.png',
              caption: 'Человек общается с ИИ в чате. Промт: "Что такое ИИ?" Ответ ИИ: "ИИ — это искусственный интеллект, который имитирует человеческое мышление."'
            }
          },
          // Экран 4: Обучающий пост
          {
            type: 'text',
            content: {
              text: 'Три правила хорошего промта:\nЯсность — избегай двусмысленности.\nКонкретность — указывай детали.\nКонтекст — дай ИИ информацию для работы.',
              style: {
                fontSize: '1.2rem'
              }
            }
          },
          // Экран 5: Кейс-стади
          {
            type: 'quiz',
            content: {
              question: 'Вы хотите, чтобы ИИ написал пост о кофе. Какой промт лучше?',
              options: [
                'Напиши про кофе.',
                'Напиши пост о кофе: расскажи о его видах, способах приготовления и добавь совет для кофеманов.',
                'Кофе — это вкусно.'
              ],
              correctAnswer: 1
            }
          },
          // Экран 6: Аудио-подкаст
          {
            type: 'audio',
            content: {
              url: '/uploads/prompt-podcast.mp3',
              caption: 'Привет! Чтобы ИИ понял вас, будьте максимально точны. Например, вместо "Расскажи о погоде" спросите "Какая погода будет в Москве завтра?" Это работает!'
            }
          },
          // Экран 7: Обучающий пост
          {
            type: 'text',
            content: {
              text: 'Ошибка новичков: слишком общие вопросы. "Расскажи о собаках" даст расплывчатый ответ. Лучше: "Опиши 3 популярные породы собак с их особенностями."',
              style: {
                fontSize: '1.2rem'
              }
            }
          },
          // Экран 8: Картинка с примером
          {
            type: 'image',
            content: {
              url: '/uploads/chat-comparison.png',
              caption: 'Два чата: слева плохой промт "Расскажи о собаках" и невнятный ответ, справа хороший промт "Опиши 3 популярные породы собак" и чёткий ответ.'
            }
          },
          // Экран 9: Видео
          {
            type: 'video',
            content: {
              url: '/uploads/prompt-video.mp4',
              caption: 'Короткое видео с анимацией: показаны плохой и хороший промты, объясняется разница.'
            }
          },
          // Экран 10: Тест
          {
            type: 'quiz',
            content: {
              question: 'Какой промт лучше для списка идей?',
              options: [
                'Дай идеи.',
                'Предложи 5 идей для ужина.',
                'Еда — это круто.'
              ],
              correctAnswer: 1
            }
          },
          // Экран 11: Дополнительный пост
          {
            type: 'text',
            content: {
              text: 'ИИ не догадается, что вы хотите. Добавьте детали в промт, чтобы получить точный ответ. Попробуй снова!',
              style: {
                background: '#ffe6e6',
                icon: '💡'
              }
            }
          },
          // Экран 12: Обучающий пост
          {
            type: 'text',
            content: {
              text: 'Техника: добавляй примеры. Вместо "Напиши письмо" попробуй "Напиши деловое письмо в стиле: Уважаемый Иван, рад сообщить..."',
              style: {
                fontSize: '1.2rem'
              }
            }
          },
          // Экран 13: Интересный факт
          {
            type: 'text',
            content: {
              text: 'ИИ не понимает сарказм. Промт "Ты же гений, расскажи всё!" может запутать его. Будьте проще!',
              style: {
                background: '#ffeb99',
                icon: '😊'
              }
            }
          },
          // Экран 14: Картинка с примером
          {
            type: 'image',
            content: {
              url: '/uploads/chat-icons.png',
              caption: 'Чат, где человек пишет: "Ты же гений, расскажи всё о мире!" ИИ отвечает: "Всё о мире — это слишком много данных."'
            }
          },
          // Экран 15: Тест
          {
            type: 'quiz',
            content: {
              question: 'Какой промт лучше для текста о лете?',
              options: [
                'Напиши про лето.',
                'Напиши текст о лете в стиле рассказа Чехова.',
                'Лето — это тепло.'
              ],
              correctAnswer: 1
            }
          }
        ])
      },
    })

    console.log('База данных успешно заполнена начальными данными')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 