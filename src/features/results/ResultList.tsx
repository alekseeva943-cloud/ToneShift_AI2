import React from 'react';
import { useStore } from '../../store/useStore';
import { ResultCard } from './ResultCard';

import { motion, AnimatePresence } from 'framer-motion';

export function ResultList() {
  const { results, isTransforming, thinkingStep } = useStore();

  const thinkingStates = [
    "Анализируем смысл...",
    "Определяем аудиторию...",
    "Перестраиваем структуру...",
    "Адаптируем тональность...",
    "Финализируем текст..."
  ];

  return (
    <div className="space-y-8">
      <AnimatePresence mode="popLayout">
        {isTransforming && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="premium-card p-8 bg-white/80 backdrop-blur-md border border-neutral-100 rounded-3xl overflow-hidden relative shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg animate-pulse" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={thinkingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg font-bold text-neutral-800"
                  >
                    {thinkingStates[thinkingStep] || "Работаем..."}
                  </motion.div>
                </AnimatePresence>
                <div className="flex gap-1 justify-center">
                  {thinkingStates.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all duration-500 ${i <= thinkingStep ? 'w-4 bg-indigo-500' : 'w-2 bg-neutral-200'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        )}
        
        {results.map((result) => (
          <motion.div
            key={result.timestamp}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ResultCard result={result} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
