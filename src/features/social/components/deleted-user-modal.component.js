import { Modal } from 'react-native';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AnimationWrapper,
  Animation,
  Title,
  Body,
} from '../styles/deleted-user-modal.styles';
import Close from '../../../../assets/svg/close.svg';

export const DeletedUserModal = ({ showDeletedUser, setShowDeletedUser }) => {
  return (
    <SafeArea>
      <Modal visible={showDeletedUser} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={setShowDeletedUser}>
              <Close />
            </CloseIcon>

            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='contain'
                source={require('../../../../assets/animation/404.json')}
              />
            </AnimationWrapper>
            <Title variant='title'>
              Oops! It seems that the cosmic explorer you're trying to reach has
              ventured beyond the celestial horizon.
            </Title>
            <Body variant='body'>
              Their profile has been deleted, and their cosmic contributions are
              no longer visible. If you have any questions or concerns, feel
              free to contact us through the cosmic communication channels.
            </Body>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
