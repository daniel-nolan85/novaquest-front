import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import { createOrLocateUser } from '../../../requests/auth';

export const LoginForm = () => {
  const [email, setEmail] = useState('danielnolan85@yahoo.com');
  const [password, setPassword] = useState('Lennon1027');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const idToken = user.accessToken;
          createOrLocateUser(idToken)
            .then((res) => {
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  token: idToken,
                  _id: res.data._id,
                  email: res.data.email,
                  role: res.data.role,
                  name: res.data.name,
                  textSpeed: res.data.textSpeed,
                  viewedRovers: res.data.viewedRovers,
                  viewedRoverCameras: res.data.viewedRoverCameras,
                  viewedRoverDateTypes: res.data.viewedRoverDateTypes,
                  achievedCosmicPioneer: res.data.achievedCosmicPioneer,
                  achievedRedPlanetVoyager: res.data.achievedRedPlanetVoyager,
                  achievedMarsRoverMaestro: res.data.achievedMarsRoverMaestro,
                  achievedMartianLensMaster: res.data.achievedMartianLensMaster,
                  achievedCosmicChronologist:
                    res.data.achievedCosmicChronologist,
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

  const handleGuestLogin = () => {
    //
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
        <Option onPress={handleLogin}>
          <GradientBackground>
            <OptionText variant='body'>Blast Off!</OptionText>
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
        <Option onPress={handleGuestLogin}>
          <GradientBackground>
            <OptionText variant='body'>Embark as Guest Explorer</OptionText>
          </GradientBackground>
        </Option>
      </OptionContainer>
    </View>
  );
};
