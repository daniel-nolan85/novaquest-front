import { Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  AnimationWrapper,
  Congratulations,
  Option,
  OptionText,
} from '../styles/interstellar-assembly-modal.styles';

export const InterstellarAssemblyModal = ({ handlePlayAgain, visible }) => {
  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <AnimationWrapper>
              <LottieView
                key='animation'
                autoPlay
                loop
                resizeMode='cover'
                source={require('../../../../../assets/animation/correct.json')}
              />
            </AnimationWrapper>
            <Congratulations variant='title'>You did it!</Congratulations>
            <Option onPress={handlePlayAgain}>
              <OptionText>Play Again</OptionText>
            </Option>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
