import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../../components/typography/text.component';

export const ResultsContainer = styled.View`
  padding: 40px 20px 0 20px;
  height: 100%;
  align-items: center;
`;

export const Score = styled(Text)``;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
`;

export const Result = styled(Text)`
  padding: ${(props) => props.theme.space[3]} 0;
`;

export const OptionContainer = styled.View`
  margin: 20px 0;
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

export const PlayAgainGradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  ${baseGradientStyle}
`;

export const QuitGradientBackground = styled(LinearGradient).attrs({
  colors: ['#C0392B', '#E74C3C'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  ${baseGradientStyle}
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
`;
