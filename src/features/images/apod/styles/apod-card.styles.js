import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { Text } from '../../../../components/typography/text.component';

export const ApodCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
  margin: 0 ${(props) => props.theme.space[3]};
  height: 90%;
`;

export const ApodCardCover = styled.Image`
  padding: ${(props) => props.theme.space[3]};
  aspect-ratio: 1;
  width: 100%;
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[2]} 0;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled(Text)`
  padding: ${(props) => props.theme.space[3]} 0;
`;

export const Body = styled(Text)``;
