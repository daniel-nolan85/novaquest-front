import { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AnimationWrapper,
  Animation,
  Title,
  Body,
  OptionContainer,
  Option,
  CancelGradientBackground,
  OptionText,
} from '../styles/delete-user-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import TrashWhite from '../../../../assets/svg/trash-white';
import { deleteAccount } from '../../../requests/auth';

export const DeleteAccountModal = ({
  showDelete,
  closeDeleteModal,
  logout,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { token, _id, role } = useSelector((state) => state.user);

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    await deleteAccount(token, _id, role)
      .then(async (res) => {
        Toast.show({
          type: 'success',
          text1: `Your account has been successfully deleted.`,
          text2: `Farewell ${res.data.rank} ${res.data.name}.`,
          style: {
            width: '100%',
          },
        });
        setIsLoading(true);
        closeDeleteModal();
        logout();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error in delete function:', error);
      });
  };

  return (
    <SafeArea>
      <Modal visible={showDelete} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeDeleteModal}>
              <Close />
            </CloseIcon>
            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='contain'
                source={require('../../../../assets/animation/delete.json')}
              />
            </AnimationWrapper>
            <Title variant='title'>
              Are you sure you want to delete your account?
            </Title>
            <Body variant='body'>
              This action is irreversible, and all associated data will be
              permanently removed. Please confirm your decision.
            </Body>
            <OptionContainer>
              <Option onPress={handleDeleteAccount}>
                <CancelGradientBackground>
                  {isLoading ? (
                    <ActivityIndicator size='large' color='#fff' />
                  ) : (
                    <>
                      <TrashWhite height={32} width={32} />
                      <OptionText variant='body'>Delete Account</OptionText>
                    </>
                  )}
                </CancelGradientBackground>
              </Option>
            </OptionContainer>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
