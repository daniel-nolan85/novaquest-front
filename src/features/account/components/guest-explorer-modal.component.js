import { useState } from 'react';
import { Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
} from '../styles/forgot-password-modal.styles';
import Close from '../../../../assets/svg/close.svg';

export const GuestExplorerModal = ({ visible, setVisible }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: {
        role: 'guest',
      },
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
            <Text
              variant='title'
              style={{ textAlign: 'center', marginTop: 20, marginBottom: 10 }}
            >
              Embark on an expedition as a Guest Explorer!
            </Text>
            <Text variant='body'>
              While your cosmic journey will be filled with wonders and
              discoveries, please note that as a guest, your progress won't be
              saved. If you decide to log out, your cosmic achievements and
              insights will drift away into the vastness of space. Ready to
              explore the cosmos without leaving a permanent mark? Blast off as
              a Guest Explorer and let the cosmic adventure begin!
            </Text>
            <OptionContainer>
              <Option onPress={handleSubmit}>
                <GradientBackground>
                  <OptionText variant='body'>Launch into the Cosmos</OptionText>
                </GradientBackground>
              </Option>
            </OptionContainer>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
