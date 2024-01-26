import { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
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
import { checkBlockedList } from '../../../requests/auth';
export const ForgotPasswordModal = ({
  visible,
  setVisible,
  ip,
  setShowBlockedToast,
  setShowInvalidCredentialsToast,
  setShowInvalidEmailLoginToast,
  setShowErrorLoginToast,
  setShowResetPasswordToast,
  setResetPasswordTitle,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkBlocked = async () => {
    setIsLoading(true);
    await checkBlockedList(ip, email).then((res) => {
      if (res.data.length === 0) {
        handleSubmit();
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

  const handleSubmit = async () => {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        setResetPasswordTitle(
          `A reset password link has been sent to ${email}`
        );
        setShowResetPasswordToast(true);
        setTimeout(() => {
          setShowResetPasswordToast(false);
        }, 3000);
        setEmail('');
        setVisible(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        if (errorCode === 'auth/missing-email') {
          setShowInvalidEmailLoginToast(true);
          setTimeout(() => {
            setShowInvalidEmailLoginToast(false);
          }, 3000);
        } else if (errorCode === 'auth/invalid-email') {
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
              <Option onPress={checkBlocked}>
                <GradientBackground>
                  {isLoading ? (
                    <ActivityIndicator size='small' color='#fff' />
                  ) : (
                    <OptionText variant='body'>
                      Launch Password Recovery
                    </OptionText>
                  )}
                </GradientBackground>
              </Option>
            </OptionContainer>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
