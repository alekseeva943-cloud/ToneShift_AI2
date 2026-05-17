import { CommunicationGoal, Audience, Tone } from './types';

export const GOAL_OPTIONS: Array<{ value: CommunicationGoal; label: string }> = [
  { value: 'sell', label: 'Продать' },
  { value: 'persuade', label: 'Убедить' },
  { value: 'explain', label: 'Объяснить' },
  { value: 'simplify', label: 'Упростить' },
  { value: 'motivate', label: 'Мотивировать' },
  { value: 'formalize', label: 'Формализовать' },
  { value: 'emotionalize', label: 'Эмоционализировать' },
];

export const AUDIENCE_OPTIONS: Array<{ value: Audience; label: string }> = [
  { value: 'child', label: 'Ребенок' },
  { value: 'teenager', label: 'Подросток' },
  { value: 'beginner', label: 'Новичок' },
  { value: 'business', label: 'Бизнес-аудитория' },
  { value: 'expert', label: 'Эксперт' },
  { value: 'client', label: 'Клиент' },
];

export const TONE_OPTIONS: Array<{ value: Tone; label: string }> = [
  { value: 'neutral', label: 'Нейтральный' },
  { value: 'friendly', label: 'Дружелюбный' },
  { value: 'professional', label: 'Профессиональный' },
  { value: 'inspiring', label: 'Вдохновляющий' },
  { value: 'confident', label: 'Уверенный' },
  { value: 'expert', label: 'Экспертный' },
  { value: 'aggressive', label: 'Агрессивный' },
];

export const LENGTH_OPTIONS = [
  { value: 'shorter', label: 'Короче' },
  { value: 'balanced', label: 'Сбалансированно' },
  { value: 'longer', label: 'Длиннее' },
];

export const TERMINOLOGY_OPTIONS = [
  { value: 'simple', label: 'Простая' },
  { value: 'standard', label: 'Стандартная' },
  { value: 'technical', label: 'Техническая' },
];
