import { create } from 'zustand';
import { TransformationSettings, TransformationResult, AIResponse } from '../types';

interface AppState {
  inputText: string;
  settings: TransformationSettings;
  results: TransformationResult[];
  isTransforming: boolean;
  error: string | null;
  logs: string[];
  
  setInputText: (text: string) => void;
  setSettings: (settings: Partial<TransformationSettings>) => void;
  addResult: (result: TransformationResult) => void;
  setIsTransforming: (val: boolean) => void;
  setError: (err: string | null) => void;
  addLog: (log: string) => void;
  clearHistory: () => void;
  clearLogs: () => void;
}

export const useStore = create<AppState>((set) => ({
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
  error: null,
  logs: [],

  setInputText: (text) => set({ inputText: text }),
  setSettings: (newSettings) => set((state) => ({ 
    settings: { ...state.settings, ...newSettings } 
  })),
  addResult: (result) => set((state) => ({ 
    results: [result, ...state.results].slice(0, 50) 
  })),
  setIsTransforming: (val) => set({ isTransforming: val }),
  setError: (err) => set({ error: err }),
  addLog: (log) => {
    const timestamp = new Date().toLocaleTimeString();
    const formattedLog = `[${timestamp}] ${log}`;
    console.log(formattedLog);
    set((state) => ({ logs: [...state.logs, formattedLog].slice(-100) }));
  },
  clearHistory: () => set({ results: [] }),
  clearLogs: () => set({ logs: [] }),
}));
