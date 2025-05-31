import React, { useEffect, useState, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { startSpeechRecognition, stopSpeechRecognition, speakText } from '../../services/speechService';
import { usePreferences } from '../../context/PreferencesContext';
import Button from '../ui/Button';

interface VoiceCommandListenerProps {
  onCommand?: (command: string) => void;
}

const VoiceCommandListener: React.FC<VoiceCommandListenerProps> = ({ onCommand }) => {
  const { preferences } = usePreferences();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const toggleListening = useCallback(async () => {
    if (isListening) {
      stopSpeechRecognition(recognition);
      setIsListening(false);
      await speakText('Voice commands disabled');
    } else {
      const recognitionInstance = await startSpeechRecognition();
      
      if (recognitionInstance) {
        setRecognition(recognitionInstance);
        
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const result = event.results[current];
          const transcript = result[0].transcript.toLowerCase();
          
          setTranscript(transcript);
          
          // Process only final results to avoid triggering commands on partial recognition
          if (result.isFinal) {
            if (onCommand) {
              onCommand(transcript);
            }
            
            // Handle basic commands
            if (transcript.includes('high contrast')) {
              document.dispatchEvent(new CustomEvent('toggleHighContrast'));
            } else if (transcript.includes('increase font')) {
              document.dispatchEvent(new CustomEvent('increaseFontSize'));
            } else if (transcript.includes('decrease font')) {
              document.dispatchEvent(new CustomEvent('decreaseFontSize'));
            }
          }
        };
        
        recognitionInstance.onerror = () => {
          setIsListening(false);
        };
        
        setIsListening(true);
        await speakText('Voice commands enabled. Try saying "high contrast" or "increase font"');
      }
    }
  }, [isListening, recognition, onCommand]);

  useEffect(() => {
    // Clean up on component unmount
    return () => {
      if (recognition) {
        stopSpeechRecognition(recognition);
      }
    };
  }, [recognition]);

  // Don't render if voice commands are disabled in preferences
  if (!preferences.enableVoiceCommands) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <Button
        onClick={toggleListening}
        variant="primary"
        size="lg"
        icon={isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        aria-label={isListening ? "Stop voice commands" : "Start voice commands"}
      >
        {isListening ? "Listening" : "Voice"}
      </Button>
      
      {isListening && transcript && (
        <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            "{transcript}"
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceCommandListener;