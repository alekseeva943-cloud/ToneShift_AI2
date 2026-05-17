import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  GOAL_OPTIONS, 
  AUDIENCE_OPTIONS, 
  TONE_OPTIONS, 
  LENGTH_OPTIONS,
  TERMINOLOGY_OPTIONS
} from '../../constants';
import { Settings2, Target, Users, Megaphone, Gauge, Layers, Check, Zap, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function SettingsSection() {
  const { settings, setSettings } = useStore();

  const QUICK_PRESETS = [
    { label: 'Бизнес', goal: 'formalize' as const, audience: 'business' as const, tone: 'professional' as const, formality: 90 },
    { label: 'Продажа', goal: 'sell' as const, audience: 'client' as const, tone: 'confident' as const, formality: 55 },
    { label: 'Эксперт', goal: 'explain' as const, audience: 'expert' as const, tone: 'expert' as const, formality: 80 },
    { label: 'Диалог', goal: 'emotionalize' as const, audience: 'beginner' as const, tone: 'friendly' as const, formality: 35 },
  ];

  const OptionGrid = ({ 
    label, 
    icon: Icon, 
    options, 
    currentValue, 
    onChange 
  }: { 
    label: string, 
    icon: any, 
    options: any[], 
    currentValue: string, 
    onChange: (val: any) => void 
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-neutral-400" />
        <Label className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">
          {label}
        </Label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.value)}
            className={`relative p-3 rounded-xl border text-left transition-all duration-300 group ${
              currentValue === opt.value 
                ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                : 'bg-white border-neutral-100 hover:border-neutral-300'
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className={`text-xs font-bold ${currentValue === opt.value ? 'text-indigo-600' : 'text-neutral-700'}`}>
                {opt.label}
              </span>
              <span className="text-[9px] text-neutral-400 line-clamp-1 group-hover:line-clamp-none transition-all">
                {opt.description}
              </span>
            </div>
            {currentValue === opt.value && (
              <div className="absolute top-2 right-2">
                <Check className="w-3 h-3 text-indigo-500" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="premium-card p-6 space-y-10">
      <div className="flex items-center gap-2 mb-2">
        <Settings2 className="w-5 h-5 text-indigo-500" />
        <h2 className="font-bold text-neutral-800 uppercase tracking-tight">Параметры интонации</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <Label className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">
            Быстрые пресеты
          </Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PRESETS.map((p) => (
            <motion.button
              key={p.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettings({ goal: p.goal, audience: p.audience, tone: p.tone, formality: p.formality })}
              className="px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-bold text-neutral-600 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm"
            >
              {p.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        <OptionGrid 
          label="Цель коммуникации" 
          icon={Target} 
          options={GOAL_OPTIONS} 
          currentValue={settings.goal} 
          onChange={(val) => setSettings({ goal: val })} 
        />

        <OptionGrid 
          label="Целевая аудитория" 
          icon={Users} 
          options={AUDIENCE_OPTIONS} 
          currentValue={settings.audience} 
          onChange={(val) => setSettings({ audience: val })} 
        />

        <OptionGrid 
          label="Тон изложения" 
          icon={Megaphone} 
          options={TONE_OPTIONS} 
          currentValue={settings.tone} 
          onChange={(val) => setSettings({ tone: val })} 
        />

        {/* Intensity Sliders */}
        <div className="space-y-6 pt-4 border-t border-neutral-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <Label className="text-xs font-bold text-neutral-800">Формальность</Label>
              </div>
              <span className="text-[10px] font-black bg-blue-50 px-1.5 py-0.5 rounded text-blue-600 border border-blue-100">
                {settings.formality}%
              </span>
            </div>
            <Slider 
              value={[settings.formality]} 
              max={100} 
              step={1}
              onValueChange={(val: any) => {
                const actualVal = Array.isArray(val) ? val[0] : val;
                setSettings({ formality: actualVal });
              }}
              className="[&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <Label className="text-xs font-bold text-neutral-800">Эмоциональный интеллект</Label>
              </div>
              <span className="text-[10px] font-black bg-rose-50 px-1.5 py-0.5 rounded text-rose-600 border border-rose-100">
                {settings.intensity}%
              </span>
            </div>
            <Slider 
              value={[settings.intensity]} 
              max={100} 
              step={1}
              onValueChange={(val: any) => {
                const actualVal = Array.isArray(val) ? val[0] : val;
                setSettings({ intensity: actualVal });
              }}
              className="[&_[role=slider]]:bg-rose-600 [&_[role=slider]]:border-rose-600"
            />
          </div>
        </div>

        {/* Tabs for Length & Terminology */}
        <div className="space-y-6 pt-2">
          <div className="space-y-3">
             <Label className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Длина текста</Label>
             <Tabs 
               value={settings.length} 
               onValueChange={(val: any) => setSettings({ length: val })}
               className="w-full"
             >
               <TabsList className="grid grid-cols-3 w-full h-9 bg-neutral-100 border border-neutral-200">
                 {LENGTH_OPTIONS.map(opt => (
                   <TabsTrigger key={opt.value} value={opt.value} className="text-[11px] font-medium">
                     {opt.label}
                   </TabsTrigger>
                 ))}
               </TabsList>
             </Tabs>
          </div>

          <div className="space-y-3">
             <Label className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Сложность терминов</Label>
             <Tabs 
               value={settings.terminology} 
               onValueChange={(val: any) => setSettings({ terminology: val })}
               className="w-full"
             >
               <TabsList className="grid grid-cols-3 w-full h-9 bg-neutral-100 border border-neutral-200">
                 {TERMINOLOGY_OPTIONS.map(opt => (
                   <TabsTrigger key={opt.value} value={opt.value} className="text-[11px] font-medium">
                     {opt.label}
                   </TabsTrigger>
                 ))}
               </TabsList>
             </Tabs>
          </div>
        </div>
      </div>
    </Card>
  );
}
