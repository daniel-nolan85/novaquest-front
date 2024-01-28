import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts as useAudiowide,
  Audiowide_400Regular,
} from '@expo-google-fonts/audiowide';
import {
  useFonts as useQuestrial,
  Questrial_400Regular,
} from '@expo-google-fonts/questrial';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import io from 'socket.io-client';
import { theme } from './src/infrastructure/theme';
import { ToastContextProvider } from './src/services/toast/toast.context';
import { AudioContextProvider } from './src/services/audio/audio.context';
import { SocialContextProvider } from './src/services/social/social.context';
import { PlanetsContextProvider } from './src/services/planets/planets.context';
import { ImagesContextProvider } from './src/services/images/images.context';
import { GamesContextProvider } from './src/services/games/games.context';
import { SettingsContextProvider } from './src/services/settings/settings.context';
import { Navigation } from './src/infrastructure/navigation';
import { currentUser } from './src/requests/auth';
import { incrementNotifsCount } from './src/requests/user';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Alien from './assets/svg/floaters/alien.svg';
import Planet from './assets/svg/floaters/planet.svg';
import Star from './assets/svg/floaters/star.svg';
import Ufo from './assets/svg/floaters/ufo.svg';
import { FactModal } from './src/components/modals/fact-modal';
import { FactAchievementModal } from './src/components/modals/fact-achievement-modal';
import { factsArray } from './src/services/facts/facts';
import { updateNumOfFacts } from './src/requests/user';

const iconComponents = [Alien, Planet, Star, Ufo];

