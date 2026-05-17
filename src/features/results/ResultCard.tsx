import React, { useState } from 'react';
import { TransformationResult } from '../../types';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Copy, 
  Check, 
  Info, 
  Lightbulb, 
  ArrowRightLeft, 
  MessageSquare,
  Sparkle
} from 'lucide-react';
import { toast } from 'sonner';

export function ResultCard({ result }: { result: TransformationResult }) {
  const [activeTab, setActiveTab] = useState('adapted');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Скопировано в буфер обмена');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="premium-card overflow-hidden">
      <div className="p-1 px-4 bg-neutral-50/50 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex gap-2 py-2">
           <Badge variant="outline" className="bg-white text-[10px] uppercase tracking-wide">
             {result.settings.goal}
           </Badge>
           <Badge variant="outline" className="bg-white text-[10px] uppercase tracking-wide">
             {result.settings.tone}
           </Badge>
        </div>
        <span className="text-[10px] text-neutral-400 font-mono">
          {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-neutral-100 p-1 border border-neutral-200">
              <TabsTrigger value="adapted" className="gap-2 text-xs">
                <Sparkle className="w-3 h-3" />
                Адаптированный
              </TabsTrigger>
              <TabsTrigger value="comparison" className="gap-2 text-xs">
                <ArrowRightLeft className="w-3 h-3" />
                Сравнение
              </TabsTrigger>
              <TabsTrigger value="neutral" className="gap-2 text-xs">
                <MessageSquare className="w-3 h-3" />
                Нейтральный
              </TabsTrigger>
            </TabsList>

            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-2"
              onClick={() => handleCopy(activeTab === 'adapted' ? result.transformed.transformedText : result.transformed.neutralVersion)}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Готово' : 'Копировать'}
            </Button>
          </div>

          <TabsContent value="adapted" className="mt-0 focus-visible:ring-0">
            <div className="text-lg leading-relaxed text-neutral-800 font-medium">
              {result.transformed.transformedText}
            </div>
          </TabsContent>

          <TabsContent value="neutral" className="mt-0 focus-visible:ring-0">
            <div className="text-lg leading-relaxed text-neutral-500 italic">
              {result.transformed.neutralVersion}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-0 focus-visible:ring-0">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Оригинал</label>
                  <div className="p-4 bg-neutral-50 rounded-xl text-sm text-neutral-600 line-through opacity-50">
                    {result.original}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Трансформация</label>
                  <div className="p-4 bg-indigo-50/50 rounded-xl text-sm border border-indigo-100 text-indigo-900">
                    {result.transformed.transformedText}
                  </div>
                </div>
             </div>
          </TabsContent>
        </Tabs>

        {/* AI Insight Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-100">
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-neutral-800">
               <Info className="w-4 h-4 text-indigo-500" />
               <h4 className="text-xs font-bold uppercase tracking-wider">Аналитика ИИ</h4>
             </div>
             <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-4 rounded-xl">
               {result.transformed.explanation}
             </p>
           </div>
           
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-neutral-800">
               <Lightbulb className="w-4 h-4 text-amber-500" />
               <h4 className="text-xs font-bold uppercase tracking-wider">Предложения</h4>
             </div>
             <div className="space-y-2">
                {result.transformed.suggestions.map((suggestion, idx) => (
                  <div 
                    key={idx} 
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer border border-transparent hover:border-neutral-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                      {suggestion}
                    </span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </Card>
  );
}
