import { useState, useEffect, useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
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

export const MarsRoverImagesSetupScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [landingDate, setLandingDate] = useState(null);
  const [maxSol, setMaxSol] = useState(null);
  const [maxEarth, setMaxEarth] = useState(null);
  const [roverButtons, setRoverButtons] = useState(false);
  const [cameraButtons, setCameraButtons] = useState(false);
  const [dateTypeButtons, setDateTypeButtons] = useState(false);
  const [dateButtons, setDateButtons] = useState(false);
  const [readyButton, setReadyButton] = useState(false);
  const [roverTyping, setRoverTyping] = useState(true);
  const [cameraTyping, setCameraTyping] = useState(false);
  const [dateTypeTyping, setDateTypeTyping] = useState(false);
  const [dateTyping, setDateTyping] = useState(false);
  const [readyTyping, setReadyTyping] = useState(false);
  const [showRover, setShowRover] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [showDateType, setShowDateType] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const [text1] = useState(
    `Greetings Commander! Are you ready to embark on a virtual journey to the Martian landscapes? Before you is a gallery of breathtaking images captured by the intrepid Mars Rovers. Choose your preferred rover to explore the Red Planet's wonders through the lens of these robotic pioneers. Each rover has its own unique perspective, so select wisely and uncover the mysteries of Mars at your fingertips!`
  );
  const [text2] = useState(
    `As we prepare to delve into the Red Planet's mysteries, you have the distinguished choice of cameras. Opt for the lens that will capture the Red Planet's beauty through your command, from the reliable Hazard Avoidance Camera to the steadfast Navigation Camera and beyond. Each rover boasts its own set of specialized lenses, unveiling Mars in all its celestial splendour. The cosmos awaits your command, Commander.`
  );
  const [text3] = useState(
    `Next, as we set our sights on Martian wonders, you have the power to choose how time unfolds. Would you prefer to view the Red Planet's landscapes based on Martian sols or Earth dates? Your decision will shape our journey through time, allowing you to witness the captivating moments on Mars according to your chosen temporal perspective.`
  );
  const [text4] = useState(
    `Now, with your preferred time scale in mind, select the specific date you wish to explore. The cosmos awaits your chosen moment, Commander.`
  );
  const [text5] = useState(
    `Commander, your mission parameters are set, and the cosmic stage is primed. You've chosen your rover, lens, date, and temporal perspective with precision. As the countdown begins, know that you are the architect of this celestial odyssey. Brace yourself, Commander, for your journey to the Red Planet is about to commence. Initiating launch sequence now. Godspeed, Commander, and may your exploration of the cosmos be nothing short of extraordinary!`
  );

  const {
    selectedRover,
    setSelectedRover,
    setCamera,
    dateType,
    setDateType,
    date,
    setDate,
    setLaunchDate,
    setCameraFullName,
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

  const { navigate, dispatch } = navigation;

  const skipRoverText = () => {
    setShowRover(false);
    setRoverTyping(false);
    setRoverButtons(true);
  };

  const skipCameraText = () => {
    setShowCamera(false);
    setCameraTyping(false);
    setCameraButtons(true);
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
    setRoverTyping(true);
    setCameraTyping(true);
  };

  const handleTypingEndCamera = () => {
    setShowCamera(false);
    setCameraButtons(true);
    setDateTypeTyping(true);
  };

  const handleTypingEndDateType = () => {
    setShowDateType(false);
    setDateTypeButtons(true);
    setDateTyping(true);
  };

  const handleTypingEndDate = () => {
    setShowDate(false);
    setDateButtons(true);
    setReadyTyping(true);
  };

  const handleTypingEndReady = () => {
    setShowReady(false);
    setReadyButton(true);
  };

  const handleRoverClick = (choice) => {
    setShowCamera(true);
    setShowRover(false);
    setCurrentStep(currentStep + 1);
    setRoverButtons(false);
    setCameraTyping(true);
    setSelectedRover(choice);
  };

  const handleCameraClick = (choice) => {
    setShowDateType(true);
    setShowCamera(false);
    setCamera(choice);
    setCurrentStep(currentStep + 1);
    setCameraButtons(false);
    setDateTypeTyping(true);
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

  const handleReadyClick = () => {
    setShowReady(false);
    setCurrentStep(1);
    setRoverButtons(false);
    setCameraButtons(false);
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
            maxDelay={50}
            onTypingEnd={handleTypingEndIntro}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text1}
          </TypeWriter>
        );
      case 2:
        return !cameraTyping ? (
          <Text variant='speech'>{text2}</Text>
        ) : (
          <TypeWriter
            typing={cameraTyping ? 1 : 0}
            maxDelay={50}
            onTypingEnd={handleTypingEndCamera}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text2}
          </TypeWriter>
        );
      case 3:
        return !dateTypeTyping ? (
          <Text variant='speech'>{text3}</Text>
        ) : (
          <TypeWriter
            typing={dateTypeTyping ? 1 : 0}
            maxDelay={50}
            onTypingEnd={handleTypingEndDateType}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text3}
          </TypeWriter>
        );
      case 4:
        return !dateTyping ? (
          <Text variant='speech'>{text4}</Text>
        ) : (
          <TypeWriter
            typing={dateTyping ? 1 : 0}
            maxDelay={50}
            onTypingEnd={handleTypingEndDate}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text4}
          </TypeWriter>
        );
      case 5:
        return !readyTyping ? (
          <Text variant='speech'>{text5}</Text>
        ) : (
          <TypeWriter
            typing={readyTyping ? 1 : 0}
            maxDelay={50}
            onTypingEnd={handleTypingEndReady}
            style={{ fontFamily: 'Audiowide_400Regular' }}
          >
            {text5}
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
            {cameraButtons && (
              <>
                {selectedRover === 'curiosity' && (
                  <>
                    <Option
                      onPress={() => {
                        handleCameraClick('fhaz');
                        setCameraFullName('Front Hazard Avoidance Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Front Hazard Avoidance Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('rhaz');
                        setCameraFullName('Rear Hazard Avoidance Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Rear Hazard Avoidance Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('mast');
                        setCameraFullName('Mast Camera');
                      }}
                    >
                      <OptionText variant='body'>Mast Camera</OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('chemcam');
                        setCameraFullName('Chemistry and Camera Complex');
                      }}
                    >
                      <OptionText variant='body'>
                        Chemistry and Camera Complex
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('mahli');
                        setCameraFullName('Mars Hand Lens Imager');
                      }}
                    >
                      <OptionText variant='body'>
                        Mars Hand Lens Imager
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('mardi');
                        setCameraFullName('Mars Descent Imager');
                      }}
                    >
                      <OptionText variant='body'>
                        Mars Descent Imager
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('navcam');
                        setCameraFullName('Navigation Camera');
                      }}
                    >
                      <OptionText variant='body'>Navigation Camera</OptionText>
                    </Option>
                  </>
                )}
                {selectedRover === 'opportunity' && (
                  <>
                    <Option
                      onPress={() => {
                        handleCameraClick('fhaz');
                        setCameraFullName('Front Hazard Avoidance Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Front Hazard Avoidance Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('rhaz');
                        setCameraFullName('Rear Hazard Avoidance Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Rear Hazard Avoidance Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('navcam');
                        setCameraFullName('Navigation Camera');
                      }}
                    >
                      <OptionText variant='body'>Navigation Camera</OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('pancam');
                        setCameraFullName('Panoramic Camera');
                      }}
                    >
                      <OptionText variant='body'>Panoramic Camera</OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('minites');
                        setCameraFullName(
                          'Miniature Thermal Emission Spectrometer (Mini-TES)'
                        );
                      }}
                    >
                      <OptionText variant='body'>
                        Miniature Thermal Emission Spectrometer (Mini-TES)
                      </OptionText>
                    </Option>
                  </>
                )}
                {selectedRover === 'perseverance' && (
                  <>
                    <Option
                      onPress={() => {
                        handleCameraClick('edl_rucam');
                        setCameraFullName('Rover Up-Look Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Rover Up-Look Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('edl_rdcam');
                        setCameraFullName('Rover Down-Look Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Rover Down-Look Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('edl_ddcam');
                        setCameraFullName('Descent Stage Down-Look Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Descent Stage Down-Look Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('edl_pucam1');
                        setCameraFullName('Parachute Up-Look Camera A');
                      }}
                    >
                      <OptionText variant='body'>
                        Parachute Up-Look Camera A
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('edl_pucam2');
                        setCameraFullName('Parachute Up-Look Camera B');
                      }}
                    >
                      <OptionText variant='body'>
                        Parachute Up-Look Camera B
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('navcam_left');
                        setCameraFullName('Navigation Camera - Left');
                      }}
                    >
                      <OptionText variant='body'>
                        Navigation Camera - Left
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('navcam_right');
                        setCameraFullName('Navigation Camera - Right');
                      }}
                    >
                      <OptionText variant='body'>
                        Navigation Camera - Right
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('mcz_left');
                        setCameraFullName('Mast Camera Zoom - Left');
                      }}
                    >
                      <OptionText variant='body'>
                        Mast Camera Zoom - Left
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('mcz_right');
                        setCameraFullName('Mast Camera Zoom - Right');
                      }}
                    >
                      <OptionText variant='body'>
                        Mast Camera Zoom - Right
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('front_hazcam_left_a');
                        setCameraFullName(
                          'Front Hazard Avoidance Camera - Left'
                        );
                      }}
                    >
                      <OptionText variant='body'>
                        Front Hazard Avoidance Camera - Left
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('front_hazcam_right_a');
                        setCameraFullName(
                          'Front Hazard Avoidance Camera - Right'
                        );
                      }}
                    >
                      <OptionText variant='body'>
                        Front Hazard Avoidance Camera - Right
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('rear_hazcam_left');
                        setCameraFullName(
                          'Rear Hazard Avoidance Camera - Left'
                        );
                      }}
                    >
                      <OptionText variant='body'>
                        Rear Hazard Avoidance Camera - Left
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('rear_hazcam_right');
                        setCameraFullName(
                          'Rear Hazard Avoidance Camera - Right'
                        );
                      }}
                    >
                      <OptionText variant='body'>
                        Rear Hazard Avoidance Camera - Right
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('skycam');
                        setCameraFullName('MEDA Skycam');
                      }}
                    >
                      <OptionText variant='body'>MEDA Skycam</OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('sherloc_watson');
                        setCameraFullName('Sherlock Watson Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Sherlock Watson Camera
                      </OptionText>
                    </Option>
                  </>
                )}
                {selectedRover === 'spirit' && (
                  <>
                    <Option
                      onPress={() => {
                        handleCameraClick('fhaz');
                        setCameraFullName('Front Hazard Avoidance Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Front Hazard Avoidance Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('rhaz');
                        setCameraFullName('Rear Hazard Avoidance Camera');
                      }}
                    >
                      <OptionText variant='body'>
                        Rear Hazard Avoidance Camera
                      </OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('navcam');
                        setCameraFullName('Navigation Camera');
                      }}
                    >
                      <OptionText variant='body'>Navigation Camera</OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('pancam');
                        setCameraFullName('Panoramic Camera');
                      }}
                    >
                      <OptionText variant='body'>Panoramic Camera</OptionText>
                    </Option>
                    <Option
                      onPress={() => {
                        handleCameraClick('minites');
                        setCameraFullName(
                          'Miniature Thermal Emission Spectrometer (Mini-TES)'
                        );
                      }}
                    >
                      <OptionText variant='body'>
                        Miniature Thermal Emission Spectrometer (Mini-TES)
                      </OptionText>
                    </Option>
                  </>
                )}
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
            {showCamera && cameraTyping && (
              <Option onPress={skipCameraText}>
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
  );
};
