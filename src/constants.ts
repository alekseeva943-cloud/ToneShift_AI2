import { CommunicationGoal, Audience, Tone } from './types';

export const GOAL_OPTIONS: Array<{ value: CommunicationGoal; label: string; description: string }> = [
  { value: 'sell', label: 'Продать', description: 'Убедительный тон, акцент на выгодах, призыв к действию, использование психологических триггеров.' },
  { value: 'persuade', label: 'Убедить', description: 'Логическая аргументация, работа с возражениями, использование фактов и доказательств.' },
  { value: 'explain', label: 'Объяснить', description: 'Четкая структура, последовательность, упрощение сложных концепций до понятных аналогий.' },
  { value: 'simplify', label: 'Упростить', description: 'Минимум терминов, короткие предложения, фокус на главном, максимальная доступность.' },
  { value: 'motivate', label: 'Мотивировать', description: 'Вдохновляющая лексика, эмоциональный подъем, фокус на возможностях и успехе.' },
  { value: 'formalize', label: 'Формализовать', description: 'Строгий этикет, отсутствие личных эмоций, точность формулировок, официальный стиль.' },
  { value: 'emotionalize', label: 'Добавить эмоций', description: 'Живой язык, использование метафор, акцент на чувствах и человеческом опыте.' },
];

export const AUDIENCE_OPTIONS: Array<{ value: Audience; label: string; description: string }> = [
  { value: 'child', label: 'Ребенок', description: 'Игровые формы, очень простые слова, яркие образы, отсутствие абстрактных понятий.' },
  { value: 'teenager', label: 'Подросток', description: 'Современный сленг (аккуратно), динамичный темп, отсутствие поучительного тона, актуальные темы.' },
  { value: 'beginner', label: 'Новичок', description: 'Объяснение базовых терминов, отсутствие профессионального жаргона, поддержка и дружелюбие.' },
  { value: 'business', label: 'Бизнес-аудитория', description: 'Лаконичность, акцент на эффективности и ROI, профессиональный этикет, конкретика.' },
  { value: 'expert', label: 'Эксперт', description: 'Использование сложной терминологии, отсутствие воды, глубокое погружение в детали.' },
  { value: 'client', label: 'Клиент', description: 'Фокус на сервисе, вежливость, решение проблем пользователя, персональный подход.' },
];

export const TONE_OPTIONS: Array<{ value: Tone; label: string; description: string }> = [
  { value: 'neutral', label: 'Нейтральный', description: 'Спокойный, объективный, без выраженной эмоциональной окраски.' },
  { value: 'friendly', label: 'Дружелюбный', description: 'Теплый, открытый, использование приветливых оборотов, создание комфортной атмосферы.' },
  { value: 'professional', label: 'Профессиональный', description: 'Сдержанный, компетентный, соблюдение отраслевых стандартов общения.' },
  { value: 'inspiring', label: 'Вдохновляющий', description: 'Энергичный, позитивный, использование слов, побуждающих к действию и мечтам.' },
  { value: 'confident', label: 'Уверенный', description: 'Твердый, решительный, четкие утверждения без лишних сомнений.' },
  { value: 'expert', label: 'Экспертный', description: 'Авторитетный, аналитический, демонстрирующий глубокие знания предмета.' },
  { value: 'aggressive', label: 'Дискретный/Строгий', description: 'Доминирующий, настойчивый, прямолинейный (использовать для жестких переговоров).' },
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
