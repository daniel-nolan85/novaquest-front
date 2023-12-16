import { useEffect } from 'react';
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
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import { theme } from './src/infrastructure/theme';
import { PlanetsContextProvider } from './src/services/planets/planets.context';
import { ImagesContextProvider } from './src/services/images/images.context';
import { GamesContextProvider } from './src/services/games/games.context';
import { Navigation } from './src/infrastructure/navigation';
import { currentUser } from './src/requests/auth';

export const AppComponents = () => {
  const dispatch = useDispatch();

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
              email: res.data.email,
              role: res.data.role,
              lastLoginDate: res.data.lastLoginDate,
              daysInSpace: res.data.daysInSpace,
              name: res.data.name,
              textSpeed: res.data.textSpeed,
              viewedRovers: res.data.viewedRovers,
              viewedRoverCameras: res.data.viewedRoverCameras,
              viewedRoverDateTypes: res.data.viewedRoverDateTypes,
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
            },
          }).catch((err) => console.error(err));
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const [audiowideLoaded] = useAudiowide({ Audiowide_400Regular });
  const [questrialLoaded] = useQuestrial({ Questrial_400Regular });
  if (!audiowideLoaded || !questrialLoaded) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <GamesContextProvider>
          <PlanetsContextProvider>
            <ImagesContextProvider>
              <Navigation />
            </ImagesContextProvider>
          </PlanetsContextProvider>
        </GamesContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style='auto' />
      <Toast />
    </>
  );
};
