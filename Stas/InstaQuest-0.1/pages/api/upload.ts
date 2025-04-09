import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50MB
    });

    // Создаем директорию для загрузок, если её нет
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file as formidable.File;
    if (!file) {
      return res.status(400).json({ message: 'Файл не был загружен' });
    }

    const filePath = file.filepath;
    const fileName = file.newFilename;
    const fileType = file.mimetype;

    // Проверяем тип файла
    if (!fileType?.startsWith('image/') && !fileType?.startsWith('video/') && !fileType?.startsWith('audio/')) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'Неподдерживаемый тип файла' });
    }

    // Формируем URL для доступа к файлу
    const fileUrl = `/uploads/${fileName}`;

    res.status(200).json({
      url: fileUrl,
      type: fileType,
      name: fileName,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Ошибка при загрузке файла' });
  }
} 