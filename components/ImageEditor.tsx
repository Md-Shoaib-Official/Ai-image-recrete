
import React from 'react';
import type { EditedImage } from '../types';
import { Spinner } from './Spinner';

interface ImageEditorProps {
  originalImage: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
  onEnhance: () => void;
  onReset: () => void;
  result: EditedImage | null;
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
  "AI is working its magic...",
  "Enhancing your photo...",
  "Generating pixels...",
  "Just a moment...",
  "Brewing up an image...",
];

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean; }> = ({ onClick, children, className = '', disabled=false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
        {children}
    </button>
);


export const ImageEditor: React.FC<ImageEditorProps> = ({
  originalImage,
  prompt,
  setPrompt,
  onEnhance,
  onReset,
  result,
  isLoading,
  error,
}) => {
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side: Controls */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col gap-6 h-fit">
                <h2 className="text-2xl font-bold text-cyan-300">Enhance Your Image</h2>
                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                        Describe your edit
                    </label>
                    <textarea
                        id="prompt"
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500 transition-colors"
                        placeholder="e.g., 'Add a starry night background' or 'make it look like a watercolor painting'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="space-y-3">
                    <ActionButton onClick={onEnhance} disabled={isLoading || !prompt.trim()} className="bg-cyan-600 hover:bg-cyan-500">
                        {isLoading ? <><Spinner /> Enhancing...</> : 'Enhance Image'}
                    </ActionButton>
                    <ActionButton onClick={onReset} className="bg-gray-600 hover:bg-gray-500">
                        Start Over
                    </ActionButton>
                </div>
            </div>

            {/* Right side: Image Display */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="aspect-square w-full bg-gray-900 rounded-md flex items-center justify-center overflow-hidden">
                    {isLoading && (
                        <div className="text-center">
                            <Spinner size="lg" />
                            <p className="mt-4 text-gray-400">{randomMessage}</p>
                        </div>
                    )}
                    {error && !isLoading && (
                        <div className="p-4 text-center text-red-400">
                            <h3 className="font-bold mb-2">Oh no!</h3>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                    {!isLoading && !error && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
                            <div className="flex flex-col items-center">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Original</h3>
                                <img src={originalImage} alt="Original" className="object-contain max-h-full max-w-full rounded-md"/>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Enhanced</h3>
                                {result?.image ? (
                                    <img src={result.image} alt="Enhanced by AI" className="object-contain max-h-full max-w-full rounded-md"/>
                                ) : (
                                    <div className="w-full h-full bg-gray-800 rounded-md flex items-center justify-center text-gray-500">Result will appear here</div>
                                )}
                            </div>
                         </div>
                    )}
                </div>
                {result && (
                    <div className="mt-4">
                        {result.text && (
                            <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                                <p className="text-gray-300 italic">{result.text}</p>
                            </div>
                        )}
                        {result.image && (
                            <a 
                                href={result.image} 
                                download={`enhanced-image-${Date.now()}.png`}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-md transition-all duration-300 bg-indigo-600 hover:bg-indigo-500"
                            >
                                Download Image
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
