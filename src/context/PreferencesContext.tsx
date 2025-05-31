import { createContext, useContext, useState, ReactNode } from 'react';
import { UserPreferences } from '../types';

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  highContrast: false,
  reducedMotion: false,
  fontSize: 'normal',
  enableVoiceCommands: false,
  enableCaptions: true,
  enableKeyboardShortcuts: true,
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    // Try to load from localStorage if available
    const saved = localStorage.getItem('accessibility-preferences');
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('accessibility-preferences', JSON.stringify(updated));
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};