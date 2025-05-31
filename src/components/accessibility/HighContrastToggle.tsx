import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import Button from '../ui/Button';

const HighContrastToggle: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  
  const toggleHighContrast = () => {
    updatePreferences({ highContrast: !preferences.highContrast });
  };
  
  return (
    <Button
      onClick={toggleHighContrast}
      variant="outline"
      size="sm"
      icon={preferences.highContrast ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      aria-label={preferences.highContrast ? "Disable high contrast" : "Enable high contrast"}
    >
      {preferences.highContrast ? 'Standard Contrast' : 'High Contrast'}
    </Button>
  );
};

export default HighContrastToggle;