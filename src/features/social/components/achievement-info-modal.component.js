import { Modal } from 'react-native';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AchievementWrapper,
  Name,
} from '../styles/achievement-info-modal.styles';
import Close from '../../../../assets/svg/close.svg';

export const AchievementInfoModal = ({
  visible,
  setVisible,
  selectedAchievement,
  IconComponent,
  achievementIconMapping,
}) => {
  const closeModal = () => {
    setVisible(false);
  };

  const achievementData = achievementIconMapping[selectedAchievement];

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            <AchievementWrapper>
              {IconComponent && <IconComponent width={100} height={100} />}
              <Name variant='title'>{achievementData?.name || 'No Name'}</Name>
              <Text variant='body'>
                {achievementData?.description || 'No Description'}
              </Text>
            </AchievementWrapper>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
