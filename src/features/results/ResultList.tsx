import React from 'react';
import { useStore } from '../../store/useStore';
import { ResultCard } from './ResultCard';

export function ResultList() {
  const results = useStore((state) => state.results);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em]">Результаты генерации</h3>
      </div>
      {results.map((result) => (
        <ResultCard key={result.timestamp} result={result} />
      ))}
    </div>
  );
}
