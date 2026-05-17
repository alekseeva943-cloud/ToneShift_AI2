import { AppShell } from './components/AppShell';
import { EditorSection } from './features/editor/EditorSection';
import { SettingsSection } from './features/editor/SettingsSection';
import { ResultList } from './features/results/ResultList';
import { Toaster } from './components/ui/sonner';
import { useStore } from './store/useStore';
import { DebugPanel } from './components/DebugPanel';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const results = useStore((state) => state.results);

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Editor Area */}
          <div className="lg:col-span-8 space-y-8">
            <EditorSection />
            
            <AnimatePresence mode="popLayout">
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <ResultList />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Settings */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <SettingsSection />
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
      <DebugPanel />
    </AppShell>
  );
}
