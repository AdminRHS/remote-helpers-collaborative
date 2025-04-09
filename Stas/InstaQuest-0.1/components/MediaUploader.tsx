import React, { useState } from 'react';

interface MediaUploaderProps {
  onUpload: (url: string, type: string) => void;
  type: 'image' | 'video' | 'audio';
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onUpload, type }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith(`${type}/`)) {
      setError(`Пожалуйста, загрузите файл типа ${type}`);
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке файла');
      }

      const data = await response.json();
      onUpload(data.url, data.type);
    } catch (err) {
      setError('Произошла ошибка при загрузке файла');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block w-full">
        <span className="sr-only">Выберите файл</span>
        <input
          type="file"
          accept={`${type}/*`}
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-50 file:text-purple-700
            hover:file:bg-purple-100"
        />
      </label>
      {isUploading && <p className="mt-2 text-sm text-gray-500">Загрузка...</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MediaUploader; 