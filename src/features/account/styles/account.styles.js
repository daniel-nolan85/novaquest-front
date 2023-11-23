import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components/typography/text.component';

export const OptionContainer = styled.View``;

export const Option = styled.TouchableOpacity`
  margin: ${(props) => props.theme.space[3]};
`;

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: ${(props) => props.theme.space[3]};
  margin: 6px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const Input = styled(TextInput)`
  background-color: #eeeeef;
  align-self: center;
  margin: 0 ${(props) => props.theme.space[2]};
  width: 90%;
`;

export const Info = styled(Text)`
  text-align: center;
  margin: 0 ${(props) => props.theme.space[3]};
`;
