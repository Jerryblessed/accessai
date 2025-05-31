import React from 'react';
import { usePreferences } from '../../context/PreferencesContext';
import TextToSpeech from '../accessibility/TextToSpeech';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const { preferences } = usePreferences();
  
  const getContrastClasses = () => {
    return preferences.highContrast 
      ? 'bg-white dark:bg-gray-900 border-2 border-black dark:border-white' 
      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
  };
  
  const getTextSizeClasses = () => {
    switch (preferences.fontSize) {
      case 'large': 
        return 'text-xl group-hover:text-2xl';
      case 'x-large': 
        return 'text-2xl group-hover:text-3xl';
      default: 
        return 'text-lg group-hover:text-xl';
    }
  };
  
  const getAnimationClasses = () => {
    return preferences.reducedMotion 
      ? '' 
      : 'transition-all duration-300 ease-in-out transform group-hover:scale-105';
  };

  return (
    <div 
      className={`group rounded-xl shadow-lg overflow-hidden ${getContrastClasses()} ${getAnimationClasses()}`}
      tabIndex={0}
    >
      <div className="p-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 mb-4">
          {icon}
        </div>
        
        <div className="flex items-start justify-between">
          <h3 className={`font-bold mb-2 ${getTextSizeClasses()}`}>{title}</h3>
          <TextToSpeech text={`${title}. ${description}`} element="icon" />
        </div>
        
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;