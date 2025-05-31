import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText } from '../../services/speechService';
import Button from '../ui/Button';

interface TextToSpeechProps {
  text: string;
  element?: 'button' | 'icon';
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, element = 'button' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      await speakText(text);
    } catch (error) {
      console.error('Error speaking text:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  if (element === 'icon') {
    return (
      <button
        onClick={handleSpeak}
        className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        aria-label={isSpeaking ? "Stop speaking" : "Read text aloud"}
      >
        {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    );
  }

  return (
    <Button
      onClick={handleSpeak}
      variant="outline"
      size="sm"
      icon={isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      aria-label={isSpeaking ? "Stop speaking" : "Read text aloud"}
    >
      {isSpeaking ? "Stop" : "Listen"}
    </Button>
  );
};

export default TextToSpeech;