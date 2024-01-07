import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components/typography/text.component';

export const Header = styled.View`
  flex-direction: row;
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const SearchContainer = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
`;

export const CalendarIcon = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  height: 55px;
  width: 55px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

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
  z-index: 999;
`;

export const Title = styled(Text)`
  margin-top: 20px;
`;

export const OptionContainer = styled.View`
  margin: 20px 0;
  width: 100%;
`;

export const Option = styled.TouchableOpacity`
  margin: 0 ${(props) => props.theme.space[3]};
  width: 90%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
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

export const OptionText = styled(Text)`
  color: ${(props) =>
    props.disabled ? '#666' : props.theme.colors.text.inverse};
  text-transform: uppercase;
  margin-left: 10px;
`;
