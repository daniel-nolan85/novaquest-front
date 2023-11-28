import { useState } from 'react';
import { Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../../../../firebase';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AnimationWrapper,
  Animation,
  Input,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
} from '../styles/forgot-password-modal.styles';
import Close from '../../../../assets/svg/close.svg';

export const ForgotPasswordModal = ({ visible, setVisible }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        setEmail('');
        setVisible(false);
        Toast.show({
          type: 'success',
          text1: `A reset password link has been sent to ${email}`,
          text2: 'Please follow the instructions to reset your password.',
          style: {
            width: '100%',
          },
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/missing-email') {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Please enter a valid email.',
          });
        } else if (errorCode === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Please enter a valid email.',
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
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={() => setVisible(false)}>
              <Close />
            </CloseIcon>
            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='cover'
                source={require('../../../../assets/animation/lost.json')}
              />
            </AnimationWrapper>
            <Text variant='title' style={{ textAlign: 'center' }}>
              Lost in Space?
            </Text>
            <Input
              label={<Text variant='body'>Email</Text>}
              type='email'
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType='email-address'
            />
            <OptionContainer>
              <Option onPress={handleSubmit}>
                <GradientBackground>
                  <OptionText variant='body'>
                    Launch Password Recovery
                  </OptionText>
                </GradientBackground>
              </Option>
            </OptionContainer>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
