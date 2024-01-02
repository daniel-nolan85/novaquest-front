import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components/typography/text.component';

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  position: relative;
  margin-top: 20px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
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

export const OptionContainer = styled.View`
  margin: 60px 0 20px 0;
  width: 100%;
`;

export const Option = styled.TouchableOpacity`
  margin: 0 ${(props) => props.theme.space[3]};
  width: 90%;
`;

const baseGradientStyle = {
  flexDirection: 'row',
  padding: '16px',
  margin: '6px',
  borderRadius: '12px',
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

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  text-transform: uppercase;
  margin-left: 10px;
`;
