import React, { useState } from 'react';
import { TransformationResult } from '../../types';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Info, 
  Lightbulb, 
  ArrowRightLeft, 
  MessageSquare,
  Sparkles,
  Zap,
  Target,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  GOAL_OPTIONS, 
  AUDIENCE_OPTIONS, 
  TONE_OPTIONS 
} from '../../constants';

export function ResultCard({ result }: { result: TransformationResult }) {
  const [activeTab, setActiveTab] = useState('adapted');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Скопировано в буфер обмена');
    setTimeout(() => setCopied(false), 2000);
  };

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case 'sell': return <Zap className="w-3 h-3" />;
      case 'persuade': return <Target className="w-3 h-3" />;
      case 'explain': return <Info className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  const goalLabel = GOAL_OPTIONS.find(opt => opt.value === result.settings.goal)?.label || result.settings.goal;
  const audienceLabel = AUDIENCE_OPTIONS.find(opt => opt.value === result.settings.audience)?.label || result.settings.audience;

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
      
      <Card className="relative premium-card overflow-hidden bg-white/80 backdrop-blur-xl border-neutral-100 shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="p-4 px-6 border-b border-neutral-100 bg-neutral-50/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Badge variant="secondary" className="bg-white/80 border-neutral-100 text-indigo-600 text-[10px] h-6 px-2 gap-1 font-bold uppercase tracking-widest">
               {getGoalIcon(result.settings.goal)}
               {goalLabel}
             </Badge>
             <Badge variant="secondary" className="bg-white/80 border-neutral-100 text-purple-600 text-[10px] h-6 px-2 gap-1 font-bold uppercase tracking-widest">
               <Users className="w-3 h-3" />
               {audienceLabel}
             </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-neutral-400 font-mono font-medium">
              {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-8">
              <TabsList className="bg-neutral-100/50 p-1.5 border border-neutral-200/50 rounded-xl">
                <TabsTrigger value="adapted" className="gap-2 text-[11px] font-bold uppercase tracking-wider h-8 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Адаптация
                </TabsTrigger>
                <TabsTrigger value="original" className="gap-2 text-[11px] font-bold uppercase tracking-wider h-8 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-neutral-400" />
                  Оригинал
                </TabsTrigger>
                <TabsTrigger value="neutral" className="gap-2 text-[11px] font-bold uppercase tracking-wider h-8 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
                  Нейтральный
                </TabsTrigger>
                <TabsTrigger value="comparison" className="gap-2 text-[11px] font-bold uppercase tracking-wider h-8 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-blue-500" />
                  Сравнение
                </TabsTrigger>
              </TabsList>

              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 gap-2 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                onClick={() => handleCopy(activeTab === 'adapted' ? result.transformed.transformedText : result.transformed.neutralVersion)}
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                <span className="text-xs font-bold uppercase tracking-wider">{copied ? 'Готово' : 'Копировать'}</span>
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="adapted" className="mt-0 focus-visible:ring-0">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Адаптированный текст</label>
                    <div className="relative group/text">
                      <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full opacity-50 group-hover/text:opacity-100 transition-opacity" />
                      <div className="text-2xl leading-[1.6] text-neutral-900 font-medium tracking-tight">
                        {result.transformed.transformedText}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="original" className="mt-0 focus-visible:ring-0">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Оригинальный текст</label>
                    <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 text-lg text-neutral-600 leading-relaxed">
                      {result.original}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="neutral" className="mt-0 focus-visible:ring-0">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Нейтральная версия</label>
                    <div className="bg-neutral-50/50 p-6 rounded-2xl border border-neutral-100 italic text-xl text-neutral-500 leading-relaxed font-serif">
                      {result.transformed.neutralVersion}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="comparison" className="mt-0 focus-visible:ring-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Было (Оригинал)</label>
                      </div>
                      <div className="p-5 bg-neutral-50 rounded-2xl text-sm leading-relaxed text-neutral-500 border border-neutral-100 line-through decoration-neutral-300 opacity-60">
                        {result.original}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Стало (Адаптация)</label>
                      </div>
                      <div className="p-5 bg-indigo-50/30 rounded-2xl text-sm leading-relaxed border border-indigo-100/50 text-indigo-900 font-medium relative shadow-sm">
                        <div className="absolute -top-2 -right-2 bg-indigo-500 text-white p-1 rounded-lg">
                          <Sparkles className="w-3 h-3" />
                        </div>
                        {result.transformed.transformedText}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          {/* AI Insight Section */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-10 pt-10 border-t border-neutral-100/80">
             <div className="lg:col-span-2 space-y-4">
               <div className="flex items-center gap-2.5">
                 <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                   <Info className="w-4 h-4 text-indigo-600" />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-800">Почему текст изменён</h4>
               </div>
               <div className="relative">
                 <div className="absolute -left-4 top-2 text-4xl text-indigo-100 font-serif opacity-50">"</div>
                 <p className="text-[13px] text-neutral-600 leading-[1.8] pl-2 font-medium">
                   {result.transformed.explanation}
                 </p>
               </div>
             </div>
             
             <div className="lg:col-span-3 space-y-5">
               <div className="flex items-center gap-2.5">
                 <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                   <Lightbulb className="w-4 h-4 text-amber-600" />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-800">Советы по коммуникации</h4>
               </div>
               <div className="flex flex-wrap gap-3">
                  {result.transformed.suggestions.map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02, translateY: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 p-3.5 pr-5 bg-white border border-neutral-200 rounded-2xl hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300 text-left shadow-sm hover:shadow-md"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shrink-0" />
                      <span className="text-[12px] font-semibold text-neutral-600 group-hover:text-neutral-900 leading-snug">
                        {suggestion}
                      </span>
                    </motion.button>
                  ))}
               </div>
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
