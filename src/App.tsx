import { AppShell } from './components/AppShell';
import { EditorSection } from './features/editor/EditorSection';
import { SettingsSection } from './features/editor/SettingsSection';
import { ResultList } from './features/results/ResultList';
import { Toaster } from './components/ui/sonner';
import { useStore } from './store/useStore';
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
            
            {results.length > 0 && (
              <div>
                <ResultList />
              </div>
            )}
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
    </AppShell>
  );
}
