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
import { Settings2, Target, Users, Megaphone, Gauge, Layers } from 'lucide-react';

export function SettingsSection() {
  const { settings, setSettings } = useStore();

  return (
    <Card className="premium-card p-6 space-y-8">
      <div className="flex items-center gap-2 mb-2">
        <Settings2 className="w-5 h-5 text-neutral-400" />
        <h2 className="font-semibold text-neutral-800">Настройки адаптации</h2>
      </div>

      <div className="space-y-6">
        {/* Goal */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" />
            <Label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
              Цель общения
            </Label>
          </div>
          <Select 
            value={settings.goal} 
            onValueChange={(val: any) => setSettings({ goal: val })}
          >
            <SelectTrigger className="w-full bg-neutral-50 border-neutral-200">
              <SelectValue placeholder="Выберите цель" />
            </SelectTrigger>
            <SelectContent>
              {GOAL_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Audience */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <Label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
              Аудитория
            </Label>
          </div>
          <Select 
            value={settings.audience} 
            onValueChange={(val: any) => setSettings({ audience: val })}
          >
            <SelectTrigger className="w-full bg-neutral-50 border-neutral-200">
              <SelectValue placeholder="Выберите аудиторию" />
            </SelectTrigger>
            <SelectContent>
              {AUDIENCE_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tone */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-500" />
            <Label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
              Тон и стиль
            </Label>
          </div>
          <Select 
            value={settings.tone} 
            onValueChange={(val: any) => setSettings({ tone: val })}
          >
            <SelectTrigger className="w-full bg-neutral-50 border-neutral-200">
              <SelectValue placeholder="Выберите тон" />
            </SelectTrigger>
            <SelectContent>
              {TONE_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Intensity Sliders */}
        <div className="space-y-6 pt-4 border-t border-neutral-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-neutral-400" />
                <Label className="text-xs font-medium text-neutral-600">Формальность</Label>
              </div>
              <span className="text-[10px] font-bold bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500">
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
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-neutral-400" />
                <Label className="text-xs font-medium text-neutral-600">Интенсивность эмоций</Label>
              </div>
              <span className="text-[10px] font-bold bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500">
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
