import { useState, useEffect } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { DrawerActions } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Text } from '../../../../components/typography/text.component';
import { images } from '../../../../services/trivia/trivia.data.json';
import { MessageBubble } from '../../../../components/message-bubble.component';
import {
  SetupSafeArea,
  SetupContainer,
  SpeechContainer,
  ImageContainer,
  Astronaut,
  SpeechBubble,
  OptionContainer,
  Option,
  OptionText,
} from '../styles/planets-setup.styles';
import { IconsWrapper } from '../../apod/styles/apod.styles';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';

export const PlanetsSetupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [readyButton, setReadyButton] = useState(false);
  const [typing, setTyping] = useState(true);
  const [showOk, setShowOk] = useState(true);
  const [text1, setText1] = useState();
  const [text1Key, setText1Key] = useState(0);

  useEffect(() => {
    setText1(
      `Welcome to the Planetarium, ${rank} ${name}! Embark on a celestial journey through our cosmic database, where you can explore and uncover fascinating facts, images, and knowledge about the planets in our solar system. From the majestic gas giants to the enigmatic dwarf planets, the Planetarium is your portal to the wonders of the celestial neighborhood. Enjoy your exploration!`
    );
  }, []);

  useEffect(() => {
    const focusListener = addListener('focus', () => {
      setText1Key((prevKey) => prevKey + 1);
    });

    const blurListener = addListener('blur', () => {
      setCurrentStep(1);
      setReadyButton(false);
      setTyping(true);
      setShowOk(true);
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation]);

  const { rank, name, textSpeed } = useSelector((state) => state.user);

  const { navigate, dispatch, addListener } = navigation;

  const skipText = () => {
    setShowOk(false);
    setTyping(false);
    setReadyButton(true);
  };

  const handleTypingEnd = () => {
    setShowOk(false);
    setTyping(true);
    setReadyButton(true);
  };

  const handleReadyClick = () => {
    setCurrentStep(1);
    navigate('PlanetsList');
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
