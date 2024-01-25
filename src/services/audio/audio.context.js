import { useState, useEffect, useRef, createContext } from 'react';
import { Audio } from 'expo-av';

export const AudioContext = createContext();

export const AudioContextProvider = ({ children }) => {
  const [gameMusic, setGameMusic] = useState(null);

  const loadGameMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/sounds/conversation.mp3'),
        { isLooping: true }
      );
      setGameMusic(sound);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  const playGameMusic = async () => {
    try {
      if (!gameMusic) {
        await loadGameMusic();
      }
      await gameMusic.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopGameMusic = async () => {
    try {
      if (gameMusic) {
        await gameMusic.stopAsync();
      }
    } catch (error) {
      console.error('Error stopping game music:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (gameMusic) {
        gameMusic.unloadAsync();
      }
    };
  }, [gameMusic]);

  useEffect(() => {
    playGameMusic();
    return () => {
      stopGameMusic();
    };
  }, []);

  return (
    <AudioContext.Provider value={{ playGameMusic, stopGameMusic }}>
      {children}
    </AudioContext.Provider>
  );
};
