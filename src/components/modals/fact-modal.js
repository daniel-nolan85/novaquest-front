import { Modal } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { SafeArea } from '../utils/safe-area.component';
import Close from '../../../assets/svg/close.svg';

const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 16px;
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 420px;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
`;

const AnimationWrapper = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const Animation = styled(LottieView)`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  margin-bottom: 16px;
  font-family: Audiowide_400Regular;
  font-size: 20px;
`;

const Fact = styled.Text`
  font-family: Questrial_400Regular;
  font-size: 16px;
`;

export const FactModal = ({ showFact, randomFact, handleModalClose }) => {
  return (
    <SafeArea>
      <Modal visible={showFact} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={handleModalClose}>
              <Close />
            </CloseIcon>
            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='cover'
                source={require('../../../assets/animation/fact.json')}
              />
            </AnimationWrapper>
            <Title variant='title'>Did you know...?</Title>
            <Fact variant='body'>{randomFact}</Fact>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
