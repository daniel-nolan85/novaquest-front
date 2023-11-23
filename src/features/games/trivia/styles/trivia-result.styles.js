import styled from 'styled-components/native';
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

export const Option = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[3]};
  margin: 6px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
  width: 100%;
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
`;
