import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '../../../components/typography/text.component';

export const ProfileButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 22px;
  margin: 12px 0;
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  height: 50px;
  width: 160px;
  margin-top: 10px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  margin-left: 12px;
  color: #fff;
`;
