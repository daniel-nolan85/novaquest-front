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

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const idToken = user.accessToken;
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idToken,
            },
          });
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
        label='Email'
        type='email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType='email-address'
      />
      <Input
        label='Password'
        type='password'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <OptionContainer>
        <Option onPress={handleLogin}>
          <GradientBackground>
            <OptionText variant='body'>OK</OptionText>
          </GradientBackground>
        </Option>
      </OptionContainer>
      {/* <TouchableOpacity>
        <Text variant='body'>Forgot password?</Text>
      </TouchableOpacity> */}
    </View>
  );
};
