import { useState, useEffect, useContext } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
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
} from '../styles/asteroid-almanac-setup.styles';
import { DateSelector } from '../components/date-selector.component';
import { IconsWrapper } from '../../apod/styles/apod.styles';
import { ImagesContext } from '../../../../services/images/images.context';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';

export const AsteroidAlmanacSetupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [dateButtons, setDateButtons] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [dateTyping, setDateTyping] = useState(true);
  const [readyTyping, setReadyTyping] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const [text1, setText1] = useState();
  const [text2, setText2] = useState();
  const [text1Key, setText1Key] = useState(0);

  useEffect(() => {
    setText1(
      `${rank} ${name}, prepare for an exhilarating venture into the cosmic realm of 'Asteroid Almanac,' where the mysteries of our celestial neighbors come to life. Brace yourself for an adventure beyond the stars as you enter a specific date below. We will then unveil a curated collection of information on all the asteroids gracefully orbiting Earth within the chosen date range and the following 7 days.`
    );
    setText2(
      `Be vigilant, ${rank} ${name}. Some of these celestial wanderers may be potentially hazardous, heightening the stakes in your cosmic exploration. Whether you're a seasoned stargazer or a commanding astronomer, 'Asteroid Almanac' offers a captivating journey through the cosmos, providing insights into both the wonders and potential challenges posed by these cosmic travelers. The universe awaits your exploration in this enthralling section dedicated to the asteroids of our cosmic neighborhood.`
    );
  }, []);

  useEffect(() => {
    const focusListener = addListener('focus', () => {
      setText1Key((prevKey) => prevKey + 1);
    });

    const blurListener = addListener('blur', () => {
      setCurrentStep(1);
      setDateButtons(false);
      setReadyButton(false);
      setDateTyping(true);
      setReadyTyping(false);
      setShowDate(false);
      setShowReady(false);
      setDate(1);
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation]);

  const { rank, name, textSpeed } = useSelector((state) => state.user);

  const { date, setDate } = useContext(ImagesContext);

  const { navigate, dispatch, addListener } = navigation;

  const skipDateText = () => {
    setShowDate(false);
    setDateTyping(false);
    setDateButtons(true);
  };

  const skipReadyText = () => {
    setShowReady(false);
    setReadyTyping(false);
    setReadyButton(true);
  };

  const handleTypingEndDate = () => {
    setDateTyping(false);
    setShowDate(false);
    setDateButtons(true);
    setReadyTyping(true);
  };

  const handleTypingEndReady = () => {
    setShowReady(false);
    setReadyButton(true);
  };

  const handleDateClick = (choice) => {
    setShowReady(true);
    setShowDate(false);
    setDate(choice);
    setCurrentStep(currentStep + 1);
    setDateButtons(false);
    setReadyTyping(true);
  };

  const handleReadyClick = () => {
    setShowReady(false);
    setCurrentStep(1);
    setDateButtons(false);
    setReadyButton(false);
    navigate('AsteroidAlmanacList', { date });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !dateTyping ? (
          <Text variant='speech'>{text1}</Text>
        ) : (
          <TypeWriter
            typing={dateTyping ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEndDate}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text1}
          </TypeWriter>
        );
      case 2:
        return !readyTyping ? (
          <Text variant='speech'>{text2}</Text>
        ) : (
          <TypeWriter
            typing={readyTyping ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEndReady}
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
          <ScrollView>
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
                {dateButtons && (
                  <>
                    <DateSelector setDate={setDate} />
                    <Option onPress={() => handleDateClick(date)}>
                      <OptionText variant='body'>Ok</OptionText>
                    </Option>
                  </>
                )}
                {readyButton && (
                  <Option onPress={handleReadyClick}>
                    <OptionText variant='body'>Let's Go!</OptionText>
                  </Option>
                )}
                {dateTyping && (
                  <Option onPress={skipDateText}>
                    <MaterialIcons name='double-arrow' size={20} color='#fff' />
                  </Option>
                )}
                {showReady && readyTyping && (
                  <Option onPress={skipReadyText}>
                    <MaterialIcons name='double-arrow' size={20} color='#fff' />
                  </Option>
                )}
              </OptionContainer>
            </SetupContainer>
          </ScrollView>
        </SetupSafeArea>
      )}
    </ImageBackground>
  );
};
