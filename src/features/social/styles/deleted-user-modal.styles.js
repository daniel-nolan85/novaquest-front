import styled from 'styled-components/native';
import { Video } from 'expo-av';
import LottieView from 'lottie-react-native';
import { Text } from '../../../components/typography/text.component';

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
  margin-top: 20px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 90%;
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

export const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
  z-index: 999;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const Animation = styled(LottieView)`
  width: 100%;
  height: 100%;
`;

export const Title = styled(Text)`
  text-align: center;
  margin-bottom: 20px;
  padding: 0 20px;
`;

export const Body = styled(Text)`
  padding: 0 20px;
  line-height: 20px;
`;
