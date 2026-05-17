import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Terminal, Trash2, X } from 'lucide-react';
import { Button } from './ui/button';

export function DebugPanel() {
  const { logs, clearLogs } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(true);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) {
    return (
      <Button 
        className="fixed bottom-4 right-4 z-[9999] rounded-full w-12 h-12 shadow-2xl bg-indigo-600 hover:bg-indigo-700 p-0"
        onClick={() => setIsOpen(true)}
      >
        <Terminal className="w-5 h-5 text-white" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-[450px] max-w-[90vw] h-[400px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden font-mono text-[10px]">
      <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-300 font-bold uppercase tracking-wider">DEBUG TRACE CONSOLE</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearLogs}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-500 hover:text-slate-200 transition-colors"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-500 hover:text-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 space-y-1 bg-black/30"
      >
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">No logs yet. Try performing an action.</div>
        ) : (
          logs.map((log, i) => {
             const isError = log.includes('ERROR') || log.includes('FATAL') || log.includes('Failed');
             const isService = log.includes('[SERVICE]');
             const isUI = log.includes('[UI]');
             
             return (
               <div key={i} className={`py-0.5 leading-tight break-all border-l-2 pl-2 ${
                 isError ? 'text-red-400 border-red-500 bg-red-500/10' : 
                 isService ? 'text-indigo-300 border-indigo-500' :
                 isUI ? 'text-emerald-300 border-emerald-500' :
                 'text-slate-400 border-slate-700'
               }`}>
                 {log}
               </div>
             );
          })
        )}
      </div>

      <div className="bg-slate-900/50 p-2 text-[9px] text-slate-500 border-t border-slate-800 flex justify-between">
        <span>VERCEL_ENV: {window.location.hostname.includes('vercel') ? 'PROD' : 'DEV'}</span>
        <span>AGENT_INSTRUMENTED: YES</span>
      </div>
    </div>
  );
}
