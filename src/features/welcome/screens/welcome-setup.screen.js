import { useState, useEffect } from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
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
import { storeNotifToken } from '../../../requests/auth';
import { LoadingSpinner } from '../../../../assets/loading-spinner';

export const WelcomeSetupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [nameEntry, setNameEntry] = useState(false);
  const [notificationsEntry, setNotificationsEntry] = useState(false);
  const [userName, setUserName] = useState('');
  const [okButton, setOkButton] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [nameTyping, setNameTyping] = useState(true);
  const [notificationsTyping, setNotificationsTyping] = useState(false);
  const [typing, setTyping] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOk, setShowOk] = useState(false);
  const [text1] = useState(
    `Greetings, Commander. Welcome to the cosmic wonders of Nova Quest, your celestial guide through the mysteries of the universe! Before we embark on this interstellar journey, may we know the name of the intrepid explorer steering the spacecraft?`
  );
  const [text2, setText2] = useState('');
  const [text3] = useState(
    `Addionally, immerse yourself in the social galaxy, where you can share your cosmic experiences, form alliances with fellow explorers, and contribute to the vibrant community of celestial enthusiasts.`
  );
  const [text4] = useState(
    `Embark on a celestial adventure as you navigate the solar system and venture into the outer reaches of the galaxy. Earn experience points, unlock badges, and ascend through the ranks from a Space Cadet to a Cosmic Sovereign. Your cosmic exploration is not just a journey; it's an odyssey filled with discovery and celestial wonders.`
  );
  const [text5] = useState(
    `As you commence this cosmic journey, would you like to receive celestial signals for each interaction in the vast cosmos? Enable notifications to stay informed about likes, comments, and new posts from your alliances. Stay connected with the cosmic community, as we share the wonders of the universe with you.`
  );
  const [text6, setText6] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const { navigate } = navigation;

  useEffect(() => {
    if (user && user.name) {
      setText2(
        `Welcome to the cosmos, ${user.rank} ${user.name}! In this stellar app, your journey through the universe is boundless. Explore the Red Planet through the lenses of various rovers, witness the cosmic beauty with a daily astronomy picture, track asteroids that venture close to Earth, immerse yourself in a cosmic gaming experience, and keep a watchful eye on the International Space Station's current location as it orbits the Earth.`
      );
      setText6(
        `Prepare for lift-off, ${user.rank} ${user.name}, as we delve into the mysteries of the cosmos together. Let the exploration begin!`
      );
    }
  }, [user]);

  const skipNameText = () => {
    setShowName(false);
    setNameTyping(false);
    setNameEntry(true);
  };

  const skipNotificationsText = () => {
    setShowNotifications(false);
    setNotificationsTyping(false);
    setNotificationsEntry(true);
  };

  const skipText = () => {
    setShowOk(false);
    setTyping(false);
    if (currentStep < 5) {
      setOkButton(true);
    } else if (currentStep === 5) {
      setNotificationsEntry(true);
    } else {
      setReadyButton(true);
    }
  };

  const handleTypingEndName = () => {
    setShowName(false);
    setNameTyping(false);
    setNameEntry(true);
  };

  const handleTypingEndNotifications = () => {
    setShowNotifications(false);
    setNotificationsTyping(false);
    setNotificationsEntry(true);
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
    updateUserName(user.token, user._id, user.role, userName)
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
    setShowOk(true);
    setNameEntry(false);
    setCurrentStep(currentStep + 1);
    setOkButton(false);
    setTyping(true);
  };

  const handleNotificationsEntryClick = async (choice) => {
    if (choice === 'yes') {
      if (user.role === 'guest') {
        Toast.show({
          type: 'error',
          text1: `Signal permissions are exclusive to registered commanders.`,
          text2: `Register to unlock the full cosmic experience and receive stellar updates!`,
        });
      } else {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          Toast.show({
            type: 'success',
            text1: `Signals enabled!`,
            text2: `Stay tuned for cosmic updates and interactions.`,
          });
          const projectId = '5f022167-f010-423e-8f6f-eee7821ba543';
          const token = (
            await Notifications.getExpoPushTokenAsync({ projectId })
          ).data;
          await storeNotifToken(user.token, user._id, user.role, token)
            .then((res) => {
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  ...user,
                  noficationToken: res.data.noficationToken,
                },
              });
            })
            .catch((err) => console.error(err));
        }
      }
    } else {
      Toast.show({
        type: 'error',
        text1: `No signals will be sent for now.`,
        text2: `Explore the cosmos at your own pace.`,
      });
    }
    setShowOk(true);
    setNotificationsEntry(false);
    setCurrentStep(currentStep + 1);
    setOkButton(false);
    setTyping(true);
  };

  const handleTypingEnd = () => {
    setShowOk(false);
    setTyping(false);
    if (currentStep < 5) {
      setOkButton(true);
    } else if (currentStep === 5) {
      setNotificationsEntry(true);
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
      case 5:
        return !typing ? (
          <Text variant='speech'>{text5}</Text>
        ) : (
          <TypeWriter
            typing={typing ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEndNotifications}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text5}
          </TypeWriter>
        );
      case 6:
        return !typing ? (
          <Text variant='speech'>{text6}</Text>
        ) : (
          <TypeWriter
            typing={typing ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEnd}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text6}
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
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
                {notificationsEntry && (
                  <>
                    <Option
                      onPress={() => handleNotificationsEntryClick('yes')}
                    >
                      <OptionText variant='body'>Enable Signals</OptionText>
                    </Option>
                    <Option onPress={() => handleNotificationsEntryClick('no')}>
                      <OptionText variant='body'>Not Now</OptionText>
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
                {showNotifications && notificationsTyping && (
                  <Option onPress={skipNotificationsText}>
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
          </KeyboardAvoidingView>
        </SetupSafeArea>
      )}
    </ImageBackground>
  );
};
