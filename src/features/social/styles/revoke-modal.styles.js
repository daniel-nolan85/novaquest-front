import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components/typography/text.component';

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: ${(props) => props.theme.space[3]};
`;

export const ModalView = styled.View`
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

export const AllianceImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 80px;
  border-width: 4px;
  border-color: #fff;
`;

export const Name = styled(Text)`
  text-align: center;
  margin: 12px;
`;

export const AllianceButtonsWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding: 0 22px;
  margin: 12px 0;
`;

const baseGradientStyle = {
  height: 50,
  width: 300,
  marginTop: 10,
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  ${baseGradientStyle}
`;

export const CancelGradientBackground = styled(LinearGradient).attrs({
  colors: ['#C0392B', '#E74C3C'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  ${baseGradientStyle}
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  margin-left: 12px;
  color: #fff;
`;