export const AppComponents = () => {
  const [visible, setVisible] = useState(false);
  const [snack, setSnack] = useState('');
  const [randomFact, setRandomFact] = useState('');
  const [showFact, setShowFact] = useState(false);
  const [showFactAchievement, setShowFactAchievement] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const socket = io(process.env.SOCKET_IO_URL, { path: '/socket.io' });

  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const idToken = await user.accessToken;
        currentUser(idToken).then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              token: idToken,
              _id: res.data._id,
              ipAddresses: res.data.ipAddresses,
              email: res.data.email,
              role: res.data.role,
              noficationToken: res.data.noficationToken,
              notifications: res.data.notifications,
              newNotificationsCount: res.data.newNotificationsCount,
              xp: res.data.xp,
              rank: res.data.rank,
              bio: res.data.bio,
              profileImage: res.data.profileImage,
              lastLoginDate: res.data.lastLoginDate,
              createdAt: res.data.createdAt,
              daysInSpace: res.data.daysInSpace,
              name: res.data.name,
              allies: res.data.allies,
              explorers: res.data.explorers,
              blockeds: res.data.blockeds,
              textSpeed: res.data.textSpeed,
              soundEffects: res.data.soundEffects,
              highScore: res.data.highScore,
              viewedRovers: res.data.viewedRovers,
              viewedRoverCameras: res.data.viewedRoverCameras,
              viewedRoverDateTypes: res.data.viewedRoverDateTypes,
              viewedPlanets: res.data.viewedPlanets,
              numOfPosts: res.data.numOfPosts,
              numOfStars: res.data.numOfStars,
              numOfComments: res.data.numOfComments,
              numOfApods: res.data.numOfApods,
              numOfFacts: res.data.numOfFacts,
              numOfAsteroids: res.data.numOfAsteroids,
              achievedCosmicPioneer: res.data.achievedCosmicPioneer,
              achievedAdventurousExplorer: res.data.achievedAdventurousExplorer,
              achievedStellarVoyager: res.data.achievedStellarVoyager,
              achievedAstroPioneer: res.data.achievedAstroPioneer,
              achievedCosmicTrailblazer: res.data.achievedCosmicTrailblazer,
              achievedCelestialNomad: res.data.achievedCelestialNomad,
              achievedGalacticWayfarer: res.data.achievedGalacticWayfarer,
              achievedInterstellarVoyager: res.data.achievedInterstellarVoyager,
              achievedStellarCenturion: res.data.achievedStellarCenturion,
              achievedVoyagerExtraordinaire:
                res.data.achievedVoyagerExtraordinaire,
              achievedRedPlanetVoyager: res.data.achievedRedPlanetVoyager,
              achievedMarsRoverMaestro: res.data.achievedMarsRoverMaestro,
              achievedMartianLensMaster: res.data.achievedMartianLensMaster,
              achievedCosmicChronologist: res.data.achievedCosmicChronologist,
              achievedCosmicCadet: res.data.achievedCosmicCadet,
              achievedStarNavigator: res.data.achievedStarNavigator,
              achievedGalacticSage: res.data.achievedGalacticSage,
              achievedNovaScholar: res.data.achievedNovaScholar,
              achievedQuasarVirtuoso: res.data.achievedQuasarVirtuoso,
              achievedSupernovaSavant: res.data.achievedSupernovaSavant,
              achievedLightSpeedExplorer: res.data.achievedLightSpeedExplorer,
              achievedOdysseyTrailblazer: res.data.achievedOdysseyTrailblazer,
              achievedInfinityVoyager: res.data.achievedInfinityVoyager,
              achievedCelestialCadet: res.data.achievedCelestialCadet,
              achievedAstroAce: res.data.achievedAstroAce,
              achievedGalacticAviator: res.data.achievedGalacticAviator,
              achievedCosmicArranger: res.data.achievedCosmicArranger,
              achievedCelestialContributor:
                res.data.achievedCelestialContributor,
              achievedProlificExplorer: res.data.achievedProlificExplorer,
              achievedGalaxyLuminary: res.data.achievedGalaxyLuminary,
              achievedCosmicChronicler: res.data.achievedCosmicChronicler,
              achievedStellarSupporter: res.data.achievedStellarSupporter,
              achievedCosmicConversationalist:
                res.data.achievedCosmicConversationalist,
              achievedGalacticPlanetologist:
                res.data.achievedGalacticPlanetologist,
              achievedCosmicObserver: res.data.achievedCosmicObserver,
              achievedNebulaGazer: res.data.achievedNebulaGazer,
              achievedGalacticVisionary: res.data.achievedGalacticVisionary,
              achievedAsteroidScholar: res.data.achievedAsteroidScholar,
              achievedCelestialSavant: res.data.achievedCelestialSavant,
              achievedCosmicPersona: res.data.achievedCosmicPersona,
            },
          }).catch((err) => console.error(err));
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit('setup', user._id);
      socket.on('post liked', (userId) => {
        incrementNotifsNum(userId, 'liked your post');
      });
      socket.on('comment added', (userId) => {
        incrementNotifsNum(userId, 'commented on your post');
      });
      socket.on('post created', (userId) => {
        incrementNotifsNum(userId, 'created a new post');
      });
    }
  }, [user && user.token]);

  const incrementNotifsNum = async (userId, message) => {
    await incrementNotifsCount(user.token, user._id, user.role, userId, message)
      .then((res) => {
        const newNotifications = res.data.newNotificationsCount;
        setSnack(newNotifications[newNotifications.length - 1].message);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            newNotificationsCount: newNotifications,
          },
        });
        setVisible(true);
        setTimeout(() => {
          setSnack('');
          setVisible(false);
        }, 1500);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      animateImage();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [showIcon]);

  const animateImage = () => {
    translateY.setValue(0);
    translateX.setValue(-200);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 50,
          duration: 3000,
          easing: Easing.bezier(0.17, 0.17, 0.17, 0.17),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -50,
          duration: 4000,
          easing: Easing.bezier(0.17, 0.17, 0.17, 0.17),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 3000,
          easing: Easing.bezier(0.17, 0.17, 0.17, 0.17),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -50,
          duration: 4000,
          easing: Easing.bezier(0.17, 0.17, 0.17, 0.17),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(translateX, {
        toValue: Dimensions.get('window').width + 200,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const ImageComponent = () => {
    const RandomIconComponent =
      iconComponents[Math.floor(Math.random() * iconComponents.length)];

    return (
      <PanGestureHandler>
        <TouchableOpacity
          onPress={handleIconPress}
          style={styles.imageContainer}
        >
          {showIcon && (
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateY: translateY.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [-5, 0, -5],
                      }),
                    },
                    {
                      translateX: translateX,
                    },
                  ],
                },
              ]}
            >
              {RandomIconComponent && (
                <RandomIconComponent height={100} width={100} />
              )}
            </Animated.View>
          )}
        </TouchableOpacity>
      </PanGestureHandler>
    );
  };

  const handleIconPress = () => {
    if (user && user.numOfFacts < 101) {
      updateFacts();
    } else {
      const randomIndex = Math.floor(Math.random() * factsArray.length);
      setRandomFact(factsArray[randomIndex]);
      setShowFact(true);
      setShowIcon(false);
    }
  };

  const updateFacts = async () => {
    await updateNumOfFacts(user.token, user._id, user.role).then((res) => {
      if (res.data) setShowFactAchievement(true);
    });
  };

  const handleModalClose = () => {
    translateY.setValue(0);
    translateX.setValue(-200);
    setShowFact(false);
    setShowIcon(true);
    setRandomFact('');
  };

  const handleAchievementClose = () => {
    setShowFactAchievement(false);
    const randomIndex = Math.floor(Math.random() * factsArray.length);
    setRandomFact(factsArray[randomIndex]);
    setShowFact(true);
    setShowIcon(false);
  };

  const [audiowideLoaded] = useAudiowide({ Audiowide_400Regular });
  const [questrialLoaded] = useQuestrial({ Questrial_400Regular });
  if (!audiowideLoaded || !questrialLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ToastContextProvider>
            <AudioContextProvider>
              <SocialContextProvider>
                <SettingsContextProvider>
                  <GamesContextProvider>
                    <PlanetsContextProvider>
                      <ImagesContextProvider>
                        <Navigation />
                      </ImagesContextProvider>
                    </PlanetsContextProvider>
                  </GamesContextProvider>
                </SettingsContextProvider>
              </SocialContextProvider>
            </AudioContextProvider>
          </ToastContextProvider>
        </ThemeProvider>
        {randomFact ? (
          <FactModal
            showFact={showFact}
            randomFact={randomFact}
            handleModalClose={handleModalClose}
          />
        ) : (
          <ImageComponent />
        )}
        {showFactAchievement && (
          <FactAchievementModal
            showFactAchievement={showFactAchievement}
            handleAchievementClose={handleAchievementClose}
          />
        )}
        <Snackbar
          wrapperStyle={{ top: 40 }}
          visible={visible}
          style={{ backgroundColor: '#009999', padding: 5 }}
        >
          {snack}
        </Snackbar>
        <ExpoStatusBar style='auto' />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 50,
  },
});
