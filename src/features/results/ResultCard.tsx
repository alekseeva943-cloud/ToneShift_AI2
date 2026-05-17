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
  Users,
  Download,
  Share2,
  Crown,
  ShieldCheck,
  Heart,
  Eye,
  TrendingUp,
  ExternalLink,
  History
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { toast } from 'sonner';
import { 
  GOAL_OPTIONS, 
  AUDIENCE_OPTIONS, 
  TONE_OPTIONS 
} from '../../constants';
import { Progress } from '../../components/ui/progress';

const METRIC_CONFIG = [
  { key: 'persuasiveness', label: 'Убедительность', icon: Crown, color: 'text-orange-500', bg: 'bg-orange-500' },
  { key: 'formality', label: 'Формальность', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-500' },
  { key: 'emotionality', label: 'Эмоциональность', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500' },
  { key: 'clarity', label: 'Ясность', icon: Eye, color: 'text-green-500', bg: 'bg-green-500' },
  { key: 'engagement', label: 'Вовлеченность', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-500' },
] as const;

export function ResultCard({ result }: { result: TransformationResult }) {
  const [activeTab, setActiveTab] = useState('adapted');
  const [copied, setCopied] = useState(false);

  const { setInputText, setSettings } = useStore();

  const handleRestore = () => {
    setInputText(result.original);
    setSettings(result.settings);
    toast.success('Восстановлено в редакторе');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Скопировано в буфер обмена');
    setTimeout(() => setCopied(false), 2000);
  };

  const exportAsFile = (format: 'txt' | 'md') => {
    const content = format === 'md' 
      ? `# ToneCraft AI Transformation\n\n## Original\n${result.original}\n\n## Transformed\n${result.transformed.transformedText}\n\n## Insight\n${result.transformed.explanation}`
      : `ToneCraft AI transformation\n\nOriginal:\n${result.original}\n\nTransformed:\n${result.transformed.transformedText}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tonecraft-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Экспортировано в .${format}`);
  };

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case 'sell': return <Zap className="w-3 h-3" />;
      case 'persuade': return <Target className="w-3 h-3" />;
      case 'explain': return <Info className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  const renderHighlightedText = (text: string, highlights: any[]) => {
    if (!highlights || highlights.length === 0) return text;
    
    let parts: (string | React.ReactNode)[] = [text];
    
    highlights.forEach(highlight => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        
        const split = part.split(new RegExp(`(${highlight.text})`, 'gi'));
        split.forEach((s, i) => {
          if (s.toLowerCase() === highlight.text.toLowerCase()) {
            const colors = {
              strengthened: 'bg-orange-100 text-orange-900 border-orange-200',
              simplified: 'bg-green-100 text-green-900 border-green-200',
              emotional: 'bg-rose-100 text-rose-900 border-rose-200',
              business: 'bg-blue-100 text-blue-900 border-blue-200'
            };
            const typeLabels = {
              strengthened: 'Усилено',
              simplified: 'Упрощено',
              emotional: 'Эмоции',
              business: 'Бизнес'
            };
            
            newParts.push(
              <span key={i} className="group/highlight relative inline-block">
                <span className={`px-1.5 py-0.5 rounded-md border-b-2 transition-all cursor-help ${colors[highlight.type as keyof typeof colors] || 'bg-indigo-100 border-indigo-200'}`}>
                  {s}
                </span>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-neutral-900 text-white text-[10px] rounded-lg opacity-0 group-hover/highlight:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                  <span className="block font-black uppercase mb-1 text-indigo-300">{typeLabels[highlight.type as keyof typeof typeLabels]}</span>
                  {highlight.reason}
                </span>
              </span>
            );
          } else {
            newParts.push(s);
          }
        });
      });
      parts = newParts;
    });
    
    return parts;
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
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-2 rounded-lg text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all font-bold text-[9px] uppercase tracking-wider"
              onClick={handleRestore}
            >
              <History className="w-3 h-3" />
              Восстановить
            </Button>
            <span className="text-[10px] text-neutral-400 font-mono font-medium">
              {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="p-8">
          {/* Communication Analytics */}
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-neutral-400" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">Коммуникационная аналитика</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {METRIC_CONFIG.map((metric) => {
                const beforeVal = result.transformed.metrics?.before?.[metric.key] ?? 50;
                const afterVal = result.transformed.metrics?.after?.[metric.key] ?? 70;
                return (
                  <div key={metric.key} className="bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl bg-white shadow-sm ${metric.color}`}>
                        <metric.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400">DIFF: {afterVal - beforeVal > 0 ? '+' : ''}{afterVal - beforeVal}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold text-neutral-800">{metric.label}</span>
                        <span className="text-sm font-black text-indigo-600">{afterVal}%</span>
                      </div>
                      <div className="relative h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-neutral-300/50" style={{ width: `${beforeVal}%` }} />
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${afterVal}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`absolute inset-0 ${metric.bg}`} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <TabsList className="bg-neutral-100/50 p-1.5 border border-neutral-200/50 rounded-xl self-start">
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

              <div className="flex items-center gap-2">
                <div className="flex bg-neutral-100/50 p-1 rounded-xl border border-neutral-100">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg hover:bg-white hover:text-indigo-600 transition-all"
                    onClick={() => handleCopy(activeTab === 'adapted' ? result.transformed.transformedText : result.original)}
                    title="Копировать"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg hover:bg-white hover:text-indigo-600 transition-all"
                    onClick={() => exportAsFile('md')}
                    title="Markdown"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg hover:bg-white hover:text-indigo-600 transition-all"
                    onClick={() => {
                        toast.info('Ссылка на результат скопирована');
                    }}
                    title="Поделиться"
                  >
                    <Share2 className="w-3.5 h-3.5 text-neutral-500" />
                  </Button>
                </div>
              </div>
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
                      <div className="p-6 bg-white rounded-2xl text-lg leading-relaxed border border-neutral-100 text-neutral-900 font-medium relative shadow-sm">
                        <div className="absolute -top-2 -right-2 bg-indigo-500 text-white p-1.5 rounded-lg shadow-lg">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        {renderHighlightedText(result.transformed.transformedText, result.transformed.highlights)}
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
