import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
} from '../styles/settings.styles';
import { SafeArea } from '../../../components/utils/safe-area.component';
import Close from '../../../../assets/svg/close.svg';

const { Item } = Picker;

export const TextSpeedModal = ({
  textSpeed,
  setTextSpeed,
  updateUserTextSpeed,
  showTextSpeed,
  closeTextSpeedModal,
}) => {
  return (
    <>
      <SafeArea>
        <Modal visible={showTextSpeed} transparent={true} animationType='slide'>
          <ModalWrapper>
            <ModalView>
              <CloseIcon onPress={closeTextSpeedModal}>
                <Close />
              </CloseIcon>
              <Picker
                style={{ width: 350 }}
                selectedValue={textSpeed}
                onValueChange={(speed) => {
                  setTextSpeed(speed);
                }}
              >
                <Item label='Slow' value='slow' />
                <Item label='Medium' value='medium' />
                <Item label='Fast' value='fast' />
              </Picker>
              <OptionContainer>
                <Option onPress={updateUserTextSpeed}>
                  <GradientBackground>
                    <OptionText variant='body'>Update Text Velocity</OptionText>
                  </GradientBackground>
                </Option>
              </OptionContainer>
            </ModalView>
          </ModalWrapper>
        </Modal>
      </SafeArea>
    </>
  );
};
