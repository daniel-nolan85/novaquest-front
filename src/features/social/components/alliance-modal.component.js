import { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
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
} from '../styles/alliance-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import AllianceWhite from '../../../../assets/svg/alliance-white.svg';
import CloseWhite from '../../../../assets/svg/close-white.svg';
import { followMember } from '../../../requests/user';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

export const AllianceModal = ({
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

  console.log('allies => ', user.allies);

  const formAlliance = async () => {
    setIsLoading(true);
    await followMember(user.token, user._id, userId)
      .then((res) => {
        console.log('followMember => ', res.data);
        setVisible(false);
        Toast.show({
          type: 'success',
          text1: `You've successfully formed an alliance with ${rank} ${name}.`,
          text2: 'Prepare to explore the cosmos together!',
          style: {
            width: '100%',
          },
        });
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
              Form an alliance with {rank} {name}?
            </Name>
            <Text variant='body'>
              By forming this cosmic connection, you'll have access to {rank}{' '}
              {name}'s cosmic adventures and receive signals on their new posts.
              Confirm your decision to embark on this interstellar journey
              together.
            </Text>
            <AllianceButtonsWrapper>
              <Option onPress={formAlliance}>
                <GradientBackground>
                  {isLoading ? (
                    <ActivityIndicator size='large' color='#fff' />
                  ) : (
                    <>
                      <AllianceWhite width={32} height={32} />
                      <ButtonText variant='body'>Form Alliance</ButtonText>
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
