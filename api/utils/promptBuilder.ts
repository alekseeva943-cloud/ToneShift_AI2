import { TransformationSettings } from '../../src/types.js';

export function buildTransformationPrompt(text: string, settings: TransformationSettings): string {
  return `
Текст для трансформации: "${text}"

Параметры:
- Цель: ${settings.goal}
- Аудитория: ${settings.audience}
- Тон: ${settings.tone}
- Уровень формальности: ${settings.formality}/100
- Длина: ${settings.length}
- Терминология: ${settings.terminology}
- Интенсивность эмоций: ${settings.intensity}/100

Пожалуйста, выполните трансформацию. Сохраняйте исходный смысл, но адаптируйте стиль и тон согласно параметрам выше.
`;
}
