export interface UserPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
  enableVoiceCommands: boolean;
  enableCaptions: boolean;
  enableKeyboardShortcuts: boolean;
}

export interface AIAssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AccessibilityFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
}