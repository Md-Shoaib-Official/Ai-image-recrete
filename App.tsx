
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageEditor } from './components/ImageEditor';
import { editImage } from './services/geminiService';
import type { EditedImage } from './types';


export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [editedResult, setEditedResult] = useState<EditedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64Image: string) => {
    setOriginalImage(base64Image);
    setEditedResult(null);
    setError(null);
    setPrompt('');
  };

  const handleEnhance = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please provide an image and a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedResult(null);

    try {
      const result = await editImage(originalImage, prompt);
      setEditedResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to enhance image. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const handleReset = () => {
    setOriginalImage(null);
    setEditedResult(null);
    setError(null);
    setPrompt('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <ImageEditor
            originalImage={originalImage}
            prompt={prompt}
            setPrompt={setPrompt}
            onEnhance={handleEnhance}
            onReset={handleReset}
            result={editedResult}
            isLoading={isLoading}
            error={error}
          />
        )}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini Nano Banana</p>
      </footer>
    </div>
  );
}
