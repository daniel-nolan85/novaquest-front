import { useState, useEffect, useContext } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
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
} from '../styles/mars-rover-images-setup.styles';
import { SolSelector } from '../components/sol-selector.component';
import { EarthDateSelector } from '../components/earth-date-selector.component';
import { IconsWrapper } from '../../apod/styles/apod.styles';
import { ImagesContext } from '../../../../services/images/images.context';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';

export const MarsRoverImagesSetupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [landingDate, setLandingDate] = useState(null);
  const [maxSol, setMaxSol] = useState(null);
  const [maxEarth, setMaxEarth] = useState(null);
  const [roverButtons, setRoverButtons] = useState(false);
  const [dateTypeButtons, setDateTypeButtons] = useState(false);
  const [dateButtons, setDateButtons] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [roverTyping, setRoverTyping] = useState(true);
  const [dateTypeTyping, setDateTypeTyping] = useState(false);
  const [dateTyping, setDateTyping] = useState(false);
  const [readyTyping, setReadyTyping] = useState(false);
  const [showRover, setShowRover] = useState(true);
  const [showDateType, setShowDateType] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const [text1, setText1] = useState();
  const [text2] = useState(
    `Next, as we set our sights on Martian wonders, you have the power to choose how time unfolds. Would you prefer to view the Red Planet's landscapes based on Martian sols or Earth dates? Your decision will shape our journey through time, allowing you to witness the captivating moments on Mars according to your chosen temporal perspective.`
  );
  const [text3, setText3] = useState();
  const [text4, setText4] = useState();
  const [text1Key, setText1Key] = useState(0);

  useEffect(() => {
    setText1(
      `Greetings ${user.rank} ${user.name}! Are you ready to embark on a virtual journey to the Martian landscapes? Before you is a gallery of breathtaking images captured by the intrepid Mars Rovers. Choose your preferred rover to explore the Red Planet's wonders through the lens of these robotic pioneers. Each rover has its own unique perspective, so select wisely and uncover the mysteries of Mars at your fingertips!`
    );
    setText3(
      `Now, with your preferred time scale in mind, select the specific date you wish to explore. The cosmos awaits your chosen moment, ${user.rank} ${user.name}.`
    );
    setText4(
      `${user.rank} ${user.name}, your mission parameters are set, and the cosmic stage is primed. You've chosen your rover, date, and temporal perspective with precision. As the countdown begins, know that you are the architect of this celestial odyssey. Brace yourself, for your journey to the Red Planet is about to commence. Initiating launch sequence now. Godspeed, ${user.rank} ${user.name}, and may your exploration of the cosmos be nothing short of extraordinary!`
    );
  }, []);

  useEffect(() => {
    const focusListener = addListener('focus', () => {
      setText1Key((prevKey) => prevKey + 1);
    });

    const blurListener = addListener('blur', () => {
      setCurrentStep(1);
      setLandingDate(null);
      setMaxSol(null);
      setMaxEarth(null);
      setRoverButtons(false);
      setDateTypeButtons(false);
      setDateButtons(false);
      setReadyButton(false);
      setRoverTyping(true);
      setDateTypeTyping(false);
      setDateTyping(false);
      setReadyTyping(false);
      setShowRover(true);
      setShowDateType(false);
      setShowDate(false);
      setShowReady(false);
      setLaunchDate(null);
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation]);

  const { user } = useSelector((state) => ({ ...state }));

  const {
    selectedRover,
    setSelectedRover,
    dateType,
    setDateType,
    date,
    setDate,
    setLaunchDate,
  } = useContext(ImagesContext);

  useEffect(() => {
    if (selectedRover) retrieveDates();
  }, [selectedRover]);

  const retrieveDates = async () => {
    await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/manifests/${selectedRover}?api_key=${NASA_API_KEY}`
      )
      .then((res) => {
        setLaunchDate(res.data.photo_manifest.launch_date);
        setLandingDate(res.data.photo_manifest.landing_date);
        setMaxSol(res.data.photo_manifest.max_sol);
        setMaxEarth(res.data.photo_manifest.max_date);
      });
  };

  const { navigate, dispatch, addListener } = navigation;

  const skipRoverText = () => {
    setShowRover(false);
    setRoverTyping(false);
    setRoverButtons(true);
  };

  const skipDateTypeText = () => {
    setShowDateType(false);
    setDateTypeTyping(false);
    setDateTypeButtons(true);
  };

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

  const handleTypingEndIntro = () => {
    setShowRover(false);
    setRoverButtons(true);
    setRoverTyping(false);
  };

  const handleTypingEndDateType = () => {
    setShowDateType(false);
    setDateTypeButtons(true);
    setDateTypeTyping(false);
  };

  const handleTypingEndDate = () => {
    setShowDate(false);
    setDateButtons(true);
    setDateTyping(false);
  };

  const handleTypingEndReady = () => {
    setShowReady(false);
    setReadyButton(true);
    setReadyTyping(false);
  };

  const handleRoverClick = (choice) => {
    setShowDateType(true);
    setShowRover(false);
    setCurrentStep(currentStep + 1);
    setRoverButtons(false);
    setDateTypeTyping(true);
    setSelectedRover(choice);
  };

  const handleDateTypeClick = (choice) => {
    setShowDate(true);
    setShowDateType(false);
    setDateType(choice);
    setCurrentStep(currentStep + 1);
    setDateTypeButtons(false);
    setDateTyping(true);
  };

  const handleDateClick = (choice) => {
    setShowReady(true);
    setShowDate(false);
    setDate(choice);
    setCurrentStep(currentStep + 1);
    setDateButtons(false);
    setReadyTyping(true);
  };

  const handleReadyClick = async () => {
    setShowReady(false);
    setCurrentStep(1);
    setRoverButtons(false);
    setDateTypeButtons(false);
    setDateButtons(false);
    setReadyButton(false);
    navigate('MarsRoverImagesScreen');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !roverTyping ? (
          <Text variant='speech'>{text1}</Text>
        ) : (
          <TypeWriter
            typing={roverTyping ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEndIntro}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text1}
          </TypeWriter>
        );
      case 2:
        return !dateTypeTyping ? (
          <Text variant='speech'>{text2}</Text>
        ) : (
          <TypeWriter
            typing={dateTypeTyping ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEndDateType}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text2}
          </TypeWriter>
        );
      case 3:
        return !dateTyping ? (
          <Text variant='speech'>{text3}</Text>
        ) : (
          <TypeWriter
            typing={dateTyping ? 1 : 0}
            maxDelay={user.textSpeed}
            onTypingEnd={handleTypingEndDate}
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
            maxDelay={user.textSpeed}
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
        uri: 'https://res.cloudinary.com/daufzqlld/image/upload/v1704047788/cockpit_spyn2e.gif',
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
                {roverButtons && (
                  <>
                    <Option onPress={() => handleRoverClick('curiosity')}>
                      <OptionText variant='body'>Curiosity</OptionText>
                    </Option>
                    <Option onPress={() => handleRoverClick('opportunity')}>
                      <OptionText variant='body'>Opportunity</OptionText>
                    </Option>
                    <Option onPress={() => handleRoverClick('perseverance')}>
                      <OptionText variant='body'>Perseverance</OptionText>
                    </Option>
                    <Option onPress={() => handleRoverClick('spirit')}>
                      <OptionText variant='body'>Spirit</OptionText>
                    </Option>
                  </>
                )}
                {dateTypeButtons && (
                  <>
                    <Option onPress={() => handleDateTypeClick('sol')}>
                      <OptionText variant='body'>
                        Sol (Martian rotation or day)
                      </OptionText>
                    </Option>
                    <Option onPress={() => handleDateTypeClick('earth_date')}>
                      <OptionText variant='body'>Earth date</OptionText>
                    </Option>
                  </>
                )}
                {dateButtons && (
                  <>
                    {dateType === 'sol' && (
                      <>
                        <SolSelector
                          maxSol={maxSol}
                          date={date}
                          setDate={setDate}
                          handleDateClick={handleDateClick}
                        />
                        <Option onPress={() => handleDateClick(date)}>
                          <OptionText variant='body'>Ok</OptionText>
                        </Option>
                      </>
                    )}
                    {dateType === 'earth_date' && (
                      <>
                        <EarthDateSelector
                          maxEarth={maxEarth}
                          landingDate={landingDate}
                          setDate={setDate}
                        />
                        <Option onPress={() => handleDateClick(date)}>
                          <OptionText variant='body'>Ok</OptionText>
                        </Option>
                      </>
                    )}
                  </>
                )}
                {readyButton && (
                  <Option onPress={handleReadyClick}>
                    <OptionText variant='body'>Let's Go!</OptionText>
                  </Option>
                )}
                {showRover && roverTyping && (
                  <Option onPress={skipRoverText}>
                    <MaterialIcons name='double-arrow' size={20} color='#fff' />
                  </Option>
                )}
                {showDateType && dateTypeTyping && (
                  <Option onPress={skipDateTypeText}>
                    <MaterialIcons name='double-arrow' size={20} color='#fff' />
                  </Option>
                )}
                {showDate && dateTyping && (
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
