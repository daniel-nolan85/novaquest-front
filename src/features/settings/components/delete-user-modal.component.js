import { useState, useContext } from 'react';
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
import { deleteUser } from '../../../requests/admin';
import { ToastContext } from '../../../services/toast/toast.context';

export const DeleteUserModal = ({
  visible,
  setVisible,
  userId,
  setUsers,
  hideUserModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setDeleteUserTitle, setDeleteUserBody, setShowDeleteUserToast } =
    useContext(ToastContext);

  const { token } = useSelector((state) => state.user);

  const closeModal = () => {
    if (!isLoading) {
      setVisible(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    await deleteUser(token, userId)
      .then(async (res) => {
        setUsers((prevUsers) =>
          prevUsers.filter((prevUser) => prevUser._id !== userId)
        );
        setDeleteUserTitle(
          `${res.data.rank} ${res.data.name} has been successfully deleted.`
        );
        setDeleteUserBody(`Farewell ${res.data.rank} ${res.data.name}.`);
        setShowDeleteUserToast(true);
        setTimeout(() => {
          setShowDeleteUserToast(false);
        }, 3000);
        setIsLoading(true);
        setVisible(false);
        hideUserModal();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error in delete function:', error);
      });
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
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
              Are you sure you want to delete this user?
            </Title>
            <Body variant='body'>
              This action is irreversible, and all associated data will be
              permanently removed. Please confirm your decision.
            </Body>
            <OptionContainer>
              <Option onPress={handleDeleteUser}>
                <CancelGradientBackground>
                  {isLoading ? (
                    <ActivityIndicator size='large' color='#fff' />
                  ) : (
                    <>
                      <TrashWhite height={32} width={32} />
                      <OptionText variant='body'>Delete User</OptionText>
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
