import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import Home from './pages/Home';

const AppContent: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  
  // Apply global styles based on preferences
  useEffect(() => {
    const html = document.documentElement;
    
    // High contrast mode
    if (preferences.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    // Font size
    html.style.fontSize = preferences.fontSize === 'x-large' ? '120%' : 
                          preferences.fontSize === 'large' ? '110%' : '100%';
    
    // Reduced motion
    if (preferences.reducedMotion) {
      html.classList.add('reduced-motion');
    } else {
      html.classList.remove('reduced-motion');
    }
    
    // Update document title to be more descriptive for screen readers
    document.title = 'AccessAI - AI-Powered Accessibility Assistant';
    
    // Set up keyboard listeners if enabled
    if (preferences.enableKeyboardShortcuts) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Only process if not in an input field
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
          return;
        }
        
        // Alt + C: Toggle high contrast
        if (e.altKey && e.key === 'c') {
          document.dispatchEvent(new CustomEvent('toggleHighContrast'));
          e.preventDefault();
        }
        
        // Alt + F: Increase font size
        if (e.altKey && e.key === 'f') {
          document.dispatchEvent(new CustomEvent('increaseFontSize'));
          e.preventDefault();
        }
        
        // Alt + D: Decrease font size
        if (e.altKey && e.key === 'd') {
          document.dispatchEvent(new CustomEvent('decreaseFontSize'));
          e.preventDefault();
        }
        
        // Alt + M: Toggle reduced motion
        if (e.altKey && e.key === 'm') {
          document.dispatchEvent(new CustomEvent('toggleReducedMotion'));
          e.preventDefault();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [preferences]);
  
  // Set up event listeners for custom events
  useEffect(() => {
    const handleToggleHighContrast = () => {
      updatePreferences({ highContrast: !preferences.highContrast });
    };
    
    const handleIncreaseFontSize = () => {
      const sizes = ['normal', 'large', 'x-large'] as const;
      const currentIndex = sizes.indexOf(preferences.fontSize);
      if (currentIndex < sizes.length - 1) {
        updatePreferences({ fontSize: sizes[currentIndex + 1] });
      }
    };
    
    const handleDecreaseFontSize = () => {
      const sizes = ['normal', 'large', 'x-large'] as const;
      const currentIndex = sizes.indexOf(preferences.fontSize);
      if (currentIndex > 0) {
        updatePreferences({ fontSize: sizes[currentIndex - 1] });
      }
    };
    
    const handleToggleReducedMotion = () => {
      updatePreferences({ reducedMotion: !preferences.reducedMotion });
    };
    
    document.addEventListener('toggleHighContrast', handleToggleHighContrast);
    document.addEventListener('increaseFontSize', handleIncreaseFontSize);
    document.addEventListener('decreaseFontSize', handleDecreaseFontSize);
    document.addEventListener('toggleReducedMotion', handleToggleReducedMotion);
    
    return () => {
      document.removeEventListener('toggleHighContrast', handleToggleHighContrast);
      document.removeEventListener('increaseFontSize', handleIncreaseFontSize);
      document.removeEventListener('decreaseFontSize', handleDecreaseFontSize);
      document.removeEventListener('toggleReducedMotion', handleToggleReducedMotion);
    };
  }, [preferences, updatePreferences]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
}

export default App;