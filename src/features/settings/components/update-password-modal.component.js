import { Modal, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
  Input,
} from '../styles/settings.styles';
import { SafeArea } from '../../../components/utils/safe-area.component';
import Close from '../../../../assets/svg/close.svg';
import { Text } from '../../../components/typography/text.component';

export const UpdatePasswordModal = ({
  email,
  setEmail,
  showPassword,
  password,
  setPassword,
  updateUserPassword,
  closePasswordModal,
  isLoading,
}) => {
  return (
    <>
      <SafeArea>
        <KeyboardAvoidingView>
          <Modal
            visible={showPassword}
            transparent={true}
            animationType='slide'
          >
            <ModalWrapper>
              <ModalView>
                <CloseIcon onPress={closePasswordModal}>
                  <Close />
                </CloseIcon>
                <Input
                  label={<Text variant='body'>Enter your email</Text>}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType='email-address'
                />
                <Input
                  label={<Text variant='body'>Enter your new password</Text>}
                  type='password'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
                <OptionContainer>
                  <Option onPress={updateUserPassword}>
                    <GradientBackground>
                      {isLoading ? (
                        <ActivityIndicator size='small' color='#fff' />
                      ) : (
                        <OptionText variant='body'>
                          Update Launch Credentials
                        </OptionText>
                      )}
                    </GradientBackground>
                  </Option>
                </OptionContainer>
              </ModalView>
            </ModalWrapper>
          </Modal>
        </KeyboardAvoidingView>
      </SafeArea>
    </>
  );
};
