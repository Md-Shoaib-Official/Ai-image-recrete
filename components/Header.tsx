
import React from 'react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.84 2.84l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.84 2.84l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.84-2.84l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.84-2.84l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036a.75.75 0 00.46.46l1.036.258a.75.75 0 010 1.456l-1.036.258a.75.75 0 00-.46.46l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a.75.75 0 00-.46-.46l-1.036-.258a.75.75 0 010-1.456l1.036-.258a.75.75 0 00.46-.46l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.551l.57 2.28a.75.75 0 00.46.46l2.28.57a.75.75 0 010 1.422l-2.28.57a.75.75 0 00-.46.46l-.57 2.28a.75.75 0 01-1.422 0l-.57-2.28a.75.75 0 00-.46-.46l-2.28-.57a.75.75 0 010-1.422l2.28-.57a.75.75 0 00.46-.46l.57-2.28A.75.75 0 0116.5 15z" clipRule="evenodd" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center gap-3">
        <SparklesIcon />
        <h1 className="text-2xl font-bold tracking-tight text-white">AI Photo Enhancer</h1>
      </div>
    </header>
  );
};
