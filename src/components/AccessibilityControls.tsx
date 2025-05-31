import React from 'react';
import { usePreferences } from '../context/PreferencesContext';
import HighContrastToggle from './accessibility/HighContrastToggle';
import Button from './ui/Button';
import { ZoomIn, ZoomOut, MousePointer2, KeyRound } from 'lucide-react';

const AccessibilityControls: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  
  const increaseFontSize = () => {
    const sizes = ['normal', 'large', 'x-large'] as const;
    const currentIndex = sizes.indexOf(preferences.fontSize);
    if (currentIndex < sizes.length - 1) {
      updatePreferences({ fontSize: sizes[currentIndex + 1] });
    }
  };
  
  const decreaseFontSize = () => {
    const sizes = ['normal', 'large', 'x-large'] as const;
    const currentIndex = sizes.indexOf(preferences.fontSize);
    if (currentIndex > 0) {
      updatePreferences({ fontSize: sizes[currentIndex - 1] });
    }
  };
  
  const toggleReducedMotion = () => {
    updatePreferences({ reducedMotion: !preferences.reducedMotion });
  };
  
  const toggleKeyboardShortcuts = () => {
    updatePreferences({ enableKeyboardShortcuts: !preferences.enableKeyboardShortcuts });
  };
  
  const toggleVoiceCommands = () => {
    updatePreferences({ enableVoiceCommands: !preferences.enableVoiceCommands });
  };
  
  const toggleCaptions = () => {
    updatePreferences({ enableCaptions: !preferences.enableCaptions });
  };
  
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
      <HighContrastToggle />
      
      <Button
        onClick={increaseFontSize}
        variant="outline"
        size="sm"
        icon={<ZoomIn className="h-4 w-4" />}
        aria-label="Increase font size"
        disabled={preferences.fontSize === 'x-large'}
      >
        Larger Text
      </Button>
      
      <Button
        onClick={decreaseFontSize}
        variant="outline"
        size="sm"
        icon={<ZoomOut className="h-4 w-4" />}
        aria-label="Decrease font size"
        disabled={preferences.fontSize === 'normal'}
      >
        Smaller Text
      </Button>
      
      <Button
        onClick={toggleReducedMotion}
        variant="outline"
        size="sm"
        icon={<MousePointer2 className="h-4 w-4" />}
        aria-label={preferences.reducedMotion ? "Enable animations" : "Reduce animations"}
      >
        {preferences.reducedMotion ? 'Enable Animations' : 'Reduce Motion'}
      </Button>
      
      <Button
        onClick={toggleKeyboardShortcuts}
        variant="outline"
        size="sm"
        icon={<KeyRound className="h-4 w-4" />}
        aria-label={preferences.enableKeyboardShortcuts ? "Disable keyboard shortcuts" : "Enable keyboard shortcuts"}
      >
        {preferences.enableKeyboardShortcuts ? 'Keyboard: On' : 'Keyboard: Off'}
      </Button>
      
      <Button
        onClick={toggleVoiceCommands}
        variant="outline"
        size="sm"
        aria-label={preferences.enableVoiceCommands ? "Disable voice commands" : "Enable voice commands"}
      >
        {preferences.enableVoiceCommands ? 'Voice: On' : 'Voice: Off'}
      </Button>
      
      <Button
        onClick={toggleCaptions}
        variant="outline"
        size="sm"
        aria-label={preferences.enableCaptions ? "Disable captions" : "Enable captions"}
      >
        {preferences.enableCaptions ? 'Captions: On' : 'Captions: Off'}
      </Button>
    </div>
  );
};

export default AccessibilityControls;