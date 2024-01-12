import { List } from 'react-native-paper';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { Text } from '../../../../components/typography/text.component';

const { Item } = List;

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: ${(props) => props.theme.space[3]};
`;

export const ModalView = styled.View`
  flex: 1;
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
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

export const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
`;

export const Animation = styled(LottieView)`
  width: 90%;
  height: 90%;
`;

export const Title = styled(Text)`
  text-align: center;
  margin-top: -20px;
`;

export const InfoItem = styled(Item)`
  width: 280px;
`;

export const InfoTitle = styled(Text)`
  font-size: 20px;
`;

export const InfoValue = styled(Text)`
  font-size: 20px;
  color: #009999;
`;

export const InfoDescription = styled(Text)`
  font-size: 16px;
  margin: -5px 0 10px 0;
  width: 280px;
`;
