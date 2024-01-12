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
} from '../styles/iss-tracker-setup.styles';
import { IconsWrapper } from '../../apod/styles/apod.styles';

export const ISSTrackerSetupScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [readyButton, setReadyButton] = useState(false);
  const [typing, setTyping] = useState(true);
  const [showOk, setShowOk] = useState(true);
  const [text1, setText1] = useState();

  useEffect(() => {
    setText1(
      `${rank} ${name}, prepare for an awe-inspiring experience with ISS Tracker! Explore the live location of the International Space Station (ISS) as it orbits our planet. Witness its journey against the backdrop of Earth's orbit, and marvel at the ISS's current velocity. Embark on a cosmic adventure and stay connected with the ISS in real-time. Enjoy the journey ${rank} ${name}!`
    );
  }, []);

  const { rank, name, textSpeed } = useSelector((state) => state.user);

  const { navigate, dispatch } = navigation;

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
    navigate('ISSTrackerScreen');
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
      source={{
        uri: 'https://res.cloudinary.com/daufzqlld/image/upload/v1704047788/cockpit_spyn2e.gif',
      }}
      style={{ flex: 1 }}
    >
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
    </ImageBackground>
  );
};