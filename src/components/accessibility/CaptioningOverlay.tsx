import React, { useState, useEffect } from 'react';
import { usePreferences } from '../../context/PreferencesContext';

interface CaptioningOverlayProps {
  mediaElementId: string;
}

const CaptioningOverlay: React.FC<CaptioningOverlayProps> = ({ mediaElementId }) => {
  const { preferences } = usePreferences();
  const [captions, setCaptions] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!preferences.enableCaptions) {
      setCaptions('');
      setIsVisible(false);
      return;
    }

    const mediaElement = document.getElementById(mediaElementId) as HTMLMediaElement;
    if (!mediaElement) return;

    // Handle captions from track elements if they exist
    const handleCueChange = (event: Event) => {
      const track = event.target as TextTrack;
      if (track.activeCues && track.activeCues.length > 0) {
        const cue = track.activeCues[0] as VTTCue;
        setCaptions(cue.text);
        setIsVisible(true);
      } else {
        setCaptions('');
        setIsVisible(false);
      }
    };

    // Try to find a text track for captions
    const textTrack = Array.from(mediaElement.textTracks).find(
      track => track.kind === 'captions' || track.kind === 'subtitles'
    );

    if (textTrack) {
      textTrack.mode = 'showing';
      textTrack.addEventListener('cuechange', handleCueChange);
    } else {
      // If no text track exists, we could implement speech recognition here
      // as a fallback for generating real-time captions
      console.log('No caption track found for media element');
    }

    // Clean up
    return () => {
      if (textTrack) {
        textTrack.removeEventListener('cuechange', handleCueChange);
      }
    };
  }, [mediaElementId, preferences.enableCaptions]);

  if (!isVisible || !captions || !preferences.enableCaptions) {
    return null;
  }

  return (
    <div 
      className="absolute bottom-8 left-0 right-0 mx-auto p-2 bg-black bg-opacity-75 text-white text-center rounded max-w-3xl"
      aria-live="polite"
    >
      {captions}
    </div>
  );
};

export default CaptioningOverlay;