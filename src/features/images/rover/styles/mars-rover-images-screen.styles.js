import styled from 'styled-components/native';
import { Text } from '../../../../components/typography/text.component';

export const Heading = styled.View`
  padding: 0 ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const Option = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[3]};
  margin-top: 20px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
`;
