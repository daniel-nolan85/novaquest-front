import { useState, useEffect, useContext } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
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
} from '../styles/trivia-setup.styles';
import { IconsWrapper } from '../styles/trivia.styles';
import { GamesContext } from '../../../../services/games/games.context';
import { AudioContext } from '../../../../services/audio/audio.context';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';

export const TriviaSetupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState(0);
  const [okButton, setOkButton] = useState(false);
  const [difficultyButtons, setDifficultyButtons] = useState(false);
  const [durationButtons, setDurationButtons] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [difficultyTyping, setDifficultyTyping] = useState(false);
  const [durationTyping, setDurationTyping] = useState(false);
  const [readyTyping, setReadyTyping] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const [text1, setText1] = useState();
  const [text2] = useState(
    `Before we embark on this mission, you have the power to tailor your cosmic adventure. Choose your difficulty level wisely, whether you're a budding stargazer or a seasoned astrophysicist.`
  );
  const [text3] = useState(
    `Next, decide the length of your journey — a brief orbit or an extended voyage through the cosmos.`
  );
  const [text4, setText4] = useState();
  const [text1Key, setText1Key] = useState(0);

  const { playGameMusic } = useContext(AudioContext);

  useEffect(() => {
    const focusListener = addListener('focus', () => {
      setText1Key((prevKey) => prevKey + 1);
      if (soundEffects) playGameMusic();
      setText1(
        `Greetings, ${rank} ${name}! A cosmic challenge awaits you as we navigate the vast reaches of space. Our interstellar journey has encountered some celestial intricacies, and your astute mind is needed to unravel the mysteries that lie ahead.`
      );
      setText4(
        `${rank} ${name}, with your cosmic wisdom, you've crafted a unique mission tailored to your expertise. As we prepare to delve into the wonders of the universe, your choices will guide us through the cosmos. Brace yourself for an astronomical adventure—you've shaped this cosmic journey, and the universe eagerly awaits your exploration!`
      );
    });

    const blurListener = addListener('blur', () => {
      setCurrentStep(1);
      setDifficulty('');
      setDuration(0);
      setOkButton(false);
      setDifficultyButtons(false);
      setDurationButtons(false);
      setReadyButton(false);
      setDifficultyTyping(false);
      setDurationTyping(false);
      setReadyTyping(false);
      setShowDifficulty(false);
      setShowDuration(false);
      setShowReady(false);
      setOkTyping(true);
      setShowOk(true);
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation, soundEffects]);

  const { okTyping, setOkTyping, showOk, setShowOk } = useContext(GamesContext);

  const { rank, name, textSpeed, soundEffects } = useSelector(
    (state) => state.user
  );

  const { navigate, dispatch, addListener } = navigation;

  const skipOkText = () => {
    setShowOk(false);
    setOkTyping(false);
    setOkButton(true);
  };

  const skipDifficultyText = () => {
    setShowDifficulty(false);
    setDifficultyTyping(false);
    setDifficultyButtons(true);
  };

  const skipDurationText = () => {
    setShowDuration(false);
    setDurationTyping(false);
    setDurationButtons(true);
  };

  const skipReadyText = () => {
    setShowReady(false);
    setReadyTyping(false);
    setReadyButton(true);
  };

  const handleTypingEndIntro = () => {
    setShowOk(false);
    setOkButton(true);
    setOkTyping(true);
    setDifficultyTyping(true);
  };

  const handleTypingEndDifficulty = () => {
    setShowDifficulty(false);
    setDifficultyButtons(true);
    setDurationTyping(true);
  };

  const handleTypingEndDuration = () => {
    setShowDuration(false);
    setDurationButtons(true);
    setReadyTyping(true);
  };

  const handleTypingEndReady = () => {
    setShowReady(false);
    setReadyButton(true);
  };

  const handleOkClick = () => {
    setShowDifficulty(true);
    setShowOk(false);
    setCurrentStep(currentStep + 1);
    setOkButton(false);
    setDifficultyTyping(true);
  };

  const handleDifficultyClick = (choice) => {
    setShowDuration(true);
    setShowDifficulty(false);
    setDifficulty(choice);
    setCurrentStep(currentStep + 1);
    setDifficultyButtons(false);
    setDurationTyping(true);
  };

  const handleDurationClick = (choice) => {
    setShowReady(true);
    setShowDuration(false);
    setDuration(choice);
    setCurrentStep(currentStep + 1);
    setDurationButtons(false);
    setReadyTyping(true);
  };

  const handleReadyClick = () => {
    setShowReady(false);
    setCurrentStep(1);
    setDifficulty('');
    setDuration(0);
    setOkButton(false);
    setDifficultyButtons(false);
    setDurationButtons(false);
    setReadyButton(false);
    navigate('TriviaQuestion', {
      difficulty,
      duration,
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !okTyping ? (
          <Text variant='speech'>{text1}</Text>
        ) : (
          <TypeWriter
            typing={okTyping ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEndIntro}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text1}
          </TypeWriter>
        );
      case 2:
        return !difficultyTyping ? (
          <Text variant='speech'>{text2}</Text>
        ) : (
          <TypeWriter
            typing={difficultyTyping ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEndDifficulty}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text2}
          </TypeWriter>
        );
      case 3:
        return !durationTyping ? (
          <Text variant='speech'>{text3}</Text>
        ) : (
          <TypeWriter
            typing={durationTyping ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEndDuration}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text3}
          </TypeWriter>
        );
      case 4:
        return !readyTyping ? (
          <Text variant='speech'>{text4}</Text>
        ) : (
          <TypeWriter
            typing={readyTyping ? 1 : 0}
            maxDelay={textSpeed}
            onTypingEnd={handleTypingEndReady}
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
              {difficultyButtons && (
                <>
                  <Option onPress={() => handleDifficultyClick('easy')}>
                    <OptionText variant='body'>Lunar Learner (Easy)</OptionText>
                  </Option>
                  <Option onPress={() => handleDifficultyClick('medium')}>
                    <OptionText variant='body'>
                      Solar Seeker (Medium)
                    </OptionText>
                  </Option>
                  <Option onPress={() => handleDifficultyClick('hard')}>
                    <OptionText variant='body'>
                      Galactic Guardian (Hard)
                    </OptionText>
                  </Option>
                </>
              )}
              {durationButtons && (
                <>
                  <Option onPress={() => handleDurationClick(10)}>
                    <OptionText variant='body'>
                      Cosmic Quickstep (10 questions)
                    </OptionText>
                  </Option>
                  <Option onPress={() => handleDurationClick(20)}>
                    <OptionText variant='body'>
                      Galaxy Quest (20 questions)
                    </OptionText>
                  </Option>
                  <Option onPress={() => handleDurationClick(30)}>
                    <OptionText variant='body'>
                      Infinity Expedition (30 questions)
                    </OptionText>
                  </Option>
                </>
              )}
              {readyButton && (
                <Option onPress={handleReadyClick}>
                  <OptionText variant='body'>Let's Go!</OptionText>
                </Option>
              )}
              {showOk && okTyping && (
                <Option onPress={skipOkText}>
                  <MaterialIcons name='double-arrow' size={20} color='#fff' />
                </Option>
              )}
              {showDifficulty && difficultyTyping && (
                <Option onPress={skipDifficultyText}>
                  <MaterialIcons name='double-arrow' size={20} color='#fff' />
                </Option>
              )}
              {showDuration && durationTyping && (
                <Option onPress={skipDurationText}>
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
        </SetupSafeArea>
      )}
    </ImageBackground>
  );
};
