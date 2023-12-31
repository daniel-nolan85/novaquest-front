import { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Text } from '../../../components/typography/text.component';
import { images } from '../../../services/trivia/trivia.data.json';
import { MessageBubble } from '../../../components/message-bubble.component';
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
  Input,
} from '../styles/welcome.styles';
import { updateUserName } from '../../../requests/user';

export const WelcomeSetupScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nameEntry, setNameEntry] = useState(false);
  const [userName, setUserName] = useState('');
  const [okButton, setOkButton] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [nameTyping, setNameTyping] = useState(true);
  const [typing, setTyping] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showOk, setShowOk] = useState(false);
  const [text1] = useState(
    `Greetings, Commander. Welcome to the cosmic wonders of Astro Sense, your celestial guide through the mysteries of the universe! Before we embark on this interstellar journey, may we know the name of the intrepid explorer steering the spacecraft?`
  );
  const [text2, setText2] = useState('');
  const [text3] = useState(
    `Embark on a celestial adventure as you navigate the solar system and venture into the outer reaches of the galaxy. Earn experience points and badges by unlocking achievements throughout the application. Your cosmic exploration is not just a journey; it's an odyssey filled with discovery and celestial wonders.`
  );
  const [text4, setText4] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const { navigate } = navigation;

  useEffect(() => {
    if (user && user.name) {
      setText2(
        `Welcome to the cosmos, Commander ${user.name}! In this stellar app, your journey through the universe is boundless. Explore the Red Planet through the lenses of various rovers, witness the cosmic beauty with a daily astronomy picture, track asteroids that venture close to Earth, and immerse yourself in a cosmic gaming experience.`
      );
      setText4(
        `Prepare for lift-off, Commander ${user.name}, as we delve into the mysteries of the cosmos together. Let the exploration begin!`
      );
    }
  }, [user]);

  const skipNameText = () => {
    setShowName(false);
    setNameTyping(false);
    setNameEntry(true);
  };

  const skipText = () => {
    setShowOk(false);
    setTyping(false);
    if (currentStep < 4) {
      setOkButton(true);
    } else {
      setReadyButton(true);
    }
  };

  const handleTypingEndName = () => {
    setShowName(false);
    setNameTyping(false);
    setNameEntry(true);
  };

  const handleNameEntryClick = () => {
    if (!userName) {
      Toast.show({
        type: 'error',
        text1: `Commander, it seems we're missing a crucial piece of information!`,
        text2: `Please enter your name before setting course on this cosmic adventure.`,
      });
      return;
    }
    if (user.role !== 'guest') {
      updateUserName(user.token, user._id, userName)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              name: res.data.name,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          name: userName,
        },
      });
    }
    setShowOk(true);
    setNameEntry(false);
    setCurrentStep(currentStep + 1);
    setOkButton(false);
    setTyping(true);
  };

  const handleTypingEnd = () => {
    setShowOk(false);
    setTyping(false);
    if (currentStep < 4) {
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
    setOkButton(false);
    navigate('WelcomeComplete');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !nameTyping ? (
          <Text variant='speech'>{text1}</Text>
        ) : (
          <TypeWriter
            typing={nameTyping ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEndName}
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
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEnd}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text2}
          </TypeWriter>
        );
      case 3:
        return !typing ? (
          <Text variant='speech'>{text3}</Text>
        ) : (
          <TypeWriter
            typing={typing ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEnd}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text3}
          </TypeWriter>
        );
      case 4:
        return !typing ? (
          <Text variant='speech'>{text4}</Text>
        ) : (
          <TypeWriter
            typing={typing ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEnd}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text4}
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
            {nameEntry && (
              <>
                <Input
                  label={<Text variant='body'>What's your name?</Text>}
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                />
                <Option onPress={handleNameEntryClick}>
                  <OptionText variant='body'>Confirm</OptionText>
                </Option>
              </>
            )}
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
            {showName && nameTyping && (
              <Option onPress={skipNameText}>
                <MaterialIcons name='double-arrow' size={20} color='#fff' />
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
