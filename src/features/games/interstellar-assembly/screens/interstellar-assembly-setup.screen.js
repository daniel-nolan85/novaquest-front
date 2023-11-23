import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { DrawerActions } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
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
} from '../styles/interstellar-assembly-setup.styles';
import { IconsWrapper } from '../styles/interstellar-assembly.styles';

export const InterstellarAssemblySetupScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [okButton, setOkButton] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [typing, setTyping] = useState(true);
  const [showOk, setShowOk] = useState(true);
  const [text1] = useState(
    `Welcome, Space Explorer, to a cosmic challenge like no other — 'Interstellar Assembly.' Prepare to embark on an interstellar journey where your wits and creativity will be put to the test. In this cosmic puzzle adventure, you have the unique opportunity to arrange planets, match moons to their celestial hosts, and assemble the wonders of the universe with a simple drag and drop.`
  );
  const [text2] = useState(
    `Brace yourself for an odyssey of celestial proportions as you explore the intricacies of our vast cosmos. The stars await your arrangement, and the galaxies beckon your strategic mind. Get ready to be the architect of your cosmic adventure — the 'Interstellar Assembly' begins now!`
  );

  const { navigate, dispatch } = navigation;

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
    navigate('InterstellarAssemblyGame');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !typing ? (
          <Text variant='speech'>{text1}</Text>
        ) : (
          <TypeWriter
            typing={typing ? 1 : 0}
            maxDelay={50}
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
            maxDelay={50}
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
  );
};
