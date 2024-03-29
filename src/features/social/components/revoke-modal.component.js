import { useState, useContext } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AllianceImage,
  Name,
  AllianceButtonsWrapper,
  Option,
  GradientBackground,
  CancelGradientBackground,
  ButtonText,
} from '../styles/revoke-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import RevokeWhite from '../../../../assets/svg/revoke-white.svg';
import CloseWhite from '../../../../assets/svg/close-white.svg';
import { unfollowMember } from '../../../requests/user';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { ToastContext } from '../../../services/toast/toast.context';

export const RevokeModal = ({
  visible,
  setVisible,
  userId,
  profileImage,
  name,
  rank,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const { setShowRevokeToast, setRevokeTitle } = useContext(ToastContext);

  const revokeAlliance = async () => {
    setIsLoading(true);
    await unfollowMember(user.token, user._id, user.role, userId)
      .then((res) => {
        setVisible(false);
        setRevokeTitle(
          `Your cosmic connection with ${rank} ${name} has been severed.`
        );
        setShowRevokeToast(true);
        setTimeout(() => {
          setShowRevokeToast(false);
        }, 3000);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            allies: res.data.allies,
          },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            <AllianceImage
              source={profileImage ? profileImage : defaultProfile}
              resizeMode='contain'
            />
            <Name variant='title'>
              Revoke your alliance with {rank} {name}?
            </Name>
            <Text variant='body'>
              By revoking this cosmic connection, you'll no longer have easy
              access to {rank} {name}'s posts and won't receive signals on their
              new posts. Confirm your decision to adjust your interstellar
              connections.
            </Text>
            <AllianceButtonsWrapper>
              <Option onPress={revokeAlliance}>
                <GradientBackground>
                  {isLoading ? (
                    <ActivityIndicator size='large' color='#fff' />
                  ) : (
                    <>
                      <RevokeWhite width={32} height={32} />
                      <ButtonText variant='body'>Revoke Alliance</ButtonText>
                    </>
                  )}
                </GradientBackground>
              </Option>
              <Option onPress={closeModal}>
                <CancelGradientBackground>
                  <CloseWhite width={32} height={32} />
                  <ButtonText variant='body'>Cancel</ButtonText>
                </CancelGradientBackground>
              </Option>
            </AllianceButtonsWrapper>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
