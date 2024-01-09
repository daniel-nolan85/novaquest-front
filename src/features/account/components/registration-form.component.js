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
import { checkBlockedList } from '../../../requests/auth';

export const RegistrationForm = ({ handleGuestLogin }) => {
  const [email, setEmail] = useState('daniel@nolancode.com');
  const [password, setPassword] = useState('Lennon1027');

  const checkBlocked = async () => {
    await checkBlockedList(email).then((res) => {
      if (res.data.length === 0) {
        handleRegistration();
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

  const handleRegistration = async () => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
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
      });
  };

  return (
    <View>
      <Text variant='title' style={{ textAlign: 'center' }}>
        Register
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
        <Option onPress={checkBlocked}>
          <GradientBackground>
            <OptionText variant='body'>Prepare for Launch...</OptionText>
          </GradientBackground>
        </Option>
      </OptionContainer>
      <Info variable='body'>
        After signing up, please check your email and click the link to complete
        your registration.
      </Info>
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
