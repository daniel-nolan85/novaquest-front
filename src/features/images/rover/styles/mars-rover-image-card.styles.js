import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../../components/typography/text.component';

export const RoverImageCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
`;

export const RoverImageCardCover = styled.Image`
  padding: ${(props) => props.theme.space[3]};
  aspect-ratio: 1;
  width: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: ${(props) => props.theme.space[3]};
  align-items: center;
`;

export const CameraIcon = styled.TouchableOpacity`
  margin-right: ${(props) => props.theme.space[3]};
`;

export const Title = styled(Text)`
  width: 300px;
`;

export const Offline = styled(Text)`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
  color: #009999;
  font-size: 24px;
  margin-top: -${(props) => props.theme.space[3]};
`;

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: ${(props) => props.theme.space[3]};
`;

export const ModalView = styled.View`
  background-color: white;
  border-radius: 20px;
  width: 100%;
  padding: 35px 10px;
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

export const CameraList = styled.FlatList`
  margin-top: 20px;
`;

export const Camera = styled.TouchableOpacity`
  margin: ${(props) => props.theme.space[2]} 0;
  width: 300px;
`;

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: ${(props) => props.theme.space[3]};
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

export const CameraText = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.inverse};
`;
