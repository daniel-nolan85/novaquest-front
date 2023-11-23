import { useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { app } from '../../../../firebase';
import { Text } from '../../../components/typography/text.component';
import {
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
  Input,
  Info,
} from '../styles/account.styles';

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
          .then(() => {
            setEmail('');
            setPassword('');
            Toast.show({
              type: 'success',
              text1: `A verification email has been sent to ${email}`,
              text2: 'Please click the link to complete your registration.',
              style: {
                width: '100%',
              },
            });
          })
          .catch((error) => {
            const errorMessage = error.message;
            Toast.show({
              type: 'error',
              text1: 'Error sending verification email:',
              text2: errorMessage,
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
          Toast.show({
            type: 'error',
            text1: 'Registration Failed',
            text2: 'The email address is already in use.',
          });
        } else if (errorCode === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Registration Failed',
            text2: 'Please enter a valid email.',
          });
        } else if (errorCode === 'auth/missing-password') {
          Toast.show({
            type: 'error',
            text1: 'Registration Failed',
            text2: 'Password must be at least 6 characters long.',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Registration Failed',
            text2: errorMessage || 'An error occurred during registration.',
          });
        }
        // ..
      });
  };

  return (
    <View>
      <Text variant='title' style={{ textAlign: 'center' }}>
        Register
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
        <Option onPress={handleRegistration}>
          <GradientBackground>
            <OptionText variant='body'>OK</OptionText>
          </GradientBackground>
        </Option>
      </OptionContainer>
      <Info variable='body'>
        After signing up, please check your email and click the link to complete
        your registration.
      </Info>
    </View>
  );
};
