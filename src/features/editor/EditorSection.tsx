import React from 'react';
import { useStore } from '../../store/useStore';
import { Textarea as UITextarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Sparkles, Trash2, Copy, Wand2 } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { toast } from 'sonner';
import { QuickActions } from './QuickActions';

export function EditorSection() {
  const { inputText, setInputText, settings, setIsTransforming, isTransforming, addResult } = useStore();

  const handleTransform = async () => {
    if (!inputText.trim()) {
      toast.error('Введите текст для трансформации');
      return;
    }

    try {
      setIsTransforming(true);
      const transformed = await aiService.transformText(inputText, settings);
      
      addResult({
        original: inputText,
        transformed,
        settings,
        timestamp: Date.now(),
      });
      
      toast.success('Текст успешно трансформирован');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка при трансформации');
    } finally {
      setIsTransforming(false);
    }
  };

  return (
    <Card className="premium-card p-6 overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          Исходный текст
        </label>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setInputText('')}
            disabled={!inputText}
          >
            <Trash2 className="w-4 h-4 text-neutral-400" />
          </Button>
        </div>
      </div>

      <UITextarea
        placeholder="Введите здесь ваш текст... Например: 'Мы хотим предложить вам сотрудничество в рамках нашего нового проекта.'"
        className="min-h-[200px] text-lg resize-none border-none focus-visible:ring-0 p-0 placeholder:text-neutral-300"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <QuickActions />

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-100">
        <div className="text-xs text-neutral-400">
          {inputText.length} символов • {inputText.split(/\s+/).filter(Boolean).length} слов
        </div>
        <Button 
          size="lg" 
          className="gap-2 bg-black hover:bg-neutral-800 text-white px-8 transition-all active:scale-95"
          onClick={handleTransform}
          disabled={isTransforming || !inputText.trim()}
        >
          {isTransforming ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Трансформация...
            </div>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Трансформировать
            </>
          )}
        </Button>
      </div>

      {isTransforming && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-10">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-neutral-100 animate-bounce">
            <Wand2 className="w-5 h-5 text-indigo-500 animate-pulse" />
            <span className="font-medium text-neutral-700">ИИ анализирует контекст...</span>
          </div>
        </div>
      )}
    </Card>
  );
}
