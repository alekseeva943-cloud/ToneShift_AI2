import React from 'react';
import { useStore } from '../../store/useStore';
import { ResultCard } from './ResultCard';

export function ResultList() {
  const results = useStore((state) => state.results);

  console.log('Rendering ResultList with data:', results);

  return (
    <div className="space-y-6 p-6 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">DEBUG: RAW API RESPONSES</h3>
      </div>
      {results.map((result, idx) => (
        <div key={result.timestamp} className="mb-8 last:mb-0">
          <div className="text-indigo-400 mb-2 font-bold"># {idx + 1} - {new Date(result.timestamp).toLocaleTimeString()}</div>
          <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap decoration-none">
            {JSON.stringify(result.transformed, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
