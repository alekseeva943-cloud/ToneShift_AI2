import React from 'react';
import { Sparkles, History, Settings2, Share2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useStore } from '../store/useStore';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="h-16 border-bottom bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 justify-between border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">ToneCraft AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 transition-all font-bold text-[10px] uppercase tracking-wider h-8"
            onClick={() => {
              if (confirm('Очистить всю историю трансформаций?')) {
                useStore.getState().clearHistory();
              }
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Очистить
          </Button>
          <div className="w-px h-4 bg-neutral-200" />
          <Button variant="outline" size="sm" className="gap-2 rounded-xl h-9 border-neutral-200 font-bold text-xs">
            <Share2 className="w-3.5 h-3.5" />
            Поделиться
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <footer className="py-6 px-6 border-t border-neutral-100 text-center text-sm text-neutral-400">
        © 2026 ToneCraft AI • Интеллектуальная адаптация текста
      </footer>
    </div>
  );
}
