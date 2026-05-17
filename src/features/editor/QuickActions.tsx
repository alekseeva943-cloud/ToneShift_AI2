import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { aiService } from '../../services/aiService';
import { Button } from '../../components/ui/button';
import { Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function QuickActions() {
  const { inputText, setSettings, setInputText, addLog } = useStore();
  const [suggestions, setSuggestions] = useState<Array<{ label: string; preview: string }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputText.length > 20) {
        setLoading(true);
        addLog('[QUICK] Text long enough, fetching suggestions');
        try {
          const data = await aiService.getSuggestions(inputText);
          addLog(`[QUICK] Fetched ${data.suggestions.length} suggestions`);
          setSuggestions(data.suggestions);
        } catch (err: any) {
          addLog(`[QUICK ERROR] ${err.message}`);
          console.error(err);
        } finally {
          setLoading(false);
          addLog('[QUICK] Suggested fetching completed');
        }
      } else {
        setSuggestions([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputText]);

  if (!inputText || inputText.length <= 20) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-[10px] text-neutral-400 flex items-center gap-2 px-3 py-1.5"
          >
            <Wand2 className="w-3 h-3 animate-spin" />
            Умные предложения подбираются...
          </motion.div>
        ) : (
          suggestions.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-[11px] h-7 bg-white/50 border-neutral-200 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all"
                onClick={() => {
                  addLog(`[QUICK] Suggestion clicked: ${s.label}`);
                  setInputText(s.preview);
                  toast.success('Предложение применено');
                }}
              >
                <Sparkles className="w-3 h-3 mr-1.5 text-indigo-400" />
                {s.label}
              </Button>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
