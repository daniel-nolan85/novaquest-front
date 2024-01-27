import { useState } from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../../firebase';
import { Text } from '../../../components/typography/text.component';
import {
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
  Input,
} from '../styles/account.styles';
import { ForgotPasswordModal } from './forgot-password-modal.component';
import { checkBlockedList, createOrUpdateUser } from '../../../requests/auth';

export const LoginForm = ({
  handleGuestLogin,
  ip,
  setShowBlockedToast,
  setShowPasswordLoginToast,
  setShowEmailInvalidToast,
  setShowEmailNotVerifiedToast,
  setShowInvalidCredentialsToast,
  setShowInvalidEmailLoginToast,
  setShowErrorLoginToast,
  setShowResetPasswordToast,
  setResetPasswordTitle,
}) => {
  const [email, setEmail] = useState('daniel@nolancode.com');
  const [password, setPassword] = useState('Lennon1027');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  console.log({ ip });

  const checkBlocked = async () => {
    setIsLoading(true);
    await checkBlockedList(ip, email).then((res) => {
      if (res.data.length === 0) {
        handleLogin();
      } else {
        setIsLoading(false);
        setShowBlockedToast(true);
        setTimeout(() => {
          setShowBlockedToast(false);
        }, 3000);
        return;
      }
    });
  };

  const handleLogin = async () => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setShowEmailInvalidToast(true);
      setTimeout(() => {
        setShowEmailInvalidToast(false);
      }, 3000);
      setIsLoading(false);
      return;
    }
    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      setShowPasswordLoginToast(true);
      setTimeout(() => {
        setShowPasswordLoginToast(false);
      }, 3000);
      setIsLoading(false);
      return;
    }

    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const idToken = user.accessToken;
          createOrUpdateUser(idToken, ip)
            .then((res) => {
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
                  achievedAdventurousExplorer:
                    res.data.achievedAdventurousExplorer,
                  achievedStellarVoyager: res.data.achievedStellarVoyager,
                  achievedAstroPioneer: res.data.achievedAstroPioneer,
                  achievedCosmicTrailblazer: res.data.achievedCosmicTrailblazer,
                  achievedCelestialNomad: res.data.achievedCelestialNomad,
                  achievedGalacticWayfarer: res.data.achievedGalacticWayfarer,
                  achievedInterstellarVoyager:
                    res.data.achievedInterstellarVoyager,
                  achievedStellarCenturion: res.data.achievedStellarCenturion,
                  achievedVoyagerExtraordinaire:
                    res.data.achievedVoyagerExtraordinaire,
                  achievedRedPlanetVoyager: res.data.achievedRedPlanetVoyager,
                  achievedMarsRoverMaestro: res.data.achievedMarsRoverMaestro,
                  achievedMartianLensMaster: res.data.achievedMartianLensMaster,
                  achievedCosmicChronologist:
                    res.data.achievedCosmicChronologist,
                  achievedCosmicCadet: res.data.achievedCosmicCadet,
                  achievedStarNavigator: res.data.achievedStarNavigator,
                  achievedGalacticSage: res.data.achievedGalacticSage,
                  achievedNovaScholar: res.data.achievedNovaScholar,
                  achievedQuasarVirtuoso: res.data.achievedQuasarVirtuoso,
                  achievedSupernovaSavant: res.data.achievedSupernovaSavant,
                  achievedLightSpeedExplorer:
                    res.data.achievedLightSpeedExplorer,
                  achievedOdysseyTrailblazer:
                    res.data.achievedOdysseyTrailblazer,
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
              });
            })
            .catch((err) => console.error(err));
        } else {
          setShowEmailNotVerifiedToast(true);
          setTimeout(() => {
            setShowEmailNotVerifiedToast(false);
          }, 3000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          setShowInvalidEmailLoginToast(true);
          setTimeout(() => {
            setShowInvalidEmailLoginToast(false);
          }, 3000);
        } else if (errorCode === 'auth/invalid-login-credentials') {
          setShowInvalidCredentialsToast(true);
          setTimeout(() => {
            setShowInvalidCredentialsToast(false);
          }, 3000);
        } else {
          setShowErrorLoginToast(true);
          setTimeout(() => {
            setShowErrorLoginToast(false);
          }, 3000);
        }
      });
  };

  return (
    <View>
      <KeyboardAvoidingView>
        <Text variant='title' style={{ textAlign: 'center' }}>
          Login
        </Text>
        <Input
          label={<Text variant='body'>Email</Text>}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType='email-address'
        />
        <Input
          label={<Text variant='body'>Password</Text>}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Option onPress={checkBlocked} disabled={isLoading}>
          <GradientBackground>
            {isLoading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <OptionText variant='body'>Blast Off!</OptionText>
            )}
          </GradientBackground>
        </Option>
        <Option onPress={handleGuestLogin} disabled={isLoading}>
          <GradientBackground>
            <OptionText variant='body'>Embark as Guest Explorer</OptionText>
          </GradientBackground>
        </Option>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text
            variant='body'
            style={{ textAlign: 'center', color: '#009999' }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
        <ForgotPasswordModal
          visible={visible}
          setVisible={setVisible}
          ip={ip}
          setShowBlockedToast={setShowBlockedToast}
          setShowEmailInvalidToast={setShowEmailInvalidToast}
          setShowInvalidCredentialsToast={setShowInvalidCredentialsToast}
          setShowInvalidEmailLoginToast={setShowInvalidEmailLoginToast}
          setShowErrorLoginToast={setShowErrorLoginToast}
          setShowResetPasswordToast={setShowResetPasswordToast}
          setResetPasswordTitle={setResetPasswordTitle}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
