import styled from 'styled-components/native';
import { Text } from '../../../../components/typography/text.component';

export const QuestionCard = styled.View`
  margin-top: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 97%;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const QuestionCardCover = styled.Image`
  padding: ${(props) => props.theme.space[3]};
  aspect-ratio: 1;
  width: 100%;
  border-radius: 12px 12px 0 0;
`;

export const Question = styled.View`
  padding: ${(props) => props.theme.space[3]};
  flex-direction: row;
  justify-content: space-between;
`;

export const Answers = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const Option = styled.TouchableOpacity`
  padding: 12px;
  margin: 6px 0;
  background-color: #009999;
  border-radius: 12px;
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
`;
