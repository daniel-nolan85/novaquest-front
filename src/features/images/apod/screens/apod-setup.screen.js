import { useState, useEffect, useContext } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { DrawerActions } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Text } from '../../../../components/typography/text.component';
import { images } from '../../../../services/trivia/trivia.data.json';
import { MessageBubble } from '../../../../components/message-bubble.component';
import {
  IconsWrapper,
  SetupSafeArea,
  SetupContainer,
  SpeechContainer,
  ImageContainer,
  Astronaut,
  SpeechBubble,
  OptionContainer,
  Option,
  OptionText,
} from '../styles/apod.styles';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { AudioContext } from '../../../../services/audio/audio.context';

export const ApodSetupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [okButton, setOkButton] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [typing, setTyping] = useState(true);
  const [showOk, setShowOk] = useState(true);
  const [text1, setText1] = useState();
  const [text2, setText2] = useState();
  const [text1Key, setText1Key] = useState(0);

  const { playGameMusic, stopGameMusic } = useContext(AudioContext);

  useEffect(() => {
    const focusListener = addListener('focus', () => {
      setText1Key((prevKey) => prevKey + 1);
      if (soundEffects) playGameMusic();
      setText1(
        `${rank} ${name}, welcome to the Astronomy Picture of the Day (APOD) - your daily portal to the captivating wonders of the cosmos! Each day, you'll be treated to a stunning image captured from the depths of space, accompanied by a detailed description that unveils the secrets and stories behind these cosmic marvels.`
      );
      setText2(
        `In addition, feel free to transcend time and explore the celestial archives by selecting a specific date. Dive into the vast cosmic history, and witness the breathtaking snapshots that have graced the cosmic stage on days gone by. Your journey through the cosmos awaits, ${rank} ${name},  as we unveil the mysteries and beauty of the universe together.`
      );
    });

    const blurListener = addListener('blur', () => {
      setCurrentStep(1);
      setOkButton(false);
      setReadyButton(false);
      setTyping(true);
      setShowOk(true);
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation, soundEffects]);

  const { rank, name, textSpeed, soundEffects } = useSelector(
    (state) => state.user
  );

  const { navigate, dispatch, addListener } = navigation;

  const skipText = () => {
    setShowOk(false);
    setTyping(false);
    if (currentStep < 2) {
      setOkButton(true);
    } else {
      setReadyButton(true);
    }
  };

  const handleTypingEnd = () => {
    setShowOk(false);
    setTyping(true);
    if (currentStep < 2) {
      setOkButton(true);
    } else {
      setReadyButton(true);
    }
  };

  const handleOkClick = () => {
    setShowOk(true);
    setCurrentStep(currentStep + 1);
    setOkButton(false);
    setTyping(true);
  };

  const handleReadyClick = () => {
    setCurrentStep(1);
    setOkButton(false);
    stopGameMusic();
    navigate('ApodScreen');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !typing ? (
          <Text variant='speech'>{text1}</Text>
        ) : (
          <TypeWriter
            typing={typing ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEnd}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text1}
          </TypeWriter>
        );
      case 2:
        return !typing ? (
          <Text variant='speech'>{text2}</Text>
        ) : (
          <TypeWriter
            typing={typing ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEnd}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text2}
          </TypeWriter>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      onLoadEnd={() => setIsLoading(false)}
      source={{
        uri: 'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450541/cockpit_jsfiij.gif',
      }}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SetupSafeArea>
          <IconsWrapper>
            <TouchableOpacity
              onPress={() => {
                dispatch(DrawerActions.openDrawer());
              }}
            >
              <Ionicons name='md-menu' size={30} color='#009999' />
            </TouchableOpacity>
          </IconsWrapper>
          <SetupContainer>
            <SpeechContainer>
              <ImageContainer>
                <Astronaut source={{ uri: images[0] }} />
              </ImageContainer>
              <SpeechBubble>
                <MessageBubble mine text={renderCurrentStep()} />
              </SpeechBubble>
            </SpeechContainer>
            <OptionContainer>
              {okButton && (
                <Option onPress={handleOkClick}>
                  <OptionText variant='body'>OK</OptionText>
                </Option>
              )}
              {readyButton && (
                <Option onPress={handleReadyClick}>
                  <OptionText variant='body'>Let's Go!</OptionText>
                </Option>
              )}
              {showOk && typing && (
                <Option onPress={skipText}>
                  <MaterialIcons name='double-arrow' size={20} color='#fff' />
                </Option>
              )}
            </OptionContainer>
          </SetupContainer>
        </SetupSafeArea>
      )}
    </ImageBackground>
  );
};
