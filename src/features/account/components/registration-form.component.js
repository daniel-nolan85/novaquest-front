import { useState } from 'react';
import { View, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { app } from '../../../../firebase';
import { Text } from '../../../components/typography/text.component';
import {
  Option,
  GradientBackground,
  OptionText,
  Input,
  LegalView,
  Legal,
  LegalDoc,
} from '../styles/account.styles';
import { checkBlockedList } from '../../../requests/auth';

export const RegistrationForm = ({
  handleGuestLogin,
  navigate,
  ip,
  setShowBlockedToast,
  setShowEmailInvalidToast,
  setShowPasswordRegistrationToast,
  setShowVerificationSuccessToast,
  setShowVerificationErrorToast,
  setShowEmailInUseToast,
  setShowInvalidEmailRegistrationToast,
  setShowErrorRegistrationToast,
  setVerificationSuccessTitle,
}) => {
  const [email, setEmail] = useState('daniel@nolancode.com');
  const [password, setPassword] = useState('Lennon1027');
  const [isLoading, setIsLoading] = useState(false);

  const checkBlocked = async () => {
    setIsLoading(true);
    await checkBlockedList(ip, email).then((res) => {
      if (res.data.length === 0) {
        handleRegistration();
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

  const handleRegistration = async () => {
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
      setShowPasswordRegistrationToast(true);
      setTimeout(() => {
        setShowPasswordRegistrationToast(false);
      }, 3000);
      setIsLoading(false);
      return;
    }

    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
          .then(() => {
            setVerificationSuccessTitle(
              `A verification email has been sent to ${email}`
            );
            setShowVerificationSuccessToast(true);
            setTimeout(() => {
              setShowVerificationSuccessToast(false);
            }, 3000);
            setEmail('');
            setPassword('');
            setIsLoading(false);
          })
          .catch((error) => {
            const errorMessage = error.message;
            setShowVerificationErrorToast(true);
            setTimeout(() => {
              setShowVerificationErrorToast(false);
            }, 3000);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setShowEmailInUseToast(true);
          setTimeout(() => {
            setShowEmailInUseToast(false);
          }, 3000);
        } else if (errorCode === 'auth/invalid-email') {
          setShowInvalidEmailRegistrationToast(true);
          setTimeout(() => {
            setShowInvalidEmailRegistrationToast(false);
          }, 3000);
        } else {
          setShowErrorRegistrationToast(true);
          setTimeout(() => {
            setShowErrorRegistrationToast(false);
          }, 3000);
        }
        setIsLoading(false);
      });
  };

  const showTerms = () => {
    navigate('TermsAndConditions');
  };

  const showPrivacy = () => {
    navigate('PrivacyPolicy');
  };

  const showCookies = () => {
    navigate('CookiesPolicy');
  };

  return (
    <View>
      <KeyboardAvoidingView>
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
        <Option onPress={checkBlocked} disabled={isLoading}>
          <GradientBackground>
            {isLoading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <OptionText variant='body'>Prepare for Launch...</OptionText>
            )}
          </GradientBackground>
        </Option>
        <Option onPress={handleGuestLogin} disabled={isLoading}>
          <GradientBackground>
            <OptionText variant='body'>Embark as Guest Explorer</OptionText>
          </GradientBackground>
        </Option>
        <LegalView>
          <Legal variant='body'>
            Your stellar journey is guided by our
            <LegalDoc variant='body' onPress={showTerms}>
              {' '}
              Terms
            </LegalDoc>
            ,
            <LegalDoc variant='body' onPress={showPrivacy}>
              {' '}
              Privacy
            </LegalDoc>
            , and
            <LegalDoc variant='body' onPress={showCookies}>
              {' '}
              Cookies
            </LegalDoc>{' '}
            policies.
          </Legal>
        </LegalView>
      </KeyboardAvoidingView>
    </View>
  );
};
