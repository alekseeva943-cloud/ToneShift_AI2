import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { useStore } from './store/useStore';

// Global error handlers
window.onerror = function(message, source, lineno, colno, error) {
  const logMsg = `[GLOBAL ERROR] ${message} at ${source}:${lineno}:${colno}`;
  useStore.getState().addLog(logMsg);
  console.error(logMsg, error);
};

window.onunhandledrejection = function(event) {
  const logMsg = `[UNHANDLED PROMISE] ${event.reason}`;
  useStore.getState().addLog(logMsg);
  console.error(logMsg);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
