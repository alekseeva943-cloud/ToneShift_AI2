import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TransformationSettings, TransformationResult, AIResponse } from '../types';

interface AppState {
  inputText: string;
  settings: TransformationSettings;
  results: TransformationResult[];
  isTransforming: boolean;
  thinkingStep: number;
  error: string | null;
  logs: string[];
  
  setInputText: (text: string) => void;
  setSettings: (settings: Partial<TransformationSettings>) => void;
  addResult: (result: TransformationResult) => void;
  setIsTransforming: (val: boolean, step?: number) => void;
  setThinkingStep: (step: number) => void;
  setError: (err: string | null) => void;
  addLog: (log: string) => void;
  clearHistory: () => void;
  clearLogs: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      inputText: '',
      settings: {
        goal: 'explain',
        audience: 'business',
        tone: 'professional',
        formality: 70,
        length: 'balanced',
        terminology: 'standard',
        intensity: 50,
      },
      results: [],
      isTransforming: false,
      thinkingStep: 0,
      error: null,
      logs: [],

      setInputText: (text) => set({ inputText: text }),
      setSettings: (newSettings) => set((state) => ({ 
        settings: { ...state.settings, ...newSettings } 
      })),
      addResult: (result) => set((state) => ({ 
        results: [result, ...state.results].slice(0, 50) 
      })),
      setIsTransforming: (val, step = 0) => set({ isTransforming: val, thinkingStep: step }),
      setThinkingStep: (step) => set({ thinkingStep: step }),
      setError: (err) => set({ error: err }),
      addLog: (log) => {
        const timestamp = new Date().toLocaleTimeString();
        const formattedLog = `[${timestamp}] ${log}`;
        console.log(formattedLog);
        set((state) => ({ logs: [...state.logs, formattedLog].slice(-100) }));
      },
      clearHistory: () => set({ results: [] }),
      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: 'tonecraft-storage',
      partialize: (state) => ({ results: state.results, settings: state.settings }),
    }
  )
);
