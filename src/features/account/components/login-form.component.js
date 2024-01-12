import { useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
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

export const LoginForm = ({ handleGuestLogin }) => {
  const [email, setEmail] = useState('daniel@nolancode.com');
  const [password, setPassword] = useState('Lennon1027');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const checkBlocked = async () => {
    setIsLoading(true);
    await checkBlockedList(email).then((res) => {
      if (res.data.length === 0) {
        handleLogin();
      } else {
        Toast.show({
          type: 'error',
          text1: `Oops! It seems like this email address has been blocked.`,
          text2:
            'Please use a different email to log in or contact support for assistance.',
          style: {
            width: '100%',
          },
        });
        return;
      }
    });
  };

  const handleLogin = async () => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const idToken = user.accessToken;
          createOrUpdateUser(idToken)
            .then((res) => {
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  token: idToken,
                  _id: res.data._id,
                  email: res.data.email,
                  role: res.data.role,
                  noficationToken: res.data.noficationToken,
                  nofications: res.data.nofications,
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
                  highScore: res.data.highScore,
                  viewedRovers: res.data.viewedRovers,
                  viewedRoverCameras: res.data.viewedRoverCameras,
                  viewedRoverDateTypes: res.data.viewedRoverDateTypes,
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
                },
              });
            })
            .catch((err) => console.error(err));
        } else {
          Toast.show({
            type: 'error',
            text1: 'Email Not Verified',
            text2:
              'Please check your email and click the verification link to complete your registration.',
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Please enter a valid email.',
          });
        } else if (errorCode === 'auth/missing-password') {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Password must be at least 6 characters long.',
          });
        } else if (errorCode === 'auth/invalid-login-credentials') {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2:
              'No account found with the provided credentials. Please check your email and password.',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: errorMessage || 'An error occurred during registration.',
          });
        }
      });
  };

  return (
    <View>
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
      <OptionContainer>
        <Option onPress={checkBlocked} disabled={isLoading}>
          <GradientBackground>
            {isLoading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <OptionText variant='body'>Blast Off!</OptionText>
            )}
          </GradientBackground>
        </Option>
      </OptionContainer>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text variant='body' style={{ textAlign: 'center' }}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      <ForgotPasswordModal visible={visible} setVisible={setVisible} />
      <OptionContainer>
        <Option onPress={handleGuestLogin} disabled={isLoading}>
          <GradientBackground>
            <OptionText variant='body'>Embark as Guest Explorer</OptionText>
          </GradientBackground>
        </Option>
      </OptionContainer>
    </View>
  );
};
