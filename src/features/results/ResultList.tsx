import React from 'react';
import { useStore } from '../../store/useStore';
import { ResultCard } from './ResultCard';

import { motion, AnimatePresence } from 'framer-motion';

export function ResultList() {
  const { results, isTransforming } = useStore();

  return (
    <div className="space-y-8">
      <AnimatePresence mode="popLayout">
        {isTransforming && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="premium-card p-8 bg-white/50 backdrop-blur-md border border-neutral-100 rounded-3xl overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-6 bg-neutral-200 animate-pulse rounded-full" />
              <div className="w-24 h-6 bg-neutral-200 animate-pulse rounded-full" />
            </div>
            <div className="space-y-4">
              <div className="w-full h-8 bg-neutral-100 animate-pulse rounded-xl" />
              <div className="w-[90%] h-8 bg-neutral-100 animate-pulse rounded-xl" />
              <div className="w-[40%] h-8 bg-neutral-100 animate-pulse rounded-xl" />
            </div>
            <div className="mt-12 flex justify-between gap-8 pt-8 border-t border-neutral-100">
               <div className="flex-1 space-y-3">
                 <div className="w-24 h-4 bg-neutral-100 animate-pulse rounded-md" />
                 <div className="w-full h-16 bg-neutral-50/50 animate-pulse rounded-xl" />
               </div>
               <div className="flex-1 space-y-3">
                 <div className="w-24 h-4 bg-neutral-100 animate-pulse rounded-md" />
                 <div className="flex gap-2">
                    <div className="w-20 h-8 bg-neutral-50 animate-pulse rounded-lg" />
                    <div className="w-20 h-8 bg-neutral-50 animate-pulse rounded-lg" />
                    <div className="w-20 h-8 bg-neutral-50 animate-pulse rounded-lg" />
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
