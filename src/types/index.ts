export type CommunicationGoal = 'sell' | 'persuade' | 'explain' | 'simplify' | 'motivate' | 'formalize' | 'emotionalize';
export type Audience = 'beginner' | 'expert' | 'client' | 'teenager' | 'child' | 'business';
export type Tone = 'professional' | 'friendly' | 'aggressive' | 'inspiring' | 'neutral' | 'confident' | 'expert';

export interface TransformationSettings {
  goal: CommunicationGoal;
  audience: Audience;
  tone: Tone;
  formality: number; // 0-100
  length: 'shorter' | 'balanced' | 'longer';
  terminology: 'simple' | 'standard' | 'technical';
  intensity: number; // 0-100
}

export interface AIResponse {
  transformedText: string;
  originalText: string;
  neutralVersion: string;
  explanation: string;
  suggestions: string[];
  metrics: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
  highlights: {
    text: string;
    type: 'strengthened' | 'simplified' | 'emotional' | 'business';
    reason: string;
  }[];
}

export interface TransformationResult {
  original: string;
  transformed: AIResponse;
  settings: TransformationSettings;
  timestamp: number;
}
